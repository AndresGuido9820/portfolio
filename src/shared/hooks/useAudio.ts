import { useEffect, useRef, useState } from 'react'

export function useAudio(src: string, { loop = false, volume = 0.35 } = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = volume
    audio.preload = 'auto'
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setReady(true))
    audio.addEventListener('error', () => setReady(false))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src, loop, volume])

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => setPlaying(true)).catch(() => {})
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : play())

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  const fadeOut = (duration = 2000) => {
    const audio = audioRef.current
    if (!audio) return
    const start = audio.volume
    const step = start / (duration / 50)
    const id = setInterval(() => {
      if (!audioRef.current) return clearInterval(id)
      if (audioRef.current.volume <= 0) {
        audioRef.current.pause()
        audioRef.current.volume = start
        setPlaying(false)
        clearInterval(id)
      } else {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - step)
      }
    }, 50)
  }

  return { play, pause, toggle, toggleMute, fadeOut, playing, muted, ready }
}
