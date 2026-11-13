import { useEffect, useMemo, useState } from 'react';
import { CurriculumSidebar } from './components/CurriculumSidebar';
import { ExerciseCard } from './components/ExerciseCard';
import { OralPracticeCard } from './components/OralPracticeCard';
import { ReviewModeView } from './components/ReviewModeView';
import { SystemInstructionsModal } from './components/SystemInstructionsModal';
import { TheoryCard } from './components/TheoryCard';
import { TopBar } from './components/TopBar';
import { TopProgressBar } from './components/TopProgressBar';
import { DEFAULT_PLA_28_DIES, WEEK_GROUPS } from './data/pla28Dies';
import type { DayPlan, StudyProgress } from './types';
import {
  computeUpdatedStreak,
  loadProgress,
  pickRandomReviewExercises,
  resetStoredProgress,
  saveProgress,
  type ReviewExerciseItem,
} from './utils/storage';

export default function App() {
  const [days, setDays] = useState<DayPlan[]>(DEFAULT_PLA_28_DIES);
  const [progress, setProgress] = useState<StudyProgress>(() => loadProgress());
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewItems, setReviewItems] = useState<ReviewExerciseItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemModalOpen, setSystemModalOpen] = useState(false);

  // Hydrate from canonical JSON database in /public/data/pla-28-dies.json
  useEffect(() => {
    let active = true;
    fetch(`${import.meta.env.BASE_URL}data/pla-28-dies.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: unknown) => {
        if (!active || !Array.isArray(data) || data.length === 0) return;
        setDays(data as DayPlan[]);
      })
      .catch(() => {
        // Keep bundled DEFAULT_PLA_28_DIES seamlessly
      });
    return () => {
      active = false;
    };
  }, []);

  // Persist every progress change (lastActiveDay, completedDays, answersByDay, streak)
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const activeDayPlan = useMemo(
    () => days.find((d) => d.dia === progress.lastActiveDay) ?? days[0],
    [days, progress.lastActiveDay]
  );

  const activeWeek = useMemo(
    () => Math.ceil(activeDayPlan.dia / 7),
    [activeDayPlan.dia]
  );

  const activeWeekMeta = useMemo(
    () => WEEK_GROUPS.find((w) => w.setmana === activeWeek) ?? WEEK_GROUPS[0],
    [activeWeek]
  );

  const handleSelectDay = (dayNumber: number) => {
    const clamped = Math.max(1, Math.min(28, dayNumber));
    setIsReviewMode(false);
    setProgress((prev) => ({
      ...prev,
      lastActiveDay: clamped,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWeek = (weekNumber: number) => {
    const firstDayOfWeek = (weekNumber - 1) * 7 + 1;
    handleSelectDay(firstDayOfWeek);
  };

  const handleSubmitQuiz = (
    dayNumber: number,
    selectedIndices: Record<number, number>,
    score: number,
    total: number
  ) => {
    const isPerfect = score === total && total > 0;

    setProgress((prev) => {
      const nextAnswers = {
        ...prev.answersByDay,
        [dayNumber]: {
          selectedIndices,
          submitted: true,
          score,
          total,
        },
      };

      const nextCompleted = isPerfect
        ? Array.from(new Set([...prev.completedDays, dayNumber])).sort(
            (a, b) => a - b
          )
        : prev.completedDays;

      const streakUpdate = isPerfect
        ? computeUpdatedStreak(prev.lastStudyDate, prev.streakCount)
        : {
            lastStudyDate: prev.lastStudyDate,
            streakCount: prev.streakCount,
          };

      return {
        ...prev,
        answersByDay: nextAnswers,
        completedDays: nextCompleted,
        lastStudyDate: streakUpdate.lastStudyDate,
        streakCount: streakUpdate.streakCount,
      };
    });
  };

  const handleResetQuiz = (dayNumber: number) => {
    setProgress((prev) => {
      const nextAnswers = { ...prev.answersByDay };
      delete nextAnswers[dayNumber];
      return {
        ...prev,
        answersByDay: nextAnswers,
      };
    });
  };

  const handleStartReviewMode = () => {
    const picked = pickRandomReviewExercises(days, progress.completedDays, 5);
    setReviewItems(picked);
    setIsReviewMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShuffleNewBatch = () => {
    const picked = pickRandomReviewExercises(days, progress.completedDays, 5);
    setReviewItems(picked);
  };

  const handleResetProgress = () => {
    const fresh = resetStoredProgress();
    setProgress(fresh);
    setIsReviewMode(false);
    setReviewItems([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentDayCompleted = progress.completedDays.includes(
    activeDayPlan.dia
  );

  return (
    <div id="inici" className="min-h-screen bg-[#FAF9F6] text-[#181A1F]">
      <TopBar
        activeWeek={activeWeek}
        completedCount={progress.completedDays.length}
        isReviewMode={isReviewMode}
        onSelectWeek={handleSelectWeek}
        onOpenSystemInstructions={() => setSystemModalOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <main className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <TopProgressBar
          completedCount={progress.completedDays.length}
          streakCount={progress.streakCount}
          isReviewMode={isReviewMode}
          onStartReviewMode={handleStartReviewMode}
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <CurriculumSidebar
            days={days}
            activeDay={activeDayPlan.dia}
            completedDays={progress.completedDays}
            streakCount={progress.streakCount}
            isReviewMode={isReviewMode}
            onSelectDay={handleSelectDay}
            onStartReviewMode={handleStartReviewMode}
            onResetProgress={handleResetProgress}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />

          <div className="min-w-0 flex-1 space-y-6">
            {!isReviewMode ? (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
                  <p className="text-xs font-medium text-[#52555E]">
                    {activeWeekMeta.titol} — {activeWeekMeta.descripcio}
                  </p>
                </div>

                <TheoryCard
                  day={activeDayPlan}
                  isCompleted={isCurrentDayCompleted}
                  onPrevDay={() => handleSelectDay(activeDayPlan.dia - 1)}
                  onNextDay={() => handleSelectDay(activeDayPlan.dia + 1)}
                />

                <ExerciseCard
                  key={activeDayPlan.dia}
                  day={activeDayPlan}
                  savedRecord={progress.answersByDay[activeDayPlan.dia]}
                  onSubmitQuiz={handleSubmitQuiz}
                  onResetQuiz={handleResetQuiz}
                  onNextDay={() => handleSelectDay(activeDayPlan.dia + 1)}
                />

                <OralPracticeCard
                  key={`oral-${activeDayPlan.dia}`}
                  day={activeDayPlan}
                />
              </>
            ) : (
              <ReviewModeView
                reviewItems={reviewItems}
                completedCount={progress.completedDays.length}
                onShuffleNewBatch={handleShuffleNewBatch}
                onExitReview={() => setIsReviewMode(false)}
                onOpenDay={handleSelectDay}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E4E0D8] bg-[#FAF9F6] py-6">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-2 px-4 text-xs text-[#52555E] sm:px-6 lg:px-8">
          <span>CIEACOVA B1 · Pla Intensiu 28 Dies</span>
          <span>
            Progrés guardat localment al navegador ·{' '}
            <span className="font-mono-tabular">
              {progress.completedDays.length}/28
            </span>{' '}
            dies consolidats
          </span>
        </div>
      </footer>

      <SystemInstructionsModal
        open={systemModalOpen}
        onClose={() => setSystemModalOpen(false)}
      />
    </div>
  );
}
