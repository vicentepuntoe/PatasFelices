import { useEffect, useState } from 'react'

const TIME_ZONE = 'America/Santiago'

function getChileTimeParts(date: Date) {
  const month = new Intl.DateTimeFormat('es-CL', {
    month: 'long',
    timeZone: TIME_ZONE,
  }).format(date)
  const day = new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    timeZone: TIME_ZONE,
  }).format(date)
  const hour = new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(date)
  const minute = new Intl.DateTimeFormat('es-CL', {
    minute: '2-digit',
    timeZone: TIME_ZONE,
  }).format(date)
  const seconds = new Intl.DateTimeFormat('es-CL', {
    second: '2-digit',
    timeZone: TIME_ZONE,
  }).format(date)

  const monthLabel = month.charAt(0).toUpperCase() + month.slice(1)

  return { month: monthLabel, day, hour, minute, seconds }
}

function TickingSeconds({ value }: { value: string }) {
  return (
    <span className="hero-time-seconds" aria-label={`segundos ${value}`}>
      <span key={value} className="hero-time-seconds-digit">
        {value}
      </span>
    </span>
  )
}

export function HeroRealtimeClock() {
  const [parts, setParts] = useState(() => getChileTimeParts(new Date()))

  useEffect(() => {
    const tick = () => setParts(getChileTimeParts(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="hero-realtime" aria-live="polite">
      <p className="hero-realtime-lead">
        Contador en tiempo real para{' '}
        <em>cada rescatado que espera tu ayuda</em>
      </p>
      <p className="hero-realtime-line">
        <span className="hero-time-static">{parts.month}</span>
        <span className="hero-time-meta"> mes </span>
        <span className="hero-time-static">{parts.day}</span>
        <span className="hero-time-meta"> día · </span>
        <span className="hero-time-static">{parts.hour}</span>
        <span className="hero-time-meta">:</span>
        <span className="hero-time-static">{parts.minute}</span>
        <span className="hero-time-meta">:</span>
        <TickingSeconds value={parts.seconds} />
        <span className="hero-time-meta"> seg</span>
      </p>
    </div>
  )
}
