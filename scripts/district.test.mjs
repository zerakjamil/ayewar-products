import * as CANNON from 'cannon-es';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FixedStep, sampleRoute, outerRoad, innerRoad, discoveries, scenery, distanceFromRoad, roadHalfWidth, drivingDirection, drivingForce, steerToward } from '../src/game/district.mjs';

test('traffic turns with the route and loops continuously', () => {
  const route = [{ x: 0, z: 0 }, { x: 10, z: 0 }, { x: 10, z: 10 }, { x: 0, z: 10 }];
  assert.deepEqual(sampleRoute(route, 5), { x: 5, z: 0, heading: Math.PI / 2 });
  assert.deepEqual(sampleRoute(route, 15), { x: 10, z: 5, heading: 0 });
  assert.deepEqual(sampleRoute(route, 45), sampleRoute(route, 5));
  assert.deepEqual(sampleRoute(route, -35), sampleRoute(route, 5));
  assert.throws(() => sampleRoute([{ x: 0, z: 0 }, { x: 0, z: 0 }], 0));
});

test('fixed simulation limits stalls and keeps independent traffic routes', () => {
  const clock = new FixedStep(0.01, 3); let ticks = 0;
  clock.advance(1, () => ticks++); assert.equal(ticks, 3);
  clock.reset(); clock.advance(-1, () => ticks++); assert.equal(ticks, 3);
  assert.notDeepEqual(sampleRoute(outerRoad, 0), sampleRoute(innerRoad, 0));
  assert.equal(new Set(discoveries.map(([slug]) => slug)).size, 8);
});


test('all scenery footprints leave the roads and their shoulders clear', () => {
  for (const prop of scenery) assert.ok(distanceFromRoad(prop) > roadHalfWidth + prop.radius + 0.4, `${prop.type} at ${prop.x},${prop.z} overlaps the road`);
});

test('directional driving supports single keys and normalizes diagonals', () => {
  for (const [right, up] of [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1]]) {
    const dir = drivingDirection(right, up);
    assert.ok(Math.abs(Math.hypot(dir.x, dir.z) - 1) < 1e-10);
    const screenX = (15 * dir.x - 12 * dir.z) / Math.hypot(12, 15);
    const screenUp = (-12 * dir.x - 15 * dir.z) / Math.hypot(12, 15);
    if (right) assert.equal(Math.sign(screenX), Math.sign(right));
    if (up) assert.equal(Math.sign(screenUp), Math.sign(up));
  }
  assert.deepEqual(drivingDirection(0, 0), { x: 0, z: 0 });
  assert.ok(steerToward(3.1, -3.1, 1 / 60) > 3.1, 'steering takes the short turn across the angle boundary');
});


test('the physics controller accelerates from one key and stops on release', () => {
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -20, 0) }); world.defaultContactMaterial.friction = 0;
  const ground = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() }); ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0); world.addBody(ground);
  const body = new CANNON.Body({ mass: 5, shape: new CANNON.Sphere(0.55), position: new CANNON.Vec3(0, 0.55, 0), fixedRotation: true, linearDamping: 0.15 }); body.updateMassProperties(); world.addBody(body);
  function tick(direction, brake = false) { const force = drivingForce({ x: body.velocity.x, z: body.velocity.z }, direction, brake, body.mass); body.applyForce(new CANNON.Vec3(force.x, 0, force.z)); world.step(1 / 60); }
  for (let i = 0; i < 60; i++) tick(drivingDirection(0, 1));
  assert.ok(Math.hypot(body.position.x, body.position.z) > 4, 'holding Up must move the physics body');
  assert.ok(body.position.x < 0 && body.position.z < 0);
  for (let i = 0; i < 60; i++) tick(drivingDirection(0, 0));
  assert.ok(Math.hypot(body.velocity.x, body.velocity.z) < 0.05, 'release must stop coasting');
});
