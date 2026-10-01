import { useEffect, useRef, useState } from 'react'
import { Section, SectionBadge, SectionHeader, cx } from '../components/ui'

const badgeIcon = (src: string) => <img alt="" src={src} width={22} height={22} />

/* ---------- How it works ---------- */

const STEPS = [
  { icon: 'step-1', title: 'Pick a template', body: 'Clean, confident. Sets the foundation with minimal words.' },
  { icon: 'step-2', title: 'Customize with AI', body: 'Direct and modern clearly shows value and tech power.' },
  { icon: 'step-3', title: 'Launch your site', body: 'Clear and motivating focused on action and result.' },
]

/**
 * Connectors between steps. The Figma frame only exports these as flat
 * brand/40 boxes (286×49 and 286×48); drawn here as dashed curves in the same slots.
 */
function Connector({ dir, className }: { dir: 'down' | 'up'; className: string }) {
  const d = dir === 'down' ? 'M2 4 C 90 4, 110 45, 143 45 S 200 4, 284 4' : 'M2 44 C 90 44, 110 4, 143 4 S 200 44, 284 44'
  return (
    <svg aria-hidden width={286} height={49} viewBox="0 0 286 49" fill="none" className={cx('absolute hidden lg:block', className)}>
      <path d={d} stroke="rgba(249,117,24,0.4)" strokeWidth={1.5} strokeDasharray="5 5" strokeLinecap="round" />
    </svg>
  )
}

export function HowItWorks() {
  return (
    <Section className="py-16 md:py-[84px]">
      <div className="flex flex-col gap-12">
        <SectionHeader
          badge={<SectionBadge icon={badgeIcon('/assets/badge-how.svg')}>How it works</SectionBadge>}
          title="How it works"
          description="A smooth 3-step process to get your SaaS or client site live"
        />
        <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-7">
          {STEPS.map((s) => (
            <li key={s.title} className="flex flex-col items-center gap-8 text-center">
              <span className="relative size-20">
                <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand/40" />
                <span className="absolute inset-2 flex items-center justify-center rounded-full border border-white bg-surface">
                  <img alt="" src={`/assets/${s.icon}.svg`} width={28} height={28} />
                </span>
              </span>
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl leading-5 font-medium tracking-[-0.3px]">{s.title}</h3>
                <p className="max-w-[292px] text-base leading-6 font-medium text-ink/60">{s.body}</p>
              </div>
            </li>
          ))}
          <Connector dir="down" className="top-[39px] left-[233px]" />
          <Connector dir="up" className="top-0 left-[616px]" />
        </ol>
      </div>
    </Section>
  )
}

/* ---------- Testimonials ---------- */

const QUOTES = [
  {
    name: 'Alex Carter',
    role: 'Founder at LaunchWise',
    avatar: '/assets/author-1.png',
    quote: '“I built a site for my SaaS launch in one evening. the AI suggestions saved hours, and the design looked like I hired a top agency.”',
  },
  {
    name: 'Ayaan Malik',
    role: 'Growth Strategist at StartPilot',
    avatar: '/assets/author-2.png',
    quote: '“Finally, a site builder that doesn’t look generic. the templates are sharp, fast, to convert. ym startup’s landing page was live in a day.”',
  },
  {
    name: 'Rajiv Sharma',
    role: 'QuickFlow Solo SaaS Builder',
    avatar: '/assets/author-3.png',
    quote: '“This helped me look like a legit brand from day one. clients were impressed and 3 calls right after site launching. Great work!”',
  },
]

// The frame's slider holds the three quotes repeated three times.
const SLIDES = [...QUOTES, ...QUOTES, ...QUOTES]
const GAP = 24

function useVisibleCount() {
  const [n, setN] = useState(3)
  useEffect(() => {
    const update = () => setN(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return n
}

export function Testimonials() {
  const visible = useVisibleCount()
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [cardW, setCardW] = useState(363)
  const max = SLIDES.length - visible

  useEffect(() => {
    const measure = () => {
      const w = trackRef.current?.parentElement?.clientWidth ?? 1136
      setCardW((w - GAP * (visible - 1)) / visible)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [visible])

  useEffect(() => setIndex((i) => Math.min(i, max)), [max])

  const arrow = (dir: 'prev' | 'next') => {
    const disabled = dir === 'prev' ? index === 0 : index === max
    return (
      <button
        type="button"
        aria-label={dir === 'prev' ? 'Previous testimonials' : 'Next testimonials'}
        disabled={disabled}
        onClick={() => setIndex((i) => (dir === 'prev' ? Math.max(0, i - 1) : Math.min(max, i + 1)))}
        className="size-12 rounded-xl transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-40"
      >
        <img alt="" src={`/assets/arrow-${dir}.svg`} width={48} height={48} />
      </button>
    )
  }

  return (
    <Section className="py-16 md:py-[84px]">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="start"
            badge={<SectionBadge icon={badgeIcon('/assets/badge-testimonials.svg')}>Testimonials</SectionBadge>}
            title="Trusted by Founders"
            description="See how SaaS founders and lean teams are using our AI tools to launch smarter."
          />
          <div className="flex gap-4 md:mb-[-1px]">
            {arrow('prev')}
            {arrow('next')}
          </div>
        </div>

        <div className="overflow-hidden" aria-roledescription="carousel">
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
            style={{ gap: GAP, transform: `translateX(-${index * (cardW + GAP)}px)` }}
          >
            {SLIDES.map((q, i) => (
              <figure
                key={i}
                aria-hidden={i < index || i >= index + visible}
                className="flex min-h-[314px] shrink-0 flex-col gap-12 rounded-2xl border border-white bg-surface p-8"
                style={{ width: cardW }}
              >
                <figcaption className="flex items-center gap-4">
                  <img src={q.avatar} alt="" width={48} height={48} className="size-12 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <span className="text-lg leading-[25.2px] font-medium tracking-[-0.36px]">{q.name}</span>
                    <span className="text-sm leading-[23.8px] font-medium text-ink/60">{q.role}</span>
                  </div>
                </figcaption>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <img src="/assets/stars.svg" alt="5 out of 5 stars" width={98} height={14} />
                    <span className="text-base leading-6 font-medium">5.0</span>
                  </div>
                  <blockquote className="text-lg leading-[25.2px] font-medium tracking-[-0.36px]">{q.quote}</blockquote>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
