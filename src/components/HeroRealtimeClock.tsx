import { useEffect, useState } from 'react'

const TIME_ZONE = 'America/Santiago'

type ChileClock = {
  text: string
  seconds: string
  dateTime: string
}

function buildChileClock(date: Date): ChileClock {
  const dateLabel = new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: TIME_ZONE,
  }).format(date)

  const timeLabel = new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    hourCycle: 'h23',
    timeZone: TIME_ZONE,
  }).format(date)

  const seconds = new Intl.DateTimeFormat('es-CL', {
    second: '2-digit',
    timeZone: TIME_ZONE,
  }).format(date)

  const dateTime = new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
  })
    .format(date)
    .replace(' ', 'T')

  const capitalizedDate =
    dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1)

  const timeWithoutSeconds = timeLabel.replace(/:\d{2}$/, '')

  return {
    text: `${capitalizedDate}, ${timeWithoutSeconds}`,
    seconds,
    dateTime,
  }
}

export function HeroRealtimeClock() {
  const [clock, setClock] = useState(() => buildChileClock(new Date()))

  useEffect(() => {
    const tick = () => setClock(buildChileClock(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className="hero-realtime" aria-live="polite">
      <span className="hero-realtime-intro">
        Contador en tiempo real para cada rescatado que espera tu ayuda:{' '}
      </span>
      <time className="hero-realtime-moment" dateTime={clock.dateTime}>
        {clock.text}
        <span className="hero-realtime-colon" aria-hidden>
          :
        </span>
        {clock.seconds}
      </time>
      <span className="hero-realtime-intro"> h (Santiago, Chile).</span>
    </p>
  )
}
