import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
}

export function useGsapReveal(options: RevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 60,
      x = 0,
      opacity = 0,
      duration = 0.9,
      stagger = 0,
      delay = 0,
      ease = 'power3.out',
    } = options

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? el.children : el

      gsap.fromTo(
        targets,
        { y, x, opacity, filter: 'blur(4px)' },
        {
          y: 0,
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref as React.RefObject<HTMLElement>
}

export function useGsapTimeline() {
  const ref = useRef<HTMLElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll('.timeline-line')
      const cards = el.querySelectorAll('.timeline-card')

      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      tlRef.current
        .fromTo(lines, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut' })
        .fromTo(cards, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.8')
    }, el)

    return () => ctx.revert()
  }, [])

  return ref as React.RefObject<HTMLElement>
}
