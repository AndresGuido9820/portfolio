import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

/**
 * Subtle magnetic hover: the element leans toward the cursor and
 * springs back on leave. Strength kept low on purpose — calm, not circus.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.25) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return // skip touch devices

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [ref, strength])
}
