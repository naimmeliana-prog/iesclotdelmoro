import { CourseGrade, FlashcardItem, SubjectGradeMetric, SyllabusSubject } from '../types';
import { FULL_SYLLABUS_SUBJECTS, INITIAL_FLASHCARDS } from './clotDelMoroData';
import {
  enrichCourseSubjectsWithExtraContent,
  EXTRA_FLASHCARDS_BY_COURSE,
} from './expandedStudyContent';

interface CourseBlueprint {
  courseLabel: string;
  subjects: {
    id: string;
    name: string;
    shortCode: string;
    description: string;
    units: {
      title: string;
      summary: string;
      keyConcepts: string[];
      scheme1: { heading: string; detail: string };
      scheme2: { heading: string; detail: string };
      practicalExample: string;
      quizQ: string;
      quizOptions: [string, string, string];
      correctIndex: number;
      quizExp: string;
    }[];
  }[];
  flashcards: {
    subject: string;
    question: string;
    answer: string;
    mnemonicHint: string;
  }[];
}

const COURSE_BLUEPRINTS: Record<Exclude<CourseGrade, '1ESO'>, CourseBlueprint> = {
  '2ESO': {
    courseLabel: '2º de la ESO',
    subjects: [
      {
        id: '2eso-fyq',
        name: 'Física y Química (2º ESO)',
        shortCode: 'FYQ-2',
        description: 'Método científico, factores de conversión, leyes de los gases, tabla periódica, reacciones químicas y cinemática MRU.',
        units: [
          {
            title: 'El Método Científico, Sistema Internacional y Factores de Conversión',
            summary: 'Etapas del método científico, magnitudes fundamentales del SI y cambio de unidades con fracciones equivalentes.',
            keyConcepts: ['Magnitudes SI (kg, m, s, K)', 'Notación Científica', 'Factores de Conversión'],
            scheme1: {
              heading: 'Regla de Oro del Factor de Conversión',
              detail: 'La unidad que quieres eliminar se coloca siempre en el lado contrario (numerador ↔ denominador) para tacharla.',
            },
            scheme2: {
              heading: 'De km/h a m/s en un paso',
              detail: 'Divide entre 3,6 (ej. 72 km/h : 3,6 = 20 m/s). Para pasar de m/s a km/h, multiplica por 3,6.',
            },
            practicalExample: 'En la pista del IES Clot del Moro corres a 18 km/h. Pasado a m/s: 18 : 3,6 = 5 m/s.',
            quizQ: '¿A cuántos metros por segundo (m/s) equivalen 72 km/h?',
            quizOptions: ['20 m/s', '25 m/s', '12 m/s'],
            correctIndex: 0,
            quizExp: '72 km/h dividido entre 3,6 da exactamente 20 m/s.',
          },
          {
            title: 'La Materia, Teoría Cinético-Molecular y Leyes de los Gases',
            summary: 'Estados de agregación, cambios de estado y leyes de Boyle-Mariotte, Charles y Gay-Lussac.',
            keyConcepts: ['P · V = constante (Boyle)', 'Temperatura en Kelvin (K = ºC + 273)', 'Cambios de Estado'],
            scheme1: {
              heading: 'Ley de Boyle-Mariotte (T constante)',
              detail: 'Si comprimes un gas a la mitad de volumen, su presión se duplica: P1 · V1 = P2 · V2.',
            },
            scheme2: {
              heading: 'Paso obligatorio a Kelvin',
              detail: 'Nunca uses ºC en las fórmulas de los gases: suma siempre 273 (ej. 27 ºC = 300 K).',
            },
            practicalExample: 'Una jeringuilla tapada en el laboratorio de 2º ESO: al empujar el émbolo a la mitad del volumen, la presión interna se multiplica por 2.',
            quizQ: 'Si tenemos un gas a 27 ºC, ¿qué temperatura debemos introducir en la fórmula de las leyes de los gases?',
            quizOptions: ['27 K', '300 K (27 + 273)', '246 K'],
            correctIndex: 1,
            quizExp: 'En las leyes de los gases la temperatura siempre debe expresarse en Kelvin: K = 27 + 273 = 300 K.',
          },
          {
            title: 'El Átomo, Isótopos y la Tabla Periódica de los Elementos',
            summary: 'Número atómico (Z), número másico (A), protones, neutrones, electrones e iones (cationes y aniones).',
            keyConcepts: ['Z = Protones', 'A = Protones + Neutrones', 'Metales, No Metales y Gases Nobles'],
            scheme1: {
              heading: 'Fórmula del Número Másico (A)',
              detail: 'A = Z + N → Por tanto, el número de Neutrones es siempre N = A - Z.',
            },
            scheme2: {
              heading: 'Cationes (+) vs Aniones (-)',
              detail: 'Como los electrones tienen carga negativa, perder electrones da carga positiva (catión) y ganar electrones da carga negativa (anión).',
            },
            practicalExample: 'El Sodio (Z=11, A=23) neutro tiene 11 protones, 11 electrones y 23 - 11 = 12 neutrones.',
            quizQ: 'Un átomo tiene número atómico Z = 6 y número másico A = 14. ¿Cuántos neutrones tiene en su núcleo?',
            quizOptions: ['6 neutrones', '8 neutrones (14 - 6)', '20 neutrones'],
            correctIndex: 1,
            quizExp: 'El número de neutrones se calcula restando N = A - Z = 14 - 6 = 8 neutrones.',
          },
          {
            title: 'Cambios Físicos y Reacciones Químicas (Ley de Lavoisier)',
            summary: 'Reactivos y productos, conservación de la masa y ajuste visual de ecuaciones químicas.',
            keyConcepts: ['Reactivos → Productos', 'Ley de Conservación de la Masa', 'Velocidad de Reacción'],
            scheme1: {
              heading: 'Ley de Lavoisier',
              detail: 'En toda reacción química, la suma de las masas de los reactivos es exactamente igual a la suma de las masas de los productos.',
            },
            scheme2: {
              heading: 'Regla para ajustar ecuaciones',
              detail: 'Solo puedes cambiar los coeficientes grandes delante de las moléculas, NUNCA los subíndices pequeños de las fórmulas.',
            },
            practicalExample: 'Ajuste de la formación del agua: 2 H2 + O2 → 2 H2O (4 átomos de H y 2 de O a cada lado).',
            quizQ: 'Al reaccionar 12 g de Carbono con 32 g de Oxígeno completo, ¿cuántos gramos de CO2 se obtienen según Lavoisier?',
            quizOptions: ['20 g', '44 g (12 + 32)', '32 g'],
            correctIndex: 1,
            quizExp: 'Por la Ley de Conservación de la Masa de Lavoisier, masa reactivos (12 g + 32 g) = masa productos (44 g).',
          },
          {
            title: 'El Movimiento (MRU) y las Fuerzas (Ley de Hooke)',
            summary: 'Posición, desplazamiento, velocidad constante (v = d/t), aceleración y deformación elástica de muelles.',
            keyConcepts: ['v = espacio / tiempo', 'Gráficas x-t y v-t', 'F = k · Δx (Ley de Hooke)'],
            scheme1: {
              heading: 'Triángulo Visual del MRU',
              detail: 'Espacio (e) arriba; Velocidad (v) y Tiempo (t) abajo: e = v · t  |  v = e / t  |  t = e / v.',
            },
            scheme2: {
              heading: 'Ley de Hooke en Muelles',
              detail: 'La fuerza aplicada es directamente proporcional a lo que se estira el muelle: F = k · (L - L0).',
            },
            practicalExample: 'Un ciclista va de Algímia d’Alfara a Segorbe a velocidad constante de 5 m/s durante 100 s: recorre 500 metros.',
            quizQ: 'Si un muelle con constante elástica k = 50 N/m se estira 0,2 metros, ¿qué fuerza se le ha aplicado?',
            quizOptions: ['10 N (50 · 0,2)', '250 N', '5 N'],
            correctIndex: 0,
            quizExp: 'Aplicando la Ley de Hooke: F = k · Δx = 50 N/m · 0,2 m = 10 Newtons.',
          },
        ],
      },
      {
        id: '2eso-mat',
        name: 'Matemáticas (2º ESO)',
        shortCode: 'MAT-2',
        description: 'Potencias y raíces, proporcionalidad compuesta, álgebra y productos notables, ecuaciones de 1º y 2º grado, Pitágoras y Tales.',
        units: [
          {
            title: 'Potencias de Exponente Entero y Notación Científica',
            summary: 'Propiedades de las potencias de igual base, exponentes negativos y raíces cuadradas exactas.',
            keyConcepts: ['a^m · a^n = a^(m+n)', 'a^(-n) = 1 / a^n', '(a^m)^n = a^(m·n)'],
            scheme1: {
              heading: 'Multiplicar y Dividir con la misma base',
              detail: 'Al multiplicar se SUMAN los exponentes; al dividir se RESTAN los exponentes.',
            },
            scheme2: {
              heading: 'Exponente Negativo',
              detail: 'Un exponente negativo invierte la fracción: 2^(-3) = 1 / 2^3 = 1/8.',
            },
            practicalExample: 'Simplifica 5^7 : 5^4 = 5^(7-4) = 5^3 = 125.',
            quizQ: '¿Cuál es el resultado simplificado de (x^3)^4 · x^2?',
            quizOptions: ['x^9', 'x^14 (porque 3·4 = 12 y 12 + 2 = 14)', 'x^24'],
            correctIndex: 1,
            quizExp: 'Potencia de potencia multiplica exponentes (3·4 = 12) y producto de igual base los suma (12 + 2 = 14).',
          },
          {
            title: 'Proporcionalidad Directa, Inversa y Porcentajes Encadenados',
            summary: 'Regla de tres directa e inversa, aumentos y descuentos porcentuales mediante índice de variación.',
            keyConcepts: ['Magnitudes Directas vs Inversas', 'Índice de Variación', 'Repartos Proporcionales'],
            scheme1: {
              heading: 'Detector TDAH: ¿Directa o Inversa?',
              detail: 'Pregúntate: "Si sube A, ¿sube B?". Si ambas suben es DIRECTA. Si una sube y la otra baja (ej. más obreros → menos días) es INVERSA.',
            },
            scheme2: {
              heading: 'Truco del Índice de Variación en %',
              detail: 'Descuento del 20% → multiplica por 0,80. Aumento del 15% (IVA) → multiplica por 1,15.',
            },
            practicalExample: 'Un portátil de 500 € tiene un 20% de descuento: 500 · 0,80 = 400 €.',
            quizQ: 'Si 4 grifos llenan un depósito en 6 horas, ¿cuánto tardarán 8 grifos iguales (proporcionalidad inversa)?',
            quizOptions: ['12 horas', '3 horas (el doble de grifos tarda la mitad de tiempo)', '4 horas'],
            correctIndex: 1,
            quizExp: 'Es proporcionalidad inversa: al duplicar el número de grifos (de 4 a 8), el tiempo se reduce a la mitad (3 horas).',
          },
          {
            title: 'Polinomios e Identidades Notables',
            summary: 'Suma, resta y producto de polinomios, factor común y las tres identidades notables fundamentales.',
            keyConcepts: ['(a + b)^2 = a^2 + 2ab + b^2', '(a - b)^2 = a^2 - 2ab + b^2', '(a + b)(a - b) = a^2 - b^2'],
            scheme1: {
              heading: 'Alerta TDAH: ¡El cuadrado de una suma NO es a^2 + b^2!',
              detail: 'No olvides nunca el DOBLE PRODUCTO central (+ 2·a·b). Ejemplo: (x + 3)^2 = x^2 + 6x + 9.',
            },
            scheme2: {
              heading: 'Suma por Diferencia',
              detail: '(x + 5)·(x - 5) = Diferencia de cuadrados = x^2 - 25.',
            },
            practicalExample: 'Desarrolla (2x + 1)^2 = (2x)^2 + 2·(2x)·1 + 1^2 = 4x^2 + 4x + 1.',
            quizQ: '¿Cuál es el desarrollo correcto de la identidad notable (x + 4)^2?',
            quizOptions: ['x^2 + 16', 'x^2 + 8x + 16', 'x^2 + 4x + 8'],
            correctIndex: 1,
            quizExp: 'Cuadrado del primero (x^2) + doble del primero por el segundo (2·x·4 = 8x) + cuadrado del segundo (16).',
          },
          {
            title: 'Ecuaciones de 1º y 2º Grado Completas e Incompletas',
            summary: 'Ecuaciones con denominadores, fórmula general de 2º grado y resolución rápida de incompletas.',
            keyConcepts: ['x = [-b ± √(b^2 - 4ac)] / 2a', 'Discriminante Δ = b^2 - 4ac', 'Ecuaciones Incompletas'],
            scheme1: {
              heading: 'Fórmula de 2º Grado (ax^2 + bx + c = 0)',
              detail: 'Escribe siempre primero cuánto valen a, b y c con su signo antes de sustituir en la raíz.',
            },
            scheme2: {
              heading: 'Incompletas sin término c (ax^2 + bx = 0)',
              detail: 'Saca factor común x: una solución siempre es x = 0.',
            },
            practicalExample: 'Resuelve x^2 - 5x + 6 = 0 → a=1, b=-5, c=6 → x = (5 ± √(25 - 24)) / 2 → Soluciones: x=3 y x=2.',
            quizQ: '¿Cuáles son las dos soluciones de la ecuación incompleta x^2 - 9 = 0?',
            quizOptions: ['x = 9 y x = -9', 'x = 3 y x = -3', 'x = 3 únicamente'],
            correctIndex: 1,
            quizExp: 'Despejando x^2 = 9, al hacer la raíz cuadrada obtenemos dos soluciones: +3 y -3.',
          },
          {
            title: 'Teorema de Pitágoras, Semejanza de Tales y Volúmenes',
            summary: 'Cálculo de hipotenusa y catetos, triángulos en posición de Tales y áreas/volúmenes de prismas, cilindros y conos.',
            keyConcepts: ['h^2 = c1^2 + c2^2', 'Razón de Semejanza (Tales)', 'Volumen Prisma y Pirámide'],
            scheme1: {
              heading: 'Teorema de Pitágoras en Triángulos Rectángulos',
              detail: 'Para hallar la hipotenusa SUMA los cuadrados de los catetos; para hallar un cateto RESTA.',
            },
            scheme2: {
              heading: 'Punta vs Plano en Volúmenes',
              detail: 'Si la figura acaba en plano (prisma, cilindro): V = Área_base · h. Si acaba en pico (pirámide, cono): divide entre 3.',
            },
            practicalExample: 'Una escalera apoyada en la pared a 3 m de la base llega a 4 m de altura: la escalera mide √(3^2 + 4^2) = √25 = 5 metros.',
            quizQ: 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuánto mide su hipotenusa?',
            quizOptions: ['10 cm (porque √(36 + 64) = √100 = 10)', '14 cm', '12 cm'],
            correctIndex: 0,
            quizExp: 'Por Pitágoras: h = √(6^2 + 8^2) = √(36 + 64) = √100 = 10 cm.',
          },
        ],
      },
      {
        id: '2eso-geh',
        name: 'Geografía e Historia (2º ESO)',
        shortCode: 'GEH-2',
        description: 'Edad Media (Bizancio, Islam, Feudalismo, Románico, Gótico, Al-Ándalus, Reinos Cristianos) y Edad Moderna (Renacimiento y Barroco).',
        units: [
          {
            title: 'El Fin del Mundo Antiguo: Imperio Bizantino y el Islam',
            summary: 'Justiniano y Santa Sofía en Constantinopla, el nacimiento del Islam con Mahoma y su expansión mediterránea.',
            keyConcepts: ['Constantinopla (476 - 1453)', 'Los 5 Pilares del Islam', 'Califatos Omeya y Abasí'],
            scheme1: {
              heading: 'Tres Civilizaciones Mediterráneas en la Edad Media',
              detail: 'Cristiandad occidental (feudal), Imperio Bizantino (griego ortodoxo) y Civilización Islámica.',
            },
            scheme2: {
              heading: 'Los 5 Pilares del Islam',
              detail: 'Profesión de fe (Shahada), oración 5 veces al día, limosna, ayuno en Ramadán y peregrinación a La Meca.',
            },
            practicalExample: 'La herencia islámica en el Camp de Morvedre y el valle del Palancia: sistemas de regadío por acequias en Algímia d’Alfara.',
            quizQ: '¿Cuál fue la capital del Imperio Bizantino hasta su caída en 1453?',
            quizOptions: ['Roma', 'Constantinopla (actual Estambul)', 'Damasco'],
            correctIndex: 1,
            quizExp: 'Constantinopla fue la capital del Imperio Romano de Oriente (Bizantino) hasta 1453.',
          },
          {
            title: 'La Europa Feudal y el Arte Románico',
            summary: 'Vasallaje, sociedad estamental (nobles, clero y campesinos), el feudo autosuficiente y las iglesias de peregrinación.',
            keyConcepts: ['Pacto de Vasallaje (Homenaje e Investidura)', 'Reserva Señorial y Mansos', 'Arco de Medio Punto Románico'],
            scheme1: {
              heading: 'Pirámide Estamental Feudal',
              detail: 'Privilegiados (Nobleza y Clero: no pagan impuestos) vs No Privilegiados (Campesinos y siervos).',
            },
            scheme2: {
              heading: 'Cómo reconocer el Arte Románico',
              detail: 'Arco de medio punto (semicircular), muros gruesos con pocas ventanas y bóveda de cañón.',
            },
            practicalExample: 'El Camino de Santiago como gran ruta de difusión del arte románico en la Península Ibérica.',
            quizQ: '¿Qué tipo de arco caracteriza a la arquitectura del Arte Románico?',
            quizOptions: ['Arco apuntado u ojival', 'Arco de medio punto (semicircular)', 'Arco de herradura'],
            correctIndex: 1,
            quizExp: 'El arco de medio punto (semicircular) y los muros gruesos son propios del Románico.',
          },
          {
            title: 'Al-Ándalus y los Reinos Cristianos Peninsulares (Corona de Aragón)',
            summary: 'Del Emirato y Califato de Córdoba a los Reinos de Taifas; Jaume I y la fundación del Reino de Valencia (1238).',
            keyConcepts: ['Califato de Córdoba (929)', 'Jaume I y los Furs de València', 'Repoblación y Mudéjares'],
            scheme1: {
              heading: 'Etapas de Al-Ándalus en línea temporal',
              detail: '1. Emirato (711) → 2. Califato de Córdoba (929) → 3. Taifas (1031) → 4. Reino Nazarí de Granada (hasta 1492).',
            },
            scheme2: {
              heading: 'Corona de Aragón y Jaume I',
              detail: 'En 1238 Jaume I conquista Valencia y otorga los Furs, creando el Reino cristiano de Valencia dentro de la Corona de Aragón.',
            },
            practicalExample: 'La arquitectura y cerámica mudéjar y morisca en los pueblos de la Baronía y el valle del Palancia.',
            quizQ: '¿Qué monarca de la Corona de Aragón conquistó Valencia en 1238 y promulgó los Furs?',
            quizOptions: ['Alfonso X el Sabio', 'Jaume I el Conqueridor', 'Fernando el Católico'],
            correctIndex: 1,
            quizExp: 'Jaume I conquistó Valencia en 1238 e integró el nuevo Reino de Valencia en la Corona de Aragón.',
          },
          {
            title: 'El Renacimiento Urbano, los Gremios y el Arte Gótico',
            summary: 'Crecimiento de los burgos y la burguesía, gremios de artesanos, universidades, peste negra y catedrales góticas.',
            keyConcepts: ['Burguesía y Ferias Comerciales', 'Maestro, Oficial y Aprendiz (Gremios)', 'Arco Ojival y Vidrieras Góticas'],
            scheme1: {
              heading: 'Diferencia Visual: Románico vs Gótico',
              detail: 'Gótico = Altura y Luz (arco apuntado/ojival, bóveda de crucería, arbotantes y grandes rosetones de vidrieras).',
            },
            scheme2: {
              heading: 'Gótico Civil Valenciano',
              detail: 'La Lonja de la Seda de Valencia y las Torres de Serranos como joyas del esplendor comercial del siglo XV.',
            },
            practicalExample: 'Visita a la Lonja de la Seda de Valencia: columnas helicoidales y bóvedas de crucería gótica.',
            quizQ: '¿Qué elementos arquitectónicos permitieron a las catedrales góticas ser mucho más altas y luminosas?',
            quizOptions: [
              'Muros gruesos sin ventanas',
              'El arco apuntado (ojival), la bóveda de crucería y los arbotantes con vidrieras',
              'Las columnas dóricas de madera',
            ],
            correctIndex: 1,
            quizExp: 'El arco ojival, la bóveda de crucería y los arbotantes descargan el peso hacia fuera permitiendo abrir grandes vidrieras.',
          },
          {
            title: 'La Edad Moderna: Humanismo, Renacimiento y Descubrimientos',
            summary: 'Antropocentrismo humanista, imprenta de Gutenberg, Leonardo y Miguel Ángel, Reyes Católicos y llegada a América (1492).',
            keyConcepts: ['Del Teocentrismo al Antropocentrismo', 'Quattrocento y Cinquecento', 'Reforma Protestante y Contrarreforma'],
            scheme1: {
              heading: 'Cambio de Mentalidad: Edad Media vs Edad Moderna',
              detail: 'Edad Media = Teocentrismo (Dios centro de todo). Renacimiento = Antropocentrismo (el ser humano y la razón en el centro).',
            },
            scheme2: {
              heading: 'Hitos clave de 1492',
              detail: 'Final de la conquista de Granada, llegada de Cristóbal Colón a América y publicación de la primera Gramática de Nebrija.',
            },
            practicalExample: 'Uso de la perspectiva lineal en la pintura renacentista frente a las figuras planas medievales.',
            quizQ: '¿Cómo se llama la corriente cultural del Renacimiento que sitúa al ser humano y la razón en el centro del conocimiento?',
            quizOptions: ['Feudalismo', 'Humanismo (Antropocentrismo)', 'Escolástica'],
            correctIndex: 1,
            quizExp: 'El Humanismo renacentista recupera la cultura clásica grecolatina y defiende el antropocentrismo.',
          },
        ],
      },
      {
        id: '2eso-lcl',
        name: 'Lengua Castellana y Literatura (2º ESO)',
        shortCode: 'LCL-2',
        description: 'Sintagmas nominal y verbal, sujeto y complementos del predicado (CD, CI, CC, Atributo), textos expositivos y teatro barroco.',
        units: [
          {
            title: 'Los Sintagmas (SN, SV, SAdj, SAdv, SPrep) y el Sujeto',
            summary: 'Cómo identificar el núcleo de cada sintagma, concordancia entre Sujeto y Verbo, y oraciones impersonales.',
            keyConcepts: ['Prueba de la Concordancia (Sujeto)', 'Sujeto Omitido (Elíptico)', 'Oraciones Impersonales (llover, haber)'],
            scheme1: {
              heading: 'Infalible para hallar el Sujeto (Regla de Concordancia)',
              detail: 'Cambia el verbo de singular a plural. Las palabras que te veas obligado a cambiar a plural son el SUJETO. (Nunca empieza por la preposición "a").',
            },
            scheme2: {
              heading: 'Detector de Impersonales',
              detail: 'Verbos meteorológicos (Amaneció tarde) y el verbo HABER en 3ª persona singular (Hay muchos libros) NO tienen sujeto.',
            },
            practicalExample: '"Me gustan los cómics de Naruto": si dices "Me gusta el cómic", cambia "los cómics", luego "los cómics de Naruto" es el Sujeto.',
            quizQ: 'En la oración "A mi hermano le encantan las matemáticas", ¿cuál es el Sujeto?',
            quizOptions: [
              'A mi hermano',
              'Las matemáticas (concuerda en plural con "encantan")',
              'Es impersonal',
            ],
            correctIndex: 1,
            quizExp: '"Las matemáticas" es el Sujeto porque concuerda en número y persona con el verbo "encantan" (además, un sujeto nunca empieza por "A").',
          },
          {
            title: 'El Predicado Nominal (Atributo) y Predicado Verbal (CD, CI y CC)',
            summary: 'Diferencia entre verbos copulativos (ser, estar, parecer) y predicativos, y pruebas para sustituir CD y CI.',
            keyConcepts: ['Atributo (con Ser, Estar, Parecer)', 'Complemento Directo (LO, LA, LOS, LAS)', 'Complemento Indirecto (LE, LES)'],
            scheme1: {
              heading: 'Atributo vs Predicativo',
              detail: 'Si el verbo es SER, ESTAR o PARECER, el adjetivo o SN que dice cómo es el sujeto es ATRIBUTO (se sustituye por LO).',
            },
            scheme2: {
              heading: 'CD vs CI en 5 segundos',
              detail: 'CD → se sustituye por LO / LA / LOS / LAS y pasa a Sujeto en voz pasiva. CI → se sustituye por LE / LES.',
            },
            practicalExample: '"Entregué el trabajo (CD → lo entregué) a la profesora (CI → le entregué el trabajo)".',
            quizQ: '¿Por qué pronombres átonos podemos sustituir siempre el Complemento Directo (CD)?',
            quizOptions: ['Por LE o LES', 'Por LO, LA, LOS o LAS', 'Por ALLÍ o ASÍ'],
            correctIndex: 1,
            quizExp: 'El Complemento Directo se comprueba sustituyéndolo por los pronombres LO, LA, LOS o LAS.',
          },
          {
            title: 'Textos Expositivos, Argumentativos y Periodísticos',
            summary: 'Estructura deductiva e inductiva, tesis y tipos de argumentos, y diferencia entre noticia objetiva y artículo de opinión.',
            keyConcepts: ['Tesis y Argumentos', 'Conectores de Orden y Causa', 'Noticia (6 W) vs Opinión'],
            scheme1: {
              heading: 'Estructura de una Argumentación',
              detail: '1. Tema → 2. Tesis (tu postura clara) → 3. Argumentos (datos, ejemplos, autoridad) → 4. Conclusión.',
            },
            scheme2: {
              heading: 'Las 6 Preguntas de la Noticia (6 W)',
              detail: '¿Qué pasó?, ¿Quién?, ¿Cuándo?, ¿Dónde?, ¿Cómo? y ¿Por qué?',
            },
            practicalExample: 'Redacción de una noticia para la revista escolar del IES Clot del Moro sobre las jornadas de convivencia.',
            quizQ: '¿Cómo se llama la idea principal o postura que el autor defiende en un texto argumentativo?',
            quizOptions: ['Moraleja', 'Tesis', 'Metáfora'],
            correctIndex: 1,
            quizExp: 'La tesis es la idea u opinión central que se pretende demostrar mediante argumentos.',
          },
        ],
      },
      {
        id: '2eso-val',
        name: 'Valencià: Llengua i Literatura (2º ESO)',
        shortCode: 'VAL-2',
        description: 'Temps verbals i perífrasis d’obligació, pronoms febles (CD i CI), l’oració simple i literatura del Segle d’Or valencià.',
        units: [
          {
            title: 'Les Perífrasis Verbals d’Obligació i Probabilitat',
            summary: 'Ús correcte d’haver de + infinitiu i caldre + infinitiu (evitant el calc "tindre que").',
            keyConcepts: ['Haver de + Infinitiu (Obligació)', 'Caldre que + Subjuntiu', 'Deure + Infinitiu (Probabilitat)'],
            scheme1: {
              heading: 'Alerta TDAH: Mai no digues "Tinc que estudiar"!',
              detail: 'En valencià l’obligació s’expressa amb: "Hauré d’estudiar / He d’estudiar" o "Cal estudiar / Cal que estudies".',
            },
            scheme2: {
              heading: 'Probabilitat amb Deure + Infinitiu',
              detail: '"Deuen ser les cinc" expressa hipòtesi o probabilitat (no porta la preposició "de").',
            },
            practicalExample: '"Hui he de lliurar la tasca a Aules GVA" (Correcte) en lloc de "tinc que lliurar".',
            quizQ: 'Quina d’aquestes oracions expressa l’obligació de manera normativa en valencià?',
            quizOptions: [
              'Demà tinc que fer un examen',
              'Demà he de fer un examen (o Cal que faça un examen)',
              'Demà hi ha que fer un examen',
            ],
            correctIndex: 1,
            quizExp: 'En valencià l’obligació es construeix amb "haver de + infinitiu" o amb el verb "caldre".',
          },
          {
            title: 'Els Pronoms Febles de CD (el, la, els, les, ho, en) i CI (li, els)',
            summary: 'Substitució pronominal del Complement Directe determinat, indeterminat (EN) i neutre (HO).',
            keyConcepts: ['CD determinat: el, la, els, les', 'CD indeterminat: EN', 'CD neutre (això/allò): HO'],
            scheme1: {
              heading: 'Quan utilitzem EL/LA vs EN vs HO?',
              detail: 'Porta "el llibre" → Porta’l. Compra "pa" (sense article) → Compra’n. Saps "això" → Ho saps.',
            },
            scheme2: {
              heading: 'CI plural: sempre ELS (mai "lis")',
              detail: 'Per a dir "a ells / a elles", el pronom feble de CI plural és sempre ELS ("Els he donat les notes").',
            },
            practicalExample: '—Tens fulles de paper? —Sí, en tinc tres (EN perquè "fulles" és indeterminat).',
            quizQ: 'Com substituïm el complement subratllat en l’oració: "jo sé tot això"?',
            quizOptions: ['Jo el sé', 'Jo ho sé (pronom neutre HO)', 'Jo en sé'],
            correctIndex: 1,
            quizExp: 'Quan el CD és neutre (això, allò o tota una oració), se substitueix pel pronom feble HO.',
          },
          {
            title: 'El Segle d’Or Valencià: Ausiàs March i Joanot Martorell',
            summary: 'La poesia d’Ausiàs March i la novel·la cavalleresca moderna amb Tirant lo Blanc.',
            keyConcepts: ['Ausiàs March (Cants d’Amor i de Mort)', 'Joanot Martorell (Tirant lo Blanc, 1490)', 'Roís de Corella'],
            scheme1: {
              heading: 'Per què Tirant lo Blanc és una novel·la moderna?',
              detail: 'A diferència dels llibres de cavalleries fantàstics, Tirant és un heroi humà, estrateg militar que es cansa, menja i estima de forma versemblant.',
            },
            scheme2: {
              heading: 'Ausiàs March trenca amb els trobadors',
              detail: 'Escriu per primera vegada en valencià (no en occità) i mostra una anàlisi psicològica sincera de l’amor.',
            },
            practicalExample: 'Lectura d’un episodi de Tirant lo Blanc a Constantinopla i la cort de Carmesina.',
            quizQ: 'Qui és l’autor de la cèlebre novel·la del Segle d’Or valencià "Tirant lo Blanc"?',
            quizOptions: ['Ramon Llull', 'Joanot Martorell', 'Vicent Andrés Estellés'],
            correctIndex: 1,
            quizExp: 'Joanot Martorell va escriure Tirant lo Blanc, publicada a València l’any 1490.',
          },
        ],
      },
      {
        id: '2eso-ing',
        name: 'Inglés · English (2º ESO)',
        shortCode: 'ENG-2',
        description: 'Past Continuous vs Past Simple (When/While), Future (Will vs Be Going To), First Conditional & Modal Verbs.',
        units: [
          {
            title: 'Past Simple vs Past Continuous (When & While)',
            summary: 'Acciones largas en progreso en el pasado interrumpidas por una acción corta repentina.',
            keyConcepts: ['Was / Were + Verb-ing', 'WHILE + Past Continuous', 'WHEN + Past Simple'],
            scheme1: {
              heading: 'Fórmula Visual: Acción Larga vs Interrupción Corta',
              detail: 'WHILE I was studying (acción larga en curso), my phone rang (interrupción corta en Past Simple).',
            },
            scheme2: {
              heading: 'Pista rápida para exámenes: WHEN vs WHILE',
              detail: 'Detrás de WHILE suele ir Past Continuous (-ing). Detrás de WHEN suele ir Past Simple (-ed / 2ª columna).',
            },
            practicalExample: '"We were playing basketball at IES Clot del Moro when the bell rang."',
            quizQ: 'Choose the correct form: "While she ___ (walk) to school, it started to rain."',
            quizOptions: ['walked', 'was walking', 'is walking'],
            correctIndex: 1,
            quizExp: 'After WHILE we use Past Continuous (was walking) for the longer action in progress.',
          },
          {
            title: 'Future Forms: Will vs Be Going To & First Conditional',
            summary: 'Decisiones espontáneas y predicciones (Will) frente a planes e intenciones (Be going to), y oraciones condicionales reales.',
            keyConcepts: ['Will + Infinitive (Spontaneous / Prediction)', 'Am/Is/Are going to (Plan)', 'If + Present Simple, Will + Verb'],
            scheme1: {
              heading: 'Will vs Be Going To',
              detail: 'WILL = Decisión en el momento o predicción de opinión ("I think it will rain"). BE GOING TO = Plan decidido antes o evidencia clara ("Look at those black clouds! It is going to rain").',
            },
            scheme2: {
              heading: 'First Conditional (50-100% Probable)',
              detail: 'IF + Present Simple , WILL + Infinitive. (¡Nunca pongas WILL dentro de la parte del IF!).',
            },
            practicalExample: '"If I study 15 minutes now, I will unlock my Naruto mini-game."',
            quizQ: 'Complete the First Conditional: "If you ___ (study) hard, you will pass the exam."',
            quizOptions: ['will study', 'study', 'studied'],
            correctIndex: 1,
            quizExp: 'In the First Conditional, the IF-clause always uses Present Simple ("If you study").',
          },
        ],
      },
      {
        id: '2eso-tec',
        name: 'Tecnología y Digitalización (2º ESO)',
        shortCode: 'TEC-2',
        description: 'Circuitos eléctricos y Ley de Ohm, mecanismos de transmisión de movimiento, robótica y seguridad digital.',
        units: [
          {
            title: 'Circuitos Eléctricos: Ley de Ohm, Serie y Paralelo',
            summary: 'Voltaje (V), Intensidad (I) y Resistencia (R), cálculo de circuitos y potencia eléctrica.',
            keyConcepts: ['V = I · R (Ley de Ohm)', 'Asociación en Serie (R_total = R1 + R2)', 'Asociación en Paralelo'],
            scheme1: {
              heading: 'Triángulo de la Ley de Ohm',
              detail: 'Voltaje (V, en voltios) arriba: V = I · R  |  I = V / R  |  R = V / I.',
            },
            scheme2: {
              heading: 'Bombillas en Serie vs Paralelo',
              detail: 'En SERIE: si se funde una bombilla, se apagan todas. En PARALELO: cada bombilla tiene su propio camino a la pila.',
            },
            practicalExample: 'Un circuito con una pila de 9 V y una resistencia de 3 Ω tiene una intensidad I = 9 / 3 = 3 Amperios.',
            quizQ: 'Según la Ley de Ohm, ¿qué intensidad circula por una resistencia de 5 Ω conectada a una pila de 10 V?',
            quizOptions: ['50 A', '2 A (porque I = V / R = 10 / 5)', '0,5 A'],
            correctIndex: 1,
            quizExp: 'Por la Ley de Ohm, I = V / R = 10 V / 5 Ω = 2 Amperios.',
          },
          {
            title: 'Mecanismos: Palancas y Engranajes',
            summary: 'Ley de la palanca (F · Bf = R · Br), palancas de 1º, 2º y 3º grado, y relación de transmisión en poleas y engranajes.',
            keyConcepts: ['F · d_F = R · d_R', 'Grados de la Palanca (GAR)', 'Z1 · N1 = Z2 · N2 (Engranajes)'],
            scheme1: {
              heading: 'Regla Mnemotécnica "G-A-R" para las Palancas',
              detail: '1º Grado: Punto de Apoyo en el centro (tijeras). 2º Grado: Resistencia en el centro (carretilla). 3º Grado: Fuerza en el centro (pinzas).',
            },
            scheme2: {
              heading: 'Engranajes Conectados',
              detail: 'El engranaje con MENOS dientes gira siempre MÁS RÁPIDO: Z1 · N1 = Z2 · N2.',
            },
            practicalExample: 'Montaje de un reductor de velocidad en el taller de Tecnología del IES Clot del Moro.',
            quizQ: 'En una carretilla de obra, la carga (Resistencia) está entre la rueda (Apoyo) y nuestras manos (Fuerza). ¿De qué grado es esta palanca?',
            quizOptions: ['Primer grado', 'Segundo grado (Resistencia en el centro)', 'Tercer grado'],
            correctIndex: 1,
            quizExp: 'Cuando la Resistencia está en el centro entre el Apoyo y la Fuerza, es una palanca de 2º grado.',
          },
        ],
      },
      {
        id: '2eso-mus',
        name: 'Música y Educación Plástica (2º ESO)',
        shortCode: 'MUS-2',
        description: 'Texturas musicales, historia de la música, proporción áurea, simetría y lenguaje cinematográfico.',
        units: [
          {
            title: 'Agrupaciones Instrumentales, Texturas y Formas Musicales',
            summary: 'Monodía y polifonía, familias de la orquesta sinfónica y estructura de las obras musicales.',
            keyConcepts: ['Monodía vs Polifonía', 'Cuerda, Viento-Madera, Viento-Metal y Percusión', 'Forma Binaria y Rondó'],
            scheme1: {
              heading: 'Las 4 Familias de la Orquesta Sinfónica',
              detail: 'Delante: Cuerda frotada (violín, chelo). Centro: Viento-madera (flauta, oboe, clarinete). Detrás: Viento-metal y Percusión.',
            },
            scheme2: {
              heading: 'Forma Rondó (A-B-A-C-A)',
              detail: 'Un estribillo principal (A) se repite alternándose con distintas estrofas nuevas (B, C...).',
            },
            practicalExample: 'Práctica instrumental grupal en el aula de Música del IES Clot del Moro.',
            quizQ: '¿En qué forma musical un tema principal (A) se alterna continuamente con temas nuevos siguiendo el esquema A-B-A-C-A?',
            quizOptions: ['Canon', 'Rondó', 'Sonata'],
            correctIndex: 1,
            quizExp: 'El Rondó repite el tema principal (A) intercalando episodios contrastantes (A-B-A-C-A).',
          },
        ],
      },
    ],
    flashcards: [
      {
        subject: 'Física y Química (2º ESO)',
        question: '¿Cómo se pasa rápidamente una velocidad de km/h a m/s?',
        answer: 'Dividiendo entre 3,6 (por ejemplo: 72 km/h : 3,6 = 20 m/s).',
        mnemonicHint: 'De unidad grande (km/h) a pequeña (m/s) → Divide por 3,6.',
      },
      {
        subject: 'Matemáticas (2º ESO)',
        question: '¿Cuál es el desarrollo de la identidad notable (a + b)^2?',
        answer: 'a^2 + 2·a·b + b^2 (cuadrado del primero + doble del primero por el segundo + cuadrado del segundo).',
        mnemonicHint: '¡Nunca olvides el +2ab del centro!',
      },
      {
        subject: 'Geografía e Historia (2º ESO)',
        question: '¿En qué año conquistó Jaume I la ciudad de Valencia y fundó el Reino de Valencia?',
        answer: 'En el año 1238, otorgando los Furs de València.',
        mnemonicHint: 'Siglo XIII -> 1238 (9 d’Octubre).',
      },
      {
        subject: 'Lengua Castellana (2º ESO)',
        question: '¿Qué prueba infalible sirve para encontrar el Sujeto de cualquier oración?',
        answer: 'La prueba de la concordancia: cambiar el verbo de singular a plural y ver qué sintagma cambia obligatoriamente.',
        mnemonicHint: 'El Sujeto manda sobre el número del verbo y nunca empieza por "a".',
      },
    ],
  },
  '3ESO': {
    courseLabel: '3º de la ESO',
    subjects: [
      {
        id: '3eso-bio',
        name: 'Biología y Geología (3º ESO · Cuerpo Humano)',
        shortCode: 'BIO-3',
        description: 'Anatomía y fisiología humana: aparatos digestivo, respiratorio, circulatorio, excretor, sistema nervioso, endocrino e inmunitario.',
        units: [
          {
            title: 'Niveles de Organización, Nutrición y Aparato Digestivo',
            summary: 'Tejidos humanos, macronutrientes (glúcidos, lípidos, proteínas) y recorrido del bolo alimenticio al quilo.',
            keyConcepts: ['Bolo → Quimo (Estómago) → Quilo (Intestino)', 'Absorción en Microvellosidades', 'Dieta Mediterránea'],
            scheme1: {
              heading: 'Los 3 Nombres del Alimento en la Digestión',
              detail: '1. Boca: Bolo alimenticio → 2. Estómago (jugo gástrico): Quimo ácido → 3. Intestino delgado (bilis + jugo pancreático): Quilo.',
            },
            scheme2: {
              heading: 'Función de cada Nutriente',
              detail: 'Glúcidos = Energía inmediata | Lípidos = Reserva energética | Proteínas = Estructural (ladrillos celulares).',
            },
            practicalExample: 'Análisis de etiquetas nutricionales en el laboratorio de Biología del IES Clot del Moro.',
            quizQ: '¿Dónde tienen lugar la mayor parte de la digestión química final y la absorción de nutrientes hacia la sangre?',
            quizOptions: ['En el esófago', 'En el intestino delgado (gracias a las microvellosidades)', 'En el intestino grueso'],
            correctIndex: 1,
            quizExp: 'El intestino delgado completa la digestión formando el quilo y absorbe los nutrientes a través de sus vellosidades.',
          },
          {
            title: 'Aparato Respiratorio y Circulatorio: El Corazón y la Doble Circulación',
            summary: 'Intercambio de gases en los alvéolos pulmonares, aurículas, ventrículos y circulación pulmonar y general.',
            keyConcepts: ['Alvéolos Pulmonares (Difusión O2/CO2)', 'Aurículas (Entran Venas) vs Ventrículos (Salen Arterias)', 'Sístole y Diástole'],
            scheme1: {
              heading: 'Regla de Oro del Corazón (Venas vs Arterias)',
              detail: 'Las VENAS siempre Vuelven al corazón (entran por las Aurículas). Las ARTERIAS siempre Salen del corazón (desde los Ventrículos).',
            },
            scheme2: {
              heading: 'Circulación Humana: Doble y Completa',
              detail: 'Doble porque pasa dos veces por el corazón (circuito menor pulmonar y mayor general) y Completa porque la sangre rica en O2 nunca se mezcla con la pobre en O2.',
            },
            practicalExample: 'Medición del pulso cardíaco antes y después de Educación Física en el IES Clot del Moro.',
            quizQ: '¿Por qué cavidades del corazón sale impulsada la sangre hacia las arterias (Aorta y Pulmonar)?',
            quizOptions: ['Por las aurículas', 'Por los ventrículos (izquierdo y derecho)', 'Por las venas cavas'],
            correctIndex: 1,
            quizExp: 'Las aurículas reciben la sangre de las venas y los ventrículos la impulsan hacia fuera por las arterias.',
          },
          {
            title: 'Relación y Coordinación: Sistema Nervioso y Endocrino',
            summary: 'La neurona y la sinapsis, Sistema Nervioso Central (encéfalo y médula), acto voluntario vs acto reflejo y hormonas.',
            keyConcepts: ['Dendrita → Soma → Axón (Sinapsis)', 'Acto Voluntario (Cerebro) vs Reflejo (Médula)', 'Eje Hipotálamo-Hipófisis'],
            scheme1: {
              heading: 'Diferencia Clave: Acto Voluntario vs Acto Reflejo',
              detail: 'En el Acto Reflejo (ej. retirar la mano al quemarse) ordena la MÉDULA ESPINAL directamente sin esperar al cerebro para ganar velocidad.',
            },
            scheme2: {
              heading: 'Sistema Nervioso vs Endocrino',
              detail: 'Nervioso = Impulsos eléctricos rápidos y breves. Endocrino = Hormonas por la sangre (más lento pero duradero, ej. insulina).',
            },
            practicalExample: 'Comprensión neurobiológica del TDAH: el papel de los neurotransmisores (dopamina y noradrenalina) en la corteza prefrontal.',
            quizQ: '¿Qué órgano del Sistema Nervioso Central elabora la respuesta inmediata en un acto reflejo involuntario?',
            quizOptions: ['El cerebelo', 'La médula espinal', 'El páncreas'],
            correctIndex: 1,
            quizExp: 'Los actos reflejos son coordinados directamente por la médula espinal para responder con máxima rapidez ante un peligro.',
          },
        ],
      },
      {
        id: '3eso-fyq',
        name: 'Física y Química (3º ESO)',
        shortCode: 'FYQ-3',
        description: 'Configuración electrónica, enlace químico (iónico, covalente, metálico), formulación inorgánica IUPAC, moles y estequiometría.',
        units: [
          {
            title: 'Modelos Atómicos, Configuración Electrónica y Enlace Químico',
            summary: 'De Thomson y Rutherford a Bohr, regla de la octeto de Lewis y propiedades de compuestos iónicos, covalentes y metálicos.',
            keyConcepts: ['Regla del Octeto (8 electrones)', 'Enlace Iónico (Metal + No Metal)', 'Enlace Covalente (No Metal + No Metal)'],
            scheme1: {
              heading: 'Identificador Rápido del Tipo de Enlace',
              detail: 'Metal + No Metal = IÓNICO (transferencia de e-, ej. NaCl). No Metal + No Metal = COVALENTE (comparten pares de e-, ej. H2O, CO2). Metal + Metal = METÁLICO.',
            },
            scheme2: {
              heading: 'Propiedades de los Compuestos Iónicos (Sales)',
              detail: 'Sólidos cristalinos de alto punto de fusión que SOLO conducen la electricidad cuando están fundidos o disueltos en agua.',
            },
            practicalExample: 'Comprobación de la conductividad eléctrica del agua destilada frente al agua con sal común (NaCl).',
            quizQ: '¿Qué tipo de enlace químico se forma al unirse dos elementos NO METÁLICOS como el Oxígeno y el Hidrógeno en el agua (H2O)?',
            quizOptions: [
              'Enlace iónico',
              'Enlace covalente (comparten pares de electrones)',
              'Enlace metálico',
            ],
            correctIndex: 1,
            quizExp: 'Dos átomos no metálicos comparten pares de electrones formando un enlace covalente.',
          },
          {
            title: 'Formulación y Nomenclatura Inorgánica (IUPAC) y El Mol',
            summary: 'Óxidos, hidruros, hidróxidos, hidrácidos y sales binarias con prefijos multiplicadores y números de oxidación, y masa molar.',
            keyConcepts: ['Prefijos (Mono, Di, Tri, Tetra...)', 'Números de Oxidación en Romanos', '1 Mol = 6,022 · 10^23 partículas'],
            scheme1: {
              heading: 'Cruzar Valencias en Formulación Binaria',
              detail: 'El símbolo de la derecha lleva valencia negativa; se intercambian las valencias como subíndices y se simplifica si ambos son pares (ej. Fe2O3 = Óxido de hierro(III)).',
            },
            scheme2: {
              heading: 'Fórmula Fundamental de Moles (n)',
              detail: 'n (moles) = masa en gramos (m) / Masa Molar (M).',
            },
            practicalExample: 'Como la masa molar del H2O es 18 g/mol (2·1 + 16), en 36 gramos de agua hay 36 / 18 = 2 moles de agua.',
            quizQ: '¿Cuál es el nombre con prefijos multiplicadores del compuesto Fe2O3?',
            quizOptions: ['Dióxido de trihierro', 'Trióxido de dihierro', 'Óxido de hierro(II)'],
            correctIndex: 1,
            quizExp: 'Se lee de derecha a izquierda con prefijos: 3 oxígenos (Trióxido) y 2 hierros (de dihierro).',
          },
        ],
      },
      {
        id: '3eso-mat',
        name: 'Matemáticas (3º ESO)',
        shortCode: 'MAT-3',
        description: 'Radicales y fracciones generatrices, progresiones aritméticas y geométricas, Ruffini, funciones parabólicas y estadística.',
        units: [
          {
            title: 'Sucesiones: Progresiones Aritméticas (PA) y Geométricas (PG)',
            summary: 'Término general an y suma de los n primeros términos en progresiones aritméticas (+d) y geométricas (·r).',
            keyConcepts: ['PA: an = a1 + (n - 1)·d', 'PG: an = a1 · r^(n - 1)', 'Suma Sn de Gauss'],
            scheme1: {
              heading: 'PA (Sumar siempre lo mismo) vs PG (Multiplicar siempre por lo mismo)',
              detail: 'En PA hay diferencia "d" (ej. 2, 5, 8, 11... d = +3). En PG hay razón "r" (ej. 3, 6, 12, 24... r = ·2).',
            },
            scheme2: {
              heading: 'Fórmula de Suma en PA',
              detail: 'Sn = [(a1 + an) · n] / 2.',
            },
            practicalExample: 'Plan de entrenamiento progresivo: empiezas con 10 minutos el día 1 y sumas 2 minutos cada día (PA con a1=10 y d=2).',
            quizQ: 'En la progresión aritmética 4, 7, 10, 13..., ¿cuánto vale la diferencia d y cuál es el quinto término (a5)?',
            quizOptions: ['d = 3 y a5 = 16', 'd = 4 y a5 = 17', 'd = 3 y a5 = 15'],
            correctIndex: 0,
            quizExp: 'Cada término se obtiene sumando d = 3 al anterior, por lo que a5 = 13 + 3 = 16.',
          },
          {
            title: 'Polinomios, Regla de Ruffini y Teorema del Resto',
            summary: 'División de polinomios entre (x - a) mediante la caja de Ruffini, raíces enteras y factorización.',
            keyConcepts: ['Regla de Ruffini', 'Teorema del Resto: P(a) = Resto', 'Factorización de Polinomios'],
            scheme1: {
              heading: 'Cuidado al colocar el número en la caja de Ruffini',
              detail: 'Si divides entre (x - 2), en la esquina izquierda de Ruffini pones +2 (signo cambiado). Y si falta algún grado en el polinomio, pon un 0.',
            },
            scheme2: {
              heading: 'Teorema del Resto',
              detail: 'El resto de dividir P(x) entre (x - a) coincide con el valor numérico P(a). Si el resto da 0, "a" es una raíz exacta.',
            },
            practicalExample: 'Factorizar x^2 - 5x + 6 probando divisores de 6 (±1, ±2, ±3) en Ruffini.',
            quizQ: 'Si queremos dividir un polinomio entre (x + 3) aplicando la Regla de Ruffini, ¿qué número debemos colocar a la izquierda de la caja?',
            quizOptions: ['+3', '-3 (siempre se cambia el signo del divisor)', '0'],
            correctIndex: 1,
            quizExp: 'Al dividir entre (x - a), colocamos a. Como (x + 3) = x - (-3), colocamos -3 en la caja de Ruffini.',
          },
        ],
      },
      {
        id: '3eso-geh',
        name: 'Geografía e Historia (3º ESO · Geografía Humana y Económica)',
        shortCode: 'GEH-3',
        description: 'Demografía, sectores económicos (primario, secundario, terciario), Unión Europea, globalización y organización territorial de España.',
        units: [
          {
            title: 'Los Sectores Económicos (Primario, Secundario y Terciario) y la UE',
            summary: 'Agricultura mediterránea, industria y deslocalización, terciarización de la economía e instituciones de la Unión Europea.',
            keyConcepts: ['Sector Primario, Secundario y Terciario', 'Parlamento, Comisión y Consejo de la UE', 'Objetivos de Desarrollo Sostenible (ODS)'],
            scheme1: {
              heading: 'Los 3 Sectores de Actividad de un Vistazo',
              detail: '1º Primario = Extrae de la naturaleza (agricultura, pesca). 2º Secundario = Transforma en fábricas e industria. 3º Terciario = Servicios (educación, sanidad, transporte, turismo).',
            },
            scheme2: {
              heading: 'Economía en la Comunidad Valenciana y Camp de Morvedre',
              detail: 'Agricultura citrícola de regadío, polo industrial y logístico en Sagunto y fuerte peso del sector servicios.',
            },
            practicalExample: 'Estudio del impacto del parque empresarial e industrial de Parc Sagunt en la comarca.',
            quizQ: '¿A qué sector económico pertenecen la enseñanza en el IES Clot del Moro, la sanidad y el transporte?',
            quizOptions: ['Sector primario', 'Sector secundario', 'Sector terciario (servicios)'],
            correctIndex: 2,
            quizExp: 'Las actividades que no producen bienes materiales sino servicios a la población forman el sector terciario.',
          },
        ],
      },
      {
        id: '3eso-lcl',
        name: 'Lengua Castellana y Literatura (3º ESO · Edad Media y Siglo de Oro)',
        shortCode: 'LCL-3',
        description: 'Oración simple completa (CRég, CAg, CPred), literatura medieval (Mio Cid, La Celestina), Renacimiento (Lazarillo, Garcilaso) y Cervantes.',
        units: [
          {
            title: 'Del Cantar de Mio Cid y La Celestina al Lazarillo y Don Quijote',
            summary: 'Hitos de la literatura española: épica medieval, novela picaresca realista y el nacimiento de la novela moderna con Cervantes.',
            keyConcepts: ['Mester de Juglaría vs Clerecía', 'El Antihéroe Picaresco (Lazarillo, 1554)', 'Don Quijote (Idealismo vs Realismo)'],
            scheme1: {
              heading: 'Juglaría vs Clerecía en la Edad Media',
              detail: 'Juglaría = Oral, anónimo, métrica irregular (Cantar de Mio Cid). Clerecía = Escrito por clérigos cultos, cuaderna vía de 14 sílabas (Gonzalo de Berceo).',
            },
            scheme2: {
              heading: 'La pareja inmortal de Cervantes (1605 - 1615)',
              detail: 'Don Quijote representa el idealismo y la justicia; Sancho Panza representa el sentido común práctico.',
            },
            practicalExample: 'Lectura guiada del episodio de los molinos de viento y del tratado primero del Lazarillo de Tormes.',
            quizQ: '¿Qué obra anónima publicada en 1554 inaugura el género de la novela picaresca en España?',
            quizOptions: ['El Conde Lucanor', 'El Lazarillo de Tormes', 'La Galatea'],
            correctIndex: 1,
            quizExp: 'La vida de Lazarillo de Tormes (1554) inaugura la novela picaresca protagonizada por un antihéroe que sirve a varios amos.',
          },
        ],
      },
      {
        id: '3eso-val',
        name: 'Valencià: Llengua i Literatura (3º ESO)',
        shortCode: 'VAL-3',
        description: 'Combinació binària de pronoms febles, connectors argumentatius, Ramon Llull, Ausiàs March i sociolingüística.',
        units: [
          {
            title: 'Combinació de Pronoms Febles (CI + CD: li’l, li la, els ho, se’n)',
            summary: 'Ordre dels pronoms febles combinats i apostrofació davant i darrere del verb.',
            keyConcepts: ['Ordre: Reflexiu (SE) + CI (LI/ELS) + CD (EL/LA/HO/EN)', 'LI + HO → LI HO', 'ELS + EL → ELS EL'],
            scheme1: {
              heading: 'Fórmula d’Ordre dels Pronoms Combinats',
              detail: 'Primer va sempre la persona (CI: em, et, li, ens, vos, els) i després la cosa (CD: el, la, els, les, ho, en). Exemple: "Dóna el llibre a Marta" → "Dóna-li’l".',
            },
            scheme2: {
              heading: 'Regla dels guionets darrere del verb',
              detail: 'Si els pronoms van darrere del verb (imperatiu o infinitiu), s’uneixen amb guionet o apòstrof: compra-me’l, dir-li-ho.',
            },
            practicalExample: '"Explica això als teus pares" → CI (als teus pares = els) + CD neutre (això = ho) → "Explica’ls-ho".',
            quizQ: 'Com substituïm els dos complements en l’oració: "Regala la pilota a Joan"?',
            quizOptions: ['Regala-la-li', 'Regala-li-la (primer CI "li" i després CD "la")', 'Regala-li-ho'],
            correctIndex: 1,
            quizExp: 'En valencià l’ordre és CI + CD: a Joan (li) + la pilota (la) = Regala-li-la.',
          },
        ],
      },
      {
        id: '3eso-ing',
        name: 'Inglés · English (3º ESO)',
        shortCode: 'ENG-3',
        description: 'Present Perfect (For, Since, Just, Already, Yet), Second Conditional & Passive Voice (Present and Past).',
        units: [
          {
            title: 'Present Perfect (For / Since / Just / Already / Yet) & Passive Voice',
            summary: 'Diferencia entre duración (For) y punto de inicio (Since), y transformación de activa a pasiva (Be + Past Participle).',
            keyConcepts: ['FOR + Period of Time vs SINCE + Starting Point', 'ALREADY (+) vs YET (- / ?)', 'Passive: Object + Be + Past Participle + BY'],
            scheme1: {
              heading: 'FOR vs SINCE sin dudar',
              detail: 'FOR + cantidad de tiempo ("for ten minutes", "for two years"). SINCE + momento exacto de inicio ("since 2022", "since Monday").',
            },
            scheme2: {
              heading: '3 Pasos para pasar a Voz Pasiva',
              detail: '1. El Objeto pasa a ser Sujeto → 2. Pon el verbo TO BE en el mismo tiempo del verbo original → 3. Añade el verbo principal en Participio (-ed / 3ª columna).',
            },
            practicalExample: 'Activa: "Cervantes wrote Don Quixote" (Past Simple) → Pasiva: "Don Quixote WAS WRITTEN by Cervantes".',
            quizQ: 'Complete the sentence: "I have studied at IES Clot del Moro ___ September."',
            quizOptions: ['for', 'since (point in time)', 'yet'],
            correctIndex: 1,
            quizExp: 'September is a specific starting point in time, so we use SINCE.',
          },
        ],
      },
    ],
    flashcards: [
      {
        subject: 'Biología y Geología (3º ESO)',
        question: '¿Qué vasos sanguíneos salen siempre de los ventrículos y cuáles entran siempre a las aurículas?',
        answer: 'Las ARTERIAS salen de los ventrículos y las VENAS entran (vuelven) a las aurículas.',
        mnemonicHint: 'Venas = Vuelven al corazón | Arterias = Se Alejan del corazón.',
      },
      {
        subject: 'Física y Química (3º ESO)',
        question: '¿Cómo se calcula el número de moles (n) a partir de la masa en gramos?',
        answer: 'n = masa en gramos (m) / Masa Molar (M).',
        mnemonicHint: 'Gramos dividido entre lo que pesa 1 mol en la tabla periódica.',
      },
      {
        subject: 'Matemáticas (3º ESO)',
        question: '¿Cuál es el término general de una Progresión Aritmética (PA)?',
        answer: 'an = a1 + (n - 1) · d',
        mnemonicHint: 'Primer término más (n - 1) saltos de diferencia d.',
      },
    ],
  },
  '4ESO': {
    courseLabel: '4º de la ESO',
    subjects: [
      {
        id: '4eso-geh',
        name: 'Geografía e Historia (4º ESO · Historia Contemporánea)',
        shortCode: 'GEH-4',
        description: 'Ilustración, Revolución Francesa e Industrial, Primera y Segunda Guerra Mundial, Guerra Fría e Historia de España Contemporánea.',
        units: [
          {
            title: 'Crisis del Antiguo Régimen, Ilustración y Revolución Francesa (1789)',
            summary: 'Montesquieu, Rousseau y Voltaire, toma de la Bastilla, Declaración de Derechos del Hombre y etapa napoleónica.',
            keyConcepts: ['División de Poderes (Montesquieu)', 'Soberanía Nacional', 'Revolución Industrial (Máquina de Vapor)'],
            scheme1: {
              heading: 'Antiguo Régimen vs Liberalismo Ilustrado',
              detail: 'Antiguo Régimen = Monarquía absoluta y sociedad estamental. Ilustración = División de poderes (legislativo, ejecutivo y judicial) e igualdad ante la ley.',
            },
            scheme2: {
              heading: 'Fases de la Revolución Francesa (1789 - 1799)',
              detail: 'Asamblea Nacional (1789) → Convención Jacobina (1793) → Directorio → Consulado e Imperio de Napoleón.',
            },
            practicalExample: 'La Constitución de Cádiz de 1812 ("La Pepa") como primer texto liberal en la historia de España.',
            quizQ: '¿Qué pensador ilustrado formuló la teoría de la división de poderes (legislativo, ejecutivo y judicial)?',
            quizOptions: ['Montesquieu', 'Luis XIV', 'Metternich'],
            correctIndex: 0,
            quizExp: 'Montesquieu propuso en "El espíritu de las leyes" la separación de poderes para evitar el absolutismo.',
          },
          {
            title: 'Primera Guerra Mundial, Revolución Rusa, Segunda Guerra Mundial y Guerra Fría',
            summary: 'Alianzas de 1914, Tratado de Versalles, crack del 29, ascenso de los totalitarismos, II Guerra Mundial (1939-1945) y mundo bipolar.',
            keyConcepts: ['Triple Alianza vs Triple Entente (1914)', 'II Guerra Mundial (1939 - 1945)', 'Bloque Occidental (OTAN) vs Soviético (Pacto de Varsovia)'],
            scheme1: {
              heading: 'Causas de la Primera Guerra Mundial (1914 - 1918)',
              detail: 'Rivalidad imperialista y colonial, carrera de armamentos ("Paz Armada"), nacionalismos balcánicos y asesinato del archiduque en Sarajevo.',
            },
            scheme2: {
              heading: 'La Guerra Fría (1947 - 1991)',
              detail: 'Mundo dividido en dos bloques liderados por EE. UU. (capitalismo) y la URSS (comunismo), simbolizado por el Muro de Berlín (caído en 1989).',
            },
            practicalExample: 'Análisis de mapas históricos de Europa antes y después de los tratados de paz.',
            quizQ: '¿Qué acontecimiento de noviembre de 1989 simbolizó el final de la Guerra Fría en Europa?',
            quizOptions: ['El Tratado de Versalles', 'La caída del Muro de Berlín', 'El desembarco de Normandía'],
            correctIndex: 1,
            quizExp: 'La caída del Muro de Berlín en 1989 marcó el fin de la división de Europa durante la Guerra Fría.',
          },
        ],
      },
      {
        id: '4eso-mat',
        name: 'Matemáticas (4º ESO)',
        shortCode: 'MAT-4',
        description: 'Logaritmos, trigonometría, vectores y ecuaciones de la recta, funciones exponenciales/logarítmicas y probabilidad.',
        units: [
          {
            title: 'Logaritmos y Trigonometría (Seno, Coseno y Tangente)',
            summary: 'Definición y propiedades de los logaritmos, razones trigonométricas en el triángulo rectángulo e identidad fundamental.',
            keyConcepts: ['log_a(b) = c ⇔ a^c = b', 'SOH - CAH - TOA (Sen, Cos, Tan)', 'sen^2(α) + cos^2(α) = 1'],
            scheme1: {
              heading: 'Las 3 Propiedades de los Logaritmos',
              detail: 'Producto → Suma: log(A·B) = log A + log B | Cociente → Resta: log(A/B) = log A - log B | Potencia → Delante: log(A^n) = n·log A.',
            },
            scheme2: {
              heading: 'Truco SOH-CAH-TOA en Trigonometría',
              detail: 'Seno = Opuesto / Hipotenusa | Coseno = Contiguo / Hipotenusa | Tangente = Opuesto / Contiguo.',
            },
            practicalExample: 'Medir la altura del edificio del IES Clot del Moro conociendo la distancia a la fachada y el ángulo de elevación.',
            quizQ: '¿Cuál es el valor exacto de log_2(8)? (Piensa: ¿a qué exponente hay que elevar 2 para obtener 8?)',
            quizOptions: ['4', '3 (porque 2^3 = 8)', '16'],
            correctIndex: 1,
            quizExp: 'Por definición de logaritmo, log_2(8) = 3 porque 2 elevado a 3 es 8.',
          },
        ],
      },
      {
        id: '4eso-fyq',
        name: 'Física y Química (4º ESO · Dinámica, Energía y Química del Carbono)',
        shortCode: 'FYQ-4',
        description: 'Cinemática MRUA y caída libre, las 3 Leyes de Newton, trabajo y energía mecánica, hidrostática y formulación orgánica.',
        units: [
          {
            title: 'Dinámica (Las 3 Leyes de Newton) y Conservación de la Energía Mecánica',
            summary: 'Inercia, ΣF = m · a, acción y reacción, fuerza de rozamiento, energía cinética, potencial y teorema de conservación.',
            keyConcepts: ['2ª Ley de Newton: ΣF = m · a', 'Ec = 1/2 · m · v^2', 'Ep = m · g · h'],
            scheme1: {
              heading: 'Las 3 Leyes de Newton',
              detail: '1ª Inercia (si ΣF = 0, reposo o MRU) | 2ª Fundamental (ΣF = m · a) | 3ª Acción y Reacción (fuerzas iguales y opuestas en cuerpos distintos).',
            },
            scheme2: {
              heading: 'Conservación de la Energía Mecánica (sin rozamiento)',
              detail: 'Em = Ec + Ep = constante. Lo que un cuerpo pierde de altura (Ep) lo gana en velocidad (Ec).',
            },
            practicalExample: 'Cálculo de la velocidad con la que llega al suelo un balón que cae desde 5 metros de altura: v = √(2·g·h).',
            quizQ: 'Según la 2ª Ley de Newton (F = m · a), ¿qué aceleración adquiere un cuerpo de 4 kg si actúa sobre él una fuerza resultante de 20 N?',
            quizOptions: ['80 m/s^2', '5 m/s^2 (porque a = F / m = 20 / 4)', '16 m/s^2'],
            correctIndex: 1,
            quizExp: 'Despejando de la Segunda Ley de Newton: a = F / m = 20 N / 4 kg = 5 m/s^2.',
          },
        ],
      },
      {
        id: '4eso-bio',
        name: 'Biología y Geología (4º ESO · Genética, Evolución y Tectónica)',
        shortCode: 'BIO-4',
        description: 'ADN, replicación, transcripción y traducción, Leyes de Mendel, evolución darwinista y tectónica de placas.',
        units: [
          {
            title: 'Genética Molecular (ADN → ARN → Proteína) y Leyes de Mendel',
            summary: 'Complementariedad de bases (A-T / C-G en ADN; A-U en ARN), cuadros de Punnett, genotipo y fenotipo.',
            keyConcepts: ['ADN (Timina) vs ARN (Uracilo)', 'Genotipo + Ambiente = Fenotipo', 'Cuadro de Punnett (Aa x Aa)'],
            scheme1: {
              heading: 'Dogma Central de la Biología Molecular',
              detail: 'Replicación (ADN → ADN) | Transcripción (ADN → ARNm cambiando T por U) | Traducción en ribosomas (ARNm → Proteína de aminoácidos).',
            },
            scheme2: {
              heading: '2ª Ley de Mendel: Cruce de dos Heterocigotos (Aa x Aa)',
              detail: 'Proporción en el cuadro de Punnett: 25% AA, 50% Aa y 25% aa → 75% Fenotipo Dominante y 25% Fenotipo Recesivo (3:1).',
            },
            practicalExample: 'Resolución de árboles genealógicos de herencia del grupo sanguíneo AB0.',
            quizQ: 'Si una hebra molde de ADN tiene la secuencia TAC-GGA, ¿cuál será la secuencia complementaria de ARN mensajero (ARNm)?',
            quizOptions: ['ATG-CCT', 'AUG-CCU (en el ARN la Adenina se une con Uracilo U)', 'UAC-GGA'],
            correctIndex: 1,
            quizExp: 'En la transcripción a ARN: T→A, A→U (Uracilo en vez de Timina), C→G y G→C, resultando AUG-CCU.',
          },
        ],
      },
      {
        id: '4eso-lcl',
        name: 'Lengua Castellana y Literatura (4º ESO · Oración Compuesta y Siglos XIX-XX)',
        shortCode: 'LCL-4',
        description: 'Oraciones coordinadas y subordinadas (sustantivas, adjetivas y adverbiales), Romanticismo, Realismo, Generación del 98 y del 27.',
        units: [
          {
            title: 'La Oración Compuesta (Coordinadas y Subordinadas) y Generaciones del 98 y 27',
            summary: 'Trucos de sustitución para distinguir subordinadas sustantivas (ESO) y de relativo (EL CUAL), y grandes autores contemporáneos.',
            keyConcepts: ['Subordinada Sustantiva (= ESO)', 'Subordinada de Relativo (= EL CUAL)', 'Generación del 98 (Machado, Unamuno, Baroja) y del 27 (Lorca)'],
            scheme1: {
              heading: 'Detector TDAH de Subordinadas en 2 Pasos',
              detail: '1. ¿Toda la subordinada se puede cambiar por la palabra "ESO"? → Es SUSTANTIVA ("Quiero que vengas" = "Quiero ESO"). 2. ¿Lleva antecedente y el "que" equivale a "el cual"? → Es de RELATIVO.',
            },
            scheme2: {
              heading: 'Generación del 98 vs Generación del 27',
              detail: '98 = Preocupación por España y paso del tiempo (Machado, Unamuno). 27 = Fusión de tradición popular y vanguardia (Federico García Lorca, Alberti, Cernuda).',
            },
            practicalExample: 'Análisis sintáctico paso a paso de oraciones compuestas para preparar el salto a Bachillerato.',
            quizQ: 'En la oración "Me alegra que hayas aprobado el examen", la subordinada se sustituye por "ESO" ("Me alegra eso"). ¿Qué tipo de subordinada es?',
            quizOptions: [
              'Subordinada de relativo',
              'Subordinada sustantiva (en función de Sujeto)',
              'Coordinada adversativa',
            ],
            correctIndex: 1,
            quizExp: 'Al poder sustituirse por "ESO" ("Me alegra eso / Me alegran esas cosas"), es una oración subordinada sustantiva de sujeto.',
          },
        ],
      },
      {
        id: '4eso-val',
        name: 'Valencià: Llengua i Literatura (4º ESO)',
        shortCode: 'VAL-4',
        description: 'Oració composta en valencià, Renaixença, Modernisme i grans autors contemporanis (Vicent Andrés Estellés i Mercè Rodoreda).',
        units: [
          {
            title: 'L’Oració Composta i Literatura Contemporània (Estellés i Rodoreda)',
            summary: 'Subordinades substantives i adjectives, caiguda de preposició davant "que", i poesia i narrativa del segle XX.',
            keyConcepts: ['Llibre de Meravelles (Vicent Andrés Estellés)', 'La Plaça del Diamant (Mercè Rodoreda)', 'Assaig de Joan Fuster'],
            scheme1: {
              heading: 'Vicent Andrés Estellés (1924 - 1993)',
              detail: 'El gran poeta valencià contemporani: combina el llenguatge col·loquial del carrer amb la tradició d’Ausiàs March.',
            },
            scheme2: {
              heading: 'Normativa Sintàctica: Caiguda de preposició davant QUE',
              detail: 'Davant la conjunció completiva "que" cauen les preposicions a, de, en, amb: "M’alegre que vingues" (i no *"M’alegre de que vingues").',
            },
            practicalExample: 'Lectura comentada del poema "Assumiràs la veu d’un poble" de Vicent Andrés Estellés.',
            quizQ: 'Quina és la forma normativa en valencià quan un verb de règim va seguit de la conjunció completiva "que"?',
            quizOptions: [
              'Em recorde de que eres tu',
              'Em recorde que eres tu (la preposició cau davant la conjunció "que")',
              'Em recorde en que eres tu',
            ],
            correctIndex: 1,
            quizExp: 'En valencià les preposicions àtones (de, a, en, amb) cauen obligatòriament davant la conjunció completiva "que".',
          },
        ],
      },
    ],
    flashcards: [
      {
        subject: 'Matemáticas (4º ESO)',
        question: '¿Cuál es la identidad fundamental de la trigonometría que relaciona el seno y el coseno de un mismo ángulo?',
        answer: 'sen^2(α) + cos^2(α) = 1',
        mnemonicHint: 'Suma de cuadrados del seno y coseno siempre vale 1.',
      },
      {
        subject: 'Física y Química (4º ESO)',
        question: '¿Qué dice la 2ª Ley de Newton de la Dinámica?',
        answer: 'La suma de todas las fuerzas que actúan sobre un cuerpo es igual a su masa por su aceleración: ΣF = m · a.',
        mnemonicHint: 'Fuerza resultante = Masa × Aceleración.',
      },
      {
        subject: 'Lengua Castellana (4º ESO)',
        question: '¿Cómo diferenciamos rápido una subordinada sustantiva de una subordinada de relativo?',
        answer: 'La sustantiva se sustituye entera por "ESO"; la de relativo tiene antecedente y su nexo se sustituye por "EL CUAL / LA CUAL".',
        mnemonicHint: 'Sustantiva = ESO | Relativo = EL CUAL.',
      },
    ],
  },
  '1BACH': {
    courseLabel: '1º de Bachillerato',
    subjects: [
      {
        id: '1bach-fil',
        name: 'Filosofía (1º Bachillerato)',
        shortCode: 'FIL-1B',
        description: 'El paso del Mito al Logos, epistemología y verdad científica, antropología filosófica, ética (eudemonismo y formalismo) y filosofía política.',
        units: [
          {
            title: 'El Saber Filosófico, Epistemología y Teorías de la Ética',
            summary: 'Del Mito al Logos en Grecia, racionalismo vs empirismo, ética material de Aristóteles (felicidad) vs ética formal de Kant (deber).',
            keyConcepts: ['Del Mito al Logos', 'Racionalismo (Descartes) vs Empirismo (Hume)', 'Ética Eudemonista (Aristóteles) vs Deontológica (Kant)'],
            scheme1: {
              heading: 'Racionalismo vs Empirismo en Epistemología',
              detail: 'Racionalismo (Descartes): la fuente segura del conocimiento es la Razón (ideas innatas). Empirismo (Hume): todo conocimiento empieza en la Experiencia sensible.',
            },
            scheme2: {
              heading: 'Aristóteles vs Kant en Ética',
              detail: 'Aristóteles (Ética Material): actuamos buscando un fin, la Felicidad (Eudaimonía) mediante la virtud del término medio. Kant (Ética Formal): actuamos por puro Deber (Imperativo Categórico).',
            },
            practicalExample: 'Debate filosófico en 1º de Bachillerato del IES Clot del Moro sobre dilemas éticos de la Inteligencia Artificial.',
            quizQ: '¿Qué filósofo defiende una ética formal basada en el "Imperativo Categórico" y en actuar por deber sin buscar recompensas externas?',
            quizOptions: ['Epicuro', 'Immanuel Kant', 'John Stuart Mill'],
            correctIndex: 1,
            quizExp: 'Kant formula la ética formal y autónoma basada en el deber y el Imperativo Categórico.',
          },
        ],
      },
      {
        id: '1bach-mat',
        name: 'Matemáticas I / CCSS I (1º Bachillerato)',
        shortCode: 'MAT-1B',
        description: 'Números complejos, trigonometría analítica, geometría vectorial, límites y continuidad, derivadas y distribución normal.',
        units: [
          {
            title: 'Límites, Continuidad y Cálculo de Derivadas (Tabla y Regla de la Cadena)',
            summary: 'Indeterminaciones (∞/∞, 0/0), asíntotas verticales y horizontales, definición de derivada como pendiente de la recta tangente y optimización.',
            keyConcepts: ['Derivada = Pendiente de la Recta Tangente f’(x)', 'Derivada de un Producto: (u·v)’ = u’·v + u·v’', 'Máximos y Mínimos: f’(x) = 0'],
            scheme1: {
              heading: 'Reglas de Derivación Esenciales',
              detail: '(x^n)’ = n·x^(n-1) | (e^x)’ = e^x | (ln x)’ = 1/x | Producto: (u·v)’ = u’v + uv’ | Cociente: (u/v)’ = (u’v - uv’) / v^2.',
            },
            scheme2: {
              heading: 'Cómo hallar Máximos, Mínimos y Monotonía',
              detail: '1. Calcula la primera derivada f’(x). 2. Iguala f’(x) = 0 para hallar los puntos críticos. 3. Estudia el signo de f’(x) (+ crece, - decrece).',
            },
            practicalExample: 'Cálculo del precio óptimo de una entrada para maximizar los ingresos del viaje de estudios de Bachillerato.',
            quizQ: 'Si una función es f(x) = x^3 - 6x^2 + 5, ¿cuál es su función derivada f’(x)?',
            quizOptions: ['3x^2 - 12x', '3x^2 - 6x + 5', 'x^2 - 12x'],
            correctIndex: 0,
            quizExp: 'Derivando término a término: (x^3)’ = 3x^2, (-6x^2)’ = -12x y la derivada de la constante 5 es 0.',
          },
        ],
      },
      {
        id: '1bach-lcl',
        name: 'Lengua Castellana y Literatura I (1º Bachillerato)',
        shortCode: 'LCL-1B',
        description: 'Morfología derivativa y parasintética, los 7 valores del SE, sintaxis avanzada y literatura clásica hasta el siglo XIX.',
        units: [
          {
            title: 'Morfología (Simples, Derivadas, Compuestas y Parasintéticas) y Valores del SE',
            summary: 'Segmentación en raíz, prefijos, sufijos y morfemas flexivos, y cuadro paso a paso para distinguir los 7 valores de SE.',
            keyConcepts: ['Parasíntesis (Prefijo + Raíz + Sufijo simultáneos)', 'SE Impersonal vs SE Pasiva Refleja', 'SE Reflexivo, Recíproco y Pronominal'],
            scheme1: {
              heading: 'Cómo distinguir SE Impersonal vs SE Pasiva Refleja',
              detail: 'Pasiva Refleja: TIENE Sujeto paciente que concuerda con el verbo ("Se venden pisos"). Impersonal: NO tiene sujeto y el verbo va siempre en 3ª persona singular ("Se vive bien aquí").',
            },
            scheme2: {
              heading: 'Prueba de la Palabra Parasintética',
              detail: 'Tiene Prefijo + Raíz + Sufijo a la vez porque no existen por separado ni "Prefijo+Raíz" ni "Raíz+Sufijo" (ej. en-vej-ecer: no existe *envejo ni *vejecer).',
            },
            practicalExample: 'Análisis morfológico de palabras tipo examen de Bachillerato: "aterrizaje", "enamorado", "paraguas".',
            quizQ: 'En la oración "Se alquilan apartamentos en la playa", ¿qué valor tiene el morfema SE?',
            quizOptions: [
              'SE Impersonal',
              'Marca de Pasiva Refleja (porque "apartamentos" es Sujeto plural y concuerda con "alquilan")',
              'SE Recíproco',
            ],
            correctIndex: 1,
            quizExp: 'Como "apartamentos" concuerda en plural con el verbo "alquilan", es el Sujeto Paciente y el SE es marca de Pasiva Refleja.',
          },
        ],
      },
      {
        id: '1bach-val',
        name: 'Valencià: Llengua i Literatura I (1º Bachillerato)',
        shortCode: 'VAL-1B',
        description: 'Fonètica (vocals obertes i tancades, sonorització), adequació i cohesió textual, i literatura dels segles XIII al XIX.',
        units: [
          {
            title: 'Fonètica (Al·lòfons i Neutralització) i Propietats del Text',
            summary: 'Transcripció fonètica bàsica, sonorització de sibilants i mecanismes de referència lèxica i gramatical.',
            keyConcepts: ['7 Vocals Tòniques del Valencià', 'Sonorització de -s- intervocàlica [z]', 'Anàfora, Catàfora i El·lipsi'],
            scheme1: {
              heading: 'Anàfora vs Catàfora en l’Anàlisi Textual',
              detail: 'Anàfora: un pronom remet a una paraula que JA ha eixit abans en el text. Catàfora: anuncia una paraula que eixirà DESPRÉS.',
            },
            scheme2: {
              heading: 'Les 3 Propietats del Text',
              detail: 'Adequació (registre i intenció), Coherència (tema i estructura d’idees) i Cohesió (connectors i pronoms).',
            },
            practicalExample: 'Pràctica de comentari lingüístic amb textos periodístics actuals.',
            quizQ: 'Com s’anomena el mecanisme de cohesió pel qual un pronom es refereix a un element que ja ha aparegut ANTES en el text?',
            quizOptions: ['Catàfora', 'Anàfora', 'Polisèmia'],
            correctIndex: 1,
            quizExp: 'La referència anafòrica (anàfora) recupera mitjançant un pronom un referent esmentat anteriorment.',
          },
        ],
      },
      {
        id: '1bach-ing',
        name: 'Inglés I · English (1º Bachillerato)',
        shortCode: 'ENG-1B',
        description: 'Perfect Tenses, Conditionals (0, 1, 2, 3), Causative Passive (Have/Get something done), Relative Clauses & B2 Essays.',
        units: [
          {
            title: 'Third Conditional, Wish Clauses & Causative (Have/Get Something Done)',
            summary: 'Hipótesis imposibles sobre el pasado (3rd Conditional) y estructuras causativas de nivel B2.',
            keyConcepts: ['3rd Conditional: If + Past Perfect, Would have + Participle', 'Causative: Have/Get + Object + Past Participle', 'Defining vs Non-defining Relatives'],
            scheme1: {
              heading: 'Fórmula del Third Conditional (Pasado Irreal)',
              detail: 'IF + Had + Past Participle , WOULD HAVE + Past Participle. ("If I had known, I would have helped you").',
            },
            scheme2: {
              heading: 'Estructura Causativa (Cuando encargas un servicio a un profesional)',
              detail: 'Subject + HAVE / GET + Object + Past Participle. ("I had my computer repaired yesterday").',
            },
            practicalExample: 'Rephrasing exercises preparing for the B2 and PAU Use of English section.',
            quizQ: 'Choose the correct Causative transformation for: "A mechanic repaired my bike yesterday."',
            quizOptions: [
              'I repaired my bike yesterday.',
              'I had my bike repaired yesterday.',
              'I had repaired my bike yesterday.',
            ],
            correctIndex: 1,
            quizExp: 'The causative structure is Subject + had + Object (my bike) + Past Participle (repaired).',
          },
        ],
      },
      {
        id: '1bach-fyq',
        name: 'Física y Química / Biología (1º Bachillerato)',
        shortCode: 'CIE-1B',
        description: 'Estequiometría con reactivo limitante, termoquímica (Ley de Hess), equilibrio químico, tiro parabólico y bioquímica.',
        units: [
          {
            title: 'Reactivo Limitante, Termoquímica (Ley de Hess) y Cinemática Vectorial',
            summary: 'Cálculos estequiométricos con pureza y rendimiento, reacciones exotérmicas/endotérmicas y composición de movimientos.',
            keyConcepts: ['Entalpía ΔH < 0 (Exotérmica) vs ΔH > 0 (Endotérmica)', 'Tiro Parabólico (MRU en X + MRUA en Y)', 'Reactivo Limitante'],
            scheme1: {
              heading: 'Signo de la Variación de Entalpía (ΔH)',
              detail: 'Si ΔH es NEGATIVO (< 0): la reacción desprende calor (EXOTÉRMICA). Si ΔH es POSITIVO (> 0): absorbe calor (ENDOTÉRMICA).',
            },
            scheme2: {
              heading: 'Descomposición del Tiro Parabólico',
              detail: 'Eje horizontal X: Velocidad constante (MRU, vx = v0·cos α). Eje vertical Y: Gravedad (MRUA, vy = v0·sen α - g·t).',
            },
            practicalExample: 'Cálculo de la altura máxima de un lanzamiento en el laboratorio de Física de 1º de Bachillerato.',
            quizQ: 'Si una reacción química tiene una variación de entalpía ΔH = -393,5 kJ/mol, ¿de qué tipo es la reacción?',
            quizOptions: [
              'Endotérmica (absorbe calor)',
              'Exotérmica (desprende calor al entorno porque ΔH < 0)',
              'Atérmica',
            ],
            correctIndex: 1,
            quizExp: 'Cuando ΔH es negativa (ΔH < 0), los productos tienen menos energía que los reactivos y se libera calor (exotérmica).',
          },
        ],
      },
    ],
    flashcards: [
      {
        subject: 'Filosofía (1º Bach)',
        question: '¿Qué diferencia fundamental hay entre la ética de Aristóteles y la ética de Kant?',
        answer: 'Aristóteles propone una ética material teleológica (busca la felicidad mediante la virtud), mientras que Kant propone una ética formal deontológica (actuar por puro deber).',
        mnemonicHint: 'Aristóteles = Fin (Felicidad) | Kant = Deber (Imperativo Categórico).',
      },
      {
        subject: 'Matemáticas I (1º Bach)',
        question: '¿Cómo se deriva un producto de dos funciones f(x) = u(x) · v(x)?',
        answer: 'f’(x) = u’ · v + u · v’ (derivada de la primera por la segunda sin derivar, más la primera sin derivar por la derivada de la segunda).',
        mnemonicHint: 'Derivada del 1º × 2º + 1º × Derivada del 2º.',
      },
      {
        subject: 'Lengua Castellana I (1º Bach)',
        question: '¿Cómo se distingue una oración con SE Impersonal de una con SE Pasiva Refleja?',
        answer: 'La Pasiva Refleja tiene un Sujeto Paciente que concuerda en singular/plural con el verbo ("Se venden pisos"), mientras que la Impersonal no tiene sujeto y va siempre en singular ("Se vive bien").',
        mnemonicHint: 'Si puedes poner el verbo en plural, es Pasiva Refleja.',
      },
    ],
  },
  '2BACH': {
    courseLabel: '2º de Bachillerato (PAU / EBAU)',
    subjects: [
      {
        id: '2bach-his',
        name: 'Historia de España (2º Bachillerato · PAU)',
        shortCode: 'HIS-PAU',
        description: 'Temario oficial PAU Comunidad Valenciana: Siglo XIX (Cádiz, Isabel II, Sexenio, Restauración) y Siglo XX (Primo de Rivera, II República, Guerra Civil, Franquismo y Transición).',
        units: [
          {
            title: 'Construcción del Estado Liberal (1808-1874) y la Restauración Borbónica (1875-1923)',
            summary: 'Cortes de Cádiz (1812), reinado de Isabel II, desamortizaciones de Mendizábal y Madoz, sistema canovista del turnismo y crisis del 98.',
            keyConcepts: ['Constitución de 1812 vs 1845 vs 1876', 'Sistema Canovista: Bipartidismo, Caciquismo y Pucherazo', 'Regeneracionismo (Joaquín Costa)'],
            scheme1: {
              heading: 'Claves del Sistema de la Restauración de Cánovas (1875)',
              detail: '1. Constitución flexible de 1876 → 2. Turno pacífico entre el Partido Conservador (Cánovas) y el Partido Liberal (Sagasta) → 3. Fraude electoral mediante el encasillado y el caciquismo.',
            },
            scheme2: {
              heading: 'Desamortizaciones del Siglo XIX',
              detail: 'Mendizábal (1836): bienes del clero regular para financiar la Guerra Carlista. Madoz (1855): bienes municipales (propios y comunes) para financiar el ferrocarril.',
            },
            practicalExample: 'Esquema comparativo de todas las Constituciones españolas (1812, 1837, 1845, 1869, 1876, 1931 y 1978) para el examen PAU.',
            quizQ: '¿Quién fue el artífice político del sistema de la Restauración borbónica en 1875 basado en el turno pacífico de partidos?',
            quizOptions: ['Juan Prim', 'Antonio Cánovas del Castillo', 'Miguel Primo de Rivera'],
            correctIndex: 1,
            quizExp: 'Antonio Cánovas del Castillo diseñó el sistema político de la Restauración de Alfonso XII y la Constitución de 1876.',
          },
          {
            title: 'Segunda República (1931-1936), Guerra Civil, Franquismo y Transición (1975-1982)',
            summary: 'Bienio Reformista, Constitución de 1931, etapas de la dictadura franquista (Autarquía vs Desarrollismo) y la Constitución de 1978.',
            keyConcepts: ['Constitución de 1931 (Sufragio Femenino)', 'Autarquía (años 40) vs Plan de Estabilización (1959)', 'Ley para la Reforma Política (1976) y Constitución de 1978'],
            scheme1: {
              heading: 'Las 2 Grandes Etapas Económicas del Franquismo',
              detail: '1939-1959: Autarquía, racionamiento y aislamiento internacional. 1959-1975: Plan de Estabilización (tecnócratas del Opus Dei), desarrollismo industrial, turismo y emigración.',
            },
            scheme2: {
              heading: 'Hitos de la Transición Democrática',
              detail: '1975: Proclamación de Juan Carlos I → 1976: Adolfo Suárez y Ley para la Reforma Política → 1977: Primeras elecciones democráticas y Pactos de la Moncloa → 6 dic 1978: Referéndum de la Constitución.',
            },
            practicalExample: 'Práctica de comentario de fuentes históricas PAU con adaptación de tiempo (+25%) para alumnado con TDAH.',
            quizQ: '¿Qué plan económico de 1959 puso fin a la etapa de autarquía e inició el desarrollismo durante el franquismo?',
            quizOptions: [
              'Los Pactos de la Moncloa',
              'El Plan de Estabilización de 1959',
              'La Desamortización de Madoz',
            ],
            correctIndex: 1,
            quizExp: 'El Plan de Estabilización de 1959 liberalizó la economía española, poniendo fin a la autarquía.',
          },
        ],
      },
      {
        id: '2bach-fil',
        name: 'Historia de la Filosofía (2º Bachillerato · PAU)',
        shortCode: 'FIL-PAU',
        description: 'Autores PAU: Platón, Aristóteles, Descartes, Hume, Kant, Marx, Nietzsche, Ortega y Gasset y Hannah Arendt.',
        units: [
          {
            title: 'Platón (Mundo de las Ideas) y Aristóteles (Hilemorfismo y Eudemonismo)',
            summary: 'El Mito de la Caverna, dualismo ontológico y antropológico de Platón, y la crítica realista de Aristóteles (sustancia, potencia y acto).',
            keyConcepts: ['Mundo Sensible vs Mundo Inteligible (Idea del Bien)', 'Alma Racional, Irascible y Concupiscible', 'Potencia y Acto (Aristóteles)'],
            scheme1: {
              heading: 'Dualismo de Platón vs Hilemorfismo de Aristóteles',
              detail: 'Platón separa la realidad en dos mundos (Sensible aparente e Ideas eternas). Aristóteles afirma que solo existe este mundo y cada sustancia es unión inseparable de Materia y Forma (Hilemorfismo).',
            },
            scheme2: {
              heading: 'Justicia en la Polis de Platón (La República)',
              detail: 'Filósofos-gobernantes (Prudencia) + Guardianes-guerreros (Fortaleza) + Productores (Templanza) = Armonía y Justicia.',
            },
            practicalExample: 'Estructura en 3 pasos para responder la pregunta de comparación de autores en la PAU.',
            quizQ: 'En la alegoría del Mito de la Caverna de Platón, ¿qué representa el Sol que brilla en el mundo exterior?',
            quizOptions: [
              'Las sombras de la opinión (doxa)',
              'La Idea suprema del Bien (causa de la verdad y del ser)',
              'El mundo sensible material',
            ],
            correctIndex: 1,
            quizExp: 'En el Libro VII de La República, el Sol exterior simboliza la Idea del Bien, cúspide del Mundo Inteligible.',
          },
          {
            title: 'Descartes, Kant, Marx y Nietzsche: Modernidad y Crítica Contemporánea',
            summary: 'El Cogito cartesiano, el giro copernicano de Kant, el materialismo histórico de Marx y el vitalismo de Nietzsche.',
            keyConcepts: ['"Pienso, luego existo" (Descartes)', 'Giro Copernicano e Imperativo Categórico (Kant)', 'Transvaloración y Superhombre (Nietzsche)'],
            scheme1: {
              heading: 'Cómo Kant supera el debate Racionalismo vs Empirismo',
              detail: '"Todo conocimiento comienza con la experiencia (Hume), pero no todo procede de ella: el sujeto pone las formas a priori de la sensibilidad y del entendimiento (Descartes)".',
            },
            scheme2: {
              heading: 'Marx (Infraestructura/Superestructura) vs Nietzsche (Apolíneo/Dionisíaco)',
              detail: 'Marx analiza la alienación económica y la lucha de clases. Nietzsche critica el platonismo y afirma la vida terrenal ("Voluntad de Poder" y "Amor Fati").',
            },
            practicalExample: 'Plantilla visual de sintaxis conceptual para redactar la disertación filosófica PAU sin perder el hilo.',
            quizQ: '¿Cuál es la primera verdad indudable a la que llega René Descartes tras aplicar la duda metódica?',
            quizOptions: [
              'Todo es materia en movimiento',
              'Cogito, ergo sum ("Pienso, luego existo")',
              'Dios ha muerto',
            ],
            correctIndex: 1,
            quizExp: 'Aunque el genio maligno me engañe en todo, para ser engañado tengo que estar pensando: "Pienso, luego existo".',
          },
        ],
      },
      {
        id: '2bach-mat',
        name: 'Matemáticas II / CCSS II (2º Bachillerato · PAU)',
        shortCode: 'MAT-PAU',
        description: 'Álgebra matricial (Rouché-Frobenius y Cramer), Geometría en R3, Derivabilidad (Bolzano y L’Hôpital), Integrales (Barrow) y Probabilidad (Bayes).',
        units: [
          {
            title: 'Matrices, Determinantes y Discusión de Sistemas (Rouché-Frobenius)',
            summary: 'Matriz inversa A^(-1), ecuaciones matriciales AX + B = C y discusión de sistemas con un parámetro k.',
            keyConcepts: ['A^(-1) = [Adj(A)^t] / |A|', 'Rango(A) = Rango(A*) = n → SCD', 'Regla de Cramer'],
            scheme1: {
              heading: 'Teorema de Rouché-Frobenius (3 Casos de Examen PAU)',
              detail: '1. rg(A) = rg(A*) = nº incógnitas (3) → Sistema Compatible Determinado (1 solución). 2. rg(A) = rg(A*) < 3 → Compatible Indeterminado (infinitas soluciones). 3. rg(A) ≠ rg(A*) → Incompatible (sin solución).',
            },
            scheme2: {
              heading: 'Condición para que exista Matriz Inversa',
              detail: 'Una matriz cuadrada A tiene inversa SI Y SOLO SI su determinante es distinto de cero (|A| ≠ 0).',
            },
            practicalExample: 'Resolución completa del Problema 1 de Álgebra de la PAU de la Comunidad Valenciana.',
            quizQ: 'En un sistema de 3 ecuaciones con 3 incógnitas, si Rango(A) = 2 y Rango(A*) = 3, ¿de qué tipo es el sistema según Rouché-Frobenius?',
            quizOptions: [
              'Sistema Compatible Determinado (SCD)',
              'Sistema Compatible Indeterminado (SCI)',
              'Sistema Incompatible (SI: no tiene solución porque los rangos son distintos)',
            ],
            correctIndex: 2,
            quizExp: 'Cuando el rango de la matriz de coeficientes (2) es distinto del rango de la matriz ampliada (3), el sistema es Incompatible.',
          },
          {
            title: 'Análisis PAU (L’Hôpital, Optimización e Integral Definida por Barrow) y Probabilidad',
            summary: 'Cálculo de áreas encerradas entre curvas con la Regla de Barrow y Teorema de la Probabilidad Total y de Bayes.',
            keyConcepts: ['Regla de Barrow: ∫_a^b f(x)dx = F(b) - F(a)', 'Teorema de Bolzano', 'Teorema de Bayes (Diagrama de Árbol)'],
            scheme1: {
              heading: '3 Pasos para Calcular el Área entre dos Curvas en la PAU',
              detail: '1. Iguala f(x) = g(x) para hallar los puntos de corte x = a y x = b. 2. Calcula la primitiva de (f(x) - g(x)). 3. Aplica la Regla de Barrow en valor absoluto |F(b) - F(a)|.',
            },
            scheme2: {
              heading: 'Teorema de Bayes con Diagrama de Árbol',
              detail: 'P(A_i | B) = [Rama favorable hacia B] / [Suma de todas las ramas que llegan a B].',
            },
            practicalExample: 'Cálculo de áreas e intervalos de confianza con calculadora científica permitida en la PAU.',
            quizQ: '¿Cuánto vale la integral definida de f(x) = 2x entre x = 0 y x = 3 aplicando la Regla de Barrow?',
            quizOptions: ['6 u^2', '9 u^2 (porque la primitiva es x^2, y 3^2 - 0^2 = 9)', '3 u^2'],
            correctIndex: 1,
            quizExp: 'Una primitiva de 2x es F(x) = x^2. Por la Regla de Barrow: F(3) - F(0) = 3^2 - 0^2 = 9.',
          },
        ],
      },
      {
        id: '2bach-lcl',
        name: 'Lengua Castellana y Literatura II (2º Bachillerato · PAU)',
        shortCode: 'LCL-PAU',
        description: 'Comentario de texto PAU (resumen, tema, estructura, modalización), sintaxis inversa/pares mínimos y autores PAU (Machado, Lorca, Laforet, Miguel Hernández).',
        units: [
          {
            title: 'Comentario Crítico PAU, Análisis Sintáctico y Literatura del Siglo XX',
            summary: 'Plantilla paso a paso para clavar el Tema, Estructura y Modalización, y claves de Campos de Castilla, La Casa de Bernarda Alba y Nada.',
            keyConcepts: ['Modalización (Subjetividad del Autor)', 'Campos de Castilla (Antonio Machado)', 'La Casa de Bernarda Alba (Federico García Lorca)'],
            scheme1: {
              heading: 'Fórmula para redactar el TEMA en la PAU en 1 sola línea',
              detail: 'Usa siempre un Sustantivo Abstracto + Complemento + Intención: "Crítica / Defensa / Reflexión sobre [asunto central] para concienciar sobre...". (Sin verbos conjugados).',
            },
            scheme2: {
              heading: 'Los 4 Autores Clave de Literatura PAU',
              detail: '1. Antonio Machado (Campos de Castilla) | 2. Federico García Lorca (La casa de Bernarda Alba: autoridad vs libertad) | 3. Miguel Hernández | 4. Carmen Laforet (Nada).',
            },
            practicalExample: 'Simulacro de examen oficial PAU cronometrado con estructura visual de márgenes limpios.',
            quizQ: 'En "La casa de Bernarda Alba" de Federico García Lorca, ¿qué simbolizan respectivamente Bernarda y su hija menor Adela?',
            quizOptions: [
              'La comedia urbana y el campo',
              'El principio de autoridad tiránica (el bastón de Bernarda) frente al deseo de libertad y pasión vital (el vestido verde de Adela)',
              'La ciencia frente a la religión',
            ],
            correctIndex: 1,
            quizExp: 'El conflicto central de la obra enfrenta la represión autoritaria de Bernarda con el anhelo de libertad encarnado por Adela.',
          },
        ],
      },
      {
        id: '2bach-val',
        name: 'Valencià: Llengua i Literatura II (2º Bachillerato · PAU)',
        shortCode: 'VAL-PAU',
        description: 'Comprensió i anàlisi lingüística PAU (pronoms febles, lèxic, sintaxi) i els 4 autors PAU: Rodoreda, Estellés, Fuster i Sirera.',
        units: [
          {
            title: 'Anàlisi Lingüística PAU i Autors: Rodoreda, Estellés, Fuster i Sirera',
            summary: 'La Plaça del Diamant, Llibre de Meravelles, Nosaltres els valencians / Diccionari per a ociosos i El verí del teatre.',
            keyConcepts: ['La Plaça del Diamant (Natàlia "Colometa")', 'Llibre de Meravelles (Estellés)', 'El verí del teatre (Rodolf Sirera)'],
            scheme1: {
              heading: 'Els 4 Autors de Literatura PAU Valencià d’un colp d’ull',
              detail: '1. Narrativa: Mercè Rodoreda (La plaça del Diamant) | 2. Poesia: Vicent Andrés Estellés (Llibre de meravelles) | 3. Assaig: Joan Fuster | 4. Teatre: Rodolf Sirera (El verí del teatre).',
            },
            scheme2: {
              heading: 'Simbologia en La Plaça del Diamant',
              detail: 'Els coloms i l’embut simbolitzen l’angoixa i la submissió de Natàlia; el crit final allibera la protagonista cap a la maduresa.',
            },
            practicalExample: 'Resolució guiada de les preguntes de Literatura de la PAU (80-100 paraules per pregunta).',
            quizQ: 'Quina és l’obra teatral de Rodolf Sirera inclosa en les lectures de la PAU que reflexiona sobre la ficció i el poder entre un Marqués i l’actor Gabriel de Beaumont?',
            quizOptions: ['Terra baixa', 'El verí del teatre', 'Llibre de meravelles'],
            correctIndex: 1,
            quizExp: '"El verí del teatre" (1978) de Rodolf Sirera és un duel dialèctic i metateatral entre el Marqués i l’actor Gabriel.',
          },
        ],
      },
      {
        id: '2bach-ing',
        name: 'Inglés II · English (2º Bachillerato · PAU / EBAU)',
        shortCode: 'ENG-PAU',
        description: 'PAU Exam Mastery: True/False Justification with exact quotes, Synonyms in context, Use of English Rephrasing & 150-word Opinion Essay.',
        units: [
          {
            title: 'PAU Reading Justification, Rephrasing & 4-Paragraph Opinion Essay',
            summary: 'Plantilla estructurada en 4 párrafos con conectores C1 para obtener la máxima puntuación en el Writing de la PAU.',
            keyConcepts: ['Paragraph 1: Hook & Thesis', 'Paragraph 2 & 3: Furthermore / Nevertheless', 'Paragraph 4: Taking everything into account'],
            scheme1: {
              heading: 'Plantilla de 4 Párrafos para el Essay de la PAU (130-150 palabras)',
              detail: 'P1 Introducción: "Nowadays, it is widely debated whether..." | P2 Argumento 1: "First and foremost,..." | P3 Argumento 2 / Contraste: "On the other hand, / Furthermore,..." | P4 Conclusión: "In conclusion, taking everything into account...".',
            },
            scheme2: {
              heading: 'Regla para el True / False de la PAU',
              detail: 'Copia SIEMPRE entre comillas la frase exacta del texto de principio a fin (sin puntos suspensivos en medio).',
            },
            practicalExample: 'Checklist de revisión rápida en los últimos 5 minutos del examen de Inglés PAU.',
            quizQ: 'Which connector is used to express CONTRAST in a formal PAU Opinion Essay?',
            quizOptions: [
              'Furthermore / Moreover',
              'Nevertheless / On the other hand',
              'Consequently / Therefore',
            ],
            correctIndex: 1,
            quizExp: '"Nevertheless" and "On the other hand" introduce a contrasting idea, whereas "Furthermore" adds information and "Therefore" expresses consequence.',
          },
        ],
      },
    ],
    flashcards: [
      {
        subject: 'Historia de España (2º Bach · PAU)',
        question: '¿Cuáles fueron las dos grandes etapas económicas de la dictadura franquista separadas por el año 1959?',
        answer: '1ª Etapa (1939-1959): Autarquía e intervencionismo. 2ª Etapa (1959-1975): Plan de Estabilización y Desarrollismo económico.',
        mnemonicHint: '1959 = Plan de Estabilización (paso de la Autarquía al Desarrollismo).',
      },
      {
        subject: 'Matemáticas II (2º Bach · PAU)',
        question: '¿Qué condición debe cumplir una matriz cuadrada A para que exista su matriz inversa A^(-1)?',
        answer: 'Su determinante debe ser distinto de cero: |A| ≠ 0.',
        mnemonicHint: 'Si el determinante da 0, NO se puede dividir en la fórmula de la inversa.',
      },
      {
        subject: 'Valencià II (2º Bach · PAU)',
        question: 'Quins són els 4 autors i obres de lectura obligatòria per a la PAU de Valencià?',
        answer: 'Mercè Rodoreda (La plaça del Diamant), Vicent Andrés Estellés (Llibre de meravelles), Joan Fuster (Assaig) i Rodolf Sirera (El verí del teatre).',
        mnemonicHint: 'Narrativa (Rodoreda) · Poesia (Estellés) · Assaig (Fuster) · Teatre (Sirera).',
      },
    ],
  },
};

export interface CustomCurriculumUnit {
  id: string;
  course: CourseGrade;
  subjectId: string;
  title: string;
  summary: string;
  keyConcepts: string[];
  heading1: string;
  detail1: string;
  heading2: string;
  detail2: string;
  practicalExample: string;
  quizQuestion: string;
  quizOptions: [string, string, string];
  correctIndex: number;
  quizExplanation: string;
  updatedAt: string;
}

export interface CurriculumManifestPayload {
  version: string;
  curriculumStandard: string;
  autoSyncIntervalSeconds: number;
  lastUpdatedLabel: string;
  customUnits: CustomCurriculumUnit[];
  customFlashcards: FlashcardItem[];
}

export function getSubjectsForCourse(
  course: CourseGrade,
  customUnits: CustomCurriculumUnit[] = []
): SyllabusSubject[] {
  const rawBaseSubjects: SyllabusSubject[] =
    course === '1ESO'
      ? FULL_SYLLABUS_SUBJECTS
      : COURSE_BLUEPRINTS[course].subjects.map((s) => ({
          id: s.id,
          name: s.name,
          shortCode: s.shortCode,
          courses: [course],
          description: s.description,
          totalUnits: s.units.length,
          units: s.units.map((u, idx) => ({
            id: `${s.id}-u${idx + 1}`,
            unitNumber: idx + 1,
            title: u.title,
            summary: u.summary,
            durationMin: 15,
            studyPoints: 160,
            keyConcepts: u.keyConcepts,
            visualScheme: [u.scheme1, u.scheme2],
            practicalExample: u.practicalExample,
            quickQuiz: [
              {
                id: `${s.id}-u${idx + 1}-q1`,
                question: u.quizQ,
                options: u.quizOptions,
                correctIndex: u.correctIndex,
                explanation: u.quizExp,
              },
            ],
          })),
        }));

  const baseSubjects = enrichCourseSubjectsWithExtraContent(course, rawBaseSubjects);

  const courseCustom = customUnits.filter((cu) => cu.course === course);
  if (courseCustom.length === 0) {
    return baseSubjects;
  }

  return baseSubjects.map((subj) => {
    const matchingCustom = courseCustom.filter((cu) => cu.subjectId === subj.id);
    if (matchingCustom.length === 0) return subj;

    const mergedUnits = [...subj.units];
    matchingCustom.forEach((cu) => {
      const existingIdx = mergedUnits.findIndex((u) => u.id === cu.id);
      const formattedUnit = {
        id: cu.id,
        unitNumber: existingIdx >= 0 ? mergedUnits[existingIdx].unitNumber : mergedUnits.length + 1,
        title: cu.title,
        summary: cu.summary,
        durationMin: 15,
        studyPoints: 160,
        keyConcepts: cu.keyConcepts,
        visualScheme: [
          { heading: cu.heading1, detail: cu.detail1 },
          { heading: cu.heading2, detail: cu.detail2 },
        ],
        practicalExample: cu.practicalExample,
        quickQuiz: [
          {
            id: `${cu.id}-q1`,
            question: cu.quizQuestion,
            options: cu.quizOptions,
            correctIndex: cu.correctIndex,
            explanation: cu.quizExplanation,
          },
        ],
      };

      if (existingIdx >= 0) {
        mergedUnits[existingIdx] = formattedUnit;
      } else {
        mergedUnits.push(formattedUnit);
      }
    });

    return {
      ...subj,
      totalUnits: mergedUnits.length,
      units: mergedUnits,
    };
  });
}

export function getFlashcardsForCourse(course: CourseGrade): FlashcardItem[] {
  const baseCards: FlashcardItem[] =
    course === '1ESO'
      ? INITIAL_FLASHCARDS
      : COURSE_BLUEPRINTS[course].flashcards.map((f, idx) => ({
          id: `fc-${course.toLowerCase()}-${idx + 1}`,
          course,
          subject: f.subject,
          question: f.question,
          answer: f.answer,
          mnemonicHint: f.mnemonicHint,
          mastered: false,
        }));

  const extraCards = EXTRA_FLASHCARDS_BY_COURSE.filter((c) => c.course === course);

  // Also generate 1 flashcard per curriculum unit so every subject has complete coverage
  const unitCards: FlashcardItem[] = [];
  const courseSubjects = getSubjectsForCourse(course);
  courseSubjects.forEach((subj) => {
    subj.units.forEach((unit) => {
      const q = unit.quickQuiz[0];
      if (!q) return;
      const cardId = `fc-unit-${unit.id}`;
      unitCards.push({
        id: cardId,
        course,
        subject: subj.name,
        question: q.question,
        answer: `${q.options[q.correctIndex]}. (${q.explanation})`,
        mnemonicHint: unit.visualScheme[0]
          ? `${unit.visualScheme[0].heading}: ${unit.visualScheme[0].detail}`
          : unit.summary,
        mastered: false,
      });
    });
  });

  const combined = [...baseCards, ...extraCards];
  unitCards.forEach((uc) => {
    const duplicateQuestion = combined.some(
      (existing) => existing.question.toLowerCase().trim() === uc.question.toLowerCase().trim()
    );
    if (!duplicateQuestion) {
      combined.push(uc);
    }
  });

  return combined;
}

export function getInitialGradesForCourse(
  course: CourseGrade,
  customUnits: CustomCurriculumUnit[] = []
): SubjectGradeMetric[] {
  const subjects = getSubjectsForCourse(course, customUnits);
  return subjects.map((s) => ({
    subject: s.name,
    course,
    eval1: null,
    eval2: null,
    currentEval: null,
    tasksCompleted: 0,
    tasksTotal: 0,
    teacherComment: 'Sin calificaciones registradas',
  }));
}

export function syncGradesWithCurriculum(
  existingGrades: SubjectGradeMetric[],
  customUnits: CustomCurriculumUnit[] = []
): SubjectGradeMetric[] {
  const allCourses: CourseGrade[] = ['1ESO', '2ESO', '3ESO', '4ESO', '1BACH', '2BACH'];
  const freshTemplate = allCourses.flatMap((c) => getInitialGradesForCourse(c, customUnits));
  return freshTemplate.map((tmpl) => {
    const found = existingGrades.find(
      (g) => g.course === tmpl.course && g.subject === tmpl.subject
    );
    return found ? found : tmpl;
  });
}

export function syncFlashcardsWithCurriculum(
  existingCards: FlashcardItem[],
  manifestCards: FlashcardItem[] = []
): FlashcardItem[] {
  const allCourses: CourseGrade[] = ['1ESO', '2ESO', '3ESO', '4ESO', '1BACH', '2BACH'];
  const freshBase = [...allCourses.flatMap((c) => getFlashcardsForCourse(c)), ...manifestCards];
  const merged = freshBase.map((baseCard) => {
    const prev = existingCards.find((c) => c.id === baseCard.id);
    return prev ? { ...baseCard, mastered: prev.mastered } : baseCard;
  });
  const userCreated = existingCards.filter(
    (c) => !freshBase.some((b) => b.id === c.id)
  );
  return [...userCreated, ...merged];
}

