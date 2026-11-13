export type ExerciseType = 'test' | 'swipe';

export interface DayExercise {
  tipus: ExerciseType;
  pregunta: string;
  opcions: string[];
  resposta_correcta: number;
  explicacio?: string;
}

export interface VocabularyBlock {
  titol: string;
  contingut: string;
  paraules_clau: string[];
}

export interface GrammarBlock {
  titol: string;
  contingut: string;
  exercicis: DayExercise[];
}

export interface AiProductionBlock {
  titol: string;
  instruccions: string;
  prompt: string;
}

export interface ErrorDiaryBlock {
  titol: string;
  contingut: string;
}

export interface DayBlocs {
  lectura_vocabulari: VocabularyBlock;
  foc_gramatical: GrammarBlock;
  produccio_ia: AiProductionBlock;
  diari_errors: ErrorDiaryBlock;
}

export interface DayPlan {
  dia: number;
  titol: string;
  blocs: DayBlocs;
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
