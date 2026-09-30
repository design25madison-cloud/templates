import { PillButton, Section, SectionBadge, SectionHeader, cx } from '../components/ui'

const badgeIcon = (src: string) => <img alt="" src={src} width={22} height={22} />

/* ---------- Benefits ---------- */

const BENEFITS = [
  { icon: 'benefit-1', title: 'AI Site Builder', body: 'Instantly generate layouts, sections and content so you can launch in minutes not days.' },
  { icon: 'benefit-2', title: 'Founder-Ready Templates', body: 'Built for SaaS products, pricing pages, launches, and case studies everything a founder needs to go live.' },
  { icon: 'benefit-3', title: 'Portfolio Pages in Seconds', body: 'Highlight your apps, projects, or case studies fast with layouts designed to impress and convert.' },
  { icon: 'benefit-4', title: 'Flexible, Modular Layouts', body: 'Easily swap, duplicate, or re-style any section to match your evolving brand and product as your business scales.' },
  { icon: 'benefit-5', title: 'Conversion-Optimized Design', body: 'Includes pre-optimized call-to-actions, hero messaging, testimonial layouts, and pricing sections tested and ready to launch.' },
]

function BenefitCard({ icon, title, body, className }: (typeof BENEFITS)[number] & { className?: string }) {
  return (
    <article
      className={cx(
        'group flex min-h-[260px] flex-col justify-center gap-8 rounded-3xl border border-white bg-canvas p-[30px] transition-colors duration-300 hover:bg-surface',
        className,
      )}
    >
      <span className="relative flex size-[60px] items-center justify-center rounded-xl border border-ink/12 bg-[linear-gradient(134deg,#f5f5f5_0.84%,#fff_99.16%)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <img alt="" src={`/assets/${icon}.svg`} width={28} height={28} />
      </span>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl leading-5 font-medium tracking-[-0.3px]">{title}</h3>
        <p className="text-base leading-6 font-medium text-ink/60">{body}</p>
      </div>
    </article>
  )
}

export function Benefits() {
  return (
    <Section className="py-16 md:py-[84px]">
      <div className="flex flex-col gap-12">
        <SectionHeader
          badge={<SectionBadge icon={badgeIcon('/assets/badge-benefits.svg')}>Benefits</SectionBadge>}
          title="Build smarter sites, faster"
          description="Pre-optimized templates and AI tools that help founders launch bold, client winning sites without the usual grind."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.title} {...b} className={i < 3 ? 'md:col-span-2' : 'md:col-span-3'} />
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- AI-driven features ---------- */

const FEATURES = [
  {
    eyebrow: 'Setup',
    icon: '/assets/icon-setup.svg',
    title: 'Instant site setup, powered by AI',
    body: 'Launch a beautiful, high-converting site in minutes using smart layout and copy tools built specifically for SaaS founders.',
    image: '/assets/feature-setup.png',
    alt: 'Website setup preview',
    tint: 'bg-feature-blue',
    reverse: false,
  },
  {
    eyebrow: 'Design',
    icon: '/assets/icon-design.svg',
    title: 'Brand-Ready Design, Without the Overhead',
    body: 'From fonts to color schemes, our AI adapts your brand instantly so you look pro without spending weeks on design.',
    image: '/assets/feature-design.png',
    alt: 'Brand style generator preview',
    tint: 'bg-feature-violet',
    reverse: true,
  },
]

export function AiFeatures() {
  return (
    <Section className="py-16 md:py-[100px]">
      <div className="flex flex-col gap-12">
        <SectionHeader
          align="start"
          badge={<SectionBadge icon={badgeIcon('/assets/badge-features.svg')}>Features</SectionBadge>}
          title="AI-driven features"
          description="AI-driven features crafted to launch faster, and help you grow without slowing down."
        />
        <div className="flex flex-col gap-12">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className={cx(
                'flex flex-col items-center gap-10 overflow-hidden rounded-3xl border border-white p-6 md:min-h-[510px] md:gap-[60px] md:p-[60px] lg:flex-row',
                f.tint,
                f.reverse && 'lg:flex-row-reverse',
              )}
            >
              <img
                src={f.image}
                alt={f.alt}
                width={420}
                height={390}
                className="aspect-[420/390] w-full max-w-[420px] shrink-0 rounded-4xl object-cover"
              />
              <div className="flex w-full max-w-[546px] flex-col items-start gap-8">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-1.5 text-sm leading-[23.8px] font-medium text-brand">
                    <img alt="" src={f.icon} width={20} height={20} />
                    {f.eyebrow}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="max-w-[350px] font-display text-[30px] leading-[1.2] tracking-[-1.08px] md:text-[36px] md:leading-[43.2px]">
                      {f.title}
                    </h3>
                    <p className="max-w-[536px] text-base leading-6 font-medium text-ink/60">{f.body}</p>
                  </div>
                </div>
                <PillButton>Learn More</PillButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- Smarter tools ---------- */

const TOOLS = [
  { img: 'tool-1', w: 702, h: 240, pt: 36, title: 'AI-Assisted Page Builder', body: 'Create complete, conversion-focused pages in seconds with our AI layout and copy suggestions no coding or Figma skills required.', span: 'lg:col-span-2', fade: 'h-[63px]' },
  { img: 'tool-2', w: 300, h: 211, pt: 36, title: 'Pre-Built Portfolio Layouts', body: 'Choose from expertly designed study and project templates to showcase.', span: '' },
  { img: 'tool-3', w: 300, h: 221, pt: 30, title: 'Clean, Modular Design System', body: 'Every component is reusable, scalable and easy to customize startups.', span: '' },
  { img: 'tool-4', w: 300, h: 264, pt: 27, title: 'Conversion Driven Sections', body: 'From bold hero headlines to persuasive testimonials and convert visitors.', span: '', fade: 'h-[32px]' },
  { img: 'tool-5', w: 280, h: 192, pt: 56, title: 'Fast Launch site', body: 'Forget dev handoffs. Everything’s ready to go live, getting results immediately.', span: '' },
]

export function Tools() {
  return (
    <Section className="py-16 md:py-[84px]">
      <div className="flex flex-col gap-12">
        <SectionHeader
          badge={<SectionBadge icon={badgeIcon('/assets/badge-features.svg')}>Features</SectionBadge>}
          title="Smarter tools for faster launches"
          description="Pre-built layouts and smart AI tools that help SaaS founders create standout high converting sites faster, cleaner, and hassle free."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <article
              key={t.title}
              className={cx(
                'group flex flex-col rounded-3xl border border-white bg-surface px-6 pb-6',
                i < 2 ? 'lg:min-h-[389px]' : 'lg:min-h-[399px]',
                t.span,
                i === 0 && 'md:col-span-2',
              )}
              style={{ paddingTop: t.pt }}
            >
              <div className="relative mx-auto w-full" style={{ maxWidth: t.w }}>
                <img
                  src={`/assets/${t.img}.png`}
                  alt=""
                  width={t.w}
                  height={t.h}
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {t.fade && (
                  <div
                    aria-hidden
                    className={cx('absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface to-surface/0', t.fade)}
                  />
                )}
              </div>
              <div className="mt-auto flex flex-col gap-4 pt-8">
                <h3 className="text-xl leading-5 font-medium tracking-[-0.3px]">{t.title}</h3>
                <p className="text-base leading-6 font-medium text-ink/60">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
