import type { DayPlan, WeekGroup } from '../types';
import plaData from '../../public/data/pla-28-dies.json';

export const SYSTEM_INSTRUCTIONS =
  "Ets un examinador oficial i entrenador lingüístic de valencià (CIEACOVA, nivell B1). El teu alumne és castellanoparlant amb alta comprensió però errors de producció (calcs). Les teues regles: 1) Corregeix implacablement la preposició 'a' davant de Complement Directe (ex: 'veig a Joan' -> 'veig Joan'). 2) Corregeix l'obligació 'tindre que' per 'haver de' o 'caldre'. 3) Corregeix 'hi han' per 'hi ha'. 4) Sigues breu, proporciona la regla exacta fallada i obliga l'alumne a repetir la frase correctament. 5) Fes preguntes per a forçar la interacció.";

export const WEEK_GROUPS: WeekGroup[] = [
  {
    setmana: 1,
    titol: 'Setmana 1 · Foc Gramatical i Lèxic',
    descripcio: 'Vocabulari essencial, CD sense «a», passat, calcs, pronoms i connectors.',
    dies: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    setmana: 2,
    titol: 'Setmana 2 · Pronoms, Negociació i Temps',
    descripcio: 'Pronoms «en» i «hi», preposicions, negociació, «allò» i condicional.',
    dies: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    setmana: 3,
    titol: 'Setmana 3 · Subjuntiu, Relatius i Expressió',
    descripcio: 'Caiguda davant «que», subjuntiu, relatius, incoatius i correu formal.',
    dies: [15, 16, 17, 18, 19, 20, 21],
  },
  {
    setmana: 4,
    titol: 'Setmana 4 · Consolidació i Simulacres B1',
    descripcio: 'Desacord educat, sostenibilitat, auditoria de calcs i assaigs oficials.',
    dies: [22, 23, 24, 25, 26, 27, 28],
  },
];

export const DEFAULT_PLA_28_DIES: DayPlan[] = plaData as DayPlan[];
