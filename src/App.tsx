import React, { useState, useEffect } from 'react';
import {
  ANIME_WORLDS,
  COURSE_METADATA,
  FULL_SYLLABUS_SUBJECTS,
  INITIAL_CORNELL_NOTES,
  INITIAL_FLASHCARDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PARENT_REWARDS,
  INITIAL_PLATFORMS,
  INITIAL_SUBJECT_GRADES_METRICS,
  INITIAL_TASKS,
  INITIAL_VIRTUAL_SHOP_ITEMS,
  INITIAL_WEEKLY_STUDY_METRICS,
  TEACHER_ADAPTATIONS,
} from './data/clotDelMoroData';
import {
  ActiveTab,
  AnimeWorldId,
  AppNotification,
  CornellNote,
  CourseGrade,
  FlashcardItem,
  ParentHomeReward,
  SchoolPlatformSync,
  SchoolTask,
  SubjectGradeMetric,
  TeacherAdaptationGuide,
  UserRole,
  VirtualShopItem,
  WeeklyStudyMetric,
} from './types';
import { AnimeWorldIllustration } from './components/AnimeArtwork';
import { AnimeMiniGames } from './components/AnimeMiniGames';
import { StudyStudio } from './components/StudyStudio';
import { CurriculumAndModules } from './components/CurriculumAndModules';
import { AnalyticsAndFamily } from './components/AnalyticsAndFamily';
import { soundFX } from './utils/sound';
import {
  Bell,
  BookOpen,
  CheckCircle2,
  Circle,
  Lock,
  Moon,
  Plus,
  ShieldAlert,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function App() {
  // --- CORE STATE WITH ZERO INITIAL VALUES (NO INVENTED DATA) ---
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('clotfocus_dark_v3');
    return saved ? JSON.parse(saved) : false;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<CourseGrade>('1ESO');
  const [activeRole, setActiveRole] = useState<UserRole>('STUDENT');
  const [selectedSubjectForCurriculum, setSelectedSubjectForCurriculum] = useState<string>('subj-bio');

  const [selectedWorld, setSelectedWorld] = useState<AnimeWorldId>(() => {
    const saved = localStorage.getItem('clotfocus_world_v3');
    if (saved && (saved === 'NARUTO' || saved === 'HEROES' || saved === 'PIRATES' || saved === 'ALCHEMIST')) {
      return saved as AnimeWorldId;
    }
    return 'NARUTO';
  });

  // Mother / Parent Authentication & Controls
  const [parentCredentials, setParentCredentials] = useState<{
    username: string;
    password: string;
  } | null>(() => {
    const saved = localStorage.getItem('clotfocus_parent_creds_v3');
    return saved ? JSON.parse(saved) : null;
  });
  const [isParentAuthenticated, setIsParentAuthenticated] = useState<boolean>(false);

  // Parental multiplier X: Duración Minijuego = X * Tiempo de Estudio (Starts at 0 until parent configures it)
  const [studyRatioX, setStudyRatioX] = useState<number>(() => {
    const saved = localStorage.getItem('clotfocus_ratio_x_v3');
    return saved !== null ? Number(saved) : 0;
  });

  const [distractionFreeMode, setDistractionFreeMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('clotfocus_distraction_v3');
    return saved ? JSON.parse(saved) : false;
  });

  const [focusLockMode, setFocusLockMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('clotfocus_focuslock_v3');
    return saved ? JSON.parse(saved) : false;
  });

  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  // Study Points (Puntos de Estudio) starts strictly at 0
  const [studyPoints, setStudyPoints] = useState<number>(() => {
    const saved = localStorage.getItem('clotfocus_study_points_v3');
    return saved !== null ? Number(saved) : 0;
  });

  // Break Minutes (Minutos de Minijuego) starts strictly at 0
  const [breakMinutes, setBreakMinutes] = useState<number>(() => {
    const saved = localStorage.getItem('clotfocus_break_min_v3');
    return saved !== null ? Number(saved) : 0;
  });

  // Completed units & lessons map starts empty {}
  const [completedUnits, setCompletedUnits] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('clotfocus_completed_units_v3');
    return saved ? JSON.parse(saved) : {};
  });

  // Tasks start empty []
  const [tasks, setTasks] = useState<SchoolTask[]>(() => {
    const saved = localStorage.getItem('clotfocus_tasks_v3');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Virtual shop items start locked
  const [shopItems, setShopItems] = useState<VirtualShopItem[]>(() => {
    const saved = localStorage.getItem('clotfocus_shop_v3');
    return saved ? JSON.parse(saved) : INITIAL_VIRTUAL_SHOP_ITEMS;
  });

  // Weekly focus metrics start at 0 across all days
  const [weeklyMetrics, setWeeklyMetrics] = useState<WeeklyStudyMetric[]>(() => {
    const saved = localStorage.getItem('clotfocus_weekly_v3');
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_STUDY_METRICS;
  });

  // Subject grades start at null (sin calificar) across all subjects
  const [subjectGrades, setSubjectGrades] = useState<SubjectGradeMetric[]>(() => {
    const saved = localStorage.getItem('clotfocus_grades_v3');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECT_GRADES_METRICS;
  });

  // Platforms start disconnected (connected: false)
  const [platforms, setPlatforms] = useState<SchoolPlatformSync[]>(() => {
    const saved = localStorage.getItem('clotfocus_platforms_v3');
    return saved ? JSON.parse(saved) : INITIAL_PLATFORMS;
  });

  const [parentRewards, setParentRewards] = useState<ParentHomeReward[]>(() => {
    const saved = localStorage.getItem('clotfocus_parent_rewards_v3');
    return saved ? JSON.parse(saved) : INITIAL_PARENT_REWARDS;
  });

  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(() => {
    const saved = localStorage.getItem('clotfocus_flashcards_v3');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [cornellNotes, setCornellNotes] = useState<CornellNote[]>(() => {
    const saved = localStorage.getItem('clotfocus_cornell_v3');
    return saved ? JSON.parse(saved) : INITIAL_CORNELL_NOTES;
  });

  const [teacherAdaptations, setTeacherAdaptations] = useState<TeacherAdaptationGuide[]>(() => {
    const saved = localStorage.getItem('clotfocus_adaptations_v3');
    return saved ? JSON.parse(saved) : TEACHER_ADAPTATIONS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const [pushPermissionStatus, setPushPermissionStatus] = useState<string>('ACTIVO');

  // --- PLANNER / NEW TASK FORM STATE ---
  const [taskFilter, setTaskFilter] = useState<'PENDING' | 'COMPLETED' | 'ALL'>('ALL');
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskSubject, setNewTaskSubject] = useState<string>('Biología y Geología');
  const [newTaskDueDate, setNewTaskDueDate] = useState<string>('Próxima entrega');
  const [newTaskStep1, setNewTaskStep1] = useState<string>('');
  const [newTaskStep2, setNewTaskStep2] = useState<string>('');

  // Toast feedback banner
  const [toastBanner, setToastBanner] = useState<string | null>(null);

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
    localStorage.setItem('clotfocus_dark_v3', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('clotfocus_world_v3', selectedWorld);
  }, [selectedWorld]);

  useEffect(() => {
    if (parentCredentials) {
      localStorage.setItem('clotfocus_parent_creds_v3', JSON.stringify(parentCredentials));
    } else {
      localStorage.removeItem('clotfocus_parent_creds_v3');
    }
  }, [parentCredentials]);

  useEffect(() => {
    localStorage.setItem('clotfocus_ratio_x_v3', String(studyRatioX));
  }, [studyRatioX]);

  useEffect(() => {
    localStorage.setItem('clotfocus_distraction_v3', JSON.stringify(distractionFreeMode));
  }, [distractionFreeMode]);

  useEffect(() => {
    localStorage.setItem('clotfocus_focuslock_v3', JSON.stringify(focusLockMode));
  }, [focusLockMode]);

  useEffect(() => {
    localStorage.setItem('clotfocus_study_points_v3', String(studyPoints));
  }, [studyPoints]);

  useEffect(() => {
    localStorage.setItem('clotfocus_break_min_v3', String(breakMinutes));
  }, [breakMinutes]);

  useEffect(() => {
    localStorage.setItem('clotfocus_completed_units_v3', JSON.stringify(completedUnits));
  }, [completedUnits]);

  useEffect(() => {
    localStorage.setItem('clotfocus_tasks_v3', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('clotfocus_shop_v3', JSON.stringify(shopItems));
  }, [shopItems]);

  useEffect(() => {
    localStorage.setItem('clotfocus_weekly_v3', JSON.stringify(weeklyMetrics));
  }, [weeklyMetrics]);

  useEffect(() => {
    localStorage.setItem('clotfocus_grades_v3', JSON.stringify(subjectGrades));
  }, [subjectGrades]);

  useEffect(() => {
    localStorage.setItem('clotfocus_platforms_v3', JSON.stringify(platforms));
  }, [platforms]);

  useEffect(() => {
    localStorage.setItem('clotfocus_parent_rewards_v3', JSON.stringify(parentRewards));
  }, [parentRewards]);

  useEffect(() => {
    localStorage.setItem('clotfocus_flashcards_v3', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('clotfocus_cornell_v3', JSON.stringify(cornellNotes));
  }, [cornellNotes]);

  useEffect(() => {
    localStorage.setItem('clotfocus_adaptations_v3', JSON.stringify(teacherAdaptations));
  }, [teacherAdaptations]);

  const triggerToast = (message: string) => {
    setToastBanner(message);
    window.setTimeout(() => {
      setToastBanner((prev) => (prev === message ? null : prev));
    }, 5000);
  };

  // Helper to record real study minutes into today's bar in weeklyMetrics
  const recordStudyAndGameMinutesToday = (studyMin: number, gameMin: number) => {
    const dayIndexMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
    const todayIdx = dayIndexMap[new Date().getDay()] ?? 0;
    setWeeklyMetrics((prev) =>
      prev.map((m, idx) =>
        idx === todayIdx
          ? {
              ...m,
              focusMinutes: m.focusMinutes + studyMin,
              breakMinutesUsed: m.breakMinutesUsed + gameMin,
              microStepsDone: m.microStepsDone + 1,
            }
          : m
      )
    );
  };

  // --- HANDLERS ---
  const handleToggleMicroStep = (taskId: string, stepId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id !== taskId) return t;
        const updatedSteps = t.microSteps.map((s) => {
          if (s.id !== stepId) return s;
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            soundFX.playStepComplete();
            const earnedMin = Math.round(s.durationMin * studyRatioX);
            setStudyPoints((sp) => sp + 35);
            setBreakMinutes((bm) => bm + earnedMin);
            recordStudyAndGameMinutesToday(s.durationMin, earnedMin);
            triggerToast(
              `¡Micro-paso de ${s.durationMin} min completado! +35 PE y +${earnedMin} min de juego (${s.durationMin}m × ${studyRatioX})`
            );
          }
          return { ...s, completed: nextCompleted };
        });

        const allDoneNow = updatedSteps.every((s) => s.completed);
        const wasAllDoneBefore = t.microSteps.every((s) => s.completed);
        if (allDoneNow && !wasAllDoneBefore) {
          soundFX.playRewardUnlock();
          const bonusBreak = Math.round(t.studyDurationMin * studyRatioX);
          setStudyPoints((sp) => sp + t.rewardStudyPoints);
          setBreakMinutes((bm) => bm + bonusBreak);
          triggerToast(
            `¡Tarea "${t.title}" finalizada! Ganaste +${t.rewardStudyPoints} PE y +${bonusBreak} min de Minijuego Anime.`
          );
        }

        return { ...t, microSteps: updatedSteps };
      })
    );
  };

  const handleCompleteLessonReward = (
    unitOrLessonId: string,
    lessonMinutes: number,
    pointsEarned: number,
    lessonTitle: string
  ) => {
    const breakEarned = Math.round(lessonMinutes * studyRatioX);
    setCompletedUnits((prev) => ({ ...prev, [unitOrLessonId]: true }));
    setStudyPoints((prev) => prev + pointsEarned);
    setBreakMinutes((prev) => prev + breakEarned);
    recordStudyAndGameMinutesToday(lessonMinutes, breakEarned);
    triggerToast(
      `¡Completaste "${lessonTitle}" (${lessonMinutes} min)! +${pointsEarned} PE y +${breakEarned} min de minijuego (X = ${studyRatioX})`
    );
  };

  const handleRedeemShopItem = (itemId: string) => {
    const target = shopItems.find((i) => i.id === itemId);
    if (!target || studyPoints < target.costPoints) return;
    setStudyPoints((prev) => prev - target.costPoints);
    setBreakMinutes((prev) => prev + target.minutesIncluded);
    setShopItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, unlocked: true } : item))
    );
    triggerToast(
      `¡Canjeado en la Tienda Virtual: "${target.title}"! Se han añadido +${target.minutesIncluded} min a tu cuenta de juego.`
    );
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const stepList = [
      {
        id: `st-${Date.now()}-1`,
        title: newTaskStep1.trim() || 'Preparar material y leer el enunciado subrayando verbos clave',
        durationMin: 10,
        completed: false,
      },
      {
        id: `st-${Date.now()}-2`,
        title: newTaskStep2.trim() || 'Completar los ejercicios y revisar antes de entregar',
        durationMin: 15,
        completed: false,
      },
    ];

    const created: SchoolTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      subject: newTaskSubject,
      course: selectedCourse,
      dueDate: newTaskDueDate,
      dueTime: '10:00',
      priority: 'ALTA',
      sourcePlatform: 'Manual',
      microSteps: stepList,
      studyDurationMin: 25,
      rewardStudyPoints: 120,
      teacherTip: 'Divide y vencerás: haz primero el paso 1 de 10 minutos sin pensar en el resto.',
    };

    setTasks((prev) => [created, ...prev]);
    setNewTaskTitle('');
    setNewTaskStep1('');
    setNewTaskStep2('');
    setShowAddTaskModal(false);
    soundFX.playStepComplete();
    triggerToast('Nueva tarea dividida en micro-pasos añadida a tu agenda.');
  };

  const handleRequestPushNotification = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((perm) => {
        setPushPermissionStatus(perm === 'granted' ? 'ACTIVO' : 'EN PANTALLA');
      });
    }
    const newAlert: AppNotification = {
      id: `not-${Date.now()}`,
      title: `Recordatorio Push (${COURSE_METADATA[selectedCourse].shortLabel} · IES Clot del Moro)`,
      body: `Completa 15 min de estudio para ganar +${Math.round(15 * studyRatioX)} min de minijuego Anime (X = ${studyRatioX}).`,
      timeLabel: 'Ahora mismo',
      category: 'ENTREGA',
      read: false,
      urgent: true,
    };
    setNotifications((prev) => [newAlert, ...prev]);
    soundFX.playStepComplete();
    triggerToast('Alerta de recordatorio Push enviada y registrada en el calendario.');
  };

  const handleConnectPlatformWithCredentials = (
    platformId: string,
    username: string,
    _password: string
  ) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === platformId
          ? {
              ...p,
              connected: true,
              autoSyncEnabled: true,
              usernameLogged: username,
              lastSync: 'Conectado ahora mismo',
            }
          : p
      )
    );
    soundFX.playStepComplete();
    triggerToast(`Sesión iniciada correctamente como "${username}". Sincronización LMS activa.`);
  };

  const handleDisconnectPlatform = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === platformId
          ? {
              ...p,
              connected: false,
              autoSyncEnabled: false,
              usernameLogged: '',
              lastSync: 'Sin sincronizar (Sesión cerrada)',
              syncedTasksCount: 0,
            }
          : p
      )
    );
    triggerToast('Sesión cerrada en la plataforma educativa.');
  };

  const handleResetAllDataToZero = () => {
    setStudyPoints(0);
    setBreakMinutes(0);
    setStudyRatioX(0);
    setCompletedUnits({});
    setTasks([]);
    setShopItems(INITIAL_VIRTUAL_SHOP_ITEMS);
    setWeeklyMetrics(INITIAL_WEEKLY_STUDY_METRICS);
    setSubjectGrades(INITIAL_SUBJECT_GRADES_METRICS);
    setPlatforms(INITIAL_PLATFORMS);
    setParentRewards([]);
    setFlashcards(INITIAL_FLASHCARDS);
    setCornellNotes([]);
    setNotifications([]);
    setTeacherAdaptations(TEACHER_ADAPTATIONS);
    setDistractionFreeMode(false);
    setFocusLockMode(false);
    triggerToast('Todos los contadores, notas, progreso, tareas y recompensas se han puesto a 0.');
  };

  const handleHeaderFocusButtonClick = () => {
    if (!isParentAuthenticated) {
      setActiveRole('PARENT');
      setActiveTab('analytics');
      triggerToast(
        'Acceso Parental requerido: Inicia sesión como Madre / Padre con usuario y contraseña para activar o desactivar el Modo Sin Distracciones o Modo Enfoque.'
      );
      return;
    }
    setDistractionFreeMode((prev) => !prev);
  };

  const courseMeta = COURSE_METADATA[selectedCourse];
  const world = ANIME_WORLDS[selectedWorld];

  const courseTasks = tasks.filter((t) => t.course === selectedCourse);
  const displayedTasks = courseTasks.filter((t) => {
    const isDone = t.microSteps.every((s) => s.completed);
    if (taskFilter === 'PENDING') return !isDone;
    if (taskFilter === 'COMPLETED') return isDone;
    return true;
  });

  const unreadNotifCount = notifications.filter((n) => !n.read).length;
  const rankIndex = Math.min(3, Math.floor(studyPoints / 300));
  const currentRankTitle = world.rankTitles[rankIndex];
  const completedCountTotal = Object.keys(completedUnits).filter((k) => completedUnits[k]).length;
  const connectedPlatformsCount = platforms.filter((p) => p.connected).length;

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Warm, welcoming neutral canvas (#FDFBF7 in light mode, warm stone-950 in dark mode) */}
      <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
        {/* =====================================================================
            TOP BAR CONTRACT: Strictly 3 Zones separated by gap-8
            Zone 1: Single text wordmark | Zone 2: 5 single-line nav links | Zone 3: 1 primary CTA
            ===================================================================== */}
        <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 dark:bg-stone-900/95 backdrop-blur-xs border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
            {/* Zone 1: Brand Title, single text element */}
            <a
              href="#panel"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('dashboard');
              }}
              className="text-xl font-bold tracking-tight text-stone-900 dark:text-white whitespace-nowrap shrink-0 font-display"
            >
              ClotFocus
            </a>

            {/* Zone 2: 5 concise single-line navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'dashboard'
                    ? 'border-amber-600 dark:border-amber-400 text-stone-900 dark:text-white font-semibold'
                    : 'border-transparent hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Panel
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('curriculum')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'curriculum'
                    ? 'border-amber-600 dark:border-amber-400 text-stone-900 dark:text-white font-semibold'
                    : 'border-transparent hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Temarios ({FULL_SYLLABUS_SUBJECTS.length} Asignaturas)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('planner')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'planner'
                    ? 'border-amber-600 dark:border-amber-400 text-stone-900 dark:text-white font-semibold'
                    : 'border-transparent hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Tareas y Estudio
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('minigames')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'minigames'
                    ? 'border-amber-600 dark:border-amber-400 text-stone-900 dark:text-white font-semibold'
                    : 'border-transparent hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {focusLockMode ? '🔒 Minijuegos (Modo Enfoque)' : 'Tienda y Minijuegos'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'analytics'
                    ? 'border-amber-600 dark:border-amber-400 text-stone-900 dark:text-white font-semibold'
                    : 'border-transparent hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Acceso Madre/Padre y LMS
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action (Protected by Mother/Parent login) */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={handleHeaderFocusButtonClick}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  distractionFreeMode || focusLockMode
                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                {distractionFreeMode
                  ? 'Modo Sin Distracciones Activo (Madre/Padre)'
                  : focusLockMode
                  ? 'Modo Enfoque Activo (Madre/Padre)'
                  : 'Control Modo Enfoque (Madre/Padre)'}
              </button>
            </div>
          </div>
        </header>

        {/* =====================================================================
            WORKSPACE CONTEXT TOOLBAR (Course 1º ESO–2º Bach, Factor X, Role, Dark Mode)
            Hidden when Distraction-Free Mode is enabled by Mother/Parent
            ===================================================================== */}
        {!distractionFreeMode && (
          <div className="border-b border-stone-200 dark:border-stone-800 bg-amber-50/40 dark:bg-stone-900/60">
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
              {/* Left: IES Clot del Moro Course Level Selector */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  IES Clot del Moro (Algímia d'Alfara) · Curso:
                </span>
                <div className="flex items-center gap-1 p-1 bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  {(['1ESO', '2ESO', '3ESO', '4ESO', '1BACH', '2BACH'] as CourseGrade[]).map(
                    (grade) => (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => setSelectedCourse(grade)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          selectedCourse === grade
                            ? 'bg-amber-600 text-white'
                            : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        {COURSE_METADATA[grade].shortLabel}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Right: Parental Multiplier X Quick Indicator, Role Switcher, Alerts & Dark Mode */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Quick Parental X Ratio Button (Requires Parent Login to change) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveRole('PARENT');
                    setActiveTab('analytics');
                  }}
                  title="Configurar con usuario y contraseña de Madre/Padre"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/50 text-xs font-mono font-semibold text-amber-900 dark:text-amber-200 hover:bg-amber-100 transition-colors whitespace-nowrap shrink-0"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>
                    Juego = {studyRatioX}x Estudio{' '}
                    {isParentAuthenticated ? '(Desbloqueado)' : '(Madre/Padre)'}
                  </span>
                </button>

                {/* Role Segmented Switch */}
                <div className="flex items-center gap-1 p-1 bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  <button
                    type="button"
                    onClick={() => setActiveRole('STUDENT')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeRole === 'STUDENT'
                        ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                        : 'text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Alumno/a
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRole('PARENT');
                      setActiveTab('analytics');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeRole === 'PARENT'
                        ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                        : 'text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Madre / Padre {isParentAuthenticated ? '✓' : '🔒'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRole('TEACHER');
                      setActiveTab('analytics');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeRole === 'TEACHER'
                        ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                        : 'text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Docente
                  </button>
                </div>

                {/* Notifications Button */}
                <button
                  type="button"
                  onClick={() => setShowNotificationPanel((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Alertas ({unreadNotifCount})</span>
                </button>

                {/* Sound Mute Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const nextMuted = !soundMuted;
                    setSoundMuted(nextMuted);
                    soundFX.muted = nextMuted;
                  }}
                  aria-label={soundMuted ? 'Activar sonidos' : 'Silenciar sonidos'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0"
                >
                  {soundMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  <span>{soundMuted ? 'Sin sonido' : 'Sonido'}</span>
                </button>

                {/* Dark Mode Accessibility Button */}
                <button
                  type="button"
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-100 hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0"
                >
                  {darkMode ? (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-stone-700" />
                  )}
                  <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Strip */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto px-6 py-2.5 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          {[
            { id: 'dashboard', label: 'Panel' },
            { id: 'curriculum', label: `Temarios (${FULL_SYLLABUS_SUBJECTS.length})` },
            { id: 'planner', label: 'Tareas y Estudio' },
            { id: 'minigames', label: focusLockMode ? '🔒 Minijuegos' : 'Tienda y Minijuegos' },
            { id: 'analytics', label: 'Madre/Padre y LMS' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Toast Feedback Notification */}
        {toastBanner && (
          <div className="max-w-7xl mx-auto px-6 pt-4">
            <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-100 border border-emerald-700 flex items-center justify-between gap-4 text-xs font-medium">
              <span>✓ {toastBanner}</span>
              <button
                type="button"
                onClick={() => setToastBanner(null)}
                className="text-emerald-300 hover:text-white whitespace-nowrap"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Collapsible Push Notification & Calendar Alert Center */}
        {showNotificationPanel && (
          <div className="max-w-7xl mx-auto px-6 pt-4">
            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                    Centro de Notificaciones Push y Alertas de Calendario (IES Clot del Moro)
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Estado de avisos: {pushPermissionStatus} · Sincroniza Aules GVA e Ítaca iniciando sesión en la pestaña Madre/Padre y LMS
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRequestPushNotification}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Generar Alerta Push de Prueba
                  </button>
                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                      }
                      className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 whitespace-nowrap shrink-0"
                    >
                      Marcar leídas
                    </button>
                  )}
                </div>
              </div>

              {notifications.length === 0 ? (
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  0 alertas registradas. Las alertas aparecerán cuando sincronices Aules GVA / Ítaca Web Familia o generes un recordatorio.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {notifications.slice(0, 3).map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 rounded-xl border ${
                        notif.urgent && !notif.read
                          ? 'border-amber-500/70 bg-amber-50/50 dark:bg-amber-950/20'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                      }`}
                    >
                      <div className="text-xs text-stone-500 dark:text-stone-400">
                        <span>{notif.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{notif.timeLabel}</span>
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white mt-1">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{notif.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            MAIN CONTENT VIEWPORT
            ===================================================================== */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
          {/* TAB 1: DASHBOARD (PANEL PRINCIPAL CON TODAS LAS ASIGNATURAS VISIBLES) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-10">
              {/* ALL SUBJECTS DIRECTORY FIRST SO ALL SUBJECTS ARE VISIBLE AT A GLANCE */}
              <section className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      <span>IES Clot del Moro · Algímia d'Alfara</span>
                      <span aria-hidden="true"> · </span>
                      <span>{courseMeta.stage}</span>
                      <span aria-hidden="true"> · </span>
                      <span>Estilo Repaso ESO / Bachillerato</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight mt-1">
                      Todas las Asignaturas de {courseMeta.label} ({FULL_SYLLABUS_SUBJECTS.length} Materias)
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                      Haz clic en cualquier asignatura para abrir su temario completo por unidades, resúmenes claros para TDAH y test de autoevaluación. Todos los contadores parten de <strong>0</strong>.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('curriculum')}
                      className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      Ver Todos los Temarios →
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRole('PARENT');
                        setActiveTab('analytics');
                      }}
                      className="px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      Acceso Madre / Padre (X = {studyRatioX})
                    </button>
                  </div>
                </div>

                {/* All-Subjects Grid (Every subject visible simultaneously) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {FULL_SYLLABUS_SUBJECTS.map((subject) => {
                    const doneInSubject = subject.units.filter((u) => completedUnits[u.id]).length;
                    return (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => {
                          setSelectedSubjectForCurriculum(subject.id);
                          setActiveTab('curriculum');
                        }}
                        className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/50 hover:border-amber-500 dark:hover:border-amber-500 text-left transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                            <span className="font-mono font-semibold text-amber-700 dark:text-amber-400">
                              {subject.shortCode}
                            </span>
                            <span className="font-mono tabular-nums">
                              {doneInSubject}/{subject.units.length} uds
                            </span>
                          </div>
                          <h2 className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                            {subject.name}
                          </h2>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                            {subject.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-200/70 dark:border-stone-700/60 flex items-center justify-between text-xs">
                          <span className="text-stone-600 dark:text-stone-300 font-medium flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            Abrir temario
                          </span>
                          <span className="font-mono text-stone-400">→</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Hero Split Row (2-column balanced with items-stretch) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column (7 cols): Student State & Quick Actions */}
                <div className="lg:col-span-7 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      <span>Estado Inicial a Cero (Sin datos inventados)</span>
                      <span aria-hidden="true"> · </span>
                      <span>Control Parental con Contraseña</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
                      Tu Progreso Real en el IES Clot del Moro
                    </h2>

                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      Todos tus puntos, notas, tareas y minutos de juego empiezan en <strong className="font-mono">0</strong>. La duración de los minijuegos se calcula automáticamente con el valor <strong className="font-mono text-amber-700 dark:text-amber-400">X = {studyRatioX}</strong> que tu madre o padre introduce con su usuario y contraseña.
                    </p>
                  </div>

                  {/* Current Tasks or Empty Zero State */}
                  {displayedTasks.length === 0 ? (
                    <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 space-y-2">
                      <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                        AGENDA DE TAREAS EN 0 · SIN ENTREGAS CARGADAS
                      </div>
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                        No hay tareas pendientes registradas todavía
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300">
                        Puedes añadir tus propias tareas divididas en micro-pasos en la pestaña <strong>Tareas y Estudio</strong> o iniciar sesión con tu usuario y contraseña de <strong>Aules GVA, Ítaca Web Familia o Google Classroom</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                        <span>
                          PRÓXIMA TAREA · {displayedTasks[0].subject} · Entrega: {displayedTasks[0].dueDate}
                        </span>
                        <span className="font-mono tabular-nums text-amber-700 dark:text-amber-400 font-semibold">
                          {displayedTasks[0].sourcePlatform}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                        {displayedTasks[0].title}
                      </h3>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('curriculum')}
                      className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      Ir a Temarios de las {FULL_SYLLABUS_SUBJECTS.length} Asignaturas
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('planner')}
                      className="px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      Añadir Tarea o Usar Pomodoro
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('analytics')}
                      className="px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      Conectar Aules / Ítaca / Classroom
                    </button>
                  </div>
                </div>

                {/* Right Column (5 cols): Active Anime Motivation & Virtual Shop Preview Card */}
                <div className="lg:col-span-5 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden flex flex-col justify-between">
                  <div className="relative">
                    <AnimeWorldIllustration worldId={selectedWorld} className="w-full h-44 rounded-none" />
                    <div className="absolute bottom-3 left-5 right-5 text-white">
                      <div className="text-xs text-stone-200">
                        <span>Tema Elegido por el Alumno</span>
                        <span aria-hidden="true"> · </span>
                        <span>{world.mangaInspiration}</span>
                      </div>
                      <h2 className="text-xl font-bold mt-0.5">{world.name}</h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                        <span>
                          Rango: <strong className="text-stone-900 dark:text-white">{currentRankTitle}</strong>
                        </span>
                        <span className="font-mono tabular-nums font-semibold text-amber-700 dark:text-amber-400">
                          {studyPoints} Puntos de Estudio (PE)
                        </span>
                      </div>

                      <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 transition-all"
                          style={{ width: `${(studyPoints % 300) / 3}%` }}
                        />
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-300 italic">
                        "{world.mentorQuote}" — <strong>{world.mentorName}</strong>
                      </p>
                    </div>

                    {/* Quick World Switcher */}
                    <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">
                        Elige el mundo anime de tus minijuegos:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {(['NARUTO', 'HEROES', 'PIRATES', 'ALCHEMIST'] as AnimeWorldId[]).map(
                          (wId) => (
                            <button
                              key={wId}
                              type="button"
                              onClick={() => setSelectedWorld(wId)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium text-left truncate border transition-colors ${
                                selectedWorld === wId
                                  ? 'bg-amber-600 text-white border-transparent font-semibold'
                                  : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                              }`}
                            >
                              {ANIME_WORLDS[wId].name}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-Width 4-Column KPI Metric Row (All starting at 0) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Puntos de Estudio Acumulados
                  </p>
                  <div className="text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-white mt-1">
                    {studyPoints} PE
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {completedCountTotal} unidades/lecciones completadas
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Tiempo de Minijuego (X = {studyRatioX})
                  </p>
                  <div className="text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-white mt-1">
                    {breakMinutes} min
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Configurado por Madre/Padre con contraseña
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Plataformas LMS Conectadas
                  </p>
                  <div className="text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-white mt-1">
                    {connectedPlatformsCount} / {platforms.length}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Aules GVA · Ítaca · Google Classroom
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Asignaturas Disponibles ({courseMeta.shortLabel})
                  </p>
                  <div className="text-2xl font-bold font-mono tabular-nums text-stone-900 dark:text-white mt-1">
                    {FULL_SYLLABUS_SUBJECTS.length} Materias
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                    Todas las asignaturas del curso visibles
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEMARIOS COMPLETOS DE TODAS LAS ASIGNATURAS Y MÓDULO INTERACTIVO */}
          {activeTab === 'curriculum' && (
            <CurriculumAndModules
              selectedCourse={selectedCourse}
              initialSubjectId={selectedSubjectForCurriculum}
              studyRatioX={studyRatioX}
              completedUnits={completedUnits}
              onCompleteLessonReward={handleCompleteLessonReward}
            />
          )}

          {/* TAB 3: TAREAS POR MICRO-PASOS Y TÉCNICAS DE ESTUDIO (POMODORO / FLASHCARDS / CORNELL) */}
          {(activeTab === 'planner' || activeTab === 'study') && (
            <div className="space-y-10">
              {/* Micro-Steps Task Planner */}
              <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Organización Ejecutiva · {courseMeta.label} · IES Clot del Moro
                    </p>
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5">
                      Desglose de Tareas en Micro-Pasos (Duración Juego = {studyRatioX} × Estudio)
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setTaskFilter('ALL')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          taskFilter === 'ALL'
                            ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        Todas ({courseTasks.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setTaskFilter('PENDING')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          taskFilter === 'PENDING'
                            ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        En progreso
                      </button>
                      <button
                        type="button"
                        onClick={() => setTaskFilter('COMPLETED')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          taskFilter === 'COMPLETED'
                            ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        Completadas
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddTaskModal((prev) => !prev)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      {showAddTaskModal ? 'Cerrar formulario' : 'Nueva Tarea Dividida'}
                    </button>
                  </div>
                </div>

                {showAddTaskModal && (
                  <form
                    onSubmit={handleAddNewTask}
                    className="p-5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                      Dividir Nueva Tarea de {courseMeta.shortLabel} en Micro-Pasos
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Título de la tarea o examen..."
                        className="sm:col-span-2 px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                      />
                      <select
                        value={newTaskSubject}
                        onChange={(e) => setNewTaskSubject(e.target.value)}
                        className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                      >
                        {FULL_SYLLABUS_SUBJECTS.map((subj) => (
                          <option key={subj.id} value={subj.name}>
                            {subj.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newTaskStep1}
                        onChange={(e) => setNewTaskStep1(e.target.value)}
                        placeholder="Micro-paso 1 (10 min): ej. Subrayar datos y preparar hoja..."
                        className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={newTaskStep2}
                        onChange={(e) => setNewTaskStep2(e.target.value)}
                        placeholder="Micro-paso 2 (15 min): ej. Resolver y entregar en Aules GVA..."
                        className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        Recompensa al completar: +120 PE · +{Math.round(25 * studyRatioX)} min de descanso Anime
                      </span>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700"
                      >
                        Guardar en Agenda
                      </button>
                    </div>
                  </form>
                )}

                {displayedTasks.length === 0 ? (
                  <div className="p-8 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-center space-y-3">
                    <p className="text-sm font-bold text-stone-900 dark:text-white">
                      0 tareas registradas en {courseMeta.shortLabel}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                      No hemos inventado tareas falsas. Pulsa <strong>"Nueva Tarea Dividida"</strong> arriba para crear tu primera tarea real o sincroniza tu cuenta de Aules GVA / Google Classroom.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayedTasks.map((task) => {
                      const completedCount = task.microSteps.filter((s) => s.completed).length;
                      const totalCount = task.microSteps.length;
                      const isAllCompleted = completedCount === totalCount;
                      const taskBreakMin = Math.round(task.studyDurationMin * studyRatioX);

                      return (
                        <div
                          key={task.id}
                          className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-800/30 space-y-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="text-xs text-stone-500 dark:text-stone-400">
                                <strong className="text-stone-800 dark:text-stone-200">{task.subject}</strong>
                                <span aria-hidden="true"> · </span>
                                <span>Origen: {task.sourcePlatform}</span>
                                <span aria-hidden="true"> · </span>
                                <span>
                                  Entrega: {task.dueDate} a las {task.dueTime}
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-stone-900 dark:text-white mt-1">
                                {task.title}
                              </h3>
                            </div>

                            <div className="text-xs font-mono tabular-nums text-right">
                              <span className="font-semibold text-amber-700 dark:text-amber-400">
                                +{task.rewardStudyPoints} PE · +{taskBreakMin} min Juego ({task.studyDurationMin}m × {studyRatioX})
                              </span>
                              <div className="text-stone-500 dark:text-stone-400 mt-0.5">
                                Progreso: {completedCount}/{totalCount} pasos (
                                {isAllCompleted ? '✓ COMPLETADA' : 'EN CURSO'})
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {task.microSteps.map((step, index) => {
                              const stepRewardMin = Math.round(step.durationMin * studyRatioX);
                              return (
                                <button
                                  key={step.id}
                                  type="button"
                                  onClick={() => handleToggleMicroStep(task.id, step.id)}
                                  className={`w-full text-left px-4 py-3 rounded-lg border flex items-center justify-between gap-4 transition-colors ${
                                    step.completed
                                      ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-stone-500 dark:text-stone-400 line-through'
                                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white hover:border-amber-500'
                                  }`}
                                >
                                  <span className="flex items-center gap-3 text-xs font-medium">
                                    {step.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                    )}
                                    <span>
                                      Paso {index + 1}: {step.title}
                                    </span>
                                  </span>
                                  <span className="text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400 shrink-0">
                                    {step.durationMin} min → +{stepRewardMin} min juego
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Pomodoro & Personalized Study Techniques */}
              <StudyStudio
                selectedCourse={selectedCourse}
                studyRatioX={studyRatioX}
                flashcards={flashcards}
                onToggleFlashcardMastered={(id) => {
                  setFlashcards((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, mastered: !c.mastered } : c))
                  );
                  setStudyPoints((sp) => sp + 20);
                  triggerToast('¡Tarjeta dominada! Has sumado +20 Puntos de Estudio (PE).');
                }}
                onAddFlashcard={(newCard) => {
                  setFlashcards((prev) => [
                    { ...newCard, id: `fc-${Date.now()}`, mastered: false },
                    ...prev,
                  ]);
                  setStudyPoints((sp) => sp + 25);
                  triggerToast('Nueva tarjeta de estudio activo añadida (+25 PE).');
                }}
                cornellNotes={cornellNotes}
                onAddCornellNote={(note) => {
                  setCornellNotes((prev) => [
                    { ...note, id: `cn-${Date.now()}`, date: 'Hoy' },
                    ...prev,
                  ]);
                  const cornellBreak = Math.round(10 * studyRatioX);
                  setStudyPoints((sp) => sp + 30);
                  setBreakMinutes((bm) => bm + cornellBreak);
                  recordStudyAndGameMinutesToday(10, cornellBreak);
                  triggerToast(
                    `Ficha Cornell guardada: +30 PE y +${cornellBreak} min de descanso Anime.`
                  );
                }}
                onCompleteFocusBlock={(minutes, pointsEarned, breakEarned) => {
                  setStudyPoints((sp) => sp + pointsEarned);
                  setBreakMinutes((bm) => bm + breakEarned);
                  recordStudyAndGameMinutesToday(minutes, breakEarned);
                  triggerToast(
                    `¡Bloque de ${minutes} min completado! Ganaste +${pointsEarned} PE y +${breakEarned} min para jugar en ${world.name} (X = ${studyRatioX}).`
                  );
                }}
              />
            </div>
          )}

          {/* TAB 4: TIENDA VIRTUAL DE PUNTOS DE ESTUDIO Y MINIJUEGOS ANIME */}
          {activeTab === 'minigames' && (
            <>
              {focusLockMode ? (
                <div className="border-2 border-amber-500/80 rounded-xl bg-white dark:bg-stone-900 p-8 text-center max-w-2xl mx-auto space-y-5">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                      MODO ENFOQUE ACTIVADO POR LA MADRE / PADRE
                    </span>
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                      Los Minijuegos están bloqueados durante el tiempo de estudio
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-stone-300">
                      Tu madre o padre ha activado el <strong>Modo Enfoque</strong> con su usuario y contraseña para ayudarte a concentrarte sin distracciones. Tus <strong>{studyPoints} PE</strong> y <strong>{breakMinutes} min</strong> siguen guardados.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('curriculum')}
                      className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                    >
                      Volver a los Temarios de Estudio
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRole('PARENT');
                        setActiveTab('analytics');
                      }}
                      className="px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200"
                    >
                      Desbloquear (Acceso Madre / Padre)
                    </button>
                  </div>
                </div>
              ) : (
                <AnimeMiniGames
                  selectedWorld={selectedWorld}
                  onSelectWorld={setSelectedWorld}
                  studyPoints={studyPoints}
                  studyRatioX={studyRatioX}
                  breakMinutes={breakMinutes}
                  onConsumeBreakMinute={(used) =>
                    setBreakMinutes((prev) => Math.max(0, prev - used))
                  }
                  onEarnBonusPoints={(pts, reason) => {
                    setStudyPoints((prev) => prev + pts);
                    triggerToast(`¡Logro en Minijuego! +${pts} Puntos de Estudio (${reason})`);
                  }}
                  shopItems={shopItems}
                  onRedeemShopItem={handleRedeemShopItem}
                />
              )}
            </>
          )}

          {/* TAB 5: ACCESO MADRE/PADRE CON USUARIO Y CONTRASEÑA, LMS CON LOGIN Y DESPLIEGUE */}
          {activeTab === 'analytics' && (
            <AnalyticsAndFamily
              selectedCourse={selectedCourse}
              studyPoints={studyPoints}
              parentCredentials={parentCredentials}
              isParentAuthenticated={isParentAuthenticated}
              onConfigureParentCredentials={(username, password) => {
                setParentCredentials({ username, password });
                setIsParentAuthenticated(true);
                soundFX.playStepComplete();
                triggerToast(`Cuenta parental creada para "${username}". Sesión iniciada.`);
              }}
              onLoginParent={(username, password) => {
                if (
                  parentCredentials &&
                  parentCredentials.username.toLowerCase() === username.toLowerCase() &&
                  parentCredentials.password === password
                ) {
                  setIsParentAuthenticated(true);
                  soundFX.playStepComplete();
                  triggerToast(`Bienvenida/o, ${parentCredentials.username}. Controles parentales desbloqueados.`);
                  return true;
                }
                return false;
              }}
              onLogoutParent={() => {
                setIsParentAuthenticated(false);
                triggerToast('Sesión parental cerrada y controles bloqueados.');
              }}
              studyRatioX={studyRatioX}
              onChangeStudyRatioX={(newX) => {
                if (!isParentAuthenticated) return;
                setStudyRatioX(newX);
                triggerToast(
                  `Multiplicador familiar actualizado por Madre/Padre: Duración Juego = ${newX} × Tiempo de Estudio.`
                );
              }}
              distractionFreeMode={distractionFreeMode}
              onToggleDistractionFree={() => {
                if (!isParentAuthenticated) return;
                setDistractionFreeMode((prev) => !prev);
                triggerToast('Modo Sin Distracciones actualizado por Madre/Padre.');
              }}
              focusLockMode={focusLockMode}
              onToggleFocusLockMode={() => {
                if (!isParentAuthenticated) return;
                setFocusLockMode((prev) => !prev);
                triggerToast('Modo Enfoque (bloqueo de minijuegos) actualizado por Madre/Padre.');
              }}
              weeklyMetrics={weeklyMetrics}
              subjectGrades={subjectGrades}
              onUpdateSubjectGrade={(subjectName, eval1, eval2, currentEval) => {
                setSubjectGrades((prev) =>
                  prev.map((sg) => {
                    if (sg.subject !== subjectName) return sg;
                    return {
                      ...sg,
                      eval1,
                      eval2,
                      currentEval,
                      tasksCompleted:
                        (eval1 !== null ? 1 : 0) +
                        (eval2 !== null ? 1 : 0) +
                        (currentEval !== null ? 1 : 0),
                      tasksTotal: 3,
                    };
                  })
                );
                triggerToast(`Calificaciones de ${subjectName} actualizadas.`);
              }}
              platforms={platforms}
              onConnectPlatformWithCredentials={handleConnectPlatformWithCredentials}
              onDisconnectPlatform={handleDisconnectPlatform}
              parentRewards={parentRewards}
              onClaimParentReward={(rewardId) => {
                const target = parentRewards.find((r) => r.id === rewardId);
                if (!target || target.claimed || studyPoints < target.xpCost) return;
                setStudyPoints((sp) => sp - target.xpCost);
                setParentRewards((prev) =>
                  prev.map((r) => (r.id === rewardId ? { ...r, claimed: true } : r))
                );
                triggerToast(`¡Recompensa familiar "${target.title}" canjeada con éxito!`);
              }}
              onAddParentReward={(title, xpCost) => {
                setParentRewards((prev) => [
                  ...prev,
                  {
                    id: `pr-${Date.now()}`,
                    title,
                    xpCost,
                    agreedBy: 'Pacto Familiar IES Clot del Moro',
                    claimed: false,
                  },
                ]);
                triggerToast('Nueva meta de recompensa familiar registrada.');
              }}
              teacherAdaptations={teacherAdaptations}
              onToggleTeacherAdaptation={(id) =>
                setTeacherAdaptations((prev) =>
                  prev.map((item) =>
                    item.id === id
                      ? { ...item, appliedInStudentProfile: !item.appliedInStudentProfile }
                      : item
                  )
                )
              }
              onResetAllDataToZero={handleResetAllDataToZero}
            />
          )}
        </main>

        {/* Quiet Institutional Footer */}
        <footer className="border-t border-stone-200 dark:border-stone-800 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
            <span>
              ClotFocus · Programa de Inclusión y Apoyo al Alumnado con TDAH (1º ESO a 2º Bachillerato) · IES Clot del Moro, Algímia d'Alfara
            </span>
            <span>
              10 Asignaturas Completas · Control Parental con Contraseña · Listo para GitHub y Vercel
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
