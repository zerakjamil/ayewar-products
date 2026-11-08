import * as THREE from "three";
import * as CANNON from "cannon-es";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { discoveries as locations, outerRoad, innerRoad, scenery, shoreline, roadSegments, drivingDirection, drivingForce, steerToward, sampleRoute, FixedStep } from "./district.mjs";

export type Action = "up" | "down" | "left" | "right" | "brake";
export type Controls = Record<Action, boolean>;
type EngineOptions = { node: HTMLDivElement; controls: { current: Controls }; paused: { current: boolean }; onFound: (slug: string) => void; icons: Record<string, string> };

export function createDistrict({ node, controls, paused, onFound, icons }: EngineOptions) {
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    node.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#9fc9c4");
    scene.fog = new THREE.Fog("#9fc9c4", 35, 78);
    const camera = new THREE.OrthographicCamera(-12, 12, 12, -12, 0.1, 100);
    scene.add(new THREE.HemisphereLight(0xfaffeb, 0x64765b, 2.4));
    const sun = new THREE.DirectionalLight(0xffe5ba, 3); sun.position.set(-12, 22, 9); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -25, right: 25, top: 25, bottom: -25, near: 1, far: 60 }); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04; scene.add(sun);
    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -20, 0) });
    world.defaultContactMaterial.friction = 0;
    const groundBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); world.addBody(groundBody);
    const vehicle = new CANNON.Body({ mass: 5, shape: new CANNON.Sphere(0.55), position: new CANNON.Vec3(0, 0.55, 2), linearDamping: 0.15, fixedRotation: true });
    vehicle.updateMassProperties(); world.addBody(vehicle);
    const materials: THREE.Material[] = []; const geometries: THREE.BufferGeometry[] = [];
    const mat = (color: string) => { const m = new THREE.MeshStandardMaterial({ color, roughness: 0.9 }); materials.push(m); return m; };
    const grass = mat("#83a969"), road = mat("#3e4a50"), line = mat("#e8dfbf"), trunk = mat("#725c43"), foliage = mat("#65865a"), building = mat("#e8dbc1"), roof = mat("#be7958");
    function box(x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material) { const geometry = new THREE.BoxGeometry(w, h, d); geometries.push(geometry); const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z); mesh.castShadow = h > 0.2; mesh.receiveShadow = true; scene.add(mesh); return mesh; }
    const water = mat("#87bcb9"); box(0, -0.75, 0, 110, 0.2, 110, water);
    const shore = new THREE.Shape();
    shoreline.forEach(({x,z}, i) => { if (i === 0) shore.moveTo(x,z); else shore.lineTo(x,z); }); shore.closePath();
    const islandGeometry = new THREE.ExtrudeGeometry(shore, { depth: 0.45, bevelEnabled: false }); geometries.push(islandGeometry);
    const island = new THREE.Mesh(islandGeometry, grass); island.rotation.x = Math.PI / 2; island.position.y = -0.05; island.receiveShadow = true; scene.add(island);
    const sand = new THREE.Mesh(islandGeometry, mat("#ddc797")); sand.rotation.copy(island.rotation); sand.scale.set(1.035, 1.035, 1); sand.position.y = -0.17; sand.receiveShadow = true; scene.add(sand);
    function roadSegment(a: { x: number; z: number }, b: { x: number; z: number }) {
      const dx = b.x - a.x, dz = b.z - a.z, length = Math.hypot(dx, dz), heading = Math.atan2(dx, dz);
      const surface = box((a.x + b.x) / 2, 0.01, (a.z + b.z) / 2, 2.8, 0.06, length, road); surface.rotation.y = heading;
      for (let d = 1; d < length - 0.5; d += 2.4) { const mark = box(a.x + dx * d / length, 0.06, a.z + dz * d / length, 0.06, 0.02, 0.85, line); mark.rotation.y = heading; }
    }
    for (const [a, b] of roadSegments) roadSegment(a, b);
    const jointGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.06, 32); geometries.push(jointGeometry);
    for (const point of [...outerRoad, ...innerRoad]) { const joint = new THREE.Mesh(jointGeometry, road); joint.position.set(point.x, 0.01, point.z); joint.receiveShadow = true; scene.add(joint); }
    function obstacle(x: number, z: number, r: number) { const b = new CANNON.Body({ mass: 0, shape: new CANNON.Sphere(r), position: new CANNON.Vec3(x, r, z) }); world.addBody(b); }
    const props: { x: number; z: number; type: string; fallback: THREE.Object3D[] }[] = [];
    for (const { x, z, type, radius } of scenery) {
      if (type !== "tree") { props.push({ x, z, type, fallback: [box(x, 1, z, 2.4, 2, 2.4, building), box(x, 2.1, z, 2.7, 0.3, 2.7, roof)] }); obstacle(x, z, radius); }
      else { const stem = box(x, 0.55, z, 0.3, 1.1, 0.3, trunk); const geo = new THREE.ConeGeometry(1.05, 2.4, 6); geometries.push(geo); const tree = new THREE.Mesh(geo, foliage); tree.position.set(x, 2, z); scene.add(tree); props.push({ x, z, type, fallback: [stem, tree] }); obstacle(x, z, radius); }
    }
    shoreline.forEach((a, i) => {
      const b = shoreline[(i + 1) % shoreline.length], dx = b.x - a.x, dz = b.z - a.z;
      const wall = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(0.3, 1.2, Math.hypot(dx, dz) / 2)), position: new CANNON.Vec3((a.x + b.x) / 2, 1.2, (a.z + b.z) / 2) });
      wall.quaternion.setFromEuler(0, Math.atan2(dx, dz), 0); world.addBody(wall);
    });
    const markerCanvas = document.createElement("canvas"); markerCanvas.width = 128; markerCanvas.height = 128;
    const markerContext = markerCanvas.getContext("2d")!; markerContext.fillStyle = "#fffdf1"; markerContext.beginPath(); markerContext.roundRect(0, 0, 128, 128, 28); markerContext.fill();
    const markerTexture = new THREE.CanvasTexture(markerCanvas); markerTexture.colorSpace = THREE.SRGBColorSpace;
    const tokens = locations.map(([slug, x, z]) => { const texture = new THREE.TextureLoader().load(icons[slug]); texture.colorSpace = THREE.SRGBColorSpace; const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: true, depthWrite: false }); materials.push(material); const mesh = new THREE.Group();
      const backMaterial = new THREE.SpriteMaterial({ map: markerTexture, depthWrite: false }); materials.push(backMaterial);
      const back = new THREE.Sprite(backMaterial); back.scale.set(1.4, 1.4, 1); back.renderOrder = 1;
      const icon = new THREE.Sprite(material); icon.scale.set(1.12, 1.12, 1); icon.renderOrder = 2; mesh.add(back, icon); mesh.position.set(x, 1.6, z); scene.add(mesh); const ringGeo = new THREE.RingGeometry(0.9, 1.05, 32); geometries.push(ringGeo); const ring = new THREE.Mesh(ringGeo, mat("#f4efc5")); ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.08, z); scene.add(ring); return { slug, x, z, mesh, ring, found: false }; });
    const car = new THREE.Group(); scene.add(car);
    const bodyGeo = new THREE.BoxGeometry(1.5, 0.7, 0.8); geometries.push(bodyGeo); const fallback = new THREE.Mesh(bodyGeo, mat("#e7ba63")); fallback.position.y = 0.55; fallback.rotation.y = Math.PI / 2; car.add(fallback);
    let alive = true; let loaded: THREE.Object3D | undefined;
    const imported: THREE.Object3D[] = [];
    const loader = new GLTFLoader();
    function place(source: THREE.Object3D, x: number, z: number, extent: number) {
      const model = source.clone(true); model.traverse((item) => { if (item instanceof THREE.Mesh) { item.castShadow = true; item.receiveShadow = true; } }); const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3()); const center = bounds.getCenter(new THREE.Vector3());
      const scale = extent / Math.max(size.x, size.y, size.z, 0.01);
      model.scale.setScalar(scale); model.position.set(x - center.x * scale, -bounds.min.y * scale, z - center.z * scale); scene.add(model); return model;
    }
    for (const type of ["house-a", "house-f", "house-s", "tree"]) loader.load(`/game/${type}.glb`, (gltf) => {
      if (!alive) return; imported.push(gltf.scene);
      for (const prop of props.filter((p) => p.type === type)) { place(gltf.scene, prop.x, prop.z, type === "tree" ? 2.6 : 2.8); prop.fallback.forEach((item) => { item.visible = false; }); }
    });
    const traffic: { body: CANNON.Body; visual: THREE.Group; offset: number; route: typeof outerRoad }[] = [];
    for (const [index, offset] of [0, 14, 27].entries()) { const body = new CANNON.Body({ mass: 0, type: CANNON.Body.KINEMATIC, shape: new CANNON.Sphere(0.75), position: new CANNON.Vec3(-14 + offset, 0.65, 0.8) }); world.addBody(body); const visual = new THREE.Group(); scene.add(visual); const fallbackCar = new THREE.Mesh(bodyGeo, mat("#92b7b1")); fallbackCar.position.y = 0.6; fallbackCar.rotation.y = Math.PI / 2; visual.add(fallbackCar); traffic.push({ body, visual, offset, route: index === 1 ? innerRoad : outerRoad }); }
    loader.load("/game/sedan.glb", (gltf) => { if (!alive) return; imported.push(gltf.scene); for (const item of traffic) { const model = gltf.scene.clone(true); const b = new THREE.Box3().setFromObject(model); const size = b.getSize(new THREE.Vector3()); const c = b.getCenter(new THREE.Vector3()); const scale = 1.6 / Math.max(size.x, size.y, size.z, 0.01); model.scale.setScalar(scale); model.position.set(-c.x * scale, -b.min.y * scale, -c.z * scale); model.traverse((o) => { if (o instanceof THREE.Mesh) o.castShadow = true; }); item.visual.clear(); item.visual.add(model); } });
    // Polyfork permits hosted use; these scenery models are never bundled.
    loader.load("https://polyfork.dev/cdn/easter-island-rapa-nui-584f21.glb", (gltf) => { if (!alive) return; imported.push(gltf.scene); const distant = place(gltf.scene, -31, -12, 12); distant.position.y -= 1.1; }, undefined, () => {});
    loader.load("https://polyfork.dev/cdn/steampunk-farm-terrain-98cb8a.glb", (gltf) => { if (!alive) return; imported.push(gltf.scene); const distant = place(gltf.scene, 31, -10, 12); distant.position.y -= 1.1; }, undefined, () => {});
    loader.load("https://polyfork.dev/cdn/brass-water-tower-b0c6d9.glb", (gltf) => { if (!alive) return; imported.push(gltf.scene); place(gltf.scene, 17, -10, 3.6); }, undefined, () => {});
    const walkers: { visual: THREE.Group; route: typeof outerRoad; phase: number }[] = [];
    const footpaths = [
      [{x:-16,z:-6},{x:-16,z:-1},{x:-18,z:-1},{x:-18,z:-6}],
      [{x:13,z:7},{x:14,z:11},{x:16,z:11},{x:16,z:7}],
      [{x:-4,z:14},{x:0,z:13},{x:3,z:14},{x:0,z:16}],
    ];
    loader.load("/game/person.glb", (gltf) => { if (!alive) return; imported.push(gltf.scene); for (let i = 0; i < 3; i++) { const model = place(gltf.scene, 0, 0, 1.2); scene.remove(model); const visual = new THREE.Group(); visual.add(model); scene.add(visual); walkers.push({ visual, route: footpaths[i], phase: i * 3 }); } });
    new GLTFLoader().load("https://polyfork.dev/cdn/yellow-school-bus-0fd3b6.glb", (gltf) => { if (!alive) return; loaded = gltf.scene; const bounds = new THREE.Box3().setFromObject(loaded); const size = bounds.getSize(new THREE.Vector3()); const center = bounds.getCenter(new THREE.Vector3()); const scale = 2.2 / Math.max(size.x, size.y, size.z, 0.01); loaded.scale.setScalar(scale); loaded.position.set(-center.x * scale, 0.6 - center.y * scale, -center.z * scale); loaded.traverse((o) => { if (o instanceof THREE.Mesh) o.castShadow = true; }); car.remove(fallback); car.add(loaded); }, undefined, () => {});
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0; let previous = performance.now(); let frame = 0; let elapsed = 0; let lastRender = 0; const clock = new FixedStep();
    const resize = () => { const w = node.clientWidth, h = node.clientHeight; if (!w || !h) return; renderer.setSize(w, h); const aspect = w / h; const view = 9.2; camera.left = -view * aspect; camera.right = view * aspect; camera.top = view; camera.bottom = -view; camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(node); resize();
    function tick(now: number) {
      if (document.hidden || now - lastRender < (paused.current ? 160 : 16)) { frame = requestAnimationFrame(tick); return; }
      const dt = Math.min((now - previous) / 1000, 0.05); previous = now; lastRender = now;
      if (!paused.current && !document.hidden) {
        const keys = controls.current;
        const direction = drivingDirection(Number(keys.right) - Number(keys.left), Number(keys.up) - Number(keys.down));
        clock.advance(dt, (step) => {
          elapsed += step;
          for (const item of traffic) {
            const point = sampleRoute(item.route, elapsed * 2 + item.offset);
            item.body.position.set(point.x, 0.65, point.z); item.body.aabbNeedsUpdate = true;
            item.visual.position.set(point.x, 0, point.z); item.visual.rotation.y = point.heading;
          }
          const moving = Math.hypot(direction.x, direction.z) > 0;
          if (moving) angle = steerToward(angle, Math.atan2(direction.x, direction.z), step);
          const force = drivingForce({ x: vehicle.velocity.x, z: vehicle.velocity.z }, direction, keys.brake, vehicle.mass);
          vehicle.applyForce(new CANNON.Vec3(force.x, 0, force.z));
          world.step(step);
          const speed = Math.hypot(vehicle.velocity.x, vehicle.velocity.z);
          if (speed > 7) { vehicle.velocity.x *= 7 / speed; vehicle.velocity.z *= 7 / speed; }
        });
        walkers.forEach((person, i) => { const point = sampleRoute(person.route, elapsed * 0.65 + person.phase); person.visual.position.set(point.x, 0, point.z); person.visual.rotation.y = point.heading; person.visual.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 7 + i) * 0.035; });
        car.position.lerp(new THREE.Vector3(vehicle.position.x, 0, vehicle.position.z), 1 - Math.exp(-24 * dt));
        const turn = Math.atan2(Math.sin(angle - car.rotation.y), Math.cos(angle - car.rotation.y));
        const lean = reducedMotion ? 0 : THREE.MathUtils.clamp(-turn * 0.3, -0.06, 0.06);
        car.rotation.z += (lean - car.rotation.z) * (1 - Math.exp(-14 * dt)); car.rotation.y = angle;
        for (const token of tokens) { if (!token.found && Math.hypot(vehicle.position.x - token.x, vehicle.position.z - token.z) < 1.25) { token.found = true; token.mesh.visible = false; token.ring.visible = false; paused.current = true; vehicle.velocity.set(0, 0, 0); onFound(token.slug); break; } token.mesh.position.y = 1.6 + Math.sin(elapsed * 2 + token.x) * 0.08; }
      }
      const target = new THREE.Vector3(car.position.x + 12, 17, car.position.z + 15); camera.position.lerp(target, 1 - Math.exp(-7 * dt)); camera.lookAt(camera.position.x - 12, camera.position.y - 17, camera.position.z - 15); renderer.render(scene, camera); frame = requestAnimationFrame(tick);
    }
    camera.position.set(12, 17, 17); frame = requestAnimationFrame(tick);
    return () => { alive = false; cancelAnimationFrame(frame); observer.disconnect(); geometries.forEach((g) => g.dispose()); materials.forEach((m) => { const map = (m as THREE.SpriteMaterial).map; map?.dispose(); m.dispose(); }); [...(loaded ? [loaded] : []), ...imported].forEach((root) => root.traverse((o) => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: THREE.Material) => m.dispose()); } })); renderer.dispose(); renderer.domElement.remove(); };
}
