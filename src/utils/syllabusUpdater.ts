import { CourseGrade, FlashcardItem, SubjectGradeMetric, SyllabusSubject, SyllabusUnit } from '../types';
import {
  getFlashcardsForCourse,
  getInitialGradesForCourse,
  getSubjectsForCourse,
} from '../data/courseCurricula';

export const ALL_COURSES_LIST: CourseGrade[] = [
  '1ESO',
  '2ESO',
  '3ESO',
  '4ESO',
  '1BACH',
  '2BACH',
];

export type CourseSubjectsMap = Record<CourseGrade, SyllabusSubject[]>;

export function buildDefaultCourseSubjectsMap(): CourseSubjectsMap {
  return {
    '1ESO': getSubjectsForCourse('1ESO'),
    '2ESO': getSubjectsForCourse('2ESO'),
    '3ESO': getSubjectsForCourse('3ESO'),
    '4ESO': getSubjectsForCourse('4ESO'),
    '1BACH': getSubjectsForCourse('1BACH'),
    '2BACH': getSubjectsForCourse('2BACH'),
  };
}

/**
 * Computes a deterministic signature of the current code-level syllabus catalog.
 * Whenever any unit title, summary, concept, quiz, or subject is modified in code,
 * this signature changes automatically and triggers an immediate reconciliation.
 */
export function computeCatalogSignature(map: CourseSubjectsMap): string {
  let hash = 2166136261;
  const raw = ALL_COURSES_LIST.map((c) =>
    map[c]
      .map(
        (s) =>
          `${s.id}:${s.name}:${s.description}:${s.units
            .map((u) => `${u.id}:${u.title}:${u.summary}:${u.keyConcepts.join(',')}`)
            .join('|')}`
      )
      .join(';')
  ).join('##');

  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `cf-cat-${(hash >>> 0).toString(16)}`;
}

/**
 * Merges custom user/teacher-created units or edits with the latest code catalog
 * so that code updates to the syllabus ALWAYS appear immediately without losing custom units.
 */
export function reconcileCourseSubjectsMap(
  customUnitsBySubjectId: Record<string, SyllabusUnit[]>
): CourseSubjectsMap {
  const base = buildDefaultCourseSubjectsMap();
  const merged: CourseSubjectsMap = { ...base };

  for (const course of ALL_COURSES_LIST) {
    merged[course] = base[course].map((subj) => {
      const extraUnits = customUnitsBySubjectId[subj.id] || [];
      if (extraUnits.length === 0) return subj;

      // Filter out any duplicate IDs and append custom/updated units
      const baseIds = new Set(subj.units.map((u) => u.id));
      const uniqueExtra = extraUnits.filter((u) => !baseIds.has(u.id));
      const updatedBaseUnits = subj.units.map((bu) => {
        const override = extraUnits.find((eu) => eu.id === bu.id);
        return override ? override : bu;
      });

      const finalUnits = [...updatedBaseUnits, ...uniqueExtra];
      return {
        ...subj,
        totalUnits: finalUnits.length,
        units: finalUnits,
      };
    });
  }

  return merged;
}

/**
 * Reconciles flashcards so any newly added or updated cards in the curriculum catalog
 * are automatically injected while preserving the student's `mastered` status.
 */
export function reconcileFlashcardsWithCatalog(
  savedCards: FlashcardItem[]
): FlashcardItem[] {
  const catalogCards = ALL_COURSES_LIST.flatMap((c) => getFlashcardsForCourse(c));
  const savedById = new Map(savedCards.map((c) => [c.id, c]));
  const catalogIds = new Set(catalogCards.map((c) => c.id));

  // Always take latest question/answer/hint from catalog, keeping `mastered` state
  const mergedCatalog = catalogCards.map((catCard) => {
    const existing = savedById.get(catCard.id);
    return existing ? { ...catCard, mastered: existing.mastered } : catCard;
  });

  // Preserve custom flashcards created by the student/teacher (ids starting with 'fc-17...' etc.)
  const customCards = savedCards.filter((c) => !catalogIds.has(c.id));
  return [...customCards, ...mergedCatalog];
}

/**
 * Reconciles subject grade rows with the current subjects of all courses
 * so if new subjects are added or renamed in the curriculum, the gradebook updates automatically
 * while preserving existing grades (eval1, eval2, currentEval).
 */
export function reconcileGradesWithCatalog(
  currentMap: CourseSubjectsMap,
  savedGrades: SubjectGradeMetric[]
): SubjectGradeMetric[] {
  const savedLookup = new Map(
    savedGrades.map((g) => [`${g.course}::${g.subject}`, g])
  );

  const reconciled: SubjectGradeMetric[] = [];
  for (const course of ALL_COURSES_LIST) {
    const subjects = currentMap[course] || getInitialGradesForCourse(course).map((g) => ({ name: g.subject }));
    for (const s of subjects) {
      const key = `${course}::${s.name}`;
      const existing = savedLookup.get(key);
      if (existing) {
        reconciled.push(existing);
      } else {
        reconciled.push({
          subject: s.name,
          course,
          eval1: null,
          eval2: null,
          currentEval: null,
          tasksCompleted: 0,
          tasksTotal: 0,
          teacherComment: 'Sin calificaciones registradas',
        });
      }
    }
  }
  return reconciled;
}
