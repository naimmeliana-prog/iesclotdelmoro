import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ANIME_WORLDS } from '../data/clotDelMoroData';
import { AnimeWorldId, VirtualShopItem } from '../types';
import { AnimeWorldIllustration } from './AnimeArtwork';
import { soundFX } from '../utils/sound';
import {
  CheckCircle2,
  Compass,
  Flame,
  Gamepad2,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  Shield,
  ShoppingBag,
  Sparkles,
  Swords,
  Timer,
  Trophy,
  Zap,
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

type VideoGameGenre = 'PLATFORMER' | 'RACING' | 'RPG_ADVENTURE' | 'TACTICAL_RPG';
type GameStage = 'TITLE_MENU' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'GAME_OVER';

interface ThemePalette {
  skyTop: string;
  skyBottom: string;
  accent: string;
  accentGlow: string;
  secondary: string;
  heroCoat: string;
  heroHair: string;
  projectileName: string;
  ultimateName: string;
  vehicleName: string;
  bossName: string;
}

const WORLD_PALETTES: Record<AnimeWorldId, ThemePalette> = {
  NARUTO: {
    skyTop: '#0F172A',
    skyBottom: '#431407',
    accent: '#F97316',
    accentGlow: '#38BDF8',
    secondary: '#FACC15',
    heroCoat: '#EA580C',
    heroHair: '#FACC15',
    projectileName: 'Rasengan Espiral',
    ultimateName: ' Arte Sabio: Odama Rasengan',
    vehicleName: 'Moto Shinobi Relámpago',
    bossName: 'Susanoo Oscuro de la Distracción',
  },
  HEROES: {
    skyTop: '#064E3B',
    skyBottom: '#0F172A',
    accent: '#10B981',
    accentGlow: '#6EE7B7',
    secondary: '#F43F5E',
    heroCoat: '#059669',
    heroHair: '#065F46',
    projectileName: 'Delaware Air Force',
    ultimateName: 'Plus Ultra Detroit Smash 100%',
    vehicleName: 'Jet-Cruiser U.A. Plus Ultra',
    bossName: 'Nomu Titán del Caos',
  },
  PIRATES: {
    skyTop: '#0C4A6E',
    skyBottom: '#1E3A8A',
    accent: '#EF4444',
    accentGlow: '#FBBF24',
    secondary: '#38BDF8',
    heroCoat: '#DC2626',
    heroHair: '#1E293B',
    projectileName: 'Gomu Gomu Jet Pistol',
    ultimateName: 'Gear 5: Bajrang Gun',
    vehicleName: 'Turbo-Waver Thousand Sunny',
    bossName: 'Almirante Kraken del Abismo',
  },
  ALCHEMIST: {
    skyTop: '#1E1B4B',
    skyBottom: '#450A0A',
    accent: '#EAB308',
    accentGlow: '#F87171',
    secondary: '#A855F7',
    heroCoat: '#B91C1C',
    heroHair: '#FDE047',
    projectileName: 'Lanza de Transmutación',
    ultimateName: 'Círculo Alquímico Supremo',
    vehicleName: 'Automail GT Alquímico',
    bossName: 'Homúnculo de la Pereza',
  },
};

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
  const palette = WORLD_PALETTES[selectedWorld];

  const [activeGenre, setActiveGenre] = useState<VideoGameGenre>('PLATFORMER');
  const [gameStage, setGameStage] = useState<GameStage>('TITLE_MENU');
  const [customMangaName, setCustomMangaName] = useState<string>('');
  const [isCustomEditing, setIsCustomEditing] = useState<boolean>(false);
  const [shopFilter, setShopFilter] = useState<'ALL' | AnimeWorldId>('ALL');

  // HUD State synced from Canvas Engine
  const [hudScore, setHudScore] = useState<number>(0);
  const [hudHp, setHudHp] = useState<number>(100);
  const [hudEnergy, setHudEnergy] = useState<number>(100);
  const [hudLevelOrLap, setHudLevelOrLap] = useState<string>('Nivel 1');
  const [hudStatusText, setHudStatusText] = useState<string>('Listo para jugar');
  const [breakCountdownSec, setBreakCountdownSec] = useState<number>(180);

  // --- TACTICAL RPG TURN-BASED STATE (For Genre 4) ---
  const [tacticalHeroHp, setTacticalHeroHp] = useState<number>(120);
  const [tacticalHeroMp, setTacticalHeroMp] = useState<number>(100);
  const [tacticalLimitGauge, setTacticalLimitGauge] = useState<number>(40);
  const [tacticalBossHp, setTacticalBossHp] = useState<number>(180);
  const [tacticalBossMaxHp, setTacticalBossMaxHp] = useState<number>(180);
  const [tacticalWave, setTacticalWave] = useState<number>(1);
  const [tacticalTurn, setTacticalTurn] = useState<'PLAYER' | 'BOSS'>('PLAYER');
  const [tacticalShield, setTacticalShield] = useState<boolean>(false);
  const [tacticalLog, setTacticalLog] = useState<string>(
    '¡Tu turno! Selecciona un comando de combate o desata tu Habilidad Definitiva.'
  );
  const tacticalAnimRef = useRef<{
    heroLunge: number;
    bossLunge: number;
    shake: number;
    flashColor: string | null;
    floatingText: { text: string; x: number; y: number; color: string; alpha: number }[];
  }>({
    heroLunge: 0,
    bossLunge: 0,
    shake: 0,
    flashColor: null,
    floatingText: [],
  });

  // Canvas & Input Refs for 60 FPS Real-Time Games (Genres 1, 2, 3, 4)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const animFrameRef = useRef<number | null>(null);

  // Switch genre resets back to Title Menu cleanly
  const handleSelectGenre = (genre: VideoGameGenre) => {
    setActiveGenre(genre);
    setGameStage('TITLE_MENU');
    soundFX.playStepComplete();
  };

  // Start Game (Supports both Rewarded Break Minutes & Free Demo Practice)
  const handleLaunchVideoGame = (useBreakMinutes: boolean) => {
    if (useBreakMinutes && breakMinutes >= 1) {
      onConsumeBreakMinute(1);
      setBreakCountdownSec(Math.max(120, breakMinutes * 60));
    } else {
      setBreakCountdownSec(180);
    }

    setHudScore(0);
    setHudHp(100);
    setHudEnergy(100);

    if (activeGenre === 'TACTICAL_RPG') {
      setTacticalHeroHp(120);
      setTacticalHeroMp(100);
      setTacticalLimitGauge(35);
      setTacticalBossHp(180);
      setTacticalBossMaxHp(180);
      setTacticalWave(1);
      setTacticalTurn('PLAYER');
      setTacticalShield(false);
      setTacticalLog(`¡${palette.bossName} bloquea el camino! Elige tu técnica de ataque.`);
    }

    setGameStage('PLAYING');
    soundFX.playRewardUnlock();
  };

  // Countdown Timer during active play
  useEffect(() => {
    if (gameStage !== 'PLAYING') return;
    const interval = window.setInterval(() => {
      setBreakCountdownSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [gameStage]);

  // Keyboard Listeners for 60 FPS Canvas Controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      if (
        gameStage === 'PLAYING' &&
        ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)
      ) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gameStage]);

  // Virtual Touch / Mouse Button Helper
  const setVirtualKey = (code: string, pressed: boolean) => {
    keysRef.current[code] = pressed;
  };

  // ============================================================================
  // 60 FPS HTML5 CANVAS VIDEO GAME ENGINE (PLATFORMER, RACING, RPG, TACTICAL)
  // ============================================================================
  useEffect(() => {
    if (gameStage !== 'PLAYING') {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    let frameCount = 0;

    // Shared Particles & Floating Numbers
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay: number;
    }
    interface FloatingPopup {
      text: string;
      x: number;
      y: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const popups: FloatingPopup[] = [];

    const spawnParticles = (
      x: number,
      y: number,
      color: string,
      count = 14,
      speed = 5
    ) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 1 + Math.random() * speed;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          radius: 2 + Math.random() * 4,
          color,
          alpha: 1,
          decay: 0.02 + Math.random() * 0.025,
        });
      }
    };

    const spawnPopup = (text: string, x: number, y: number, color = '#FACC15') => {
      popups.push({ text, x, y, color, alpha: 1 });
    };

    // ==========================================================================
    // GENRE 1: 2D SIDE-SCROLLING ACTION PLATFORMER ENGINE
    // ==========================================================================
    const platHero = {
      x: 100,
      y: 260,
      vx: 0,
      vy: 0,
      w: 36,
      h: 48,
      facing: 1,
      grounded: false,
      jumpsLeft: 2,
      jumpKeyLock: false,
      attackCooldown: 0,
      dashTimer: 0,
      invuln: 0,
      hp: 100,
      energy: 100,
      score: 0,
      stage: 1,
    };

    const levelLength = 2600;
    const platforms = [
      { x: 0, y: 400, w: 650, h: 80, type: 'GROUND' },
      { x: 260, y: 300, w: 150, h: 20, type: 'LEDGE' },
      { x: 470, y: 230, w: 150, h: 20, type: 'LEDGE' },
      { x: 720, y: 400, w: 520, h: 80, type: 'GROUND' },
      { x: 850, y: 290, w: 170, h: 20, type: 'MOVING', baseX: 850, range: 110 },
      { x: 1120, y: 210, w: 140, h: 20, type: 'LEDGE' },
      { x: 1320, y: 400, w: 620, h: 80, type: 'GROUND' },
      { x: 1500, y: 310, w: 160, h: 20, type: 'LEDGE' },
      { x: 1730, y: 240, w: 160, h: 20, type: 'MOVING', baseX: 1730, range: 90 },
      { x: 2020, y: 400, w: 700, h: 80, type: 'GROUND' },
    ];

    const springs = [
      { x: 600, y: 382, w: 34, h: 18 },
      { x: 1420, y: 382, w: 34, h: 18 },
      { x: 2100, y: 382, w: 34, h: 18 },
    ];

    const orbs = Array.from({ length: 22 }, (_, i) => ({
      x: 200 + i * 105,
      y: i % 3 === 0 ? 180 : i % 2 === 0 ? 250 : 350,
      collected: false,
    }));

    const enemies = [
      { x: 350, y: 356, minX: 220, maxX: 550, vx: 2.1, hp: 60, maxHp: 60, isBoss: false },
      { x: 920, y: 356, minX: 750, maxX: 1180, vx: -2.4, hp: 75, maxHp: 75, isBoss: false },
      { x: 1580, y: 356, minX: 1360, maxX: 1860, vx: 2.6, hp: 85, maxHp: 85, isBoss: false },
      { x: 2350, y: 332, minX: 2140, maxX: 2540, vx: -1.8, hp: 220, maxHp: 220, isBoss: true },
    ];

    const projectiles: { x: number; y: number; vx: number; radius: number }[] = [];

    // ==========================================================================
    // GENRE 2: PSEUDO-3D OUTRUN / TURBO RACING ENGINE
    // ==========================================================================
    const racer = {
      playerX: 0, // -1.2 to +1.2
      speed: 0,
      maxSpeed: 290,
      nitro: 100,
      distance: 0,
      lapGoal: 4500,
      score: 0,
      hp: 100,
      curvature: 0,
      targetCurvature: 0,
      rivals: [
        { z: 180, lane: -0.5, speed: 175, color: '#EF4444', name: 'Rival Bakugo' },
        { z: 360, lane: 0.45, speed: 185, color: '#3B82F6', name: 'Rival Sasuke' },
        { z: 540, lane: -0.25, speed: 195, color: '#A855F7', name: 'Rival Law' },
        { z: 750, lane: 0.55, speed: 205, color: '#10B981', name: 'Rival Mustang' },
      ],
      items: Array.from({ length: 16 }, (_, i) => ({
        z: 140 + i * 260,
        lane: ((i * 7) % 5 - 2) * 0.35,
        kind: i % 3 === 0 ? ('BOOST' as const) : ('ORB' as const),
      })),
    };

    // ==========================================================================
    // GENRE 3: TOP-DOWN 2.5D ACTION RPG & DUNGEON BOSS ENGINE
    // ==========================================================================
    const rpg = {
      x: 160,
      y: 240,
      vx: 0,
      vy: 0,
      facingX: 1,
      facingY: 0,
      hp: 120,
      maxHp: 120,
      mana: 100,
      level: 1,
      xp: 0,
      score: 0,
      slashTimer: 0,
      slashCooldown: 0,
      novaTimer: 0,
      chests: [
        { x: 260, y: 100, opened: false, reward: 'Espada de Chakra +25 ATQ' },
        { x: 520, y: 380, opened: false, reward: 'Armadura Plus Ultra +40 PS' },
        { x: 760, y: 110, opened: false, reward: 'Reliquia del Sabio +150 PE' },
      ],
      mobs: [
        { x: 380, y: 160, hp: 70, maxHp: 70, isBoss: false, name: 'Sombra Errante' },
        { x: 440, y: 320, hp: 80, maxHp: 80, isBoss: false, name: 'Gólem de Piedra' },
        { x: 640, y: 210, hp: 90, maxHp: 90, isBoss: false, name: 'Espectro Carmesí' },
        { x: 790, y: 260, hp: 280, maxHp: 280, isBoss: true, name: palette.bossName },
      ],
    };

    // ==========================================================================
    // MAIN 60 FPS RENDER & PHYSICS LOOP
    // ==========================================================================
    const renderLoop = () => {
      frameCount++;

      // ------------------------------------------------------------------------
      // 1. RENDER & UPDATE: 2D ACTION PLATFORMER
      // ------------------------------------------------------------------------
      if (activeGenre === 'PLATFORMER') {
        const keys = keysRef.current;
        const moveLeft = keys['ArrowLeft'] || keys['KeyA'];
        const moveRight = keys['ArrowRight'] || keys['KeyD'];
        const jumpPressed = keys['ArrowUp'] || keys['KeyW'] || keys['Space'];
        const attackPressed = keys['KeyJ'] || keys['KeyF'] || keys['Enter'];
        const dashPressed = keys['ShiftLeft'] || keys['ShiftRight'] || keys['KeyK'];

        // Dash & Horizontal Movement
        if (dashPressed && platHero.dashTimer <= 0 && platHero.energy >= 20) {
          platHero.dashTimer = 14;
          platHero.energy = Math.max(0, platHero.energy - 20);
          soundFX.playBoost();
          spawnParticles(platHero.x, platHero.y + 24, palette.accentGlow, 12, 4);
        }

        const topSpeed = platHero.dashTimer > 0 ? 9.5 : 5.2;
        if (moveLeft) {
          platHero.vx = -topSpeed;
          platHero.facing = -1;
        } else if (moveRight) {
          platHero.vx = topSpeed;
          platHero.facing = 1;
        } else {
          platHero.vx *= 0.78;
        }

        if (platHero.dashTimer > 0) platHero.dashTimer--;

        // Double Jump
        if (jumpPressed && !platHero.jumpKeyLock && platHero.jumpsLeft > 0) {
          platHero.vy = -12.6;
          platHero.grounded = false;
          platHero.jumpsLeft--;
          platHero.jumpKeyLock = true;
          soundFX.playJump();
          spawnParticles(platHero.x + 18, platHero.y + 46, '#FFFBEB', 10, 3);
        }
        if (!jumpPressed) {
          platHero.jumpKeyLock = false;
        }

        // Projectile Attack (Rasengan / Smash / Gomu / Alchemy)
        if (attackPressed && platHero.attackCooldown <= 0 && platHero.energy >= 12) {
          platHero.attackCooldown = 18;
          platHero.energy = Math.max(0, platHero.energy - 12);
          projectiles.push({
            x: platHero.x + (platHero.facing === 1 ? 40 : -8),
            y: platHero.y + 22,
            vx: platHero.facing * 11.5,
            radius: 13,
          });
          soundFX.playAttack();
        }
        if (platHero.attackCooldown > 0) platHero.attackCooldown--;
        if (platHero.invuln > 0) platHero.invuln--;
        if (frameCount % 6 === 0 && platHero.energy < 100) {
          platHero.energy = Math.min(100, platHero.energy + 1);
        }

        // Gravity & Position
        platHero.vy += 0.58;
        platHero.x += platHero.vx;
        platHero.y += platHero.vy;
        if (platHero.x < 20) platHero.x = 20;

        // Moving Platforms Update & Collision
        platHero.grounded = false;
        for (const p of platforms) {
          if (p.type === 'MOVING' && p.baseX !== undefined && p.range !== undefined) {
            p.x = p.baseX + Math.sin(frameCount * 0.03) * p.range;
          }
          if (
            platHero.vy >= 0 &&
            platHero.x + platHero.w > p.x &&
            platHero.x < p.x + p.w &&
            platHero.y + platHero.h >= p.y &&
            platHero.y + platHero.h <= p.y + 22
          ) {
            platHero.y = p.y - platHero.h;
            platHero.vy = 0;
            platHero.grounded = true;
            platHero.jumpsLeft = 2;
          }
        }

        // Fall into pit recovery
        if (platHero.y > H + 60) {
          platHero.hp = Math.max(0, platHero.hp - 25);
          platHero.x = Math.max(80, platHero.x - 180);
          platHero.y = 140;
          platHero.vy = 0;
          soundFX.playGameHit(false);
          spawnPopup('-25 PS (Caída)', platHero.x, 180, '#F87171');
          if (platHero.hp <= 0) {
            setGameStage('GAME_OVER');
            return;
          }
        }

        // Springs Jump Pads
        for (const sp of springs) {
          if (
            platHero.x + platHero.w > sp.x &&
            platHero.x < sp.x + sp.w &&
            platHero.y + platHero.h >= sp.y &&
            platHero.y + platHero.h <= sp.y + 24
          ) {
            platHero.vy = -17.5;
            platHero.jumpsLeft = 2;
            soundFX.playBoost();
            spawnParticles(sp.x + 16, sp.y, '#FACC15', 18, 5);
            spawnPopup('¡SUPER SALTO!', sp.x, sp.y - 20, '#38BDF8');
          }
        }

        // Collect Energy Orbs
        for (const orb of orbs) {
          if (
            !orb.collected &&
            Math.hypot(platHero.x + 18 - orb.x, platHero.y + 24 - orb.y) < 30
          ) {
            orb.collected = true;
            platHero.score += 50;
            platHero.energy = Math.min(100, platHero.energy + 15);
            soundFX.playCoin();
            spawnParticles(orb.x, orb.y, '#FACC15', 12, 4);
            spawnPopup('+50 PTS', orb.x, orb.y - 10, '#FDE047');
          }
        }

        // Update Projectiles & Enemy Hits
        for (let i = projectiles.length - 1; i >= 0; i--) {
          const proj = projectiles[i];
          proj.x += proj.vx;
          let hit = false;
          for (const en of enemies) {
            if (en.hp <= 0) continue;
            const ew = en.isBoss ? 58 : 38;
            const eh = en.isBoss ? 68 : 44;
            if (
              proj.x + proj.radius > en.x &&
              proj.x - proj.radius < en.x + ew &&
              proj.y + proj.radius > en.y &&
              proj.y - proj.radius < en.y + eh
            ) {
              en.hp -= 35;
              hit = true;
              soundFX.playGameHit(true);
              spawnParticles(proj.x, proj.y, palette.accentGlow, 18, 6);
              spawnPopup('-35 ¡IMPACTO!', en.x + 10, en.y - 10, '#38BDF8');
              if (en.hp <= 0) {
                const pts = en.isBoss ? 400 : 120;
                platHero.score += pts;
                spawnParticles(en.x + 20, en.y + 20, '#FACC15', 28, 7);
                spawnPopup(`¡DERROTADO +${pts}!`, en.x, en.y - 24, '#4ADE80');
              }
              break;
            }
          }
          if (hit || Math.abs(proj.x - platHero.x) > 700) {
            projectiles.splice(i, 1);
          }
        }

        // Update Enemies & Player Collision
        for (const en of enemies) {
          if (en.hp <= 0) continue;
          en.x += en.vx;
          if (en.x < en.minX || en.x > en.maxX) en.vx *= -1;

          const ew = en.isBoss ? 58 : 38;
          const eh = en.isBoss ? 68 : 44;
          if (
            platHero.x + platHero.w > en.x + 6 &&
            platHero.x < en.x + ew - 6 &&
            platHero.y + platHero.h > en.y + 6 &&
            platHero.y < en.y + eh
          ) {
            // Stomp from above
            if (platHero.vy > 1 && platHero.y + platHero.h - platHero.vy <= en.y + 18) {
              en.hp -= 45;
              platHero.vy = -11.5;
              platHero.score += 80;
              soundFX.playGameHit(true);
              spawnParticles(en.x + ew / 2, en.y, '#FACC15', 16, 5);
              spawnPopup('-45 ¡PISOTÓN!', en.x, en.y - 12, '#FACC15');
            } else if (platHero.invuln <= 0) {
              platHero.hp = Math.max(0, platHero.hp - 20);
              platHero.invuln = 45;
              platHero.vy = -7;
              platHero.vx = -platHero.facing * 7;
              soundFX.playGameHit(false);
              spawnParticles(platHero.x + 18, platHero.y + 24, '#EF4444', 16, 5);
              spawnPopup('-20 PS', platHero.x, platHero.y - 12, '#F87171');
              if (platHero.hp <= 0) {
                setGameStage('GAME_OVER');
                return;
              }
            }
          }
        }

        // Check Portal Victory at end of stage
        if (platHero.x >= levelLength - 110) {
          onEarnBonusPoints(90, `Victoria en Plataformas 2D (${world.name})`);
          soundFX.playRewardUnlock();
          setGameStage('VICTORY');
          return;
        }

        // Camera X follows Hero smoothly
        const camX = Math.max(0, Math.min(levelLength - W, platHero.x - W * 0.32));

        // --- DRAW PARALLAX SKY & MOUNTAINS ---
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, palette.skyTop);
        skyGrad.addColorStop(1, palette.skyBottom);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Glowing Celestial Moon / Sun
        ctx.save();
        ctx.fillStyle = palette.secondary;
        ctx.shadowColor = palette.secondary;
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.arc(W - 140 - camX * 0.05, 88, 42, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Distant Parallax Mountains (Layer 1)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
        for (let i = 0; i < 9; i++) {
          const mx = i * 320 - (camX * 0.18) % 320 - 100;
          ctx.beginPath();
          ctx.moveTo(mx, 400);
          ctx.lineTo(mx + 160, 145 + (i % 2) * 35);
          ctx.lineTo(mx + 320, 400);
          ctx.closePath();
          ctx.fill();
        }

        // Mid-ground Anime Silhouettes / Pagodas / Towers (Layer 2)
        ctx.fillStyle = 'rgba(30, 41, 59, 0.82)';
        for (let i = 0; i < 12; i++) {
          const bx = i * 240 - (camX * 0.42) % 240 - 60;
          ctx.fillRect(bx, 250, 74, 150);
          ctx.beginPath();
          ctx.moveTo(bx - 16, 250);
          ctx.lineTo(bx + 37, 212);
          ctx.lineTo(bx + 90, 250);
          ctx.closePath();
          ctx.fill();
          // Glowing Windows
          ctx.fillStyle = 'rgba(250, 204, 21, 0.35)';
          ctx.fillRect(bx + 18, 275, 12, 18);
          ctx.fillRect(bx + 44, 275, 12, 18);
          ctx.fillRect(bx + 18, 310, 12, 18);
          ctx.fillStyle = 'rgba(30, 41, 59, 0.82)';
        }

        ctx.save();
        ctx.translate(-camX, 0);

        // Draw Platforms with Rim Lighting
        for (const p of platforms) {
          const platGrad = ctx.createLinearGradient(0, p.y, 0, p.y + p.h);
          platGrad.addColorStop(0, '#334155');
          platGrad.addColorStop(1, '#0F172A');
          ctx.fillStyle = platGrad;
          ctx.fillRect(p.x, p.y, p.w, p.h);

          // Top Neon/Grass Trim
          ctx.fillStyle = p.type === 'MOVING' ? palette.accentGlow : palette.accent;
          ctx.fillRect(p.x, p.y, p.w, 6);
        }

        // Draw Springs
        for (const sp of springs) {
          ctx.fillStyle = '#FACC15';
          ctx.fillRect(sp.x, sp.y, sp.w, sp.h);
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(sp.x + 4, sp.y + 4, sp.w - 8, 6);
        }

        // Draw Energy Orbs / Scrolls
        for (const orb of orbs) {
          if (orb.collected) continue;
          const hoverY = orb.y + Math.sin(frameCount * 0.08 + orb.x) * 5;
          ctx.save();
          ctx.fillStyle = '#FACC15';
          ctx.shadowColor = '#FACC15';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(orb.x, hoverY, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFFBEB';
          ctx.beginPath();
          ctx.arc(orb.x - 3, hoverY - 3, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw End-of-Stage Dimensional Portal
        const portalX = levelLength - 90;
        ctx.save();
        ctx.strokeStyle = palette.accentGlow;
        ctx.lineWidth = 6;
        ctx.shadowColor = palette.accentGlow;
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.ellipse(portalX, 335, 32, 62, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
        ctx.fill();
        ctx.restore();

        // Draw Enemies & Boss
        for (const en of enemies) {
          if (en.hp <= 0) continue;
          const ew = en.isBoss ? 58 : 38;
          const eh = en.isBoss ? 68 : 44;

          // Enemy Body
          ctx.fillStyle = en.isBoss ? '#7F1D1D' : '#312E81';
          ctx.fillRect(en.x, en.y, ew, eh);
          ctx.strokeStyle = en.isBoss ? '#F87171' : '#818CF8';
          ctx.lineWidth = 2;
          ctx.strokeRect(en.x, en.y, ew, eh);

          // Glowing Eyes
          ctx.fillStyle = '#FACC15';
          ctx.fillRect(en.x + 8, en.y + 12, 7, 5);
          ctx.fillRect(en.x + ew - 15, en.y + 12, 7, 5);

          // HP Bar above Enemy
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.fillRect(en.x - 4, en.y - 14, ew + 8, 7);
          ctx.fillStyle = en.isBoss ? '#EF4444' : '#10B981';
          ctx.fillRect(
            en.x - 3,
            en.y - 13,
            Math.max(0, ((ew + 6) * en.hp) / en.maxHp),
            5
          );
        }

        // Draw Energy Projectiles (Rasengan / Smash)
        for (const proj of projectiles) {
          ctx.save();
          ctx.fillStyle = palette.accentGlow;
          ctx.shadowColor = palette.accentGlow;
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, proj.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw Animated Hero Character
        ctx.save();
        if (platHero.invuln > 0 && Math.floor(frameCount / 3) % 2 === 0) {
          ctx.globalAlpha = 0.45;
        }
        const hx = platHero.x;
        const hy = platHero.y;

        // Aura Glow
        ctx.shadowColor = palette.accent;
        ctx.shadowBlur = platHero.dashTimer > 0 ? 24 : 10;

        // Flowing Headband / Scarf Tail
        const wave = Math.sin(frameCount * 0.25) * 6;
        ctx.fillStyle = palette.secondary;
        ctx.beginPath();
        ctx.moveTo(hx + 18, hy + 12);
        ctx.lineTo(hx + (platHero.facing === 1 ? -18 : 54), hy + 8 + wave);
        ctx.lineTo(hx + (platHero.facing === 1 ? -14 : 50), hy + 18 + wave);
        ctx.closePath();
        ctx.fill();

        // Hero Torso / Coat
        ctx.fillStyle = palette.heroCoat;
        ctx.fillRect(hx + 6, hy + 16, 24, 22);

        // Hero Head & Spiky Anime Hair
        ctx.fillStyle = '#FDE68A';
        ctx.fillRect(hx + 8, hy + 2, 20, 15);
        ctx.fillStyle = palette.heroHair;
        ctx.beginPath();
        ctx.moveTo(hx + 4, hy + 6);
        ctx.lineTo(hx + 12, hy - 7);
        ctx.lineTo(hx + 18, hy + 2);
        ctx.lineTo(hx + 25, hy - 8);
        ctx.lineTo(hx + 33, hy + 6);
        ctx.closePath();
        ctx.fill();

        // Hero Eyes
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(hx + (platHero.facing === 1 ? 21 : 10), hy + 7, 4, 4);

        // Animated Running Legs
        const legSwing = Math.abs(platHero.vx) > 0.5 ? Math.sin(frameCount * 0.35) * 7 : 0;
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(hx + 8 + legSwing * 0.5, hy + 38, 8, 10);
        ctx.fillRect(hx + 20 - legSwing * 0.5, hy + 38, 8, 10);
        ctx.restore();

        // Draw Particles & Popups in World Space
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.alpha -= pt.decay;
          if (pt.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = pt.alpha;
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        for (let i = popups.length - 1; i >= 0; i--) {
          const pp = popups[i];
          pp.y -= 1.1;
          pp.alpha -= 0.022;
          if (pp.alpha <= 0) {
            popups.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = pp.alpha;
          ctx.font = 'bold 14px "JetBrains Mono", monospace';
          ctx.fillStyle = pp.color;
          ctx.fillText(pp.text, pp.x, pp.y);
          ctx.restore();
        }

        ctx.restore();

        // Sync React HUD every 8 frames
        if (frameCount % 8 === 0) {
          const progressPct = Math.min(100, Math.round((platHero.x / (levelLength - 110)) * 100));
          setHudScore(platHero.score);
          setHudHp(platHero.hp);
          setHudEnergy(platHero.energy);
          setHudLevelOrLap(`Meta: ${progressPct}%`);
          setHudStatusText(`Técnica: ${palette.projectileName}`);
        }
      }

      // ------------------------------------------------------------------------
      // 2. RENDER & UPDATE: PSEUDO-3D TURBO RACING ENGINE
      // ------------------------------------------------------------------------
      else if (activeGenre === 'RACING') {
        const keys = keysRef.current;
        const steerLeft = keys['ArrowLeft'] || keys['KeyA'];
        const steerRight = keys['ArrowRight'] || keys['KeyD'];
        const gasPressed = keys['ArrowUp'] || keys['KeyW'] || true; // Auto-accelerate arcade style
        const nitroPressed = keys['Space'] || keys['ShiftLeft'] || keys['KeyJ'];

        const usingNitro = nitroPressed && racer.nitro > 2;
        if (usingNitro) {
          racer.nitro = Math.max(0, racer.nitro - 0.55);
          racer.speed = Math.min(340, racer.speed + 4.2);
          if (frameCount % 12 === 0) soundFX.playBoost();
        } else {
          if (gasPressed) {
            racer.speed = Math.min(245, racer.speed + 1.8);
          } else {
            racer.speed = Math.max(0, racer.speed - 3);
          }
          if (racer.nitro < 100) racer.nitro = Math.min(100, racer.nitro + 0.18);
        }

        // Road Curvature
        if (frameCount % 180 === 0) {
          const curves = [-0.65, 0, 0.7, -0.45, 0.55, 0];
          racer.targetCurvature = curves[Math.floor(Math.random() * curves.length)];
        }
        racer.curvature += (racer.targetCurvature - racer.curvature) * 0.02;

        // Steering & Centrifugal Drift
        if (steerLeft) racer.playerX -= 0.036;
        if (steerRight) racer.playerX += 0.036;
        racer.playerX -= racer.curvature * (racer.speed / 340) * 0.018;
        racer.playerX = Math.max(-1.35, Math.min(1.35, racer.playerX));

        // Off-road slowdown
        if (Math.abs(racer.playerX) > 0.95) {
          racer.speed *= 0.96;
        }

        const stepDist = racer.speed * 0.05;
        racer.distance += stepDist;
        racer.score += Math.round(stepDist * 0.6);

        // Victory Check
        if (racer.distance >= racer.lapGoal) {
          onEarnBonusPoints(100, `1º Puesto en Gran Prix (${palette.vehicleName})`);
          soundFX.playRewardUnlock();
          setGameStage('VICTORY');
          return;
        }

        // Sky & Horizon Rendering
        const horizonY = H * 0.44;
        const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGrad.addColorStop(0, palette.skyTop);
        skyGrad.addColorStop(1, palette.accent);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, horizonY);

        // Sun & Speed Mountains on Horizon
        ctx.fillStyle = '#FEF08A';
        ctx.beginPath();
        ctx.arc(W * 0.5 - racer.curvature * 140, horizonY - 22, 48, Math.PI, 0);
        ctx.fill();

        // Draw Pseudo-3D Scanline Road Segments from Horizon to Bottom
        for (let y = Math.floor(horizonY); y < H; y += 3) {
          const perspective = (y - horizonY) / (H - horizonY); // 0 at horizon, 1 at bottom
          const z = 1 / Math.max(0.02, perspective);
          const roadHalfWidth = 42 + perspective * 370;
          const curveOffset = Math.pow(1 - perspective, 2) * racer.curvature * 260;
          const roadCenterX = W * 0.5 + curveOffset - racer.playerX * perspective * 230;

          const stripePhase = Math.floor((racer.distance * 0.25 + z * 6) % 2);

          // Grass / Shoulder
          ctx.fillStyle = stripePhase === 0 ? '#064E3B' : '#047857';
          ctx.fillRect(0, y, W, 3);

          // Rumble Strips
          ctx.fillStyle = stripePhase === 0 ? palette.accent : '#F8FAFC';
          ctx.fillRect(roadCenterX - roadHalfWidth - 18 * perspective, y, roadHalfWidth * 2 + 36 * perspective, 3);

          // Asphalt Road
          ctx.fillStyle = stripePhase === 0 ? '#1E293B' : '#334155';
          ctx.fillRect(roadCenterX - roadHalfWidth, y, roadHalfWidth * 2, 3);

          // Center Dashed Line
          if (stripePhase === 0) {
            ctx.fillStyle = '#FACC15';
            ctx.fillRect(roadCenterX - 5 * perspective, y, 10 * perspective, 3);
          }
        }

        // Update & Draw Track Items (Boost Pads & Orbs)
        for (const item of racer.items) {
          const relZ = ((item.z - (racer.distance % 3600) + 3600) % 3600);
          if (relZ > 5 && relZ < 260) {
            const p = 1 - relZ / 260;
            const sy = horizonY + p * (H - horizonY);
            const roadHalfWidth = 42 + p * 370;
            const curveOffset = Math.pow(1 - p, 2) * racer.curvature * 260;
            const roadCenterX = W * 0.5 + curveOffset - racer.playerX * p * 230;
            const sx = roadCenterX + item.lane * roadHalfWidth;
            const size = Math.max(6, p * 28);

            ctx.save();
            ctx.fillStyle = item.kind === 'BOOST' ? '#38BDF8' : '#FACC15';
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Pickup check near player car
            if (relZ < 24 && Math.abs(item.lane - racer.playerX * 0.65) < 0.35) {
              if (item.kind === 'BOOST') {
                racer.speed = 335;
                racer.nitro = Math.min(100, racer.nitro + 25);
                soundFX.playBoost();
              } else {
                racer.score += 120;
                soundFX.playCoin();
              }
              item.z += 400;
            }
          }
        }

        // Update & Draw Rival Racers
        let playerRank = 1;
        for (const rv of racer.rivals) {
          rv.z += (rv.speed - racer.speed) * 0.045;
          if (rv.z < -80) rv.z = 650;
          if (rv.z > 0) playerRank++;

          if (rv.z > 5 && rv.z < 260) {
            const p = 1 - rv.z / 260;
            const sy = horizonY + p * (H - horizonY);
            const roadHalfWidth = 42 + p * 370;
            const curveOffset = Math.pow(1 - p, 2) * racer.curvature * 260;
            const roadCenterX = W * 0.5 + curveOffset - racer.playerX * p * 230;
            const sx = roadCenterX + rv.lane * roadHalfWidth;
            const cw = Math.max(14, p * 74);
            const ch = Math.max(10, p * 42);

            ctx.fillStyle = rv.color;
            ctx.fillRect(sx - cw / 2, sy - ch, cw, ch);
            ctx.fillStyle = '#F8FAFC';
            ctx.fillRect(sx - cw * 0.3, sy - ch * 0.85, cw * 0.6, ch * 0.35);
          }
        }

        // Draw Player Super-Vehicle at Bottom Center
        const carX = W * 0.5;
        const carY = H - 62;
        const tilt = steerLeft ? -0.08 : steerRight ? 0.08 : 0;

        ctx.save();
        ctx.translate(carX, carY);
        ctx.rotate(tilt);

        // Vehicle Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(-52, 22, 104, 14);

        // Rear Tires
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(-54, 4, 20, 24);
        ctx.fillRect(34, 4, 20, 24);

        // Aerodynamic Chassis
        ctx.fillStyle = palette.heroCoat;
        ctx.beginPath();
        ctx.moveTo(-44, 24);
        ctx.lineTo(-32, -16);
        ctx.lineTo(32, -16);
        ctx.lineTo(44, 24);
        ctx.closePath();
        ctx.fill();

        // Cockpit Canopy
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.moveTo(-20, -14);
        ctx.lineTo(-12, -30);
        ctx.lineTo(12, -30);
        ctx.lineTo(20, -14);
        ctx.closePath();
        ctx.fill();

        // Rear Spoiler Wing
        ctx.fillStyle = palette.secondary;
        ctx.fillRect(-48, -6, 96, 7);

        // Twin Nitro Exhaust Flames
        const flameLen = usingNitro ? 28 + Math.random() * 18 : 10 + Math.random() * 6;
        ctx.fillStyle = usingNitro ? '#38BDF8' : '#F97316';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(-22, 22);
        ctx.lineTo(-14, 22 + flameLen);
        ctx.lineTo(-6, 22);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(6, 22);
        ctx.lineTo(14, 22 + flameLen);
        ctx.lineTo(22, 22);
        ctx.fill();
        ctx.restore();

        // Sync HUD
        if (frameCount % 6 === 0) {
          const pct = Math.min(100, Math.round((racer.distance / racer.lapGoal) * 100));
          setHudScore(racer.score);
          setHudHp(Math.round(racer.speed)); // Display speed in KM/H
          setHudEnergy(Math.round(racer.nitro));
          setHudLevelOrLap(`Posición: ${playerRank}º / 5 · Circuito ${pct}%`);
          setHudStatusText(`${palette.vehicleName} · ${Math.round(racer.speed)} KM/H`);
        }
      }

      // ------------------------------------------------------------------------
      // 3. RENDER & UPDATE: TOP-DOWN 2.5D ACTION RPG & DUNGEON EXPLORER
      // ------------------------------------------------------------------------
      else if (activeGenre === 'RPG_ADVENTURE') {
        const keys = keysRef.current;
        const up = keys['ArrowUp'] || keys['KeyW'];
        const down = keys['ArrowDown'] || keys['KeyS'];
        const left = keys['ArrowLeft'] || keys['KeyA'];
        const right = keys['ArrowRight'] || keys['KeyD'];
        const slash = keys['Space'] || keys['KeyJ'] || keys['Enter'];
        const nova = keys['KeyK'] || keys['KeyQ'];

        const spd = 3.8;
        rpg.vx = (right ? spd : 0) - (left ? spd : 0);
        rpg.vy = (down ? spd : 0) - (up ? spd : 0);
        if (rpg.vx !== 0 || rpg.vy !== 0) {
          const len = Math.hypot(rpg.vx, rpg.vy);
          rpg.facingX = rpg.vx / len;
          rpg.facingY = rpg.vy / len;
        }

        rpg.x = Math.max(36, Math.min(W - 36, rpg.x + rpg.vx));
        rpg.y = Math.max(46, Math.min(H - 36, rpg.y + rpg.vy));

        if (rpg.slashCooldown > 0) rpg.slashCooldown--;
        if (rpg.slashTimer > 0) rpg.slashTimer--;
        if (rpg.novaTimer > 0) rpg.novaTimer--;
        if (frameCount % 8 === 0 && rpg.mana < 100) rpg.mana = Math.min(100, rpg.mana + 1);

        // Melee Sword / Kunai Slash Attack
        if (slash && rpg.slashCooldown <= 0) {
          rpg.slashTimer = 12;
          rpg.slashCooldown = 20;
          soundFX.playAttack();
          const hitX = rpg.x + rpg.facingX * 44;
          const hitY = rpg.y + rpg.facingY * 44;
          spawnParticles(hitX, hitY, palette.accentGlow, 14, 5);

          for (const mob of rpg.mobs) {
            if (mob.hp <= 0) continue;
            if (Math.hypot(mob.x - hitX, mob.y - hitY) < 62) {
              const dmg = 28 + rpg.level * 8;
              mob.hp -= dmg;
              soundFX.playGameHit(true);
              spawnPopup(`-${dmg} ¡CRÍTICO!`, mob.x - 20, mob.y - 25, '#FACC15');
              if (mob.hp <= 0) {
                rpg.score += mob.isBoss ? 500 : 140;
                rpg.xp += 60;
                if (rpg.xp >= 100) {
                  rpg.level++;
                  rpg.xp = 0;
                  rpg.hp = rpg.maxHp;
                  spawnPopup(`¡SUBES A NIVEL ${rpg.level}!`, rpg.x - 40, rpg.y - 40, '#4ADE80');
                  soundFX.playRewardUnlock();
                }
              }
            }
          }
        }

        // Ultimate Area Nova Attack (K / Q)
        if (nova && rpg.novaTimer <= 0 && rpg.mana >= 45) {
          rpg.novaTimer = 22;
          rpg.mana -= 45;
          soundFX.playBoost();
          spawnParticles(rpg.x, rpg.y, palette.secondary, 34, 8);
          for (const mob of rpg.mobs) {
            if (mob.hp <= 0) continue;
            if (Math.hypot(mob.x - rpg.x, mob.y - rpg.y) < 155) {
              const dmg = 65 + rpg.level * 12;
              mob.hp -= dmg;
              spawnPopup(`-${dmg} ¡NOVA!`, mob.x - 20, mob.y - 30, '#38BDF8');
              if (mob.hp <= 0) {
                rpg.score += mob.isBoss ? 500 : 140;
                rpg.xp += 60;
              }
            }
          }
        }

        // Open Treasure Chests
        for (const ch of rpg.chests) {
          if (!ch.opened && Math.hypot(rpg.x - ch.x, rpg.y - ch.y) < 38) {
            ch.opened = true;
            rpg.score += 150;
            rpg.hp = Math.min(rpg.maxHp, rpg.hp + 35);
            soundFX.playCoin();
            spawnParticles(ch.x, ch.y, '#FACC15', 22, 5);
            spawnPopup(`¡COFRE: ${ch.reward}!`, ch.x - 60, ch.y - 20, '#FDE047');
          }
        }

        // Check if all mobs & Boss defeated
        if (rpg.mobs.every((m) => m.hp <= 0)) {
          onEarnBonusPoints(110, `Mazmorra RPG Completada (${world.name})`);
          soundFX.playRewardUnlock();
          setGameStage('VICTORY');
          return;
        }

        // --- DRAW 2.5D RPG TILEMAP & TEMPLE ARENA ---
        ctx.fillStyle = '#14532D';
        ctx.fillRect(0, 0, W, H);

        // Stone Tile Grid
        for (let gx = 0; gx < W; gx += 48) {
          for (let gy = 0; gy < H; gy += 48) {
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.strokeRect(gx, gy, 48, 48);
          }
        }

        // Boss Sanctuary Stone Floor on the Right
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(620, 60, 260, 360);
        ctx.strokeStyle = palette.accent;
        ctx.lineWidth = 3;
        ctx.strokeRect(620, 60, 260, 360);

        // Glowing Magic Circle in Boss Sanctuary
        ctx.save();
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(750, 240, 72 + Math.sin(frameCount * 0.05) * 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Draw Treasure Chests
        for (const ch of rpg.chests) {
          ctx.fillStyle = ch.opened ? '#475569' : '#D97706';
          ctx.fillRect(ch.x - 16, ch.y - 12, 32, 24);
          ctx.strokeStyle = '#FEF08A';
          ctx.lineWidth = 2;
          ctx.strokeRect(ch.x - 16, ch.y - 12, 32, 24);
        }

        // Update & Draw Roaming Monsters & Boss
        for (const mob of rpg.mobs) {
          if (mob.hp <= 0) continue;
          const dist = Math.hypot(rpg.x - mob.x, rpg.y - mob.y);
          if (dist < 240 && dist > 26) {
            mob.x += ((rpg.x - mob.x) / dist) * (mob.isBoss ? 1.15 : 1.45);
            mob.y += ((rpg.y - mob.y) / dist) * (mob.isBoss ? 1.15 : 1.45);
          }
          if (dist <= 30 && frameCount % 35 === 0) {
            rpg.hp = Math.max(0, rpg.hp - (mob.isBoss ? 18 : 10));
            soundFX.playGameHit(false);
            spawnPopup(mob.isBoss ? '-18 PS' : '-10 PS', rpg.x, rpg.y - 24, '#F87171');
            if (rpg.hp <= 0) {
              setGameStage('GAME_OVER');
              return;
            }
          }

          const r = mob.isBoss ? 32 : 20;
          ctx.save();
          ctx.fillStyle = mob.isBoss ? '#991B1B' : '#4C1D95';
          ctx.shadowColor = mob.isBoss ? '#EF4444' : '#A855F7';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(mob.x, mob.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Mob HP Bar
          ctx.fillStyle = 'rgba(0,0,0,0.75)';
          ctx.fillRect(mob.x - r, mob.y - r - 14, r * 2, 6);
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(mob.x - r, mob.y - r - 14, (r * 2 * mob.hp) / mob.maxHp, 6);
          ctx.restore();
        }

        // Draw Ultimate Nova Shockwave if active
        if (rpg.novaTimer > 0) {
          ctx.save();
          ctx.strokeStyle = palette.accentGlow;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(rpg.x, rpg.y, (22 - rpg.novaTimer) * 7, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Draw RPG Hero & Sword Slash Arc
        ctx.save();
        ctx.fillStyle = palette.heroCoat;
        ctx.shadowColor = palette.accent;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(rpg.x, rpg.y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = palette.heroHair;
        ctx.beginPath();
        ctx.arc(rpg.x, rpg.y - 5, 13, 0, Math.PI * 2);
        ctx.fill();

        if (rpg.slashTimer > 0) {
          const angle = Math.atan2(rpg.facingY, rpg.facingX);
          ctx.strokeStyle = '#FEF08A';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(rpg.x, rpg.y, 44, angle - 0.85, angle + 0.85);
          ctx.stroke();
        }
        ctx.restore();

        // Draw Particles & Popups
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.alpha -= pt.decay;
          if (pt.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = pt.alpha;
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        for (let i = popups.length - 1; i >= 0; i--) {
          const pp = popups[i];
          pp.y -= 1;
          pp.alpha -= 0.02;
          if (pp.alpha <= 0) {
            popups.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = pp.alpha;
          ctx.font = 'bold 13px "JetBrains Mono", monospace';
          ctx.fillStyle = pp.color;
          ctx.fillText(pp.text, pp.x, pp.y);
          ctx.restore();
        }

        if (frameCount % 8 === 0) {
          const remaining = rpg.mobs.filter((m) => m.hp > 0).length;
          setHudScore(rpg.score);
          setHudHp(Math.round((rpg.hp / rpg.maxHp) * 100));
          setHudEnergy(rpg.mana);
          setHudLevelOrLap(`Nivel RPG ${rpg.level} · Enemigos: ${remaining}`);
          setHudStatusText(`Explora cofres y derrota a ${palette.bossName}`);
        }
      }

      // ------------------------------------------------------------------------
      // 4. RENDER: CINEMATIC TURN-BASED RPG ARENA CANVAS
      // ------------------------------------------------------------------------
      else if (activeGenre === 'TACTICAL_RPG') {
        const anim = tacticalAnimRef.current;
        if (anim.heroLunge > 0) anim.heroLunge = Math.max(0, anim.heroLunge - 4);
        if (anim.bossLunge > 0) anim.bossLunge = Math.max(0, anim.bossLunge - 4);
        if (anim.shake > 0) anim.shake = Math.max(0, anim.shake - 1);

        ctx.save();
        if (anim.shake > 0) {
          ctx.translate((Math.random() - 0.5) * anim.shake * 2, (Math.random() - 0.5) * anim.shake * 2);
        }

        // Arena Sky & Floor
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0, palette.skyTop);
        bgGrad.addColorStop(0.65, palette.skyBottom);
        bgGrad.addColorStop(1, '#090D16');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Glowing Battle Floor Grid
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(230, 360, 120, 34, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(680, 340, 140, 40, 0, 0, Math.PI * 2);
        ctx.stroke();

        const breath = Math.sin(frameCount * 0.07) * 5;

        // Draw Hero Fighter on Left Platform
        const hx = 210 + anim.heroLunge;
        const hy = 250 + breath;
        ctx.save();
        ctx.shadowColor = palette.accentGlow;
        ctx.shadowBlur = 22;
        ctx.fillStyle = palette.heroCoat;
        ctx.fillRect(hx - 28, hy, 56, 95);
        ctx.fillStyle = palette.heroHair;
        ctx.beginPath();
        ctx.arc(hx, hy - 22, 26, 0, Math.PI * 2);
        ctx.fill();

        // Weapon / Energy Orb in Hero's Hand
        ctx.fillStyle = palette.accentGlow;
        ctx.beginPath();
        ctx.arc(hx + 42, hy + 30, 16 + Math.sin(frameCount * 0.15) * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw Boss Titan on Right Platform
        const bx = 670 - anim.bossLunge;
        const by = 190 - breath;
        ctx.save();
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 28;
        ctx.fillStyle = '#7F1D1D';
        ctx.beginPath();
        ctx.arc(bx, by + 65, 74, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FACC15';
        ctx.fillRect(bx - 30, by + 40, 18, 10);
        ctx.fillRect(bx + 12, by + 40, 18, 10);
        ctx.restore();

        // Floating Damage Texts
        for (let i = anim.floatingText.length - 1; i >= 0; i--) {
          const ft = anim.floatingText[i];
          ft.y -= 1.2;
          ft.alpha -= 0.02;
          if (ft.alpha <= 0) {
            anim.floatingText.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = ft.alpha;
          ctx.font = 'bold 20px "JetBrains Mono", monospace';
          ctx.fillStyle = ft.color;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeGenre, gameStage, palette, world.name, onEarnBonusPoints]);

  // ============================================================================
  // TACTICAL RPG TURN-BASED HANDLER (GENRE 4)
  // ============================================================================
  const executeTacticalSkill = useCallback(
    (skillType: 'LIGHT' | 'HEAVY' | 'SHIELD_HEAL' | 'ULTIMATE') => {
      if (tacticalTurn !== 'PLAYER' || gameStage !== 'PLAYING') return;

      const anim = tacticalAnimRef.current;
      let dmg = 0;
      let logMsg = '';

      if (skillType === 'LIGHT') {
        dmg = 34 + Math.floor(Math.random() * 10);
        setTacticalHeroMp((mp) => Math.min(100, mp + 15));
        setTacticalLimitGauge((lg) => Math.min(100, lg + 25));
        logMsg = `Ejecutas ${palette.projectileName}: ¡-${dmg} PS al jefe y recargas +15 Energía!`;
        soundFX.playAttack();
      } else if (skillType === 'HEAVY') {
        if (tacticalHeroMp < 30) return;
        dmg = 58 + Math.floor(Math.random() * 14);
        setTacticalHeroMp((mp) => mp - 30);
        setTacticalLimitGauge((lg) => Math.min(100, lg + 35));
        logMsg = `Combo Elemental Crítico: ¡-${dmg} PS a ${palette.bossName}!`;
        soundFX.playBoost();
      } else if (skillType === 'SHIELD_HEAL') {
        if (tacticalHeroMp < 20) return;
        setTacticalHeroMp((mp) => mp - 20);
        setTacticalHeroHp((hp) => Math.min(120, hp + 45));
        setTacticalShield(true);
        anim.floatingText.push({
          text: '+45 PS & ESCUDO',
          x: 170,
          y: 220,
          color: '#4ADE80',
          alpha: 1,
        });
        logMsg = 'Activas Barrera de Enfoque: recuperas +45 PS y bloqueas el próximo golpe.';
        soundFX.playCoin();
      } else if (skillType === 'ULTIMATE') {
        if (tacticalLimitGauge < 100) return;
        dmg = 115;
        setTacticalLimitGauge(0);
        logMsg = `¡DESATAS ${palette.ultimateName.toUpperCase()}! ¡Daño devastador de -${dmg} PS!`;
        soundFX.playRewardUnlock();
      }

      if (dmg > 0) {
        anim.heroLunge = 95;
        anim.shake = skillType === 'ULTIMATE' ? 14 : 7;
        anim.floatingText.push({
          text: `-${dmg} PS!`,
          x: 620,
          y: 180,
          color: skillType === 'ULTIMATE' ? '#38BDF8' : '#FACC15',
          alpha: 1,
        });
      }

      const nextBossHp = Math.max(0, tacticalBossHp - dmg);
      setTacticalBossHp(nextBossHp);
      setHudScore((s) => s + dmg * 5);
      setTacticalLog(logMsg);

      if (nextBossHp <= 0) {
        if (tacticalWave < 2) {
          setTacticalWave(2);
          setTacticalBossMaxHp(240);
          setTacticalBossHp(240);
          setTacticalLog(`¡Oleada 1 superada! Aparece la Forma Final de ${palette.bossName} (240 PS).`);
          onEarnBonusPoints(50, 'Oleada 1 superada en Coliseo RPG');
          return;
        } else {
          onEarnBonusPoints(120, `Victoria en Coliseo RPG (${world.name})`);
          soundFX.playRewardUnlock();
          setGameStage('VICTORY');
          return;
        }
      }

      // Boss Counterattack Turn after 650ms
      setTacticalTurn('BOSS');
      window.setTimeout(() => {
        const rawBossDmg = 24 + Math.floor(Math.random() * 14);
        const actualDmg = tacticalShield ? Math.round(rawBossDmg * 0.3) : rawBossDmg;
        tacticalAnimRef.current.bossLunge = 85;
        tacticalAnimRef.current.shake = 6;
        tacticalAnimRef.current.floatingText.push({
          text: `-${actualDmg} PS`,
          x: 190,
          y: 230,
          color: '#F87171',
          alpha: 1,
        });
        soundFX.playGameHit(false);
        setTacticalShield(false);
        setTacticalHeroHp((prev) => {
          const nextHp = Math.max(0, prev - actualDmg);
          if (nextHp <= 0) {
            setGameStage('GAME_OVER');
          }
          return nextHp;
        });
        setTacticalLog(
          `${palette.bossName} contraataca (-${actualDmg} PS). ¡Es tu turno!`
        );
        setTacticalTurn('PLAYER');
      }, 650);
    },
    [
      tacticalTurn,
      gameStage,
      tacticalHeroMp,
      tacticalLimitGauge,
      tacticalBossHp,
      tacticalWave,
      tacticalShield,
      palette,
      world.name,
      onEarnBonusPoints,
    ]
  );

  const displayedShopItems =
    shopFilter === 'ALL'
      ? shopItems
      : shopItems.filter((item) => item.animeTheme === shopFilter);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-10">
      {/* =====================================================================
          1. CONSOLA DE VIDEOJUEGOS ANIME 60 FPS (PLATAFORMAS, CARRERAS, RPG, TÁCTICO)
          ===================================================================== */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Motor Gráfico HTML5 Canvas a 60 FPS · IES Clot del Moro · Duración Juego = {studyRatioX} × Tiempo de Estudio
            </p>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Centro de Videojuegos Anime: Plataformas, Carreras 3D y RPG
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums">
            <div className="px-3.5 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-semibold">
              Puntos de Estudio: {studyPoints} PE
            </div>
            <div className="px-3.5 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-semibold">
              Tiempo de Juego Acumulado: {breakMinutes} min
            </div>
          </div>
        </div>

        {/* Selector of Anime Universe */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              1. Elige el Universo Anime que adapta los gráficos, poderes y jefes del videojuego:
            </label>
            <button
              type="button"
              onClick={() => setIsCustomEditing((prev) => !prev)}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
            >
              {isCustomEditing ? 'Cerrar personalización' : '+ Escribir otro Manga/Anime favorito'}
            </button>
          </div>

          {isCustomEditing && (
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={customMangaName}
                onChange={(e) => setCustomMangaName(e.target.value)}
                placeholder="Ej. Dragon Ball Z, Jujutsu Kaisen, Kimetsu no Yaiba, Solo Leveling..."
                className="w-full sm:flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
              />
              <span className="text-xs text-stone-500 dark:text-stone-400">
                El motor gráfico adaptará los nombres de las misiones a tu anime elegido.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {(['NARUTO', 'HEROES', 'PIRATES', 'ALCHEMIST'] as AnimeWorldId[]).map((wId) => {
              const wObj = ANIME_WORLDS[wId];
              const isSelected = selectedWorld === wId;
              return (
                <button
                  key={wId}
                  type="button"
                  onClick={() => onSelectWorld(wId)}
                  className={`text-left rounded-xl border overflow-hidden transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 dark:border-amber-400 ring-2 ring-amber-500/20 bg-amber-50/40 dark:bg-stone-800'
                      : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 hover:border-stone-300'
                  }`}
                >
                  <AnimeWorldIllustration worldId={wId} className="w-full h-24 rounded-none" />
                  <div className="p-3">
                    <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                      {wObj.mangaInspiration}
                    </div>
                    <div className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                      {wObj.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selector of the 4 Video Game Genres */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
            2. Selecciona el Género de Videojuego:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'PLATFORMER' as VideoGameGenre,
                title: 'Plataformas y Acción 2D',
                subtitle: 'Doble salto, Dash, trampolines, proyectiles y portal final',
                icon: Zap,
              },
              {
                id: 'RACING' as VideoGameGenre,
                title: 'Carreras Arcade 3D Turbo',
                subtitle: 'Pista pseudo-3D a 340 km/h, curvas, rivales y Nitro',
                icon: Gauge,
              },
              {
                id: 'RPG_ADVENTURE' as VideoGameGenre,
                title: 'Aventura RPG Mundo Abierto',
                subtitle: 'Explora mazmorras, abre cofres, sube de nivel y derrota al Jefe',
                icon: Compass,
              },
              {
                id: 'TACTICAL_RPG' as VideoGameGenre,
                title: 'Coliseo RPG por Turnos',
                subtitle: 'Batalla cinemática con combos, escudos y ataque definitivo',
                icon: Swords,
              },
            ].map((g) => {
              const Icon = g.icon;
              const active = activeGenre === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleSelectGenre(g.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    active
                      ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                      : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 hover:border-amber-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-amber-600 dark:text-amber-400'}`} />
                    <span className="text-[11px] font-mono uppercase">60 FPS Canvas</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">{g.title}</div>
                    <p className={`text-xs mt-0.5 ${active ? 'text-amber-100' : 'text-stone-500 dark:text-stone-400'}`}>
                      {g.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            VIDEO GAME VIEWPORT (CANVAS + HUD OVERLAY + TOUCH/KEYBOARD CONTROLS)
            =================================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-stone-800 bg-stone-950 text-white shadow-xl">
          {/* Top Arcade HUD Bar */}
          <div className="px-5 py-3 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono tabular-nums">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                {customMangaName.trim() || world.name}
              </span>
              <span className="text-stone-300 font-semibold">{hudLevelOrLap}</span>
              <span className="hidden sm:inline text-stone-400">· {hudStatusText}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-amber-400 font-bold">SCORE: {hudScore}</span>
              <span className="text-emerald-400 font-bold">
                {activeGenre === 'RACING' ? `VEL: ${hudHp} KM/H` : `PS: ${hudHp}%`}
              </span>
              <span className="text-sky-400 font-bold">
                {activeGenre === 'RACING' ? `NITRO: ${hudEnergy}%` : `ENERGÍA: ${hudEnergy}%`}
              </span>
              <span className="flex items-center gap-1 text-stone-300">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                {formatTimer(breakCountdownSec)}
              </span>
              {gameStage === 'PLAYING' && (
                <button
                  type="button"
                  onClick={() => setGameStage('PAUSED')}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1"
                >
                  <Pause className="w-3 h-3" /> Pausa
                </button>
              )}
            </div>
          </div>

          {/* Main Canvas Stage */}
          <div className="relative w-full aspect-[16/9] max-h-[520px] bg-stone-950 flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={920}
              height={480}
              className="w-full h-full object-contain block"
            />

            {/* OVERLAY 1: TITLE MENU */}
            {gameStage === 'TITLE_MENU' && (
              <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-5">
                <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold">
                  MOTOR GRÁFICO 60 FPS · {customMangaName.trim() || world.name}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-xl">
                  {activeGenre === 'PLATFORMER' && 'Crónicas de Acción y Plataformas 2D'}
                  {activeGenre === 'RACING' && `Gran Prix Turbo 3D: ${palette.vehicleName}`}
                  {activeGenre === 'RPG_ADVENTURE' && 'Odisea RPG: Mazmorra y Jefes en Tiempo Real'}
                  {activeGenre === 'TACTICAL_RPG' && `Coliseo RPG por Turnos vs ${palette.bossName}`}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                  {activeGenre === 'PLATFORMER' &&
                    `Corre y haz doble salto entre plataformas móviles, usa muelles de impulso, lanza ${palette.projectileName} con [J] o [Espacio] y alcanza el portal dimensional al final del nivel.`}
                  {activeGenre === 'RACING' &&
                    'Toma las curvas a más de 300 km/h con [A/D] o las flechas [←/→], recoge células de energía en el asfalto y pulsa [Espacio] para activar el Nitro Turbo.'}
                  {activeGenre === 'RPG_ADVENTURE' &&
                    `Explora el santuario en 2.5D con [WASD] o flechas, abre los 3 cofres legendarios, ataca con tu espada [Espacio/J] o desata la Nova Elemental [K] para vencer a ${palette.bossName}.`}
                  {activeGenre === 'TACTICAL_RPG' &&
                    'Combate estratégico por turnos con animaciones cinemáticas, escudos de concentración y barra de límite al 100%.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleLaunchVideoGame(false)}
                    className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Jugar Ahora (Modo Libre / Demo 60 FPS)
                  </button>

                  {breakMinutes > 0 && (
                    <button
                      type="button"
                      onClick={() => handleLaunchVideoGame(true)}
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      Usar 1 min de Recompensa ({breakMinutes} min disp.)
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* OVERLAY 2: PAUSED */}
            {gameStage === 'PAUSED' && (
              <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">Juego en Pausa</h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGameStage('PLAYING')}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
                  >
                    Reanudar Partida
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameStage('TITLE_MENU')}
                    className="px-5 py-2.5 rounded-xl border border-stone-600 text-stone-200 text-xs font-semibold"
                  >
                    Salir al Menú
                  </button>
                </div>
              </div>
            )}

            {/* OVERLAY 3: VICTORY / GAME OVER */}
            {(gameStage === 'VICTORY' || gameStage === 'GAME_OVER') && (
              <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
                <Trophy
                  className={`w-12 h-12 ${
                    gameStage === 'VICTORY' ? 'text-amber-400' : 'text-rose-400'
                  }`}
                />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {gameStage === 'VICTORY'
                    ? '¡Misión Completada con Éxito!'
                    : '¡Has caído en combate!'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md font-mono">
                  Puntuación obtenida: <strong>{hudScore} PTS</strong> · Universo:{' '}
                  <strong>{customMangaName.trim() || world.name}</strong>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleLaunchVideoGame(false)}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Volver a Jugar
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameStage('TITLE_MENU')}
                    className="px-5 py-2.5 rounded-xl border border-stone-700 text-stone-300 text-xs font-semibold"
                  >
                    Cambiar de Videojuego
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Interactive Controls Deck (On-Screen Gamepad + Tactical RPG Command Deck) */}
          <div className="p-4 bg-stone-900 border-t border-stone-800">
            {activeGenre === 'TACTICAL_RPG' && gameStage === 'PLAYING' ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-amber-300">{tacticalLog}</span>
                  <span className="text-stone-400">
                    Héroe: {tacticalHeroHp}/120 PS · Energía: {tacticalHeroMp}/100 · Límite:{' '}
                    {tacticalLimitGauge}% | Jefe (Oleada {tacticalWave}/2): {tacticalBossHp}/
                    {tacticalBossMaxHp} PS
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    disabled={tacticalTurn !== 'PLAYER'}
                    onClick={() => executeTacticalSkill('LIGHT')}
                    className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 border border-stone-700 text-left transition-colors"
                  >
                    <div className="text-xs font-bold text-amber-400">
                      1. {palette.projectileName}
                    </div>
                    <div className="text-[11px] text-stone-300 font-mono mt-0.5">
                      Daño rápido · +15 Energía
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={tacticalTurn !== 'PLAYER' || tacticalHeroMp < 30}
                    onClick={() => executeTacticalSkill('HEAVY')}
                    className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 border border-stone-700 text-left transition-colors"
                  >
                    <div className="text-xs font-bold text-sky-400">2. Combo Elemental</div>
                    <div className="text-[11px] text-stone-300 font-mono mt-0.5">
                      ~65 Daño · Coste: 30 Energía
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={tacticalTurn !== 'PLAYER' || tacticalHeroMp < 20}
                    onClick={() => executeTacticalSkill('SHIELD_HEAL')}
                    className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 border border-stone-700 text-left transition-colors"
                  >
                    <div className="text-xs font-bold text-emerald-400">
                      3. Barrera + Curación
                    </div>
                    <div className="text-[11px] text-stone-300 font-mono mt-0.5">
                      +45 PS & Escudo · 20 Energía
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={tacticalTurn !== 'PLAYER' || tacticalLimitGauge < 100}
                    onClick={() => executeTacticalSkill('ULTIMATE')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tacticalLimitGauge >= 100
                        ? 'bg-amber-600 hover:bg-amber-500 border-amber-400 text-white'
                        : 'bg-stone-800/50 border-stone-800 text-stone-500 opacity-50'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> 4. Definitivo ({tacticalLimitGauge}%)
                    </div>
                    <div className="text-[11px] font-mono mt-0.5 truncate">
                      {palette.ultimateName} (-115 PS)
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              /* Touch / Mouse On-Screen Arcade Controls + Keyboard Legend */
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onMouseDown={() => setVirtualKey('ArrowLeft', true)}
                    onMouseUp={() => setVirtualKey('ArrowLeft', false)}
                    onTouchStart={() => setVirtualKey('ArrowLeft', true)}
                    onTouchEnd={() => setVirtualKey('ArrowLeft', false)}
                    className="px-3.5 py-2 rounded-lg bg-stone-800 active:bg-amber-600 text-xs font-mono font-bold select-none"
                  >
                    ← Izq (A)
                  </button>
                  <button
                    type="button"
                    onMouseDown={() => setVirtualKey('ArrowRight', true)}
                    onMouseUp={() => setVirtualKey('ArrowRight', false)}
                    onTouchStart={() => setVirtualKey('ArrowRight', true)}
                    onTouchEnd={() => setVirtualKey('ArrowRight', false)}
                    className="px-3.5 py-2 rounded-lg bg-stone-800 active:bg-amber-600 text-xs font-mono font-bold select-none"
                  >
                    Der (D) →
                  </button>
                  {activeGenre === 'RPG_ADVENTURE' && (
                    <>
                      <button
                        type="button"
                        onMouseDown={() => setVirtualKey('ArrowUp', true)}
                        onMouseUp={() => setVirtualKey('ArrowUp', false)}
                        onTouchStart={() => setVirtualKey('ArrowUp', true)}
                        onTouchEnd={() => setVirtualKey('ArrowUp', false)}
                        className="px-3.5 py-2 rounded-lg bg-stone-800 active:bg-amber-600 text-xs font-mono font-bold select-none"
                      >
                        ↑ Arriba (W)
                      </button>
                      <button
                        type="button"
                        onMouseDown={() => setVirtualKey('ArrowDown', true)}
                        onMouseUp={() => setVirtualKey('ArrowDown', false)}
                        onTouchStart={() => setVirtualKey('ArrowDown', true)}
                        onTouchEnd={() => setVirtualKey('ArrowDown', false)}
                        className="px-3.5 py-2 rounded-lg bg-stone-800 active:bg-amber-600 text-xs font-mono font-bold select-none"
                      >
                        ↓ Abajo (S)
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {activeGenre === 'PLATFORMER' && (
                    <>
                      <button
                        type="button"
                        onMouseDown={() => setVirtualKey('Space', true)}
                        onMouseUp={() => setVirtualKey('Space', false)}
                        onTouchStart={() => setVirtualKey('Space', true)}
                        onTouchEnd={() => setVirtualKey('Space', false)}
                        className="px-4 py-2 rounded-lg bg-amber-600 active:bg-amber-500 text-xs font-mono font-bold select-none"
                      >
                        ↑ Saltar / Doble Salto (W / Espacio)
                      </button>
                      <button
                        type="button"
                        onMouseDown={() => setVirtualKey('KeyJ', true)}
                        onMouseUp={() => setVirtualKey('KeyJ', false)}
                        onTouchStart={() => setVirtualKey('KeyJ', true)}
                        onTouchEnd={() => setVirtualKey('KeyJ', false)}
                        className="px-4 py-2 rounded-lg bg-sky-600 active:bg-sky-500 text-xs font-mono font-bold select-none"
                      >
                        ⚡ Disparar {palette.projectileName} (J)
                      </button>
                      <button
                        type="button"
                        onMouseDown={() => setVirtualKey('KeyK', true)}
                        onMouseUp={() => setVirtualKey('KeyK', false)}
                        onTouchStart={() => setVirtualKey('KeyK', true)}
                        onTouchEnd={() => setVirtualKey('KeyK', false)}
                        className="px-3.5 py-2 rounded-lg bg-emerald-700 active:bg-emerald-600 text-xs font-mono font-bold select-none"
                      >
                        Dash (Shift / K)
                      </button>
                    </>
                  )}

                  {activeGenre === 'RACING' && (
                    <button
                      type="button"
                      onMouseDown={() => setVirtualKey('Space', true)}
                      onMouseUp={() => setVirtualKey('Space', false)}
                      onTouchStart={() => setVirtualKey('Space', true)}
                      onTouchEnd={() => setVirtualKey('Space', false)}
                      className="px-5 py-2 rounded-lg bg-sky-600 active:bg-sky-500 text-xs font-mono font-bold select-none"
                    >
                      🔥 Activar NITRO TURBO (Espacio / J)
                    </button>
                  )}

                  {activeGenre === 'RPG_ADVENTURE' && (
                    <>
                      <button
                        type="button"
                        onMouseDown={() => setVirtualKey('Space', true)}
                        onMouseUp={() => setVirtualKey('Space', false)}
                        onTouchStart={() => setVirtualKey('Space', true)}
                        onTouchEnd={() => setVirtualKey('Space', false)}
                        className="px-4 py-2 rounded-lg bg-amber-600 active:bg-amber-500 text-xs font-mono font-bold select-none"
                      >
                        ⚔️ Tajo de Espada (Espacio / J)
                      </button>
                      <button
                        type="button"
                        onMouseDown={() => setVirtualKey('KeyK', true)}
                        onMouseUp={() => setVirtualKey('KeyK', false)}
                        onTouchStart={() => setVirtualKey('KeyK', true)}
                        onTouchEnd={() => setVirtualKey('KeyK', false)}
                        className="px-4 py-2 rounded-lg bg-sky-600 active:bg-sky-500 text-xs font-mono font-bold select-none"
                      >
                        💥 Nova Elemental (K / Q)
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. TIENDA VIRTUAL DE PUNTOS DE ESTUDIO (CANJEO DE PASES Y MEJORAS)
          ===================================================================== */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Sistema de Recompensas Gamificado · Canjea tus Puntos de Estudio (PE) por tiempo extra de videojuego
            </p>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Tienda Virtual Anime (Saldo actual: {studyPoints} PE)
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(['ALL', 'NARUTO', 'HEROES', 'PIRATES', 'ALCHEMIST'] as const).map((filterId) => (
              <button
                key={filterId}
                type="button"
                onClick={() => setShopFilter(filterId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  shopFilter === filterId
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                }`}
              >
                {filterId === 'ALL' ? 'Todos' : ANIME_WORLDS[filterId].name.split('·')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedShopItems.map((item) => {
            const canAfford = studyPoints >= item.costPoints;
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/40 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-700 dark:text-amber-400 font-bold">
                      {item.animeLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-bold">
                      {item.costPoints} PE
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 dark:border-stone-700/70 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    +{item.minutesIncluded} min de juego
                  </span>
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => {
                      onSelectWorld(item.animeTheme);
                      onRedeemShopItem(item.id);
                      soundFX.playRewardUnlock();
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                      canAfford
                        ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {item.unlocked ? 'Canjear de nuevo' : canAfford ? 'Canjear Pase' : `Faltan ${item.costPoints - studyPoints} PE`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
