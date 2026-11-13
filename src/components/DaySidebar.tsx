import { useState } from 'react';
import { Check, ChevronDown, RotateCcw, X } from 'lucide-react';
import { WEEK_GROUPS } from '../data/pla28Dies';
import type { DayPlan } from '../types';

interface DaySidebarProps {
  days: DayPlan[];
  activeDay: number;
  completedDays: number[];
  streakCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onSelectDay: (dia: number) => void;
  onResetProgress: () => void;
}

export function DaySidebar({
  days,
  activeDay,
  completedDays,
  streakCount,
  mobileOpen,
  onCloseMobile,
  onSelectDay,
  onResetProgress,
}: DaySidebarProps) {
  const activeWeek = Math.ceil(activeDay / 7);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum],
    }));
  };

  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / days.length) * 100);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Progress Summary */}
      <div className="p-5 border-b border-[#E4E0D8] bg-white lg:rounded-t-2xl">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#52555E]">
            Progrés del pla
          </span>
          <span className="font-mono-tabular text-xs font-semibold text-[#181A1F]">
            {String(completedCount).padStart(2, '0')} / {days.length} dies
          </span>
        </div>

        <div
          className="w-full h-2 bg-[#EFECE5] rounded-full overflow-hidden mb-3"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progrés total del pla de 28 dies"
        >
          <div
            className="h-full bg-[#15803D] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#52555E]">
          <span className="font-mono-tabular">
            Ratxa: <strong className="text-[#181A1F]">{streakCount}</strong>{' '}
            {streakCount === 1 ? 'dia' : 'dies'}
          </span>

          {completedCount > 0 && !confirmReset && (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1 text-xs text-[#52555E] hover:text-[#B91C1C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reiniciar
            </button>
          )}

          {confirmReset && (
            <span className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="font-semibold text-[#B91C1C] hover:underline cursor-pointer"
              >
                Confirmar
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="text-[#52555E] hover:underline cursor-pointer"
              >
                Cancel·lar
              </button>
            </span>
          )}
        </div>
      </div>

      {/* 28-Day Grouped List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#FAF9F6] lg:bg-white lg:rounded-b-2xl">
        {WEEK_GROUPS.map((week) => {
          const isExpanded = expandedWeeks[week.setmana] ?? week.setmana === activeWeek;
          const weekCompletedCount = week.dies.filter((d) =>
            completedDays.includes(d)
          ).length;

          return (
            <div
              key={week.setmana}
              className="border border-[#E4E0D8] rounded-xl bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleWeek(week.setmana)}
                aria-expanded={isExpanded}
                className="w-full px-3.5 py-3 flex items-center justify-between gap-2 text-left hover:bg-[#FAF9F6] transition-colors cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#181A1F] truncate">
                    {week.titol}
                  </div>
                  <div className="text-[11px] text-[#52555E] font-mono-tabular mt-0.5">
                    {weekCompletedCount}/{week.dies.length} completats
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#52555E] shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="px-2 pb-2 pt-1 space-y-1 border-t border-[#F0ECE3]">
                  {week.dies.map((dayNum) => {
                    const dayObj = days.find((item) => item.dia === dayNum);
                    if (!dayObj) return null;
                    const isActive = dayNum === activeDay;
                    const isCompleted = completedDays.includes(dayNum);

                    let buttonStyle =
                      'bg-white border-transparent text-[#272A30] hover:bg-[#F5F3EE]';
                    if (isActive && isCompleted) {
                      buttonStyle =
                        'bg-[#EFF4FF] border-[#1D4ED8] text-[#1E3A8A]';
                    } else if (isActive) {
                      buttonStyle =
                        'bg-[#EFF4FF] border-[#1D4ED8] text-[#1E3A8A]';
                    } else if (isCompleted) {
                      buttonStyle =
                        'bg-[#F0FDF4] border-[#BBF7D0] text-[#14532D] hover:bg-[#DCFCE7]';
                    }

                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => {
                          onSelectDay(dayNum);
                          onCloseMobile();
                        }}
                        aria-current={isActive ? 'page' : undefined}
                        className={`w-full min-h-[44px] px-2.5 py-2 rounded-lg border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${buttonStyle}`}
                      >
                        <span
                          className={`font-mono-tabular text-xs font-semibold w-6 shrink-0 ${
                            isActive
                              ? 'text-[#1D4ED8]'
                              : isCompleted
                              ? 'text-[#15803D]'
                              : 'text-[#52555E]'
                          }`}
                        >
                          {String(dayNum).padStart(2, '0')}
                        </span>

                        <span className="text-[13px] font-medium leading-snug flex-1 line-clamp-2">
                          {dayObj.titol}
                        </span>

                        {isCompleted && (
                          <span
                            title="Exercici resolt correctament"
                            aria-label="Completat"
                            className="w-5 h-5 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0"
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Rail */}
      <aside
        aria-label="Selector de dies del pla"
        className="hidden lg:block w-80 shrink-0 sticky top-22 max-h-[calc(100vh-6.5rem)] rounded-2xl border border-[#E4E0D8] bg-white overflow-hidden"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Menú dels 28 dies"
        >
          <div
            className="fixed inset-0 bg-[#181A1F]/40 backdrop-blur-[1px]"
            onClick={onCloseMobile}
          />
          <div className="relative w-full max-w-xs bg-[#FAF9F6] h-full flex flex-col border-r border-[#E4E0D8] z-10">
            <div className="px-4 h-14 border-b border-[#E4E0D8] bg-white flex items-center justify-between shrink-0">
              <span className="font-display font-bold text-base text-[#181A1F]">
                Pla de 28 Dies
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Tancar menú de dies"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#52555E] hover:bg-[#F5F3EE] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
