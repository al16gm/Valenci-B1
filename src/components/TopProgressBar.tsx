import { Check, Shuffle } from 'lucide-react';
import { motion } from 'motion/react';

interface TopProgressBarProps {
  completedCount: number;
  totalDays?: number;
  streakCount: number;
  isReviewMode: boolean;
  onStartReviewMode: () => void;
}

export function TopProgressBar({
  completedCount,
  totalDays = 28,
  streakCount,
  isReviewMode,
  onStartReviewMode,
}: TopProgressBarProps) {
  const ratio = Math.max(0, Math.min(1, completedCount / totalDays));
  const percentage = Math.round(ratio * 100);
  const isAllDone = completedCount >= totalDays;

  return (
    <section
      aria-label="Progrés global del pla de 28 dies"
      className="mb-6 rounded-xl border border-[#E4E0D8] bg-white px-5 py-4 sm:px-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-xs font-semibold text-[#52555E]">
            Progrés del pla
          </span>
          <span aria-hidden="true" className="text-xs text-[#E4E0D8]">
            ·
          </span>
          <span className="font-mono-tabular text-sm font-semibold text-[#181A1F]">
            {String(completedCount).padStart(2, '0')} / {totalDays} dies
          </span>
          <span aria-hidden="true" className="text-xs text-[#E4E0D8]">
            ·
          </span>
          <span
            className={`font-mono-tabular inline-flex items-center gap-1 text-sm font-bold ${
              isAllDone ? 'text-[#15803D]' : 'text-[#1D4ED8]'
            }`}
          >
            {isAllDone && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            {percentage}% completat
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono-tabular text-xs font-medium text-[#52555E]">
            Ratxa: {streakCount} {streakCount === 1 ? 'dia' : 'dies'}
          </span>

          <button
            type="button"
            onClick={onStartReviewMode}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors lg:hidden whitespace-nowrap ${
              isReviewMode
                ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
                : 'border-[#1D4ED8]/30 bg-[#EFF4FF] text-[#1E40AF]'
            }`}
          >
            <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Mode Repàs</span>
          </button>
        </div>
      </div>

      {/* Animated graphic progress bar with weekly milestone markers */}
      <div className="relative mt-3">
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Has completat ${completedCount} de ${totalDays} dies (${percentage}%)`}
          className="relative h-3 w-full overflow-hidden rounded-full bg-[#EFECE5]"
        >
          <motion.div
            initial={false}
            animate={{ scaleX: ratio }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: 'left center' }}
            className={`h-full w-full rounded-full ${
              isAllDone
                ? 'bg-[#15803D]'
                : 'bg-gradient-to-r from-[#1D4ED8] to-[#15803D]'
            }`}
          />
        </div>

        {/* Subtle weekly milestone separators (7, 14, 21 days) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex"
        >
          <div className="w-1/4 border-r border-white/70" />
          <div className="w-1/4 border-r border-white/70" />
          <div className="w-1/4 border-r border-white/70" />
          <div className="w-1/4" />
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between font-mono-tabular text-[11px] text-[#52555E]">
        <span>Setmana 1</span>
        <span>Setmana 2</span>
        <span>Setmana 3</span>
        <span>Setmana 4</span>
      </div>
    </section>
  );
}
