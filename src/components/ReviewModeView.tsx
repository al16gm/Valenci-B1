import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Shuffle,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import type { ReviewExerciseItem } from '../utils/storage';

interface ReviewModeViewProps {
  reviewItems: ReviewExerciseItem[];
  completedCount: number;
  onShuffleNewBatch: () => void;
  onExitReview: () => void;
  onOpenDay: (dayNumber: number) => void;
}

export function ReviewModeView({
  reviewItems,
  completedCount,
  onShuffleNewBatch,
  onExitReview,
  onOpenDay,
}: ReviewModeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showSummary, setShowSummary] = useState(false);

  const handleRestartShuffle = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowSummary(false);
    onShuffleNewBatch();
  };

  if (completedCount === 0 || reviewItems.length === 0) {
    return (
      <section className="rounded-xl border border-[#E4E0D8] bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#DBEAFE] bg-[#EFF4FF] text-[#1D4ED8]">
          <Shuffle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="font-display mt-4 text-2xl font-bold text-[#181A1F]">
          Mode Repàs encara no disponible
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#52555E]">
          Aquesta modalitat selecciona aleatòriament fins a 5 exercicis dels dies que ja has
          resolt correctament. Completa almenys un dia del pla per a començar a repassar.
        </p>
        <button
          type="button"
          onClick={onExitReview}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Tornar al Pla Diari</span>
        </button>
      </section>
    );
  }

  const total = reviewItems.length;
  const correctTotal = reviewItems.filter(
    (item) => answers[item.id] === item.exercise.resposta_correcta
  ).length;

  if (showSummary) {
    return (
      <section className="rounded-xl border border-[#E4E0D8] bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E0D8] pb-4">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8]">
              Sessió de Repàs completada
            </p>
            <h1 className="font-display mt-1 text-2xl font-bold text-[#181A1F] sm:text-3xl">
              Resultat:{' '}
              <span className="font-mono-tabular">
                {correctTotal} / {total}
              </span>{' '}
              encerts
            </h1>
          </div>

          <button
            type="button"
            onClick={onExitReview}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] px-3.5 py-2 text-xs font-semibold text-[#181A1F] hover:bg-[#F2EFE9]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Tornar al Pla</span>
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {reviewItems.map((item) => {
            const chosen = answers[item.id];
            const ok = chosen === item.exercise.resposta_correcta;
            return (
              <div
                key={item.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4 ${
                  ok
                    ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                    : 'border-[#FECACA] bg-[#FEF2F2]'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  {ok ? (
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#B91C1C]"
                      aria-hidden="true"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#181A1F]">
                      <span className="font-mono-tabular">
                        Dia {String(item.dia).padStart(2, '0')}
                      </span>{' '}
                      · {item.exercise.pregunta}
                    </p>
                    <p className="mt-0.5 text-xs text-[#52555E]">
                      {ok
                        ? 'Consolidat correctament.'
                        : `Resposta correcta: «${item.exercise.opcions[item.exercise.resposta_correcta]}»`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDay(item.dia)}
                  className="rounded-lg border border-[#E4E0D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#181A1F] hover:bg-[#FAF9F6] whitespace-nowrap"
                >
                  Obrir Dia {item.dia}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRestartShuffle}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF]"
          >
            <Shuffle className="h-4 w-4" aria-hidden="true" />
            <span>Generar un altre repàs (5 aleatoris)</span>
          </button>

          <button
            type="button"
            onClick={onExitReview}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E4E0D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#181A1F] transition-colors hover:bg-[#FAF9F6]"
          >
            <span>Tornar al Pla Diari</span>
          </button>
        </div>
      </section>
    );
  }

  const currentItem = reviewItems[currentIndex];
  const selectedIndex = answers[currentItem.id];
  const hasAnswered = selectedIndex !== undefined;
  const isCorrect = selectedIndex === currentItem.exercise.resposta_correcta;
  const isSwipe = currentItem.exercise.tipus === 'swipe';

  return (
    <section className="rounded-xl border border-[#E4E0D8] bg-white p-6 sm:p-8">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E0D8] pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#52555E]">
            <span className="font-semibold text-[#1D4ED8]">Mode Repàs</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">
              Exercici {currentIndex + 1} de {total}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">
              Origen: Dia {String(currentItem.dia).padStart(2, '0')}
            </span>
          </div>
          <h1 className="font-display mt-1.5 text-xl font-bold text-[#181A1F] sm:text-2xl">
            {currentItem.titol}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRestartShuffle}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] px-3 py-1.5 text-xs font-medium text-[#181A1F] hover:bg-[#F2EFE9] whitespace-nowrap"
          >
            <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Nova selecció</span>
          </button>
          <button
            type="button"
            onClick={onExitReview}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#E4E0D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#181A1F] hover:bg-[#F2EFE9] whitespace-nowrap"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Eixir</span>
          </button>
        </div>
      </div>

      {/* Step progress strip */}
      <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
        {reviewItems.map((item, idx) => {
          const ans = answers[item.id];
          let barColor = 'bg-[#EFECE5]';
          if (idx === currentIndex && ans === undefined) barColor = 'bg-[#1D4ED8]';
          else if (ans !== undefined) {
            barColor =
              ans === item.exercise.resposta_correcta
                ? 'bg-[#15803D]'
                : 'bg-[#B91C1C]';
          }
          return (
            <div
              key={item.id}
              className={`h-1.5 flex-1 rounded-full transition-colors ${barColor}`}
            />
          );
        })}
      </div>

      {/* Question */}
      <p className="mt-6 text-base font-medium leading-relaxed text-[#181A1F]">
        {currentItem.exercise.pregunta}
      </p>

      <div
        className={`mt-5 grid gap-3 ${
          isSwipe ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {currentItem.exercise.opcions.map((optionText, idx) => {
          const isSelected = selectedIndex === idx;
          const isTarget = idx === currentItem.exercise.resposta_correcta;

          let btnClass =
            'border-[#E4E0D8] bg-[#FAF9F6] text-[#181A1F] hover:border-[#1D4ED8]/50 hover:bg-[#EFF4FF]/60';
          if (hasAnswered) {
            if (isSelected && isCorrect) {
              btnClass = 'border-[#15803D] bg-[#F0FDF4] text-[#14532D] font-semibold';
            } else if (isSelected && !isCorrect) {
              btnClass = 'border-[#B91C1C] bg-[#FEF2F2] text-[#7F1D1D] font-semibold';
            } else if (!isCorrect && isTarget) {
              btnClass = 'border-[#BBF7D0] bg-[#F0FDF4]/70 text-[#14532D]';
            } else {
              btnClass = 'border-[#E4E0D8] bg-[#FAF9F6] text-[#52555E] opacity-75';
            }
          }

          return (
            <button
              key={`${currentItem.id}-${idx}`}
              type="button"
              disabled={hasAnswered}
              onClick={() =>
                setAnswers((prev) => ({ ...prev, [currentItem.id]: idx }))
              }
              className={`flex min-h-[52px] w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-[15px] transition-colors ${btnClass}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {isSwipe ? (
                  idx === 0 ? (
                    <ThumbsUp className="h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                  ) : (
                    <ThumbsDown className="h-4 w-4 shrink-0 text-[#B91C1C]" aria-hidden="true" />
                  )
                ) : (
                  <span className="font-mono-tabular inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-current/20 bg-white/80 text-xs font-semibold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                )}
                <span>{optionText}</span>
              </div>

              {hasAnswered && isSelected && (
                <span className="shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-[#15803D]" aria-hidden="true" />
                  ) : (
                    <XCircle className="h-5 w-5 text-[#B91C1C]" aria-hidden="true" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback + Theory reinforcement */}
      {hasAnswered && (
        <div className="mt-5 space-y-4">
          <div
            role="status"
            aria-live="polite"
            className={`rounded-lg border p-4 ${
              isCorrect
                ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#14532D]'
                : 'border-[#FECACA] bg-[#FEF2F2] text-[#7F1D1D]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isCorrect ? (
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]"
                  aria-hidden="true"
                />
              ) : (
                <XCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#B91C1C]"
                  aria-hidden="true"
                />
              )}
              <div>
                <p className="text-sm font-bold">
                  {isCorrect
                    ? 'Correcte! Coneixement reforçat.'
                    : `Atenció al calc! La resposta correcta és «${currentItem.exercise.opcions[currentItem.exercise.resposta_correcta]}».`}
                </p>
                {currentItem.exercise.explicacio && (
                  <p className="mt-1 text-sm opacity-90">
                    {currentItem.exercise.explicacio}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Recordatori teòric (Dia {currentItem.dia})</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-[#374151]">
              {currentItem.teoria}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (currentIndex + 1 < total) {
                  setCurrentIndex((prev) => prev + 1);
                } else {
                  setShowSummary(true);
                }
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF]"
            >
              <span>
                {currentIndex + 1 < total
                  ? 'Següent exercici'
                  : 'Veure resum final'}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
