export type ExerciseType = 'test' | 'swipe';

export interface DayExercise {
  tipus: ExerciseType;
  pregunta: string;
  opcions: string[];
  resposta_correcta: number;
  explicacio?: string;
}

export interface DayPlan {
  dia: number;
  titol: string;
  objectiu: string;
  teoria: string;
  exercicis: DayExercise[];
  prompt_ia: string;
}

export interface WeekGroup {
  setmana: number;
  titol: string;
  descripcio: string;
  dies: number[];
}

export interface DayAnswerRecord {
  selectedIndices: Record<number, number>;
  submitted: boolean;
  score: number;
  total: number;
}

export interface StudyProgress {
  lastActiveDay: number;
  completedDays: number[];
  answersByDay: Record<number, DayAnswerRecord>;
  lastStudyDate: string | null;
  streakCount: number;
}
