import type { DayAnswerRecord, DayExercise, DayPlan, StudyProgress } from '../types';

const STORAGE_KEY = 'cieacova_b1_pla28_progress_v1';

export const DEFAULT_PROGRESS: StudyProgress = {
  lastActiveDay: 1,
  completedDays: [],
  answersByDay: {},
  lastStudyDate: null,
  streakCount: 0,
};

function getLocalDateIso(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getYesterdayIso(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getLocalDateIso(date);
}

function sanitizeAnswersByDay(
  rawAnswers: unknown
): Record<number, DayAnswerRecord> {
  if (!rawAnswers || typeof rawAnswers !== 'object') return {};
  const result: Record<number, DayAnswerRecord> = {};

  for (const [key, val] of Object.entries(rawAnswers as Record<string, unknown>)) {
    const dayNum = Number(key);
    if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > 28) continue;
    if (!val || typeof val !== 'object') continue;

    const candidate = val as Partial<DayAnswerRecord>;
    if (
      candidate.selectedIndices &&
      typeof candidate.selectedIndices === 'object' &&
      typeof candidate.submitted === 'boolean' &&
      typeof candidate.score === 'number' &&
      typeof candidate.total === 'number'
    ) {
      result[dayNum] = {
        selectedIndices: candidate.selectedIndices,
        submitted: candidate.submitted,
        score: candidate.score,
        total: candidate.total,
      };
    }
  }

  return result;
}

export function loadProgress(): StudyProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<StudyProgress>;
    const lastActiveDay =
      typeof parsed.lastActiveDay === 'number' &&
      parsed.lastActiveDay >= 1 &&
      parsed.lastActiveDay <= 28
        ? parsed.lastActiveDay
        : 1;
    const completedDays = Array.isArray(parsed.completedDays)
      ? Array.from(
          new Set(
            parsed.completedDays.filter(
              (d): d is number => typeof d === 'number' && d >= 1 && d <= 28
            )
          )
        ).sort((a, b) => a - b)
      : [];
    const answersByDay = sanitizeAnswersByDay(parsed.answersByDay);
    const lastStudyDate =
      typeof parsed.lastStudyDate === 'string' ? parsed.lastStudyDate : null;
    const streakCount =
      typeof parsed.streakCount === 'number' && parsed.streakCount >= 0
        ? parsed.streakCount
        : 0;

    return {
      lastActiveDay,
      completedDays,
      answersByDay,
      lastStudyDate,
      streakCount,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: StudyProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota or private mode restrictions
  }
}

export function computeUpdatedStreak(
  currentLastDate: string | null,
  currentStreak: number
): { lastStudyDate: string; streakCount: number } {
  const today = getLocalDateIso();
  if (currentLastDate === today) {
    return { lastStudyDate: today, streakCount: Math.max(1, currentStreak) };
  }
  if (currentLastDate === getYesterdayIso()) {
    return { lastStudyDate: today, streakCount: currentStreak + 1 };
  }
  return { lastStudyDate: today, streakCount: 1 };
}

export function resetStoredProgress(): StudyProgress {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore errors
    }
  }
  return DEFAULT_PROGRESS;
}

export interface ReviewExerciseItem {
  id: string;
  dia: number;
  titol: string;
  teoria: string;
  exercise: DayExercise;
}

export function pickRandomReviewExercises(
  days: DayPlan[],
  completedDays: number[],
  maxCount = 5
): ReviewExerciseItem[] {
  const completedSet = new Set(completedDays);
  const pool: ReviewExerciseItem[] = [];

  for (const day of days) {
    if (!completedSet.has(day.dia)) continue;
    day.exercicis.forEach((exercise, idx) => {
      pool.push({
        id: `${day.dia}-${idx}`,
        dia: day.dia,
        titol: day.titol,
        teoria: day.teoria,
        exercise,
      });
    });
  }

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(maxCount, pool.length));
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to textarea fallback
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
