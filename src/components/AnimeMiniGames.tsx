import React, { useState, useEffect, useCallback } from 'react';
import { ANIME_WORLDS } from '../data/clotDelMoroData';
import { AnimeWorldId, VirtualShopItem } from '../types';
import { AnimeWorldIllustration } from './AnimeArtwork';
import { soundFX } from '../utils/sound';
import {
  CheckCircle2,
  Gamepad2,
  Lock,
  RotateCcw,
  Shield,
  ShoppingBag,
  Sparkles,
  Swords,
  Timer,
  Trophy,
} from 'lucide-react';

interface AnimeMiniGamesProps {
  selectedWorld: AnimeWorldId;
  onSelectWorld: (world: AnimeWorldId) => void;
  studyPoints: number;
  studyRatioX: number;
  breakMinutes: number;
  onConsumeBreakMinute: (minutes: number) => void;
  onEarnBonusPoints: (points: number, reason: string) => void;
  shopItems: VirtualShopItem[];
  onRedeemShopItem: (itemId: string) => void;
}

type MiniGameType = 'MEMORY' | 'REFLEX' | 'CARDS';
type GameStage = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface MemoryDeckCard {
  uid: string;
  code: string;
  label: string;
  powerText: string;
  flipped: boolean;
  matched: boolean;
}

interface ReflexCell {
  index: number;
  kind: 'EMPTY' | 'TARGET' | 'DECOY';
}

export const AnimeMiniGames: React.FC<AnimeMiniGamesProps> = ({
  selectedWorld,
  onSelectWorld,
  studyPoints,
  studyRatioX,
  breakMinutes,
  onConsumeBreakMinute,
  onEarnBonusPoints,
  shopItems,
  onRedeemShopItem,
}) => {
  const world = ANIME_WORLDS[selectedWorld];
  const [activeGame, setActiveGame] = useState<MiniGameType>('MEMORY');
  const [gameStage, setGameStage] = useState<GameStage>('TITLE_MENU');
  const [customMangaName, setCustomMangaName] = useState<string>('');
  const [isCustomEditing, setIsCustomEditing] = useState<boolean>(false);
  const [shopFilter, setShopFilter] = useState<'ALL' | AnimeWorldId>('ALL');

  // Break session timer (seconds remaining in current mini-game break)
  const [breakCountdownSec, setBreakCountdownSec] = useState<number>(Math.max(60, breakMinutes * 60));

  // --- GAME 1: MEMORY MATCH STATE ---
  const [memoryCards, setMemoryCards] = useState<MemoryDeckCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState<number>(0);
  const [memoryMatches, setMemoryMatches] = useState<number>(0);

  // --- GAME 2: REFLEX & IMPULSE CONTROL STATE ---
  const [reflexGrid, setReflexGrid] = useState<ReflexCell[]>(
    Array.from({ length: 9 }, (_, i) => ({ index: i, kind: 'EMPTY' }))
  );
  const [reflexScore, setReflexScore] = useState<number>(0);
  const [reflexStreak, setReflexStreak] = useState<number>(0);
  const [reflexTimeLeft, setReflexTimeLeft] = useState<number>(25);
  const [reflexFeedback, setReflexFeedback] = useState<string>(
    'Pulsa solo los objetivos de energía. Ignora las trampas de distracción.'
  );

  // --- GAME 3: TURN-BASED ANIME CARD DUEL STATE ---
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [rivalHp, setRivalHp] = useState<number>(100);
  const [playerShield, setPlayerShield] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const initMemoryGame = useCallback(() => {
    const symbols = world.memorySymbols;
    const paired = [...symbols, ...symbols].map((item, idx) => ({
      uid: `${item.code}-${idx}-${Math.random()}`,
      code: item.code,
      label: item.label,
      powerText: item.powerText,
      flipped: false,
      matched: false,
    }));
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }
    setMemoryCards(paired);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
  }, [world]);

  const initReflexGame = useCallback(() => {
    setReflexScore(0);
    setReflexStreak(0);
    setReflexTimeLeft(25);
    setReflexFeedback(`Captura: ${world.targetItemName} · Evita: ${world.decoyItemName}`);
    setReflexGrid(Array.from({ length: 9 }, (_, i) => ({ index: i, kind: 'EMPTY' })));
  }, [world]);

  const initCardDuel = useCallback(() => {
    setPlayerHp(100);
    setRivalHp(100);
    setPlayerShield(0);
    setIsPlayerTurn(true);
    setBattleLog([
      `Comienza el duelo en ${customMangaName.trim() || world.name} contra ${world.rivalName}.`,
      'Tu turno: elige una carta de técnica para atacar, defender o recuperar foco.',
    ]);
  }, [world, customMangaName]);

  const startSelectedGame = () => {
    const sessionMinutes = Math.max(2, Math.min(breakMinutes, 5));
    if (breakMinutes >= 2) {
      onConsumeBreakMinute(2);
    }
    setBreakCountdownSec(sessionMinutes * 60);
    if (activeGame === 'MEMORY') initMemoryGame();
    if (activeGame === 'REFLEX') initReflexGame();
    if (activeGame === 'CARDS') initCardDuel();
    setGameStage('PLAYING');
    soundFX.playStepComplete();
  };

  useEffect(() => {
    if (gameStage !== 'PLAYING') return;
    const timer = window.setInterval(() => {
      setBreakCountdownSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [gameStage]);

  useEffect(() => {
    if (gameStage !== 'PLAYING' || activeGame !== 'REFLEX') return;

    const countdownInterval = window.setInterval(() => {
      setReflexTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStage('GAME_OVER');
          soundFX.playRewardUnlock();
          onEarnBonusPoints(50, `Entrenamiento de reflejos en ${world.name}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawnInterval = window.setInterval(() => {
      const nextGrid: ReflexCell[] = Array.from({ length: 9 }, (_, i) => ({ index: i, kind: 'EMPTY' }));
      const targetPos = Math.floor(Math.random() * 9);
      nextGrid[targetPos] = { index: targetPos, kind: 'TARGET' };

      let decoyPos = Math.floor(Math.random() * 9);
      if (decoyPos === targetPos) decoyPos = (targetPos + 1) % 9;
      if (Math.random() > 0.25) {
        nextGrid[decoyPos] = { index: decoyPos, kind: 'DECOY' };
      }
      setReflexGrid(nextGrid);
    }, 850);

    return () => {
      window.clearInterval(countdownInterval);
      window.clearInterval(spawnInterval);
    };
  }, [gameStage, activeGame, world.name, onEarnBonusPoints]);

  const handleMemoryCardClick = (idx: number) => {
    if (gameStage !== 'PLAYING') return;
    if (flippedIndices.length >= 2) return;
    if (memoryCards[idx].flipped || memoryCards[idx].matched) return;

    soundFX.playGameHit(true);
    const updated = memoryCards.map((c, i) => (i === idx ? { ...c, flipped: true } : c));
    const nextFlipped = [...flippedIndices, idx];
    setMemoryCards(updated);
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      if (updated[firstIdx].code === updated[secondIdx].code) {
        window.setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c, i) => (i === firstIdx || i === secondIdx ? { ...c, matched: true } : c))
          );
          setFlippedIndices([]);
          setMemoryMatches((prevMatches) => {
            const newCount = prevMatches + 1;
            if (newCount === world.memorySymbols.length) {
              soundFX.playRewardUnlock();
              onEarnBonusPoints(60, `Memoria completada en ${world.name}`);
              setGameStage('GAME_OVER');
            }
            return newCount;
          });
        }, 250);
      } else {
        window.setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c, i) => (i === firstIdx || i === secondIdx ? { ...c, flipped: false } : c))
          );
          setFlippedIndices([]);
        }, 650);
      }
    }
  };

  const handleReflexCellClick = (cell: ReflexCell) => {
    if (gameStage !== 'PLAYING') return;
    if (cell.kind === 'TARGET') {
      soundFX.playGameHit(true);
      setReflexScore((s) => s + 15 + reflexStreak * 2);
      setReflexStreak((st) => st + 1);
      setReflexFeedback(`¡Impulso acertado! +${15 + reflexStreak * 2} pts (${world.targetItemName})`);
      setReflexGrid((prev) => prev.map((c) => (c.index === cell.index ? { ...c, kind: 'EMPTY' } : c)));
    } else if (cell.kind === 'DECOY') {
      soundFX.playGameHit(false);
      setReflexScore((s) => Math.max(0, s - 10));
      setReflexStreak(0);
      setReflexFeedback(`Freno inhibitorio: tocaste ${world.decoyItemName} (-10 pts). ¡Respira y observa!`);
      setReflexGrid((prev) => prev.map((c) => (c.index === cell.index ? { ...c, kind: 'EMPTY' } : c)));
    }
  };

  const handlePlayBattleCard = (cardIndex: number) => {
    if (gameStage !== 'PLAYING' || !isPlayerTurn) return;
    const card = world.battleCards[cardIndex];
    soundFX.playGameHit(true);

    let nextRivalHp = rivalHp;
    let nextPlayerHp = playerHp;
    let nextShield = playerShield;
    let actionMsg = '';

    if (card.type === 'ATAQUE') {
      nextRivalHp = Math.max(0, rivalHp - card.power);
      actionMsg = `Usaste ${card.name}: infliges ${card.power} de daño a ${world.rivalName}.`;
    } else if (card.type === 'DEFENSA') {
      nextShield = card.power;
      nextRivalHp = Math.max(0, rivalHp - 12);
      actionMsg = `Activaste ${card.name}: creas un escudo de ${card.power} pts y contraatacas (+12).`;
    } else {
      nextPlayerHp = Math.min(100, playerHp + 24);
      nextRivalHp = Math.max(0, rivalHp - 18);
      actionMsg = `Activaste ${card.name}: recuperas +24 PS de concentración y causas 18 de impacto.`;
    }

    setRivalHp(nextRivalHp);
    setPlayerHp(nextPlayerHp);
    setPlayerShield(nextShield);
    setBattleLog((prev) => [actionMsg, ...prev.slice(0, 4)]);

    if (nextRivalHp <= 0) {
      soundFX.playRewardUnlock();
      onEarnBonusPoints(75, `Victoria táctica contra ${world.rivalName}`);
      setGameStage('GAME_OVER');
      return;
    }

    setIsPlayerTurn(false);

    window.setTimeout(() => {
      const rawDamage = 20 + Math.floor(Math.random() * 14);
      const mitigated = Math.max(4, rawDamage - nextShield);
      setPlayerShield(0);
      setPlayerHp((currentHp) => {
        const updatedHp = Math.max(0, currentHp - mitigated);
        setBattleLog((prev) => [
          `${world.rivalName} lanza Ola de Distracción: recibes ${mitigated} de daño${
            nextShield > 0 ? ` (${nextShield} bloqueado)` : ''
          }.`,
          ...prev.slice(0, 4),
        ]);
        if (updatedHp <= 0) {
          setGameStage('GAME_OVER');
        }
        return updatedHp;
      });
      setIsPlayerTurn(true);
    }, 650);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const filteredShopItems =
    shopFilter === 'ALL'
      ? shopItems
      : shopItems.filter((item) => item.animeTheme === shopFilter);

  return (
    <div className="space-y-8">
      {/* =====================================================================
          TIENDA VIRTUAL DE PUNTOS DE ESTUDIO Y MULTIPLICADOR X PARENTAL
          ===================================================================== */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 bg-white dark:bg-stone-900 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Sistema de Recompensas Gamificado · Pacto Familiar X = {studyRatioX}x
            </p>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Tienda Virtual de Recompensas y Acceso a Minijuegos Anime
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 text-amber-950 dark:text-amber-200">
              <span>Saldo de Puntos de Estudio: </span>
              <strong className="text-sm">{studyPoints} PE</strong>
            </div>
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
              <span>Tiempo Minijuego (X = {studyRatioX}x): </span>
              <strong className="text-sm">{breakMinutes} min disponibles</strong>
            </div>
          </div>
        </div>

        {/* Shop Filter by Anime Theme */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
            <button
              type="button"
              onClick={() => setShopFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                shopFilter === 'ALL'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              Todos los Animes
            </button>
            <button
              type="button"
              onClick={() => setShopFilter('NARUTO')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                shopFilter === 'NARUTO'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              Naruto Shippuden
            </button>
            <button
              type="button"
              onClick={() => setShopFilter('HEROES')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                shopFilter === 'HEROES'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              My Hero Academia
            </button>
            <button
              type="button"
              onClick={() => setShopFilter('PIRATES')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                shopFilter === 'PIRATES'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              One Piece
            </button>
            <button
              type="button"
              onClick={() => setShopFilter('ALCHEMIST')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                shopFilter === 'ALCHEMIST'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              Kimetsu / Alquimia
            </button>
          </div>

          <span className="text-xs text-stone-500 dark:text-stone-400">
            Canjea tus Puntos de Estudio (PE) por pases de tiempo y mejoras temáticas
          </span>
        </div>

        {/* Shop Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredShopItems.map((item) => {
            const canBuy = studyPoints >= item.costPoints;
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/40 flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono tabular-nums">
                    <span>{item.animeLabel}</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      Coste: {item.costPoints} PE
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-700/70 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono tabular-nums text-emerald-700 dark:text-emerald-400 font-semibold">
                    +{item.minutesIncluded} min de juego
                  </span>
                  <button
                    type="button"
                    disabled={!canBuy}
                    onClick={() => {
                      onRedeemShopItem(item.id);
                      onSelectWorld(item.animeTheme);
                      soundFX.playRewardUnlock();
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      canBuy
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    {item.unlocked ? 'Canjear +Minutos Extra' : 'Desbloquear y Jugar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          SELECTOR DEL TEMA DEL MINIJUEGO ANIME ANTES DE EMPEZAR
          ===================================================================== */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 bg-white dark:bg-stone-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Paso Previo Obligatorio · Personalización del Entorno de Juego
            </p>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
              Selecciona el Tema de tu Minijuego Anime antes de Empezar
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCustomEditing((prev) => !prev)}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
          >
            {isCustomEditing ? 'Cerrar título personalizado' : 'Escribir otro Manga favorito'}
          </button>
        </div>

        {isCustomEditing && (
          <div className="pt-4 pb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <label
              htmlFor="custom-manga-input"
              className="text-xs font-medium text-stone-600 dark:text-stone-300 whitespace-nowrap"
            >
              Escribe tu Manga o Anime favorito para personalizar el título de la arena:
            </label>
            <input
              id="custom-manga-input"
              type="text"
              value={customMangaName}
              onChange={(e) => setCustomMangaName(e.target.value)}
              placeholder="Ej. Dragon Ball Z, Jujutsu Kaisen, Haikyuu!!, Blue Lock..."
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {(['NARUTO', 'HEROES', 'PIRATES', 'ALCHEMIST'] as AnimeWorldId[]).map((wId) => {
            const item = ANIME_WORLDS[wId];
            const isSelected = selectedWorld === wId;
            return (
              <button
                key={wId}
                type="button"
                onClick={() => {
                  onSelectWorld(wId);
                  setGameStage('TITLE_MENU');
                }}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-amber-600 dark:border-amber-400 bg-amber-50/70 dark:bg-amber-950/30'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/40 dark:bg-stone-900'
                }`}
              >
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  <span>{item.mangaInspiration}</span>
                </div>
                <div className="text-sm font-bold text-stone-900 dark:text-white mt-1">
                  {item.name}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                  {item.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected World Visual Stage & Mini-Game Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: World Lore & Game Mode Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-stone-900">
            <div className="relative">
              <AnimeWorldIllustration worldId={selectedWorld} className="w-full h-44 rounded-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs text-stone-200">{world.mangaInspiration}</p>
                <h3 className="text-lg font-bold">
                  {customMangaName.trim() ? `${customMangaName} · ${world.name}` : world.name}
                </h3>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  <span>Mentor: {world.mentorName}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{world.mentorRole}</span>
                </div>
                <p className="text-sm text-stone-700 dark:text-stone-200 mt-1.5 italic">
                  "{world.mentorQuote}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Elige la Modalidad de Minijuego:
                </p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveGame('MEMORY');
                      setGameStage('TITLE_MENU');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                      activeGame === 'MEMORY'
                        ? 'bg-amber-600 text-white border-transparent'
                        : 'bg-stone-50 dark:bg-stone-800/70 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      1. Memoria de Símbolos (Memoria)
                    </span>
                    <span className="font-mono tabular-nums">+60 PE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveGame('REFLEX');
                      setGameStage('TITLE_MENU');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                      activeGame === 'REFLEX'
                        ? 'bg-amber-600 text-white border-transparent'
                        : 'bg-stone-50 dark:bg-stone-800/70 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <Gamepad2 className="w-4 h-4 shrink-0" />
                      2. Arena de Reflejos (Foco TDAH)
                    </span>
                    <span className="font-mono tabular-nums">+50 PE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveGame('CARDS');
                      setGameStage('TITLE_MENU');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                      activeGame === 'CARDS'
                        ? 'bg-amber-600 text-white border-transparent'
                        : 'bg-stone-50 dark:bg-stone-800/70 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <Swords className="w-4 h-4 shrink-0" />
                      3. Duelo Táctico de Cartas
                    </span>
                    <span className="font-mono tabular-nums">+75 PE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 2D Game Stage (8 cols) */}
        <div className="lg:col-span-8 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Tema Activo: <strong className="text-amber-700 dark:text-amber-400">{customMangaName.trim() || world.name}</strong>
                <span aria-hidden="true"> · </span>
                Fórmula Familiar: Duración Juego = {studyRatioX} × Estudio
              </span>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                {activeGame === 'MEMORY' && 'Empareja las 6 Reliquias del Universo Anime'}
                {activeGame === 'REFLEX' && `Captura ${world.targetItemName} y Esquiva Trampas`}
                {activeGame === 'CARDS' && `Combate de Cartas contra ${world.rivalName}`}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-stone-700 dark:text-stone-300">
              <span className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Tiempo de partida: {formatSeconds(breakCountdownSec)}
              </span>
              {gameStage === 'PLAYING' && (
                <button
                  type="button"
                  onClick={startSelectedGame}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reiniciar
                </button>
              )}
            </div>
          </div>

          {gameStage === 'TITLE_MENU' && (
            <div className="py-10 px-4 text-center max-w-lg mx-auto space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-stone-900 dark:text-white">
                  {activeGame === 'MEMORY' && `Memoria de ${customMangaName.trim() || world.name}`}
                  {activeGame === 'REFLEX' && `Arena de Reflejos: ${world.targetItemName}`}
                  {activeGame === 'CARDS' && `Duelo de Cartas contra ${world.rivalName}`}
                </h4>
                <p className="text-sm text-stone-600 dark:text-stone-300">
                  {activeGame === 'MEMORY' &&
                    'Gira las cartas de dos en dos para encontrar las 6 parejas de técnicas de tu anime elegido. Estimula la memoria de trabajo a corto plazo.'}
                  {activeGame === 'REFLEX' &&
                    `Haz clic únicamente cuando aparezca "${world.targetItemName}" y frena el impulso si ves "${world.decoyItemName}". Diseñado para entrenar la atención selectiva en TDAH.`}
                  {activeGame === 'CARDS' &&
                    'Combina cartas de Ataque, Defensa y Enfoque para vencer al rival de la procrastinación en un duelo rápido por turnos.'}
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startSelectedGame}
                  className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  Iniciar Minijuego en {world.name} ({breakMinutes} min disponibles)
                </button>
              </div>
            </div>
          )}

          {gameStage === 'PLAYING' && activeGame === 'MEMORY' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 font-mono tabular-nums">
                <span>Parejas encontradas: {memoryMatches} / 6</span>
                <span>Movimientos realizados: {memoryMoves}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {memoryCards.map((card, index) => {
                  const isRevealed = card.flipped || card.matched;
                  return (
                    <button
                      key={card.uid}
                      type="button"
                      onClick={() => handleMemoryCardClick(index)}
                      disabled={isRevealed}
                      className={`h-28 rounded-xl border p-3 flex flex-col items-center justify-center text-center transition-all ${
                        card.matched
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                          : card.flipped
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-stone-900 dark:text-white'
                          : 'border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {isRevealed ? (
                        <>
                          <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                            [{card.code}]
                          </span>
                          <span className="text-xs font-semibold mt-1 line-clamp-2">{card.label}</span>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                            {card.powerText}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-bold tracking-wider font-mono">?</span>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                            Girar carta
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {gameStage === 'PLAYING' && activeGame === 'REFLEX' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono tabular-nums text-stone-700 dark:text-stone-200">
                <span>Puntuación: {reflexScore} pts</span>
                <span>Racha de Foco: x{reflexStreak}</span>
                <span>Tiempo restante: {reflexTimeLeft}s</span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/80 px-3.5 py-2 rounded-lg">
                {reflexFeedback}
              </p>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                {reflexGrid.map((cell) => (
                  <button
                    key={cell.index}
                    type="button"
                    onClick={() => handleReflexCellClick(cell)}
                    className={`h-24 rounded-xl border flex flex-col items-center justify-center p-2 transition-all ${
                      cell.kind === 'TARGET'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : cell.kind === 'DECOY'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-400'
                    }`}
                  >
                    {cell.kind === 'TARGET' && (
                      <>
                        <span className="text-xs font-mono font-bold">● CAPTURAR</span>
                        <span className="text-xs mt-1 text-center">{world.targetItemName}</span>
                      </>
                    )}
                    {cell.kind === 'DECOY' && (
                      <>
                        <span className="text-xs font-mono font-bold">▲ NO TOCAR</span>
                        <span className="text-xs mt-1 text-center">{world.decoyItemName}</span>
                      </>
                    )}
                    {cell.kind === 'EMPTY' && <span className="text-xs font-mono">·</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameStage === 'PLAYING' && activeGame === 'CARDS' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
                  <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                    <span className="font-bold text-stone-900 dark:text-white">
                      Alumno/a ({world.mentorName})
                    </span>
                    <span>
                      PS: {playerHp}/100 · {playerHp > 40 ? 'ESTABLE' : 'ALERTA'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-emerald-600 transition-all"
                      style={{ width: `${playerHp}%` }}
                    />
                  </div>
                  {playerShield > 0 && (
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-mono mt-1.5 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> Escudo activo: +{playerShield} defensa
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
                  <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                    <span className="font-bold text-stone-900 dark:text-white">{world.rivalName}</span>
                    <span>
                      PS: {rivalHp}/100 · {rivalHp > 40 ? 'ACTIVO' : 'DEBILITADO'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-rose-600 transition-all"
                      style={{ width: `${rivalHp}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5">{world.rivalTitle}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-xs space-y-1 font-mono">
                {battleLog.map((entry, i) => (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? 'text-stone-900 dark:text-white font-semibold'
                        : 'text-stone-500 dark:text-stone-400'
                    }
                  >
                    {i === 0 ? '▸ ' : '· '}
                    {entry}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-medium text-stone-600 dark:text-stone-300 mb-3">
                  {isPlayerTurn
                    ? 'Tu turno — Elige una carta de técnica para jugar:'
                    : `Turno de ${world.rivalName}... calculando movimiento`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {world.battleCards.map((card, idx) => (
                    <button
                      key={card.id}
                      type="button"
                      disabled={!isPlayerTurn}
                      onClick={() => handlePlayBattleCard(idx)}
                      className="text-left p-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-amber-500 dark:hover:border-amber-400 bg-white dark:bg-stone-800/90 transition-all disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400">
                        <span>
                          {card.symbol} {card.type}
                        </span>
                        <span className="font-bold text-stone-900 dark:text-white">
                          Poder: {card.power}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-stone-900 dark:text-white mt-1">
                        {card.name}
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                        {card.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {gameStage === 'GAME_OVER' && (
            <div className="py-10 px-4 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
                <Trophy className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 dark:text-white">
                ¡Partida Anime Completada!
              </h4>
              <p className="text-sm text-stone-600 dark:text-stone-300">
                {activeGame === 'MEMORY' &&
                  `Completaste las 6 parejas de ${world.name} en ${memoryMoves} movimientos y ganaste +60 PE.`}
                {activeGame === 'REFLEX' &&
                  `Obtuviste ${reflexScore} puntos de control atencional y sumaste +50 PE.`}
                {activeGame === 'CARDS' &&
                  (rivalHp <= 0
                    ? `Derrotaste a ${world.rivalName} con estrategia y ganaste +75 PE.`
                    : `Buen intento contra ${world.rivalName}. ¡Ajusta tu defensa y vuelve a intentarlo!`)}
              </p>
              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startSelectedGame}
                  className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  Jugar de nuevo
                </button>
                <button
                  type="button"
                  onClick={() => setGameStage('TITLE_MENU')}
                  className="px-5 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
                >
                  Cambiar minijuego
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
