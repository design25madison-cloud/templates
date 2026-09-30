import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Star, X } from 'lucide-react'
import { Divider, PillButton, cx } from '../components/ui'

const NAV = ['About', 'Pricing', 'Career', 'Blog']
const HEADLINE = ['Launch your AI or SaaS', 'startup in days']

export function Navigation() {
  const [open, setOpen] = useState(false)
  return (
    <header className="relative z-20 px-4 py-6 md:px-[30px]">
      <div className="mx-auto flex h-[51px] max-w-[1160px] items-center justify-between">
        <a href="#" aria-label="Flexfolio home" className="flex h-12 items-center">
          <img src="/assets/logo.svg" alt="Flexfolio" width={152} height={48} />
        </a>

        <nav className="hidden items-center gap-7 text-base leading-6 font-medium md:flex">
          <a href="#" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
            All Pages <ChevronDown aria-hidden className="size-4" strokeWidth={2.25} />
          </a>
          {NAV.map((l) => (
            <a key={l} href="#" className="transition-opacity hover:opacity-70">
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <PillButton>Get Started</PillButton>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-full bg-white md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-4 top-[88px] flex flex-col gap-1 rounded-3xl border border-ink/8 bg-white p-3 shadow-[0_12px_32px_rgba(30,13,1,0.08)] md:hidden">
          {['All Pages', ...NAV].map((l) => (
            <a key={l} href="#" className="rounded-xl px-3 py-2.5 font-medium hover:bg-canvas">
              {l}
            </a>
          ))}
          <div className="px-1 pt-2 pb-1">
            <PillButton variant="brand">Get Started</PillButton>
          </div>
        </div>
      )}
    </header>
  )
}

function ReleaseBadge() {
  return (
    <a
      href="#"
      className="flex h-[35.8px] items-center gap-3 rounded-full border border-ink/8 py-1 pr-4 pl-1 transition-colors hover:bg-white/60"
    >
      <span className="flex h-[27.8px] items-center gap-1 rounded-full bg-brand/10 px-3 py-0.5">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping-soft rounded-full bg-brand opacity-75" />
          <span className="relative size-2 rounded-full bg-brand" />
        </span>
        <span className="text-sm leading-[23.8px] font-medium text-brand">New</span>
      </span>
      <span className="text-[15px] leading-[25.5px] font-medium text-ink/60">Upcoming version 2.0</span>
    </a>
  )
}

function Reviews() {
  return (
    <div className="relative flex h-10 items-center gap-3 rounded-full border border-ink/12 bg-white/20 py-1.5 pr-4 pl-2 backdrop-blur-[8px]">
      <div className="flex">
        {[1, 2, 3].map((n, i) => (
          <img
            key={n}
            src={`/assets/avatar-${n}.png`}
            alt=""
            className={cx('size-7 rounded-full border border-white/20 object-cover', i > 0 && '-ml-2.5')}
          />
        ))}
      </div>
      <span className="h-4 w-px bg-ink/12" />
      <span className="text-base leading-6 font-medium whitespace-nowrap text-ink/60">2.4k+ Reviews</span>
      <span className="h-4 w-px bg-ink/12" />
      <span className="flex items-center gap-1.5">
        <span className="text-base leading-6 font-medium text-ink/60">5.0</span>
        <span className="flex gap-0.5" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} aria-hidden className="size-[15px] fill-star text-star" strokeWidth={0} />
          ))}
        </span>
      </span>
      <span aria-hidden className="absolute top-[14px] -left-[5px] size-[10px] rounded-full border border-ink/12 bg-white" />
      <span aria-hidden className="absolute top-[14px] -right-[5px] size-[10px] rounded-full border border-ink/12 bg-white" />
    </div>
  )
}

/** Dashboard preview; tilts back on load and flattens as it scrolls into view. */
function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState(14)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const progress = Math.min(Math.max((window.innerHeight - r.top) / (window.innerHeight * 0.9), 0), 1)
      setTilt(14 * (1 - progress))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={ref} className="w-full max-w-[1068px] [perspective:1600px]">
      <div
        className="mx-auto w-[97.3%] rounded-[23.344px] bg-white/24 p-[2.2%] backdrop-blur-[38.906px] transition-transform duration-150 ease-out"
        style={{ transform: `rotateX(${tilt}deg)`, transformOrigin: '50% 100%' }}
      >
        <img
          src="/assets/dashboard.png"
          alt="Flexfolio dashboard showing projects, sales overview, AI insights and top-performing templates"
          width={992}
          height={700}
          className="block h-auto w-full rounded-[11.672px]"
        />
      </div>
    </div>
  )
}

export function Hero() {
  let wordIndex = 0
  return (
    <section className="relative">
      <div className="relative mx-auto max-w-[1240px]">
        <Divider className="-top-[5px]" />
      </div>
      <div className="relative mx-auto flex max-w-[1240px] flex-col items-center px-4 pt-[64px] pb-16 md:px-[52px] md:pt-[101px] md:pb-20">
        <div className="flex w-full max-w-[630px] flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ReleaseBadge />
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="font-display text-[44px] leading-[1] font-medium tracking-[-2.5px] md:text-[60px] md:leading-[60px] md:tracking-[-3.5px]">
                {HEADLINE.map((line) => (
                  <span key={line} className="block">
                    {line.split(' ').map((w) => (
                      <span
                        key={w}
                        className="inline-block animate-word-in"
                        style={{ animationDelay: `${wordIndex++ * 70}ms` }}
                      >
                        {w}&nbsp;
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
              <p className="text-base leading-6 text-ink/60">
                Built for SaaS founders, solo creators, and lean agencies who need to launch fast look polished, and
                make a bold impression from day one.
              </p>
            </div>
          </div>
          <PillButton variant="brand">Contact Us</PillButton>
        </div>

        {/* Reviews pill sits on a section rule, as in the frame */}
        <div className="relative mt-16 flex w-full justify-center">
          <Divider className="top-1/2 -translate-y-1/2 max-md:hidden md:-inset-x-[37px]" />
          <Reviews />
        </div>

        <div className="mt-12 flex w-full justify-center">
          <DashboardPreview />
        </div>
      </div>
      <div className="relative mx-auto max-w-[1240px]">
        <Divider className="-bottom-[5px]" />
      </div>
    </section>
  )
}
