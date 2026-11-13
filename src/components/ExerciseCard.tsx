import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { DayAnswerRecord, DayPlan } from '../types';

interface ExerciseCardProps {
  day: DayPlan;
  savedRecord?: DayAnswerRecord;
  onSubmitQuiz: (
    dayNumber: number,
    selectedIndices: Record<number, number>,
    score: number,
    total: number
  ) => void;
  onResetQuiz: (dayNumber: number) => void;
  onNextDay: () => void;
}

export function ExerciseCard({
  day,
  savedRecord,
  onSubmitQuiz,
  onResetQuiz,
  onNextDay,
}: ExerciseCardProps) {
  const { exercicis } = day;
  const total = exercicis.length;

  const [selectedIndices, setSelectedIndices] = useState<Record<number, number>>(
    () => savedRecord?.selectedIndices ?? {}
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedIndices(savedRecord?.selectedIndices ?? {});
    setValidationError(null);
  }, [day.dia, savedRecord]);

  const isSubmitted = savedRecord?.submitted ?? false;
  const score = savedRecord?.score ?? 0;
  const isPerfect = isSubmitted && score === total;

  const answeredCount = exercicis.filter(
    (_, idx) => selectedIndices[idx] !== undefined
  ).length;

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setValidationError(null);
    setSelectedIndices((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;

    const missingNumbers: number[] = [];
    exercicis.forEach((_, idx) => {
      if (selectedIndices[idx] === undefined) {
        missingNumbers.push(idx + 1);
      }
    });

    if (missingNumbers.length > 0) {
      setValidationError(
        `Selecciona una resposta per a totes les preguntes abans de comprovar (falten: ${missingNumbers.join(', ')}).`
      );
      return;
    }

    let computedScore = 0;
    exercicis.forEach((ex, idx) => {
      if (selectedIndices[idx] === ex.resposta_correcta) {
        computedScore += 1;
      }
    });

    setValidationError(null);
    onSubmitQuiz(day.dia, selectedIndices, computedScore, total);
  };

  const handleRetry = () => {
    setSelectedIndices({});
    setValidationError(null);
    onResetQuiz(day.dia);
  };

  return (
    <section
      aria-labelledby="exercise-heading"
      className="rounded-xl border border-[#E4E0D8] bg-white p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E4E0D8] pb-4">
        <div>
          <h2
            id="exercise-heading"
            className="font-display text-xl font-bold text-[#181A1F] sm:text-2xl"
          >
            Exercicis del Dia
          </h2>
          <p className="mt-1 text-xs text-[#52555E]">
            Respon totes les preguntes i polsa «Comprovar Respostes» per a avaluar-les.
          </p>
        </div>

        <span className="font-mono-tabular text-xs font-semibold text-[#52555E]">
          {isSubmitted
            ? `Puntuació: ${score}/${total}`
            : `${answeredCount}/${total} seleccionades`}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {exercicis.map((ex, qIdx) => {
          const chosenIdx = selectedIndices[qIdx];
          const isQuestionCorrect =
            isSubmitted && chosenIdx === ex.resposta_correcta;
          const isQuestionWrong =
            isSubmitted && chosenIdx !== ex.resposta_correcta;
          const isSwipe = ex.tipus === 'swipe';

          let containerStyle = 'border-[#E4E0D8] bg-[#FAF9F6]';
          if (isQuestionCorrect) {
            containerStyle = 'border-[#BBF7D0] bg-[#F0FDF4]/60';
          } else if (isQuestionWrong) {
            containerStyle = 'border-[#FECACA] bg-[#FEF2F2]/60';
          }

          return (
            <fieldset
              key={`${day.dia}-q-${qIdx}`}
              className={`rounded-xl border p-4 transition-colors sm:p-5 ${containerStyle}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <legend className="text-[15px] font-semibold leading-snug text-[#181A1F] sm:text-base">
                  <span className="font-mono-tabular mr-2 text-xs font-bold text-[#1D4ED8]">
                    {String(qIdx + 1).padStart(2, '0')}.
                  </span>
                  {ex.pregunta}
                </legend>

                {isSubmitted && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold shrink-0 ${
                      isQuestionCorrect ? 'text-[#15803D]' : 'text-[#B91C1C]'
                    }`}
                  >
                    {isQuestionCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        <span>Correcte</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Errada</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              <div
                className={`mt-3.5 grid gap-2.5 ${
                  ex.opcions.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {ex.opcions.map((optionText, optIdx) => {
                  const isSelected = chosenIdx === optIdx;
                  const isTargetCorrect = optIdx === ex.resposta_correcta;

                  let optStyle =
                    'border-[#E4E0D8] bg-white text-[#181A1F] hover:border-[#1D4ED8]/50 hover:bg-[#EFF4FF]/50';

                  if (!isSubmitted) {
                    if (isSelected) {
                      optStyle =
                        'border-[#1D4ED8] bg-[#EFF4FF] text-[#1E3A8A] font-semibold';
                    }
                  } else {
                    if (isSelected && isTargetCorrect) {
                      optStyle =
                        'border-[#15803D] bg-[#DCFCE7] text-[#14532D] font-semibold';
                    } else if (isSelected && !isTargetCorrect) {
                      optStyle =
                        'border-[#B91C1C] bg-[#FEE2E2] text-[#7F1D1D] font-semibold';
                    } else if (isTargetCorrect) {
                      optStyle =
                        'border-[#BBF7D0] bg-white text-[#15803D] font-semibold';
                    } else {
                      optStyle =
                        'border-[#E4E0D8] bg-white/70 text-[#52555E] opacity-70';
                    }
                  }

                  return (
                    <button
                      key={`${qIdx}-${optIdx}`}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      aria-pressed={isSelected}
                      className={`flex min-h-[46px] w-full items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${optStyle} ${
                        isSubmitted ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isSwipe ? (
                          optIdx === 0 ? (
                            <ThumbsUp
                              className="h-4 w-4 shrink-0 text-[#15803D]"
                              aria-hidden="true"
                            />
                          ) : (
                            <ThumbsDown
                              className="h-4 w-4 shrink-0 text-[#B91C1C]"
                              aria-hidden="true"
                            />
                          )
                        ) : (
                          <span className="font-mono-tabular inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-current/20 bg-white/80 text-xs font-semibold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        )}
                        <span className="leading-snug">{optionText}</span>
                      </div>

                      {isSubmitted && isSelected && (
                        <span className="shrink-0">
                          {isTargetCorrect ? (
                            <CheckCircle2
                              className="h-4 w-4 text-[#15803D]"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="h-4 w-4 text-[#B91C1C]"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (isQuestionWrong || ex.explicacio) && (
                <p
                  className={`mt-3 text-xs leading-relaxed ${
                    isQuestionWrong ? 'text-[#7F1D1D]' : 'text-[#14532D]'
                  }`}
                >
                  {ex.explicacio
                    ? ex.explicacio
                    : `Solució normativa: «${ex.opcions[ex.resposta_correcta]}».`}
                </p>
              )}
            </fieldset>
          );
        })}

        {validationError && (
          <div
            role="alert"
            className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-xs font-medium text-[#991B1B]"
          >
            {validationError}
          </div>
        )}

        {/* Submit / Results Footer */}
        {!isSubmitted ? (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-xs text-[#52555E]">
              Encerta totes les preguntes per a marcar el Dia {day.dia} com a completat.
            </span>
            <button
              type="submit"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF] sm:w-auto whitespace-nowrap"
            >
              <ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Comprovar Respostes</span>
            </button>
          </div>
        ) : (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl border p-5 ${
              isPerfect
                ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#14532D]'
                : 'border-[#FECACA] bg-[#FEF2F2] text-[#7F1D1D]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                {isPerfect ? (
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#15803D]"
                    aria-hidden="true"
                  />
                ) : (
                  <XCircle
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#B91C1C]"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p className="font-display text-lg font-bold">
                    Puntuació:{' '}
                    <span className="font-mono-tabular">
                      {score}/{total}
                    </span>
                  </p>
                  <p className="mt-0.5 text-sm opacity-90">
                    {isPerfect
                      ? `Excel·lent! Has superat tots els exercicis del Dia ${day.dia}.`
                      : `Has encertat ${score} de ${total}. Revisa les errades marcades en roig i torna-ho a intentar per a completar el dia.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-[#E4E0D8] bg-white px-4 py-2 text-xs font-semibold text-[#181A1F] transition-colors hover:bg-[#FAF9F6] whitespace-nowrap"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tornar a intentar</span>
                </button>

                {isPerfect && day.dia < 28 && (
                  <button
                    type="button"
                    onClick={onNextDay}
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg bg-[#15803D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#166534] whitespace-nowrap"
                  >
                    <span>Passar al Dia {day.dia + 1}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
