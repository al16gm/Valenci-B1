import { ArrowRight, NotebookPen } from 'lucide-react';
import type { ErrorDiaryBlock } from '../types';

interface DiaryCardProps {
  block: ErrorDiaryBlock;
  currentDay: number;
  onNextDay: () => void;
}

export function DiaryCard({ block, currentDay, onNextDay }: DiaryCardProps) {
  return (
    <section
      aria-labelledby="diary-heading"
      className="rounded-xl border border-[#BBF7D0] bg-[#F3FAF6] p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#15803D]">
            <NotebookPen className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Metacognició · Tancament de Sessió</span>
          </div>

          <h2
            id="diary-heading"
            className="font-display mt-1.5 text-xl font-bold text-[#181A1F] sm:text-2xl"
          >
            {block.titol}
          </h2>

          <p className="mt-3 text-[15px] leading-[1.68] text-[#1F2937]">
            {block.contingut}
          </p>
        </div>

        {currentDay < 28 && (
          <div className="flex items-end self-end shrink-0">
            <button
              type="button"
              onClick={onNextDay}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-[#86EFAC] bg-white px-4 py-2 text-xs font-semibold text-[#15803D] transition-colors hover:bg-[#DCFCE7] whitespace-nowrap"
            >
              <span>Continuar al Dia {currentDay + 1}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
