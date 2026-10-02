import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const timings = {
  fast: 0.3,
  base: 0.6,
  slow: 1.0,
  pageTransition: 1.2
}

export const easings = {
  power3Out: 'power3.out',
  power4Out: 'power4.out',
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
}

export { gsap, ScrollTrigger }
