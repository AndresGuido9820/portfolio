import { Volume2, VolumeX } from 'lucide-react'

interface Props {
  playing: boolean
  muted: boolean
  onToggle: () => void
  onMute: () => void
}

export default function AudioToggle({ playing, muted, onToggle, onMute }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onMute}
        className="p-2 transition-all duration-300 hover:scale-110"
        style={{ color: muted ? 'rgba(201,162,39,0.3)' : 'var(--ucl-gold)' }}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      {/* Waveform bars — animate when playing */}
      <button
        onClick={onToggle}
        className="flex items-end gap-[2px] h-4"
        title={playing ? 'Pause anthem' : 'Play anthem'}
      >
        {[1, 0.5, 0.8, 0.4, 1, 0.6].map((h, i) => (
          <span
            key={i}
            className="w-[2px] rounded-full transition-all duration-150"
            style={{
              height: playing && !muted ? `${h * 100}%` : '30%',
              background: playing && !muted ? 'var(--ucl-gold)' : 'rgba(201,162,39,0.3)',
              animation: playing && !muted ? `waveBar ${0.4 + i * 0.1}s ease-in-out infinite alternate` : 'none',
            }}
          />
        ))}
      </button>

      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
