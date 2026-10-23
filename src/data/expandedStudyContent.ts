import {
  CornellNote,
  CourseGrade,
  FlashcardItem,
  MindMapNode,
  QuizQuestion,
  SchoolTask,
  SyllabusSubject,
  SyllabusUnit,
} from '../types';

// ============================================================================
// 1. UNIDADES DIDÁCTICAS ADICIONALES PARA COMPLETAR TODOS LOS CURSOS (1º ESO A 2º BACH)
// ============================================================================
export interface ExtraSubjectUnitsBlueprint {
  course: CourseGrade;
  subjectId: string;
  extraUnits: {
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
}

export interface ExtraCourseSubjectBlueprint {
  course: CourseGrade;
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
}

export const EXTRA_COURSE_SUBJECTS: ExtraCourseSubjectBlueprint[] = [
  {
    course: '2ESO',
    id: '2eso-bio',
    name: 'Biología y Geología / Proyecto Ecosistemas (2º ESO)',
    shortCode: 'BIO-2',
    description: 'Funciones vitales, nutrición celular, ecosistemas terrestres y acuáticos, redes tróficas, dinámica interna de la Tierra y volcanes.',
    units: [
      {
        title: 'Las Funciones Vitales: Nutrición, Relación y Reproducción en los Seres Vivos',
        summary: 'Diferencia entre nutrición autótrofa y heterótrofa, metabolismo celular (catabolismo y anabolismo) y receptores sensoriales.',
        keyConcepts: ['Fotosíntesis vs Respiración Celular', 'Estímulo → Receptor → Efector', 'Reproducción Asexual vs Sexual'],
        scheme1: {
          heading: 'Fotosíntesis (Cloroplastos) vs Respiración Celular (Mitocondrias)',
          detail: 'Las plantas hacen AMBAS cosas: en los cloroplastos fabrican glucosa con luz solar (fotosíntesis) y en las mitocondrias obtienen energía respirando O2 día y noche.',
        },
        scheme2: {
          heading: 'Esquema de la Función de Relación',
          detail: '1. Estímulo (luz, sonido, calor) → 2. Receptor sensorial → 3. Centro coordinador (Sistema Nervioso) → 4. Efector (músculo o glándula).',
        },
        practicalExample: 'Respuesta fototrópica de las plantas del huerto del IES Clot del Moro orientando sus hojas hacia la luz solar.',
        quizQ: '¿Qué orgánulo presente tanto en células animales como vegetales realiza la respiración celular para obtener energía?',
        quizOptions: ['El cloroplasto', 'La mitocondria', 'La pared celular'],
        correctIndex: 1,
        quizExp: 'Las mitocondrias realizan la respiración celular tanto en células animales como en células vegetales.',
      },
      {
        title: 'Los Ecosistemas: Biotopo, Biocenosis y Cadenas Tróficas',
        summary: 'Factores abióticos y bióticos, niveles tróficos (productores, consumidores y descomponedores) y flujo de energía.',
        keyConcepts: ['Ecosistema = Biotopo + Biocenosis', 'Productores → Consumidores 1º, 2º → Descomponedores', 'Regla del 10% de Energía'],
        scheme1: {
          heading: 'Fórmula Fundamental de Ecología',
          detail: 'ECOSISTEMA = BIOTOPO (lugar físico: rocas, agua, temperatura, luz) + BIOCENOSIS (conjunto de todos los seres vivos que habitan en él).',
        },
        scheme2: {
          heading: 'El Ciclo de la Materia vs El Flujo de la Energía',
          detail: 'En un ecosistema la MATERIA sigue un ciclo cerrado (se recicla gracias a los hongos y bacterias descomponedores), mientras que la ENERGÍA sigue un flujo unidireccional.',
        },
        practicalExample: 'Cadena trófica en la Serra Calderona: Pino carrasco (Productor) → Procesionaria/Ardilla (Consumidor 1º) → Águila perdicera (Consumidor 2º).',
        quizQ: '¿Cómo se llama el conjunto de condiciones físicas y químicas (rocas, clima, humedad) de un ecosistema?',
        quizOptions: ['Biocenosis', 'Biotopo', 'Red trófica'],
        correctIndex: 1,
        quizExp: 'El biotopo es el medio físico abiótico, mientras que la biocenosis o comunidad es el conjunto de seres vivos.',
      },
      {
        title: 'Dinámica Interna de la Tierra: Volcanes, Terremotos y Relieve',
        summary: 'Energía geotérmica, corrientes de convección del manto, partes de un volcán, hipocentro vs epicentro y agentes geológicos externos.',
        keyConcepts: ['Hipocentro (Interior) vs Epicentro (Superficie)', 'Partes de un Volcán (Cámara, Chimenea, Cráter, Cono)', 'Meteorización, Erosión, Transporte y Sedimentación'],
        scheme1: {
          heading: 'Diferencia Examen: Hipocentro vs Epicentro en un Terremoto',
          detail: 'HIPOCENTRO = Punto profundo del interior de la Tierra donde se rompe la roca. EPICENTRO = Punto de la superficie terrestre situado justo encima en vertical.',
        },
        scheme2: {
          heading: 'Los 4 Procesos Geológicos Externos en Orden',
          detail: '1. Meteorización (romper la roca in situ) → 2. Erosión (desgastar) → 3. Transporte (río, viento, glaciar) → 4. Sedimentación (depositar en cuencas y deltas).',
        },
        practicalExample: 'Las islas Columbretes frente a la costa de Castellón como ejemplo de archipiélago de origen volcánico en la Comunitat Valenciana.',
        quizQ: '¿Cómo se llama el punto de la superficie terrestre situado justo en la vertical del foco donde se origina un terremoto?',
        quizOptions: ['Hipocentro', 'Epicentro', 'Cráter'],
        correctIndex: 1,
        quizExp: 'El epicentro está en la superficie terrestre ("epi" = sobre), justo encima del hipocentro.',
      },
      {
        title: 'Sostenibilidad, Huella Ecológica y Espacios Protegidos Valencianos',
        summary: 'Energías renovables vs no renovables, regla de las 3R, cambio climático y parques naturales de la Comunitat Valenciana.',
        keyConcepts: ['Reducir, Reutilizar y Reciclar (3R)', 'Parque Natural de la Serra Calderona', 'Economía Circular'],
        scheme1: {
          heading: 'Orden de Prioridad de las 3R',
          detail: '1º REDUCIR (el más importante: no generar residuo) → 2º REUTILIZAR (dar un segundo uso) → 3º RECICLAR (transformar la materia en el contenedor adecuado).',
        },
        scheme2: {
          heading: 'Patrimonio Natural del Camp de Morvedre y Alto Palancia',
          detail: 'Parque Natural de la Serra Calderona, Parque Natural de la Sierra de Espadán y Marjal dels Moros.',
        },
        practicalExample: 'Proyecto de compostaje y reciclaje selectivo en el patio del IES Clot del Moro.',
        quizQ: 'Dentro de la regla ecológica de las 3R, ¿cuál es la acción prioritaria porque evita que el residuo llegue a existir?',
        quizOptions: ['Reciclar', 'Reducir el consumo innecesario', 'Incinerar'],
        correctIndex: 1,
        quizExp: 'Reducir es la medida más eficaz porque evita el gasto energético y la generación misma del residuo.',
      },
    ],
  },
  {
    course: '3ESO',
    id: '3eso-tec',
    name: 'Tecnología y Digitalización (3º ESO)',
    shortCode: 'TEC-3',
    description: 'Materiales técnicos (plásticos y metales), diseño e impresión 3D, electrónica analógica y digital, programación por bloques y redes.',
    units: [
      {
        title: 'Los Plásticos y Materiales de Última Generación',
        summary: 'Termoplásticos, termoestables y elastómeros; técnicas de conformación (extrusión, inyección, soplado) e impresión 3D.',
        keyConcepts: ['Termoplásticos (Reciclables con calor)', 'Termoestables (No se funden de nuevo)', 'Elastómeros (Caucho, Neopreno)'],
        scheme1: {
          heading: 'Los 3 Tipos de Plásticos según su Estructura Molecular',
          detail: '1. Termoplásticos (cadenas lineales, se funden y reciclan: PET, PVC, PLA de impresora 3D). 2. Termoestables (cadenas entrelazadas, resisten calor: baquelita, melamina). 3. Elastómeros (gran elasticidad: caucho).',
        },
        scheme2: {
          heading: 'Filamentos de Impresión 3D Escolar',
          detail: 'PLA (Ácido Poliláctico): biodegradable, derivado del almidón de maíz, ideal para el taller del instituto.',
        },
        practicalExample: 'Diseño en Tinkercad e impresión 3D de un llavero organizador para la mochila en el aula de Tecnología.',
        quizQ: '¿Qué grupo de plásticos se puede fundir con calor y moldear varias veces, facilitando su reciclado?',
        quizOptions: ['Los termoestables', 'Los termoplásticos (como el PET o el PLA)', 'La cerámica técnica'],
        correctIndex: 1,
        quizExp: 'Los termoplásticos tienen cadenas lineales débiles que se ablandan con el calor permitiendo su reciclado y reutilización.',
      },
      {
        title: 'Circuitos Eléctricos Mixtos, Polímetro y Componentes Electrónicos',
        summary: 'Resistencia equivalente en circuitos serie, paralelo y mixtos; uso del polímetro (voltímetro y amperímetro); diodo LED y LDR.',
        keyConcepts: ['Voltímetro en Paralelo vs Amperímetro en Serie', 'Diodo LED y Resistencia Protectora', 'Sensores LDR (Luz) y NTC/PTC (Temperatura)'],
        scheme1: {
          heading: 'Cómo conectar el Polímetro sin quemar el fusible',
          detail: 'Para medir VOLTAJE (V) se conecta en PARALELO. Para medir INTENSIDAD (A) se abre el circuito y se conecta en SERIE.',
        },
        scheme2: {
          heading: 'Sensores Analógicos: LDR y Termistores',
          detail: 'LDR (Fotorresistencia): cuanta MÁS luz recibe, MENOS resistencia ofrece. NTC: a MÁS temperatura, MENOS resistencia.',
        },
        practicalExample: 'Montaje de una farola automática con sensor de luz LDR en placa protoboard.',
        quizQ: '¿Qué ocurre con la resistencia eléctrica de un sensor LDR cuando incide mucha luz sobre él?',
        quizOptions: [
          'Su resistencia disminuye dejando pasar mejor la corriente',
          'Su resistencia se hace infinita',
          'Se funde inmediatamente',
        ],
        correctIndex: 0,
        quizExp: 'En una LDR (Light Dependent Resistor), al aumentar la iluminación disminuye su resistencia eléctrica.',
      },
      {
        title: 'Programación, Pensamiento Computacional y Ciberseguridad',
        summary: 'Algoritmos, diagramas de flujo, variables, condicionales (if/else), bucles (while/for) y protección de la identidad digital.',
        keyConcepts: ['Secuencia, Condicional (SI/SINO) y Bucle', 'Variables y Sensores', 'Contraseñas Robustas y 2FA'],
        scheme1: {
          heading: 'Los 3 Símbolos Clave del Diagrama de Flujo',
          detail: 'Óvalo = Inicio / Fin | Rectángulo = Proceso u operación | Rombo = Decisión o Condicional (¿Se cumple la condición? Sí / No).',
        },
        scheme2: {
          heading: 'Reglas de Ciberseguridad Personal',
          detail: 'Activar la verificación en dos pasos (2FA), desconfiar de enlaces urgentes (Phishing) y no compartir datos personales en redes públicas.',
        },
        practicalExample: 'Programación de un semáforo inteligente con placa microcontroladora en el taller de Informática.',
        quizQ: 'En un diagrama de flujo de programación, ¿qué figura geométrica se utiliza para representar una decisión o condición (Sí / No)?',
        quizOptions: ['Un rectángulo', 'Un rombo', 'Un círculo'],
        correctIndex: 1,
        quizExp: 'El rombo representa una bifurcación condicional con al menos dos salidas (Verdadero/Sí y Falso/No).',
      },
    ],
  },
  {
    course: '4ESO',
    id: '4eso-ing',
    name: 'Inglés · English (4º ESO · B1/B2 Prep)',
    shortCode: 'ENG-4',
    description: 'Reported Speech (Statements, Questions, Commands), All Conditionals (1st, 2nd, 3rd), Passive Voice, Modal Perfects & Formal Writing.',
    units: [
      {
        title: 'Reported Speech (Estilo Indirecto): Statements, Questions & Commands',
        summary: 'Salto atrás de los tiempos verbales (Backshift), cambio de pronombres y expresiones temporales (today → that day).',
        keyConcepts: ['Backshift: Present → Past → Past Perfect', 'Reported Questions: IF / WHETHER + Subject + Verb', 'Commands: Told me TO / NOT TO + Infinitive'],
        scheme1: {
          heading: 'Tabla Rápida del Salto Atrás (Backshift)',
          detail: 'Present Simple → Past Simple | Past Simple / Present Perfect → Past Perfect (had + participle) | Will → Would | Can → Could | Must → Had to.',
        },
        scheme2: {
          heading: 'Trampa de Examen en Reported Questions',
          detail: 'Al pasar una pregunta a Reported Speech deja de tener orden de pregunta: desaparece el auxiliar DO/DID y el orden pasa a ser SUJETO + VERBO ("He asked where I lived").',
        },
        practicalExample: 'Direct: "I will finish my project tomorrow", said Ana → Reported: Ana said that she would finish her project the following day.',
        quizQ: 'Transform into Reported Speech: "I have passed all my exams", said Hugo.',
        quizOptions: [
          'Hugo said that he has passed all his exams.',
          'Hugo said that he had passed all his exams.',
          'Hugo said that he will pass all his exams.',
        ],
        correctIndex: 1,
        quizExp: 'Present Perfect ("have passed") shifts back to Past Perfect ("had passed") in Reported Speech.',
      },
      {
        title: 'First, Second & Third Conditionals + I Wish / If Only',
        summary: 'Comparativa completa de los tres condicionales (posible, hipotético e imposible en el pasado) y expresión de deseos.',
        keyConcepts: ['1st: If + Present, Will + V', '2nd: If + Past Simple, Would + V', '3rd: If + Had + Participle, Would have + Participle'],
        scheme1: {
          heading: 'Los 3 Condicionales en 3 Líneas',
          detail: '1º (Futuro Probable): If I study, I will pass. | 2º (Presente Hipotético): If I studied, I would pass. | 3º (Pasado Irreal): If I had studied, I would have passed.',
        },
        scheme2: {
          heading: 'Regla de Oro con WERE en el 2º Condicional',
          detail: 'En estilo formal y consejos usamos "If I WERE you, I would..." para dar consejos.',
        },
        practicalExample: '"If I had set my alarm clock, I wouldn’t have arrived late to school."',
        quizQ: 'Complete the Second Conditional: "If I ___ (have) more free time, I would learn Japanese."',
        quizOptions: ['have', 'had', 'would have'],
        correctIndex: 1,
        quizExp: 'In the Second Conditional, the IF-clause uses the Past Simple ("If I had").',
      },
      {
        title: 'Passive Voice (All Tenses) & Relative Clauses (Defining vs Non-Defining)',
        summary: 'Voz pasiva con dos objetos, pasiva de modales y pronombres relativos (who, which, whose, where, when).',
        keyConcepts: ['Passive: Be + Past Participle', 'Defining (sin comas, puedes usar THAT)', 'Non-Defining (entre comas, NUNCA uses THAT)'],
        scheme1: {
          heading: 'Defining vs Non-Defining Relative Clauses',
          detail: 'Defining (sin comas): información esencial. Non-Defining (entre comas): información extra; NUNCA se puede usar "that" detrás de una coma.',
        },
        scheme2: {
          heading: 'WHOSE = CUYO / CUYA (Posesión)',
          detail: 'Va siempre entre dos sustantivos: "The student WHOSE notebook is on the table..." (El alumno cuyo cuaderno...).',
        },
        practicalExample: '"Valencia, which is on the Mediterranean coast, has great weather." (Non-defining entre comas).',
        quizQ: 'Choose the correct relative pronoun: "That is the girl ___ brother studies in 2º Bachillerato."',
        quizOptions: ['who', 'whose (indica posesión: cuyo hermano)', 'which'],
        correctIndex: 1,
        quizExp: '"Whose" indicates possession between "the girl" and "brother".',
      },
    ],
  },
  {
    course: '1BACH',
    id: '1bach-hmc',
    name: 'Historia del Mundo Contemporáneo / Economía (1º Bachillerato)',
    shortCode: 'HMC-1B',
    description: 'Revoluciones liberales, unificaciones de Italia y Alemania, imperialismo, guerras mundiales, macroeconomía, inflación y mercado.',
    units: [
      {
        title: 'Las Revoluciones Liberales (1820, 1830, 1848) y Unificaciones de Italia y Alemania',
        summary: 'Congreso de Viena y Restauración absolutista, oleadas revolucionarias burguesas y el papel del Piamonte (Cavour/Garibaldi) y Prusia (Bismarck).',
        keyConcepts: ['Congreso de Viena (1815)', 'Primavera de los Pueblos (1848)', 'Bismarck (Prusia) y Cavour/Garibaldi (Italia)'],
        scheme1: {
          heading: 'Las 3 Oleadas Revolucionarias del Siglo XIX',
          detail: '1820 (Pronunciamiento de Riego en España e independencia de Grecia) → 1830 (Monarquía constitucional en Francia e independencia de Bélgica) → 1848 (Sufragio universal masculino y despertar nacionalista).',
        },
        scheme2: {
          heading: 'Dos Modelos de Unificación Nacional (1870-1871)',
          detail: 'Italia: liderada por el reino del Piamonte (Cavour) y los camisas rojas de Garibaldi. Alemania: liderada por Prusia y el canciller Otto von Bismarck tras vencer a Austria y Francia.',
        },
        practicalExample: 'Comparación de mapas políticos de Europa en 1815 (Congreso de Viena) y en 1871 (tras la unificación alemana).',
        quizQ: '¿Qué canciller prusiano dirigió el proceso de unificación de Alemania culminado en 1871?',
        quizOptions: ['Giuseppe Garibaldi', 'Otto von Bismarck', 'Napoleón III'],
        correctIndex: 1,
        quizExp: 'Otto von Bismarck, canciller del rey Guillermo I de Prusia, fue el artífice de la unificación alemana.',
      },
      {
        title: 'Segunda Revolución Industrial, Imperialismo Colonial y Primera Guerra Mundial',
        summary: 'Nuevas fuentes de energía (electricidad y petróleo), Conferencia de Berlín (1885), Paz Armada y la Gran Guerra (1914-1918).',
        keyConcepts: ['Taylorismo y Fordismo (Cadena de Montaje)', 'Conferencia de Berlín (Reparto de África)', 'Guerra de Movimientos y Guerra de Trincheras'],
        scheme1: {
          heading: '1ª vs 2ª Revolución Industrial',
          detail: '1ª Rev. Industrial (1780): Carbón, máquina de vapor, textil y ferrocarril (Reino Unido). 2ª Rev. Industrial (1870): Electricidad, petróleo, acero, química y automóvil en cadena.',
        },
        scheme2: {
          heading: 'Consecuencias del Tratado de Versalles (1919)',
          detail: 'Duras reparaciones impuestas a Alemania, desaparición de los imperios austrohúngaro, otomano y ruso, y creación de la Sociedad de Naciones.',
        },
        practicalExample: 'Comentario histórico de los 14 Puntos del presidente Woodrow Wilson.',
        quizQ: '¿En qué conferencia internacional celebrada en 1884-1885 las potencias europeas acordaron las reglas para el reparto colonial de África?',
        quizOptions: ['Conferencia de Yalta', 'Conferencia de Berlín', 'Congreso de Viena'],
        correctIndex: 1,
        quizExp: 'La Conferencia de Berlín convocada por Bismarck reguló la ocupación colonial europea del continente africano.',
      },
      {
        title: 'Economía: Ley de Oferta y Demanda, Inflación, PIB y Política Fiscal/Monetaria',
        summary: 'Equilibrio de mercado, tipos de mercado (competencia perfecta, oligopolio, monopolio), cálculo del PIB e intervención del Estado y BCE.',
        keyConcepts: ['Equilibrio de Mercado (Oferta = Demanda)', 'PIB = C + I + G + (X - M)', 'Política Fiscal (Impuestos/Gasto) vs Monetaria (Tipos de Interés)'],
        scheme1: {
          heading: 'Política Fiscal (Gobierno) vs Política Monetaria (Banco Central Europeo)',
          detail: 'Política Fiscal: el Gobierno usa los Presupuestos (Impuestos y Gasto Público). Política Monetaria: el BCE controla los Tipos de Interés y la cantidad de dinero en circulación para frenar la inflación.',
        },
        scheme2: {
          heading: 'Fórmula Macroeconómica del PIB',
          detail: 'PIB = Consumo de las familias (C) + Inversión empresarial (I) + Gasto público (G) + Exportaciones netas (X - M).',
        },
        practicalExample: 'Análisis de cómo afecta una subida de los tipos de interés del BCE a las hipotecas y al consumo familiar.',
        quizQ: '¿Qué institución es la responsable de aplicar la Política Monetaria y fijar los tipos de interés oficiales en la zona euro?',
        quizOptions: ['El Banco Central Europeo (BCE)', 'El Ayuntamiento', 'La Organización Mundial del Comercio'],
        correctIndex: 0,
        quizExp: 'El Banco Central Europeo (BCE) dirige la política monetaria de la eurozona para mantener la estabilidad de precios.',
      },
    ],
  },
  {
    course: '2BACH',
    id: '2bach-cie',
    name: 'Física, Química y Biología PAU (2º Bachillerato · Fase Específica)',
    shortCode: 'CIE-PAU',
    description: 'Ponderación 0,2 en PAU: Campo gravitatorio y electromagnético, ondas y óptica, equilibrio ácido-base y redox, bioquímica e inmunología.',
    units: [
      {
        title: 'Física PAU: Campo Gravitatorio, Electromagnético, Ondas y Física Cuántica',
        summary: 'Velocidad orbital y de escape, Ley de Faraday-Lenz, óptica geométrica, efecto fotoeléctrico de Einstein y desintegración radiactiva.',
        keyConcepts: ['v_orbital = √(G·M / r)', 'v_escape = √(2·G·M / r)', 'Efecto Fotoeléctrico: E_fotón = W_extracción + Ec_máx'],
        scheme1: {
          heading: 'Deducción Obligatoria en la PAU: Velocidad Orbital de un Satélite',
          detail: 'Iguala siempre Fuerza Gravitatoria = Fuerza Centrípeta: (G·M·m)/r^2 = (m·v^2)/r → Despejando se obtiene v = √(G·M / r).',
        },
        scheme2: {
          heading: 'Ecuación de Einstein del Efecto Fotoeléctrico',
          detail: 'h · f = h · f_0 + 1/2 · m · v^2 (La energía del fotón incidente se invierte en arrancar el electrón del metal y darle energía cinética).',
        },
        practicalExample: 'Resolución completa de un problema de satélites geoestacionarios de la PAU de la Comunitat Valenciana.',
        quizQ: '¿Qué relación existe entre la velocidad de escape (v_e) y la velocidad orbital (v_o) a una misma distancia r de un planeta?',
        quizOptions: ['Son exactamente iguales', 'v_escape = √2 · v_orbital', 'v_escape es la mitad de v_orbital'],
        correctIndex: 1,
        quizExp: 'Como v_o = √(GM/r) y v_e = √(2GM/r), la velocidad de escape es exactamente √2 veces la velocidad orbital.',
      },
      {
        title: 'Química PAU: Equilibrio Químico (Kc y Kp), Ácido-Base (pH) y Reacciones Redox',
        summary: 'Principio de Le Châtelier, cálculo de pH en ácidos fuertes y débiles (Ka), valoraciones y pilas galvánicas Daniell (Eº pila).',
        keyConcepts: ['pH = -log[H3O+] y pH + pOH = 14', 'Ánodo (Oxidación) vs Cátodo (Reducción)', 'Eº_pila = Eº_cátodo - Eº_ánodo > 0'],
        scheme1: {
          heading: 'Regla Mnemotécnica para Pilas Redox (Vocal con Vocal, Consonante con Consonante)',
          detail: 'En el Ánodo ocurre siempre la Oxidación (pérdida de e-). En el Cátodo ocurre siempre la Reducción (ganancia de e-).',
        },
        scheme2: {
          heading: 'Principio de Le Châtelier en Equilibrio Químico',
          detail: 'Si aumentas la presión (disminuyes el volumen), el equilibrio se desplaza hacia el lado donde haya MENOS moles de gas.',
        },
        practicalExample: 'Ajuste por el método del ion-electrón en medio ácido y cálculo de la fuerza electromotriz de una pila.',
        quizQ: 'En una pila electroquímica o celda galvánica, ¿qué proceso ocurre siempre en el CÁTODO?',
        quizOptions: ['La oxidación', 'La reducción (Consonante con Consonante: Cátodo - Reducción)', 'La neutralización'],
        correctIndex: 1,
        quizExp: 'En el cátodo tiene lugar siempre la semirreacción de reducción (ganancia de electrones).',
      },
      {
        title: 'Biología PAU: Biomoléculas, Enzimas, Metabolismo, Genética e Inmunología',
        summary: 'Glúcidos, lípidos, proteínas y ácidos nucleicos; ciclo de Krebs y fase luminosa/oscura; anticuerpos y respuesta inmunitaria.',
        keyConcepts: ['Enlace Peptídico (Proteínas) y Fosfodiéster (ADN)', 'Mitosis (2n → 2n) vs Meiosis (2n → n)', 'Linfocitos B (Anticuerpos) vs Linfocitos T'],
        scheme1: {
          heading: 'Diferencia PAU: Mitosis vs Meiosis',
          detail: 'MITOSIS: 1 división → 2 células hijas genéticamente idénticas (diploides 2n, crecimiento y renovación). MEIOSIS: 2 divisiones con sobrecruzamiento → 4 gametos haploides (n) con variabilidad genética.',
        },
        scheme2: {
          heading: 'Inmunidad Activa (Vacuna) vs Pasiva (Suero)',
          detail: 'VACUNA: contiene antígenos atenuados, crea memoria inmunológica duradera (preventiva). SUERO: contiene anticuerpos ya fabricados para acción inmediata (curativa, sin memoria).',
        },
        practicalExample: 'Identificación visual de moléculas (glucosa ciclada, triglicérido, aminoácido y nucleótido) de exámenes oficiales PAU.',
        quizQ: '¿Qué tipo de células del sistema inmunitario son las responsables de fabricar y secretar anticuerpos específicos (inmunoglobulinas)?',
        quizOptions: ['Los glóbulos rojos', 'Los linfocitos B (al diferenciarse en células plasmáticas)', 'Las plaquetas'],
        correctIndex: 1,
        quizExp: 'Los linfocitos B son los responsables de la inmunidad humoral mediante la producción de anticuerpos.',
      },
    ],
  },
];

export const EXTRA_UNITS_BY_SUBJECT: ExtraSubjectUnitsBlueprint[] = [
  // --- 1º ESO EXTRA UNITS ---
  {
    course: '1ESO',
    subjectId: 'subj-val',
    extraUnits: [
      {
        title: 'Morfologia: El Substantiu, l’Adjectiu, els Determinats i els Verbs Regulars',
        summary: 'Gènere i nombre dels noms i adjectius, possessius tònics i àtons, demostratius (aquest/aqueix/aquell) i les tres conjugacions verbals.',
        keyConcepts: ['1a (-AR), 2a (-RE/-ER) i 3a Conjugació (-IR)', 'Demostratius i Possessius', 'Incoatius amb -eix- (servir → serveix)'],
        scheme1: {
          heading: 'Les 3 Conjugacions Verbals en Valencià',
          detail: '1a Conjugació: acabats en -AR (cantar). 2a Conjugació: acabats en -ER / -RE (témer, batre). 3a Conjugació: acabats en -IR (dormir, servir).',
        },
        scheme2: {
          heading: 'Formació del Femení i del Plural',
          detail: 'Els noms acabats en vocal àtona -a fan el plural en -es (casa → cases, aigua → aigües, pluja → pluges).',
        },
        practicalExample: 'Classificació de paraules d’un text descriptiu sobre la comarca del Camp de Morvedre.',
        quizQ: 'Com s’escriu correctament el plural de la paraula "pluja" en valencià?',
        quizOptions: ['pluges (la j passa a g davant e)', 'plujes', 'plujas'],
        correctIndex: 0,
        quizExp: 'Davant de la vocal E, el so palatal s’escriu amb G: pluja → pluges, platja → platges.',
      },
      {
        title: 'Lèxic, Camps Semàntics, Sinonímia i Ortografia de la B/V i S/SS/C/Ç/Z',
        summary: 'Diferència entre família lèxica i camp semàntic, i regles ortogràfiques de les labials i les sibilants sordes i sonores.',
        keyConcepts: ['S Sorda (caçar, passar) vs S Sonora (casa, zero)', 'Canvi P → B i T → D en derivats', 'Imperfectes d’indicatiu en -AVA'],
        scheme1: {
          heading: 'Regla d’Or de la B i la V en els Verbs',
          detail: 'Totes les terminacions del pretèrit imperfet d’indicatiu de la 1a conjugació van amb V: cantava, jugàvem, estudiàveu (al contrari del castellà -aba).',
        },
        scheme2: {
          heading: 'So de S Sorda vs S Sonora entre vocals',
          detail: 'Entre vocals: una sola -S- sona sonora com una abella (casa, rosa); per a que sone sorda cal escriure -SS- (passar, tassa) o -C-/-Ç- (peça, plaça).',
        },
        practicalExample: 'Dictat visual per parelles a l’aula de 1r d’ESO evitant les interferències amb el castellà.',
        quizQ: 'Com s’escriu en valencià el passat imperfet del verb "cantar" (jo cantava / cantaba)?',
        quizOptions: ['Jo cantava (sempre amb V en la 1a conjugació)', 'Jo cantaba', 'Jo cantave'],
        correctIndex: 0,
        quizExp: 'En valencià les desinències de l’imperfet d’indicatiu de la 1a conjugació s’escriuen sempre amb V (-ava, -aves, -ava...).',
      },
    ],
  },
  {
    course: '1ESO',
    subjectId: 'subj-eng',
    extraUnits: [
      {
        title: 'Countable & Uncountable Nouns: Some, Any, Much, Many & A Lot Of',
        summary: 'Cómo hablar de cantidades con sustantivos contables e incontables, y cómo pedir comida o material escolar.',
        keyConcepts: ['SOME (+) vs ANY (- / ?)', 'HOW MANY (Contables) vs HOW MUCH (Incontables)', 'There is / There are'],
        scheme1: {
          heading: 'SOME vs ANY en 10 Segundos',
          detail: 'SOME = Oraciones afirmativas (+) y ofrecimientos ("Would you like some water?"). ANY = Oraciones negativas (-) y preguntas generales (?).',
        },
        scheme2: {
          heading: 'HOW MANY vs HOW MUCH',
          detail: 'HOW MANY + plural contable (How many books?). HOW MUCH + singular incontable o precio (How much time? / How much is it?).',
        },
        practicalExample: '"There are some notebooks on the desk, but there isn’t any paper."',
        quizQ: 'Choose the correct option: "How ___ water do you drink every day?"',
        quizOptions: ['much (because "water" is uncountable)', 'many', 'any'],
        correctIndex: 0,
        quizExp: '"Water" is an uncountable noun, so we use "How much".',
      },
      {
        title: 'Modal Verbs of Obligation, Prohibition & Ability: Can, Could, Must & Mustn’t',
        summary: 'Expresar habilidad en presente y pasado (can / could) y normas del instituto (must / mustn’t).',
        keyConcepts: ['CAN (Present ability) vs COULD (Past ability)', 'MUST (Obligation 100%)', 'MUSTN’T (Prohibition)'],
        scheme1: {
          heading: 'Regla de Oro de los Verbos Modales',
          detail: '1. Nunca llevan -S en tercera persona ("She can swim"). 2. Van seguidos directamente del verbo en infinitivo SIN "TO" ("You must study").',
        },
        scheme2: {
          heading: 'MUST vs MUSTN’T en las Normas de Clase',
          detail: 'MUST = Obligación ("You must bring your textbook"). MUSTN’T = Prohibición ("You mustn’t use your phone in class").',
        },
        practicalExample: 'Redacción de un póster en inglés con las 5 reglas de convivencia del aula de 1º ESO.',
        quizQ: 'Which sentence is grammatically CORRECT?',
        quizOptions: [
          'She cans play the guitar.',
          'She can play the guitar.',
          'She can to play the guitar.',
        ],
        correctIndex: 1,
        quizExp: 'Modal verbs like "can" never add "-s" and are followed by the base verb without "to".',
      },
    ],
  },
  {
    course: '1ESO',
    subjectId: 'subj-tec',
    extraUnits: [
      {
        title: 'El Proceso Tecnológico, Herramientas del Taller y Estructuras Resistentes',
        summary: 'Fases del método de proyectos (necesidad, diseño, construcción, evaluación), esfuerzos mecánicos (tracción, compresión, flexión) y triangulación.',
        keyConcepts: ['Fases del Proyecto Tecnológico', 'Tracción, Compresión, Flexión, Torsión y Cortadura', 'Triangulación de Estructuras'],
        scheme1: {
          heading: 'Los 5 Esfuerzos Mecánicos con tu Propio Cuerpo',
          detail: 'Tracción = Estirar | Compresión = Aplastar (columna) | Flexión = Doblar (balda de estantería) | Torsión = Retorcer | Cortadura = Tijeras.',
        },
        scheme2: {
          heading: '¿Por qué el Triángulo es el Rey de las Estructuras?',
          detail: 'El triángulo es el único polígono indeformable: por eso las grúas, puentes y torres eléctricas se construyen con barras trianguladas.',
        },
        practicalExample: 'Construcción de un puente con palillos de madera o papel enrollado capaz de soportar 2 kg de peso mediante triangulación.',
        quizQ: '¿A qué esfuerzo mecánico está sometida la tabla horizontal de una estantería cuando colocamos muchos libros pesados en su centro?',
        quizOptions: ['Flexión (tiende a doblarse en el centro)', 'Torsión', 'Tracción pura'],
        correctIndex: 0,
        quizExp: 'Una viga o balda apoyada en los extremos con peso en el centro sufre un esfuerzo de flexión.',
      },
      {
        title: 'La Madera y los Metales: Propiedades, Obtención e Impacto Ambiental',
        summary: 'Maderas naturales y tableros artificiales (contrachapado, aglomerado, DM), metales férricos (acero) y no férricos (aluminio, cobre).',
        keyConcepts: ['Contrachapado, Aglomerado y DM', 'Metales Férricos (Hierro y Acero)', 'Metales No Férricos (Cobre, Aluminio, Bronce)'],
        scheme1: {
          heading: 'Madera Natural vs Tableros Artificiales',
          detail: 'Los tableros artificiales aprovechan virutas y fibras recicladas: Contrachapado (láminas encoladas), Aglomerado (virutas prensadas) y DM (fibras muy finas).',
        },
        scheme2: {
          heading: 'El Acero: La Aleación Clave',
          detail: 'Acero = Hierro (Fe) + una pequeña proporción de Carbono (entre 0,1% y 2%) para darle mucha más dureza y resistencia.',
        },
        practicalExample: 'Identificación de muestras de madera de pino, contrachapado, DM, cobre y aluminio en el taller del IES Clot del Moro.',
        quizQ: '¿Qué dos elementos químicos forman la aleación del ACERO?',
        quizOptions: ['Hierro y Carbono', 'Cobre y Estaño', 'Aluminio y Plomo'],
        correctIndex: 0,
        quizExp: 'El acero es una aleación férrica compuesta por Hierro y un porcentaje de Carbono inferior al 2%.',
      },
    ],
  },
  {
    course: '1ESO',
    subjectId: 'subj-epv',
    extraUnits: [
      {
        title: 'Trazados Geométricos Básicos: Mediatriz, Bisectriz, Polígonos y Tangencias',
        summary: 'Uso de escuadra, cartabón y compás para trazar paralelas, perpendiculares, la mediatriz de un segmento y la bisectriz de un ángulo.',
        keyConcepts: ['Mediatriz (Divide un segmento en 2 partes iguales)', 'Bisectriz (Divide un ángulo en 2 ángulos iguales)', 'Escuadra (45º-45º-90º) y Cartabón (30º-60º-90º)'],
        scheme1: {
          heading: 'No confundas nunca Mediatriz y Bisectriz',
          detail: 'MEDIATRIZ = Perpendicular por el punto MEDIO de un segmento recto. BISECTRIZ = Semirrecta que divide un ÁNGULO en dos partes iguales.',
        },
        scheme2: {
          heading: 'Escuadra vs Cartabón',
          detail: 'Escuadra: triángulo isósceles (dos ángulos iguales de 45º). Cartabón: triángulo escaleno (ángulos de 30º, 60º y 90º).',
        },
        practicalExample: 'Diseño geométrico de un rosetón o mandala utilizando compás, mediatrices y división de la circunferencia en 6 partes iguales.',
        quizQ: '¿Cómo se llama la recta perpendicular que divide un segmento en dos partes exactamente iguales?',
        quizOptions: ['Mediatriz', 'Bisectriz', 'Hipotenusa'],
        correctIndex: 0,
        quizExp: 'La mediatriz pasa por el punto medio de un segmento formando ángulos rectos de 90º.',
      },
    ],
  },
  {
    course: '1ESO',
    subjectId: 'subj-fil',
    extraUnits: [
      {
        title: 'Inteligencia Emocional, Convivencia Escolar y Derechos Humanos',
        summary: 'Autoconocimiento, gestión de la frustración y la impulsividad, empatía, resolución pacífica de conflictos y Declaración Universal de los DD. HH.',
        keyConcepts: ['Asertividad (Ni pasividad ni agresividad)', 'Mediación Escolar', 'Declaración Universal de los Derechos Humanos (1948)'],
        scheme1: {
          heading: 'Los 3 Estilos de Comunicación ante un Conflicto',
          detail: 'Pasivo (callarse y ceder siempre) — ASERTIVO (defender tus derechos con respeto y calma, el punto óptimo) — Agresivo (imponer gritando).',
        },
        scheme2: {
          heading: 'Técnica del Semáforo Emocional TDAH',
          detail: 'ROJO: Para y respira profundo 5 segundos antes de contestar. AMARILLO: Piensa 2 opciones y sus consecuencias. VERDE: Actúa con respeto.',
        },
        practicalExample: 'Dinámica de mediación entre iguales del equipo de convivencia del IES Clot del Moro.',
        quizQ: '¿Cómo se llama la habilidad social que consiste en expresar nuestras opiniones y defender nuestros derechos de forma tranquila y respetuosa?',
        quizOptions: ['Asertividad', 'Impulsividad', 'Indiferencia'],
        correctIndex: 0,
        quizExp: 'La comunicación asertiva se sitúa en el equilibrio justo entre la pasividad y la agresividad.',
      },
    ],
  },

  // --- 2º ESO EXTRA UNITS ---
  {
    course: '2ESO',
    subjectId: '2eso-lcl',
    extraUnits: [
      {
        title: 'Complemento de Régimen (CRég), Complemento Predicativo (CPred) y Voz Pasiva (CAg)',
        summary: 'Cómo distinguir los complementos avanzados del predicado verbal y transformar oraciones activas a pasivas.',
        keyConcepts: ['CRég (Preposición exigida por el verbo)', 'CPred (Concuerda con Sujeto o CD con verbo no copulativo)', 'Complemento Agente (POR + SN en pasiva)'],
        scheme1: {
          heading: 'Truco para el Complemento de Régimen (CRég)',
          detail: 'Empieza siempre por una preposición que el verbo NECESITA obligatoriamente: confiar EN, acordarse DE, hablar DE, consistir EN.',
        },
        scheme2: {
          heading: 'Atributo vs Complemento Predicativo',
          detail: 'Ambos son adjetivos que concuerdan con el sujeto, pero el Atributo va con SER/ESTAR/PARECER ("El niño está cansado") y el Predicativo va con cualquier otro verbo ("El niño llegó cansado").',
        },
        practicalExample: '"Los jugadores terminaron el partido agotados" → "agotados" es C. Predicativo porque concuerda con jugadores y el verbo es "terminaron".',
        quizQ: 'En la oración "Confío plenamente en tus posibilidades", ¿qué función sintáctica desempeña "en tus posibilidades"?',
        quizOptions: [
          'Complemento Directo',
          'Complemento de Régimen (el verbo "confiar" exige la preposición "en")',
          'Atributo',
        ],
        correctIndex: 1,
        quizExp: 'Como el verbo "confiar" rige obligatoriamente la preposición "en", se trata de un Complemento de Régimen.',
      },
      {
        title: 'Literatura: La Épica, el Teatro del Siglo de Oro (Lope de Vega y Calderón) y la Lírica',
        summary: 'La renovación del teatro barroco en los corrales de comedias, métrica española (soneto, romance) y tópicos literarios (Carpe Diem, Beatus Ille).',
        keyConcepts: ['Soneto (2 cuartetos + 2 tercetos endecasílabos)', 'Romance (8 sílabas, rima asonante en pares)', 'Corrales de Comedias (Lope de Vega)'],
        scheme1: {
          heading: 'Métrica Rápida: Soneto vs Romance',
          detail: 'SONETO = 14 versos de 11 sílabas (ABBA ABBA CDC DCD, rima consonante). ROMANCE = Tirada de versos de 8 sílabas con rima asonante en los pares (- a - a).',
        },
        scheme2: {
          heading: 'Los 3 Tópicos Literarios más Preguntados',
          detail: 'Carpe Diem ("Aprovecha el momento presente") | Beatus Ille ("Feliz aquel" que vive en paz en el campo) | Locus Amoenus ("Lugar agradable" de naturaleza ideal).',
        },
        practicalExample: 'Cómputo silábico con sinalefas en un soneto de Garcilaso de la Vega y un romance tradicional.',
        quizQ: '¿Cómo se llama la composición poética formada por 14 versos endecasílabos (11 sílabas) distribuidos en dos cuartetos y dos tercetos?',
        quizOptions: ['Romance', 'Soneto', 'Silva'],
        correctIndex: 1,
        quizExp: 'El soneto consta de catorce versos de arte mayor (11 sílabas) divididos en dos cuartetos y dos tercetos.',
      },
    ],
  },
  {
    course: '2ESO',
    subjectId: '2eso-val',
    extraUnits: [
      {
        title: 'Els Pronoms Febles Adverbials HI i EN, i els Complements Circumstancials',
        summary: 'Quan substituïm complements amb la preposició "de" per EN i la resta de preposicions o llocs per HI.',
        keyConcepts: ['DE + Complement → EN', 'A / EN / AMB + Complement → HI', 'CC de Lloc, Temps i Manera'],
        scheme1: {
          heading: 'Regla Visual EN vs HI',
          detail: 'Si el complement comença per DE o indica quantitat → EN ("Vinc de Xàtiva" → "En vinc"). Si comença per A, EN, AMB o és CC de Manera → HI ("Vaig a València" → "Hi vaig").',
        },
        scheme2: {
          heading: 'Exemples Clau d’Examen amb HI',
          detail: '"Pensa en l’examen" → "Pensa-hi". "Camina de pressa (manera)" → "Hi camina".',
        },
        practicalExample: 'Joc de targetes ràpides a classe per transformar complements de lloc amb "en" (d’on véns) i "hi" (on vas).',
        quizQ: 'Quin pronom feble substitueix el complement en l’oració: "Demà aniré a la biblioteca"?',
        quizOptions: ['Demà en aniré', 'Demà hi aniré (lloc introduït per "a")', 'Demà ho aniré'],
        correctIndex: 1,
        quizExp: 'Els complements de lloc que no van introduïts per la preposició "de" se substitueixen pel pronom HI.',
      },
    ],
  },
  {
    course: '2ESO',
    subjectId: '2eso-ing',
    extraUnits: [
      {
        title: 'Present Perfect Simple (Ever, Never, Just, Already, Yet) vs Past Simple',
        summary: 'Experiencias vitales sin fecha concreta (Present Perfect) frente a acciones terminadas en una fecha pasada cerrada (Past Simple).',
        keyConcepts: ['Have / Has + Past Participle (3ª columna)', 'EVER (?) & NEVER (-)', 'Yesterday / Last week / In 2020 → Past Simple'],
        scheme1: {
          heading: '¿Present Perfect o Past Simple? Mira la pista temporal',
          detail: 'Si dice CUÁNDO exactamente (yesterday, two days ago, in 2021) → PAST SIMPLE. Si NO dice cuándo o la acción sigue abierta (ever, never, already, yet, recently) → PRESENT PERFECT.',
        },
        scheme2: {
          heading: 'Posición de JUST, ALREADY y YET',
          detail: 'JUST y ALREADY van en medio (have + just/already + participle). YET va siempre al FINAL de frases negativas e interrogativas.',
        },
        practicalExample: '"I have already finished my homework, so I can play now." vs "I finished it ten minutes ago."',
        quizQ: 'Choose the correct option: "Have you finished your science project ___?"',
        quizOptions: ['just', 'already', 'yet (at the end of a question)'],
        correctIndex: 2,
        quizExp: 'We use "yet" at the end of questions and negative sentences in the Present Perfect.',
      },
      {
        title: 'Modal Verbs of Advice, Obligation & Lack of Obligation (Should, Must, Have to, Don’t have to)',
        summary: 'Dar consejos (Should / Ought to) y distinguir entre prohibición (Mustn’t) y ausencia de obligación (Don’t have to).',
        keyConcepts: ['SHOULD / SHOULDN’T (Advice)', 'MUSTN’T (Prohibited!)', 'DON’T HAVE TO (Not necessary)'],
        scheme1: {
          heading: 'Cuidado con la Falsa Pareja: MUSTN’T vs DON’T HAVE TO',
          detail: 'MUSTN’T = "¡Prohibido hacerlo!" ("You mustn’t copy in the exam"). DON’T HAVE TO = "No hace falta que lo hagas" ("On Sunday you don’t have to get up early").',
        },
        scheme2: {
          heading: 'Dar Consejos con SHOULD',
          detail: 'You should sleep 8 hours before an exam. / You shouldn’t study without taking short breaks.',
        },
        practicalExample: 'Guía de consejos en inglés para estudiantes nuevos del IES Clot del Moro.',
        quizQ: 'Tomorrow is Saturday and school is closed, so you ___ get up at 7:00 AM.',
        quizOptions: [
          'mustn’t (prohibido)',
          'don’t have to (no es necesario)',
          'should',
        ],
        correctIndex: 1,
        quizExp: '"Don’t have to" expresses lack of obligation (it is not necessary because there is no school on Saturday).',
      },
    ],
  },
  {
    course: '2ESO',
    subjectId: '2eso-tec',
    extraUnits: [
      {
        title: 'Energías Renovables, Estructuras Trianguladas y Programación Web / Robótica',
        summary: 'Centrales solares, eólicas e hidráulicas; cálculo de mecanismos de poleas y trenes de engranajes; pensamiento computacional.',
        keyConcepts: ['Relación de Transmisión i = N2 / N1 = D1 / D2', 'Energía Solar Fotovoltaica vs Térmica', 'Sensores y Actuadores en Robótica'],
        scheme1: {
          heading: 'Fórmula de Poleas con Correa',
          detail: 'Diámetro 1 · Velocidad 1 = Diámetro 2 · Velocidad 2 (D1 · N1 = D2 · N2). La polea pequeña siempre gira más rápido.',
        },
        scheme2: {
          heading: 'Los 3 Bloques de todo Robot',
          detail: '1. SENSORES (perciben el entorno: ultrasonidos, infrarrojos) → 2. CONTROLADOR (placa que decide) → 3. ACTUADORES (motores, servos, LEDs).',
        },
        practicalExample: 'Cálculo de la velocidad de salida de una caja reductora en el taller de Tecnología de 2º ESO.',
        quizQ: 'Si una polea motriz de 20 cm de diámetro gira a 100 rpm conectada a una polea conducida de 10 cm, ¿a qué velocidad girará la pequeña?',
        quizOptions: ['50 rpm', '200 rpm (al tener la mitad de diámetro, gira al doble de velocidad)', '100 rpm'],
        correctIndex: 1,
        quizExp: 'Aplicando D1·N1 = D2·N2: 20 · 100 = 10 · N2 → N2 = 200 rpm.',
      },
    ],
  },
  {
    course: '2ESO',
    subjectId: '2eso-mus',
    extraUnits: [
      {
        title: 'Historia de la Música (Edad Media al Rock y BSO) y Lenguaje Audiovisual',
        summary: 'Canto gregoriano, polifonía renacentista, Barroco (Bach, Vivaldi), Clasicismo (Mozart), Romanticismo (Beethoven) y bandas sonoras.',
        keyConcepts: ['Canto Gregoriano (Monódico a capela)', 'Barroco: Bajo Continuo y Contraste (Vivaldi)', 'Bandas Sonoras y Leitmotiv'],
        scheme1: {
          heading: 'Línea Temporal de Grandes Compositores',
          detail: 'Barroco (1600-1750): Bach, Vivaldi, Haendel → Clasicismo (1750-1820): Mozart, Haydn → Romanticismo (s. XIX): Beethoven, Chopin, Wagner.',
        },
        scheme2: {
          heading: '¿Qué es un Leitmotiv en el Cine y en el Anime?',
          detail: 'Es una melodía corta asociada a un personaje o emoción que suena cada vez que ese personaje entra en escena (ej. el tema de Naruto o Star Wars).',
        },
        practicalExample: 'Audición activa e identificación de instrumentos en bandas sonoras de cine y animación japonesa.',
        quizQ: '¿Cómo se llama la melodía recurrente que en una película, serie o anime identifica siempre a un personaje o idea concreta?',
        quizOptions: ['Leitmotiv', 'Gregorio', 'Escala pentatónica'],
        correctIndex: 0,
        quizExp: 'El leitmotiv (motivo conductor) asocia un tema musical concreto a un personaje, lugar o emoción.',
      },
    ],
  },

  // --- 3º ESO EXTRA UNITS ---
  {
    course: '3ESO',
    subjectId: '3eso-bio',
    extraUnits: [
      {
        title: 'El Aparato Locomotor (Esqueleto y Músculos), los Sentidos y el Sistema Inmunitario',
        summary: 'Huesos, articulaciones y músculos antagonistas; anatomía del ojo y del oído; barreras defensivas, linfocitos, vacunas y antibióticos.',
        keyConcepts: ['Músculos Antagonistas (Bíceps vs Tríceps)', 'Retina (Conos y Bastones)', 'Antibióticos (Solo Bacterias) vs Vacunas (Virus y Bacterias)'],
        scheme1: {
          heading: 'Alerta Médica de Examen: ¿Para qué sirven los Antibióticos?',
          detail: 'Los ANTIBIÓTICOS solo curan infecciones causadas por BACTERIAS. Nunca sirven contra VIRUS (como la gripe o el resfriado).',
        },
        scheme2: {
          heading: 'Las 3 Barreras Defensivas de Nuestro Cuerpo',
          detail: '1ª Piel y mucosas (física/química) → 2ª Respuesta inflamatoria y fagocitos (inespecífica) → 3ª Linfocitos y Anticuerpos (específica con memoria).',
        },
        practicalExample: 'Estudio práctico de primeros auxilios (esguinces, luxaciones y maniobra RCP) en 3º de la ESO.',
        quizQ: '¿Por qué NO debemos tomar nunca antibióticos por nuestra cuenta para curar una gripe o un resfriado común?',
        quizOptions: [
          'Porque la gripe y el resfriado están causados por VIRUS, y los antibióticos solo actúan contra BACTERIAS',
          'Porque los antibióticos solo curan roturas de huesos',
          'Porque dan sueño',
        ],
        correctIndex: 0,
        quizExp: 'Los antibióticos destruyen bacterias o impiden su reproducción, pero son totalmente ineficaces frente a los virus.',
      },
      {
        title: 'El Aparato Excretor, la Reproducción Humana y losProcesos Geológicos Externos',
        summary: 'Formación de la orina en las nefronas del riñón, ciclo ovárico y uterino, métodos anticonceptivos y modelado kárstico, fluvial y costero.',
        keyConcepts: ['Nefrona (Filtración y Reabsorción)', 'Fecundación en las Trompas de Falopio', 'Modelado Fluvial (Curso Alto en V, Medio con Meandros, Bajo)'],
        scheme1: {
          heading: 'Las 2 Etapas de Formación de la Orina en la Nefrona',
          detail: '1. Filtración glomerular (pasa agua, sales, glucosa y urea) → 2. Reabsorción tubular (la sangre recupera el 99% del agua y toda la glucosa útil).',
        },
        scheme2: {
          heading: 'Los 3 Tramos de un Río (como el Palancia)',
          detail: 'Curso Alto: mucha pendiente, valle en V y erosión. Curso Medio: menor pendiente, curvas (meandros) y transporte. Curso Bajo: desembocadura y sedimentación.',
        },
        practicalExample: 'Observación de las formas de erosión y sedimentación en la cuenca del río Palancia desde Bejís hasta Sagunto.',
        quizQ: '¿En qué parte del aparato reproductor femenino tiene lugar habitualmente la fecundación (unión del óvulo y el espermatozoide)?',
        quizOptions: ['En las trompas de Falopio', 'En el ovario', 'En la vagina'],
        correctIndex: 0,
        quizExp: 'La fecundación se produce en el tercio superior de las trompas de Falopio, antes de que el cigoto descienda al útero.',
      },
    ],
  },
  {
    course: '3ESO',
    subjectId: '3eso-fyq',
    extraUnits: [
      {
        title: 'Disoluciones (Concentración en g/L y % en masa) y Reacciones Químicas Estequiométricas',
        summary: 'Soluto y disolvente, cálculo de concentraciones, ajuste de reacciones químicas y cálculos masa-masa y mol-mol.',
        keyConcepts: ['Concentración (g/L) = masa soluto (g) / Volumen disolución (L)', '% en masa = [m_soluto / (m_soluto + m_disolvente)] · 100', 'Estequiometría por Moles'],
        scheme1: {
          heading: 'Las 2 Fórmulas de Concentración de Disoluciones',
          detail: '1. Gramos por litro: c (g/L) = gramos de soluto / Litros totales. 2. Tanto por ciento en masa: % = (gramos soluto / gramos TOTALES de disolución) · 100.',
        },
        scheme2: {
          heading: 'Los 4 Pasos para Cualquier Problema de Reacciones Químicas',
          detail: '1. Ajusta la ecuación → 2. Pasa el dato de gramos a MOLES (n = m/M) → 3. Usa la proporción de los coeficientes → 4. Pasa los moles obtenidos a gramos.',
        },
        practicalExample: 'Preparación en el laboratorio de 250 mL (0,25 L) de una disolución de concentración 20 g/L pesando 5 gramos de sal.',
        quizQ: 'Si disolvemos 15 gramos de azúcar en agua hasta completar un volumen total de 0,5 litros, ¿cuál es la concentración en g/L?',
        quizOptions: ['7,5 g/L', '30 g/L (porque 15 g / 0,5 L = 30 g/L)', '15 g/L'],
        correctIndex: 1,
        quizExp: 'Aplicando c = m_soluto / V_litros = 15 g / 0,5 L = 30 g/L.',
      },
      {
        title: 'Las Fuerzas, la Ley de Gravitación Universal, Ley de Coulomb y Electromagnetismo',
        summary: 'Fuerza peso (P = m·g) frente a masa, rozamiento, cargas eléctricas (Ley de Coulomb) e imanes.',
        keyConcepts: ['Peso (N) = masa (kg) · gravedad (m/s^2)', 'Fuerza de Rozamiento (se opone al movimiento)', 'Ley de Coulomb (Cargas eléctricas)'],
        scheme1: {
          heading: 'Diferencia Fundamental: Masa vs Peso',
          detail: 'La MASA (en kg) es la cantidad de materia y vale lo mismo en la Tierra que en la Luna. El PESO (en Newtons, P = m·g) es la fuerza con que te atrae el planeta.',
        },
        scheme2: {
          heading: 'Gravedad vs Fuerza Eléctrica',
          detail: 'La fuerza gravitatoria es SIEMPRE atractiva. La fuerza eléctrica puede ser atractiva (cargas de distinto signo) o repulsiva (cargas del mismo signo).',
        },
        practicalExample: 'Una mochila de 5 kg tiene una masa de 5 kg en cualquier lugar, pero en la Tierra (g = 9,8 m/s^2) su peso es P = 5 · 9,8 = 49 N.',
        quizQ: 'Si un astronauta tiene una masa de 70 kg en la Tierra, ¿cuál será su MASA cuando camine sobre la Luna (donde la gravedad es 6 veces menor)?',
        quizOptions: [
          'Seguirá teniendo exactamente 70 kg de masa (lo que disminuye en la Luna es su Peso en Newtons)',
          'Su masa será de 11,6 kg',
          'Su masa será 0 kg',
        ],
        correctIndex: 0,
        quizExp: 'La masa (kg) es una propiedad intrínseca del cuerpo y no cambia con la gravedad; lo que cambia es el peso (P = m·g).',
      },
    ],
  },
  {
    course: '3ESO',
    subjectId: '3eso-mat',
    extraUnits: [
      {
        title: 'Sistemas de Ecuaciones Lineales (Sustitución, Igualación y Reducción) y Problemas',
        summary: 'Elección del método más rápido para resolver sistemas 2x2 sin fracciones y traducción de problemas de edades, mezclas y compras.',
        keyConcepts: ['Método de Reducción (Sumar en vertical)', 'Método de Sustitución (Despejar letra sola)', 'Comprobación en ambas ecuaciones'],
        scheme1: {
          heading: '¿Qué método elijo en el examen para no equivocarme?',
          detail: 'Si una letra no tiene número delante (ej. x + 2y = 5), usa SUSTITUCIÓN. Si todas tienen números delante, usa REDUCCIÓN multiplicando una fila para tachar.',
        },
        scheme2: {
          heading: 'Plantilla para Problemas con 2 Incógnitas',
          detail: 'Llama X a la primera cosa e Y a la segunda. Cada frase del enunciado con un dato numérico se convierte en una de las dos ecuaciones.',
        },
        practicalExample: 'En la cafetería 2 bocadillos y 1 zumo cuestan 5 € (2x + y = 5) y 1 bocadillo y 1 zumo cuestan 3 € (x + y = 3) → Restando: x = 2 €, y = 1 €.',
        quizQ: 'En el sistema { x + y = 10 ; x - y = 4 }, si sumamos directamente ambas ecuaciones por el método de Reducción, ¿qué obtenemos?',
        quizOptions: ['2x = 14 → x = 7 (y por tanto y = 3)', '2y = 14', 'x = 6'],
        correctIndex: 0,
        quizExp: 'Al sumar en vertical se cancelan +y con -y, quedando 2x = 14, de donde x = 7 e y = 3.',
      },
      {
        title: 'Funciones Lineales (y = mx + n) y Cuadráticas (Parábolas) + Estadística y Probabilidad',
        summary: 'Pendiente y ordenada en el origen de una recta, vértice de la parábola (xv = -b/2a), media, mediana, moda y Regla de Laplace.',
        keyConcepts: ['Pendiente m (si m > 0 sube, si m < 0 baja)', 'Vértice de la Parábola: x_v = -b / (2a)', 'Regla de Laplace: P(A) = Casos Favorables / Casos Posibles'],
        scheme1: {
          heading: 'Cómo dibujar una Parábola y = ax^2 + bx + c en 3 Pasos',
          detail: '1. Mira el signo de "a" (+ sonríe ∪, - triste ∩). 2. Calcula el eje del VÉRTICE con la fórmula x_v = -b / (2a). 3. Halla los cortes con los ejes.',
        },
        scheme2: {
          heading: 'Media vs Mediana vs Moda en Estadística',
          detail: 'MODA = El dato que MÁS se repite. MEDIANA = El dato que queda justo en el CENTRO al ordenarlos de menor a mayor. MEDIA = Suma de todos dividido entre N.',
        },
        practicalExample: 'Cálculo de la probabilidad al lanzar dos dados y de la nota media de la evaluación.',
        quizQ: 'En la función parabólica y = x^2 - 6x + 5, ¿en qué valor de x se encuentra el vértice de la parábola (x_v = -b / 2a)?',
        quizOptions: ['x_v = 3 (porque -(-6) / (2·1) = 6 / 2 = 3)', 'x_v = -3', 'x_v = 5'],
        correctIndex: 0,
        quizExp: 'Como a = 1 y b = -6, la coordenada x del vértice es x_v = -(-6) / (2·1) = 6 / 2 = 3.',
      },
    ],
  },
  {
    course: '3ESO',
    subjectId: '3eso-geh',
    extraUnits: [
      {
        title: 'Geografía de la Población: Natalidad, Mortalidad, Migraciones y Pirámides de Población',
        summary: 'Tasas demográficas, crecimiento natural y real, transición demográfica, envejecimiento en España y movimientos migratorios.',
        keyConcepts: ['Crecimiento Natural = Natalidad - Mortalidad', 'Pirámide Progresiva (Pagoda), Estancada (Campana) y Regresiva (Urna)', 'Éxodo Rural y Movimientos Pendulares'],
        scheme1: {
          heading: 'Las 3 Formas de Pirámide de Población',
          detail: '1. Triángulo/Pagoda = País joven en desarrollo (alta natalidad). 2. Campana = Población adulta en transición. 3. Urna/Bulbo = País desarrollado envejecido (como España).',
        },
        scheme2: {
          heading: 'Emigración vs Inmigración y Saldo Migratorio',
          detail: 'EMIGRAR = Salir de tu lugar de origen. INMIGRAR = Llegar a un lugar nuevo. Saldo Migratorio = Inmigrantes - Emigrantes.',
        },
        practicalExample: 'Análisis del padrón demográfico de los municipios de la Baronía (Algímia d’Alfara, Alfara de la Baronía, Algar de Palancia).',
        quizQ: '¿Qué forma tiene la pirámide de población actual de España y de los países europeos desarrollados con baja natalidad y alta esperanza de vida?',
        quizOptions: [
          'Forma de pagoda o triángulo muy ancho en la base',
          'Forma de urna o bulbo (base estrecha por baja natalidad y cima ancha por envejecimiento)',
          'Forma de escalera invertida',
        ],
        correctIndex: 1,
        quizExp: 'Los países desarrollados presentan pirámides regresivas en forma de urna o bulbo debido a la baja natalidad y la alta esperanza de vida.',
      },
      {
        title: 'Organización Política de España, el Estado Autonómico y los Retos Globales (ODS)',
        summary: 'La Constitución de 1978, división de poderes, las 17 Comunidades Autónomas, el Estatut d’Autonomia de la Comunitat Valenciana y la Agenda 2030.',
        keyConcepts: ['Monarquía Parlamentaria (Constitución 1978)', 'Cortes Generales (Congreso y Senado)', 'Les Corts Valencianes y la Generalitat'],
        scheme1: {
          heading: 'La División de Poderes en España y en la Comunitat Valenciana',
          detail: 'Legislativo (hace las leyes: Cortes Generales / Les Corts) | Ejecutivo (gobierna: Gobierno / Consell de la Generalitat) | Judicial (jueces y tribunales).',
        },
        scheme2: {
          heading: 'Administración Territorial de Menor a Mayor',
          detail: 'Municipio (Ayuntamiento) → Provincia (Diputación: Castellón, Valencia, Alicante) → Comunidad Autónoma (Generalitat) → Estado Español → Unión Europea.',
        },
        practicalExample: 'Simulación de un pleno municipal o debate parlamentario en el aula de 3º ESO.',
        quizQ: '¿Cuál es el órgano que ejerce el poder legislativo (aprobar las leyes autonómicas) dentro de la Generalitat Valenciana?',
        quizOptions: ['Les Corts Valencianes', 'El Tribunal Supremo', 'Las Diputaciones Provinciales'],
        correctIndex: 0,
        quizExp: 'Les Corts Valencianes representan al pueblo valenciano y ejercen la potestad legislativa autonómica.',
      },
    ],
  },
  {
    course: '3ESO',
    subjectId: '3eso-lcl',
    extraUnits: [
      {
        title: 'Análisis Sintáctico Completo de la Oración Simple (Los 7 Complementos del Verbo)',
        summary: 'Tabla maestra con las pruebas de sustitución para acertar siempre CD, CI, Atributo, CPred, CRég, CAg y CC.',
        keyConcepts: ['Paso 1: Verbo', 'Paso 2: Sujeto (Concordancia)', 'Paso 3: Pruebas de los Complementos del Predicado'],
        scheme1: {
          heading: 'Orden de Análisis Sintáctico Anti-Impulsividad (5 Pasos)',
          detail: '1º Busca el VERBO. 2º Cambia el verbo a plural para hallar el SUJETO. 3º Todo lo demás es PREDICADO (PN si es ser/estar/parecer; PV el resto). 4º Separa las cajas de los sintagmas. 5º Aplica las pruebas.',
        },
        scheme2: {
          heading: 'Resumen de Sustituciones en 1 Línea',
          detail: 'CD = LO/LA | CI = LE/LES | Atributo = LO (con ser/estar/parecer) | CPred = ASÍ + concuerda | CRég = Prep obligatoria | CAg = POR + alguien en pasiva.',
        },
        practicalExample: 'Corrección paso a paso de 5 oraciones completas tipo examen de evaluación de 3º ESO.',
        quizQ: 'En la oración pasiva "El castillo de Sagunto fue restaurado por los arquitectos", ¿qué función tiene "por los arquitectos"?',
        quizOptions: ['Sujeto', 'Complemento Agente (realiza la acción en una oración en voz pasiva)', 'Complemento Directo'],
        correctIndex: 1,
        quizExp: 'En una oración pasiva (fue restaurado), el sintagma introducido por "por" que realiza la acción es el Complemento Agente.',
      },
      {
        title: 'El Barroco Literario: Góngora (Culteranismo), Quevedo (Conceptismo) y el Teatro',
        summary: 'El pesimismo barroco del siglo XVII, el duelo poético entre Góngora y Quevedo, y Fuenteovejuna y La vida es sueño.',
        keyConcepts: ['Culteranismo (Góngora: belleza formal y metáforas)', 'Conceptismo (Quevedo: ingenio, doble sentido y sátira)', 'La Vida es Sueño (Calderón de la Barca)'],
        scheme1: {
          heading: 'Renacimiento (Siglo XVI) vs Barroco (Siglo XVII)',
          detail: 'Renacimiento = Equilibrio, armonía y optimismo vital (Garcilaso). Barroco = Crisis, desengaño, contraste extremo y artificio (Quevedo, Góngora, Calderón).',
        },
        scheme2: {
          heading: 'Góngora vs Quevedo',
          detail: 'Luis de Góngora (Culteranismo): embellece la forma con cultismos e hipérbatos. Francisco de Quevedo (Conceptismo): juega con las ideas, la ironía y los dobles sentidos.',
        },
        practicalExample: 'Lectura comparada del soneto "A una nariz" de Quevedo y el monólogo de Segismundo en "La vida es sueño".',
        quizQ: '¿Qué corriente literaria del Barroco liderada por Francisco de Quevedo se basa en la agudeza mental, los juegos de palabras y el doble sentido?',
        quizOptions: ['El Culteranismo', 'El Conceptismo', 'El Romanticismo'],
        correctIndex: 1,
        quizExp: 'El Conceptismo (Quevedo, Gracián) busca concentrar el máximo significado e ingenio en pocas palabras.',
      },
    ],
  },
  {
    course: '3ESO',
    subjectId: '3eso-val',
    extraUnits: [
      {
        title: 'Literatura Medieval i Moderna: Ramon Llull, Jaume I, Ausiàs March i la Decadència',
        summary: 'Les Quatre Grans Cròniques (Llibre dels Fets), el Llibre de les Bèsties de Llull i la poesia espiritual i amorosa d’Ausiàs March.',
        keyConcepts: ['Jaume I (Llibre dels Fets)', 'Ramon Llull (Llibre de les Bèsties)', 'Joan Roís de Corella i Isabel de Villena'],
        scheme1: {
          heading: 'Les Quatre Grans Cròniques Històriques de la Corona d’Aragó',
          detail: '1. Llibre dels Fets (Jaume I, en 1a persona: "Nós") → 2. Crònica de Bernat Desclot → 3. Crònica de Ramon Muntaner → 4. Crònica de Pere el Cerimoniós.',
        },
        scheme2: {
          heading: 'Sor Isabel de Villena (Vita Christi, 1497)',
          detail: 'Escriptora valenciana del Segle d’Or que narra la vida de Crist donant veu i protagonisme a les dones (la Mare de Déu i Maria Magdalena).',
        },
        practicalExample: 'Lectura d’un passatge del Llibre dels Fets sobre l’entrada a València i d’una faula del Llibre de les Bèsties.',
        quizQ: 'Quina religiosa i escriptora valenciana del segle XV va escriure l’obra "Vita Christi" reivindicant el paper de les dones?',
        quizOptions: ['Mercè Rodoreda', 'Sor Isabel de Villena', 'Caterina Albert'],
        correctIndex: 1,
        quizExp: 'Sor Isabel de Villena, abadessa del convent de la Trinitat de València, és l’autora de la cèlebre "Vita Christi" (1497).',
      },
    ],
  },
  {
    course: '3ESO',
    subjectId: '3eso-ing',
    extraUnits: [
      {
        title: 'Relative Clauses, Modal Verbs of Deduction (Must, Might, Can’t) & Future Continuous',
        summary: 'Deducciones lógicas en presente (must be, might be, can’t be) y acciones que estarán en progreso en el futuro (will be doing).',
        keyConcepts: ['MUST BE (99% Sure it is true)', 'MIGHT / MAY / COULD BE (50% Possible)', 'CAN’T BE (99% Sure it is impossible)'],
        scheme1: {
          heading: 'Deducción Lógica con Modales',
          detail: 'Seguro que SÍ → MUST ("He studied a lot, he must pass"). Quizás (50%) → MIGHT / COULD ("It might rain"). Seguro que NO (Imposible) → CAN’T ("That can’t be true!").',
        },
        scheme2: {
          heading: 'Future Continuous (Will be + -ing)',
          detail: 'Lo que estarás haciendo en un momento concreto del futuro: "This time tomorrow, I will be playing my favourite video game."',
        },
        practicalExample: 'Juego de detectives en inglés usando pistas visuales ("Whose backpack is this? It must be Marta’s...").',
        quizQ: 'Look at that boy wearing a U.A. High School jacket. He ___ be a fan of My Hero Academia!',
        quizOptions: ['can’t', 'must (logical certainty)', 'shouldn’t'],
        correctIndex: 1,
        quizExp: 'We use "must" for strong logical deductions when we have clear evidence.',
      },
    ],
  },

  // --- 4º ESO EXTRA UNITS ---
  {
    course: '4ESO',
    subjectId: '4eso-geh',
    extraUnits: [
      {
        title: 'Historia de España en los Siglos XIX y XX: Del Reinado de Isabel II a la Democracia Actual',
        summary: 'Guerra de la Independencia, Restauración, II República, Guerra Civil (1936-1939), Franquismo, Transición y entrada en la Unión Europea (1986).',
        keyConcepts: ['Guerra de la Independencia (1808-1814)', 'II República y Guerra Civil (1931-1939)', 'Transición y Constitución de 1978'],
        scheme1: {
          heading: 'Cronología Esencial de la España del Siglo XX',
          detail: '1923-1930: Dictadura de Primo de Rivera → 1931-1936: II República → 1936-1939: Guerra Civil → 1939-1975: Dictadura de Franco → 1975-1978: Transición Democrática → 1986: Ingreso en la CEE (UE).',
        },
        scheme2: {
          heading: 'Patrimonio Histórico en nuestra Comarca',
          detail: 'Restos de arquitectura defensiva de la Guerra Civil (Línea XYZ en el Alto Palancia y Serra Calderona) y memoria histórica.',
        },
        practicalExample: 'Elaboración de un eje cronológico visual del siglo XX español para preparar el paso a 2º de Bachillerato.',
        quizQ: '¿En qué año se aprobó en referéndum la actual Constitución española que consolidó la democracia tras la Transición?',
        quizOptions: ['En 1812', 'En 1978 (6 de diciembre)', 'En 1931'],
        correctIndex: 1,
        quizExp: 'La Constitución democrática actual fue ratificada por los españoles en referéndum el 6 de diciembre de 1978.',
      },
    ],
  },
  {
    course: '4ESO',
    subjectId: '4eso-mat',
    extraUnits: [
      {
        title: 'Geometría Analítica (Vectores y Ecuaciones de la Recta), Inecuaciones y Combinatoria',
        summary: 'Módulo de un vector, vector director, ecuaciones vectorial, paramétrica, continua y explícita de la recta, y estudio de funciones.',
        keyConcepts: ['Vector AB = B - A (Extremo menos Origen)', 'Módulo |v| = √(vx^2 + vy^2)', 'Pendiente m = vy / vx'],
        scheme1: {
          heading: 'Cálculo de las Coordenadas de un Vector AB',
          detail: 'Resta siempre EXTREMO menos ORIGEN: si A(1, 2) y B(5, 6), entonces el vector AB = (5 - 1, 6 - 2) = (4, 4).',
        },
        scheme2: {
          heading: 'Las 4 Formas de la Ecuación de la Recta',
          detail: 'Con un punto A(a1, a2) y vector director v(v1, v2): Continua: (x - a1)/v1 = (y - a2)/v2 → Explícita: y = mx + n (donde la pendiente es m = v2 / v1).',
        },
        practicalExample: 'Comprobar si dos rectas son paralelas (tienen la misma pendiente m) o perpendiculares.',
        quizQ: 'Dados los puntos A(2, 1) y B(6, 4), ¿cuáles son las coordenadas del vector AB (Extremo B menos Origen A)?',
        quizOptions: ['(8, 5)', '(4, 3) (porque 6 - 2 = 4 y 4 - 1 = 3)', '(-4, -3)'],
        correctIndex: 1,
        quizExp: 'Restamos las coordenadas del extremo B menos las del origen A: (6 - 2, 4 - 1) = (4, 3).',
      },
      {
        title: 'Funciones Elementales, Límites Visuales, Estadística Bidimensional y Probabilidad Condicionada',
        summary: 'Dominio y recorrido de funciones racionales e irracionales, diagramas de árbol, probabilidad compuesta e intervalos.',
        keyConcepts: ['Dominio de Racionales (Denominador ≠ 0)', 'Dominio de Raíces Pares ( Interior ≥ 0 )', 'Probabilidad en Diagrama de Árbol'],
        scheme1: {
          heading: 'Cómo calcular el Dominio Dom f(x) sin fallar',
          detail: '1. Polinomios: Dom = Todos los Reales (R). 2. Fracciones: iguala el denominador a 0 y quita esos puntos. 3. Raíces cuadradas: obliga a que lo de dentro sea ≥ 0.',
        },
        scheme2: {
          heading: 'Regla del Diagrama de Árbol en Probabilidad',
          detail: 'Al avanzar por una misma rama (sujeto A Y luego B) se MULTIPLICAN las probabilidades. Al juntar varios caminos distintos (camino 1 O camino 2) se SUMAN.',
        },
        practicalExample: 'Extracción de dos bolas sin reemplazamiento de una urna usando un diagrama de árbol.',
        quizQ: '¿Cuál es el dominio de definición de la función racional f(x) = 5 / (x - 3)?',
        quizOptions: [
          'Todos los números reales excepto x = 3 (R - {3}, porque en x = 3 el denominador vale cero)',
          'Todos los números reales excepto x = 5',
          'Solo los números positivos',
        ],
        correctIndex: 0,
        quizExp: 'Como no se puede dividir entre cero, igualamos x - 3 = 0 → x = 3 queda excluido del dominio.',
      },
    ],
  },
  {
    course: '4ESO',
    subjectId: '4eso-fyq',
    extraUnits: [
      {
        title: 'Cinemática (MRU, MRUA, Caída Libre y MCU), Hidrostática (Arquímedes y Pascal) y Química del Carbono',
        summary: 'Ecuaciones del movimiento uniformemente acelerado, empuje de Arquímedes, prensa hidráulica de Pascal y alcanos, alquenos, alcoholes y ácidos.',
        keyConcepts: ['MRUA: v = v0 + a·t  |  y = y0 + v0·t + 1/2·a·t^2', 'Principio de Arquímedes: Empuje = d_líquido · V_sumergido · g', 'Prefijos Orgánicos: Met-(1), Et-(2), Prop-(3), But-(4)'],
        scheme1: {
          heading: 'Prefijos del Número de Carbonos en Química Orgánica',
          detail: '1 Carbono = MET- | 2 Carbonos = ET- | 3 Carbonos = PROP- | 4 Carbonos = BUT- | 5 = PENT-. Terminaciones: -ANO (enlace simple), -ENO (doble =), -OL (alcohol -OH).',
        },
        scheme2: {
          heading: 'Principio de Pascal (Prensa Hidráulica) y Arquímedes',
          detail: 'Pascal: F1 / S1 = F2 / S2 (permite levantar un coche aplicando poca fuerza en el émbolo pequeño). Arquímedes: Peso Aparente = Peso Real - Empuje.',
        },
        practicalExample: 'Nombrar y formular compuestos orgánicos cotidianos: metano (gas natural), etanol (CH3-CH2OH) y ácido etanoico (vinagre).',
        quizQ: 'En formulación de Química Orgánica, ¿cómo se llama el hidrocarburo de 3 átomos de carbono con enlaces simples (CH3-CH2-CH3)?',
        quizOptions: ['Metano', 'Butano', 'Propano (Prop- = 3 carbonos, -ano = enlaces simples)'],
        correctIndex: 2,
        quizExp: 'El prefijo para 3 carbonos es "prop-" y al tener solo enlaces simples termina en "-ano": propano.',
      },
    ],
  },
  {
    course: '4ESO',
    subjectId: '4eso-bio',
    extraUnits: [
      {
        title: 'La Evolución (Lamarck, Darwin y Neodarwinismo) y la Tectónica de Placas (Bordes Divergentes y Convergentes)',
        summary: 'Selección natural frente a caracteres adquiridos, pruebas de la evolución, deriva continental de Wegener y límites de placas litosféricas.',
        keyConcepts: ['Selección Natural (Darwin) vs Uso y Desuso (Lamarck)', 'Órganos Homólogos vs Análogos', 'Bordes Constructivos (Dorsales) vs Destructivos (Subducción)'],
        scheme1: {
          heading: 'Lamarck vs Darwin (Pregunta Segura de Examen)',
          detail: 'Lamarck: "La función crea el órgano" y los caracteres adquiridos se heredan (falso: las jirafas estiraban el cuello). Darwin: existe variabilidad al azar y la Selección Natural hace que sobrevivan y se reproduzcan los mejor adaptados.',
        },
        scheme2: {
          heading: 'Los 3 Tipos de Bordes de Placas Tectónicas',
          detail: '1. Divergentes/Constructivos: las placas se separan en las dorsales oceánicas creando corteza. 2. Convergentes/Destructivos: chocan (subducción y cordilleras como el Himalaya). 3. Transformantes: rozan lateralmente (falla de San Andrés).',
        },
        practicalExample: 'Explicación de la sismicidad del sureste peninsular por el contacto entre la placa Euroasiática y la placa Africana.',
        quizQ: 'Según la teoría de la evolución de Charles Darwin, ¿por qué las jirafas actuales tienen el cuello largo?',
        quizOptions: [
          'Porque a fuerza de estirarlo durante su vida les creció y se lo transmitieron a sus hijos',
          'Porque en la población nacían jirafas con cuellos de distinta longitud (variabilidad) y las de cuello más largo sobrevivían mejor a las sequías y dejaban más descendencia (Selección Natural)',
          'Porque cambiaron de alimentación en el agua',
        ],
        correctIndex: 1,
        quizExp: 'Darwin explicó la evolución mediante la variabilidad heredable y la selección natural de los individuos mejor adaptados.',
      },
      {
        title: 'Ecología, Dinámica de Poblaciones, Ciclos Biogeoquímicos e Historia de la Tierra',
        summary: 'Estratigrafía, principios de superposición y sucesión faunística (fósiles guía), eras geológicas y relaciones interespecíficas.',
        keyConcepts: ['Fósiles Guía (Trilobites, Ammonites)', 'Eras: Precámbrico, Paleozoico, Mesozoico y Cenozoico', 'Simbiosis, Mutualismo, Comensalismo y Parasitismo'],
        scheme1: {
          heading: 'Fósiles Guía y Eras Geológicas Clave',
          detail: 'Paleozoico = Trilobites y helechos gigantes | Mesozoico = Ammonites y Dinosaurios | Cenozoico = Nummulites, mamíferos y homínidos.',
        },
        scheme2: {
          heading: 'Principio de Superposición de los Estratos (Steno)',
          detail: 'En una serie sedimentaria no deformada, los estratos inferiores son siempre más antiguos que los estratos situados encima.',
        },
        practicalExample: 'Hallazgo de fósiles marinos del Mesozoico en las calizas de las comarcas valencianas.',
        quizQ: '¿En qué era geológica dominaron los dinosaurios y los cefalópodos marinos llamados Ammonites?',
        quizOptions: ['En el Paleozoico', 'En el Mesozoico (Triásico, Jurásico y Cretácico)', 'En el Precámbrico'],
        correctIndex: 1,
        quizExp: 'Los dinosaurios y los ammonites son característicos de la era Mesozoica.',
      },
    ],
  },
  {
    course: '4ESO',
    subjectId: '4eso-lcl',
    extraUnits: [
      {
        title: 'El Siglo XIX: Romanticismo (Bécquer, Espronceda y Larra) y Realismo / Naturalismo (Galdós y Clarín)',
        summary: 'De la exaltación subjetiva y rebelde del Romanticismo a la novela realista y psicológica de la burguesía decimonónica.',
        keyConcepts: ['Rimas y Leyendas (Bécquer)', 'Artículos de Costumbres (Mariano José de Larra)', 'Benito Pérez Galdós y Leopoldo Alas "Clarín" (La Regenta)'],
        scheme1: {
          heading: 'Contraste Visual: Romanticismo vs Realismo',
          detail: 'Romanticismo (1ª mitad s. XIX): sentimiento desbordado, libertad, noche, ruinas, verso (Bécquer, Don Juan Tenorio). Realismo (2ª mitad s. XIX): observación objetiva de la sociedad contemporánea, narrador omnisciente y novela (Galdós, Clarín).',
        },
        scheme2: {
          heading: 'Naturalismo (Emilia Pardo Bazán)',
          detail: 'Lleva el Realismo al extremo aplicando el determinismo biológico y social sobre los personajes (Los pazos de Ulloa).',
        },
        practicalExample: 'Lectura comparada de la Rima LIII ("Volverán las oscuras golondrinas") y un capítulo de "Fortunata y Jacinta".',
        quizQ: '¿Quién es el autor de la gran novela realista española "La Regenta", ambientada en la ciudad imaginaria de Vetusta (Oviedo)?',
        quizOptions: ['Gustavo Adolfo Bécquer', 'Leopoldo Alas "Clarín"', 'José Zorrilla'],
        correctIndex: 1,
        quizExp: 'Leopoldo Alas "Clarín" publicó "La Regenta" entre 1884 y 1885, cumbre del Realismo español.',
      },
      {
        title: 'Literatura del Siglo XX (Desde 1939 hasta la Actualidad): Cela, Delibes, Buero Vallejo y Literatura Hispanoamericana',
        summary: 'Novela existencial y social de posguerra, teatro de testimonio y el Boom hispanoamericano (Gabriel García Márquez).',
        keyConcepts: ['La Familia de Pascual Duarte (Cela) y Nada (Laforet)', 'Historia de una Escalera (Buero Vallejo)', 'Realismo Mágico (Cien años de soledad, García Márquez)'],
        scheme1: {
          heading: 'Evolución de la Novela Española tras 1939',
          detail: 'Años 40 (Existencial/Tremendismo): Cela y Carmen Laforet ("Nada") → Años 50 (Realismo Social): Delibes y Sánchez Ferlosio → Años 60 (Renovación experimental): Luis Martín-Santos.',
        },
        scheme2: {
          heading: 'El Boom Latinoamericano y el Realismo Mágico',
          detail: 'Integra lo maravilloso y mítico dentro de la vida cotidiana con total naturalidad (Gabriel García Márquez, Julio Cortázar, Mario Vargas Llosa).',
        },
        practicalExample: 'Comentario guiado de un fragmento de "Historia de una escalera" de Antonio Buero Vallejo.',
        quizQ: '¿Qué movimiento narrativo hispanoamericano liderado por Gabriel García Márquez en "Cien años de soledad" funde lo cotidiano con lo fantástico?',
        quizOptions: ['El Tremendismo', 'El Realismo Mágico', 'El Culteranismo'],
        correctIndex: 1,
        quizExp: 'El Realismo Mágico presenta elementos extraordinarios o míticos como parte normal de la realidad cotidiana.',
      },
    ],
  },
  {
    course: '4ESO',
    subjectId: '4eso-val',
    extraUnits: [
      {
        title: 'La Renaixença, el Modernisme i el Noucentisme fins a l’Assaig de Joan Fuster',
        summary: 'Recuperació literària del segle XIX (Teodor Llorente, Jacint Verdaguer, Àngel Guimerà) i l’assaig contemporani al País Valencià.',
        keyConcepts: ['Jocs Florals de la Renaixença (Pàtria, Fe i Amor)', 'Teatre d’Àngel Guimerà (Terra Baixa)', 'Joan Fuster i Enric Valor'],
        scheme1: {
          heading: 'De la Renaixença al Segle XX',
          detail: 'Renaixença (s. XIX): recuperació de la llengua literària (Teodor Llorente a València). Modernisme (1900): transformació artística europea (Santiago Rusiñol, Víctor Català).',
        },
        scheme2: {
          heading: 'Els Grans Referents Valencians del Segle XX',
          detail: 'Poesia: Vicent Andrés Estellés | Assaig i aforismes: Joan Fuster | Narrativa i rondalles: Enric Valor i Carmelina Sánchez-Cutillas ("Matèria de Bretanya").',
        },
        practicalExample: 'Lectura d’un fragment de "Matèria de Bretanya" de l’escriptora valenciana Carmelina Sánchez-Cutillas.',
        quizQ: 'Quina escriptora valenciana és l’autora de l’obra evocadora de la infantesa a Altea "Matèria de Bretanya"?',
        quizOptions: ['Carmelina Sánchez-Cutillas', 'Sor Isabel de Villena', 'Caterina Albert'],
        correctIndex: 0,
        quizExp: 'Carmelina Sánchez-Cutillas va publicar "Matèria de Bretanya" (Premi Andròmina 1975).',
      },
      {
        title: 'Les Subordinades Adverbials (Temps, Lloc, Manera, Causals, Finals, Condicionals i Concessives)',
        summary: 'Nexes normatius en valencià (perquè, ja que, per tal que, malgrat que, encara que) i errors freqüents a evitar.',
        keyConcepts: ['Causals (perquè, com que, ja que)', 'Concessives (encara que, malgrat que, tot i que)', 'Condicionals (si, posat que, llevat que)'],
        scheme1: {
          heading: 'Alerta Normativa: "COM QUE" al principi d’oració causal',
          detail: 'Quan la causa va al principi de la frase cal posar sempre COM QUE ("Com que plovia, no vam eixir") i mai *"Com plovia...".',
        },
        scheme2: {
          heading: 'Concessives (Obstaculitzen però no impedeixen)',
          detail: 'Nexes cultes per a les redaccions: "Malgrat que...", "Tot i que...", "Per més que...".',
        },
        practicalExample: 'Transformació d’oracions simples en subordinades adverbials emprant connectors formals.',
        quizQ: 'Quina és la forma normativa en valencià per començar una oració causal en primera posició ("___ era tard, vam tornar a casa")?',
        quizOptions: [
          'Com era tard...',
          'Com que era tard, vam tornar a casa (cal afegir "que" darrere de "com" causal inicial)',
          'Per a què era tard...',
        ],
        correctIndex: 1,
        quizExp: 'En valencià la conjunció causal inicial és sempre composta: "Com que + verb en indicatiu".',
      },
    ],
  },

  // --- 1º BACHILLERATO EXTRA UNITS ---
  {
    course: '1BACH',
    subjectId: '1bach-fil',
    extraUnits: [
      {
        title: 'Lógica Formal (Tablas de Verdad y Falacias), Antropología Filosófica y Filosofía Política (El Contrato Social)',
        summary: 'Falacias informales (Ad Hominem, Ad Populum), el problema mente-cuerpo (dualismo vs monismo) y Hobbes, Locke y Rousseau.',
        keyConcepts: ['Falacia Ad Hominem y Ad Verecundiam', 'Hobbes ("El hombre es un lobo para el hombre")', 'Locke (Liberalismo) y Rousseau (Voluntad General)'],
        scheme1: {
          heading: 'Los 3 Grandes Contractualistas en Filosofía Política',
          detail: '1. Thomas Hobbes: ser humano egoísta por naturaleza → pacto para crear un Estado Absoluto (Leviatán) que garantice la seguridad. 2. John Locke: derechos naturales previos (vida, libertad, propiedad) → Estado Liberal con división de poderes. 3. Rousseau: el ser humano nace bueno y la sociedad lo corrompe → Democracia y Voluntad General.',
        },
        scheme2: {
          heading: 'Detector de Falacias Argumentativas',
          detail: 'Ad Hominem: atacar a la persona en vez de a su argumento. Ad Populum: decir que algo es verdad "porque todo el mundo lo piensa". Ad Ignorantiam: decir que algo existe porque nadie ha demostrado que no exista.',
        },
        practicalExample: 'Caza de falacias lógicas en discursos políticos, tertulias y anuncios publicitarios.',
        quizQ: '¿Qué filósofo contractualista afirmó que en el estado de naturaleza "el hombre es un lobo para el hombre" (Homo homini lupus) y defendió un Estado fuerte llamado Leviatán?',
        quizOptions: ['Jean-Jacques Rousseau', 'Thomas Hobbes', 'Immanuel Kant'],
        correctIndex: 1,
        quizExp: 'Thomas Hobbes (1588-1679) describió el estado de naturaleza como una guerra de todos contra todos en su obra "Leviatán".',
      },
      {
        title: 'Filosofía de la Ciencia (Método Hipotético-Deductivo, Popper y Kuhn) y Estética Filosófica',
        summary: 'Inductivismo, falsacionismo de Karl Popper, revoluciones científicas y paradigmas de Thomas Kuhn, y el concepto de belleza.',
        keyConcepts: ['Falsacionismo de Karl Popper', 'Paradigma Científico (Thomas Kuhn)', 'Método Hipotético-Deductivo (Galileo)'],
        scheme1: {
          heading: 'Verificación vs Falsación (Karl Popper)',
          detail: 'Para Popper una teoría científica nunca se puede verificar al 100% con ejemplos particulares, pero basta UN solo contraejemplo (un cisne negro) para FALSARLA.',
        },
        scheme2: {
          heading: 'Estructura de las Revoluciones Científicas (Thomas Kuhn)',
          detail: 'Ciencia Normal (bajo un Paradigma) → Acumulación de Anomalías → Crisis → Revolución Científica → Nuevo Paradigma (ej. de Newton a Einstein).',
        },
        practicalExample: 'Análisis del cambio de paradigma del geocentrismo ptolemaico al heliocentrismo de Copérnico y Galileo.',
        quizQ: '¿Qué filósofo de la ciencia propuso el "Falsacionismo" como criterio para distinguir la ciencia de la pseudociencia?',
        quizOptions: ['Karl Popper', 'Tales de Mileto', 'San Agustín'],
        correctIndex: 0,
        quizExp: 'Karl Popper defendió que una teoría solo es científica si es falsable (es decir, si permite diseñar experimentos que podrían refutarla).',
      },
    ],
  },
  {
    course: '1BACH',
    subjectId: '1bach-mat',
    extraUnits: [
      {
        title: 'Trigonometría Analítica, Números Complejos y Geometría Vectorial en el Plano',
        summary: 'Teoremas del Seno y del Coseno para cualquier triángulo, producto escalar de vectores, distancia punto-recta y forma binómica/polar de complejos.',
        keyConcepts: ['Teorema del Seno: a/sen A = b/sen B', 'Producto Escalar: u · v = |u|·|v|·cos α = ux·vx + uy·vy', 'Unidad Imaginaria: i = √(-1) → i^2 = -1'],
        scheme1: {
          heading: 'Condición de Perpendicularidad de dos Vectores (Producto Escalar = 0)',
          detail: 'Dos vectores u y v son PERPENDICULARES (forman 90º) si y solo si su producto escalar vale CERO: u · v = ux·vx + uy·vy = 0.',
        },
        scheme2: {
          heading: 'Truco Rápido para dar un Vector Perpendicular en el Plano',
          detail: 'Dado el vector v = (a, b), para obtener uno perpendicular solo tienes que cambiar el orden de las coordenadas y cambiar el signo a UNA de ellas: n = (-b, a).',
        },
        practicalExample: 'Dado v = (3, 4), un vector perpendicular inmediato es n = (-4, 3), ya que 3·(-4) + 4·3 = -12 + 12 = 0.',
        quizQ: '¿Cuánto vale el producto escalar de dos vectores que son perpendiculares entre sí (forman un ángulo de 90º)?',
        quizOptions: ['Vale 1', 'Vale exactamente 0 (porque cos 90º = 0)', 'Vale -1'],
        correctIndex: 1,
        quizExp: 'Como el coseno de 90º es 0, el producto escalar de dos vectores ortogonales o perpendiculares es siempre 0.',
      },
      {
        title: 'Iniciación a las Integrales Indefinidas, Distribuciones Binomial y Normal N(μ, σ)',
        summary: 'Tabla de primitivas inmediatas, distribución discreta Binomial B(n, p) y tipificación en la campana de Gauss Z = (X - μ) / σ.',
        keyConcepts: ['∫ x^n dx = [x^(n+1)] / (n + 1) + C', 'Binomial B(n, p): media μ = n·p', 'Tipificación Normal: Z = (X - μ) / σ'],
        scheme1: {
          heading: 'Derivar vs Integrar (Operaciones Inversas)',
          detail: 'Al derivar x^n multiplicas por n y restas 1 al exponente. Al INTEGRAR sumas 1 al exponente y divides por ese nuevo exponente (+ constante C).',
        },
        scheme2: {
          heading: 'Cómo Tipificar cualquier Variable Normal X ~ N(μ, σ) a N(0, 1)',
          detail: 'Resta siempre la media μ y divide entre la desviación típica σ: Z = (X - μ) / σ para poder buscar en la tabla de la Normal estándar.',
        },
        practicalExample: 'Si las alturas siguen una Normal de media μ = 170 cm y desviación σ = 5 cm, el valor X = 180 cm tipificado es Z = (180 - 170) / 5 = +2.',
        quizQ: '¿Cuál es la integral indefinida (primitiva) de la función f(x) = 3x^2?',
        quizOptions: ['6x + C', 'x^3 + C (porque la derivada de x^3 es 3x^2)', '3x^3 + C'],
        correctIndex: 1,
        quizExp: 'Sumamos 1 al exponente: 3 · (x^3 / 3) + C = x^3 + C.',
      },
    ],
  },
  {
    course: '1BACH',
    subjectId: '1bach-lcl',
    extraUnits: [
      {
        title: 'Literatura Clásica Española (Edad Media, Renacimiento, Barroco, Ilustración y Romanticismo)',
        summary: 'Recorrido literario completo de 1º de Bachillerato desde las Jarchas, Jorge Manrique y La Celestina hasta Garcilaso, Cervantes, Bécquer y Larra.',
        keyConcepts: ['Coplas a la muerte de su padre (Jorge Manrique)', 'Tópicos Renacentistas (Garcilaso y Fray Luis)', 'Romanticismo (Bécquer, Espronceda y Larra)'],
        scheme1: {
          heading: 'Jorge Manrique y la Copla de Pie Quebrado (Siglo XV)',
          detail: 'Estrofa de 8a 8b 4c 8d 8e 4f. Temas: Tempus Fugit, "Nuestras vidas son los ríos que van a dar en la mar, que es el morir" y la teoría de las Tres Vidas (terrenal, de la fama y eterna).',
        },
        scheme2: {
          heading: 'Romanticismo (1ª mitad s. XIX) vs Realismo (2ª mitad s. XIX)',
          detail: 'Romanticismo = Libertad creadora, subjetividad, amor pasional imposible y naturaleza tormentosa (Bécquer, Don Juan Tenorio). Realismo = Observación objetiva de la sociedad burguesa a través de la novela (Galdós, Clarín: La Regenta).',
        },
        practicalExample: 'Comentario de texto guiado de las Coplas de Jorge Manrique y de una Rima de Gustavo Adolfo Bécquer.',
        quizQ: '¿A qué obra del siglo XV pertenecen los célebres versos "Nuestras vidas son los ríos / que van a dar en la mar, / que es el morir"?',
        quizOptions: [
          'El Cantar de Mio Cid',
          'Coplas a la muerte de su padre, de Jorge Manrique',
          'Rimas, de Gustavo Adolfo Bécquer',
        ],
        correctIndex: 1,
        quizExp: 'Son los versos iniciales de la copla III de las "Coplas a la muerte de su padre" de Jorge Manrique.',
      },
      {
        title: 'Las Perífrasis Verbales (Aspectuales y Modales) y la Oración Compuesta Subordinada',
        summary: 'Cómo distinguir una perífrasis verbal de dos verbos separados, clasificación de perífrasis y funciones de las subordinadas.',
        keyConcepts: ['Verbo Auxiliar + (Nexo) + Infinitivo/Gerundio/Participio', 'Modales (Obligación y Probabilidad)', 'Aspectuales (Ingresivas, Incoativas, Durativas, Terminativas)'],
        scheme1: {
          heading: 'Prueba para saber si es Perífrasis Verbal',
          detail: 'Es perífrasis si el primer verbo (auxiliar) HA PERDIDO su significado literal de movimiento: en "Voy a estudiar mañana" no caminas físicamente hacia ningún sitio (perífrasis ingresiva).',
        },
        scheme2: {
          heading: 'Incoativas vs Terminativas vs Reiterativas',
          detail: 'Incoativa = Empieza la acción ("Rompió a llorar", "Se echó a reír"). Durativa = En progreso ("Sigue estudiando"). Terminativa = Fin ("Dejó de llover"). Reiterativa = Repetición ("Volvió a leerlo").',
        },
        practicalExample: 'Clasificación de 10 perífrasis verbales extraídas de artículos periodísticos.',
        quizQ: '¿De qué tipo es la perífrasis verbal subrayada en "El público rompió a aplaudir al terminar la obra"?',
        quizOptions: [
          'Perífrasis modal de obligación',
          'Perífrasis aspectual incoativa (indica el momento exacto en que empieza la acción)',
          'Perífrasis aspectual terminativa',
        ],
        correctIndex: 1,
        quizExp: '"Romper a + infinitivo" y "echarse a + infinitivo" son perífrasis aspectuales incoativas porque señalan el inicio repentino de la acción.',
      },
    ],
  },
  {
    course: '1BACH',
    subjectId: '1bach-val',
    extraUnits: [
      {
        title: 'Literatura Clàssica Catalana i Valenciana: Trobadors, Ramon Llull, Ausiàs March i Tirant lo Blanc',
        summary: 'L’amor cortés trobadoresc, l’obra enciclopèdica de Llull, els Cants d’Ausiàs March i la modernitat narrativa de Joanot Martorell.',
        keyConcepts: ['Fin’Amors (Vassallatge amorós trobadoresc)', 'Ausiàs March (Abandona l’occità pel valencià)', 'Tirant lo Blanc i Curial e Güelfa'],
        scheme1: {
          heading: 'Els Tòpics de la Poesia Trobadoresca (Segles XII-XIII)',
          detail: 'La dama és anomenada "midons" (el meu senyor) amb un senhal secret; el poeta és el vassall humil i el marit gelós és el "gilós" envoltat pels "lauzengiers" (aduladors).',
        },
        scheme2: {
          heading: 'El Segle XV: El Segle d’Or de les Lletres Valencianes',
          detail: 'València esdevé la capital econòmica i cultural de la Corona d’Aragó amb Ausiàs March, Joanot Martorell, Jaume Roig ("Espill") i Sor Isabel de Villena.',
        },
        practicalExample: 'Anàlisi del Poema XIII d’Ausiàs March ("Colguen les gents ab alegria festes").',
        quizQ: 'Com s’anomenava el pseudònim o nom en clau amb què els trobadors i Ausiàs March ocultaven la identitat de la dama al final del poema (en la tornada)?',
        quizOptions: ['Senhal (exemple: "Plena de seny" o "Llir entre cards" en Ausiàs March)', 'Estrambot', 'albada'],
        correctIndex: 0,
        quizExp: 'El "senhal" era el senyal o pseudònim poètic situat a la tornada del poema per preservar el secret de l’estimada.',
      },
    ],
  },
  {
    course: '1BACH',
    subjectId: '1bach-ing',
    extraUnits: [
      {
        title: 'Modal Perfects (Must/May/Could/Should have + Participle) & Advanced Reported Speech',
        summary: 'Expresar certezas, posibilidades o arrepentimientos sobre el pasado con modales perfectos y verbos introductorios (suggest, apologize, advise).',
        keyConcepts: ['MUST HAVE + Participle (Deducción segura del pasado)', 'SHOULD HAVE + Participle (Crítica o arrepentimiento)', 'Reporting Verbs: Suggest + -ING / Advise someone + TO'],
        scheme1: {
          heading: 'Los 4 Modales Perfectos que salen siempre en Examen',
          detail: '1. MUST HAVE done = Seguro que lo hizo. 2. CAN’T HAVE done = Imposible que lo hiciera. 3. MIGHT/COULD HAVE done = Quizás lo hizo. 4. SHOULD HAVE done = Debería haberlo hecho (pero no lo hizo).',
        },
        scheme2: {
          heading: 'Reporting Verbs Especiales (B2 / PAU)',
          detail: 'SUGGEST / RECOMMEND / DENY / ADMIT van seguidos de verbo en -ING ("She suggested going to the cinema"). ADVISE / WARN / REMIND / INVITE van con Persona + TO + Infinitivo.',
        },
        practicalExample: '"You should have studied Unit 2 yesterday!" / "He apologized for arriving late."',
        quizQ: 'Complete the sentence: "The streets are completely wet this morning; it ___ (rain) last night."',
        quizOptions: [
          'must have rained (logical certainty about the past)',
          'should rain',
          'can’t have rained',
        ],
        correctIndex: 0,
        quizExp: 'We use "must have + past participle" to express a logical deduction about something that happened in the past.',
      },
    ],
  },
  {
    course: '1BACH',
    subjectId: '1bach-fyq',
    extraUnits: [
      {
        title: 'Equilibrio Químico (Kc, Kp y Le Châtelier), Gravitación y Energía en Sistemas Físicos',
        summary: 'Constantes de equilibrio químico, factores que desplazan el equilibrio, impulso mecánico y conservación de la cantidad de movimiento.',
        keyConcepts: ['Kc = [Productos]^coef / [Reactivos]^coef', 'Kp = Kc · (R·T)^(Δn)', 'Conservación del Momento Lineal: p = m · v'],
        scheme1: {
          heading: 'Cuidado en la Fórmula de Kc: ¡Sólidos y Líquidos Puros NO Entran!',
          detail: 'En la expresión de las constantes Kc y Kp solo se incluyen las especies GASEOSAS (g) o en DISOLUCIÓN ACUOSA (aq). Los sólidos puros (s) no se ponen.',
        },
        scheme2: {
          heading: 'Teorema de Conservación de la Cantidad de Movimiento (Choques y Explosiones)',
          detail: 'En ausencia de fuerzas externas, el momento lineal antes del choque es igual al de después: m1·v1 + m2·v2 = m1·v1’ + m2·v2’.',
        },
        practicalExample: 'Cálculo de la velocidad de retroceso de un patinador al lanzar un balón hacia delante.',
        quizQ: 'En el equilibrio heterogéneo CaCO3(s) ⇄ CaO(s) + CO2(g), ¿qué especies químicas aparecen en la expresión de la constante Kc?',
        quizOptions: [
          'Únicamente la concentración del gas [CO2], porque los sólidos puros (s) no se incluyen en Kc',
          'Solo los dos sólidos',
          'Ninguna especie',
        ],
        correctIndex: 0,
        quizExp: 'La concentración de los sólidos puros es constante y se engloba dentro de Kc, por lo que Kc = [CO2].',
      },
    ],
  },

  // --- 2º BACHILLERATO PAU EXTRA UNITS ---
  {
    course: '2BACH',
    subjectId: '2bach-his',
    extraUnits: [
      {
        title: 'El Sexenio Democrático (1868-1874), la Crisis de 1898, Alfonso XIII y la Dictadura de Primo de Rivera (1923-1930)',
        summary: 'Revolución Gloriosa, Constitución de 1869, I República, pérdida de Cuba y Filipinas, Semana Trágica (1909), Crisis de 1917 y Directorio Militar y Civil.',
        keyConcepts: ['Constitución de 1869 (Democrática)', 'Desastre del 98 y Regeneracionismo', 'Triple Crisis de 1917 y Golpe de Primo de Rivera (1923)'],
        scheme1: {
          heading: 'La Triple Crisis de 1917 en el Reinado de Alfonso XIII',
          detail: '1. Crisis Militar: Juntas de Defensa. 2. Crisis Política: Asamblea de Parlamentarios en Barcelona. 3. Crisis Social: Huelga General Revolucionaria de agosto de 1917.',
        },
        scheme2: {
          heading: 'Las 2 Etapas de la Dictadura de Miguel Primo de Rivera (1923-1930)',
          detail: '1. Directorio Militar (1923-1925): suspensión de la Constitución y victoria en el Desembarco de Alhucemas (fin de la guerra de Marruecos). 2. Directorio Civil (1925-1930): obras públicas, Confederaciones Hidrográficas y caída tras el crack de 1929.',
        },
        practicalExample: 'Análisis de un manifiesto regeneracionista de Joaquín Costa ("Escuela y despensa") y del golpe de 1923.',
        quizQ: '¿Qué operación militar conjunta hispano-francesa de 1925 permitió a Primo de Rivera poner fin a la guerra del Rif en Marruecos?',
        quizOptions: [
          'El Desastre de Annual',
          'El Desembarco de Alhucemas (1925)',
          'La Semana Trágica',
        ],
        correctIndex: 1,
        quizExp: 'El éxito del Desembarco de Alhucemas en septiembre de 1925 supuso la rendición de Abd el-Krim y el mayor triunfo de Primo de Rivera.',
      },
    ],
  },
  {
    course: '2BACH',
    subjectId: '2bach-fil',
    extraUnits: [
      {
        title: 'Ortega y Gasset (Raciovitalismo y Perspectivismo), Hannah Arendt y Simone de Beauvoir (Filosofía del Siglo XX)',
        summary: '"Yo soy yo y mi circunstancia" de Ortega, la banalidad del mal y condición humana en Hannah Arendt, y la crítica feminista contemporánea.',
        keyConcepts: ['Raciovitalismo ("Yo soy yo y mi circunstancia")', 'Razón Vital e Histórica (Ortega)', 'Banalidad del Mal y Vida Activa (Hannah Arendt)'],
        scheme1: {
          heading: 'Cómo Ortega supera el Realismo Antiguo y el Idealismo Moderno',
          detail: 'Ni las cosas solas (realismo) ni el yo aislado (Descartes): la realidad radical es la VIDA como coexistencia inseparable del Yo con su Circunstancia ("Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo").',
        },
        scheme2: {
          heading: 'Perspectivismo de Ortega y Gasset',
          detail: 'La verdad no es única y absoluta desde ningún lugar, ni tampoco es relativismo escéptico: cada individuo y cada generación capta una perspectiva real e insustituible del universo.',
        },
        practicalExample: 'Comentario guiado de un fragmento de "El tema de nuestro tiempo" de José Ortega y Gasset para la PAU.',
        quizQ: '¿A qué filósofo español pertenece la célebre tesis raciovitalista "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo"?',
        quizOptions: ['Miguel de Unamuno', 'José Ortega y Gasset', 'Xavier Zubiri'],
        correctIndex: 1,
        quizExp: 'José Ortega y Gasset formuló esta célebre sentencia en sus "Meditaciones del Quijote" (1914).',
      },
    ],
  },
  {
    course: '2BACH',
    subjectId: '2bach-mat',
    extraUnits: [
      {
        title: 'Geometría en el Espacio R3 PAU: Posición Relativa de Rectas y Planos, Ángulos y Distancias',
        summary: 'Ecuación implícita del plano, vector director de la recta y vector normal del plano, distancia punto-plano y recta perpendicular común.',
        keyConcepts: ['Vector Normal del Plano π: n = (A, B, C)', 'Distancia Punto-Plano: d(P, π) = |Ax0+By0+Cz0+D| / √(A^2+B^2+C^2)', 'Producto Vectorial (u × v) Perpendicular a Ambos'],
        scheme1: {
          heading: 'Cuidado en Geometría R3: ¡Recta y Plano tienen vectores opuestos!',
          detail: 'En una RECTA el vector v va por DENTRO de la recta (director). En un PLANO Ax+By+Cz+D=0 el vector n=(A,B,C) es PERPENDICULAR (normal) al plano. Por tanto, Recta // Plano cuando v · n = 0.',
        },
        scheme2: {
          heading: 'Fórmula Directa de Distancia de un Punto P(x0, y0, z0) a un Plano π',
          detail: 'Sustituye las coordenadas del punto en la ecuación del plano en valor absoluto y divide por el módulo del vector normal: d = |A·x0 + B·y0 + C·z0 + D| / √(A² + B² + C²).',
        },
        practicalExample: 'Resolución completa del Problema 2 de Geometría Espacial de la PAU.',
        quizQ: 'Dado el plano π de ecuación 2x - 3y + 5z - 8 = 0, ¿cuáles son las coordenadas de un vector normal (perpendicular) a dicho plano?',
        quizOptions: [
          'n = (2, -3, 5) (los coeficientes de x, y, z en la ecuación general del plano)',
          'n = (-3, 5, -8)',
          'n = (0, 0, -8)',
        ],
        correctIndex: 0,
        quizExp: 'En la ecuación implícita o general del plano Ax + By + Cz + D = 0, los coeficientes (A, B, C) forman el vector normal.',
      },
    ],
  },
  {
    course: '2BACH',
    subjectId: '2bach-lcl',
    extraUnits: [
      {
        title: 'Sintaxis Inversa PAU (Pares Mínimos y Agramaticalidad) y Modalización Textual',
        summary: 'Cómo resolver el nuevo modelo de preguntas competenciales de Sintaxis y Léxico de la PAU y redactar la pregunta de Modalización.',
        keyConcepts: ['Pares Mínimos (Contraste de dos oraciones)', 'Léxico Contextual y Derivación', 'Elementos Modalizadores (Deixis, Léxico Valorativo, Figuras)'],
        scheme1: {
          heading: 'Plantilla de 3 Pasos para Resolver un "Par Mínimo" en la PAU',
          detail: '1. Identifica la diferencia exacta entre la oración A y la oración B. 2. Nombra el concepto gramatical que cambia (ej. transitividad, adjetivo especificativo vs explicativo, SE impersonal vs pasiva refleja). 3. Explica cómo cambia el significado o por qué una es agramatical (*).',
        },
        scheme2: {
          heading: 'Los 5 Rasgos de Modalización que siempre debes buscar en el texto PAU',
          detail: '1. Deixis personal (1ª persona plural inclusiva "debemos"). 2. Léxico valorativo (sustantivos y adjetivos subjetivos). 3. Verbos modales y perífrasis de obligación. 4. Figuras retóricas (ironía, metáfora, interrogación retórica). 5. Signos de puntuación (comillas irónicas).',
        },
        practicalExample: 'Ejemplo PAU de Par Mínimo: Explicar la diferencia entre "Los alumnos que estudiaron aprobaron" (especificativa: solo los que estudiaron) y "Los alumnos, que estudiaron, aprobaron" (explicativa entre comas: todos estudiaron y todos aprobaron).',
        quizQ: 'En un ejercicio de Pares Mínimos de la PAU, ¿qué indica el asterisco (*) colocado delante de una oración como "*Se venden a los pisos"?',
        quizOptions: [
          'Que la oración es una metáfora poética',
          'Que la oración es agramatical (incorrecta según las reglas del sistema de la lengua)',
          'Que está en voz activa',
        ],
        correctIndex: 1,
        quizExp: 'En lingüística y en los exámenes PAU, el asterisco (*) delante de una secuencia indica que es agramatical.',
      },
      {
        title: 'Guía Profunda de Lecturas PAU: Machado (Campos de Castilla), Lorca (Bernarda Alba), Miguel Hernández y Laforet (Nada)',
        summary: 'Temas, símbolos y contexto histórico-literario de las obras clave para las preguntas de educación literaria de la PAU.',
        keyConcepts: ['Símbolos de Machado (Tarde, Camino, Río, Agua)', 'Tragedia Lorquiana (Bastón, Blanco/Negro vs Verde, Caballo)', 'Existencialismo en "Nada" de Carmen Laforet'],
        scheme1: {
          heading: 'Simbología Esencial en Antonio Machado y Federico García Lorca',
          detail: 'Machado: El camino = la vida; El río/mar = el destino y la muerte; La tarde = melancolía y paso del tiempo. Lorca (Bernarda Alba): Bastón y muros blancos = tiranía y represión; Vestido verde de Adela y el caballo garañón = rebeldía, libertad y deseo.',
        },
        scheme2: {
          heading: 'Las 3 Etapas Poéticas de Miguel Hernández',
          detail: '1. Etapa neogongorina (Perito en lunas y El rayo que no cesa: amor y pena). 2. Poesía comprometida de guerra (Viento del pueblo). 3. Poesía carcelaria intimista (Cancionero y romancero de ausencias: Nanas de la cebolla).',
        },
        practicalExample: 'Redacción modelo de 120 palabras respondiendo a una pregunta oficial de Literatura de la PAU.',
        quizQ: 'En "Campos de Castilla" de Antonio Machado, ¿qué simbolizan de forma recurrente "el camino" y "el mar"?',
        quizOptions: [
          'El comercio marítimo y las carreteras',
          'El camino simboliza el transcurso de la vida humana (búsqueda y peregrinaje) y el mar simboliza la muerte',
          'La revolución industrial',
        ],
        correctIndex: 1,
        quizExp: 'Siguiendo la tradición manriqueña, en Machado el camino y el río representan el fluir de la vida y el mar representa la muerte.',
      },
    ],
  },
  {
    course: '2BACH',
    subjectId: '2bach-val',
    extraUnits: [
      {
        title: 'Sintaxi, Pronoms Febles, Lèxic i Redacció del Text Argumentatiu PAU (150-200 paraules)',
        summary: ' Domini de les preguntes de comprensió, anàlisi lingüística (pronoms, que/què, perquè/per a què) i plantilla per a l’assaig de la PAU.',
        keyConcepts: ['QUE (conjunció àtona) vs QUÈ (relatiu/interrogatiu tònic)', 'PERQUÈ (causa = ja que) vs PER A QUÈ (finalitat)', 'Estructura en 4 Paràgrafs amb Connectors'],
        scheme1: {
          heading: 'Distinció Clau PAU: QUE vs QUÈ',
          detail: 'S’escriu QUÈ (amb accent) quan va precedit de preposició i es pot substituir per "la qual cosa" o "quin/a" ("El tema de què parlem"). S’escriu QUE (sense accent) quan és conjunció o relatiu sense preposició.',
        },
        scheme2: {
          heading: 'Banc de Connectors Cultes per a la Producció Escrita PAU',
          detail: 'Per començar: "En primer lloc, cal destacar que..." | Per afegir: "A més a més, convé tindre en compte que..." | Per contrastar: "Tanmateix / No obstant això..." | Per concloure: "En definitiva / En conclusió...".',
        },
        practicalExample: 'Simulacre complet de les preguntes d’Anàlisi Lingüística i Expressió Escrita de la prova oficial PAU.',
        quizQ: 'Quina forma és correcta per a completar l’oració: "La situació a ___ hem arribat exigeix mesures urgents"?',
        quizOptions: [
          'que (sense accent)',
          'què (pronom relatiu tònic precedit de la preposició "a", equivalent a "la qual")',
          'qui',
        ],
        correctIndex: 1,
        quizExp: 'Quan el pronom relatiu fa referència a una cosa i va darrere de preposició (a, de, en, amb), porta accent obert: "a què" (= a la qual).',
      },
      {
        title: 'Guia de les 4 Lectures PAU Valencià: Mercè Rodoreda, Vicent Andrés Estellés, Joan Fuster i Rodolf Sirera',
        summary: 'Resum d’estructures, personatges, temàtiques i preguntes oficials resoltes de les quatre obres del currículum PAU.',
        keyConcepts: ['Natàlia / Colometa (Evolució psicològica)', 'Realisme quotidià de postguerra en Estellés', 'L’assaig escèptic i dialògic de Joan Fuster'],
        scheme1: {
          heading: 'Claus de "Llibre de meravelles" (Estellés) i "Diccionari per a ociosos" (Fuster)',
          detail: 'Estellés fa una crònica moral i amorosa de la València de postguerra ("Ací em pariren i ací estic"). Fuster renova l’assaig europeu en la tradició de Montaigne amb ironia, escepticisme i un estil directe que convida el lector a pensar.',
        },
        scheme2: {
          heading: 'Estructura de "El verí del teatre" de Rodolf Sirera (1978)',
          detail: 'Obra d’estructura circular i joc metateatral en el París de 1784: el Marqués sotmet l’actor Gabriel de Beaumont a un experiment extrem per demostrar que la realitat supera sempre la ficció.',
        },
        practicalExample: 'Redacció model de les dues preguntes de literatura del bloc de creació literària PAU.',
        quizQ: 'Quin tret caracteritza l’assaig humanístic de Joan Fuster en obres com "Diccionari per a ociosos"?',
        quizOptions: [
          'El dogmatisme tancat en vers',
          'L’escepticisme crític, la ironia intel·lectual i la voluntat de dialogar amb el lector ("L’home és la mesura de totes les coses")',
          'La ficció cavalleresca medieval',
        ],
        correctIndex: 1,
        quizExp: 'L’assaig de Joan Fuster destaca pel to antidogmàtic, irònic, racionalista i obert a la reflexió del lector.',
      },
    ],
  },
  {
    course: '2BACH',
    subjectId: '2bach-ing',
    extraUnits: [
      {
        title: 'PAU Use of English Rephrasing Masterclass: Conditionals, Passive, Reported Speech & Modals',
        summary: 'Los 10 patrones exactos de transformación de frases (Rephrasing) que se repiten todos los años en el examen PAU de Inglés.',
        keyConcepts: ['Despite / In spite of + Noun/-ing vs Although + Subject + Verb', 'So + Adj + That vs Such + (a) Adj + Noun + That', 'It is said that... / He is said to...'],
        scheme1: {
          heading: 'Patrón PAU #1: ALTHOUGH vs DESPITE / IN SPITE OF',
          detail: 'ALTHOUGH / EVEN THOUGH + Sujeto + Verbo ("Although it was raining..."). DESPITE / IN SPITE OF + Sustantivo o Verbo en -ING ("Despite the rain..." / "Despite being tired...").',
        },
        scheme2: {
          heading: 'Patrón PAU #2: I Regret Doing → I Wish I Hadn’t Done',
          detail: 'Siempre que la frase original exprese arrepentimiento sobre el pasado ("I regret not studying" / "It’s a pity I didn’t go"), transforma con: I WISH + PAST PERFECT ("I wish I had studied").',
        },
        practicalExample: 'Original: "Although he had a lot of experience, he didn’t get the job." → Rephrasing: "Despite having a lot of experience, he didn’t get the job."',
        quizQ: 'Complete the PAU rephrasing: "It was such a cold day that we stayed at home." → "The day was ___ that we stayed at home."',
        quizOptions: [
          'such cold',
          'so cold (So + Adjective + That)',
          'too cold',
        ],
        correctIndex: 1,
        quizExp: 'We use "SUCH + (a/an) + adjective + noun + that", but "SO + adjective + that" when there is no noun after the adjective.',
      },
      {
        title: 'PAU Vocabulary, Phrasal Verbs, False Friends & Argumentative vs For-and-Against Essay',
        summary: 'Los False Friends más peligrosos de Selectividad (actually, sensible, library, career) y vocabulario C1 para educación, medioambiente y tecnología.',
        keyConcepts: ['Actually (= En realidad) vs Currently (= Actualmente)', 'Sensible (= Sensato) vs Sensitive (= Sensible)', 'High-Scoring Connectors (Furthermore, Nonetheless, Consequently)'],
        scheme1: {
          heading: 'Top 5 "False Friends" que caen en los Textos de la PAU',
          detail: '1. ACTUALLY = En realidad (Actualmente es Nowadays/Currently). 2. SENSIBLE = Sensato, prudente. 3. LIBRARY = Biblioteca (Librería es Bookshop). 4. CAREER = Trayectoria profesional (Carrera universitaria es Degree). 5. ARGUMENT = Discusión/Pelea.',
        },
        scheme2: {
          heading: 'Expresiones C1 para Subir Nota en el Writing PAU',
          detail: 'En vez de "I think", escribe: "As far as I am concerned,..." o "From my point of view,...". En vez de "Very important", escribe: "Of paramount importance / Crucial".',
        },
        practicalExample: 'Sustitución de palabras básicas (good, bad, important, think) por vocabulario C1 en un ensayo de 140 palabras.',
        quizQ: 'What does the English word "SENSIBLE" mean in Spanish (watch out for the false friend)?',
        quizOptions: [
          'Sensible que llora con facilidad',
          'Sensato, razonable o prudente ("Sensible" emocional se dice "Sensitive")',
          'Sensacional',
        ],
        correctIndex: 1,
        quizExp: '"Sensible" means having good judgement (sensato/prudente), whereas "sensitive" means easily affected emotionally.',
      },
    ],
  },
];

// ============================================================================
// 2. ENRIQUECEDOR PEDAGÓGICO DE UNIDADES (TEORÍA POR BLOQUES, GLOSARIO, TRAMPAS DE EXAMEN Y TESTS EXTRA)
// ============================================================================
export interface EnrichedUnitData {
  theoryBlocks: {
    blockTitle: string;
    content: string;
    highlightFormulaOrRule?: string;
  }[];
  glossary: {
    term: string;
    definition: string;
  }[];
  examTraps: string[];
  studyChecklist: string[];
}

export function getEnrichedUnitData(unit: SyllabusUnit, subjectName: string): EnrichedUnitData {
  const [c1 = 'Concepto Principal', c2 = 'Regla Aplicada', c3 = 'Relación Clave'] = unit.keyConcepts;
  const s1 = unit.visualScheme[0];
  const s2 = unit.visualScheme[1] || unit.visualScheme[0];

  const theoryBlocks = [
    {
      blockTitle: `1. Fundamento y Visión General: ${unit.title}`,
      content: `${unit.summary} En la asignatura de ${subjectName}, este tema constituye uno de los pilares de evaluación porque conecta directamente ${c1} con ${c2}. Para estudiarlo con alta eficacia y sin saturación cognitiva, primero identifica qué pregunta responde el tema y asóciala con el esquema visual inferior.`,
      highlightFormulaOrRule: s1 ? `${s1.heading}: ${s1.detail}` : c1,
    },
    {
      blockTitle: `2. Desarrollo Estructurado de ${c1} y ${c2}`,
      content: s2
        ? `${s2.detail} Al analizar un ejercicio o pregunta de desarrollo sobre este bloque, conviene estructurar tu respuesta en tres partes breves: definición precisa del término (${c1}), explicación de la causa o regla (${c2}) y cierre con un ejemplo concreto.`
        : `Al desarrollar esta pregunta en el examen, comienza definiendo con claridad ${c1}, aplica la regla paso a paso y apóyate siempre en un caso concreto.`,
      highlightFormulaOrRule: `Conceptos nucleares: ${unit.keyConcepts.join(' · ')}`,
    },
    {
      blockTitle: `3. Aplicación Práctica y Resolución Paso a Paso`,
      content: `Caso práctico de referencia: ${unit.practicalExample} Observa cómo la teoría no se memoriza de forma aislada, sino que se comprueba aplicando directamente la regla de la unidad sobre los datos del enunciado.`,
      highlightFormulaOrRule: `Regla de oro TDAH: Subraya primero los datos clave antes de empezar a redactar o calcular.`,
    },
  ];

  const glossary = unit.keyConcepts.map((kc, idx) => {
    if (idx === 0 && s1) {
      return {
        term: kc,
        definition: `Concepto central de la unidad. Clave de estudio: ${s1.detail}`,
      };
    }
    if (idx === 1 && s2) {
      return {
        term: kc,
        definition: `Elemento fundamental vinculado a ${s2.heading}: ${s2.detail}`,
      };
    }
    return {
      term: kc,
      definition: `Término esencial de evaluación en "${unit.title}". Ejemplo de aplicación: ${unit.practicalExample}`,
    };
  });

  const examTraps = [
    `Trampa de Impulsividad #1: Responder sin leer la frase entera del enunciado (especialmente si pregunta "cuál NO es correcta" o pide cambiar unidades/signos en ${c1}).`,
    `Trampa de Examen #2: Confundir los términos de "${s1?.heading || c1}" por contestar de memoria sin dibujar antes un mini-esquema de 10 segundos en el margen.`,
    `Trampa de Formato #3: Dejar el resultado o la conclusión sin indicar las unidades o sin justificar brevemente con "${c3}".`,
  ];

  const studyChecklist = [
    `Sé explicar con mis propias palabras qué significa "${c1}" sin mirar los apuntes.`,
    `He revisado el esquema visual "${s1?.heading || unit.title}" y entiendo la diferencia clave.`,
    `He practicado el ejemplo resuelto y he respondido las preguntas de autoevaluación de la unidad.`,
  ];

  return {
    theoryBlocks,
    glossary,
    examTraps,
    studyChecklist,
  };
}

export function buildExtendedQuizForUnit(unit: SyllabusUnit): QuizQuestion[] {
  const existing = unit.quickQuiz || [];
  if (existing.length >= 3) return existing;

  const s1 = unit.visualScheme[0];
  const s2 = unit.visualScheme[1] || unit.visualScheme[0];
  const c1 = unit.keyConcepts[0] || unit.title;

  const extraQ1: QuizQuestion = {
    id: `${unit.id}-ext-q2`,
    question: s1
      ? `Según el esquema clave "${s1.heading}", ¿cuál de estas afirmaciones es la correcta?`
      : `¿Cuál de los siguientes conceptos es fundamental dentro de la unidad "${unit.title}"?`,
    options: [
      s1 ? s1.detail : `El dominio y aplicación de ${c1}`,
      'No existe ninguna regla ni relación entre los conceptos de este tema',
      'Se debe responder al azar sin analizar los datos del enunciado',
    ],
    correctIndex: 0,
    explanation: s1
      ? `Recuerda la regla del esquema visual: ${s1.heading} — ${s1.detail}`
      : `El concepto clave de esta unidad es ${c1}.`,
  };

  const extraQ2: QuizQuestion = {
    id: `${unit.id}-ext-q3`,
    question: `En relación con el caso práctico de "${unit.title}", ¿qué conclusión o ejemplo es verdadero?`,
    options: [
      'Los conceptos teóricos de esta unidad no tienen ninguna aplicación real',
      unit.practicalExample,
      s2 ? `Lo contrario de ${s2.heading}` : 'Ninguna de las opciones es aplicable',
    ],
    correctIndex: 1,
    explanation: `Aplicación práctica verificada: ${unit.practicalExample}`,
  };

  return [...existing, extraQ1, extraQ2];
}

// ============================================================================
// 3. TAREAS POR MICRO-PASOS PRE-CARGADAS PARA TODOS LOS CURSOS (1º ESO A 2º BACH)
// ============================================================================
export const COURSE_DEFAULT_TASKS: SchoolTask[] = [
  // --- 1º ESO ---
  {
    id: 'task-1eso-mat-1',
    title: 'Ejercicios de Operaciones Combinadas y Problemas de m.c.m. (Tema 1 y 2)',
    subject: 'Matemáticas',
    course: '1ESO',
    dueDate: 'Jueves de esta semana',
    dueTime: '14:00',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 30,
    rewardStudyPoints: 150,
    teacherTip: 'Aplica la técnica del Semáforo: rodea primero los paréntesis en verde, subraya multiplicaciones en ámbar y deja sumas y restas para el final.',
    microSteps: [
      { id: 't1m-s1', title: 'Preparar libreta, escribir fecha y rodear con color los paréntesis de las 4 operaciones', durationMin: 5, completed: false },
      { id: 't1m-s2', title: 'Resolver las primeras 2 operaciones combinadas paso a paso en columna vertical', durationMin: 10, completed: false },
      { id: 't1m-s3', title: 'Descomponer en factores primos y hallar el m.c.m. del problema de los autobuses', durationMin: 10, completed: false },
      { id: 't1m-s4', title: 'Revisar signos, hacer foto nítida y subir entrega a Aules GVA', durationMin: 5, completed: false },
    ],
  },
  {
    id: 'task-1eso-bio-1',
    title: 'Dibujo y Esquema Comparativo: Célula Eucariota Animal vs Vegetal',
    subject: 'Biología y Geología',
    course: '1ESO',
    dueDate: 'Viernes de esta semana',
    dueTime: '11:30',
    priority: 'MEDIA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 25,
    rewardStudyPoints: 140,
    teacherTip: 'Destaca con color verde los 3 elementos exclusivos de la célula vegetal: Pared celular rígida, Cloroplastos y gran Vacuola central.',
    microSteps: [
      { id: 't1b-s1', title: 'Dibujar el contorno hexagonal de la célula vegetal y redondeado de la animal', durationMin: 8, completed: false },
      { id: 't1b-s2', title: 'Colorear y etiquetar Núcleo, Mitocondrias, Cloroplastos y Vacuola con flechas limpias', durationMin: 10, completed: false },
      { id: 't1b-s3', title: 'Responder las 3 preguntas cortas de autoevaluación de la Unidad 1', durationMin: 7, completed: false },
    ],
  },
  {
    id: 'task-1eso-geh-1',
    title: 'Eje Cronológico y Ficha Visual: Del Paleolítico a la Revolución Neolítica',
    subject: 'Geografía e Historia',
    course: '1ESO',
    dueDate: 'Lunes próximo',
    dueTime: '09:00',
    priority: 'MEDIA',
    sourcePlatform: 'Google Classroom',
    studyDurationMin: 25,
    rewardStudyPoints: 135,
    teacherTip: 'No copies párrafos largos del libro: usa una tabla de dos columnas (Modo de vida / Herramientas) para comparar Paleolítico y Neolítico.',
    microSteps: [
      { id: 't1g-s1', title: 'Trazar con regla la línea del tiempo (Paleolítico, Neolítico y Edad de los Metales)', durationMin: 8, completed: false },
      { id: 't1g-s2', title: 'Completar la tabla comparativa: Nómadas depredadores vs Sedentarios agricultores', durationMin: 10, completed: false },
      { id: 't1g-s3', title: 'Añadir un ejemplo de Arte Rupestre Levantino en la Comunitat Valenciana', durationMin: 7, completed: false },
    ],
  },
  {
    id: 'task-1eso-lcl-1',
    title: 'Práctica de Acentuación (Agudas, Llanas y Esdrújulas) y Lectura Narrativa',
    subject: 'Lengua Castellana y Literatura',
    course: '1ESO',
    dueDate: 'Martes próximo',
    dueTime: '12:00',
    priority: 'MEDIA',
    sourcePlatform: 'Ítaca Web Familia',
    studyDurationMin: 20,
    rewardStudyPoints: 120,
    teacherTip: 'Rodea siempre primero la sílaba tónica de cada palabra antes de pensar si lleva tilde o no.',
    microSteps: [
      { id: 't1l-s1', title: 'Rodear la sílaba tónica en las 15 palabras de la ficha y clasificarlas en 3 columnas', durationMin: 10, completed: false },
      { id: 't1l-s2', title: 'Colocar las tildes aplicando la regla N, S o Vocal y redactar 5 líneas de resumen del cuento', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-1eso-val-1',
    title: 'Fitxa d’Accentuació Oberta/Tancada i Lectura de les Rondalles Valencianes',
    subject: 'Valencià: Llengua i Literatura',
    course: '1ESO',
    dueDate: 'Miércoles próximo',
    dueTime: '10:00',
    priority: 'BAJA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 20,
    rewardStudyPoints: 120,
    teacherTip: 'Recorda el truc visual: la A sempre porta accent obert (à) i la I / U sempre porten accent tancat (í, ú).',
    microSteps: [
      { id: 't1v-s1', title: 'Classificar les 12 paraules en agudes (E-S-I-N), planes i esdrúixoles', durationMin: 10, completed: false },
      { id: 't1v-s2', title: 'Llegir la rondalla d’Enric Valor i identificar plantejament, nus i desenllaç', durationMin: 10, completed: false },
    ],
  },

  // --- 2º ESO ---
  {
    id: 'task-2eso-fyq-1',
    title: 'Boletín de Factores de Conversión, Leyes de los Gases y Tabla de Átomos (Z y A)',
    subject: 'Física y Química (2º ESO)',
    course: '2ESO',
    dueDate: 'Jueves de esta semana',
    dueTime: '13:00',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 30,
    rewardStudyPoints: 165,
    teacherTip: 'En las leyes de los gases (Boyle y Charles), el Paso 0 obligatorio es sumar +273 a los grados Celsius para pasarlos a Kelvin.',
    microSteps: [
      { id: 't2f-s1', title: 'Pasar 4 velocidades de km/h a m/s usando factores de conversión (dividir entre 3,6)', durationMin: 8, completed: false },
      { id: 't2f-s2', title: 'Resolver 2 problemas de la Ley de Boyle (P1·V1 = P2·V2) pasando antes T a Kelvin', durationMin: 12, completed: false },
      { id: 't2f-s3', title: 'Completar el cuadro de Protones, Neutrones (N = A - Z) y Electrones de 5 elementos', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-2eso-mat-1',
    title: 'Práctica de Identidades Notables, Ecuaciones de 2º Grado y Teorema de Pitágoras',
    subject: 'Matemáticas (2º ESO)',
    course: '2ESO',
    dueDate: 'Viernes de esta semana',
    dueTime: '10:30',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 35,
    rewardStudyPoints: 175,
    teacherTip: 'Antes de aplicar la fórmula de 2º grado, apunta en una esquina los valores de a, b y c rodeando su signo (+ o -).',
    microSteps: [
      { id: 't2m-s1', title: 'Desarrollar 3 identidades notables sin olvidar el doble producto central (+2ab)', durationMin: 10, completed: false },
      { id: 't2m-s2', title: 'Resolver 2 ecuaciones completas de 2º grado aplicando x = [-b ± √(b²-4ac)] / 2a', durationMin: 15, completed: false },
      { id: 't2m-s3', title: 'Dibujar el triángulo rectángulo y calcular la hipotenusa por Pitágoras (h² = c1² + c2²)', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-2eso-geh-1',
    title: 'Dossier Visual: La Europa Feudal, Jaume I (1238) y Comparativa Románico vs Gótico',
    subject: 'Geografía e Historia (2º ESO)',
    course: '2ESO',
    dueDate: 'Lunes próximo',
    dueTime: '11:00',
    priority: 'MEDIA',
    sourcePlatform: 'Google Classroom',
    studyDurationMin: 25,
    rewardStudyPoints: 145,
    teacherTip: 'Dibuja al lado de cada estilo su arco característico: semicircular (medio punto) en el Románico y apuntado (ojival) en el Gótico.',
    microSteps: [
      { id: 't2g-s1', title: 'Dibujar la pirámide estamental feudal (Privilegiados vs No Privilegiados)', durationMin: 8, completed: false },
      { id: 't2g-s2', title: 'Completar tabla de 4 diferencias entre una iglesia románica y una catedral gótica', durationMin: 10, completed: false },
      { id: 't2g-s3', title: 'Resumir en 5 puntos la conquista de Valencia por Jaume I (1238) y los Furs', durationMin: 7, completed: false },
    ],
  },
  {
    id: 'task-2eso-lcl-1',
    title: 'Análisis Sintáctico de 6 Oraciones Simples (Sujeto, Atributo, CD, CI y CC)',
    subject: 'Lengua Castellana y Literatura (2º ESO)',
    course: '2ESO',
    dueDate: 'Martes próximo',
    dueTime: '09:00',
    priority: 'MEDIA',
    sourcePlatform: 'Ítaca Web Familia',
    studyDurationMin: 25,
    rewardStudyPoints: 140,
    teacherTip: 'Haz siempre primero la prueba de la concordancia cambiando el verbo a plural para no confundir nunca el Sujeto con el CD o el CI.',
    microSteps: [
      { id: 't2l-s1', title: 'Subrayar los verbos de las 6 oraciones y separar Sujeto y Predicado con la prueba del plural', durationMin: 10, completed: false },
      { id: 't2l-s2', title: 'Identificar CD (sustituir por LO/LA) y CI (sustituir por LE/LES) en las primeras 4 oraciones', durationMin: 10, completed: false },
      { id: 't2l-s3', title: 'Marcar el Atributo en las 2 oraciones copulativas (ser, estar, parecer)', durationMin: 5, completed: false },
    ],
  },

  // --- 3º ESO ---
  {
    id: 'task-3eso-bio-1',
    title: 'Informe de Laboratorio y Esquema: El Corazón, la Doble Circulación y el Aparato Digestivo',
    subject: 'Biología y Geología (3º ESO · Cuerpo Humano)',
    course: '3ESO',
    dueDate: 'Jueves de esta semana',
    dueTime: '12:30',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 30,
    rewardStudyPoints: 165,
    teacherTip: 'Usa colores azul (sangre con CO2 por el lado derecho del corazón) y rojo (sangre con O2 por el lado izquierdo del corazón).',
    microSteps: [
      { id: 't3b-s1', title: 'Etiquetar las 4 cavidades del corazón (Aurículas entran Venas / Ventrículos salen Arterias)', durationMin: 10, completed: false },
      { id: 't3b-s2', title: 'Trazar el recorrido del Bolo alimenticio → Quimo (estómago) → Quilo (intestino delgado)', durationMin: 10, completed: false },
      { id: 't3b-s3', title: 'Explicar en 4 líneas la diferencia entre un acto voluntario (cerebro) y un acto reflejo (médula)', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-3eso-fyq-1',
    title: 'Práctica de Formulación Inorgánica IUPAC, Enlace Químico y Cálculo de Moles',
    subject: 'Física y Química (3º ESO)',
    course: '3ESO',
    dueDate: 'Viernes de esta semana',
    dueTime: '11:00',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 35,
    rewardStudyPoints: 180,
    teacherTip: 'Para saber el tipo de enlace mira siempre la Tabla Periódica: Metal + No Metal = Iónico; No Metal + No Metal = Covalente.',
    microSteps: [
      { id: 't3f-s1', title: 'Nombrar y formular los 10 óxidos, hidruros e hidróxidos de la hoja con prefijos y números romanos', durationMin: 12, completed: false },
      { id: 't3f-s2', title: 'Clasificar 4 sustancias en iónicas, covalentes o metálicas y justificar si conducen la corriente', durationMin: 10, completed: false },
      { id: 't3f-s3', title: 'Calcular la Masa Molar y el número de moles (n = m / M) en los 2 ejercicios finales', durationMin: 13, completed: false },
    ],
  },
  {
    id: 'task-3eso-mat-1',
    title: 'Ejercicios de Progresiones (PA y PG), Regla de Ruffini y Sistemas de Ecuaciones',
    subject: 'Matemáticas (3º ESO)',
    course: '3ESO',
    dueDate: 'Lunes próximo',
    dueTime: '10:00',
    priority: 'MEDIA',
    sourcePlatform: 'Google Classroom',
    studyDurationMin: 30,
    rewardStudyPoints: 165,
    teacherTip: 'En la caja de Ruffini revisa dos cosas antes de empezar: cambiar el signo del divisor y poner un 0 si falta algún grado en el polinomio.',
    microSteps: [
      { id: 't3m-s1', title: 'Hallar el término general an y la suma de los 10 primeros términos de la Progresión Aritmética', durationMin: 10, completed: false },
      { id: 't3m-s2', title: 'Factorizar 2 polinomios de grado 3 utilizando la caja de Ruffini y el Teorema del Resto', durationMin: 12, completed: false },
      { id: 't3m-s3', title: 'Resolver el sistema de ecuaciones por Reducción y comprobar la solución', durationMin: 8, completed: false },
    ],
  },
  {
    id: 'task-3eso-val-1',
    title: 'Exercicis de Combinació Binària de Pronoms Febles i Lectura de Ramon Llull / Ausiàs March',
    subject: 'Valencià: Llengua i Literatura (3º ESO)',
    course: '3ESO',
    dueDate: 'Martes próximo',
    dueTime: '13:00',
    priority: 'MEDIA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 25,
    rewardStudyPoints: 145,
    teacherTip: 'Recorda sempre l’ordre en combinar dos pronoms: primer la persona (CI: li, els) i després la cosa (CD: el, la, ho, en).',
    microSteps: [
      { id: 't3v-s1', title: 'Subratllar el CD i el CI en les 8 oracions de la fitxa abans de substituir-los', durationMin: 10, completed: false },
      { id: 't3v-s2', title: 'Realitzar la combinació pronominal (li’l, li la, els ho, se’n) cuidant guionets i apòstrofs', durationMin: 15, completed: false },
    ],
  },

  // --- 4º ESO ---
  {
    id: 'task-4eso-mat-1',
    title: 'Problemas de Trigonometría (SOH-CAH-TOA), Propiedades de Logaritmos y Vectores',
    subject: 'Matemáticas (4º ESO)',
    course: '4ESO',
    dueDate: 'Jueves de esta semana',
    dueTime: '09:30',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 35,
    rewardStudyPoints: 185,
    teacherTip: 'Dibuja siempre el triángulo rectángulo del problema de trigonometría y marca cuál es el cateto Opuesto y cuál el Contiguo al ángulo.',
    microSteps: [
      { id: 't4m-s1', title: 'Aplicar las 3 propiedades de los logaritmos (suma, resta y exponente) en los 4 ejercicios', durationMin: 12, completed: false },
      { id: 't4m-s2', title: 'Dibujar el esquema y calcular la altura del edificio usando la tangente (tan α = Opuesto / Contiguo)', durationMin: 13, completed: false },
      { id: 't4m-s3', title: 'Hallar el vector director AB = B - A y escribir la ecuación continua y explícita de la recta', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-4eso-fyq-1',
    title: 'Problemas de Dinámica (2ª Ley de Newton con Rozamiento), Energía Mecánica y Química Orgánica',
    subject: 'Física y Química (4º ESO · Dinámica, Energía y Química del Carbono)',
    course: '4ESO',
    dueDate: 'Viernes de esta semana',
    dueTime: '12:00',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 35,
    rewardStudyPoints: 185,
    teacherTip: 'No empieces un problema de fuerzas sin dibujar antes el diagrama de cuerpo libre con las 4 flechas: Peso, Normal, Fuerza motor y Rozamiento.',
    microSteps: [
      { id: 't4f-s1', title: 'Dibujar las fuerzas sobre el bloque y aplicar ΣF = m · a para hallar la aceleración', durationMin: 12, completed: false },
      { id: 't4f-s2', title: 'Aplicar la conservación de la Energía Mecánica (Ec1 + Ep1 = Ec2 + Ep2) en el problema de la montaña rusa', durationMin: 13, completed: false },
      { id: 't4f-s3', title: 'Formular y nombrar los 8 hidrocarburos, alcoholes y ácidos carboxílicos de la ficha', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-4eso-geh-1',
    title: 'Síntesis Comparativa: Revolución Francesa (1789), Guerras Mundiales y Guerra Fría',
    subject: 'Geografía e Historia (4º ESO · Historia Contemporánea)',
    course: '4ESO',
    dueDate: 'Lunes próximo',
    dueTime: '11:30',
    priority: 'MEDIA',
    sourcePlatform: 'Google Classroom',
    studyDurationMin: 30,
    rewardStudyPoints: 160,
    teacherTip: 'Organiza cada conflicto histórico con la plantilla C-D-C: 3 Causas → Desarrollo en 3 etapas → 3 Consecuencias.',
    microSteps: [
      { id: 't4g-s1', title: 'Esquematizar las ideas de la Ilustración (Montesquieu, Rousseau) frente al Antiguo Régimen', durationMin: 10, completed: false },
      { id: 't4g-s2', title: 'Completar el cuadro de alianzas y consecuencias de la I y II Guerra Mundial', durationMin: 10, completed: false },
      { id: 't4g-s3', title: 'Explicar en 6 líneas los dos bloques de la Guerra Fría (EE. UU. vs URSS) y la caída del Muro (1989)', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-4eso-bio-1',
    title: 'Problemas de Genética Mendeliana (Cuadros de Punnett) y Transcripción ADN → ARNm',
    subject: 'Biología y Geología (4º ESO · Genética, Evolución y Tectónica)',
    course: '4ESO',
    dueDate: 'Martes próximo',
    dueTime: '10:30',
    priority: 'MEDIA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 25,
    rewardStudyPoints: 155,
    teacherTip: 'Al pasar de ADN a ARN mensajero recuerda que en el ARN NO existe la Timina (T): la Adenina se empareja siempre con Uracilo (A → U).',
    microSteps: [
      { id: 't4b-s1', title: 'Realizar la replicación, transcripción a ARNm y traducción con el código genético de la secuencia dada', durationMin: 12, completed: false },
      { id: 't4b-s2', title: 'Dibujar los cuadros de Punnett de los 2 problemas de Mendel indicando % de Genotipos y Fenotipos', durationMin: 13, completed: false },
    ],
  },

  // --- 1º BACHILLERATO ---
  {
    id: 'task-1bach-mat-1',
    title: 'Estudio Completo de Derivadas, Recta Tangente y Optimización de Funciones',
    subject: 'Matemáticas I / CCSS I (1º Bachillerato)',
    course: '1BACH',
    dueDate: 'Jueves de esta semana',
    dueTime: '14:00',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 40,
    rewardStudyPoints: 210,
    teacherTip: 'Cuando derives un cociente (u/v) o uses la regla de la cadena, pon siempre paréntesis alrededor de cada derivada para evitar fallos de signo.',
    microSteps: [
      { id: 't1bm-s1', title: 'Derivar y simplificar las 5 funciones compuestas aplicando la regla del producto, cociente y cadena', durationMin: 15, completed: false },
      { id: 't1bm-s2', title: 'Igualar f’(x) = 0 para hallar los puntos críticos y estudiar intervalos de crecimiento y máximos/mínimos', durationMin: 15, completed: false },
      { id: 't1bm-s3', title: 'Calcular la ecuación de la recta tangente y - f(a) = f’(a)·(x - a) en el punto pedido', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-1bach-fil-1',
    title: 'Disertación Filosófica: Racionalismo (Descartes) vs Empirismo (Hume) y Ética de Kant',
    subject: 'Filosofía (1º Bachillerato)',
    course: '1BACH',
    dueDate: 'Viernes de esta semana',
    dueTime: '11:00',
    priority: 'MEDIA',
    sourcePlatform: 'Google Classroom',
    studyDurationMin: 30,
    rewardStudyPoints: 175,
    teacherTip: 'Estructura tu disertación en 4 párrafos claros: 1. Pregunta inicial, 2. Postura A (Aristóteles/Descartes), 3. Postura B (Kant/Hume), 4. Conclusión personal razonada.',
    microSteps: [
      { id: 't1bf-s1', title: 'Hacer esquema comparativo entre ideas innatas (Descartes) e impresiones sensibles (Hume)', durationMin: 10, completed: false },
      { id: 't1bf-s2', title: 'Explicar la diferencia entre la ética eudemonista de Aristóteles (felicidad) y el deber formal de Kant', durationMin: 10, completed: false },
      { id: 't1bf-s3', title: 'Redactar la conclusión relacionando el Imperativo Categórico con un dilema ético actual', durationMin: 10, completed: false },
    ],
  },
  {
    id: 'task-1bach-lcl-1',
    title: 'Análisis Morfológico (Parasintéticas) y Clasificación de los 7 Valores del SE',
    subject: 'Lengua Castellana y Literatura I (1º Bachillerato)',
    course: '1BACH',
    dueDate: 'Lunes próximo',
    dueTime: '09:00',
    priority: 'MEDIA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 30,
    rewardStudyPoints: 170,
    teacherTip: 'Para distinguir SE Impersonal de SE Pasiva Refleja, intenta cambiar el sustantivo a plural: si el verbo cambia a plural, es Pasiva Refleja.',
    microSteps: [
      { id: 't1bl-s1', title: 'Segmentar en raíz, prefijos y sufijos las 8 palabras e indicar si son derivadas o parasintéticas', durationMin: 15, completed: false },
      { id: 't1bl-s2', title: 'Identificar y justificar el valor exacto del SE en las 6 oraciones de la ficha', durationMin: 15, completed: false },
    ],
  },
  {
    id: 'task-1bach-fyq-1',
    title: 'Problemas de Reactivo Limitante, Termoquímica (Ley de Hess) y Tiro Parabólico',
    subject: 'Física y Química / Biología (1º Bachillerato)',
    course: '1BACH',
    dueDate: 'Martes próximo',
    dueTime: '12:30',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 35,
    rewardStudyPoints: 190,
    teacherTip: 'En el tiro parabólico nunca mezcles los datos del eje X (MRU, velocidad constante) con los del eje Y (MRUA con gravedad -9,8 m/s²).',
    microSteps: [
      { id: 't1bc-s1', title: 'Ajustar la reacción, pasar masas a moles y determinar cuál de los dos reactivos se agota antes (limitante)', durationMin: 12, completed: false },
      { id: 't1bc-s2', title: 'Calcular la entalpía de reacción ΔH aplicando la Ley de Hess e indicar si es exotérmica o endotérmica', durationMin: 11, completed: false },
      { id: 't1bc-s3', title: 'Descomponer la velocidad inicial (v0x, v0y) y hallar la altura máxima y el alcance del proyectil', durationMin: 12, completed: false },
    ],
  },

  // --- 2º BACHILLERATO (PAU / EBAU) ---
  {
    id: 'task-2bach-mat-1',
    title: 'Simulacro Oficial PAU Matemáticas: Discusión Rouché-Frobenius, Área por Barrow y Bayes',
    subject: 'Matemáticas II / CCSS II (2º Bachillerato · PAU)',
    course: '2BACH',
    dueDate: 'Jueves de esta semana',
    dueTime: '13:30',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 45,
    rewardStudyPoints: 240,
    teacherTip: 'En el problema PAU de sistemas con parámetro k, redacta siempre la conclusión citando explícitamente el Teorema de Rouché-Frobenius para asegurar la máxima nota.',
    microSteps: [
      { id: 't2bm-s1', title: 'Igualar |A| = 0 para hallar los valores críticos de k y discutir los 3 casos por Rouché-Frobenius', durationMin: 15, completed: false },
      { id: 't2bm-s2', title: 'Hallar los puntos de corte f(x) = g(x) y calcular el área encerrada aplicando la Regla de Barrow', durationMin: 15, completed: false },
      { id: 't2bm-s3', title: 'Dibujar el diagrama de árbol y calcular la probabilidad total y condicionada (Teorema de Bayes)', durationMin: 15, completed: false },
    ],
  },
  {
    id: 'task-2bach-his-1',
    title: 'Comentario de Fuente Histórica PAU: La Restauración (1875) y Etapas del Franquismo (1939-1975)',
    subject: 'Historia de España (2º Bachillerato · PAU)',
    course: '2BACH',
    dueDate: 'Viernes de esta semana',
    dueTime: '11:00',
    priority: 'ALTA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 40,
    rewardStudyPoints: 220,
    teacherTip: 'Recuerda tu adaptación de tiempo (+25% en la PAU): dedica los primeros 5 minutos a subrayar las ideas de los dos textos y hacer un guion de fechas clave en el borrador.',
    microSteps: [
      { id: 't2bh-s1', title: 'Clasificar los dos documentos históricos (naturaleza, fecha, autor, destinatario e idea principal)', durationMin: 10, completed: false },
      { id: 't2bh-s2', title: 'Desarrollar el contexto histórico comparando la Autarquía (1939-1959) y el Plan de Estabilización (1959)', durationMin: 18, completed: false },
      { id: 't2bh-s3', title: 'Repasar la tabla de las 7 Constituciones españolas (1812 a 1978) para la pregunta transversal', durationMin: 12, completed: false },
    ],
  },
  {
    id: 'task-2bach-lcl-1',
    title: 'Simulacro PAU Lengua: Resumen, Tema, Estructura, Modalización, Pares Mínimos y Lorca',
    subject: 'Lengua Castellana y Literatura II (2º Bachillerato · PAU)',
    course: '2BACH',
    dueDate: 'Lunes próximo',
    dueTime: '10:00',
    priority: 'ALTA',
    sourcePlatform: 'Google Classroom',
    studyDurationMin: 40,
    rewardStudyPoints: 220,
    teacherTip: 'Formula el TEMA en una sola frase nominal sin verbo conjugado (ej. "Crítica de la precariedad juvenil ante...") y nunca superes las 6-7 líneas en el Resumen.',
    microSteps: [
      { id: 't2bl-s1', title: 'Redactar el Resumen (máx. 7 líneas) y el Tema (1 línea nominal) y dividir la estructura en 3 partes', durationMin: 15, completed: false },
      { id: 't2bl-s2', title: 'Redactar la pregunta de Modalización citando entre comillas ejemplos de deixis y léxico valorativo', durationMin: 12, completed: false },
      { id: 't2bl-s3', title: 'Resolver el Par Mínimo de sintaxis inversa y repasar el conflicto Autoridad vs Libertad en Bernarda Alba', durationMin: 13, completed: false },
    ],
  },
  {
    id: 'task-2bach-val-1',
    title: 'Simulacre PAU Valencià: Anàlisi Lingüística (Pronoms i Sintaxi) i Literatura (Rodoreda i Estellés)',
    subject: 'Valencià: Llengua i Literatura II (2º Bachillerato · PAU)',
    course: '2BACH',
    dueDate: 'Martes próximo',
    dueTime: '12:00',
    priority: 'MEDIA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 35,
    rewardStudyPoints: 200,
    teacherTip: 'En la pregunta de Literatura de la PAU, situa sempre l’obra dins del context històric (postguerra) i comenta 2 símbols concrets del fragment.',
    microSteps: [
      { id: 't2bv-s1', title: 'Resoldre les preguntes de significat contextual, pronoms febles i sintaxi del model PAU', durationMin: 12, completed: false },
      { id: 't2bv-s2', title: 'Redactar en 90 paraules la resposta sobre La plaça del Diamant (Rodoreda) i Llibre de meravelles (Estellés)', durationMin: 12, completed: false },
      { id: 't2bv-s3', title: 'Escriure el text argumentatiu de 150 paraules utilitzant 4 paràgrafs i connectors formals', durationMin: 11, completed: false },
    ],
  },
  {
    id: 'task-2bach-ing-1',
    title: 'PAU English Mock Exam: Reading Quotes, Rephrasing & 140-Word Opinion Essay',
    subject: 'Inglés II · English (2º Bachillerato · PAU / EBAU)',
    course: '2BACH',
    dueDate: 'Miércoles próximo',
    dueTime: '09:30',
    priority: 'MEDIA',
    sourcePlatform: 'Aules GVA',
    studyDurationMin: 35,
    rewardStudyPoints: 200,
    teacherTip: 'Reserva siempre los últimos 5 minutos para el "Checklist Anti-Errores PAU": 1. -S en 3ª persona, 2. Adjetivos sin plural, 3. Conectores seguidos de coma.',
    microSteps: [
      { id: 't2bi-s1', title: 'Responder las preguntas True/False copiando entre comillas la frase exacta del texto', durationMin: 10, completed: false },
      { id: 't2bi-s2', title: 'Completar las 4 frases de Rephrasing (Passive, Conditional, Reported Speech, Despite)', durationMin: 10, completed: false },
      { id: 't2bi-s3', title: 'Escribir el Opinion Essay en 4 párrafos (Introduction, Argument 1, Contrast, Conclusion)', durationMin: 15, completed: false },
    ],
  },
];

// ============================================================================
// 4. PLANTILLAS RÁPIDAS DE TAREAS Y PLANES DE EXAMEN (PARA AÑADIR EN 1 CLIC)
// ============================================================================
export interface QuickTaskTemplate {
  id: string;
  label: string;
  category: 'EXAMEN' | 'DEBERES' | 'REDACCIÓN' | 'PROYECTO';
  studyDurationMin: number;
  rewardStudyPoints: number;
  teacherTip: string;
  steps: { title: string; durationMin: number }[];
}

export const QUICK_TASK_TEMPLATES: QuickTaskTemplate[] = [
  {
    id: 'tpl-exam-3days',
    label: 'Plan de Choque: Preparar Examen en 4 Micro-Pasos',
    category: 'EXAMEN',
    studyDurationMin: 40,
    rewardStudyPoints: 200,
    teacherTip: 'Nunca estudies releyendo en silencio: usa colores para el esquema, explica el tema en voz alta con el micrófono y termina siempre con un test.',
    steps: [
      { title: 'Fase 1 (Mapa Visual): Reunir apuntes y hacer un esquema de 1 sola cara con las ideas clave', durationMin: 10 },
      { title: 'Fase 2 ( Comprensión): Explicar en voz alta los 3 apartados más importantes (Técnica Feynman)', durationMin: 10 },
      { title: 'Fase 3 (Práctica): Resolver sin mirar el libro 3 ejercicios o preguntas tipo examen', durationMin: 12 },
      { title: 'Fase 4 (Autoevaluación): Hacer el test de la unidad en ClotFocus y repasar fallos', durationMin: 8 },
    ],
  },
  {
    id: 'tpl-math-sheet',
    label: 'Hoja de Problemas de Ciencias (Matemáticas / Física y Química)',
    category: 'DEBERES',
    studyDurationMin: 30,
    rewardStudyPoints: 160,
    teacherTip: 'Antes de usar la calculadora, escribe siempre Datos, Fórmula y Unidades en el margen izquierdo.',
    steps: [
      { title: 'Subrayar los datos numéricos y rodear la pregunta de cada problema antes de calcular', durationMin: 6 },
      { title: 'Escribir la fórmula correspondiente y comprobar que todas las unidades están en el SI', durationMin: 8 },
      { title: 'Resolver los cálculos paso a paso en orden vertical sin saltarse líneas', durationMin: 10 },
      { title: 'Recuadrar la solución final con sus unidades y revisar signos (+ / -)', durationMin: 6 },
    ],
  },
  {
    id: 'tpl-essay-writing',
    label: 'Redacción / Comentario de Texto / Writing en 4 Fases',
    category: 'REDACCIÓN',
    studyDurationMin: 25,
    rewardStudyPoints: 145,
    teacherTip: 'El bloqueo ante el papel en blanco desaparece cuando escribes primero 3 palabras clave por párrafo antes de redactar frases completas.',
    steps: [
      { title: 'Lluvia de ideas en borrador: anotar 3 argumentos y 4 conectores que vas a utilizar', durationMin: 5 },
      { title: 'Redactar el Párrafo 1 (Introducción del tema) y Párrafo 2 (Desarrollo principal)', durationMin: 8 },
      { title: 'Redactar el Párrafo 3 (Ejemplo o contraste) y Párrafo 4 (Conclusión final)', durationMin: 7 },
      { title: 'Lectura de revisión en voz baja: comprobar tildes, puntuación y vocabulario', durationMin: 5 },
    ],
  },
  {
    id: 'tpl-aules-project',
    label: 'Entrega de Trabajo o Práctica Digital en Aules GVA / Classroom',
    category: 'PROYECTO',
    studyDurationMin: 30,
    rewardStudyPoints: 155,
    teacherTip: 'Muchos alumnos con TDAH hacen el trabajo pero olvidan pulsar el botón final "Enviar tarea" en Aules. El Paso 4 asegura tu nota.',
    steps: [
      { title: 'Leer la rúbrica del profesor en Aules GVA y crear el documento con portada e índice', durationMin: 7 },
      { title: 'Completar el contenido principal de los apartados con imágenes o esquemas claros', durationMin: 13 },
      { title: 'Exportar a PDF con nombre limpio (Apellido_Nombre_Asignatura.pdf)', durationMin: 5 },
      { title: 'Subir el archivo a Aules GVA / Classroom y verificar que pone "Enviado para calificar"', durationMin: 5 },
    ],
  },
];

// ============================================================================
// 5. AMPLIACIÓN MASIVA DE FLASHCARDS POR CURSO (MÁS DE 60 TARJETAS NUEVAS)
// ============================================================================
export const EXTRA_FLASHCARDS_BY_COURSE: FlashcardItem[] = [
  // --- 1º ESO EXTRA FLASHCARDS ---
  {
    id: 'fc-1eso-ext-1',
    course: '1ESO',
    subject: 'Biología y Geología',
    question: '¿Cuáles son los 3 elementos exclusivos de la célula eucariota vegetal que NO tiene la célula animal?',
    answer: '1. Pared celular rígida de celulosa, 2. Cloroplastos (para la fotosíntesis) y 3. Una gran vacuola central.',
    mnemonicHint: 'P-C-V: Pared, Cloroplastos y Vacuola gigante.',
    mastered: false,
  },
  {
    id: 'fc-1eso-ext-2',
    course: '1ESO',
    subject: 'Biología y Geología',
    question: '¿Qué diferencia hay entre la savia bruta y la savia elaborada en las plantas?',
    answer: 'La savia bruta (agua y sales minerales) sube desde la raíz por el Xilema; la savia elaborada (azúcares de la fotosíntesis) se reparte desde las hojas por el Floema.',
    mnemonicHint: 'Bruta sube por Xilema; Elaborada viaja por Floema.',
    mastered: false,
  },
  {
    id: 'fc-1eso-ext-3',
    course: '1ESO',
    subject: 'Matemáticas',
    question: '¿Cuál es el orden obligatorio del Semáforo en una operación combinada?',
    answer: '1º Paréntesis y corchetes, 2º Potencias y raíces, 3º Multiplicaciones y divisiones (de izquierda a derecha), 4º Sumas y restas.',
    mnemonicHint: 'Nunca sumes ni restes antes de haber hecho las multiplicaciones y divisiones.',
    mastered: false,
  },
  {
    id: 'fc-1eso-ext-4',
    course: '1ESO',
    subject: 'Matemáticas',
    question: '¿Cómo se dividen dos fracciones como (a/b) : (c/d)?',
    answer: 'Multiplicando en cruz (caramelo): (a · d) arriba en el numerador y (b · c) abajo en el denominador.',
    mnemonicHint: 'Multiplicar = En línea | Dividir = En cruz (rebote).',
    mastered: false,
  },
  {
    id: 'fc-1eso-ext-5',
    course: '1ESO',
    subject: 'Geografía e Historia',
    question: '¿Qué invención hacia el año 3500 a.C. en Mesopotamia y Egipto marca el paso de la Prehistoria a la Historia (Edad Antigua)?',
    answer: 'La invención de la escritura (cuneiforme en Mesopotamia y jeroglífica en Egipto).',
    mnemonicHint: 'Sin documentos escritos = Prehistoria | Con escritura = Historia.',
    mastered: false,
  },
  {
    id: 'fc-1eso-ext-6',
    course: '1ESO',
    subject: 'Tecnología y Digitalización',
    question: '¿Cuáles son las 3 vistas principales para representar un objeto en dibujo técnico?',
    answer: 'Alzado (vista de frente), Planta (vista desde arriba, se dibuja debajo del alzado) y Perfil (vista lateral).',
    mnemonicHint: 'Alzado = Frente | Planta = Desde arriba | Perfil = De lado.',
    mastered: false,
  },

  // --- 2º ESO EXTRA FLASHCARDS ---
  {
    id: 'fc-2eso-ext-1',
    course: '2ESO',
    subject: 'Física y Química (2º ESO)',
    question: '¿Cómo se calcula el número de neutrones (N) de un átomo conociendo su número atómico (Z) y su número másico (A)?',
    answer: 'Restando N = A - Z (Número másico menos Número de protones).',
    mnemonicHint: 'A es el total del núcleo (Protones + Neutrones), así que N = A - Z.',
    mastered: false,
  },
  {
    id: 'fc-2eso-ext-2',
    course: '2ESO',
    subject: 'Matemáticas (2º ESO)',
    question: '¿Qué dice el Teorema de Pitágoras en todo triángulo rectángulo?',
    answer: 'El cuadrado de la hipotenusa es igual a la suma de los cuadrados de los dos catetos: h² = c1² + c2².',
    mnemonicHint: 'Hipotenusa (el lado más largo frente al ángulo recto) = Suma; Cateto = Resta.',
    mastered: false,
  },
  {
    id: 'fc-2eso-ext-3',
    course: '2ESO',
    subject: 'Geografía e Historia (2º ESO)',
    question: '¿Cómo distinguimos visualmente una iglesia Románica de una catedral Gótica?',
    answer: 'El Románico usa arco de medio punto (semicircular) y muros gruesos con poca luz; el Gótico usa arco apuntado (ojival), bóveda de crucería y grandes vidrieras luminosas.',
    mnemonicHint: 'Románico = Redondo y robusto | Gótico = Alto, apuntado y luminoso.',
    mastered: false,
  },
  {
    id: 'fc-2eso-ext-4',
    course: '2ESO',
    subject: 'Valencià: Llengua i Literatura (2º ESO)',
    question: 'Com s’expressa l’obligació en valencià correctament sense dir mai *"tindre que"?',
    answer: 'Amb les perífrasis "haver de + infinitiu" (He d’estudiar) o "caldre + infinitiu / que + subjuntiu" (Cal estudiar).',
    mnemonicHint: 'Obligació en valencià = HAVER DE o CALDRE.',
    mastered: false,
  },
  {
    id: 'fc-2eso-ext-5',
    course: '2ESO',
    subject: 'Inglés · English (2º ESO)',
    question: 'En Past Continuous vs Past Simple, ¿qué tiempo verbal suele ir detrás de WHILE y cuál detrás de WHEN?',
    answer: 'Detrás de WHILE va Past Continuous (was/were + -ing, acción larga); detrás de WHEN va Past Simple (-ed / 2ª columna, acción corta que interrumpe).',
    mnemonicHint: 'WHILE + -ING (larga) | WHEN + Past Simple (corta).',
    mastered: false,
  },
  {
    id: 'fc-2eso-ext-6',
    course: '2ESO',
    subject: 'Tecnología y Digitalización (2º ESO)',
    question: '¿Qué establece la Ley de Ohm en un circuito eléctrico y cuáles son sus unidades?',
    answer: 'Voltaje (V, en Voltios) = Intensidad (I, en Amperios) · Resistencia (R, en Ohmios Ω).',
    mnemonicHint: 'Triángulo V arriba, I y R abajo: Victoria Reina de Inglaterra.',
    mastered: false,
  },

  // --- 3º ESO EXTRA FLASHCARDS ---
  {
    id: 'fc-3eso-ext-1',
    course: '3ESO',
    subject: 'Biología y Geología (3º ESO)',
    question: '¿Por qué los antibióticos solo sirven para curar infecciones por bacterias y NUNCA contra virus como la gripe?',
    answer: 'Porque los antibióticos atacan estructuras celulares bacterianas, y los virus son acelulares (no son células). Contra los virus nuestro cuerpo se previene con vacunas.',
    mnemonicHint: 'Antibiótico = Solo Bacterias | Virus = Vacunas.',
    mastered: false,
  },
  {
    id: 'fc-3eso-ext-2',
    course: '3ESO',
    subject: 'Física y Química (3º ESO)',
    question: '¿Cómo sabemos rápido si el enlace entre dos elementos es Iónico, Covalente o Metálico?',
    answer: 'Metal + No Metal = Enlace Iónico (ej. NaCl). No Metal + No Metal = Enlace Covalente (ej. H2O, CO2). Metal + Metal = Enlace Metálico.',
    mnemonicHint: 'M + NM = Iónico | NM + NM = Covalente (comparten electrones).',
    mastered: false,
  },
  {
    id: 'fc-3eso-ext-3',
    course: '3ESO',
    subject: 'Matemáticas (3º ESO)',
    question: '¿Cómo se calcula la coordenada X del vértice de cualquier parábola y = ax² + bx + c?',
    answer: 'Con la fórmula x_v = -b / (2a). Después se sustituye ese valor de x en la función para hallar la coordenada y_v.',
    mnemonicHint: 'Vértice de la parábola: menos b partido por el doble de a.',
    mastered: false,
  },
  {
    id: 'fc-3eso-ext-4',
    course: '3ESO',
    subject: 'Lengua Castellana (3º ESO)',
    question: '¿Qué diferencia hay entre el Mester de Juglaría y el Mester de Clerecía en la Edad Media?',
    answer: 'El Mester de Juglaría era oral, popular, anónimo y de métrica irregular (Mio Cid); el de Clerecía era escrito por clérigos cultos con estrofas fijas de cuaderna vía (Berceo).',
    mnemonicHint: 'Juglaría = Juglares orales | Clerecía = Clérigos cultos (cuaderna vía).',
    mastered: false,
  },
  {
    id: 'fc-3eso-ext-5',
    course: '3ESO',
    subject: 'Valencià (3º ESO)',
    question: 'En quin ordre es col·loquen sempre dos pronoms febles quan es combinen (CI + CD)?',
    answer: 'Primer va sempre el Complement Indirecte de persona (em, et, li, ens, vos, els) i després el Complement Directe de cosa (el, la, els, les, ho, en). Exemple: Dóna-li’l.',
    mnemonicHint: 'Primer la Persona (CI) + Després la Cosa (CD).',
    mastered: false,
  },
  {
    id: 'fc-3eso-ext-6',
    course: '3ESO',
    subject: 'Inglés (3º ESO)',
    question: '¿Cuál es la diferencia entre FOR y SINCE con el Present Perfect?',
    answer: 'FOR se usa con un periodo de duración ("for three hours", "for five years"); SINCE se usa con el momento exacto de inicio ("since Monday", "since 2021").',
    mnemonicHint: 'FOR = Duración (cuánto tiempo) | SINCE = Origen (desde cuándo).',
    mastered: false,
  },

  // --- 4º ESO EXTRA FLASHCARDS ---
  {
    id: 'fc-4eso-ext-1',
    course: '4ESO',
    subject: 'Biología y Geología (4º ESO)',
    question: '¿Cuál es la diferencia esencial entre la teoría evolutiva de Lamarck y la de Darwin?',
    answer: 'Lamarck decía que el uso crea el órgano y se hereda; Darwin demostró que nacen individuos con variaciones al azar y la Selección Natural favorece a los mejor adaptados.',
    mnemonicHint: 'Lamarck = Uso y caracteres adquiridos | Darwin = Variabilidad + Selección Natural.',
    mastered: false,
  },
  {
    id: 'fc-4eso-ext-2',
    course: '4ESO',
    subject: 'Geografía e Historia (4º ESO)',
    question: '¿Cuáles fueron las dos alianzas militares enfrentadas en la Primera Guerra Mundial (1914-1918)?',
    answer: 'Los Imperios Centrales / Triple Alianza (Alemania, Austria-Hungría, Imperio Otomano) frente a la Triple Entente / Aliados (Francia, Reino Unido, Rusia y luego EE. UU.).',
    mnemonicHint: '1914: Triple Alianza vs Triple Entente.',
    mastered: false,
  },
  {
    id: 'fc-4eso-ext-3',
    course: '4ESO',
    subject: 'Física y Química (4º ESO)',
    question: '¿Cuáles son los 4 primeros prefijos que indican el número de átomos de carbono en Química Orgánica?',
    answer: '1 Carbono = MET-, 2 Carbonos = ET-, 3 Carbonos = PROP-, 4 Carbonos = BUT- (ej. metano, etano, propano, butano).',
    mnemonicHint: 'ME-E-PRO-BU (1, 2, 3 y 4 carbonos).',
    mastered: false,
  },
  {
    id: 'fc-4eso-ext-4',
    course: '4ESO',
    subject: 'Valencià (4º ESO)',
    question: 'Què passa en valencià amb les preposicions àtones (a, de, en, amb) quan van davant de la conjunció completiva "que"?',
    answer: 'Cauen obligatòriament: cal dir "M’alegre que hagis vingut" o "Estic segur que aprovaràs" (i mai *"de que" ni *"en que").',
    mnemonicHint: 'Davant la conjunció QUE, la preposició CAU.',
    mastered: false,
  },
  {
    id: 'fc-4eso-ext-5',
    course: '4ESO',
    subject: 'Inglés (4º ESO)',
    question: 'En las oraciones de relativo en inglés, ¿en cuál de los dos tipos (Defining o Non-Defining) está PROHIBIDO usar el pronombre "that"?',
    answer: 'En las Non-Defining Relative Clauses (las que van entre comas): detrás de una coma solo podemos usar WHO (personas) o WHICH (cosas), nunca THAT.',
    mnemonicHint: 'Si hay COMAS, prohibido poner THAT.',
    mastered: false,
  },

  // --- 1º BACHILLERATO EXTRA FLASHCARDS ---
  {
    id: 'fc-1bach-ext-1',
    course: '1BACH',
    subject: 'Matemáticas I (1º Bach)',
    question: '¿Cómo comprobamos rápidamente si dos vectores u = (ux, uy) y v = (vx, vy) son perpendiculares (forman 90º)?',
    answer: 'Calculando su producto escalar: u · v = ux·vx + uy·vy. Si el resultado da exactamente 0, son perpendiculares.',
    mnemonicHint: 'Vectores perpendiculares (90º) ⇔ Producto escalar = 0.',
    mastered: false,
  },
  {
    id: 'fc-1bach-ext-2',
    course: '1BACH',
    subject: 'Física y Química (1º Bach)',
    question: '¿Qué significa que la variación de entalpía de una reacción química sea negativa (ΔH < 0)?',
    answer: 'Significa que la reacción es EXOTÉRMICA: libera calor hacia el entorno porque los productos tienen menos energía que los reactivos.',
    mnemonicHint: 'ΔH < 0 (Negativa) = Exotérmica (sale calor) | ΔH > 0 = Endotérmica.',
    mastered: false,
  },
  {
    id: 'fc-1bach-ext-3',
    course: '1BACH',
    subject: 'Filosofía (1º Bach)',
    question: '¿Qué diferencia hay entre la visión del ser humano y del Estado en Thomas Hobbes y en Jean-Jacques Rousseau?',
    answer: 'Para Hobbes el ser humano es egoísta por naturaleza ("el hombre es un lobo para el hombre") y necesita un Estado fuerte (Leviatán); para Rousseau nace bueno y libre pero la sociedad lo corrompe, proponiendo la Voluntad General democrática.',
    mnemonicHint: 'Hobbes = Lobo / Seguridad | Rousseau = Bondad natural / Voluntad General.',
    mastered: false,
  },
  {
    id: 'fc-1bach-ext-4',
    course: '1BACH',
    subject: 'Inglés I (1º Bach)',
    question: '¿Cuál es la estructura de la Causative Passive (cuando encargas un servicio a un profesional)?',
    answer: 'Subject + HAVE / GET (en el tiempo correspondiente) + Object + Past Participle (3ª columna / -ed). Ejemplo: "I had my hair cut yesterday."',
    mnemonicHint: 'Have + Objeto + Participio.',
    mastered: false,
  },
  {
    id: 'fc-1bach-ext-5',
    course: '1BACH',
    subject: 'Valencià I (1º Bach)',
    question: 'Quina diferència hi ha entre l’Anàfora i la Catàfora en la cohesió d’un text?',
    answer: 'L’anàfora és un pronom que es refereix a una paraula que ja ha eixit ABANS; la catàfora anuncia una paraula o idea que apareixerà DESPRÉS.',
    mnemonicHint: 'Anàfora = Mira cap arrere (Abans) | Catàfora = Mira cap avant.',
    mastered: false,
  },

  // --- 2º BACHILLERATO (PAU) EXTRA FLASHCARDS ---
  {
    id: 'fc-2bach-ext-1',
    course: '2BACH',
    subject: 'Historia de la Filosofía (2º Bach · PAU)',
    question: '¿Qué diferencia ontológica fundamental separa a Platón de su discípulo Aristóteles?',
    answer: 'Platón defiende el dualismo ontológico (separa el Mundo Sensible aparente del Mundo de las Ideas eternas), mientras que Aristóteles defiende el hilemorfismo (la esencia o forma está unida a la materia en este único mundo).',
    mnemonicHint: 'Platón = 2 Mundos separados | Aristóteles = 1 Mundo (Materia + Forma).',
    mastered: false,
  },
  {
    id: 'fc-2bach-ext-2',
    course: '2BACH',
    subject: 'Matemáticas II (2º Bach · PAU)',
    question: '¿Qué dice el Teorema de Rouché-Frobenius para que un sistema de 3 ecuaciones con 3 incógnitas tenga una única solución (SCD)?',
    answer: 'El rango de la matriz de coeficientes A debe ser igual al rango de la matriz ampliada A* e igual al número de incógnitas: Rango(A) = Rango(A*) = 3.',
    mnemonicHint: 'Rangos iguales a 3 = Sistema Compatible Determinado (1 solución).',
    mastered: false,
  },
  {
    id: 'fc-2bach-ext-3',
    course: '2BACH',
    subject: 'Lengua Castellana II (2º Bach · PAU)',
    question: '¿Cuáles son los 5 elementos principales que debes citar para justificar la Modalización (subjetividad) en el comentario PAU?',
    answer: '1. Deixis personal (1ª persona), 2. Léxico valorativo (adjetivos/sustantivos ponderativos), 3. Verbos y perífrasis modales, 4. Figuras retóricas (ironía, metáfora, interrogación retórica) y 5. Signos de puntuación o registro.',
    mnemonicHint: 'D-L-V-F-S: Deixis, Léxico, Verbos modales, Figuras y Signos.',
    mastered: false,
  },
  {
    id: 'fc-2bach-ext-4',
    course: '2BACH',
    subject: 'Inglés II (2º Bach · PAU)',
    question: 'En el Rephrasing de la PAU, ¿qué estructura gramatical va detrás de ALTHOUGH y cuál detrás de DESPITE / IN SPITE OF?',
    answer: 'Detrás de ALTHOUGH va una oración completa (Sujeto + Verbo); detrás de DESPITE o IN SPITE OF va un Sustantivo o un Verbo terminado en -ING.',
    mnemonicHint: 'Although + Sujeto + Verbo | Despite + Sustantivo / -ING.',
    mastered: false,
  },
  {
    id: 'fc-2bach-ext-5',
    course: '2BACH',
    subject: 'Química y Biología PAU (2º Bach)',
    question: 'En una pila electroquímica o celda galvánica, ¿qué reacción ocurre en el Ánodo y cuál en el Cátodo?',
    answer: 'En el Ánodo ocurre siempre la Oxidación (pérdida de electrones) y en el Cátodo ocurre siempre la Reducción (ganancia de electrones).',
    mnemonicHint: 'Vocal con Vocal (Ánodo = Oxidación) | Consonante con Consonante (Cátodo = Reducción).',
    mastered: false,
  },
];

// ============================================================================
// 6. APUNTES MODELO DEL MÉTODO CORNELL PRE-CARGADOS POR CURSO (1º ESO A 2º BACH)
// ============================================================================
export const PRELOADED_CORNELL_NOTES: CornellNote[] = [
  // 1º ESO
  {
    id: 'cn-1eso-bio',
    course: '1ESO',
    subject: 'Biología y Geología',
    topic: 'La Célula: Procariotas vs Eucariotas (Animal y Vegetal)',
    date: 'Apunte Modelo 1º ESO',
    cues: [
      '¿Qué 3 partes tienen TODAS las células?',
      '¿Procariota vs Eucariota?',
      '¿Qué es exclusivo de la célula vegetal?',
      '¿Para qué sirve la mitocondria?',
    ],
    notes:
      '• Toda célula tiene 3 componentes básicos: Membrana plasmática, Citoplasma y Material genético (ADN).\n• Procariotas (Bacterias): más pequeñas, sin núcleo definido (el ADN flota libre en el citoplasma).\n• Eucariotas (Animales, Plantas, Hongos, Protoctistas): tienen un NÚCLEO con membrana que protege el ADN.\n• Exclusivo de la Célula Vegetal: Pared celular rígida de celulosa, Cloroplastos (fotosíntesis) y gran Vacuola central.\n• Mitocondrias: presentes en animales y vegetales; realizan la respiración celular para obtener energía.',
    summary:
      'Las procariotas (bacterias) tienen el ADN libre, mientras que las eucariotas tienen núcleo; además, la célula vegetal añade pared celular, cloroplastos y una gran vacuola.',
  },
  {
    id: 'cn-1eso-mat',
    course: '1ESO',
    subject: 'Matemáticas',
    topic: 'Diferencia entre m.c.m. (Coincidir) y M.C.D. (Repartir en trozos máximos)',
    date: 'Apunte Modelo 1º ESO',
    cues: [
      '¿Cuándo uso el m.c.m. en problemas?',
      '¿Fórmula del m.c.m.?',
      '¿Cuándo uso el M.C.D.?',
      '¿Fórmula del M.C.D.?',
    ],
    notes:
      '• Paso previo común: descomponer siempre cada número en factores primos (dividiendo entre 2, 3, 5, 7...).\n• m.c.m. (Mínimo Común Múltiplo): se usa cuando el problema pregunta "¿cuándo volverán a coincidir?". Regla: factores COMUNES y NO COMUNES al MAYOR exponente.\n• M.C.D. (Máximo Común Divisor): se usa cuando el problema pide "dividir o cortar en trozos iguales del mayor tamaño posible sin que sobre nada". Regla: SOLO factores COMUNES al MENOR exponente.',
    summary:
      'El m.c.m. busca coincidencias futuras usando todos los factores al mayor exponente; el M.C.D. busca repartos exactos máximos usando solo los factores comunes al menor exponente.',
  },

  // 2º ESO
  {
    id: 'cn-2eso-fyq',
    course: '2ESO',
    subject: 'Física y Química (2º ESO)',
    topic: 'Leyes de los Gases Ideales (Boyle-Mariotte, Charles y Gay-Lussac)',
    date: 'Apunte Modelo 2º ESO',
    cues: [
      '¿Cómo paso ºC a Kelvin?',
      '¿Ley de Boyle (T constante)?',
      '¿Ley de Charles (P constante)?',
      '¿Ley de Gay-Lussac (V constante)?',
    ],
    notes:
      '• Regla obligatoria antes de calcular: pasar SIEMPRE la temperatura a Kelvin sumando 273 → T(K) = T(ºC) + 273.\n• Ley de Boyle-Mariotte (Temperatura constante): Presión y Volumen son inversamente proporcionales → P1 · V1 = P2 · V2 (si reduces el volumen a la mitad, la presión se duplica).\n• Ley de Charles (Presión constante): V1 / T1 = V2 / T2 (al calentar un gas, se expande).\n• Ley de Gay-Lussac (Volumen constante): P1 / T1 = P2 / T2 (al calentar un recipiente cerrado, sube su presión).',
    summary:
      'En los gases la temperatura siempre va en Kelvin (+273) y se cumple la ecuación general (P1·V1)/T1 = (P2·V2)/T2, tachando la magnitud que permanezca constante.',
  },
  {
    id: 'cn-2eso-geh',
    course: '2ESO',
    subject: 'Geografía e Historia (2º ESO)',
    topic: 'Edad Media en la Península: Al-Ándalus, Jaume I y el Reino de Valencia (1238)',
    date: 'Apunte Modelo 2º ESO',
    cues: [
      '¿Etapas de Al-Ándalus (711-1492)?',
      '¿Qué ocurrió en 1238?',
      '¿Qué fueron los Furs de València?',
      '¿Románico vs Gótico?',
    ],
    notes:
      '• Evolución de Al-Ándalus: Emirato dependiente (711) → Emirato independiente (756) → Califato de Córdoba con Abderramán III (929, máximo esplendor) → Reinos de Taifas (1031) → Reino Nazarí de Granada (hasta 1492).\n• Corona de Aragón: el rey Jaume I el Conqueridor conquista Mallorca (1229) y entra en Valencia el 9 de octubre de 1238.\n• Jaume I promulga los Furs de València, dotando al nuevo Reino de Valencia de leyes e instituciones propias.\n• Arte Gótico Civil valenciano (siglo XV): Lonja de la Seda y Torres de Serranos.',
    summary:
      'Mientras Al-Ándalus evolucionó desde el Califato de Córdoba hasta los Reinos de Taifas, Jaume I conquistó Valencia en 1238 y fundó el Reino de Valencia con leyes propias (els Furs).',
  },

  // 3º ESO
  {
    id: 'cn-3eso-bio',
    course: '3ESO',
    subject: 'Biología y Geología (3º ESO)',
    topic: 'Anatomía del Corazón y la Doble Circulación Sanguínea',
    date: 'Apunte Modelo 3º ESO',
    cues: [
      '¿Diferencia entre Venas y Arterias?',
      '¿Qué son Sístole y Diástole?',
      '¿Por qué la circulación es Doble y Completa?',
    ],
    notes:
      '• Regla infalible de vasos sanguíneos: las VENAS siempre Vuelven al corazón y entran por las Aurículas (superiores); las ARTERIAS siempre Salen del corazón impulsadas por los Ventrículos (inferiores).\n• Mitad derecha del corazón: mueve sangre rica en CO2 hacia los pulmones. Mitad izquierda: recibe sangre oxigenada (O2) de los pulmones y la impulsa por la arteria Aorta a todo el cuerpo.\n• Es DOBLE porque recorre dos circuitos (menor o pulmonar y mayor o general) y COMPLETA porque la sangre oxigenada y la desoxigenada nunca se mezclan.',
    summary:
      'Las venas entran a las aurículas y las arterias salen de los ventrículos en un circuito doble (pulmonar y general) y completo sin mezcla de sangres.',
  },
  {
    id: 'cn-3eso-lcl',
    course: '3ESO',
    subject: 'Lengua Castellana (3º ESO)',
    topic: 'Cuadro Maestro de los 7 Complementos del Predicado en la Oración Simple',
    date: 'Apunte Modelo 3º ESO',
    cues: [
      '¿Cómo compruebo el CD y el CI?',
      '¿Atributo vs C. Predicativo?',
      '¿Qué es el C. de Régimen?',
      '¿Cuándo hay C. Agente?',
    ],
    notes:
      '• CD (Complemento Directo): se sustituye por LO, LA, LOS, LAS y pasa a Sujeto en voz pasiva.\n• CI (Complemento Indirecto): se sustituye por LE, LES (o SE si va seguido de lo/la).\n• Atributo: va exclusivamente con verbos copulativos (SER, ESTAR, PARECER) y se sustituye por LO.\n• C. Predicativo (CPred): adjetivo que va con un verbo predicativo y concuerda en género y número con el Sujeto o el CD ("Los atletas llegaron exhaustos").\n• C. de Régimen (CRég): sintagma preposicional exigido por el verbo (confiar en, arrepentirse de, hablar de).\n• C. Agente (CAg): empieza por "POR" y realiza la acción en oraciones en voz pasiva.',
    summary:
      'Para analizar el predicado primero mira si el verbo es copulativo (Atributo), pasivo (C. Agente) o predicativo (aplicando las sustituciones LO/LA para CD, LE/LES para CI y preposición exigida para CRég).',
  },

  // 4º ESO
  {
    id: 'cn-4eso-fyq',
    course: '4ESO',
    subject: 'Física y Química (4º ESO)',
    topic: 'Las 3 Leyes de Newton de la Dinámica y la Conservación de la Energía Mecánica',
    date: 'Apunte Modelo 4º ESO',
    cues: [
      '¿1ª Ley de Inercia?',
      '¿2ª Ley Fundamental?',
      '¿Fuerza de Rozamiento?',
      '¿Cuándo se conserva la Energía Mecánica?',
    ],
    notes:
      '• 1ª Ley de Newton (Inercia): si la suma de fuerzas sobre un cuerpo es cero (ΣF = 0), permanece en reposo o en Movimiento Rectilíneo Uniforme (velocidad constante).\n• 2ª Ley de Newton: la fuerza resultante es igual al producto de la masa por la aceleración → ΣF = m · a (en Newtons).\n• Fuerza de Rozamiento (Fr = μ · N): siempre se opone al sentido del movimiento.\n• Energía Mecánica: Em = Ec (1/2·m·v²) + Ep (m·g·h). Si no hay rozamiento, Em inicial = Em final (toda la energía potencial que pierde al bajar se transforma en energía cinética).',
    summary:
      'En Dinámica aplicamos ΣF = m·a dibujando todas las fuerzas (incluyendo el rozamiento Fr = μ·N), y en Energía igualamos Ec1 + Ep1 = Ec2 + Ep2 cuando no actúan fuerzas disipativas.',
  },
  {
    id: 'cn-4eso-bio',
    course: '4ESO',
    subject: 'Biología y Geología (4º ESO)',
    topic: 'Genética Molecular (Dogma Central ADN → ARN → Proteína) y Leyes de Mendel',
    date: 'Apunte Modelo 4º ESO',
    cues: [
      '¿Diferencia química entre ADN y ARN?',
      '¿Qué son Replicación, Transcripción y Traducción?',
      '¿Proporción del cruce Aa x Aa (2ª Ley)?',
    ],
    notes:
      '• ADN: doble hélice con desoxirribosa y bases A-T y C-G (en el núcleo). ARN: cadena simple con ribosa y bases A-U (Uracilo en lugar de Timina) y C-G.\n• Dogma Central: 1. Replicación (ADN → ADN) → 2. Transcripción en el núcleo (ADN → ARNm) → 3. Traducción en los ribosomas (ARNm → Proteína leyendo tripletes o codones).\n• Leyes de Mendel: en el cruce de dos híbridos heterocigotos (Aa x Aa), el cuadro de Punnett da 25% AA, 50% Aa y 25% aa → 75% fenotipo dominante (3/4) y 25% fenotipo recesivo (1/4).',
    summary:
      'La información genética pasa del ADN al ARNm (cambiando T por U en la transcripción) y a proteína en los ribosomas, mientras que la herencia mendeliana de dos heterocigotos sigue la proporción 3:1.',
  },

  // 1º BACHILLERATO
  {
    id: 'cn-1bach-mat',
    course: '1BACH',
    subject: 'Matemáticas I (1º Bachillerato)',
    topic: 'Aplicaciones de la Derivada: Recta Tangente, Monotonía, Extremos y Optimización',
    date: 'Apunte Modelo 1º Bach',
    cues: [
      '¿Qué mide geométricamente f’(a)?',
      '¿Ecuación de la recta tangente?',
      '¿Cómo hallo máximos y mínimos?',
    ],
    notes:
      '• Interpretación geométrica: la derivada f’(a) de una función en un punto x = a es exactamente la PENDIENTE (m) de la recta tangente a la gráfica en ese punto.\n• Ecuación de la Recta Tangente en x = a: y - f(a) = f’(a) · (x - a).\n• Monotonía y Extremos Relativos:\n  1. Calculamos f’(x) y resolvemos f’(x) = 0 (candidatos a máximo o mínimo).\n  2. Estudiamos el signo de f’(x) en la recta real: si f’(x) > 0 la función CRECE; si f’(x) < 0 la función DECRECE.\n  3. Donde pasa de crecer (+) a decrecer (-) hay un MÁXIMO relativo; de (-) a (+) hay un MÍNIMO relativo.',
    summary:
      'La primera derivada f’(x) proporciona la pendiente de la recta tangente y, al igualarla a cero y estudiar su signo, determina los intervalos de crecimiento y los máximos y mínimos.',
  },
  {
    id: 'cn-1bach-fil',
    course: '1BACH',
    subject: 'Filosofía (1º Bachillerato)',
    topic: 'Epistemología (Racionalismo vs Empirismo) y Ética (Aristóteles vs Kant)',
    date: 'Apunte Modelo 1º Bach',
    cues: [
      '¿Qué defienden Descartes y Hume?',
      '¿Cómo los sintetiza Kant?',
      '¿Ética material vs Ética formal?',
    ],
    notes:
      '• Racionalismo (Descartes): el conocimiento universal y seguro procede de la Razón y de las ideas innatas; desconfía de los sentidos.\n• Empirismo (David Hume): nuestra mente al nacer es un "papel en blanco" (tabula rasa); todo conocimiento procede de la experiencia sensible (impresiones e ideas).\n• Criticismo de Kant: todo conocimiento comienza con la experiencia, pero el sujeto aporta las formas a priori para ordenarla.\n• Ética: Aristóteles propone una ética material teleológica (el fin es la Felicidad o Eudaimonía mediante el hábito de la virtud); Kant propone una ética formal deontológica (actuar por puro deber universal: Imperativo Categórico).',
    summary:
      'En teoría del conocimiento Kant supera la oposición entre Racionalismo (Descartes) y Empirismo (Hume), y en ética revoluciona la tradición aristotélica de la felicidad al fundar la moral en el deber autónomo.',
  },

  // 2º BACHILLERATO (PAU)
  {
    id: 'cn-2bach-his',
    course: '2BACH',
    subject: 'Historia de España (2º Bachillerato · PAU)',
    topic: 'Guía Comparativa de las Constituciones Españolas (1812, 1837, 1845, 1869, 1876, 1931 y 1978)',
    date: 'Apunte Modelo PAU 2º Bach',
    cues: [
      '¿Cuáles son progresistas / democráticas?',
      '¿Cuáles son moderadas / conservadoras?',
      '¿Novedades clave de 1931 y 1978?',
    ],
    notes:
      '• Constituciones Progresistas y Democráticas (Soberanía Nacional o Popular, amplios derechos y división de poderes):\n  - 1812 (Cádiz, "La Pepa"): soberanía nacional, división de poderes, catolicismo.\n  - 1837 (Progresista) y 1869 (Sexenio Democrático: sufragio universal masculino y libertad de cultos).\n  - 1931 (II República): Estado integral (autonomías), sufragio universal femenino (1933) y Estado laico.\n  - 1978 (Actual): Estado social y democrático de Derecho, monarquía parlamentaria y Estado de las Autonomías.\n• Constituciones Moderadas / Conservadoras (Soberanía compartida Rey-Cortes y sufragio muy censitario):\n  - 1845 (Moderada, Isabel II) y 1876 (Restauración de Cánovas: texto flexible y turnismo bipartidista).',
    summary:
      'El constitucionalismo español alternó textos conservadores de soberanía compartida (1845, 1876) con textos progresistas y democráticos de soberanía nacional/popular (1812, 1869, 1931 y 1978).',
  },
  {
    id: 'cn-2bach-mat',
    course: '2BACH',
    subject: 'Matemáticas II (2º Bachillerato · PAU)',
    topic: 'Formulario Maestro PAU: Discusión de Sistemas, Rectas y Planos en R3 e Integrales',
    date: 'Apunte Modelo PAU 2º Bach',
    cues: [
      '¿Cómo discuto un sistema con parámetro k?',
      '¿Vector normal de un plano Ax+By+Cz+D=0?',
      '¿Cómo calculo el área entre dos curvas?',
    ],
    notes:
      '• Bloque Álgebra (Rouché-Frobenius): 1º Calcula |A| e iguálalo a 0. 2º Si k ≠ valores críticos → |A| ≠ 0 → rg(A) = rg(A*) = 3 (SCD, solución única). 3º Sustituye cada valor crítico de k y compara rg(A) con rg(A*) por menores o Gauss.\n• Bloque Geometría en R3: el vector normal (perpendicular) al plano π: Ax + By + Cz + D = 0 es directamente n = (A, B, C). Dos planos son paralelos si sus vectores normales son proporcionales.\n• Bloque Análisis (Regla de Barrow): para hallar el área entre f(x) y g(x), resuelve primero f(x) = g(x) para obtener los cortes x = a y x = b, e integra |∫(f(x) - g(x))dx| aplicando F(b) - F(a).',
    summary:
      'En la PAU de Matemáticas II asegura siempre los 3 bloques: determinantes y Rouché-Frobenius en Álgebra, vectores directores/normales en Geometría R3 y derivadas/Barrow en Análisis.',
  },
];

// ============================================================================
// 7. PLANTILLAS DE MAPAS VISUALES POR CURSO (MIND MAPS PRE-DISEÑADOS)
// ============================================================================
export interface CourseMindMapTemplate {
  id: string;
  course: CourseGrade;
  subject: string;
  centralTopic: string;
  nodes: MindMapNode[];
}

export const COURSE_MIND_MAP_TEMPLATES: CourseMindMapTemplate[] = [
  {
    id: 'mm-tpl-1eso-bio',
    course: '1ESO',
    subject: 'Biología y Geología',
    centralTopic: 'La Célula Eucariota y Los 5 Reinos (1º ESO)',
    nodes: [
      { id: '1b-1', label: 'Membrana Plasmática', category: 'RAMA', notes: 'Envuelve la célula y regula el paso de sustancias' },
      { id: '1b-2', label: 'Núcleo Definido', category: 'RAMA', notes: 'Contiene y protege el ADN (a diferencia de las bacterias procariotas)' },
      { id: '1b-3', label: 'Mitocondrias', category: 'RAMA', notes: 'Centrales energéticas: realizan la respiración celular con O2' },
      { id: '1b-4', label: 'Cloroplastos y Pared (Vegetal)', category: 'DETALLE', notes: 'Realizan la fotosíntesis y dan rigidez a las plantas' },
      { id: '1b-5', label: 'Nutrición Autótrofa vs Heterótrofa', category: 'RAMA', notes: 'Plantas y algas fabrican su alimento; animales y hongos lo toman' },
      { id: '1b-6', label: 'Los 5 Reinos', category: 'DETALLE', notes: 'Moneras, Protoctistas, Hongos (Fungi), Plantas y Animales' },
    ],
  },
  {
    id: 'mm-tpl-1eso-geh',
    course: '1ESO',
    subject: 'Geografía e Historia',
    centralTopic: 'Etapas de la Prehistoria y Edad Antigua (1º ESO)',
    nodes: [
      { id: '1g-1', label: '1. Paleolítico (Piedra Tallada)', category: 'RAMA', notes: 'Nómadas, cazadores-recolectores, dominio del fuego y cuevas' },
      { id: '1g-2', label: '2. Neolítico (Piedra Pulimentada)', category: 'RAMA', notes: 'Agricultura y ganadería, sedentarios en poblados, cerámica' },
      { id: '1g-3', label: '3. Edad de los Metales', category: 'RAMA', notes: 'Cobre, Bronce y Hierro; invención de la rueda, vela y arado' },
      { id: '1g-4', label: 'Invención de la Escritura (~3500 a.C.)', category: 'DETALLE', notes: 'Frontera que inicia la Historia en Mesopotamia y Egipto' },
      { id: '1g-5', label: 'Grecia Clásica (Polis)', category: 'RAMA', notes: 'Democracia en Atenas, filosofía y Juegos Olímpicos' },
      { id: '1g-6', label: 'Roma y Saguntum', category: 'RAMA', notes: 'República e Imperio, latín, calzadas y Teatro Romano de Sagunto' },
    ],
  },
  {
    id: 'mm-tpl-2eso-fyq',
    course: '2ESO',
    subject: 'Física y Química',
    centralTopic: 'El Átomo, Gases y Reacciones Químicas (2º ESO)',
    nodes: [
      { id: '2f-1', label: 'Núcleo Atómico (Z y A)', category: 'RAMA', notes: 'Protones (+) y Neutrones (N = A - Z) concentrando la masa' },
      { id: '2f-2', label: 'Corteza Electrónica', category: 'RAMA', notes: 'Electrones (-): si pierde e- es Catión (+), si gana es Anión (-)' },
      { id: '2f-3', label: 'Leyes de los Gases (Kelvin)', category: 'RAMA', notes: 'Boyle (P·V = cte), Charles (V/T = cte) y Gay-Lussac (P/T = cte)' },
      { id: '2f-4', label: 'Ley de Lavoisier', category: 'DETALLE', notes: 'Masa de Reactivos = Masa de Productos en toda reacción química' },
      { id: '2f-5', label: 'Cinemática MRU', category: 'RAMA', notes: 'Velocidad constante v = e / t (pasar km/h a m/s dividiendo entre 3,6)' },
      { id: '2f-6', label: 'Ley de Hooke en Muelles', category: 'DETALLE', notes: 'Fuerza elástica proporcional al estiramiento: F = k · Δx' },
    ],
  },
  {
    id: 'mm-tpl-2eso-geh',
    course: '2ESO',
    subject: 'Geografía e Historia',
    centralTopic: 'Edad Media: Feudalismo, Al-Ándalus y Corona de Aragón (2º ESO)',
    nodes: [
      { id: '2g-1', label: 'Sociedad Estamental Feudal', category: 'RAMA', notes: 'Privilegiados (Nobleza y Clero) vs No Privilegiados (Campesinos)' },
      { id: '2g-2', label: 'Arte Románico (Siglos XI-XII)', category: 'RAMA', notes: 'Arco de medio punto, bóveda de cañón y muros gruesos rurales' },
      { id: '2g-3', label: 'Arte Gótico (Siglos XIII-XV)', category: 'RAMA', notes: 'Catedrales urbanas altas con arco ojival, arbotantes y vidrieras' },
      { id: '2g-4', label: 'Al-Ándalus (711 - 1492)', category: 'RAMA', notes: 'Emirato, Califato de Córdoba (929), Reinos de Taifas y Granada' },
      { id: '2g-5', label: 'Jaume I y Reino de Valencia (1238)', category: 'DETALLE', notes: 'Conquista de Valencia, promulgación de los Furs y Siglo de Oro' },
      { id: '2g-6', label: 'Humanismo y Renacimiento', category: 'RAMA', notes: 'Paso del Teocentrismo medieval al Antropocentrismo moderno' },
    ],
  },
  {
    id: 'mm-tpl-3eso-bio',
    course: '3ESO',
    subject: 'Biología y Geología',
    centralTopic: 'Sistemas del Cuerpo Humano y Salud (3º ESO)',
    nodes: [
      { id: '3b-1', label: 'Aparato Digestivo', category: 'RAMA', notes: 'Transforma alimentos en nutrientes: Bolo → Quimo → Quilo (absorción)' },
      { id: '3b-2', label: 'Aparato Respiratorio', category: 'RAMA', notes: 'Intercambio de gases O2 y CO2 por difusión en los alvéolos pulmonares' },
      { id: '3b-3', label: 'Corazón y Circulación Doble', category: 'RAMA', notes: 'Venas entran a Aurículas; Arterias salen de Ventrículos' },
      { id: '3b-4', label: 'Riñones y Nefronas (Excretor)', category: 'DETALLE', notes: 'Filtran la sangre y reabsorben el agua y la glucosa útil' },
      { id: '3b-5', label: 'Sistema Nervioso vs Endocrino', category: 'RAMA', notes: 'Impulsos nerviosos rápidos (neuronas) vs Hormonas por la sangre' },
      { id: '3b-6', label: 'Defensas: Vacunas vs Antibióticos', category: 'DETALLE', notes: 'Vacunas previenen con memoria; Antibióticos solo curan bacterias' },
    ],
  },
  {
    id: 'mm-tpl-4eso-geh',
    course: '4ESO',
    subject: 'Geografía e Historia',
    centralTopic: 'Revoluciones y Grandes Conflictos del Siglo XX (4º ESO)',
    nodes: [
      { id: '4g-1', label: 'Ilustración y Rev. Francesa (1789)', category: 'RAMA', notes: 'Fin del absolutismo, división de poderes (Montesquieu) y derechos' },
      { id: '4g-2', label: 'Revolución Industrial', category: 'RAMA', notes: 'Máquina de vapor, ferrocarril, fábricas y sociedad de clases' },
      { id: '4g-3', label: 'Primera Guerra Mundial (1914-1918)', category: 'RAMA', notes: 'Triple Alianza vs Triple Entente, guerra de trincheras y Versalles' },
      { id: '4g-4', label: 'Entreguerras y Crack del 29', category: 'DETALLE', notes: 'Revolución Rusa (1917), crisis económica y ascenso de fascismos' },
      { id: '4g-5', label: 'Segunda Guerra Mundial (1939-1945)', category: 'RAMA', notes: 'Aliados vs Potencias del Eje, derrota del nazismo y creación de la ONU' },
      { id: '4g-6', label: 'Guerra Fría y Transición Española', category: 'RAMA', notes: 'Mundo bipolar EE. UU./URSS (1947-1989) y Constitución española de 1978' },
    ],
  },
  {
    id: 'mm-tpl-1bach-fil',
    course: '1BACH',
    subject: 'Filosofía',
    centralTopic: 'Mapa Global de Filosofía: Razón, Ciencia, Ética y Política (1º Bach)',
    nodes: [
      { id: '1bf-1', label: 'Del Mito al Logos (Grecia)', category: 'RAMA', notes: 'Paso de la imaginación mítica a la explicación racional y necesaria' },
      { id: '1bf-2', label: 'Racionalismo (Descartes)', category: 'RAMA', notes: 'Confianza en la razón y en las ideas innatas frente a los sentidos' },
      { id: '1bf-3', label: 'Empirismo (David Hume)', category: 'RAMA', notes: 'Todo conocimiento procede y tiene su límite en la experiencia sensible' },
      { id: '1bf-4', label: 'Ética Eudemonista (Aristóteles)', category: 'DETALLE', notes: 'Ética material teleológica: alcanzar la Felicidad mediante la virtud' },
      { id: '1bf-5', label: 'Ética Formal Deontológica (Kant)', category: 'RAMA', notes: 'Actuar por puro Deber autónomo siguiendo el Imperativo Categórico' },
      { id: '1bf-6', label: 'Contrato Social (Hobbes, Locke, Rousseau)', category: 'RAMA', notes: 'Origen pactado del Estado: seguridad, derechos liberales y democracia' },
    ],
  },
  {
    id: 'mm-tpl-2bach-pau',
    course: '2BACH',
    subject: 'Preparación PAU / EBAU',
    centralTopic: 'Estrategia Integral para los Exámenes PAU (2º Bachillerato)',
    nodes: [
      { id: '2bp-1', label: 'Historia de España PAU', category: 'RAMA', notes: 'Análisis de dos fuentes + Constituciones (1812-1978) + Siglos XIX y XX' },
      { id: '2bp-2', label: 'Lengua Castellana PAU', category: 'RAMA', notes: 'Resumen, Tema nominal, Estructura, Modalización, Pares Mínimos y Autores' },
      { id: '2bp-3', label: 'Valencià PAU', category: 'RAMA', notes: 'Comprensió, Pronoms/Sintaxi, Literatura (Rodoreda, Estellés, Fuster, Sirera)' },
      { id: '2bp-4', label: 'Inglés PAU (Reading & Essay)', category: 'RAMA', notes: 'Citas exactas True/False, Rephrasing y Opinion Essay de 4 párrafos' },
      { id: '2bp-5', label: 'Matemáticas II / CCSS II PAU', category: 'RAMA', notes: 'Rouché-Frobenius en Álgebra, Rectas/Planos en R3, Barrow y Bayes' },
      { id: '2bp-6', label: 'Adaptación TDAH (+25% Tiempo)', category: 'DETALLE', notes: 'Planificar los primeros 5 minutos con guion y revisar los últimos 5 min' },
    ],
  },
];

// ============================================================================
// 8. RETOS GUIADOS PARA LA TÉCNICA FEYNMAN POR CURSO (CON ANALOGÍAS MODELO)
// ============================================================================
export interface FeynmanGuidedChallenge {
  id: string;
  course: CourseGrade;
  subject: string;
  concept: string;
  modelExplanation: string;
  modelAnalogy: string;
  keywordsToMention: string[];
}

export const FEYNMAN_GUIDED_CHALLENGES: FeynmanGuidedChallenge[] = [
  {
    id: 'fey-1eso-1',
    course: '1ESO',
    subject: 'Matemáticas',
    concept: 'Fracciones Equivalentes y Denominador Común (m.c.m.)',
    modelExplanation:
      'Dos fracciones son equivalentes cuando representan la misma cantidad total aunque estén divididas en distinto número de trozos. Para sumarlas, primero debemos igualar el tamaño de los trozos con el m.c.m.',
    modelAnalogy:
      'Es como comer 1 mitad de pizza (1/2) o comer 2 cuartos (2/4): tienes exactamente la misma cantidad de comida en el plato.',
    keywordsToMention: ['Numerador', 'Denominador', 'Mismo tamaño', 'm.c.m.'],
  },
  {
    id: 'fey-1eso-2',
    course: '1ESO',
    subject: 'Biología y Geología',
    concept: 'Diferencia entre Célula Procariota y Célula Eucariota',
    modelExplanation:
      'La célula procariota es muy sencilla y su ADN está suelto por el citoplasma (como las bacterias), mientras que la célula eucariota guarda su ADN protegido dentro de un núcleo con membrana.',
    modelAnalogy:
      'La procariota es como llevar los apuntes sueltos por la mochila; la eucariota es llevarlos guardados dentro de un archivador cerrado (el núcleo).',
    keywordsToMention: ['ADN', 'Núcleo', 'Citoplasma', 'Bacterias'],
  },
  {
    id: 'fey-2eso-1',
    course: '2ESO',
    subject: 'Física y Química',
    concept: 'Ley de Boyle-Mariotte de los Gases (P1 · V1 = P2 · V2)',
    modelExplanation:
      'A temperatura constante, si reducimos el espacio (volumen) donde está encerrado un gas, sus partículas chocan muchas más veces contra las paredes y la presión aumenta en la misma proporción.',
    modelAnalogy:
      'Es como si 30 alumnos corren por el patio grande (pocos choques, baja presión) y de repente los metes a correr en un aula pequeña (el doble de choques, sube la presión).',
    keywordsToMention: ['Presión', 'Volumen', 'Temperatura constante', 'Choques de partículas'],
  },
  {
    id: 'fey-2eso-2',
    course: '2ESO',
    subject: 'Geografía e Historia',
    concept: 'El Pacto de Vasallaje en el Feudalismo Medieval',
    modelExplanation:
      'Era una alianza doble entre nobles: el vasallo prometía ayuda militar y consejo fiel a su señor (Homenaje), y a cambio el señor le entregaba tierras llamadas feudo para gobernarlas (Investidura).',
    modelAnalogy:
      'Es como cuando en Naruto un ninja jura lealtad para proteger al Hokage en las misiones y a cambio recibe su rango, recursos y territorio.',
    keywordsToMention: ['Señor feudal', 'Vasallo', 'Homenaje', 'Feudo (tierras)'],
  },
  {
    id: 'fey-3eso-1',
    course: '3ESO',
    subject: 'Biología y Geología',
    concept: 'Diferencia entre un Acto Voluntario y un Acto Reflejo',
    modelExplanation:
      'Un acto voluntario lo piensa y decide la corteza cerebral, mientras que en un acto reflejo de emergencia la orden sale directamente de la médula espinal antes de que nos demos cuenta para evitar un daño.',
    modelAnalogy:
      'El acto reflejo es como el "Ultra Instinto" o el Haki de observación: tu médula retira la mano del fuego al instante sin esperar a que el cerebro debata qué hacer.',
    keywordsToMention: ['Estímulo', 'Médula espinal', 'Cerebro', 'Rapidez de emergencia'],
  },
  {
    id: 'fey-4eso-1',
    course: '4ESO',
    subject: 'Física y Química',
    concept: 'Conservación de la Energía Mecánica (Ec + Ep = constante)',
    modelExplanation:
      'Cuando no hay rozamiento, la energía total de un objeto ni se crea ni se destruye: la altura que pierde al bajar (energía potencial) se transforma íntegramente en velocidad (energía cinética).',
    modelAnalogy:
      'Es como pasar dinero de tu hucha (Energía Potencial arriba) a tu bolsillo para gastar (Energía Cinética abajo): el total de dinero que tienes sigue siendo exactamente el mismo.',
    keywordsToMention: ['Energía Cinética (velocidad)', 'Energía Potencial (altura)', 'Sin rozamiento', 'Constante'],
  },
  {
    id: 'fey-1bach-1',
    course: '1BACH',
    subject: 'Matemáticas I',
    concept: 'Qué es la Derivada de una Función en un Punto f’(a)',
    modelExplanation:
      'La derivada mide la rapidez instantánea con la que cambia una función en un punto exacto, y geométricamente coincide con la inclinación (pendiente) de la recta tangente en ese punto.',
    modelAnalogy:
      'No es la velocidad media de todo un viaje en coche, sino lo que marca el velocímetro digital en el segundo exacto en que miras la pantalla.',
    keywordsToMention: ['Pendiente', 'Recta tangente', 'Cambio instantáneo', 'Crecimiento'],
  },
  {
    id: 'fey-2bach-1',
    course: '2BACH',
    subject: 'Historia de la Filosofía (PAU)',
    concept: 'El Mito de la Caverna de Platón (Doxa vs Episteme)',
    modelExplanation:
      'Platón explica que quienes solo creen en lo que ven sus sentidos viven como prisioneros viendo sombras en una cueva (opinión o Doxa); educarse y filosofar es romper las cadenas y salir al exterior iluminado por el Sol (la Idea del Bien y la ciencia o Episteme).',
    modelAnalogy:
      'Es como vivir creyendo que un filtro de redes sociales es la realidad entera (las sombras) hasta que sales a la calle y ves el mundo real con tus propios ojos a plena luz.',
    keywordsToMention: ['Mundo Sensible (Sombras)', 'Mundo de las Ideas', 'Sol (Idea del Bien)', 'Educación'],
  },
];

// ============================================================================
// 9. GUÍAS INTERACTIVAS DE ESTUDIO TDAH Y PROTOCOLOS DE EXAMEN PASO A PASO
// ============================================================================
export interface AdhdStudyProtocol {
  id: string;
  title: string;
  badge: string;
  targetCourses: string;
  rewardPE: number;
  summary: string;
  steps: {
    stepNumber: number;
    heading: string;
    action: string;
    timeEstimate: string;
  }[];
}

export const ADHD_STUDY_PROTOCOLS: AdhdStudyProtocol[] = [
  {
    id: 'prot-3days-exam',
    title: 'Protocolo "Examen en 3 Tardes" (Sin Atracones de Última Hora)',
    badge: 'PLANIFICACIÓN DE EXAMEN',
    targetCourses: '1º ESO a 2º Bachillerato',
    rewardPE: 60,
    summary:
      'Sustituye el agobio de estudiar todo la noche anterior por 3 bloques cortos repartidos en 3 tardes consecutivas.',
    steps: [
      {
        stepNumber: 1,
        heading: 'Tarde 1 (Día -3): Escaneo Visual y Mapa de 1 Página',
        action:
          'No intentes memorizar hoy. Reúne los apuntes, subraya solo los títulos y palabras clave en ámbar y crea un único esquema o Ficha Cornell donde quepa todo el tema de un vistazo.',
        timeEstimate: '20 - 25 min',
      },
      {
        stepNumber: 2,
        heading: 'Tarde 2 (Día -2): Recuerdo Activo en Voz Alta + Problemas Tipo',
        action:
          'Guarda el libro y usa tu esquema de ayer. Explica cada apartado en voz alta con el micrófono de ClotFocus y resuelve los ejercicios prácticos que el profesor corrigió en la pizarra.',
        timeEstimate: '25 - 30 min',
      },
      {
        stepNumber: 3,
        heading: 'Tarde 3 (Víspera): Simulacro de Examen Cronometrado',
        action:
          'Haz el Simulacro de Examen de la asignatura en ClotFocus y las Flashcards. Anota en un post-it las 3 fórmulas o fechas que más te cueste recordar para mirarlas 5 minutos en el desayuno.',
        timeEstimate: '20 min',
      },
    ],
  },
  {
    id: 'prot-exam-day',
    title: 'Protocolo Anti-Bloqueo Durante el Examen en el Aula',
    badge: 'CONTROL DE IMPULSIVIDAD',
    targetCourses: 'ESO y PAU Bachillerato (+25% Tiempo)',
    rewardPE: 60,
    summary:
      'Evita perder puntos por leer demasiado rápido los enunciados o bloquearte en una pregunta difícil.',
    steps: [
      {
        stepNumber: 1,
        heading: 'Minuto 1 al 3: Descarga de Memoria ("Brain Dump") y Subrayado de Verbos',
        action:
          'Nada más recibir la hoja del examen, apunta en una esquina del borrador las 2 o 3 fórmulas/esquemas que llevas frescos en la cabeza. Después, rodea con bolígrafo el verbo de cada pregunta ("Calcula", "Justifica", "Elige la INCORRECTA").',
        timeEstimate: 'Primeros 3 min',
      },
      {
        stepNumber: 2,
        heading: 'Orden Estratégico: Empieza por tu Pregunta Más Segura',
        action:
          'No estás obligado a empezar por la Pregunta 1. Empieza por el ejercicio que mejor domines para activar la dopamina, ganar confianza y asegurar los primeros puntos.',
        timeEstimate: 'Mitad del examen',
      },
      {
        stepNumber: 3,
        heading: 'Últimos 5 Minutos: Caza de Signos, Unidades y Tildes',
        action:
          'No entregues el examen en cuanto pongas el punto final. Dedica los últimos 5 minutos exclusivamente a revisar: 1. Signos menos (-), 2. Unidades (m/s, N, cm²), 3. Que no haya quedado ninguna pregunta atrás sin responder.',
        timeEstimate: 'Últimos 5 min',
      },
    ],
  },
  {
    id: 'prot-5min-start',
    title: 'Regla de los 5 Minutos contra la Parálisis Ejecutiva TDAH',
    badge: 'ARRANQUE INMEDIATO',
    targetCourses: 'Todos los cursos',
    rewardPE: 50,
    summary:
      'Cuando una tarea parece una montaña gigante y te cuesta sentarte a empezar, reduce la barrera de entrada a un micro-compromiso de 5 minutos.',
    steps: [
      {
        stepNumber: 1,
        heading: 'Despeja la Mesa (Cero Estímulos Visuales)',
        action:
          'Deja sobre el escritorio ÚNICAMENTE el cuaderno de la asignatura actual y un estuche. Pon el móvil en otra habitación o activa el Modo Sin Distracciones.',
        timeEstimate: '1 min',
      },
      {
        stepNumber: 2,
        heading: 'El Pacto de los 5 Minutos',
        action:
          'Dite a ti mismo: "Solo voy a hacer el Micro-Paso 1 durante 5 minutos". En el 90% de los casos, una vez superada la fricción de arrancar, tu cerebro entra en foco y continúas sin esfuerzo.',
        timeEstimate: '5 min',
      },
      {
        stepNumber: 3,
        heading: 'Recompensa Inmediata tras el Bloque',
        action:
          'En cuanto termines el micro-paso, márcalo con el check verde en ClotFocus para escuchar la confirmación y sumar tus Puntos de Estudio (PE) y minutos de descanso Anime.',
        timeEstimate: 'Al terminar',
      },
    ],
  },
];

// ============================================================================
// 10. FUNCIONES DE FUSIÓN Y SINCRONIZACIÓN AUTOMÁTICA
// ============================================================================
export function enrichCourseSubjectsWithExtraContent(
  course: CourseGrade,
  baseSubjects: SyllabusSubject[]
): SyllabusSubject[] {
  // 1. Append extra units to existing subjects
  const withExtraUnits = baseSubjects.map((subj) => {
    const extraMatch = EXTRA_UNITS_BY_SUBJECT.find(
      (item) => item.course === course && item.subjectId === subj.id
    );
    const combinedRawUnits = [...subj.units];

    if (extraMatch) {
      extraMatch.extraUnits.forEach((eu) => {
        const alreadyExists = combinedRawUnits.some((u) => u.title === eu.title);
        if (!alreadyExists) {
          const nextNum = combinedRawUnits.length + 1;
          const newUnitId = `${subj.id}-ext-u${nextNum}`;
          combinedRawUnits.push({
            id: newUnitId,
            unitNumber: nextNum,
            title: eu.title,
            summary: eu.summary,
            durationMin: 15,
            studyPoints: 165,
            keyConcepts: eu.keyConcepts,
            visualScheme: [eu.scheme1, eu.scheme2],
            practicalExample: eu.practicalExample,
            quickQuiz: [
              {
                id: `${newUnitId}-q1`,
                question: eu.quizQ,
                options: eu.quizOptions,
                correctIndex: eu.correctIndex,
                explanation: eu.quizExp,
              },
            ],
          });
        }
      });
    }

    // Also expand each unit's quickQuiz to 3 questions so every unit has a complete mini-test
    const unitsWithFullQuiz = combinedRawUnits.map((u, idx) => ({
      ...u,
      unitNumber: idx + 1,
      quickQuiz: buildExtendedQuizForUnit(u),
    }));

    return {
      ...subj,
      totalUnits: unitsWithFullQuiz.length,
      units: unitsWithFullQuiz,
    };
  });

  // 2. Append any extra full subjects for this course (e.g. 2eso-bio, 3eso-tec, 4eso-ing, 1bach-hmc, 2bach-cie)
  const extraCourseSubjs = EXTRA_COURSE_SUBJECTS.filter((es) => es.course === course);
  const formattedExtraSubjs: SyllabusSubject[] = extraCourseSubjs
    .filter((es) => !withExtraUnits.some((s) => s.id === es.id))
    .map((es) => {
      const units: SyllabusUnit[] = es.units.map((u, idx) => {
        const unitObj: SyllabusUnit = {
          id: `${es.id}-u${idx + 1}`,
          unitNumber: idx + 1,
          title: u.title,
          summary: u.summary,
          durationMin: 15,
          studyPoints: 165,
          keyConcepts: u.keyConcepts,
          visualScheme: [u.scheme1, u.scheme2],
          practicalExample: u.practicalExample,
          quickQuiz: [
            {
              id: `${es.id}-u${idx + 1}-q1`,
              question: u.quizQ,
              options: u.quizOptions,
              correctIndex: u.correctIndex,
              explanation: u.quizExp,
            },
          ],
        };
        return {
          ...unitObj,
          quickQuiz: buildExtendedQuizForUnit(unitObj),
        };
      });

      return {
        id: es.id,
        name: es.name,
        shortCode: es.shortCode,
        courses: [course],
        description: es.description,
        totalUnits: units.length,
        units,
      };
    });

  return [...withExtraUnits, ...formattedExtraSubjs];
}

export function syncTasksWithDefaultCatalog(existingTasks: SchoolTask[]): SchoolTask[] {
  const merged = COURSE_DEFAULT_TASKS.map((defTask) => {
    const prev = existingTasks.find((t) => t.id === defTask.id);
    return prev ? prev : defTask;
  });
  const userCreated = existingTasks.filter(
    (t) => !COURSE_DEFAULT_TASKS.some((def) => def.id === t.id)
  );
  return [...userCreated, ...merged];
}

export function syncCornellWithDefaultCatalog(existingNotes: CornellNote[]): CornellNote[] {
  const merged = PRELOADED_CORNELL_NOTES.map((defNote) => {
    const prev = existingNotes.find((n) => n.id === defNote.id);
    return prev ? prev : defNote;
  });
  const userCreated = existingNotes.filter(
    (n) => !PRELOADED_CORNELL_NOTES.some((def) => def.id === n.id)
  );
  return [...userCreated, ...merged];
}
