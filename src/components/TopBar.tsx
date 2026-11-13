import { motion } from 'motion/react';
import { WEEK_GROUPS } from '../data/pla28Dies';

interface TopBarProps {
  activeWeek: number;
  completedCount: number;
  isReviewMode: boolean;
  onSelectWeek: (weekNumber: number) => void;
  onOpenSystemInstructions: () => void;
  onOpenMobileMenu: () => void;
}

export function TopBar({
  activeWeek,
  completedCount,
  isReviewMode,
  onSelectWeek,
  onOpenSystemInstructions,
  onOpenMobileMenu,
}: TopBarProps) {
  const ratio = Math.max(0, Math.min(1, completedCount / 28));

  return (
    <header className="sticky top-0 z-30 border-b border-[#E4E0D8] bg-[#FAF9F6]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:gap-8 lg:px-8">
        {/* Zone 1: Single text-element Brand Zone + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Obrir selector de dies"
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-[#E4E0D8] bg-white px-3 text-sm font-medium text-[#181A1F] transition-colors hover:bg-[#F2EFE9] lg:hidden whitespace-nowrap shrink-0"
          >
            Dies 1–28
          </button>
          <a
            href="#inici"
            onClick={(e) => {
              e.preventDefault();
              onSelectWeek(1);
            }}
            className="font-display text-lg font-bold tracking-tight text-[#181A1F] whitespace-nowrap shrink-0 sm:text-xl"
          >
            CIEACOVA B1
          </a>
        </div>

        {/* Zone 2: 4 concise single-line navigation links (Setmana 1–4) */}
        <nav
          aria-label="Navegació per setmanes"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {WEEK_GROUPS.map((week) => {
            const isCurrent = !isReviewMode && activeWeek === week.setmana;
            return (
              <button
                key={week.setmana}
                type="button"
                onClick={() => onSelectWeek(week.setmana)}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'text-[#1D4ED8] font-semibold'
                    : 'text-[#52555E] hover:text-[#181A1F]'
                }`}
              >
                Setmana {week.setmana}
                {isCurrent && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[13px] h-[2px] bg-[#1D4ED8]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSystemInstructions}
            className="min-h-[40px] rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E40AF] whitespace-nowrap shrink-0 sm:text-sm"
          >
            Instruccions IA
          </button>
        </div>
      </div>

      {/* Always-visible slim animated progress rail at top edge of viewport */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full overflow-hidden bg-[#EFECE5]"
      >
        <motion.div
          initial={false}
          animate={{ scaleX: ratio }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left center' }}
          className={`h-full w-full ${
            completedCount >= 28 ? 'bg-[#15803D]' : 'bg-[#1D4ED8]'
          }`}
        />
      </div>
    </header>
  );
}
