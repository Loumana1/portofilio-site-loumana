/**
 * 3D PLY Gaussian Splat & Point Cloud Viewers Logic (Three.js)
 */
  </div>

  <!-- 3D PLY Gaussian Splat & Point Cloud Viewers Logic (Three.js) -->
  <script>
    /**
     * Generate a soft circular radial splat particle texture to fill gaps into a continuous solid surface
     */
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

    /**
     * Decode base64 model data directly into Three.js dense Points with solid surface filling
     */
    function createModelFromData(modelData) {
      if (!modelData || !modelData.pos || !modelData.col) return null;
      try {
        const posBinary = atob(modelData.pos);
        const posBytes = new Uint8Array(posBinary.length);
        for (let i = 0; i < posBinary.length; i++) {
          posBytes[i] = posBinary.charCodeAt(i);
        }
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

        // Solid continuous point material with overlapping soft splats
        const material = new THREE.PointsMaterial({
          size: 0.042,
          map: splatTexture,
          vertexColors: true,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.98,
          alphaTest: 0.02,
          depthWrite: true
        });

        return new THREE.Points(geometry, material);
      } catch (err) {
        console.error("Error creating model from data:", err);
        return null;
      }
    }

    /**
     * Parse raw 3D Gaussian Splat PLY buffer fallback
     */
    function parseGaussianSplatBuffer(buffer, defaultColor) {
      const u8 = new Uint8Array(buffer);
      let headerEnd = 0;
      const headerSearchLimit = Math.min(u8.length, 3000);
      for (let i = 0; i < headerSearchLimit; i++) {
        if (u8[i] === 10) {
          const line = new TextDecoder().decode(u8.subarray(Math.max(0, i - 15), i));
          if (line.includes('end_header')) {
            headerEnd = i + 1;
            break;
          }
        }
      }

      const headerStr = new TextDecoder().decode(u8.subarray(0, headerEnd));
      const countMatch = headerStr.match(/element vertex (\d+)/);
      const count = countMatch ? parseInt(countMatch[1], 10) : 0;
      if (count === 0) throw new Error("Invalid or empty PLY header");

      const isGaussian = headerStr.includes('f_dc_0');
      const dataView = new DataView(buffer, headerEnd);
      const stride = isGaussian ? 68 : (headerStr.includes('nx') ? 24 : 12);
      
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const SH_C0 = 0.28209479177387814;

      for (let i = 0; i < count; i++) {
        const offset = i * stride;
        const x = dataView.getFloat32(offset, true);
        const y = dataView.getFloat32(offset + 4, true);
        const z = dataView.getFloat32(offset + 8, true);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        if (isGaussian) {
          const f_dc_0 = dataView.getFloat32(offset + 24, true);
          const f_dc_1 = dataView.getFloat32(offset + 28, true);
          const f_dc_2 = dataView.getFloat32(offset + 32, true);

          colors[i * 3] = Math.min(Math.max(0.5 + SH_C0 * f_dc_0, 0), 1);
          colors[i * 3 + 1] = Math.min(Math.max(0.5 + SH_C0 * f_dc_1, 0), 1);
          colors[i * 3 + 2] = Math.min(Math.max(0.5 + SH_C0 * f_dc_2, 0), 1);
        } else {
          colors[i * 3] = 0.9;
          colors[i * 3 + 1] = 0.9;
          colors[i * 3 + 2] = 0.9;
        }
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
        depthWrite: true
      });

      return new THREE.Points(geometry, material);
    }

    /**
     * Initializes multi-axis interactive 3D viewer with static resting position (no constant spinning)
     */
    function initPlyViewer(containerId, plyPath, dataKey, defaultRotX, defaultRotY, defaultColor) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const width = container.clientWidth || 360;
      const height = container.clientHeight || 260;

      // 1. Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
      camera.position.set(0, -0.15, 4.4);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
      scene.add(ambientLight);

      let modelObject = null;
      let isDragging = false;
      let previousX = 0;
      let previousY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let lastInteractionTime = Date.now();

      function setModel(obj) {
        if (modelObject) scene.remove(modelObject);
        modelObject = obj;
        if (modelObject.geometry && modelObject.geometry.boundingSphere) {
          const radius = modelObject.geometry.boundingSphere.radius || 1.0;
          let scaleMultiplier = 1.35;
          if (containerId === 'viewer-computer-dev') {
             scaleMultiplier = 1.21; // roughly 10% smaller
          }
          const scale = scaleMultiplier / radius;
          modelObject.scale.set(scale, scale, scale);
        }
        // Set exact default static orientation
        modelObject.rotation.x = defaultRotX;
        modelObject.rotation.y = defaultRotY;
        scene.add(modelObject);
      }

      // Auto-load instantly from pre-extracted JS data (Zero CORS issues on file://)
      if (dataKey && window[dataKey]) {
        const pointsMesh = createModelFromData(window[dataKey]);
        if (pointsMesh) {
          setModel(pointsMesh);
        }
      } else {
        // Fallback to fetch
        fetch(plyPath)
          .then(res => res.arrayBuffer())
          .then(buffer => {
            const pointsMesh = parseGaussianSplatBuffer(buffer, defaultColor);
            setModel(pointsMesh);
          })
          .catch(err => console.warn("Fetch fallback notice:", err));
      }

      // Multi-Axis Drag Interaction (No continuous rotation)
      function handleDown(e) {
        isDragging = true;
        previousX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        previousY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        velocityX = 0;
        velocityY = 0;
        lastInteractionTime = Date.now();
      }

      function handleMove(e) {
        if (!isDragging || !modelObject) return;
        const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        
        const deltaX = currentX - previousX;
        const deltaY = currentY - previousY;
        previousX = currentX;
        previousY = currentY;

        // Direct responsive rotation (drag)
        // Direct responsive rotation (drag)
        modelObject.rotation.y += deltaX * 0.014;
        modelObject.rotation.x += deltaY * 0.014;
        modelObject.rotation.x = Math.max(-1.5, Math.min(1.5, modelObject.rotation.x));
        velocityX = deltaX * 0.006;
        velocityY = deltaY * 0.006;
        
        // Update target rotation so it doesn't snap back immediately
        if (containerId === 'viewer-computer-dev') {
            targetRotX = modelObject.rotation.x;
            targetRotY = modelObject.rotation.y;
        }
        
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

      // Add passive mouse tracking for computer model
      let targetRotX = defaultRotX;
      let targetRotY = defaultRotY;
      
      if (containerId === 'viewer-computer-dev') {
        window.addEventListener('mousemove', (e) => {
          if (!modelObject || isDragging) return;
          const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
          const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
          
          targetRotY = defaultRotY + (mouseX * 1.2);
          targetRotX = defaultRotX - (mouseY * 1.2);
        });
      }

      // Render Loop: Friction damping -> stays in place -> slow ease back to default after idle
      function animate() {
        requestAnimationFrame(animate);

        if (modelObject) {
          if (!isDragging) {
             // Apply inertia decay for dragging
             modelObject.rotation.y += velocityX;
             modelObject.rotation.x += velocityY;
             velocityX *= 0.90;
             velocityY *= 0.90;
             
             const isMovingSlowly = Math.abs(velocityX) < 0.0002 && Math.abs(velocityY) < 0.0002;
             
             if (containerId === 'viewer-computer-dev' && isMovingSlowly) {
                // Passive tracking lerp takes over after drag inertia finishes
                modelObject.rotation.x = THREE.MathUtils.lerp(modelObject.rotation.x, targetRotX, 0.05);
                modelObject.rotation.y = THREE.MathUtils.lerp(modelObject.rotation.y, targetRotY, 0.05);
             } else if (containerId !== 'viewer-computer-dev' && isMovingSlowly) {
                // For moog, return to default position after 3.5s idle
                const timeSinceInteraction = Date.now() - lastInteractionTime;
                if (timeSinceInteraction > 3500) {
                  modelObject.rotation.x = THREE.MathUtils.lerp(modelObject.rotation.x, defaultRotX, 0.018);
                  modelObject.rotation.y = THREE.MathUtils.lerp(modelObject.rotation.y, defaultRotY, 0.018);
                }
             }
          }
        }

        renderer.render(scene, camera);
      }
      animate();
