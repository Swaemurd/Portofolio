import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01'
const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Text that decodes itself from random glyphs. */
export function Scramble({ text, className, delay = 0 }) {
  const [out, setOut] = useState(reduced() ? text : '')
  useEffect(() => {
    if (reduced()) { setOut(text); return }
    let frame = 0, raf, start
    const len = text.length
    const tick = (t) => {
      if (!start) start = t
      if (t - start < delay) { raf = requestAnimationFrame(tick); return }
      frame++
      const done = Math.floor(frame / 2)
      let s = ''
      for (let i = 0; i < len; i++) {
        if (i < done || text[i] === ' ') s += text[i]
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOut(s)
      if (done < len) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay])
  return <span className={className} aria-label={text}>{out || ' '}</span>
}

/* Cycles through words with the scramble effect. */
export function Rotator({ words, interval = 2800 }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced()) return
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  return <Scramble key={i} text={words[i]} />
}

/* Live clock for a given timezone. */
export function Clock({ tz = 'Asia/Jakarta' }) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="mono tabular">{t}</span>
}

/* Adds .is-in to [data-reveal] elements when they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* Pointer position as CSS variables, for the grid spotlight. */
export function usePointerVars() {
  useEffect(() => {
    const root = document.documentElement
    const move = (e) => {
      root.style.setProperty('--mx', `${e.clientX}px`)
      root.style.setProperty('--my', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
}

/* Scroll progress 0..1 */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? window.scrollY / h : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  return p
}

/* Subtle 3D tilt on hover */
export function Tilt({ children, className, max = 6 }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (reduced()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div ref={ref} className={className} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  )
}
