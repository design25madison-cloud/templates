import { useEffect, useRef, useState } from 'react'
import { Building2 } from 'lucide-react'
import { Section, SectionBadge, cx } from '../components/ui'

/* ---------- Logo marquee ---------- */

function MaskedLogo({
  width,
  mark,
  mask,
  word,
}: {
  width: number
  mark: { src: string; inset: string; maskPos: string; maskSize: string; clip: string }
  mask: string
  word: { src: string; inset: string }
}) {
  return (
    <div className="relative h-[60px] shrink-0 overflow-hidden" style={{ width }}>
      <div className="absolute" style={{ inset: mark.clip }}>
        <div
          className="absolute"
          style={{
            inset: mark.inset,
            maskImage: `url("${mask}")`,
            maskRepeat: 'no-repeat',
            maskPosition: mark.maskPos,
            maskSize: mark.maskSize,
            maskMode: 'alpha',
          }}
        >
          <img alt="" src={mark.src} className="absolute inset-0 block size-full" />
        </div>
      </div>
      <div className="absolute" style={{ inset: word.inset }}>
        <img alt="" src={word.src} className="absolute inset-0 block size-full" />
      </div>
    </div>
  )
}

const LOGOS = [
  <img key="bioplex" src="/assets/logo-bioplex.svg" alt="Bioplex" width={184} height={60} className="shrink-0" />,
  <MaskedLogo
    key="zenithia"
    width={188}
    mask="/assets/logo-zenithia-mask.svg"
    mark={{ src: '/assets/logo-zenithia-mark.svg', clip: '0', inset: '25.91% 67.23% 25.02% 16.25%', maskPos: '-0.451px -0.383px', maskSize: '31.648px 30.176px' }}
    word={{ src: '/assets/logo-zenithia-word.svg', inset: '36.51% 14.28% 35.37% 39.55%' }}
  />,
  <img key="nexiflow" src="/assets/logo-nexiflow.svg" alt="Nexiflow" width={197} height={60} className="shrink-0" />,
  <img key="vortexia" src="/assets/logo-vortexia.svg" alt="Vortexia" width={193} height={60} className="shrink-0" />,
  <MaskedLogo
    key="lumitrix"
    width={207}
    mask="/assets/logo-lumitrix-mask.svg"
    mark={{ src: '/assets/logo-lumitrix-mark.svg', clip: '0', inset: '24.3% 70.58% 22.94% 14.13%', maskPos: '0px -0.406px', maskSize: '31.648px 32.44px' }}
    word={{ src: '/assets/logo-lumitrix-word.svg', inset: '35.98% 13.54% 36.05% 36.29%' }}
  />,
]

export function Logos() {
  return (
    <Section className="pt-16 pb-[66px]">
      <div className="flex flex-col items-center gap-5">
        <p className="text-center text-lg leading-[30.6px] font-medium">Trusted by 10,000+ founders &amp; business owners.</p>
        <div className="group relative h-[60px] w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex gap-4 pr-4">
                {[...LOGOS, ...LOGOS].map((l, i) => <div key={i} className="shrink-0">{l}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------- About ---------- */

const ABOUT =
  'We’re a digital design team focused on empowering SaaS startups and solo founders with bold, high-converting templates powered by AI. We believe in design that moves — fast, flexible, and beautiful. Our goal is to give lean teams the tools to launch standout brands without wasting time or budget.'.split(
    ' ',
  )

// Figma leaves the counters empty (animated in the source template); digit counts match the frame's slot widths.
const STATS = [
  { value: 50, label: 'SaaS brands launched' },
  { value: 120, label: 'Startup Projects' },
  { value: 9, label: 'AI - tools integrated' },
]

const TAGS = [
  { label: 'Faster workflow', src: '/assets/tag-6.svg', left: 321.6, top: 4.47, rot: 15.02, shadow: 'rgba(138,56,245,0.25)' },
  { label: 'B2B Platforms', src: '/assets/tag-5.svg', left: 321.6, top: 102.72, rot: -15.02, shadow: 'rgba(255,182,64,0.25)' },
  { label: 'No-Code Tools', src: '/assets/tag-4.svg', left: 321.6, top: 197.03, rot: 15.02, shadow: 'rgba(0,161,240,0.25)' },
  { label: 'AI - Startups', src: '/assets/tag-3.svg', left: 331.22, top: 299.2, rot: -15.02, shadow: 'rgba(1,173,112,0.25)' },
  { label: 'Lead Gen Tools', src: '/assets/tag-2.svg', left: 182.11, top: 311, rot: 15.02, shadow: 'rgba(254,137,55,0.25)' },
  { label: 'Startup Studios', src: '/assets/tag-1.svg', left: -0.62, top: 316.23, rot: -15.02, shadow: 'rgba(129,199,0,0.25)' },
]

function Tag({ label, src, shadow }: { label: string; src: string; shadow: string }) {
  return (
    <span
      className="relative flex h-10 w-[150px] items-center justify-center overflow-hidden rounded-full text-base leading-6 font-medium whitespace-nowrap text-white"
      style={{ boxShadow: `inset 0 4px 4px 0 ${shadow}` }}
    >
      <img alt="" src={src} width={150} height={40} className="absolute inset-0" />
      <span className="relative">{label}</span>
    </span>
  )
}

function useInViewProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the block's top hits 85% of the viewport, 1 when it reaches 35%.
      setProgress(Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.5), 0), 1))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return [ref, progress] as const
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [run, setRun] = useState(false)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRun(true), { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, value])
  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  )
}

export function About() {
  const [textRef, progress] = useInViewProgress<HTMLParagraphElement>()
  // Figma snapshot shows the first 7 words revealed; scrolling reveals the rest.
  const revealed = Math.max(7, Math.round(progress * ABOUT.length))

  return (
    <Section className="py-16 md:pt-[84px] md:pb-[86px]">
      <div className="relative flex items-center">
        <div className="flex max-w-[986px] flex-col items-start gap-6">
          <SectionBadge icon={<Building2 aria-hidden className="size-[18px] text-brand" strokeWidth={2} />}>
            About Company
          </SectionBadge>
          <div className="flex flex-col gap-[60px]">
            <p
              ref={textRef}
              className="font-display text-[24px] leading-[34px] tracking-[-0.03px] md:text-[32px] md:leading-[44px]"
            >
              {ABOUT.map((w, i) => (
                <span key={i} className={cx('transition-colors duration-300', i < revealed ? 'text-ink' : 'text-muted')}>
                  {w}{' '}
                </span>
              ))}
            </p>
            <div className="flex w-full max-w-[606px] flex-wrap justify-between gap-y-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex w-[180px] flex-col gap-3">
                  <p className="font-display text-[48px] leading-[49.92px] tracking-[-3.5px]">
                    <Counter value={s.value} />+
                  </p>
                  <p className="text-base leading-6 font-medium text-ink/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div aria-hidden className="absolute top-[34.7px] left-[655px] hidden h-[393px] w-[481px] xl:block">
          {TAGS.map((t, i) => (
            <div
              key={t.label}
              className="absolute animate-float"
              style={{ left: t.left + 2.6, top: t.top + 18.75, rotate: `${t.rot}deg`, animationDelay: `${i * -1}s` }}
            >
              <Tag {...t} />
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden className="mt-10 flex flex-wrap gap-2 xl:hidden">
        {TAGS.map((t) => (
          <Tag key={t.label} {...t} />
        ))}
      </div>
    </Section>
  )
}
