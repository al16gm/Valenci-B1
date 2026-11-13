import { BookOpen, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DayPlan } from '../types';

interface TheoryCardProps {
  day: DayPlan;
  isCompleted: boolean;
  onPrevDay: () => void;
  onNextDay: () => void;
}

export function TheoryCard({
  day,
  isCompleted,
  onPrevDay,
  onNextDay,
}: TheoryCardProps) {
  const weekNumber = Math.ceil(day.dia / 7);

  return (
    <article className="rounded-xl border border-[#E4E0D8] bg-white p-6 sm:p-8">
      {/* Unboxed editorial metadata + Prev/Next navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E0D8] pb-4">
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
                Exercici completat
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
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

      {/* Title & Objective */}
      <div className="mt-6">
        <h1 className="font-display text-2xl font-bold leading-tight text-[#181A1F] [text-wrap:balance] sm:text-3xl">
          {day.titol}
        </h1>

        <p className="mt-3 text-base font-medium leading-relaxed text-[#374151]">
          <span className="text-[#52555E]">Objectiu: </span>
          {day.objectiu}
        </p>
      </div>

      {/* Theory Pill */}
      <div className="mt-6 rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] p-5">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#1D4ED8]">
          <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Píndola Teòrica</span>
        </div>
        <p className="mt-2.5 text-[15px] leading-[1.68] text-[#181A1F] sm:text-base">
          {day.teoria}
        </p>
      </div>
    </article>
  );
}
