import * as THREE from 'three';

// Point-cloud render of a scanned object, ported from the hub prototype
// hub-moog.js. The model data is a classic script in assets/models that
// sets window.MOOG_MODEL_DATA or window.COMPUTER_MODEL_DATA:
// { count, pos: base64 Float32 xyz, col: base64 Uint8 rgb }.

export type ModelData = { count: number; pos: string; col: string };

type Options = {
  /** Default tilt and turn, radians. */
  rotX?: number;
  rotY?: number;
  /** Point size in world units. */
  size?: number;
  /** Idle turn per frame when nobody is dragging. 0 to stay still. */
  idleSpin?: number;
};

function splatTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d context');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.55, 'rgba(255,255,255,0.98)');
  grad.addColorStop(0.85, 'rgba(255,255,255,0.6)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function decode(data: ModelData, size: number): THREE.Points {
  const posBin = atob(data.pos);
  const posBytes = new Uint8Array(posBin.length);
  for (let i = 0; i < posBin.length; i++) posBytes[i] = posBin.charCodeAt(i);
  const positions = new Float32Array(posBytes.buffer);

  const colBin = atob(data.col);
  const colors = new Float32Array(data.count * 3);
  for (let i = 0; i < data.count * 3; i++) colors[i] = colBin.charCodeAt(i) / 255;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.center();
  geometry.computeBoundingSphere();

  const material = new THREE.PointsMaterial({
    size,
    map: splatTexture(),
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.98,
    alphaTest: 0.02,
    depthWrite: true,
  });

  return new THREE.Points(geometry, material);
}

/** Mount a draggable point cloud into `container`. Returns a stop function. */
export function mountPointCloud(container: HTMLElement, data: ModelData, opts: Options = {}): () => void {
  const rotX = opts.rotX ?? 0.35;
  const rotY = opts.rotY ?? -0.4;
  const idleSpin = opts.idleSpin ?? 0.0025;

  const w = container.clientWidth || 600;
  const h = container.clientHeight || 420;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 1000);
  camera.position.set(0, -0.15, 4.4);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const points = decode(data, opts.size ?? 0.042);
  const radius = points.geometry.boundingSphere?.radius || 1;
  const s = 1.35 / radius;
  points.scale.set(s, s, s);
  points.rotation.set(rotX, rotY, 0);
  scene.add(points);

  let dragging = false;
  let px = 0;
  let py = 0;
  let vx = 0;
  let vy = 0;
  let lastTouch = Date.now();

  const point = (e: MouseEvent | TouchEvent) =>
    'touches' in e ? { x: e.touches[0]?.clientX ?? 0, y: e.touches[0]?.clientY ?? 0 } : { x: e.clientX, y: e.clientY };

  const down = (e: MouseEvent | TouchEvent) => {
    dragging = true;
    ({ x: px, y: py } = point(e));
    vx = vy = 0;
    lastTouch = Date.now();
  };
  const move = (e: MouseEvent | TouchEvent) => {
    if (!dragging) return;
    const { x, y } = point(e);
    const dx = x - px;
    const dy = y - py;
    px = x;
    py = y;
    points.rotation.y += dx * 0.014;
    points.rotation.x = Math.max(-1.5, Math.min(1.5, points.rotation.x + dy * 0.014));
    vx = dx * 0.006;
    vy = dy * 0.006;
    lastTouch = Date.now();
  };
  const up = () => {
    dragging = false;
    lastTouch = Date.now();
  };

  container.addEventListener('mousedown', down);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
  container.addEventListener('touchstart', down, { passive: true });
  window.addEventListener('touchmove', move, { passive: true });
  window.addEventListener('touchend', up);

  const resize = () => {
    const cw = container.clientWidth || 600;
    const ch = container.clientHeight || 420;
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    renderer.setSize(cw, ch);
  };
  window.addEventListener('resize', resize);

  let frame = 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tick = () => {
    frame = requestAnimationFrame(tick);
    if (!dragging) {
      points.rotation.y += vx;
      points.rotation.x += vy;
      vx *= 0.9;
      vy *= 0.9;
      const slow = Math.abs(vx) < 0.0002 && Math.abs(vy) < 0.0002;
      if (slow && Date.now() - lastTouch > 3500) {
        points.rotation.x = THREE.MathUtils.lerp(points.rotation.x, rotX, 0.018);
        if (!reduced) points.rotation.y += idleSpin;
      }
    }
    renderer.render(scene, camera);
  };
  tick();

  return () => {
    cancelAnimationFrame(frame);
    container.removeEventListener('mousedown', down);
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
    container.removeEventListener('touchstart', down);
    window.removeEventListener('touchmove', move);
    window.removeEventListener('touchend', up);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    points.geometry.dispose();
  };
}

/** Read a model set by a classic script in assets/models. */
export function modelFromWindow(key: 'MOOG_MODEL_DATA' | 'COMPUTER_MODEL_DATA'): ModelData | null {
  const data = (window as unknown as Record<string, ModelData | undefined>)[key];
  return data && typeof data.count === 'number' ? data : null;
}
