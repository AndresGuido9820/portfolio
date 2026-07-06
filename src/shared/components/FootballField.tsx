export default function FootballField() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.13 }}
    >
      <svg
        viewBox="0 0 1050 680"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ filter: 'drop-shadow(0 0 2px #C8FF00)' }}
      >
        {/* Pitch surface alternating stripes */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={i * 150}
            y={0}
            width={150}
            height={680}
            fill={i % 2 === 0 ? 'rgba(0,60,20,0.6)' : 'rgba(0,40,10,0.6)'}
          />
        ))}

        {/* Outer boundary */}
        <rect x="25" y="25" width="1000" height="630" fill="none" stroke="#C8FF00" strokeWidth="3" />

        {/* Halfway line */}
        <line x1="525" y1="25" x2="525" y2="655" stroke="#C8FF00" strokeWidth="2" />

        {/* Center circle */}
        <circle cx="525" cy="340" r="91.5" fill="none" stroke="#C8FF00" strokeWidth="2" />
        <circle cx="525" cy="340" r="4" fill="#C8FF00" />

        {/* Left penalty area */}
        <rect x="25" y="175" width="165" height="330" fill="none" stroke="#C8FF00" strokeWidth="2" />
        {/* Left 6-yard box */}
        <rect x="25" y="265" width="55" height="150" fill="none" stroke="#C8FF00" strokeWidth="2" />
        {/* Left penalty spot */}
        <circle cx="135" cy="340" r="3" fill="#C8FF00" />
        {/* Left penalty arc */}
        <path d="M 190 265 A 91.5 91.5 0 0 1 190 415" fill="none" stroke="#C8FF00" strokeWidth="2" />

        {/* Right penalty area */}
        <rect x="860" y="175" width="165" height="330" fill="none" stroke="#C8FF00" strokeWidth="2" />
        {/* Right 6-yard box */}
        <rect x="970" y="265" width="55" height="150" fill="none" stroke="#C8FF00" strokeWidth="2" />
        {/* Right penalty spot */}
        <circle cx="915" cy="340" r="3" fill="#C8FF00" />
        {/* Right penalty arc */}
        <path d="M 860 265 A 91.5 91.5 0 0 0 860 415" fill="none" stroke="#C8FF00" strokeWidth="2" />

        {/* Corner arcs */}
        <path d="M 25 55 A 30 30 0 0 1 55 25" fill="none" stroke="#C8FF00" strokeWidth="2" />
        <path d="M 995 55 A 30 30 0 0 0 965 25" fill="none" stroke="#C8FF00" strokeWidth="2" />
        <path d="M 25 625 A 30 30 0 0 0 55 655" fill="none" stroke="#C8FF00" strokeWidth="2" />
        <path d="M 995 625 A 30 30 0 0 1 965 655" fill="none" stroke="#C8FF00" strokeWidth="2" />

        {/* Goals */}
        <rect x="0" y="295" width="25" height="90" fill="none" stroke="#C8FF00" strokeWidth="2" />
        <rect x="1025" y="295" width="25" height="90" fill="none" stroke="#C8FF00" strokeWidth="2" />

        {/* UCL center star glow */}
        <circle cx="525" cy="340" r="30" fill="none" stroke="rgba(200,255,0,0.2)" strokeWidth="1" />
      </svg>
    </div>
  )
}
