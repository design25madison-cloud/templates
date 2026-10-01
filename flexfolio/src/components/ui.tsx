import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

/** 1240px frame with 20px-inset dashed rails, matching the Figma page grid. */
export function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('relative mx-auto w-full max-w-[1240px] px-4 md:px-[52px]', className)}>{children}</div>
}

/** Dashed rule with ring caps that sits on section boundaries. */
export function Divider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx('pointer-events-none absolute inset-x-[15px] flex h-[10px] items-center', className)}>
      <span className="size-[10px] shrink-0 rounded-full border border-ink/12 bg-white" />
      <span className="h-px flex-1 border-t border-dashed border-ink/12" />
      <span className="size-[10px] shrink-0 rounded-full border border-ink/12 bg-white" />
    </div>
  )
}

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cx('relative', className)}>
      <Frame>{children}</Frame>
      <div className="relative mx-auto max-w-[1240px]">
        <Divider className="-bottom-[5px]" />
      </div>
    </section>
  )
}

export function SectionBadge({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex h-[37.8px] items-center gap-1.5 rounded-full border border-ink/10 pr-4 pl-2.5 text-sm leading-[23.8px] font-medium">
      <span className="flex size-[22px] items-center justify-center">{icon}</span>
      {children}
    </span>
  )
}

export function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
}: {
  badge: ReactNode
  title: string
  description: string
  align?: 'center' | 'start'
}) {
  return (
    <div className={cx('flex flex-col gap-4', align === 'center' ? 'items-center text-center' : 'items-start')}>
      {badge}
      <h2 className="font-display text-[36px] leading-[1.04] tracking-[-2px] md:text-[48px] md:leading-[49.92px] md:tracking-[-3.5px]">
        {title}
      </h2>
      <p className={cx('text-base leading-6 font-medium text-ink/60', align === 'center' && 'max-w-[600px]')}>{description}</p>
    </div>
  )
}

/**
 * Pill CTA. Label and arrow are doubled so they can roll on hover,
 * which is what the stacked copies in the Figma layers represent.
 */
export function PillButton({
  children,
  variant = 'light',
  href = '#',
}: {
  children: string
  variant?: 'light' | 'brand'
  href?: string
}) {
  const brand = variant === 'brand'
  return (
    <a
      href={href}
      className={cx(
        'group relative inline-flex h-[51px] shrink-0 items-center rounded-full p-px transition-transform duration-200 active:scale-[0.98]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        brand
          ? 'bg-[radial-gradient(ellipse_at_50%_46%,rgba(230,95,0,0)_0%,rgba(230,95,0,1)_100%)] shadow-[0_10px_24px_0_rgba(215,89,0,0.2),inset_0_4px_4px_0_#f97518] hover:shadow-[0_14px_28px_0_rgba(215,89,0,0.28),inset_0_4px_4px_0_#f97518]'
          : 'bg-white',
      )}
    >
      <span
        className={cx(
          'flex h-[49px] items-center gap-1.5 rounded-full py-3 pr-4 pl-[21px] text-base leading-5 font-semibold',
          brand ? 'bg-brand text-white' : 'bg-white text-ink',
        )}
      >
        <span className="flex h-5 flex-col overflow-hidden">
          <span className="opacity-90 transition-transform duration-300 group-hover:-translate-y-full">{children}</span>
          <span aria-hidden className="opacity-90 transition-transform duration-300 group-hover:-translate-y-full">
            {children}
          </span>
        </span>
        <span className="flex size-[25px] items-center justify-end overflow-hidden">
          <span className="flex shrink-0 -translate-x-0 transition-transform duration-300 group-hover:translate-x-[25px]">
            <ArrowRight aria-hidden className="size-[25px] p-0.5" strokeWidth={2} />
            <ArrowRight aria-hidden className="size-[25px] p-0.5" strokeWidth={2} />
          </span>
        </span>
      </span>
    </a>
  )
}

/** Soft blurred color field used behind the hero and a few sections. */
export function Glow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx('pointer-events-none absolute h-[1022px] w-[1287px]', className)}>
      <div className="absolute top-[118px] left-[256px] h-[553px] w-[776px] bg-white blur-[100px]" />
      <div className="absolute top-[260px] left-[209px] h-[415px] w-[1112px] rotate-[34.1deg] bg-[#fa8484] opacity-20 blur-[100px]" />
      <div className="absolute top-[469px] left-[74px] h-[553px] w-[776px] rounded-[2000px] bg-[rgba(254,131,242,0.1)] blur-[100px]" />
    </div>
  )
}
