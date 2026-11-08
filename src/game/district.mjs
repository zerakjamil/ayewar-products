/** @typedef {{x: number, z: number}} Point */

// Hand-authored routes describe both the roads and the traffic paths.
export const outerRoad = [
  { x: -10, z: -8 }, { x: -3, z: -11 }, { x: 6, z: -9 },
  { x: 11, z: -3 }, { x: 9, z: 5 }, { x: 4, z: 10 },
  { x: -5, z: 9 }, { x: -11, z: 4 }, { x: -12, z: -2 },
];
export const innerRoad = [
  { x: -7, z: -2 }, { x: -4, z: -6 }, { x: 2, z: -6 },
  { x: 6, z: -2 }, { x: 5, z: 3 }, { x: 0, z: 6 }, { x: -6, z: 4 },
];
/** @type {[string, number, number][]} */
export const discoveries = [
  ["chessmancer", -10, -8], ["dallak", -3, -11], ["dallak-partners", 6, -9],
  ["raiders", 11, -3], ["passengers", 9, 5], ["zidobid", 4, 10],
  ["ledger", -5, 9], ["soragh", -11, 4],
];
export const scenery = [
  { x: -15, z: -10, type: "house-a", radius: 2 },
  { x: -7, z: -15, type: "house-f", radius: 2 },
  { x: 2, z: -16, type: "house-s", radius: 2 },
  { x: 14, z: -9, type: "house-a", radius: 2 },
  { x: 15, z: 3, type: "house-f", radius: 2 },
  { x: 10, z: 13, type: "house-s", radius: 2 },
  { x: 0, z: 15, type: "house-a", radius: 2 },
  { x: -12, z: 12, type: "house-f", radius: 2 },
  { x: -16, z: 2, type: "house-s", radius: 2 },
  { x: -2, z: -1, type: "tree", radius: 0.8 },
  { x: 1, z: 1, type: "tree", radius: 0.8 },
  { x: -18, z: -4, type: "tree", radius: 0.8 },
  { x: 9, z: -15, type: "tree", radius: 0.8 },
  { x: 17, z: 8, type: "tree", radius: 0.8 },
  { x: -7, z: 15, type: "tree", radius: 0.8 },
];

/** @param {readonly Point[]} route @param {number} distance */
export function sampleRoute(route, distance) {
  if (route.length < 2) throw new Error("A route needs at least two points");
  const lengths = route.map((point, i) => { const next = route[(i + 1) % route.length]; return Math.hypot(next.x - point.x, next.z - point.z); });
  const total = lengths.reduce((sum, length) => sum + length, 0);
  if (!total) throw new Error("A route needs a nonzero length");
  let remaining = ((distance % total) + total) % total;
  for (let i = 0; i < route.length; i++) {
    const length = lengths[i];
    if (!length) continue;
    if (remaining < length) {
      const a = route[i], b = route[(i + 1) % route.length], t = remaining / length;
      return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t, heading: Math.atan2(b.x - a.x, b.z - a.z) };
    }
    remaining -= length;
  }
  throw new Error("Unable to sample route");
}

export class FixedStep {
  /** @param {number} step @param {number} maxSteps */
  constructor(step = 1 / 60, maxSteps = 3) { this.step = step; this.maxSteps = maxSteps; this.accumulator = 0; }
  /** @param {number} delta @param {(dt: number) => void} update */
  advance(delta, update) {
    this.accumulator += Math.min(Math.max(delta, 0), this.step * this.maxSteps);
    let count = 0;
    while (this.accumulator + 1e-10 >= this.step && count < this.maxSteps) { update(this.step); this.accumulator = Math.max(0, this.accumulator - this.step); count++; }
  }
  reset() { this.accumulator = 0; }
}

export const roadHalfWidth = 1.4;
export const connections = [[outerRoad[1], innerRoad[1]], [outerRoad[4], innerRoad[4]], [outerRoad[7], innerRoad[6]]];
export const roadSegments = [outerRoad, innerRoad].flatMap((route) => route.map((a, i) => [a, route[(i + 1) % route.length]])).concat(connections);
/** @param {Point} point */
export function distanceFromRoad(point) {
  return Math.min(...roadSegments.map(([a, b]) => {
    const dx = b.x - a.x, dz = b.z - a.z;
    const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.z - a.z) * dz) / (dx * dx + dz * dz)));
    return Math.hypot(point.x - a.x - t * dx, point.z - a.z - t * dz);
  }));
}

/** Map screen directions to the fixed isometric camera's ground plane. @param {number} right @param {number} up */
export function drivingDirection(right, up) {
  const length = Math.hypot(right, up);
  if (!length) return { x: 0, z: 0 };
  const r = right / length, u = up / length;
  return { x: (15 * r - 12 * u) / Math.hypot(12, 15), z: (-12 * r - 15 * u) / Math.hypot(12, 15) };
}

/** @param {number} current @param {number} target @param {number} delta */
export function steerToward(current, target, delta) {
  const difference = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + difference * (1 - Math.exp(-12 * delta));
}

/** @param {Point} velocity @param {Point} direction @param {boolean} brake @param {number} mass */
export function drivingForce(velocity, direction, brake, mass) {
  const moving = Math.hypot(direction.x, direction.z) > 0;
  const speed = brake ? 0 : 6.5, response = moving && !brake ? 6 : 12;
  const ax = (direction.x * speed - velocity.x) * response, az = (direction.z * speed - velocity.z) * response;
  const acceleration = Math.hypot(ax, az), limit = brake ? 35 : 24;
  const factor = acceleration > limit ? limit / acceleration : 1;
  return { x: ax * factor * mass, z: az * factor * mass };
}

export const shoreline = [
  { x: -21, z: -11 }, { x: -16, z: -18 }, { x: -7, z: -20 }, { x: 4, z: -20 },
  { x: 15, z: -16 }, { x: 20, z: -8 }, { x: 21, z: 4 }, { x: 17, z: 15 },
  { x: 5, z: 20 }, { x: -7, z: 19 }, { x: -18, z: 15 }, { x: -21, z: 3 },
];
