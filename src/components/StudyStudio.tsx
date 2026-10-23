import React, { useState, useEffect, useRef } from 'react';
import { COURSE_METADATA } from '../data/clotDelMoroData';
import { CornellNote, CourseGrade, FlashcardItem, MindMapNode } from '../types';
import { soundFX } from '../utils/sound';
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Mic,
  MicOff,
  Pause,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Sparkles,
  Square,
  Trash2,
  Volume2,
} from 'lucide-react';

interface StudyStudioProps {
  selectedCourse: CourseGrade;
  studyRatioX: number;
  flashcards: FlashcardItem[];
  onToggleFlashcardMastered: (id: string) => void;
  onAddFlashcard: (card: Omit<FlashcardItem, 'id' | 'mastered'>) => void;
  cornellNotes: CornellNote[];
  onAddCornellNote: (note: Omit<CornellNote, 'id' | 'date'>) => void;
  onCompleteFocusBlock: (minutes: number, studyPointsEarned: number, breakEarned: number) => void;
}

type TechniqueMode = 'FLASHCARDS' | 'MINDMAP' | 'CORNELL' | 'FEYNMAN';

export const StudyStudio: React.FC<StudyStudioProps> = ({
  selectedCourse,
  studyRatioX,
  flashcards,
  onToggleFlashcardMastered,
  onAddFlashcard,
  cornellNotes,
  onAddCornellNote,
  onCompleteFocusBlock,
}) => {
  const courseMeta = COURSE_METADATA[selectedCourse];
  const [techniqueMode, setTechniqueMode] = useState<TechniqueMode>('FLASHCARDS');

  // --- POMODORO TIMER STATE ---
  const [focusDurationMin, setFocusDurationMin] = useState<number>(courseMeta.recommendedFocusMin);
  const [secondsLeft, setSecondsLeft] = useState<number>(courseMeta.recommendedFocusMin * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pomodoroGoal, setPomodoroGoal] = useState<string>(
    'Repasar vocabulario y esquema del tema actual'
  );

  // Dynamic break calculation using parental multiplier X
  const earnedBreakFromX = Math.max(1, Math.round(focusDurationMin * studyRatioX));

  useEffect(() => {
    setFocusDurationMin(courseMeta.recommendedFocusMin);
    setSecondsLeft(courseMeta.recommendedFocusMin * 60);
    setIsRunning(false);
  }, [selectedCourse, courseMeta.recommendedFocusMin]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          soundFX.playRewardUnlock();
          onCompleteFocusBlock(
            focusDurationMin,
            focusDurationMin * 8,
            Math.max(1, Math.round(focusDurationMin * studyRatioX))
          );
          return focusDurationMin * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning, focusDurationMin, studyRatioX, onCompleteFocusBlock]);

  const handleDurationPreset = (minutes: number) => {
    setIsRunning(false);
    setFocusDurationMin(minutes);
    setSecondsLeft(minutes * 60);
  };

  const handleFinishSprintNow = () => {
    setIsRunning(false);
    soundFX.playRewardUnlock();
    onCompleteFocusBlock(focusDurationMin, focusDurationMin * 8, earnedBreakFromX);
    setSecondsLeft(focusDurationMin * 60);
  };

  // --- FLASHCARDS STATE ---
  const courseCards = flashcards.filter((c) => c.course === selectedCourse);
  const activeDeck = courseCards.length > 0 ? courseCards : flashcards;
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showNewCardForm, setShowNewCardForm] = useState<boolean>(false);
  const [newCardSubject, setNewCardSubject] = useState<string>('Biología y Geología');
  const [newCardQuestion, setNewCardQuestion] = useState<string>('');
  const [newCardAnswer, setNewCardAnswer] = useState<string>('');
  const [newCardHint, setNewCardHint] = useState<string>('');

  const safeCardIndex = activeDeck.length > 0 ? cardIndex % activeDeck.length : 0;
  const currentCard = activeDeck[safeCardIndex];

  // --- AUDIO & MICROPHONE RECORDING (ACTIVE RECALL & VOCAL REHEARSAL) ---
  interface CardAudioRecord {
    audioUrl: string;
    transcript: string;
    durationSec: number;
    recordedAt: number;
    awarded: boolean;
  }

  const [cardAudioRecords, setCardAudioRecords] = useState<Record<string, CardAudioRecord>>({});
  const [isRecordingCardVoice, setIsRecordingCardVoice] = useState<boolean>(false);
  const [recordingCardSeconds, setRecordingCardSeconds] = useState<number>(0);
  const [liveCardTranscript, setLiveCardTranscript] = useState<string>('');
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);

  const cardMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const cardStreamRef = useRef<MediaStream | null>(null);
  const cardSpeechRecRef = useRef<any | null>(null);
  const cardTimerIntervalRef = useRef<any | null>(null);
  const createdObjectUrlsRef = useRef<string[]>([]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      createdObjectUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
      if (cardStreamRef.current) {
        try {
          cardStreamRef.current.getTracks().forEach((track) => track.stop());
        } catch {}
      }
      if (cardSpeechRecRef.current) {
        try {
          cardSpeechRecRef.current.stop();
        } catch {}
      }
      if (cardTimerIntervalRef.current) {
        clearInterval(cardTimerIntervalRef.current);
      }
      if (feynmanStreamRef.current) {
        try {
          feynmanStreamRef.current.getTracks().forEach((track) => track.stop());
        } catch {}
      }
      if (feynmanSpeechRecRef.current) {
        try {
          feynmanSpeechRecRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const revokeUrl = (url: string) => {
    try {
      URL.revokeObjectURL(url);
    } catch {}
    createdObjectUrlsRef.current = createdObjectUrlsRef.current.filter((u) => u !== url);
  };

  const startCardRecording = async (cardId: string) => {
    setMicPermissionError(null);
    setLiveCardTranscript('');
    setRecordingCardSeconds(0);

    if (
      typeof window === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setMicPermissionError(
        'Tu navegador no tiene activado el soporte para captura directa de micrófono. Prueba con Chrome, Edge o Safari.'
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      cardStreamRef.current = stream;

      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
        '',
      ];
      let chosenMime = '';
      for (const mt of mimeTypes) {
        if (
          !mt ||
          (typeof MediaRecorder !== 'undefined' &&
            MediaRecorder.isTypeSupported &&
            MediaRecorder.isTypeSupported(mt))
        ) {
          chosenMime = mt;
          break;
        }
      }

      const recorder = chosenMime
        ? new MediaRecorder(stream, { mimeType: chosenMime })
        : new MediaRecorder(stream);
      cardMediaRecorderRef.current = recorder;
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: chosenMime || 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        createdObjectUrlsRef.current.push(audioUrl);

        let finalTranscript = '';
        setLiveCardTranscript((cur) => {
          finalTranscript = cur.trim();
          return cur;
        });

        setCardAudioRecords((prev) => {
          if (prev[cardId]?.audioUrl) {
            revokeUrl(prev[cardId].audioUrl);
          }
          const alreadyAwarded = prev[cardId]?.awarded;
          if (!alreadyAwarded) {
            soundFX.playRewardUnlock();
            const bonusBreak = Math.max(1, Math.round(2 * studyRatioX));
            onCompleteFocusBlock(2, 15, bonusBreak);
          } else {
            soundFX.playStepComplete();
          }
          return {
            ...prev,
            [cardId]: {
              audioUrl,
              transcript:
                finalTranscript || 'Respuesta oral registrada correctamente con micrófono.',
              durationSec: recordingCardSeconds || 1,
              recordedAt: Date.now(),
              awarded: true,
            },
          };
        });
      };

      recorder.start(250);
      setIsRecordingCardVoice(true);

      let elapsed = 0;
      cardTimerIntervalRef.current = setInterval(() => {
        elapsed += 1;
        setRecordingCardSeconds(elapsed);
        if (elapsed >= 90) {
          stopCardRecording(cardId);
        }
      }, 1000);

      // Web Speech API for real-time transcription
      const SpeechRecClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecClass) {
        try {
          const rec = new SpeechRecClass();
          rec.lang = 'es-ES';
          rec.continuous = true;
          rec.interimResults = true;
          rec.onresult = (evt: any) => {
            let spoken = '';
            for (let i = 0; i < evt.results.length; i++) {
              spoken += evt.results[i][0].transcript + ' ';
            }
            setLiveCardTranscript(spoken.trim());
          };
          rec.onerror = () => {};
          rec.start();
          cardSpeechRecRef.current = rec;
        } catch (e) {
          console.warn('SpeechRecognition not started', e);
        }
      }
    } catch (err: any) {
      console.error('Microphone access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicPermissionError(
          'Permiso de micrófono denegado en tu navegador. Haz clic en el icono del candado o configuración junto a la barra de direcciones y selecciona "Permitir micrófono".'
        );
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setMicPermissionError(
          'No se encontró ningún micrófono conectado. Conecta un micrófono o auriculares con micro para practicar en voz alta.'
        );
      } else {
        setMicPermissionError(
          `No se pudo iniciar el micrófono: ${err.message || 'Comprueba los permisos de audio en tu sistema operativo.'}`
        );
      }
      setIsRecordingCardVoice(false);
    }
  };

  const stopCardRecording = (_cardId: string) => {
    setIsRecordingCardVoice(false);

    if (cardTimerIntervalRef.current) {
      clearInterval(cardTimerIntervalRef.current);
      cardTimerIntervalRef.current = null;
    }

    if (cardSpeechRecRef.current) {
      try {
        cardSpeechRecRef.current.stop();
      } catch {}
      cardSpeechRecRef.current = null;
    }

    if (cardMediaRecorderRef.current && cardMediaRecorderRef.current.state !== 'inactive') {
      try {
        cardMediaRecorderRef.current.stop();
      } catch {}
    }

    if (cardStreamRef.current) {
      try {
        cardStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch {}
      cardStreamRef.current = null;
    }
  };

  const discardCardAudio = (cardId: string) => {
    setCardAudioRecords((prev) => {
      if (prev[cardId]?.audioUrl) {
        revokeUrl(prev[cardId].audioUrl);
      }
      const copy = { ...prev };
      delete copy[cardId];
      return copy;
    });
  };

  // --- FEYNMAN VOICE DICTATION & RECORDING ---
  const [isRecordingFeynman, setIsRecordingFeynman] = useState<boolean>(false);
  const [feynmanAudioUrl, setFeynmanAudioUrl] = useState<string | null>(null);
  const [feynmanMicError, setFeynmanMicError] = useState<string | null>(null);
  const feynmanStreamRef = useRef<MediaStream | null>(null);
  const feynmanMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const feynmanSpeechRecRef = useRef<any | null>(null);

  const startFeynmanRecording = async () => {
    setFeynmanMicError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setFeynmanMicError('Navegador sin soporte para micrófono.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      feynmanStreamRef.current = stream;
      const chunks: BlobPart[] = [];
      const recorder = new MediaRecorder(stream);
      feynmanMediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        createdObjectUrlsRef.current.push(url);
        setFeynmanAudioUrl(url);
        soundFX.playStepComplete();
      };

      recorder.start(250);
      setIsRecordingFeynman(true);

      const SpeechRecClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecClass) {
        try {
          const recognition = new SpeechRecClass();
          recognition.lang = 'es-ES';
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event: any) => {
            let spoken = '';
            for (let i = 0; i < event.results.length; i++) {
              spoken += event.results[i][0].transcript + ' ';
            }
            if (spoken.trim()) {
              setFeynmanSimpleExplanation(spoken.trim());
            }
          };
          recognition.start();
          feynmanSpeechRecRef.current = recognition;
        } catch {}
      }
    } catch (err: any) {
      setFeynmanMicError('Permiso de micrófono no otorgado en el navegador.');
      setIsRecordingFeynman(false);
    }
  };

  const stopFeynmanRecording = () => {
    setIsRecordingFeynman(false);
    if (feynmanSpeechRecRef.current) {
      try {
        feynmanSpeechRecRef.current.stop();
      } catch {}
      feynmanSpeechRecRef.current = null;
    }
    if (feynmanMediaRecorderRef.current && feynmanMediaRecorderRef.current.state !== 'inactive') {
      try {
        feynmanMediaRecorderRef.current.stop();
      } catch {}
    }
    if (feynmanStreamRef.current) {
      try {
        feynmanStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch {}
      feynmanStreamRef.current = null;
    }
  };

  const handleCreateFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardQuestion.trim() || !newCardAnswer.trim()) return;
    onAddFlashcard({
      course: selectedCourse,
      subject: newCardSubject.trim() || 'General',
      question: newCardQuestion.trim(),
      answer: newCardAnswer.trim(),
      mnemonicHint: newCardHint.trim() || 'Asocia el concepto con una imagen mental clara.',
    });
    setNewCardQuestion('');
    setNewCardAnswer('');
    setNewCardHint('');
    setShowNewCardForm(false);
    soundFX.playStepComplete();
  };

  // --- MIND MAP STATE ---
  const [centralTopic, setCentralTopic] = useState<string>('La Célula Eucariota (1º ESO)');
  const [mindNodes, setMindNodes] = useState<MindMapNode[]>([
    {
      id: 'mm-1',
      label: 'Membrana Plasmática',
      category: 'RAMA',
      notes: 'Regula qué sustancias entran y salen',
    },
    {
      id: 'mm-2',
      label: 'Núcleo Celular',
      category: 'RAMA',
      notes: 'Protege el ADN (Material Genético)',
    },
    {
      id: 'mm-3',
      label: 'Mitocondrias',
      category: 'RAMA',
      notes: 'Producen energía mediante respiración celular',
    },
    {
      id: 'mm-4',
      label: 'Cloroplastos (Vegetal)',
      category: 'DETALLE',
      notes: 'Realizan la fotosíntesis con luz solar',
    },
  ]);
  const [newNodeLabel, setNewNodeLabel] = useState<string>('');
  const [newNodeNotes, setNewNodeNotes] = useState<string>('');

  const handleAddMindNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeLabel.trim()) return;
    setMindNodes((prev) => [
      ...prev,
      {
        id: `mm-${Date.now()}`,
        label: newNodeLabel.trim(),
        category: 'RAMA',
        notes: newNodeNotes.trim() || 'Idea clave conectada al núcleo del tema',
      },
    ]);
    setNewNodeLabel('');
    setNewNodeNotes('');
    soundFX.playStepComplete();
  };

  // --- CORNELL METHOD STATE ---
  const [cornellSubject, setCornellSubject] = useState<string>('Geografía e Historia');
  const [cornellTopic, setCornellTopic] = useState<string>('');
  const [cornellCuesText, setCornellCuesText] = useState<string>('');
  const [cornellBodyText, setCornellBodyText] = useState<string>('');
  const [cornellSummaryText, setCornellSummaryText] = useState<string>('');

  const handleSaveCornell = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cornellTopic.trim() || !cornellBodyText.trim()) return;
    onAddCornellNote({
      subject: cornellSubject,
      course: selectedCourse,
      topic: cornellTopic.trim(),
      cues: cornellCuesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      notes: cornellBodyText.trim(),
      summary: cornellSummaryText.trim() || 'Síntesis revisada para repaso de examen.',
    });
    setCornellTopic('');
    setCornellCuesText('');
    setCornellBodyText('');
    setCornellSummaryText('');
    soundFX.playRewardUnlock();
  };

  // --- FEYNMAN TECHNIQUE STATE ---
  const [feynmanConcept, setFeynmanConcept] = useState<string>('Fracciones Equivalentes y m.c.m.');
  const [feynmanSimpleExplanation, setFeynmanSimpleExplanation] = useState<string>(
    'Dos fracciones son equivalentes cuando representan el mismo trozo de pizza aunque esté cortada en más porciones.'
  );
  const [feynmanAnalogy, setFeynmanAnalogy] = useState<string>(
    'Es como cambiar 1 moneda de 2 euros por 4 monedas de 50 céntimos: tienes exactamente el mismo valor.'
  );
  const [feynmanVerified, setFeynmanVerified] = useState<boolean>(false);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPct = Math.min(
    100,
    Math.max(0, ((focusDurationMin * 60 - secondsLeft) / (focusDurationMin * 60)) * 100)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT ZONE (5 cols): ADHD Adaptive Pomodoro Timer with Parental X Ratio */}
      <div className="lg:col-span-5 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Temporizador sin Distracciones · {courseMeta.label}
          </p>
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-1">
            Bloque de Enfoque Guiado (Factor Familiar X = {studyRatioX})
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
            Cada bloque de <strong className="font-mono">{focusDurationMin} min</strong> te otorga{' '}
            <strong className="font-mono text-amber-700 dark:text-amber-400">
              {earnedBreakFromX} min
            </strong>{' '}
            de minijuego anime según el acuerdo con tu madre/padre ({focusDurationMin} × {studyRatioX}).
          </p>
        </div>

        {/* Duration Selector */}
        <div>
          <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-2">
            Duración del bloque de estudio (min):
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[15, 20, 25, 35].map((min) => (
              <button
                key={min}
                type="button"
                onClick={() => handleDurationPreset(min)}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold border transition-colors whitespace-nowrap ${
                  focusDurationMin === min
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                {min} min
              </button>
            ))}
          </div>
        </div>

        {/* Single Clear Objective Input */}
        <div>
          <label
            htmlFor="pomodoro-goal"
            className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1.5"
          >
            Única meta para este bloque (evita la multitarea):
          </label>
          <input
            id="pomodoro-goal"
            type="text"
            value={pomodoroGoal}
            onChange={(e) => setPomodoroGoal(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Visual Timer Readout */}
        <div className="p-6 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 text-center space-y-4">
          <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            ESTADO: {isRunning ? '● ENFOQUE ACTIVO' : '○ EN PAUSA / LISTO'}
          </div>
          <div className="text-5xl font-bold font-mono tabular-nums tracking-tight text-stone-900 dark:text-white">
            {formatTimer(secondsLeft)}
          </div>
          <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 font-mono tabular-nums">
            Recompensa: +{focusDurationMin * 8} PE · +{earnedBreakFromX} min Minijuego ({focusDurationMin}m × {studyRatioX})
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsRunning((prev) => !prev);
              soundFX.playStepComplete();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pausar bloque' : 'Iniciar bloque'}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(focusDurationMin * 60);
            }}
            className="py-2.5 px-3.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            ¿Ya terminaste el bloque antes de tiempo?
          </span>
          <button
            type="button"
            onClick={handleFinishSprintNow}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline whitespace-nowrap shrink-0"
          >
            Validar bloque (+{earnedBreakFromX} min juego) →
          </button>
        </div>
      </div>

      {/* RIGHT ZONE (7 cols): Interactive Study Techniques */}
      <div className="lg:col-span-7 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Aprendizaje Activo Multicanal · Adaptado a {courseMeta.label}
            </p>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5">
              Técnicas de Estudio Personalizadas TDAH
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
            <button
              type="button"
              onClick={() => setTechniqueMode('FLASHCARDS')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                techniqueMode === 'FLASHCARDS'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              Flashcards
            </button>
            <button
              type="button"
              onClick={() => setTechniqueMode('MINDMAP')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                techniqueMode === 'MINDMAP'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              Mapa Visual
            </button>
            <button
              type="button"
              onClick={() => setTechniqueMode('CORNELL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                techniqueMode === 'CORNELL'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              Método Cornell
            </button>
            <button
              type="button"
              onClick={() => setTechniqueMode('FEYNMAN')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                techniqueMode === 'FEYNMAN'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              Técnica Feynman
            </button>
          </div>
        </div>

        {/* TECHNIQUE 1: ACTIVE RECALL FLASHCARDS */}
        {techniqueMode === 'FLASHCARDS' && currentCard && (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>
                Asignatura: <strong className="text-stone-800 dark:text-stone-200">{currentCard.subject}</strong>
                <span aria-hidden="true"> · </span>
                Tarjeta <span className="font-mono tabular-nums">{safeCardIndex + 1}</span> de{' '}
                <span className="font-mono tabular-nums">{activeDeck.length}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowNewCardForm((prev) => !prev)}
                className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold hover:underline whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                {showNewCardForm ? 'Cerrar formulario' : 'Crear tarjeta propia'}
              </button>
            </div>

            {showNewCardForm && (
              <form
                onSubmit={handleCreateFlashcard}
                className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newCardSubject}
                    onChange={(e) => setNewCardSubject(e.target.value)}
                    placeholder="Asignatura (ej. Biología)"
                    className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={newCardHint}
                    onChange={(e) => setNewCardHint(e.target.value)}
                    placeholder="Regla mnemotécnica o pista visual"
                    className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  required
                  value={newCardQuestion}
                  onChange={(e) => setNewCardQuestion(e.target.value)}
                  placeholder="Pregunta clave de examen..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                />
                <textarea
                  rows={2}
                  required
                  value={newCardAnswer}
                  onChange={(e) => setNewCardAnswer(e.target.value)}
                  placeholder="Respuesta clara y directa (máximo 2 frases)..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors"
                >
                  Guardar Tarjeta en mi Mazo
                </button>
              </form>
            )}

            {(() => {
              const currentCardRecord = cardAudioRecords[currentCard.id];
              return (
                <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-semibold">{showAnswer ? 'RESPUESTA EXPLICADA' : 'PREGUNTA DE AUTOEVALUACIÓN'}</span>
                    <span>{currentCard.mastered ? '✓ Dominada' : '○ En repaso'}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-snug">
                    {currentCard.question}
                  </h3>

                  {/* VOICE RECORDING & ACTIVE RECALL ZONE */}
                  <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800/70 bg-amber-50/90 dark:bg-amber-950/30 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 rounded-lg bg-amber-500 text-stone-950 shrink-0 mt-0.5 shadow-xs">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                              Respuesta en Voz Alta (Recuerdo Activo TDAH)
                            </h4>
                            {currentCardRecord?.awarded ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                                <Sparkles className="w-3 h-3" />
                                +15 PE Ganados
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200">
                                +15 PE por ensayar oralmente
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                            Intenta responder en voz alta antes de descubrir la solución (fija el recuerdo en tu memoria auditiva y reduce la impulsividad).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* State A: Idle - Ready to record */}
                    {!isRecordingCardVoice && !currentCardRecord?.audioUrl && (
                      <div className="pt-1 space-y-2">
                        <button
                          type="button"
                          onClick={() => startCardRecording(currentCard.id)}
                          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-stone-950 font-bold text-xs sm:text-sm shadow-sm transition-all"
                        >
                          <Mic className="w-4 h-4 text-stone-950 shrink-0" />
                          <span>Activar Micrófono y Responder en Voz Alta (+15 PE)</span>
                        </button>
                        <p className="text-[11px] text-center text-stone-500 dark:text-stone-400">
                          Pulsar activará tu micrófono para que grabes tu propia explicación antes de dar vuelta a la tarjeta.
                        </p>
                      </div>
                    )}

                    {/* State B: Recording in progress */}
                    {isRecordingCardVoice && (
                      <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                            </span>
                            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wide">
                              Grabando tu respuesta oral...
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-300 tabular-nums">
                            {String(Math.floor(recordingCardSeconds / 60)).padStart(2, '0')}:
                            {String(recordingCardSeconds % 60).padStart(2, '0')} / 01:30
                          </span>
                        </div>

                        {/* Live voice transcription */}
                        <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-900/40 text-xs">
                          <span className="text-stone-400 dark:text-stone-500 text-[10px] block uppercase font-mono mb-1">
                            Transcripción en vivo:
                          </span>
                          <p className="italic text-stone-800 dark:text-stone-200">
                            {liveCardTranscript || 'Escuchando tu voz... di tu respuesta en voz alta con tranquilidad...'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => stopCardRecording(currentCard.id)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Detener Grabación y Guardar Audio (+15 PE)</span>
                        </button>
                      </div>
                    )}

                    {/* State C: Audio Recorded */}
                    {!isRecordingCardVoice && currentCardRecord?.audioUrl && (
                      <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-800 space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Tu respuesta oral registrada
                          </span>
                          <span className="text-stone-500 dark:text-stone-400 font-mono text-[11px]">
                            {currentCardRecord.durationSec}s de audio
                          </span>
                        </div>

                        <audio
                          controls
                          src={currentCardRecord.audioUrl}
                          className="w-full h-9 rounded"
                        />

                        {currentCardRecord.transcript && (
                          <div className="text-xs bg-stone-50 dark:bg-stone-800/70 p-2.5 rounded-lg border border-stone-200 dark:border-stone-700">
                            <span className="text-stone-500 dark:text-stone-400 text-[10px] uppercase font-mono block mb-0.5">
                              Lo que dijiste en voz alta:
                            </span>
                            <p className="text-stone-900 dark:text-stone-100 italic">
                              "{currentCardRecord.transcript}"
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            onClick={() => startCardRecording(currentCard.id)}
                            className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Volver a grabar
                          </button>
                          <button
                            type="button"
                            onClick={() => discardCardAudio(currentCard.id)}
                            className="flex items-center gap-1 text-xs text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Descartar
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Microphone Error Alert */}
                    {micPermissionError && (
                      <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                        <div>
                          <p className="font-semibold">Atención con el micrófono:</p>
                          <p className="mt-0.5 leading-relaxed">{micPermissionError}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {showAnswer ? (
                    <div className="pt-3 border-t border-stone-200 dark:border-stone-700 space-y-3">
                      <p className="text-sm text-stone-800 dark:text-stone-100 leading-relaxed font-medium">
                        {currentCard.answer}
                      </p>
                      <p className="text-xs text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 shrink-0" />
                        <span>{currentCard.mnemonicHint}</span>
                      </p>
                    </div>
                  ) : null}

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAnswer((prev) => !prev)}
                      className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                    >
                      {showAnswer ? 'Ocultar respuesta' : 'Mostrar respuesta y truco visual'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onToggleFlashcardMastered(currentCard.id);
                        soundFX.playStepComplete();
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      {currentCard.mastered ? 'Marcada como dominada' : 'Marcar como dominada (+20 PE)'}
                    </button>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (isRecordingCardVoice) stopCardRecording(currentCard.id);
                  setShowAnswer(false);
                  setCardIndex((prev) => (prev - 1 + activeDeck.length) % activeDeck.length);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 whitespace-nowrap shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isRecordingCardVoice) stopCardRecording(currentCard.id);
                  setShowAnswer(false);
                  setCardIndex((prev) => (prev + 1) % activeDeck.length);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 whitespace-nowrap shrink-0"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TECHNIQUE 2: VISUAL MIND MAP BUILDER */}
        {techniqueMode === 'MINDMAP' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label
                htmlFor="central-node-input"
                className="text-xs font-medium text-stone-600 dark:text-stone-300 whitespace-nowrap"
              >
                Tema Central del Esquema:
              </label>
              <input
                id="central-node-input"
                type="text"
                value={centralTopic}
                onChange={(e) => setCentralTopic(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm font-semibold rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
              />
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/40 space-y-5">
              <div className="mx-auto max-w-xs p-3.5 rounded-xl bg-amber-600 text-white text-center shadow-xs">
                <div className="text-[11px] font-mono opacity-85">NÚCLEO CENTRAL</div>
                <div className="text-sm font-bold mt-0.5">{centralTopic}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mindNodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono">
                        <span>RAMA 0{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => setMindNodes((prev) => prev.filter((n) => n.id !== node.id))}
                          className="text-stone-400 hover:text-rose-600"
                        >
                          Quitar
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-white mt-1">{node.label}</h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{node.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddMindNode} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                placeholder="Nueva rama (ej. Citoplasma)..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
              />
              <input
                type="text"
                value={newNodeNotes}
                onChange={(e) => setNewNodeNotes(e.target.value)}
                placeholder="Explicación corta en 5 palabras..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold whitespace-nowrap shrink-0"
              >
                + Añadir Rama
              </button>
            </form>
          </div>
        )}

        {/* TECHNIQUE 3: CORNELL NOTE SYSTEM */}
        {techniqueMode === 'CORNELL' && (
          <div className="space-y-5">
            <form onSubmit={handleSaveCornell} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={cornellSubject}
                  onChange={(e) => setCornellSubject(e.target.value)}
                  placeholder="Asignatura"
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
                <input
                  type="text"
                  required
                  value={cornellTopic}
                  onChange={(e) => setCornellTopic(e.target.value)}
                  placeholder="Título del tema de clase..."
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    1. Palabras Clave / Preguntas
                  </label>
                  <textarea
                    rows={4}
                    value={cornellCuesText}
                    onChange={(e) => setCornellCuesText(e.target.value)}
                    placeholder="Una palabra o pregunta por línea..."
                    className="w-full p-2.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-8">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    2. Ideas Principales de Clase (Frases cortas)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={cornellBodyText}
                    onChange={(e) => setCornellBodyText(e.target.value)}
                    placeholder="Usa guiones cortos, abreviaturas y evita párrafos densos..."
                    className="w-full p-2.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  3. Resumen en 1 sola frase (Para fijar en la memoria a largo plazo)
                </label>
                <input
                  type="text"
                  value={cornellSummaryText}
                  onChange={(e) => setCornellSummaryText(e.target.value)}
                  placeholder="Si tuviera que resumir esta página en un tuit, diría que..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
              >
                Guardar Ficha Cornell (+30 PE)
              </button>
            </form>

            {cornellNotes.length > 0 && (
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                  Fichas Cornell Guardadas ({cornellNotes.length}):
                </p>
                {cornellNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-2"
                  >
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      <span>{note.subject}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{note.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">{note.topic}</h4>
                    <p className="text-xs text-stone-700 dark:text-stone-300 whitespace-pre-line">
                      {note.notes}
                    </p>
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-300 pt-1">
                      Síntesis: {note.summary}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TECHNIQUE 4: FEYNMAN EXPLANATION TRAINER */}
        {techniqueMode === 'FEYNMAN' && (
          <div className="space-y-4">
            <p className="text-xs text-stone-600 dark:text-stone-300">
              La <strong>Técnica Feynman</strong> evita estudiar de memoria sin comprender: consiste en explicar el concepto con palabras sencillas y un ejemplo cotidiano.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Paso 1: ¿Qué concepto estás estudiando hoy?
                </label>
                <input
                  type="text"
                  value={feynmanConcept}
                  onChange={(e) => {
                    setFeynmanConcept(e.target.value);
                    setFeynmanVerified(false);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Paso 2: Explícalo con tus propias palabras sin copiar del libro
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (isRecordingFeynman) {
                        stopFeynmanRecording();
                      } else {
                        startFeynmanRecording();
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                      isRecordingFeynman
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300/50 dark:border-amber-800/50'
                    }`}
                  >
                    {isRecordingFeynman ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Detener Grabación Oral</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" />
                        <span>Grabar / Dictar Explicación</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={feynmanSimpleExplanation}
                  onChange={(e) => {
                    setFeynmanSimpleExplanation(e.target.value);
                    setFeynmanVerified(false);
                  }}
                  placeholder="Explícalo como si se lo contaras a un compañero o a tu hermano menor..."
                  className="w-full p-2.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
                {feynmanAudioUrl && (
                  <div className="mt-2 p-2 rounded-lg bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <audio controls src={feynmanAudioUrl} className="h-7 w-full max-w-xs" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        revokeUrl(feynmanAudioUrl);
                        setFeynmanAudioUrl(null);
                      }}
                      className="text-xs text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium"
                    >
                      Descartar audio
                    </button>
                  </div>
                )}
                {feynmanMicError && (
                  <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                    {feynmanMicError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Paso 3: Pon una analogía de la vida real o de tu Anime favorito
                </label>
                <input
                  type="text"
                  value={feynmanAnalogy}
                  onChange={(e) => {
                    setFeynmanAnalogy(e.target.value);
                    setFeynmanVerified(false);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setFeynmanVerified(true);
                  soundFX.playRewardUnlock();
                  onCompleteFocusBlock(10, 45, Math.max(1, Math.round(10 * studyRatioX)));
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                Validar Explicación Feynman (+45 PE · +{Math.max(1, Math.round(10 * studyRatioX))} min Juego)
              </button>
              {feynmanVerified && (
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  ✓ ¡Comprensión verificada con claridad!
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
