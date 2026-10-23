import React, { useState } from 'react';
import {
  COURSE_METADATA,
  LMS_TECHNICAL_ARCHITECTURE,
} from '../data/clotDelMoroData';
import {
  CourseGrade,
  ParentHomeReward,
  SchoolPlatformSync,
  SubjectGradeMetric,
  TeacherAdaptationGuide,
  WeeklyStudyMetric,
} from '../types';
import { soundFX } from '../utils/sound';
import {
  CheckCircle2,
  Code2,
  KeyRound,
  Lock,
  LogOut,
  RefreshCw,
  RotateCcw,
  Server,
  ShieldCheck,
  Sliders,
  Unlock,
} from 'lucide-react';

interface AnalyticsAndFamilyProps {
  selectedCourse: CourseGrade;
  studyPoints: number;
  // Parental Auth & Controls
  parentCredentials: { username: string; passwordHash: string; isConfigured: boolean };
  isParentAuthenticated: boolean;
  onConfigureParentCredentials: (username: string, password: string) => void;
  onLoginParent: (username: string, password: string) => boolean;
  onLogoutParent: () => void;
  studyRatioX: number;
  onChangeStudyRatioX: (newX: number) => void;
  distractionFreeMode: boolean;
  onToggleDistractionFree: (val: boolean) => void;
  focusLockMode: boolean;
  onToggleFocusLockMode: (val: boolean) => void;
  // Zeroed & Live Metrics
  weeklyMetrics: WeeklyStudyMetric[];
  subjectGrades: SubjectGradeMetric[];
  onUpdateSubjectGrade: (
    subjectName: string,
    eval1: number | null,
    eval2: number | null,
    currentEval: number | null,
    comment: string
  ) => void;
  // School Platforms requiring Username & Password
  platforms: SchoolPlatformSync[];
  onConnectPlatformWithCredentials: (platformId: string, username: string) => void;
  onDisconnectPlatform: (platformId: string) => void;
  // Rewards & Teacher Adaptations
  parentRewards: ParentHomeReward[];
  onClaimParentReward: (rewardId: string) => void;
  onAddParentReward: (title: string, xpCost: number) => void;
  teacherAdaptations: TeacherAdaptationGuide[];
  onToggleTeacherAdaptation: (id: string) => void;
  onResetAllDataToZero: () => void;
}

export const AnalyticsAndFamily: React.FC<AnalyticsAndFamilyProps> = ({
  selectedCourse,
  studyPoints,
  parentCredentials,
  isParentAuthenticated,
  onConfigureParentCredentials,
  onLoginParent,
  onLogoutParent,
  studyRatioX,
  onChangeStudyRatioX,
  distractionFreeMode,
  onToggleDistractionFree,
  focusLockMode,
  onToggleFocusLockMode,
  weeklyMetrics,
  subjectGrades,
  onUpdateSubjectGrade,
  platforms,
  onConnectPlatformWithCredentials,
  onDisconnectPlatform,
  parentRewards,
  onClaimParentReward,
  onAddParentReward,
  teacherAdaptations,
  onToggleTeacherAdaptation,
  onResetAllDataToZero,
}) => {
  const courseMeta = COURSE_METADATA[selectedCourse];

  // Parental Login Form State
  const [inputParentUser, setInputParentUser] = useState<string>('');
  const [inputParentPass, setInputParentPass] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // LMS Platform Login Modal / Accordion State
  const [activePlatformLoginId, setActivePlatformLoginId] = useState<string | null>(null);
  const [platformUsername, setPlatformUsername] = useState<string>('');
  const [platformPassword, setPlatformPassword] = useState<string>('');
  const [platformLoginError, setPlatformLoginError] = useState<string>('');

  // Grade Editing State
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [editEval1, setEditEval1] = useState<string>('');
  const [editEval2, setEditEval2] = useState<string>('');
  const [editCurrent, setEditCurrent] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');

  // Rewards & UI State
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [newRewardTitle, setNewRewardTitle] = useState<string>('');
  const [newRewardCost, setNewRewardCost] = useState<number>(300);
  const [showLtiPayloadPreview, setShowLtiPayloadPreview] = useState<boolean>(false);

  const isConfigured = Boolean(parentCredentials && parentCredentials.isConfigured);

  const handleParentAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!inputParentUser.trim() || !inputParentPass.trim()) {
      setAuthError('Introduce un usuario y una contraseña válidos.');
      return;
    }

    if (!isConfigured) {
      onConfigureParentCredentials(inputParentUser.trim(), inputParentPass);
      setInputParentUser('');
      setInputParentPass('');
      soundFX.playRewardUnlock();
    } else {
      const ok = onLoginParent(inputParentUser.trim(), inputParentPass);
      if (!ok) {
        setAuthError('Usuario o contraseña incorrectos.');
      } else {
        setInputParentUser('');
        setInputParentPass('');
        soundFX.playStepComplete();
      }
    }
  };

  const handlePlatformAuthSubmit = (e: React.FormEvent, platformId: string) => {
    e.preventDefault();
    setPlatformLoginError('');
    if (!platformUsername.trim() || !platformPassword.trim()) {
      setPlatformLoginError('Debes introducir tu usuario/NIA y contraseña oficial.');
      return;
    }
    onConnectPlatformWithCredentials(platformId, platformUsername.trim());
    setPlatformUsername('');
    setPlatformPassword('');
    setActivePlatformLoginId(null);
    soundFX.playRewardUnlock();
  };

  const startEditingGrade = (row: SubjectGradeMetric) => {
    setEditingSubject(row.subject);
    setEditEval1(row.eval1 !== null ? String(row.eval1) : '');
    setEditEval2(row.eval2 !== null ? String(row.eval2) : '');
    setEditCurrent(row.currentEval !== null ? String(row.currentEval) : '');
    setEditComment(row.teacherComment === 'Sin calificaciones registradas' ? '' : row.teacherComment);
  };

  const handleSaveGrade = (e: React.FormEvent, subjectName: string) => {
    e.preventDefault();
    const n1 = editEval1.trim() !== '' ? Number(editEval1) : null;
    const n2 = editEval2.trim() !== '' ? Number(editEval2) : null;
    const nc = editCurrent.trim() !== '' ? Number(editCurrent) : null;
    onUpdateSubjectGrade(
      subjectName,
      n1,
      n2,
      nc,
      editComment.trim() || 'Nota registrada manualmente'
    );
    setEditingSubject(null);
    soundFX.playStepComplete();
  };

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRewardTitle.trim()) return;
    onAddParentReward(newRewardTitle.trim(), newRewardCost);
    setNewRewardTitle('');
    soundFX.playStepComplete();
  };

  const filteredAdaptations =
    stageFilter === 'ALL'
      ? teacherAdaptations
      : teacherAdaptations.filter((item) => item.stage === stageFilter);

  const courseSpecificGrades = subjectGrades.filter((g) => g.course === selectedCourse);
  const displayedGrades = courseSpecificGrades.length > 0 ? courseSpecificGrades : subjectGrades;

  const totalWeeklyFocus = weeklyMetrics.reduce((acc, d) => acc + d.focusMinutes, 0);
  const totalWeeklySteps = weeklyMetrics.reduce((acc, d) => acc + d.microStepsDone, 0);

  return (
    <div className="space-y-10">
      {/* =====================================================================
          SECTION 1: ACCESO CON USUARIO Y CONTRASEÑA PARA LA MADRE / PADRE
          ===================================================================== */}
      <div className="border border-amber-300 dark:border-amber-800 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-amber-200 dark:border-amber-800/60">
          <div>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              Área Protegida con Usuario y Contraseña · Control Parental Exclusivo
            </p>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5 flex items-center gap-2">
              {isParentAuthenticated ? (
                <Unlock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Lock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              )}
              Panel de Control de la Madre / Padre (Tiempo de Juego X y Modo Sin Distracciones)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isParentAuthenticated && (
              <>
                <span className="text-xs font-mono text-emerald-800 dark:text-emerald-300">
                  ✓ Sesión iniciada: <strong>{parentCredentials?.username}</strong>
                </span>
                <button
                  type="button"
                  onClick={onLogoutParent}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Cerrar Sesión Parental
                </button>
              </>
            )}
          </div>
        </div>

        {/* IF NOT LOGGED IN: SHOW USERNAME + PASSWORD LOGIN / REGISTRATION FORM */}
        {!isParentAuthenticated ? (
          <form
            onSubmit={handleParentAuthSubmit}
            className="max-w-xl bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-white">
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>
                {!isConfigured
                  ? 'Configura por primera vez el Usuario y Contraseña de la Madre / Padre'
                  : 'Inicia sesión con el Usuario y Contraseña de la Madre / Padre'}
              </span>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300">
              {!isConfigured
                ? 'Crea tu cuenta parental para que solo tú puedas decidir el valor de X (duración del minijuego según el tiempo de estudio) y activar o bloquear el Modo Sin Distracciones y el Modo Enfoque.'
                : `Actualmente el factor está bloqueado en X = ${studyRatioX}. Introduce tus credenciales parentales para modificar la duración del juego o activar el Modo Sin Distracciones / Enfoque.`}
            </p>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-300 text-xs text-rose-800 dark:text-rose-200 font-medium">
                {authError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Usuario de la Madre / Padre
                </label>
                <input
                  type="text"
                  required
                  value={inputParentUser}
                  onChange={(e) => setInputParentUser(e.target.value)}
                  placeholder="Ej. mama_clot"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Contraseña Parental
                </label>
                <input
                  type="password"
                  required
                  value={inputParentPass}
                  onChange={(e) => setInputParentPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
            >
              {!isConfigured
                ? 'Guardar Usuario y Contraseña y Entrar'
                : 'Acceder al Panel Parental'}
            </button>
          </form>
        ) : (
          /* IF AUTHENTICATED: FULL PARENTAL CONTROLS FOR X, DISTRACTION-FREE & FOCUS MODE */
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Control 1: Multiplier X (7 cols) */}
              <div className="lg:col-span-7 p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      1. Duración del Minijuego en función del Tiempo de Estudio (Valor de X)
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      Fórmula aplicada: <strong>Minutos de Juego = X × Minutos de Estudio</strong>
                    </p>
                  </div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-amber-700 dark:text-amber-400">
                    X = {studyRatioX}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0.1}
                    max={2.0}
                    step={0.05}
                    value={studyRatioX}
                    onChange={(e) =>
                      onChangeStudyRatioX(Number(parseFloat(e.target.value).toFixed(2)))
                    }
                    className="flex-1 accent-amber-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min={0.1}
                    max={3.0}
                    step={0.05}
                    value={studyRatioX}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val >= 0) onChangeStudyRatioX(val);
                    }}
                    className="w-20 px-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
                  {[15, 30, 60].map((studyMin) => (
                    <div
                      key={studyMin}
                      className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono tabular-nums"
                    >
                      <span className="text-stone-500 dark:text-stone-400">{studyMin}m estudio → </span>
                      <strong className="text-emerald-700 dark:text-emerald-400">
                        {Math.round(studyMin * studyRatioX)}m juego
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Control 2: Distraction-Free Mode & Focus Mode Toggles (5 cols) */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  2. Activar Modo Sin Distracciones o Modo Enfoque
                </h3>

                {/* Toggle Distraction-Free UI */}
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white">
                      Modo Sin Distracciones (Interfaz Limpia)
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5">
                      Oculta barras secundarias y notificaciones visuales para evitar estímulos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleDistractionFree(!distractionFreeMode)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      distractionFreeMode
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {distractionFreeMode ? '✓ ACTIVADO' : 'DESACTIVADO'}
                  </button>
                </div>

                {/* Toggle Focus Lock Mode (Blocks Mini-Games Tab until mother unlocks) */}
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white">
                      Modo Enfoque Estricto (Bloquear Minijuegos)
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5">
                      Impide abrir la pestaña de Minijuegos mientras el alumno está en horario de estudio.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleFocusLockMode(!focusLockMode)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      focusLockMode
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {focusLockMode ? '🔒 BLOQUEADO' : 'LIBRE'}
                  </button>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    El alumno no puede cambiar estos ajustes si cierras sesión parental.
                  </span>
                  <button
                    type="button"
                    onClick={onResetAllDataToZero}
                    className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Poner todo a cero
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          SECTION 2: CONEXIÓN CON USUARIO Y CONTRASEÑA A AULES GVA, ÍTACA Y CLASSROOM
          ===================================================================== */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Autenticación en Plataformas Escolares · IES Clot del Moro (Algímia d'Alfara)
            </p>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5">
              Iniciar Sesión en Aules GVA, Ítaca Web Familia y Google Classroom
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowLtiPayloadPreview((prev) => !prev)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 whitespace-nowrap shrink-0"
          >
            <Code2 className="w-4 h-4 text-amber-600" />
            {showLtiPayloadPreview ? 'Ocultar Detalles Técnicos LMS / Vercel' : 'Ver Integración LTI 1.3 y Despliegue GitHub/Vercel'}
          </button>
        </div>

        {/* 3 Platforms Requiring Login with Username & Password */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((plat) => {
            const isLoginOpen = activePlatformLoginId === plat.id;
            return (
              <div
                key={plat.id}
                className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-500 dark:text-stone-400">{plat.protocol}</span>
                    {plat.connected ? (
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        ✓ VINCULADO
                      </span>
                    ) : (
                      <span className="font-semibold text-stone-500 dark:text-stone-400">
                        ○ NO VINCULADO
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">{plat.name}</h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300">{plat.statusText}</p>

                  {plat.connected && (
                    <div className="pt-2 text-xs font-mono text-stone-700 dark:text-stone-300 space-y-0.5">
                      <div>Usuario activo: <strong>{plat.usernameLogged}</strong></div>
                      <div>Última conexión: {plat.lastSync}</div>
                    </div>
                  )}
                </div>

                {/* Login Form for this specific platform */}
                {isLoginOpen && !plat.connected && (
                  <form
                    onSubmit={(e) => handlePlatformAuthSubmit(e, plat.id)}
                    className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-3"
                  >
                    <div className="text-xs font-bold text-stone-900 dark:text-white">
                      Credenciales de {plat.name}
                    </div>
                    {platformLoginError && (
                      <p className="text-[11px] text-rose-600">{platformLoginError}</p>
                    )}
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-300 mb-1">
                        {plat.loginLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={platformUsername}
                        onChange={(e) => setPlatformUsername(e.target.value)}
                        placeholder={plat.loginPlaceholder}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-300 mb-1">
                        Contraseña de {plat.name}
                      </label>
                      <input
                        type="password"
                        required
                        value={platformPassword}
                        onChange={(e) => setPlatformPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                      >
                        Conectar Cuenta
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePlatformLoginId(null)}
                        className="py-2 px-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}

                <div className="pt-3 border-t border-stone-200 dark:border-stone-700/80 flex items-center justify-between gap-2">
                  {!plat.connected ? (
                    <button
                      type="button"
                      onClick={() => {
                        setActivePlatformLoginId(plat.id);
                        setPlatformUsername('');
                        setPlatformPassword('');
                        setPlatformLoginError('');
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      Iniciar Sesión con Usuario y Contraseña
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onDisconnectPlatform(plat.id)}
                      className="w-full py-2 px-3 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      Desvincular cuenta ({plat.usernameLogged})
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical LTI 1.3 Architecture & GitHub + Vercel Deployment Instructions */}
        {showLtiPayloadPreview && (
          <div className="space-y-6 pt-4 border-t border-stone-200 dark:border-stone-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LMS_TECHNICAL_ARCHITECTURE.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-amber-700 dark:text-amber-400 font-bold">
                    <span>{step.stepNumber} · {step.protocolOrTech}</span>
                    <span>{step.direction}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white">{step.title}</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300">{step.description}</p>
                  <div className="p-2 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 font-mono text-[11px] text-stone-700 dark:text-amber-300 truncate">
                    {step.endpointOrStandard}
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub & Vercel Deployment Box */}
            <div className="p-5 rounded-xl bg-stone-900 text-stone-100 space-y-3 font-mono text-xs">
              <div className="text-amber-400 font-bold text-sm">
                Guía Lista para Subir a GitHub y Desplegar en Vercel (vercel.json ya incluido en el proyecto)
              </div>
              <pre className="text-[11px] leading-relaxed text-stone-200 overflow-x-auto">
{`# 1. Inicializar repositorio Git y subir a tu cuenta de GitHub:
git init
git add .
git commit -m "ClotFocus IES Clot del Moro - Plataforma TDAH"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/clotfocus.git
git push -u origin main

# 2. Desplegar en Vercel:
# - Entra en https://vercel.com/new e inicia sesión con tu cuenta de GitHub.
# - Selecciona el repositorio "clotfocus" y pulsa "Deploy".
# - Vercel detectará automáticamente Vite y el archivo vercel.json incluido (Build: npm run build, Output: dist).`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          SECTION 3: NOTAS Y PROGRESO REALES (INICIALIZADOS A CERO)
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weekly Study Chart Starting at 0 (5 cols) */}
        <div className="lg:col-span-5 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Registro Real de Estudio Semanal (Empieza en 0 min)
            </p>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
              Minutos Estudiados: {totalWeeklyFocus} min · Pasos: {totalWeeklySteps}
            </h3>
          </div>

          <div className="space-y-2.5 pt-2">
            {weeklyMetrics.map((d) => {
              const pct = Math.min(100, Math.round((d.focusMinutes / d.targetMinutes) * 100));
              return (
                <div key={d.day} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{d.day}</span>
                    <span className="text-stone-600 dark:text-stone-400">
                      {d.focusMinutes} min / meta {d.targetMinutes} min ({d.microStepsDone} pasos)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Grades Table Starting Empty (7 cols) */}
        <div className="lg:col-span-7 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-4 overflow-x-auto">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Boletín de Calificaciones a Cero (Sin datos inventados)
              </p>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
                Calificaciones por Asignatura ({courseMeta.shortLabel})
              </h3>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Pulsa "Registrar nota" para introducir las notas reales del alumno
            </span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                <th className="py-2 pr-3 font-semibold">Asignatura</th>
                <th className="py-2 px-2 font-semibold text-right">1ª Eval</th>
                <th className="py-2 px-2 font-semibold text-right">2ª Eval</th>
                <th className="py-2 px-2 font-semibold text-right">3ª / Final</th>
                <th className="py-2 pl-3 font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
              {displayedGrades.map((row) => {
                const isEditing = editingSubject === row.subject;
                return (
                  <React.Fragment key={`${row.course}-${row.subject}`}>
                    <tr className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40">
                      <td className="py-2.5 pr-3 font-semibold text-stone-900 dark:text-white">
                        {row.subject}
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono tabular-nums text-stone-600 dark:text-stone-300">
                        {row.eval1 !== null ? row.eval1.toFixed(1) : '—'}
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono tabular-nums text-stone-600 dark:text-stone-300">
                        {row.eval2 !== null ? row.eval2.toFixed(1) : '—'}
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400">
                        {row.currentEval !== null ? row.currentEval.toFixed(1) : '—'}
                      </td>
                      <td className="py-2.5 pl-3">
                        <button
                          type="button"
                          onClick={() => startEditingGrade(row)}
                          className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline whitespace-nowrap"
                        >
                          {isEditing ? 'Editando...' : 'Registrar nota'}
                        </button>
                      </td>
                    </tr>
                    {isEditing && (
                      <tr>
                        <td colSpan={5} className="p-3 bg-stone-50 dark:bg-stone-800/60">
                          <form
                            onSubmit={(e) => handleSaveGrade(e, row.subject)}
                            className="flex flex-wrap items-center gap-2"
                          >
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="10"
                              value={editEval1}
                              onChange={(e) => setEditEval1(e.target.value)}
                              placeholder="1ª Eval (0-10)"
                              className="w-28 px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                            />
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="10"
                              value={editEval2}
                              onChange={(e) => setEditEval2(e.target.value)}
                              placeholder="2ª Eval (0-10)"
                              className="w-28 px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                            />
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="10"
                              value={editCurrent}
                              onChange={(e) => setEditCurrent(e.target.value)}
                              placeholder="3ª / Actual"
                              className="w-28 px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                            />
                            <button
                              type="submit"
                              className="px-3 py-1.5 rounded bg-amber-600 text-white text-xs font-semibold"
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSubject(null)}
                              className="px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 text-xs"
                            >
                              Cancelar
                            </button>
                          </form>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================================
          SECTION 4: RECOMPENSAS FAMILIARES EN CASA Y RECURSOS DOCENTES
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-5">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                Recompensas Pactadas en Casa
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Añade aquí las recompensas reales que acuerdes con tu hijo/a
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
              Saldo: {studyPoints} PE
            </span>
          </div>

          {parentRewards.length === 0 ? (
            <p className="text-xs text-stone-500 dark:text-stone-400 py-4 text-center border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
              No hay recompensas registradas todavía. Añade la primera meta familiar abajo.
            </p>
          ) : (
            <div className="space-y-2.5">
              {parentRewards.map((reward) => {
                const canAfford = studyPoints >= reward.xpCost && !reward.claimed;
                return (
                  <div
                    key={reward.id}
                    className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold">
                        {reward.xpCost} PE
                      </span>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-white">
                        {reward.title}
                      </h4>
                    </div>
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onClaimParentReward(reward.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        reward.claimed
                          ? 'bg-emerald-100 text-emerald-800'
                          : canAfford
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                      }`}
                    >
                      {reward.claimed ? '✓ Canjeada' : 'Canjear'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <form onSubmit={handleCreateReward} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newRewardTitle}
              onChange={(e) => setNewRewardTitle(e.target.value)}
              placeholder="Nueva recompensa (ej. Elegir cena del viernes)..."
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
            />
            <input
              type="number"
              min={50}
              max={5000}
              step={50}
              value={newRewardCost}
              onChange={(e) => setNewRewardCost(Number(e.target.value))}
              className="w-24 px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold whitespace-nowrap shrink-0"
            >
              + Añadir Recompensa
            </button>
          </form>
        </div>

        {/* Teacher Resources */}
        <div className="lg:col-span-6 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">
              Pautas de Apoyo Docente TDAH (IES Clot del Moro)
            </h3>
            <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
              {['ALL', '1º y 2º ESO', '3º y 4º ESO', '1º y 2º Bachillerato'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStageFilter(st)}
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    stageFilter === st
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {st === 'ALL' ? 'Todas' : st.replace('Bachillerato', 'Bach')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredAdaptations.map((guide) => (
              <div
                key={guide.id}
                className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    {guide.stage} · {guide.category}
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white mt-0.5">
                    {guide.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                    {guide.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleTeacherAdaptation(guide.id)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
                    guide.appliedInStudentProfile
                      ? 'bg-emerald-600 text-white'
                      : 'border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {guide.appliedInStudentProfile ? '✓ Activa' : 'Activar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
