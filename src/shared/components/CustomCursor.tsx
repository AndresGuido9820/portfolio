import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' })
    }

    const onEnterLink = () => {
      gsap.to(dot, { scale: 1.4, rotation: 20, duration: 0.2 })
      gsap.to(ring, { width: 56, height: 56, opacity: 1, duration: 0.3 })
    }

    const onLeaveLink = () => {
      gsap.to(dot, { scale: 1, rotation: 0, duration: 0.3 })
      gsap.to(ring, { width: 38, height: 38, opacity: 0.4, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)

    const tick = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX, y: ringY })
    })

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(0,212,255,0.6))',
          width: 22,
          height: 22,
        }}
      >
        <img src="/icons/ball.svg" width={22} height={22} alt="" />
      </div>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 38,
          height: 38,
          border: '1px solid rgba(0,212,255,0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.4,
        }}
      />
    </>
  )
}
