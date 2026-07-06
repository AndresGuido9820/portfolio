import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? (scrolled / max) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[200] pointer-events-none"
      style={{
        height: '2px',
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #10B981 0%, rgba(16,185,129,0.7) 100%)',
        boxShadow: '0 0 10px rgba(16,185,129,0.6)',
        transition: 'width 0.08s linear',
      }}
    />
  )
}
