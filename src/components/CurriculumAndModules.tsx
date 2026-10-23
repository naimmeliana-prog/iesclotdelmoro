import React, { useState, useEffect } from 'react';
import {
  COURSE_METADATA,
  FULL_SYLLABUS_SUBJECTS,
  MATH_1ESO_INTERACTIVE_MODULE,
} from '../data/clotDelMoroData';
import { CourseGrade } from '../types';
import { soundFX } from '../utils/sound';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface CurriculumAndModulesProps {
  selectedCourse: CourseGrade;
  initialSubjectId?: string;
  studyRatioX: number;
  completedUnits: Record<string, boolean>;
  onCompleteLessonReward: (unitOrLessonId: string, studyMinutes: number, studyPoints: number, title: string) => void;
}

export const CurriculumAndModules: React.FC<CurriculumAndModulesProps> = ({
  selectedCourse,
  initialSubjectId,
  studyRatioX,
  completedUnits,
  onCompleteLessonReward,
}) => {
  const courseMeta = COURSE_METADATA[selectedCourse];

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || FULL_SYLLABUS_SUBJECTS[0].id
  );

  useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubjectId(initialSubjectId);
      const found = FULL_SYLLABUS_SUBJECTS.find((s) => s.id === initialSubjectId);
      if (found && found.units.length > 0) {
        setSelectedUnitId(found.units[0].id);
      }
    }
  }, [initialSubjectId]);

  const currentSubject =
    FULL_SYLLABUS_SUBJECTS.find((s) => s.id === selectedSubjectId) || FULL_SYLLABUS_SUBJECTS[0];

  const [selectedUnitId, setSelectedUnitId] = useState<string>(currentSubject.units[0].id);
  const [showMathInteractiveModule, setShowMathInteractiveModule] = useState<boolean>(false);

  // State for unit quizzes
  const [unitQuizAnswers, setUnitQuizAnswers] = useState<Record<string, number>>({});

  // State for 1º ESO Math 3-lesson module
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [interactiveNumerator, setInteractiveNumerator] = useState<number>(2);
  const [interactiveDenominator, setInteractiveDenominator] = useState<number>(4);

  const currentUnit =
    currentSubject.units.find((u) => u.id === selectedUnitId) || currentSubject.units[0];

  const calculatedBreakMinForUnit = Math.max(
    1,
    Math.round(currentUnit.durationMin * studyRatioX)
  );

  const currentLesson = MATH_1ESO_INTERACTIVE_MODULE[activeLessonIndex];
  const calculatedBreakMinForLesson = Math.max(
    1,
    Math.round(currentLesson.durationMin * studyRatioX)
  );

  const handleSelectSubject = (subjId: string) => {
    setSelectedSubjectId(subjId);
    const subj = FULL_SYLLABUS_SUBJECTS.find((s) => s.id === subjId);
    if (subj && subj.units.length > 0) {
      setSelectedUnitId(subj.units[0].id);
    }
    setShowMathInteractiveModule(false);
  };

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    soundFX.playStepComplete();
  };

  const handleEvaluateLessonQuiz = (lessonId: string) => {
    setQuizSubmitted((prev) => ({ ...prev, [lessonId]: true }));
    onCompleteLessonReward(
      lessonId,
      currentLesson.durationMin,
      currentLesson.studyPointsReward,
      currentLesson.title
    );
  };

  const correctCountInLesson = currentLesson.quiz.filter(
    (q) => quizAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="space-y-8">
      {/* =====================================================================
          CATÁLOGO COMPLETO DE TODAS LAS ASIGNATURAS (ESTILO REPASOESO.VERCEL.APP)
          ===================================================================== */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Temarios Oficiales Completos · {courseMeta.label} · IES Clot del Moro (Algímia d'Alfara)
            </p>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5">
              Todas las Asignaturas del Curso ({FULL_SYLLABUS_SUBJECTS.length} Materias Disponibles)
            </h2>
          </div>
          <div className="text-xs font-mono tabular-nums text-stone-600 dark:text-stone-300">
            Fórmula Familiar Activa: <strong>Juego = {studyRatioX} × Estudio</strong>
          </div>
        </div>

        {/* Grid of ALL 9 Subjects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {FULL_SYLLABUS_SUBJECTS.map((subj) => {
            const isSelected = subj.id === selectedSubjectId;
            const completedInSubj = subj.units.filter((u) => completedUnits[u.id]).length;
            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => handleSelectSubject(subj.id)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'border-amber-600 dark:border-amber-500 bg-amber-50/80 dark:bg-amber-950/40'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 hover:border-amber-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      [{subj.shortCode}] · {subj.units.length} Unidades
                    </span>
                    <span>
                      Progreso: {completedInSubj}/{subj.units.length}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white mt-1">
                    {subj.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                    {subj.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/70 dark:border-stone-700/60 flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300">
                  <span>{isSelected ? '✓ Asignatura seleccionada' : 'Ver unidades y apuntes →'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          VISTA DE UNIDADES DE LA ASIGNATURA SELECCIONADA
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Units List of Current Subject (4 cols) */}
        <div className="lg:col-span-4 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-5 space-y-4">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Temario de la Asignatura · {courseMeta.shortLabel}
            </p>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              {currentSubject.name}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              {currentSubject.description}
            </p>
          </div>

          {/* If Mathematics is selected, show toggle for the 3-Lesson Interactive Module */}
          {currentSubject.id === 'subj-mat' && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Módulo Especial TDAH 1º ESO (3 Lecciones de 12-15 min)
              </div>
              <button
                type="button"
                onClick={() => setShowMathInteractiveModule((prev) => !prev)}
                className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
              >
                {showMathInteractiveModule
                  ? 'Volver a las 6 Unidades de Matemáticas'
                  : 'Abrir Módulo Interactivo (3 Lecciones) →'}
              </button>
            </div>
          )}

          <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              Unidades Didácticas ({currentSubject.units.length}):
            </p>
            {currentSubject.units.map((unit) => {
              const isCurrent = !showMathInteractiveModule && unit.id === currentUnit.id;
              const isDone = Boolean(completedUnits[unit.id]);
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => {
                    setShowMathInteractiveModule(false);
                    setSelectedUnitId(unit.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-amber-600 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-950/30'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 tabular-nums">
                    <span>UNIDAD 0{unit.unitNumber}</span>
                    <span>
                      {isDone ? '✓ COMPLETADA' : `${unit.durationMin} min · +${unit.studyPoints} PE`}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white mt-1">
                    {unit.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area (8 cols): Either Selected Unit OR 3-Lesson Math Module */}
        <div className="lg:col-span-8">
          {!showMathInteractiveModule ? (
            <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-400">
                    {currentSubject.name.toUpperCase()} · UNIDAD 0{currentUnit.unitNumber} · {currentUnit.durationMin} MIN
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white mt-1">
                    {currentUnit.title}
                  </h3>
                </div>
                <div className="text-xs font-mono tabular-nums text-stone-600 dark:text-stone-300">
                  Recompensa: <strong>+{currentUnit.studyPoints} PE</strong> ·{' '}
                  <strong>+{calculatedBreakMinForUnit} min Juego</strong> ({currentUnit.durationMin}m × {studyRatioX})
                </div>
              </div>

              <p className="text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
                {currentUnit.summary}
              </p>

              <div className="text-xs text-stone-600 dark:text-stone-300">
                <strong className="text-stone-900 dark:text-white">Conceptos clave de la unidad: </strong>
                {currentUnit.keyConcepts.map((kc, idx) => (
                  <React.Fragment key={kc}>
                    {idx > 0 && <span aria-hidden="true"> · </span>}
                    <span>{kc}</span>
                  </React.Fragment>
                ))}
              </div>

              {/* Visual Scheme Blocks */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                  Esquema de Estudio Directo y Sin Distracciones
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {currentUnit.visualScheme.map((scheme, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40"
                    >
                      <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300">
                        {scheme.heading}
                      </h5>
                      <p className="text-xs text-stone-700 dark:text-stone-200 mt-1 leading-relaxed">
                        {scheme.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Case */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-stone-800 dark:text-stone-200">
                <strong>Ejemplo Práctico Resuelto: </strong>
                {currentUnit.practicalExample}
              </div>

              {/* Quick Self-Check Question */}
              {currentUnit.quickQuiz.map((qq) => {
                const chosen = unitQuizAnswers[qq.id];
                return (
                  <div
                    key={qq.id}
                    className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-800/30 space-y-3"
                  >
                    <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      AUTOEVALUACIÓN DE LA UNIDAD
                    </div>
                    <h5 className="text-sm font-bold text-stone-900 dark:text-white">
                      {qq.question}
                    </h5>
                    <div className="space-y-2">
                      {qq.options.map((optionText, oIdx) => {
                        const isPicked = chosen === oIdx;
                        const isRight = qq.correctIndex === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => {
                              setUnitQuizAnswers((prev) => ({ ...prev, [qq.id]: oIdx }));
                              soundFX.playStepComplete();
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${
                              isPicked
                                ? isRight
                                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200'
                            }`}
                          >
                            <span>{optionText}</span>
                            {isPicked && (
                              <span className="font-mono">
                                {isRight ? '✓ Correcto' : '✗ Revisa el esquema'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {chosen !== undefined && (
                      <p className="text-xs text-stone-600 dark:text-stone-300 pt-1">
                        {qq.explanation}
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  disabled={Boolean(completedUnits[currentUnit.id])}
                  onClick={() =>
                    onCompleteLessonReward(
                      currentUnit.id,
                      currentUnit.durationMin,
                      currentUnit.studyPoints,
                      `${currentSubject.name}: ${currentUnit.title}`
                    )
                  }
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    completedUnits[currentUnit.id]
                      ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 cursor-default'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {completedUnits[currentUnit.id]
                    ? '✓ Unidad Completada y Puntos Sumados'
                    : `Marcar Unidad ${currentUnit.unitNumber} como Estudiada (+${currentUnit.studyPoints} PE y +${calculatedBreakMinForUnit} min Juego)`}
                </button>
              </div>
            </div>
          ) : (
            /* 3-LESSON INTERACTIVE MATH MODULE */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MATH_1ESO_INTERACTIVE_MODULE.map((lec, idx) => {
                  const isSelected = activeLessonIndex === idx;
                  const isDone = Boolean(completedUnits[lec.id]);
                  const breakReward = Math.max(1, Math.round(lec.durationMin * studyRatioX));

                  return (
                    <button
                      key={lec.id}
                      type="button"
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-amber-600 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-950/30'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono tabular-nums">
                        <span>
                          LECCIÓN 0{lec.number} · {lec.durationMin}m
                        </span>
                        <span className={isDone ? 'text-emerald-700 dark:text-emerald-400 font-bold' : ''}>
                          {isDone ? '✓ HECHA' : `+${lec.studyPointsReward} PE`}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white mt-1">
                        {lec.title}
                      </h4>
                      <p className="text-[11px] text-amber-800 dark:text-amber-300 font-mono mt-1">
                        +{breakReward} min Juego ({studyRatioX}x)
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      MÓDULO 1 MATEMÁTICAS 1º ESO · DURACIÓN: {currentLesson.durationMin} MIN
                    </span>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mt-1">
                      {currentLesson.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono tabular-nums text-amber-800 dark:text-amber-300 font-semibold">
                    +{currentLesson.studyPointsReward} PE · +{calculatedBreakMinForLesson} min Juego
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    {currentLesson.coreRuleTitle}
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed">
                    {currentLesson.coreRuleSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentLesson.visualSteps.map((vs) => (
                    <div
                      key={vs.stepNumber}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-2"
                    >
                      <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                        PASO 0{vs.stepNumber}
                      </span>
                      <h5 className="text-xs font-bold text-stone-900 dark:text-white">{vs.label}</h5>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 font-mono text-xs font-semibold text-stone-900 dark:text-amber-200">
                        {vs.formulaOrVisual}
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-300">{vs.tip}</p>
                    </div>
                  ))}
                </div>

                {currentLesson.number === 3 && (
                  <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-800/50 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-stone-900 dark:text-white">
                        Simulador Visual de Fracciones:
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold">
                        {interactiveNumerator} / {interactiveDenominator}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="range"
                        min={1}
                        max={interactiveDenominator}
                        value={interactiveNumerator}
                        onChange={(e) => setInteractiveNumerator(Number(e.target.value))}
                        className="accent-amber-600"
                      />
                      <input
                        type="range"
                        min={2}
                        max={8}
                        value={interactiveDenominator}
                        onChange={(e) => {
                          const d = Number(e.target.value);
                          setInteractiveDenominator(d);
                          if (interactiveNumerator > d) setInteractiveNumerator(d);
                        }}
                        className="accent-amber-600"
                      />
                    </div>
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: interactiveDenominator }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 rounded border flex items-center justify-center font-mono text-xs font-bold ${
                            i < interactiveNumerator
                              ? 'bg-amber-600 border-amber-700 text-white'
                              : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-400'
                          }`}
                        >
                          1/{interactiveDenominator}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-2 text-xs">
                  <div className="font-mono text-stone-500 dark:text-stone-400">
                    EJEMPLO PRÁCTICO · {currentLesson.practicalExample.scenario}
                  </div>
                  <p className="font-semibold text-stone-900 dark:text-white">
                    {currentLesson.practicalExample.problemStatement}
                  </p>
                  {currentLesson.practicalExample.guidedSteps.map((st, idx) => (
                    <div key={idx} className="font-mono text-stone-700 dark:text-stone-300">
                      {st}
                    </div>
                  ))}
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 pt-1">
                    ✓ {currentLesson.practicalExample.finalResult}
                  </div>
                </div>

                {/* 3 Quiz Questions */}
                <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      Cuestionario de Autoevaluación (3 Preguntas)
                    </h4>
                    {quizSubmitted[currentLesson.id] && (
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        Aciertos: {correctCountInLesson} / {currentLesson.quiz.length}
                      </span>
                    )}
                  </div>

                  {currentLesson.quiz.map((q, qIndex) => {
                    const chosen = quizAnswers[q.id];
                    const isSubmitted = Boolean(quizSubmitted[currentLesson.id]);
                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-800/20 space-y-2"
                      >
                        <h5 className="text-xs font-bold text-stone-900 dark:text-white">
                          {qIndex + 1}. {q.question}
                        </h5>
                        <div className="grid grid-cols-1 gap-1.5">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = chosen === optIdx;
                            const isCorrect = q.correctIndex === optIdx;
                            let btnStyle =
                              'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200';
                            if (isSubmitted) {
                              if (isCorrect) {
                                btnStyle =
                                  'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                              } else if (isSelected && !isCorrect) {
                                btnStyle =
                                  'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                              }
                            } else if (isSelected) {
                              btnStyle =
                                'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-semibold';
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                className={`text-left px-3.5 py-2 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isSubmitted && isCorrect && <span className="font-mono">✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={Boolean(completedUnits[currentLesson.id])}
                      onClick={() => handleEvaluateLessonQuiz(currentLesson.id)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        completedUnits[currentLesson.id]
                          ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      {completedUnits[currentLesson.id]
                        ? '✓ Lección Completada y Puntos Reclamados'
                        : `Validar Cuestionario y Sumar +${currentLesson.studyPointsReward} PE (+${calculatedBreakMinForLesson} min Juego)`}
                    </button>

                    {activeLessonIndex < MATH_1ESO_INTERACTIVE_MODULE.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveLessonIndex((prev) => prev + 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200"
                      >
                        Siguiente Lección <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
