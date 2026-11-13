import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DayPlan } from '../types';

interface DayHeaderProps {
  day: DayPlan;
  isCompleted: boolean;
  onPrevDay: () => void;
  onNextDay: () => void;
}

export function DayHeader({
  day,
  isCompleted,
  onPrevDay,
  onNextDay,
}: DayHeaderProps) {
  const weekNumber = Math.ceil(day.dia / 7);

  return (
    <header className="rounded-xl border border-[#E4E0D8] bg-white px-6 py-5 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#52555E]">
            <span className="font-mono-tabular font-semibold text-[#1D4ED8]">
              Dia {String(day.dia).padStart(2, '0')} de 28
            </span>
            <span aria-hidden="true">·</span>
            <span>Setmana {weekNumber}</span>
            {isCompleted && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#15803D]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Sessió completada
                </span>
              </>
            )}
          </div>

          <h1 className="font-display mt-2 text-2xl font-bold leading-tight text-[#181A1F] [text-wrap:balance] sm:text-3xl">
            {day.titol}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPrevDay}
            disabled={day.dia <= 1}
            aria-label="Dia anterior"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] px-3 py-1.5 text-xs font-medium text-[#181A1F] transition-colors hover:bg-[#F2EFE9] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Anterior</span>
          </button>
          <button
            type="button"
            onClick={onNextDay}
            disabled={day.dia >= 28}
            aria-label="Dia següent"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] px-3 py-1.5 text-xs font-medium text-[#181A1F] transition-colors hover:bg-[#F2EFE9] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
          >
            <span>Següent</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
