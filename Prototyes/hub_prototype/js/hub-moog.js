/**
 * Hub landing — interactive Moog synth (Three.js + MOOG_MODEL_DATA)
 */
(function () {
  const container = document.getElementById('hub-moog');
  if (!container || typeof THREE === 'undefined' || !window.MOOG_MODEL_DATA) return;

  function createSplatTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1.0)');
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

  const splatTexture = createSplatTexture();

  function createModelFromData(modelData) {
    const posBinary = atob(modelData.pos);
    const posBytes = new Uint8Array(posBinary.length);
    for (let i = 0; i < posBinary.length; i++) posBytes[i] = posBinary.charCodeAt(i);
    const positions = new Float32Array(posBytes.buffer);

    const colBinary = atob(modelData.col);
    const colors = new Float32Array(modelData.count * 3);
    for (let i = 0; i < modelData.count * 3; i++) {
      colors[i] = colBinary.charCodeAt(i) / 255.0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.center();
    geometry.computeBoundingSphere();

    const material = new THREE.PointsMaterial({
      size: 0.042,
      map: splatTexture,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.98,
      alphaTest: 0.02,
      depthWrite: true,
    });

    return new THREE.Points(geometry, material);
  }

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 260;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
  camera.position.set(0, -0.15, 4.4);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1.4));

  const defaultRotX = 0.35;
  const defaultRotY = -0.4;
  const modelObject = createModelFromData(window.MOOG_MODEL_DATA);

  if (modelObject.geometry?.boundingSphere) {
    const radius = modelObject.geometry.boundingSphere.radius || 1;
    const scale = 1.35 / radius;
    modelObject.scale.set(scale, scale, scale);
  }
  modelObject.rotation.x = defaultRotX;
  modelObject.rotation.y = defaultRotY;
  scene.add(modelObject);

  let isDragging = false;
  let previousX = 0;
  let previousY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastInteractionTime = Date.now();

  function handleDown(e) {
    isDragging = true;
    previousX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    previousY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    velocityX = 0;
    velocityY = 0;
    lastInteractionTime = Date.now();
  }

  function handleMove(e) {
    if (!isDragging) return;
    const currentX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const currentY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const deltaX = currentX - previousX;
    const deltaY = currentY - previousY;
    previousX = currentX;
    previousY = currentY;
    modelObject.rotation.y += deltaX * 0.014;
    modelObject.rotation.x += deltaY * 0.014;
    modelObject.rotation.x = Math.max(-1.5, Math.min(1.5, modelObject.rotation.x));
    velocityX = deltaX * 0.006;
    velocityY = deltaY * 0.006;
    lastInteractionTime = Date.now();
  }

  function handleUp() {
    isDragging = false;
    lastInteractionTime = Date.now();
  }

  container.addEventListener('mousedown', handleDown);
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleUp);
  container.addEventListener('touchstart', handleDown, { passive: true });
  window.addEventListener('touchmove', handleMove, { passive: true });
  window.addEventListener('touchend', handleUp);

  function resize() {
    const w = container.clientWidth || 380;
    const h = container.clientHeight || 260;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', resize);

  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      modelObject.rotation.y += velocityX;
      modelObject.rotation.x += velocityY;
      velocityX *= 0.9;
      velocityY *= 0.9;

      const slow = Math.abs(velocityX) < 0.0002 && Math.abs(velocityY) < 0.0002;
      if (slow && Date.now() - lastInteractionTime > 3500) {
        modelObject.rotation.x = THREE.MathUtils.lerp(modelObject.rotation.x, defaultRotX, 0.018);
        modelObject.rotation.y = THREE.MathUtils.lerp(modelObject.rotation.y, defaultRotY, 0.018);
      }
    }

    renderer.render(scene, camera);
  }

  animate();
})();
