import { Check, RotateCcw, Shuffle, X } from 'lucide-react';
import { useState } from 'react';
import { WEEK_GROUPS } from '../data/pla28Dies';
import type { DayPlan } from '../types';

interface CurriculumSidebarProps {
  days: DayPlan[];
  activeDay: number;
  completedDays: number[];
  streakCount: number;
  isReviewMode: boolean;
  onSelectDay: (dayNumber: number) => void;
  onStartReviewMode: () => void;
  onResetProgress: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function CurriculumSidebar({
  days,
  activeDay,
  completedDays,
  streakCount,
  isReviewMode,
  onSelectDay,
  onStartReviewMode,
  onResetProgress,
  mobileOpen,
  onCloseMobile,
}: CurriculumSidebarProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const completedSet = new Set(completedDays);
  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / 28) * 100);

  const renderSidebarBody = () => (
    <div className="flex h-full flex-col">
      {/* Progress & Review Mode block */}
      <div className="border-b border-[#E4E0D8] p-5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-[#52555E]">
            Progrés del pla
          </span>
          <span className="font-mono-tabular text-xs font-semibold text-[#181A1F]">
            {String(completedCount).padStart(2, '0')} / 28 dies
          </span>
        </div>

        <div
          className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#EFECE5]"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progrés total dels 28 dies"
        >
          <div
            className="h-full rounded-full bg-[#15803D] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-2.5 flex items-center justify-between text-xs text-[#52555E]">
          <span>Completat: {progressPercent}%</span>
          <span className="font-mono-tabular">
            Ratxa: {streakCount} {streakCount === 1 ? 'dia' : 'dies'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            onStartReviewMode();
            onCloseMobile();
          }}
          className={`mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap ${
            isReviewMode
              ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
              : 'border-[#1D4ED8]/30 bg-[#EFF4FF] text-[#1E40AF] hover:bg-[#DBEAFE]'
          }`}
        >
          <Shuffle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Mode Repàs</span>
          <span className="font-mono-tabular text-xs opacity-80">
            ({Math.min(5, completedCount)}/5)
          </span>
        </button>
      </div>

      {/* 28-day curriculum list grouped by weeks */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {WEEK_GROUPS.map((week) => {
          const weekDays = days.filter((d) => week.dies.includes(d.dia));
          const weekCompleted = weekDays.filter((d) => completedSet.has(d.dia)).length;

          return (
            <section key={week.setmana} aria-label={week.titol}>
              <div className="mb-2 flex items-baseline justify-between gap-2 px-1">
                <h2 className="text-xs font-semibold text-[#181A1F]">
                  Setmana {week.setmana}
                </h2>
                <span className="font-mono-tabular text-xs text-[#52555E]">
                  {weekCompleted}/{weekDays.length}
                </span>
              </div>

              <div className="space-y-1.5">
                {weekDays.map((day) => {
                  const isActive = !isReviewMode && activeDay === day.dia;
                  const isCompleted = completedSet.has(day.dia);

                  let itemStyles =
                    'border-transparent bg-transparent text-[#181A1F] hover:bg-[#F2EFE9]';
                  if (isActive) {
                    itemStyles =
                      'border-[#1D4ED8] bg-[#EFF4FF] text-[#1E3A8A] font-semibold';
                  } else if (isCompleted) {
                    itemStyles =
                      'border-[#BBF7D0] bg-[#F0FDF4] text-[#14532D] hover:bg-[#DCFCE7]';
                  }

                  return (
                    <button
                      key={day.dia}
                      type="button"
                      onClick={() => {
                        onSelectDay(day.dia);
                        onCloseMobile();
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex min-h-[42px] w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${itemStyles}`}
                    >
                      <span
                        className={`font-mono-tabular shrink-0 text-xs font-semibold ${
                          isActive
                            ? 'text-[#1D4ED8]'
                            : isCompleted
                              ? 'text-[#15803D]'
                              : 'text-[#52555E]'
                        }`}
                      >
                        {String(day.dia).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1 truncate">{day.titol}</span>

                      {isCompleted && (
                        <span
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#15803D] text-white"
                          title="Exercici resolt correctament"
                          aria-label="Completat"
                        >
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Subtle progress reset control */}
      <div className="border-t border-[#E4E0D8] p-4">
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#52555E] transition-colors hover:bg-[#F2EFE9] hover:text-[#181A1F]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reiniciar progrés</span>
          </button>
        ) : (
          <div className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-3">
            <p className="text-xs font-medium text-[#991B1B]">
              Vols esborrar totes les marques i tornar al Dia 1?
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="flex-1 rounded-md bg-[#B91C1C] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#991B1B]"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="flex-1 rounded-md border border-[#E4E0D8] bg-white px-2.5 py-1.5 text-xs font-medium text-[#181A1F] hover:bg-[#F2EFE9]"
              >
                Cancel·lar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop persistent lateral menu */}
      <aside
        aria-label="Selector de dies del pla"
        className="hidden lg:block w-[300px] shrink-0"
      >
        <div className="sticky top-[73px] max-h-[calc(100vh-96px)] overflow-hidden rounded-xl border border-[#E4E0D8] bg-white">
          {renderSidebarBody()}
        </div>
      </aside>

      {/* Mobile responsive slide-over menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú dels 28 dies"
        >
          <div
            className="fixed inset-0 bg-[#181A1F]/40 backdrop-blur-[1px]"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 flex h-full w-full max-w-[320px] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E4E0D8] px-4 py-3">
              <span className="font-display text-base font-bold text-[#181A1F]">
                Pla 28 Dies · Selector
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Tancar menú"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#52555E] hover:bg-[#F2EFE9] hover:text-[#181A1F]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">{renderSidebarBody()}</div>
          </div>
        </div>
      )}
    </>
  );
}
