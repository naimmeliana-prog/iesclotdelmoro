export type CourseGrade = '1ESO' | '2ESO' | '3ESO' | '4ESO' | '1BACH' | '2BACH';

export type UserRole = 'STUDENT' | 'PARENT' | 'TEACHER';

export type AnimeWorldId = 'NARUTO' | 'HEROES' | 'PIRATES' | 'ALCHEMIST';

export type ActiveTab = 'dashboard' | 'curriculum' | 'planner' | 'minigames' | 'analytics';

export interface MicroStep {
  id: string;
  title: string;
  durationMin: number;
  completed: boolean;
}

export interface SchoolTask {
  id: string;
  title: string;
  subject: string;
  course: CourseGrade;
  dueDate: string;
  dueTime: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  sourcePlatform: 'Aules GVA' | 'Ítaca Web Familia' | 'Google Classroom' | 'Manual';
  microSteps: MicroStep[];
  studyDurationMin: number;
  rewardStudyPoints: number;
  teacherTip: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveLesson {
  id: string;
  number: number;
  title: string;
  durationMin: number;
  studyPointsReward: number;
  coreRuleTitle: string;
  coreRuleSummary: string;
  visualSteps: {
    stepNumber: number;
    label: string;
    formulaOrVisual: string;
    tip: string;
  }[];
  practicalExample: {
    scenario: string;
    problemStatement: string;
    guidedSteps: string[];
    finalResult: string;
  };
  quiz: QuizQuestion[];
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  summary: string;
  durationMin: number;
  studyPoints: number;
  keyConcepts: string[];
  visualScheme: { heading: string; detail: string }[];
  practicalExample: string;
  quickQuiz: QuizQuestion[];
}

export interface SyllabusSubject {
  id: string;
  name: string;
  shortCode: string;
  courses: CourseGrade[];
  description: string;
  totalUnits: number;
  units: SyllabusUnit[];
  interactiveModule?: InteractiveLesson[];
}

export interface VirtualShopItem {
  id: string;
  title: string;
  animeTheme: AnimeWorldId;
  animeLabel: string;
  category: 'PASE_MINIJUEGO' | 'MEJORA_AVATAR' | 'CARTA_ESPECIAL';
  costPoints: number;
  minutesIncluded: number;
  description: string;
  unlocked: boolean;
}

export interface FlashcardItem {
  id: string;
  course: CourseGrade;
  subject: string;
  question: string;
  answer: string;
  mnemonicHint: string;
  mastered: boolean;
}

export interface MindMapNode {
  id: string;
  label: string;
  category: 'CENTRAL' | 'RAMA' | 'DETALLE';
  notes: string;
}

export interface CornellNote {
  id: string;
  subject: string;
  course: CourseGrade;
  topic: string;
  date: string;
  cues: string[];
  notes: string;
  summary: string;
}

export interface AnimeCardItem {
  id: string;
  name: string;
  type: 'ATAQUE' | 'DEFENSA' | 'ENFOQUE';
  power: number;
  description: string;
  symbol: string;
}

export interface AnimeWorldConfig {
  id: AnimeWorldId;
  name: string;
  mangaInspiration: string;
  tagline: string;
  mentorName: string;
  mentorRole: string;
  mentorQuote: string;
  energyName: string;
  rankTitles: string[];
  accentHex: string;
  memorySymbols: { code: string; label: string; powerText: string }[];
  targetItemName: string;
  decoyItemName: string;
  battleCards: AnimeCardItem[];
  rivalName: string;
  rivalTitle: string;
}

export interface SchoolPlatformSync {
  id: string;
  name: 'Aules GVA' | 'Ítaca Web Familia' | 'Google Classroom';
  institution: string;
  protocol: string;
  loginLabel: string;
  loginPlaceholder: string;
  connected: boolean;
  usernameLogged: string;
  lastSync: string;
  syncedTasksCount: number;
  syncedGradesCount: number;
  autoSyncEnabled: boolean;
  statusText: string;
}

export interface LmsTechnicalStep {
  stepNumber: string;
  title: string;
  protocolOrTech: string;
  direction: 'LMS → ClotFocus' | 'ClotFocus → LMS' | 'Bidireccional';
  description: string;
  endpointOrStandard: string;
}

export interface SubjectGradeMetric {
  subject: string;
  course: CourseGrade;
  eval1: number | null;
  eval2: number | null;
  currentEval: number | null;
  tasksCompleted: number;
  tasksTotal: number;
  teacherComment: string;
}

export interface WeeklyStudyMetric {
  day: string;
  shortDay: string;
  focusMinutes: number;
  targetMinutes: number;
  microStepsDone: number;
  breakMinutesUsed: number;
}

export interface ParentHomeReward {
  id: string;
  title: string;
  xpCost: number;
  agreedBy: string;
  claimed: boolean;
}

export interface TeacherAdaptationGuide {
  id: string;
  stage: '1º y 2º ESO' | '3º y 4º ESO' | '1º y 2º Bachillerato';
  category: 'Aula y Entorno' | 'Evaluación Adaptada' | 'Función Ejecutiva' | 'Motivación y Autonomía';
  title: string;
  description: string;
  appliedInStudentProfile: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timeLabel: string;
  category: 'ENTREGA' | 'CALENDARIO' | 'LOGRO' | 'SINCRONIZACIÓN';
  read: boolean;
  urgent: boolean;
}

export interface ParentalControlSettings {
  username: string;
  passwordHash: string;
  isConfigured: boolean;
  studyRatioX: number;
  forceDistractionFree: boolean;
  forceFocusMode: boolean;
}
