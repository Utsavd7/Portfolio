import { proxy } from "valtio"

// Create a state store with Valtio
export const state = proxy({
  spotlight: {
    x: 10,
    y: 10,
    z: 10,
    intensity: 3,
  },
  camera: {
    fov: 45,
    z: 5,
    y: 0,
  },
  group: {
    x: 0,
    y: 0,
    z: 0,
  },
})
