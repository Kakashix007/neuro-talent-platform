import type { Lang } from './i18n'

export interface ModuleItem {
  id: number
  coverClass: string
  pillarId: 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4'
  pillarName: Record<Lang, string>
  status: 'completed' | 'in_progress' | 'up_next'
  durationMinutes: number
  lessonsCount: number
  title: Record<Lang, string>
  meta: Record<Lang, string>
  summary: Record<Lang, string>
  protocolName: Record<Lang, string>
  scientificRef: string
  lessons: Record<Lang, string[]>
}

export interface ResourceItem {
  id: string
  category: 'audio' | 'video' | 'guide'
  duration: Record<Lang, string>
  title: Record<Lang, string>
  description: Record<Lang, string>
  takeaways: Record<Lang, string[]>
  audioScript?: Record<Lang, string[]>
}

export interface NotificationItem {
  id: string
  unread: boolean
  time: Record<Lang, string>
  title: Record<Lang, string>
  body: Record<Lang, string>
  targetView: 'overview' | 'assessment' | 'learning' | 'progress' | 'reports' | 'resources'
}

export interface ScheduleSession {
  id: string
  date: Record<Lang, string>
  time: string
  title: Record<Lang, string>
  type: Record<Lang, string>
  facilitator: string
}

export interface PsychometricItem {
  id: string
  pillarId: 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4'
  itemCode: string
  targetModuleId: number
  question: Record<Lang, string>
  help: Record<Lang, string>
}

// 12 Items psychométriques conformes aux spécifications NotebookLM (Article 2 §1.4)
export const psychometricItems: PsychometricItem[] = [
  // PILIER I : Attention & Clarté Mentale
  {
    id: 'q-i-1',
    pillarId: 'pillar1',
    itemCode: 'I.1',
    targetModuleId: 1,
    question: {
      fr: 'En contexte de travail sur un dossier complexe ou stratégique du Ministère, parvenez-vous à maintenir une attention soutenue sans céder aux distractions (emails, notifications, sollicitations directes) pendant au moins 45 minutes ?',
      ar: 'أثناء معالجة ملف استراتيجي أو معقد بالوزارة، هل تتمكن من الحفاظ على تركيز مستمر لمدة 45 دقيقة على الأقل دون الاستسلام للمشتتات (البريد، الإشعارات، المقاطعات المباشرة)؟',
      en: 'When working on a complex or strategic Ministry file, can you sustain uninterrupted attention for at least 45 minutes without yielding to distractions (emails, notifications, interruptions)?',
    },
    help: {
      fr: 'Module M1 · Deep Work & Résidu attentionnel (Dr Sophie Leroy)',
      ar: 'الوحدة 1 · العمل العميق وتصفية بقايا الانتباه (د. صوفي ليروي)',
      en: 'Module M1 · Deep Work & Attention Residue (Dr. Sophie Leroy)',
    },
  },
  {
    id: 'q-i-2',
    pillarId: 'pillar1',
    itemCode: 'I.2',
    targetModuleId: 2,
    question: {
      fr: 'Face à un flux massif d’informations, de notes de synthèse et de courriels urgents, parvenez-vous à filtrer l’essentiel sans ressentir de surcharge ou de saturation cognitive ?',
      ar: 'أمام التدفق المكثف للمعلومات والمذكرات والرسائل العاجلة، هل تنجح في تصفية واستخلاص الجوهر دون الشعور بالإرهاق أو التشبع المعرفي؟',
      en: 'Faced with heavy flows of information, synthesis notes, and urgent emails, can you filter the essential without feeling cognitive overload or saturation?',
    },
    help: {
      fr: 'Module M2 · Gestion de l’infobésité & Charge cognitive (Pr John Sweller)',
      ar: 'الوحدة 2 · إدارة الانفجار المعلوماتي والحمل المعرفي (بروفيسور جون سويلر)',
      en: 'Module M2 · Digital Overload & Cognitive Load Theory (Prof. John Sweller)',
    },
  },
  {
    id: 'q-i-3',
    pillarId: 'pillar1',
    itemCode: 'I.3',
    targetModuleId: 3,
    question: {
      fr: 'Lorsque vous devez traiter plusieurs arbitrages simultanés, parvenez-vous à structurer vos idées et vos priorités de manière claire sans altérer votre mémoire de travail ?',
      ar: 'عند مواجهة عدة ملفات للتحكيم في آن واحد، هل تتمكن من تنظيم أفكارك وأولوياتك بوضوح دون استنزاف ذاكرة العمل لديك؟',
      en: 'When handling multiple concurrent arbitrations, can you structure your ideas and priorities clearly without exhausting your working memory?',
    },
    help: {
      fr: 'Module M3 · Mémoire de travail & Décharge cognitive (Pr Alan Baddeley & Nelson Cowan)',
      ar: 'الوحدة 3 · ذاكرة العمل والتفريغ المعرفي المنظم (بروفيسور ألان بادلي ونيلسون كوان)',
      en: 'Module M3 · Working Memory & Cognitive Offloading (Prof. Alan Baddeley & Nelson Cowan)',
    },
  },

  // PILIER II : Régulation Émotionnelle & Gestion du Stress
  {
    id: 'q-ii-1',
    pillarId: 'pillar2',
    itemCode: 'II.1',
    targetModuleId: 4,
    question: {
      fr: 'Face à une situation imprévue, une urgence ministérielle ou une réunion à fort enjeu, parvenez-vous à maintenir votre clarté d’esprit sans basculer dans l’irritabilité ou l’anxiété ?',
      ar: 'في مواجهة طارئ مهني غير متوقع أو اجتماع عالي الحساسية، هل تحافظ على هدوء تفكيرك دون الانزلاق إلى التوتر أو التشنج الانفعالي؟',
      en: 'Facing an unexpected ministry emergency or a high-stakes meeting, can you maintain mental clarity without drifting into irritability or anxiety?',
    },
    help: {
      fr: 'Module M4 · Réévaluation cognitive & Calme sous pression (Pr James Gross)',
      ar: 'الوحدة 4 · إعادة التقييم المعرفي والهدوء تحت الضغط (بروفيسور جيمس غروس)',
      en: 'Module M4 · Cognitive Reappraisal & Poise Under Pressure (Prof. James Gross)',
    },
  },
  {
    id: 'q-ii-2',
    pillarId: 'pillar2',
    itemCode: 'II.2',
    targetModuleId: 5,
    question: {
      fr: 'En cas de pic de tension ou de stress intense, parvenez-vous à utiliser des techniques autonomes de régulation (ex. respiration résonante, pauses neuro-sensibles) pour revenir rapidement au calme ?',
      ar: 'عند ذروة الضغط العصبي، هل تستخدم تقنيات ذاتية للتنظيم (مثل التنفس الإيقاعي المتزن، الاستراحات العصبية) للعودة بسرعة إلى حالة التوازن؟',
      en: 'During intense stress peaks, can you employ autonomous regulation techniques (e.g. resonant breathing, neuro-sensory pauses) to restore calm rapidly?',
    },
    help: {
      fr: 'Module M5 · Variabilité cardiaque & Cohérence 0,1 Hz (Dr Stephen Porges & Dr Andrew Huberman)',
      ar: 'الوحدة 5 · التباين القلبي والاتساق العصبي 0.1 هرتز (د. ستيفن بورغيس ود. أندرو هوبرمان)',
      en: 'Module M5 · Heart Rate Variability & 0.1 Hz Coherence (Dr. Stephen Porges & Dr. Andrew Huberman)',
    },
  },
  {
    id: 'q-ii-3',
    pillarId: 'pillar2',
    itemCode: 'II.3',
    targetModuleId: 6,
    question: {
      fr: 'À la fin d’une journée dense en décisions et réunions, parvenez-vous à préserver votre niveau d’énergie cognitive et à opérer une réelle déconnexion professionnelle le soir ?',
      ar: 'في نهاية يوم حافل بالقرارات والاجتماعات، هل تحتفظ بطاقتك المعرفية وتنجح في تحقيق فصل مهني حقيقي في المساء؟',
      en: 'At the end of a demanding day of decisions and meetings, can you preserve your cognitive energy and achieve real professional disconnection in the evening?',
    },
    help: {
      fr: 'Module M6 · Fatigue décisionnelle & Récupération active (Pr Roy Baumeister & Marcus Raichle)',
      ar: 'الوحدة 6 · إجهاد اتخاذ القرار والاستشفاء النشط (بروفيسور روي بوميستر وماركوس رايشل)',
      en: 'Module M6 · Decision Fatigue & Active Cognitive Recovery (Prof. Roy Baumeister & Marcus Raichle)',
    },
  },

  // PILIER III : Prise de Décision & Agilité Stratégique
  {
    id: 'q-iii-1',
    pillarId: 'pillar3',
    itemCode: 'III.1',
    targetModuleId: 7,
    question: {
      fr: 'Lors de prises de décision stratégiques, parvenez-vous à suspendre vos automatismes (Système 1) et biais cognitifs pour analyser froidement les données factuelles (Système 2) ?',
      ar: 'خلال اتخاذ القرارات الاستراتيجية، هل تنجح في تجميد الاستجابات التلقائية السريعة (النظام 1) والانحيازات لفحص البيانات الواقعية بموضوعية (النظام 2)؟',
      en: 'When making strategic decisions, can you suspend automatic heuristics (System 1) and biases to analyze factual data objectively (System 2)?',
    },
    help: {
      fr: 'Module M7 · Débiasing & Méthode du Pre-Mortem (Daniel Kahneman & Gary Klein)',
      ar: 'الوحدة 7 · تفكيك الانحيازات وطريقة التشريح الاستباقي (دانيال كانمان وغاري كلاين)',
      en: 'Module M7 · Cognitive Debiasing & Pre-Mortem Protocol (Daniel Kahneman & Gary Klein)',
    },
  },
  {
    id: 'q-iii-2',
    pillarId: 'pillar3',
    itemCode: 'III.2',
    targetModuleId: 8,
    question: {
      fr: 'Lorsqu’un projet ministériel rencontre un blocage procédural ou organisationnel, parvenez-vous à ajuster rapidement votre posture et à élaborer des solutions alternatives innovantes ?',
      ar: 'عند تعثر مشروع إداري نتيجة عائق مسطري أو تنظيمي، هل تبادر بتعديل مقاربتك بسرعة وابتكار حلول بديلة فعالة؟',
      en: 'When a ministry project encounters procedural roadblocks, can you quickly shift perspective and formulate innovative alternative pathways?',
    },
    help: {
      fr: 'Module M8 · Flexibilité mentale & Cortex cingulaire antérieur (ACC)',
      ar: 'الوحدة 8 · المرونة الذهنية والقشرة الحزامية الأمامية (بروفيسور جاك فرادان)',
      en: 'Module M8 · Mental Flexibility & Anterior Cingulate Cortex Set-Shifting',
    },
  },
  {
    id: 'q-iii-3',
    pillarId: 'pillar3',
    itemCode: 'III.3',
    targetModuleId: 9,
    question: {
      fr: 'Face à un environnement incertain ou incomplet, parvenez-vous à évaluer objectivement les risques et les scénarios probables avant d’engager une décision administrative ?',
      ar: 'في سياق يتسم بعدم اليقين أو نقص البيانات، هل تقيّم المخاطر والسيناريوهات المحتملة بموضوعية قبل اعتماد القرار الإداري؟',
      en: 'Facing an uncertain or incomplete operating context, can you objectively evaluate risks and probabilistic scenarios before committing an administrative decision?',
    },
    help: {
      fr: 'Module M9 · Pensée critique & Matrice probabiliste M.A.P.S. (Cass Sunstein)',
      ar: 'الوحدة 9 · التفكير النقدي ومصفوفة السيناريوهات الاحتمالية (كاس سنستين)',
      en: 'Module M9 · Critical Thinking & Probabilistic Scenario Matrix (Cass Sunstein)',
    },
  },

  // PILIER IV : Co-Régulation, Leadership & Intelligence Collective
  {
    id: 'q-iv-1',
    pillarId: 'pillar4',
    itemCode: 'IV.1',
    targetModuleId: 10,
    question: {
      fr: 'Lors de réunions de travail ou d’échanges interservices, parvenez-vous à écouter pleinement les arguments opposés sans interrompre ni réagir sous le coup de l’émotion ?',
      ar: 'خلال الاجتماعات المشتركة بين المصالح، هل تُصغي بانتباه كامل للآراء المخالفة دون مقاطعة ودون انفعال دفاعي مسبق؟',
      en: 'In inter-service working meetings, can you listen fully to opposing perspectives without interrupting or reacting defensively?',
    },
    help: {
      fr: 'Module M10 · Neurones miroirs & Écoute active co-régulée (Pr Giacomo Rizzolatti)',
      ar: 'الوحدة 10 · الخلايا المرآتية والإصغاء المشترك (بروفيسور جياكومو ريزولاتي)',
      en: 'Module M10 · Mirror Neurons & Co-Regulated Active Listening (Prof. Giacomo Rizzolatti)',
    },
  },
  {
    id: 'q-iv-2',
    pillarId: 'pillar4',
    itemCode: 'IV.2',
    targetModuleId: 11,
    question: {
      fr: 'Dans la gestion de vos collaborateurs ou partenaires, parvenez-vous à instaurer un climat de confiance où l’erreur est traitée comme une opportunité d’apprentissage plutôt qu’une faute ?',
      ar: 'في تعاملك مع فريق العمل أو الشركاء، هل تنجح في إرساء بيئة ثقة يُنظر فيها للخطأ كفرصة للتعلم والتطوير وليس كذريعة للّوم؟',
      en: 'In guiding colleagues or partners, can you cultivate a climate of trust where mistakes are treated as learning insights rather than blame?',
    },
    help: {
      fr: 'Module M11 · Climat de sécurité psychologique & Débriefing sans blâme (Pr Amy Edmondson)',
      ar: 'الوحدة 11 · مناخ الأمان النفسي والمراجعة البناءة دون لوم (بروفيسور إيمي إدموندسون)',
      en: 'Module M11 · Psychological Safety & Blameless Debriefing (Prof. Amy Edmondson)',
    },
  },
  {
    id: 'q-iv-3',
    pillarId: 'pillar4',
    itemCode: 'IV.3',
    targetModuleId: 12,
    question: {
      fr: 'En situation de désaccord ou de négociation avec des parties prenantes, parvenez-vous à identifier les intérêts sous-jacents plutôt que de rester bloqué sur des positions rigides ?',
      ar: 'في سياق التفاوض أو الخلاف مع الأطراف المعنية، هل تتمكن من سبر المصالح والاحتياجات الحقيقية بدلاً من التمترس خلف مواقف حدية؟',
      en: 'In negotiations with internal/external stakeholders, can you uncover underlying interests rather than staying locked in rigid positions?',
    },
    help: {
      fr: 'Module M12 · Négociation raisonnée de Harvard & Clarté relationnelle (William Ury & Roger Fisher)',
      ar: 'الوحدة 12 · التفاوض المرتكز على المصالح بهارفارد والوضوح التواصلي (ويليام أوري وروجر فيشر)',
      en: 'Module M12 · Harvard Principled Negotiation & Relationship Clarity (William Ury & Roger Fisher)',
    },
  },
]

// L'ensemble des 12 modules officiels (Article 2 §1.2 & §1.5)
export const initialModules: ModuleItem[] = [
  // --- PILIER I : ATTENTION & CLARTÉ MENTALE ---
  {
    id: 1,
    coverClass: 'cover-0',
    pillarId: 'pillar1',
    pillarName: {
      fr: 'Pilier I : Attention & Clarté Mentale',
      ar: 'المحور 1: الانتباه والصفاء الذهني',
      en: 'Pillar I: Attention & Mental Clarity',
    },
    status: 'completed',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Dr. Sophie Leroy (Attention Residue) & Pr. Earl Miller (MIT)',
    protocolName: {
      fr: 'Protocole Bloc Hermétique 45/10',
      ar: 'بروتوكول فترات التركيز المحكمة 45/10',
      en: '45/10 Hermetic Focus Protocol',
    },
    title: {
      fr: 'M1 · Maîtrise de l’Attention et Focus Profond (Deep Work)',
      ar: 'و1 · إتقان الانتباه والعمل العميق (Deep Work)',
      en: 'M1 · Attention Mastery & Deep Work',
    },
    meta: {
      fr: '4 leçons · 40 min · Validé ✓',
      ar: '4 دروس · 40 دقيقة · مكتملة ✓',
      en: '4 lessons · 40 min · Completed ✓',
    },
    summary: {
      fr: 'Neutralisez le résidu attentionnel et structurez des séquences de travail profond ininterrompues pour les dossiers stratégiques.',
      ar: 'تصفية بقايا التشتت الذهني وهيكلة فترات عمل عميق غير منقطعة لمعالجة الملفات الوزارية الهامة.',
      en: 'Eliminate attention residue and establish uninterrupted deep-work sequences for high-stakes strategic briefs.',
    },
    lessons: {
      fr: [
        '1.1. La Neurobiologie du Résidu Attentionnel (Dr Sophie Leroy)',
        '1.2. La Méthode des Blocs Temporels Hermétiques (45/10)',
        '1.3. La Neutralisation des Micro-Interruptions au Ministère',
        '1.4. L’Ancrage du Flow et le Rituel d’Immersion',
      ],
      ar: [
        '1.1. بيولوجيا بقايا الانتباه والتشتت الذهني (د. صوفي ليروي)',
        '1.2. طريقة الفترات الزمنية المحكمة (45 دقيقة تركيز / 10 استراحة)',
        '1.3. تحييد المقاطعات والمنبهات المفاجئة أثناء العمل',
        '1.4. طقس الدخول السريع في حالة الاستغراق الذهني (Flow)',
      ],
      en: [
        '1.1. The Neuroscience of Attention Residue (Dr. Sophie Leroy)',
        '1.2. The 45/10 Hermetic Time-Blocking Technique',
        '1.3. Neutralizing Micro-Interruptions in Administrative Work',
        '1.4. Anchoring Deep Flow & The Immersion Ritual',
      ],
    },
  },
  {
    id: 2,
    coverClass: 'cover-1',
    pillarId: 'pillar1',
    pillarName: {
      fr: 'Pilier I : Attention & Clarté Mentale',
      ar: 'المحور 1: الانتباه والصفاء الذهني',
      en: 'Pillar I: Attention & Mental Clarity',
    },
    status: 'completed',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Pr. John Sweller (Cognitive Load) & Pr. Larry Rosen',
    protocolName: {
      fr: 'Méthode de Tri Asynchrone R.A.I.D.',
      ar: 'منهجية الفرز التتابعي للبريد (R.A.I.D)',
      en: 'R.A.I.D. Asynchronous Email Batching',
    },
    title: {
      fr: 'M2 · Gestion de l’Hyperconnexion & Surcharge Informationnelle',
      ar: 'و2 · تنظيم الاتصال المفرط ومقاومة الانفجار المعلوماتي',
      en: 'M2 · Hyperconnection Management & Digital Decompression',
    },
    meta: {
      fr: '4 leçons · 40 min · Validé ✓',
      ar: '4 دروس · 40 دقيقة · مكتملة ✓',
      en: '4 lessons · 40 min · Completed ✓',
    },
    summary: {
      fr: 'Filtrez la charge cognitive extrinsèque, brisez la boucle dopaminergique des alertes et instaurez un traitement asynchrone par lots.',
      ar: 'تقليل العبء المعرفي الزائد، إيقاف إدمان الإشعارات المتتالية، واعتماد المعالجة المجمعة للرسائل في أوقات محددة.',
      en: 'Mitigate extrinsic cognitive load, disrupt notification dopamine loops, and install disciplined asynchronous batching.',
    },
    lessons: {
      fr: [
        '2.1. Anatomie de la Surcharge et Boucle Dopaminergique',
        '2.2. Filtrage de la Charge Extrinsèque et Bruit Numérique',
        '2.3. La Consultation Séquentielle Asynchrone (Batching RAID)',
        '2.4. L’Hygiène Attentionnelle et le Couvre-Feu Numérique',
      ],
      ar: [
        '2.1. تشريح الإجهاد المعلوماتي ومصيدة الدوبامين الرقمية',
        '2.2. تصفية الضوضاء السمعية والبصرية غير الضرورية',
        '2.3. المعالجة المجمعة عبر منهجية RAID في نوافذ محددة',
        '2.4. حماية الحدود الذهنية وإغلاق الاتصال المهني مساءً',
      ],
      en: [
        '2.1. Anatomy of Overload & The Dopaminergic Notification Loop',
        '2.2. Filtering Extrinsic Load and Administrative Digital Noise',
        '2.3. Asynchronous Batch Processing (The RAID Framework)',
        '2.4. Cognitive Boundaries & The Evening Digital Sunset',
      ],
    },
  },
  {
    id: 3,
    coverClass: 'cover-2',
    pillarId: 'pillar1',
    pillarName: {
      fr: 'Pilier I : Attention & Clarté Mentale',
      ar: 'المحور 1: الانتباه والصفاء الذهني',
      en: 'Pillar I: Attention & Mental Clarity',
    },
    status: 'completed',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Pr. Alan Baddeley, Nelson Cowan (4 Chunks) & Pr. Evan Risko',
    protocolName: {
      fr: 'Matrice de Décharge Stratégique 1-3-5',
      ar: 'مصفوفة التفريغ المعرفي الاستراتيجي 1-3-5',
      en: '1-3-5 Strategic Cognitive Offloading Matrix',
    },
    title: {
      fr: 'M3 · Mémoire de Travail & Structuration de l’Information Complexe',
      ar: 'و3 · ذاكرة العمل وهيكلة المعطيات والملفات المعقدة',
      en: 'M3 · Working Memory & Complex Information Chunking',
    },
    meta: {
      fr: '4 leçons · 40 min · Validé ✓',
      ar: '4 دروس · 40 دقيقة · مكتملة ✓',
      en: '4 lessons · 40 min · Completed ✓',
    },
    summary: {
      fr: 'Surmontez le plafond des 4 chunks de mémoire vive en appliquant la décharge cognitive externe et la cartographie conceptuelle.',
      ar: 'تجاوز حدود استيعاب ذاكرة العمل (4 وحدات كحد أقصى) عبر التفريغ الخارجي الممنهج ورسم الخرائط الذهنية للملفات.',
      en: 'Bypass the biological 4-chunk bottleneck of working memory using external cognitive offloading and conceptual mapping.',
    },
    lessons: {
      fr: [
        '3.1. Les Limites Biologiques de la Mémoire de Travail',
        '3.2. L’Art du "Chunking" et de la Catégorisation Visuelle',
        '3.3. La Décharge Cognitive et le Second Cerveau Structuré',
        '3.4. Synthèse Visuelle et Cartographie Conceptuelle pour l’Arbitrage',
      ],
      ar: [
        '3.1. القيود الحيوية لذاكرة العمل وكيفية تجنب انسدادها',
        '3.2. فن التجميع المنطقي (Chunking) وتصنيف المعطيات',
        '3.3. التفريغ المعرفي وبناء المستودع الخارجي للأفكار',
        '3.4. الصياغة التركيبية والخرائط الميسرة للقرار الإداري',
      ],
      en: [
        '3.1. Biological Constraints of Human Working Memory',
        '3.2. The Science of Chunking and Structural Grouping',
        '3.3. Cognitive Offloading: Freeing Working Memory Bandwidth',
        '3.4. Visual Briefing & Executive Concept Mapping',
      ],
    },
  },

  // --- PILIER II : RÉGULATION ÉMOTIONNELLE & GESTION DU STRESS ---
  {
    id: 4,
    coverClass: 'cover-0',
    pillarId: 'pillar2',
    pillarName: {
      fr: 'Pilier II : Régulation Émotionnelle & Gestion du Stress',
      ar: 'المحور 2: التنظيم الانفعالي وإدارة الضغوط المهنية',
      en: 'Pillar II: Emotional Regulation & Stress Resilience',
    },
    status: 'in_progress',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Pr. James Gross (Stanford) & Pr. Antonio Damasio',
    protocolName: {
      fr: 'Protocole de Neutralité D.E.C.O.D.E.',
      ar: 'بروتوكول التوازن الانفعالي DECODE',
      en: 'D.E.C.O.D.E. Executive Neutrality Protocol',
    },
    title: {
      fr: 'M4 · Régulation Émotionnelle et Calme sous Pression',
      ar: 'و4 · التنظيم الانفعالي والحفاظ على الثبات تحت الضغط',
      en: 'M4 · Emotional Regulation & Poise Under Pressure',
    },
    meta: {
      fr: '4 leçons · 15 min restantes',
      ar: '4 دروس · متبقي 15 دقيقة',
      en: '4 lessons · 15 min remaining',
    },
    summary: {
      fr: 'Désactivez l’hyperactivité amygdalienne par la réévaluation cognitive précoce et préservez une impartialité absolue en réunion.',
      ar: 'تهدئة مركز الإنذار الانفعالي (اللوزة الدماغية) بإعادة التأطير السريع، وصون الحياد والهدوء في الاجتماعات الحساسة.',
      en: 'Down-regulate amygdala hyperactivity through early reappraisal and maintain unflappable executive composure.',
    },
    lessons: {
      fr: [
        '4.1. Neurobiologie des Émotions et Piège de l’Inhibition',
        '4.2. L’Art de la Réévaluation Cognitive Précoce (Gross)',
        '4.3. La Technique du Nommage Émotionnel (Affect Labeling)',
        '4.4. Le Protocole de Neutralité Émotionnelle D.E.C.O.D.E. en Réunion',
      ],
      ar: [
        '4.1. علم أعصاب المشاعر ومخاطر الكبت الداخلي',
        '4.2. فن إعادة التقييم المعرفي الاستباقي (نموذج غروس)',
        '4.3. تسمية الشعور وتأثيرها الفوري في خفض التوتر العصبي',
        '4.4. بروتوكول DECODE لإدارة المواقف الخلافية في العمل',
      ],
      en: [
        '4.1. Affective Neuroscience & The Hidden Cost of Suppression',
        '4.2. Early Cognitive Reappraisal Mechanisms (James Gross)',
        '4.3. Prefrontal Affect Labeling: Name it to Tame It',
        '4.4. The D.E.C.O.D.E. Meeting Poise Protocol',
      ],
    },
  },
  {
    id: 5,
    coverClass: 'cover-2',
    pillarId: 'pillar2',
    pillarName: {
      fr: 'Pilier II : Régulation Émotionnelle & Gestion du Stress',
      ar: 'المحور 2: التنظيم الانفعالي وإدارة الضغوط المهنية',
      en: 'Pillar II: Emotional Regulation & Stress Resilience',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Dr. Stephen Porges (Polyvagal) & Dr. Andrew Huberman (Stanford)',
    protocolName: {
      fr: 'Protocole 365 de Cohérence Résonante (0,1 Hz)',
      ar: 'بروتوكول 365 للاتساق القلبي-العصبي (0.1 هرتز)',
      en: '365 Resonant Coherence Protocol (0.1 Hz)',
    },
    title: {
      fr: 'M5 · Maîtrise du Stress Aigu et Variabilité Cardiaque',
      ar: 'و5 · التحكم في التوتر الحاد وتطوير التباين القلبي',
      en: 'M5 · Acute Stress Modulation & Vagal Tone Optimization',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Activez le frein vagal en 30 secondes grâce au soupir physiologique et pratiquez la cohérence à fréquence résonante (6 cycles/min).',
      ar: 'تفعيل الفرامل العصبية في 30 ثانية بتقنية الزفير المزدوج، وتثبيت نمط التنفس الإيقاعي 6 مرات بالدقيقة.',
      en: 'Engage the vagal brake in under 30 seconds with physiological sighs and build robust 0.1 Hz coherence.',
    },
    lessons: {
      fr: [
        '5.1. Physiologie du Stress Aigu et Système Nerveux Autonome',
        '5.2. La Variabilité Cardiaque (VFC) et le Frein Vagal Parasympathique',
        '5.3. Le Soupir Physiologique d’Urgence en Moins de 30s',
        '5.4. La Pratique Structurée du Protocole 365 de Cohérence (0,1 Hz)',
      ],
      ar: [
        '5.1. فسيولوجيا الضغط الحاد والجهاز العصبي الذاتي',
        '5.2. التباين القلبي وعمل العصب الحائر في خفض الإجهاد',
        '5.3. التنهد الفسيولوجي المزدوج لخفض التوتر في 30 ثانية',
        '5.4. التطبيق المنتظم لبروتوكول الاتساق الإيقاعي 365',
      ],
      en: [
        '5.1. Autonomic Nervous System & Acute Stress Cascades',
        '5.2. Heart Rate Variability (HRV) and The Vagal Brake',
        '5.3. The 30-Second Emergency Physiological Sigh (Huberman)',
        '5.4. Structured 365 Daily Resonant Coherence Practice (0.1 Hz)',
      ],
    },
  },
  {
    id: 6,
    coverClass: 'cover-1',
    pillarId: 'pillar2',
    pillarName: {
      fr: 'Pilier II : Régulation Émotionnelle & Gestion du Stress',
      ar: 'المحور 2: التنظيم الانفعالي وإدارة الضغوط المهنية',
      en: 'Pillar II: Emotional Regulation & Stress Resilience',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Pr. Roy Baumeister (Ego Depletion) & Pr. Marcus Raichle (DMN)',
    protocolName: {
      fr: 'Protocole de Préservation Décisionnelle P.C.D.',
      ar: 'بروتوكول الحفاظ على الطاقة التقريرية (P.C.D)',
      en: 'P.C.D. Decision Capital Preservation Protocol',
    },
    title: {
      fr: 'M6 · Prévention de la Fatigue Décisionnelle & Récupération Active',
      ar: 'و6 · الوقاية من إجهاد اتخاذ القرار والاستشفاء المعرفي',
      en: 'M6 · Decision Fatigue Prevention & Active Recovery',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Préservez le glucose préfrontal en routinisant les choix secondaires et pratiquez la défocalisation visuelle panoramique.',
      ar: 'حماية الرصيد الاستيعابي للدماغ عبر تقليل الخيارات الثانوية، واعتماد فترات استرخاء بصري أفقية لتجديد النشاط.',
      en: 'Conserve executive prefrontal energy by automating minor choices and applying panoramic optic defocus.',
    },
    lessons: {
      fr: [
        '6.1. Neurobiologie de la Fatigue Décisionnelle et Épuisement de l’Ego',
        '6.2. Cartographie et Hiérarchisation du Capital Décisionnel Quotidien',
        '6.3. La Routinisation des Choix Secondaires au Ministère',
        '6.4. Pauses Neuro-Restauratives en Vision Panoramique et Déconnexion',
      ],
      ar: [
        '6.1. استنزاف طاقة الإرادة وإجهاد الاختيارات المتتالية',
        '6.2. جدولة القرارات المصيرية في فترات الذروة الصباحية',
        '6.3. أتمتة الروتينات الإدارية لتوفير الطاقة الذهنية',
        '6.4. استراحات الرؤية البانورامية وتصفية الذهن بعد الدوام',
      ],
      en: [
        '6.1. Metabolic Limits of Executive Function & Ego Depletion',
        '6.2. Mapping Daily Executive Energy to High-Stakes Decisions',
        '6.3. Automating Secondary Administrative Logistics',
        '6.4. Neuro-Restorative Micro-Breaks & Panoramic Defocus',
      ],
    },
  },

  // --- PILIER III : PRISE DE DÉCISION & AGILITÉ STRATÉGIQUE ---
  {
    id: 7,
    coverClass: 'cover-2',
    pillarId: 'pillar3',
    pillarName: {
      fr: 'Pilier III : Prise de Décision & Agilité Stratégique',
      ar: 'المحور 3: اتخاذ القرارات والرشاقة الاستراتيجية',
      en: 'Pillar III: Strategic Decision-Making & Cognitive Agility',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Daniel Kahneman, Amos Tversky & Dr. Gary Klein',
    protocolName: {
      fr: 'Protocole de Pre-Mortem Décisionnel P.M.D.',
      ar: 'بروتوكول التشريح الاستباقي للقرارات (P.M.D)',
      en: 'P.M.D. Decision Pre-Mortem Protocol',
    },
    title: {
      fr: 'M7 · Prise de Décision Stratégique et Biais Cognitifs',
      ar: 'و7 · اتخاذ القرارات الاستراتيجية ومكافحة الانحيازات المعرفية',
      en: 'M7 · Strategic Decision-Making & Cognitive Debiasing',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Basculez délibérément du Système 1 au Système 2 et appliquez la simulation prospective d’échec (Pre-Mortem) sur les projets clés.',
      ar: 'الانتقال الواعي من التفكير العفوي (النظام 1) إلى التحليل المنهجي (النظام 2)، وتطبيق التشريح الاستباقي على المشاريع الكبرى.',
      en: 'Deliberately disengage System 1 heuristics, recruit System 2 analytics, and apply Gary Klein’s Pre-Mortem framework.',
    },
    lessons: {
      fr: [
        '7.1. L’Architecture Duale du Cerveau : Système 1 vs Système 2',
        '7.2. Cartographie des Biais Cognitifs en Milieu Administratif',
        '7.3. L’Inhibition Cognitive et le Contrôle de l’Ancrage Chiffré',
        '7.4. Le Protocole de Pre-Mortem Décisionnel Ministère (P.M.D.)',
      ],
      ar: [
        '7.1. المعمارية المزدوجة للدماغ: النظام 1 مقابل النظام 2',
        '7.2. خريطة الانحيازات المعرفية الشائعة في الإدارة العمومية',
        '7.3. التحكم التثبيطي ومقاومة أثر التثبيت الرقمي المسبق',
        '7.4. التطبيق العملي لبروتوكول التشريح الاستباقي للمشاريع',
      ],
      en: [
        '7.1. The Dual-System Brain: System 1 Heuristics vs. System 2 Logic',
        '7.2. Mapping Administrative Cognitive Biases (Anchoring, Confirmation)',
        '7.3. Executive Prefrontal Inhibition & Anchor Neutralization',
        '7.4. Running the Ministry Decision Pre-Mortem Protocol (P.M.D.)',
      ],
    },
  },
  {
    id: 8,
    coverClass: 'cover-0',
    pillarId: 'pillar3',
    pillarName: {
      fr: 'Pilier III : Prise de Décision & Agilité Stratégique',
      ar: 'المحور 3: اتخاذ القرارات والرشاقة الاستراتيجية',
      en: 'Pillar III: Strategic Decision-Making & Cognitive Agility',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Cortex Cingulaire Antérieur (ACC) & Pr. Jacques Fradin',
    protocolName: {
      fr: 'Recadrage Triangulaire de Problème Bloqué R.T.P.',
      ar: 'بروتوكول إعادة التأطير الثلاثي للملفات المعقدة (R.T.P)',
      en: 'R.T.P. Triangular Problem Reframing Protocol',
    },
    title: {
      fr: 'M8 · Flexibilité Mentale et Résolution de Problèmes Complexes',
      ar: 'و8 · المرونة الذهنية وحل المشكلات المؤسسية المعقدة',
      en: 'M8 · Mental Flexibility & Complex Problem Solving',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Désamorcez la persévération cognitive en cas d’impasse réglementaire et activez le mode mental adaptatif par le recadrage triangulaire.',
      ar: 'كسر الجمود الذهني أمام العراقيل الإجرائية، وتنشيط القشرة الحزامية للتفكير في زوايا متعددة غير تقليدية.',
      en: 'Break cognitive perseveration when encountering policy hurdles and recruit adaptive neural networks via set-shifting.',
    },
    lessons: {
      fr: [
        '8.1. Neurobiologie de la Flexibilité vs Persévération Cognitive',
        '8.2. Le Rôle du Cortex Cingulaire Antérieur (ACC) dans la Détection d’Erreur',
        '8.3. La Déconstruction des Cadres de Référence Obsolètes',
        '8.4. Le Protocole de Recadrage Triangulaire de Problème Bloqué (R.T.P.)',
      ],
      ar: [
        '8.1. بيولوجيا المرونة مقابل التصلب المعرفي التكراري',
        '8.2. دور القشرة الحزامية في استشعار العوائق وتغيير الخطة',
        '8.3. تفكيك الافتراضات الضمنية المعيقة للإنجاز',
        '8.4. بروتوكول إعادة التأطير الثلاثي (الأهداف، النطاق، الأدوار)',
      ],
      en: [
        '8.1. Neural Basis of Cognitive Flexibility vs. Perseveration',
        '8.2. The Role of the Anterior Cingulate Cortex (ACC) in Conflict Detection',
        '8.3. Dismantling Outdated Administrative Assumptions',
        '8.4. The Triangular Problem Reframing Framework (R.T.P.)',
      ],
    },
  },
  {
    id: 9,
    coverClass: 'cover-1',
    pillarId: 'pillar3',
    pillarName: {
      fr: 'Pilier III : Prise de Décision & Agilité Stratégique',
      ar: 'المحور 3: اتخاذ القرارات والرشاقة الاستراتيجية',
      en: 'Pillar III: Strategic Decision-Making & Cognitive Agility',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Pr. Cass Sunstein (Harvard) & Amos Tversky',
    protocolName: {
      fr: 'Matrice d’Analyse Probabiliste de Scénarios M.A.P.S.',
      ar: 'مصفوفة تحليل السيناريوهات الاحتمالية (M.A.P.S)',
      en: 'M.A.P.S. Probabilistic Scenario Analysis Matrix',
    },
    title: {
      fr: 'M9 · Pensée Critique et Analyse des Scénarios d’Incertitude',
      ar: 'و9 · التفكير النقدي وتحليل سيناريوهات عدم اليقين',
      en: 'M9 · Critical Thinking & Probabilistic Scenario Planning',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Éliminez la cécité aux probabilités, désactivez la peur du pire scénario et calibrez vos arbitrages sous 3 scénarios probabilisés.',
      ar: 'معالجة الهلع غير المبرر من السيناريو الأسوأ، وتأطير القرارات وفق 3 احتمالات واقعية متدرجة ذات مؤشرات واضحة.',
      en: 'Counteract probability neglect, extinguish worst-case panic, and structure decisions across calibrated scenario trees.',
    },
    lessons: {
      fr: [
        '9.1. Neurobiologie de l’Incertitude et Cécité aux Probabilités',
        '9.2. Neutralisation du Pire Scénario Catastrophe dans l’Insula',
        '9.3. La Méthode d’Analyse Bayésienne Simplifiée pour l’Administration',
        '9.4. La Matrice d’Analyse Probabiliste de Scénarios (M.A.P.S.)',
      ],
      ar: [
        '9.1. استجابة الدماغ لغموض المعطيات وتجاهل النسب الإحصائية',
        '9.2. نزع فتيل القلق من السيناريو الكارثي في الفص الجزيري',
        '9.3. التحديث البيزي المنطقي للتوقعات مع ورود أدلة جديدة',
        '9.4. بناء مصفوفة MAPS الموزونة لدعم قرار القيادة العليا',
      ],
      en: [
        '9.1. Neural Basis of Uncertainty & Probability Neglect',
        '9.2. Down-Regulating Worst-Case Catastrophizing in the Insula',
        '9.3. Intuitive Bayesian Updating for Policy Decision-Makers',
        '9.4. Structuring the M.A.P.S. Tripartite Probabilistic Matrix',
      ],
    },
  },

  // --- PILIER IV : CO-RÉGULATION, LEADERSHIP & INTELLIGENCE COLLECTIVE ---
  {
    id: 10,
    coverClass: 'cover-0',
    pillarId: 'pillar4',
    pillarName: {
      fr: 'Pilier IV : Co-Régulation, Leadership & Intelligence Collective',
      ar: 'المحور 4: التنظيم المشترك، القيادة والذكاء الجماعي',
      en: 'Pillar IV: Co-Regulation, Leadership & Collective Intelligence',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Pr. Giacomo Rizzolatti (Mirror Neurons) & Dr. Stephen Porges',
    protocolName: {
      fr: 'Protocole de Réunion Co-Régulée R.C.R.',
      ar: 'بروتوكول الاجتماع التشاركي الهادئ (R.C.R)',
      en: 'R.C.R. Co-Regulated Meeting Protocol',
    },
    title: {
      fr: 'M10 · Écoute Active et Co-Régulation Émotionnelle en Équipe',
      ar: 'و10 · الإصغاء الفعال والتنظيم الانفعالي المشترك للفرق',
      en: 'M10 · Active Listening & Team Co-Regulation',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Mobilisez le réseau des neurones miroirs et la prosodie vocale apaisante pour agir comme tuteur de calme et désamorcer les tensions.',
      ar: 'استثمار الخلايا العصبية المرآتية والنبرة الصوتية المتزنة لنشر الهدوء وخفض حدة التوتر في اجتماعات الفرق.',
      en: 'Harness mirror-neuron resonance and soothing vocal prosody to act as an emotional anchor and de-escalate collective friction.',
    },
    lessons: {
      fr: [
        '10.1. Neurobiologie des Neurones Miroirs et Contagion Émotionnelle',
        '10.2. L’Écoute Active Silencieuse et la Suspension du Jugement Réactif',
        '10.3. La Prosodie Apaisante et la Posture de Co-Régulation',
        '10.4. Le Protocole de Réunion Co-Régulée et Apaisée (R.C.R.)',
      ],
      ar: [
        '10.1. علم أعصاب الخلايا المرآتية والعدوى الشعورية داخل الفريق',
        '10.2. فضيلة الاستماع الكامل مع تجميد الأحكام التقييمية التلقائية',
        '10.3. النبرة الصوتية ولغة الجسد كأداة لبث الأمان والاتزان',
        '10.4. تطبيق بروتوكول الاجتماع المؤسسي الهادئ والمثمر',
      ],
      en: [
        '10.1. Mirror-Neuron Networks & Unconscious Emotional Contagion',
        '10.2. Non-Reactive Active Listening & Suspending Premature Defense',
        '10.3. Calming Prosody & The Leader as Autonomous Nervous Regulator',
        '10.4. The R.C.R. Framework for High-Clarity Collaborative Meetings',
      ],
    },
  },
  {
    id: 11,
    coverClass: 'cover-2',
    pillarId: 'pillar4',
    pillarName: {
      fr: 'Pilier IV : Co-Régulation, Leadership & Intelligence Collective',
      ar: 'المحور 4: التنظيم المشترك، القيادة والذكاء الجماعي',
      en: 'Pillar IV: Co-Regulation, Leadership & Collective Intelligence',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'Pr. Amy Edmondson (Harvard) & Pr. Naomi Eisenberger (UCLA)',
    protocolName: {
      fr: 'Protocole de Débriefing Sans Blâme D.S.B.',
      ar: 'بروتوكول المراجعة المؤسسية دون لوم (D.S.B)',
      en: 'D.S.B. Blameless Debriefing Protocol',
    },
    title: {
      fr: 'M11 · Climat de Sécurité Psychologique et Performance d’Équipe',
      ar: 'و11 · مناخ الأمان النفسي ورفع كفاءة الأداء الجماعي',
      en: 'M11 · Psychological Safety & High-Performance Team Climate',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Neutralisez le réflexe de menace sociale dans le cerveau des collaborateurs et traitez les dysfonctionnements sous l’angle des processus.',
      ar: 'تحييد إشارات التهديد الاجتماعي في بيئة العمل، والتعاطي مع الأخطاء كخلل في المساطر الإجرائية يستوجب التطوير لا العقاب.',
      en: 'De-escalate social threat triggers in collective workflows and treat operational errors as systemic learning opportunities.',
    },
    lessons: {
      fr: [
        '11.1. Neurobiologie de la Menace Sociale vs Sécurité Psychologique',
        '11.2. La Dé-stigmatisation de l’Erreur et l’Apprentissage Continu',
        '11.3. L’Humilité Stratégique et la Posture de Curiosité du Leader',
        '11.4. Le Protocole de Débriefing Sans Blâme Ministère (D.S.B.)',
      ],
      ar: [
        '11.1. بيولوجيا التهديد الوظيفي والاجتماعي مقابل الأمان النفسي',
        '11.2. نزع الوصمة عن الخطأ واعتباره مدخلاً للتحسين المستمر',
        '11.3. التواضع القيادي الاستراتيجي وطرح الأسئلة الاستكشافية',
        '11.4. بروتوكول مراجعة الإخفاقات المؤسسية دون توجيه أصابع الاتهام',
      ],
      en: [
        '11.1. Social Threat Biology vs. Amy Edmondson’s Psychological Safety',
        '11.2. De-Stigmatizing Intelligent Failure for Organizational Learning',
        '11.3. Strategic Intellectual Humility & Exploratory Inquiry',
        '11.4. Running the Ministry Blameless Post-Mortem (D.S.B.)',
      ],
    },
  },
  {
    id: 12,
    coverClass: 'cover-1',
    pillarId: 'pillar4',
    pillarName: {
      fr: 'Pilier IV : Co-Régulation, Leadership & Intelligence Collective',
      ar: 'المحور 4: التنظيم المشترك، القيادة والذكاء الجماعي',
      en: 'Pillar IV: Co-Regulation, Leadership & Collective Intelligence',
    },
    status: 'up_next',
    durationMinutes: 40,
    lessonsCount: 4,
    scientificRef: 'William Ury, Roger Fisher (Harvard) & Pr. Ernst Fehr',
    protocolName: {
      fr: 'Protocole de Désescalade & Négociation d’Intérêts P.D.N.I.',
      ar: 'بروتوكول نزع التصعيد والتفاوض القائم على المصالح (P.D.N.I)',
      en: 'P.D.N.I. Principled Interest-Based Negotiation Protocol',
    },
    title: {
      fr: 'M12 · Négociation Raisonnée et Clarté Relationnelle',
      ar: 'و12 · التفاوض العقلاني والوضوح في العلاقات المهنية',
      en: 'M12 · Principled Negotiation & Relational Clarity',
    },
    meta: {
      fr: '4 leçons · 40 min',
      ar: '4 دروس · 40 دقيقة',
      en: '4 lessons · 40 min',
    },
    summary: {
      fr: 'Séparez les personnes du différend, dépassez les positions rigides pour révéler les intérêts profonds et co-construisez des accords pérennes.',
      ar: 'فصل الأشخاص عن الخلاف، وتجاوز المواقف المتصلبة للوصول إلى الاحتياجات الحقيقية وبناء حلول ترضي المصلحة المشتركة.',
      en: 'Separate the people from the problem, transcend positional entrenchment to reveal underlying interests, and forge win-win compacts.',
    },
    lessons: {
      fr: [
        '12.1. Neurobiologie du Blocage Positionnel vs Négociation d’Intérêts',
        '12.2. Dissociation Personne / Problème et Désescalade Émotionnelle',
        '12.3. Exploration des Intérêts Sous-Jacents et Options d’Équité',
        '12.4. Le Protocole de Désescalade et Négociation d’Intérêts (P.D.N.I.)',
      ],
      ar: [
        '12.1. كيمياء الصدام الموقفي مقابل التفاوض المتمحور حول المصالح',
        '12.2. الفصل الحاسم بين تقدير الشخص والصرامة في حل المشكلة',
        '12.3. استكشاف الدوافع والاحتياجات غير المعلنة للأطراف',
        '12.4. تطبيق بروتوكول النزول من التصعيد إلى الاتفاق المتين',
      ],
      en: [
        '12.1. Positional Entrenchment Biology vs. Interest Exploration',
        '12.2. Disentangling the People from the Substantive Problem',
        '12.3. Uncovering Latent Administrative Motivations & Equity Criteria',
        '12.4. The Harvard Principled Negotiation Protocol (P.D.N.I.)',
      ],
    },
  },
]

// Bibliothèque multimédia enrichie avec les scripts verbatim réels du studio
export const resourceLibraryData: ResourceItem[] = [
  {
    id: 'nt-audio-cc-5min',
    category: 'audio',
    duration: { en: '5 min guided session', fr: 'Session guidée · 5 min', ar: 'جلسة صوتية موجهة · 5 دقائق' },
    title: {
      en: 'Studio Audio: 0.1 Hz Resonant Heart Coherence',
      fr: 'Session Studio : Cohérence Cardiaque Résonante 0,1 Hz',
      ar: 'تسجيل الاستوديو: الاتساق القلبي الإيقاعي (0.1 هرتز)',
    },
    description: {
      en: 'Master laboratory recording at 0.1 Hz (5s in / 5s out) with 432 Hz binaural bed and precise acoustic pacing.',
      fr: 'Enregistrement de référence à 0,1 Hz (5s inspiration / 5s expiration) avec nappe binaurale 432 Hz et guidage vocal.',
      ar: 'تسجيل استوديو مرجعي على تردد 0.1 هرتز (5 ثوانٍ شهيق / 5 ثوانٍ زفير) بمؤثرات صوتية هادئة لدعم الوضوح الذهني.',
    },
    takeaways: {
      en: [
        'Engages the vagal brake and parasympathetic branch in under 180 seconds.',
        'Stabilizes blood pressure baroreflexes for 4 to 6 hours across afternoon meetings.',
        'Synchronizes autonomic rhythm directly with prefrontal executive clarity.',
      ],
      fr: [
        'Active le frein vagal et la branche parasympathique en moins de 180 secondes.',
        'Stabilise la pression artérielle et le baroréflexe pour une durée de 4 à 6 heures.',
        'Synchronise le rythme autonome avec la clarté d’analyse du cortex préfrontal.',
      ],
      ar: [
        'تفعيل الفرامل العصبية والفرع الودي المهدئ في أقل من 3 دقائق.',
        'موازنة ضغط الدم واستقرار ضربات القلب لمدة تتراوح بين 4 إلى 6 ساعات.',
        'مواءمة النشاط العصبي الذاتي مع صفاء التفكير في القشرة الجبهية.',
      ],
    },
    audioScript: {
      fr: [
        '0:00 - Introduction : Installez-vous confortablement, le dos droit, les épaules relâchées. Nous synchronisons votre respiration sur 0,1 Hz.',
        '0:30 - Inspiration (5s) : Inspirez par le nez... 1, 2, 3, 4, 5. Sentez l’air frais remplir vos poumons.',
        '0:35 - Expiration (5s) : Expirez par la bouche... 1, 2, 3, 4, 5. Relâchez toute tension dans les mâchoires.',
        '1:00 à 4:30 - Cycles guidés : Le frein vagal s’active. La variabilité cardiaque s’harmonise. Le cortex préfrontal retrouve sa pleine lucidité.',
        '4:30 à 5:00 - Clôture : Reprenez une respiration naturelle. Vous êtes centré, disponible et serein pour vos arbitrages ministériels.',
      ],
      ar: [
        '0:00 - التمهيد: اجلس باعتدال وراحة، أرخِ الكتفين. سنقوم بضبط إيقاع التنفس على تردد 0.1 هرتز.',
        '0:30 - الشهيق (5 ثوانٍ): شهيق هادئ عبر الأنف... 1، 2، 3، 4، 5. استشعر دخول الهواء النقي.',
        '0:35 - الزفير (5 ثوانٍ): زفير بطيء عبر الفم... 1، 2، 3، 4، 5. أطلق كل توتر في عضلات الوجه والكتفين.',
        '1:00 إلى 4:30 - دورات التنفس المتزن: استقرار نبض القلب وتراجع مستويات التوتر، وعودة الصفاء الذهني.',
        '4:30 إلى 5:00 - الخاتمة: تنفس طبيعي هادئ. أنت الآن في قمة الاتزان والجاهزية لمتابعة مهامك بنجاح.',
      ],
      en: [
        '0:00 - Intro: Sit upright, shoulders relaxed. We calibrate your breathing to exactly 0.1 Hz.',
        '0:30 - Inhale (5s): Inhale smoothly through the nose... 1, 2, 3, 4, 5. Feel your lungs fill with fresh air.',
        '0:35 - Exhale (5s): Exhale gently through the mouth... 1, 2, 3, 4, 5. Release jaw and neck tension.',
        '1:00 to 4:30 - Coherence Pacing: Vagal brake activates. Blood pressure baroreflex harmonizes. Executive clarity returns.',
        '4:30 to 5:00 - Completion: Gentle transition back to natural breathing. Grounded, alert, and composed.',
      ],
    },
  },
  {
    id: 'nt-audio-flash-3min',
    category: 'audio',
    duration: { en: '3 min emergency reset', fr: 'Reset d’urgence · 3 min', ar: 'تصفية عاجلة · 3 دقائق' },
    title: {
      en: 'Studio Audio: Flash Attention Micro-Reset',
      fr: 'Session Studio : Micro-Reset Attentionnel Flash (3 min)',
      ar: 'تسجيل الاستوديو: تصفية الانتباه السريعة (3 دقائق)',
    },
    description: {
      en: 'Rapid neuro-sensory decompression protocol between two dense meetings with double physiological sighs.',
      fr: 'Protocole rapide de décompression neuro-sensorielle entre deux réunions intenses avec soupirs physiologiques.',
      ar: 'بروتوكول تفريغ حسي عصبي عاجل بين الاجتماعات المزدحمة عبر تقنية الزفير المزدوج السريع.',
    },
    takeaways: {
      en: [
        'Instant disengagement from screen glare and attention residue.',
        'Double-inhale physiological sighs purge accumulated blood CO2.',
        'Recalibrates executive intention to the single top priority before starting.',
      ],
      fr: [
        'Désengagement visuel immédiat pour couper le résidu attentionnel des écrans.',
        'Le soupir physiologique double-inspiration fait chuter l’hypervigilance en 30s.',
        'Re-focalise l’attention sur la seule tâche prioritaire immédiate.',
      ],
      ar: [
        'قطع التشتت البصري وإزالة العوالق الذهنية بين الشاشات.',
        'الزفير المزدوج يخفض فرط التحفز العصبي خلال 30 ثانية.',
        'إعادة توجيه التركيز إلى المهمة الأهم فور انتهاء الاستراحة.',
      ],
    },
    audioScript: {
      fr: [
        '0:00 - Rupture : Arrêtez toute saisie. Détournez vos yeux de l’écran. Fermez les paupières ou fixez un point neutre.',
        '0:45 - Soupir Physiologique : Grande inspiration nasale... micro-inspiration complémentaire... et longue expiration lente par la bouche. Répétez 3 fois.',
        '1:30 - Vision Panoramique : Élargissez votre vision périphérique. Relâchez le focus préfrontal.',
        '2:15 - Intention : Posez-vous cette question unique : « Quelle est la seule tâche prioritaire que je dois accomplir maintenant ? »',
        '3:00 - Réengagement : Ouvrez les yeux. Vous êtes réinitialisé et prêt pour votre dossier.',
      ],
      ar: [
        '0:00 - الإيقاف الفوري: توقف عن الكتابة. اصرف نظرك عن الشاشة وأغمض عينيك لثوانٍ.',
        '0:45 - التنهد الفسيولوجي: شهيق عميق... شهيق إضافي خاطف... ثم زفير ممتد ومسترخٍ. كرر ذلك 3 مرات.',
        '1:30 - الرؤية البانورامية: وسّع مجال رؤيتك المحيطي دون تحريك رأسك لإراحة مراكز التركيز بالدماغ.',
        '2:15 - تحديد القصد: اسأل نفسك: "ما هي المهمة الوحيدة ذات الأولوية القصوى التي علي إنجازها الآن؟"',
        '3:00 - العودة للعمل: افتح عينيك بطاقة متجددة وانطلق لمعالجة ملفك بوضوح.',
      ],
      en: [
        '0:00 - Visual Break: Stop typing. Turn away from screens. Close eyes or gaze at a neutral horizon.',
        '0:45 - Physiological Sigh: Deep nasal inhale... top-off micro-inhale... and long, passive mouth exhale. Repeat 3 times.',
        '1:30 - Panoramic Gaze: Expand peripheral visual field to relax fronto-parietal attention tension.',
        '2:15 - Executive Query: Anchor one question: "What is the single most critical task I must accomplish next?"',
        '3:00 - Re-engagement: Eyes open. Alert, rested, and locked onto your target.',
      ],
    },
  },
  {
    id: 'guide-m1-deepwork',
    category: 'guide',
    duration: { en: '5 min read · Checklist', fr: 'Fiche pratique · 5 min', ar: 'دليل عملي · 5 دقائق' },
    title: {
      en: 'Best Practice Sheet M1: 45/10 Hermetic Focus',
      fr: 'Fiche Bonnes Pratiques M1 : Bloc Hermétique Ministère 45/10',
      ar: 'بطاقة الممارسات الفضلى و1: فترات التركيز المحكمة 45/10',
    },
    description: {
      en: 'Concrete protocol for planning uninterrupted deep work blocks on strategic notes in the Ministry.',
      fr: 'Protocole concret pour sanctuariser des plages de réflexion stratégique sans interruptions au Ministère.',
      ar: 'دليل تطبيقي لحماية ساعات العمل التحليلي المعمق في صياغة المذكرات الاستراتيجية بالوزارة دون مقاطعات.',
    },
    takeaways: {
      en: [
        'Rule 1: Zero strategic multitasking (Outlook closed, phone on DND).',
        'Rule 2: Systematic cognitive closure note before task switching.',
        'Rule 3: Minimum 30-minute uninterrupted threshold for real intellectual output.',
      ],
      fr: [
        'Règle 1 : Zéro multitâche stratégique (Outlook fermé, téléphone en Ne Pas Déranger).',
        'Règle 2 : Clôture cognitive écrite avant tout changement de dossier.',
        'Règle 3 : Seuil incompressible de 30 minutes de focalisation continue.',
      ],
      ar: [
        'القاعدة 1: إيقاف التعددية المهنية (إغلاق البريد وتفعيل وضع عدم الإزعاج للهاتف).',
        'القاعدة 2: تدوين نقطة التوقف بوضوح قبل الانتقال لملف آخر لتحرير الذهن.',
        'القاعدة 3: احترام الحد الأدنى (30 دقيقة مستمرة) لتحقيق إنتاج فكري نوعي.',
      ],
    },
  },
  {
    id: 'guide-m7-premortem',
    category: 'guide',
    duration: { en: '6 min read · Checklist', fr: 'Fiche pratique · 6 min', ar: 'دليل عملي · 6 دقائق' },
    title: {
      en: 'Best Practice Sheet M7: Decision Pre-Mortem Protocol',
      fr: 'Fiche Bonnes Pratiques M7 : Pre-Mortem Décisionnel Ministère',
      ar: 'بطاقة الممارسات الفضلى و7: التشريح الاستباقي للقرارات الكبرى',
    },
    description: {
      en: 'Operational template for debiasing major policy arbitrations through structured failure simulation.',
      fr: 'Trame opérationnelle pour désamorcer les biais d’optimisme avant la validation d’un projet majeur.',
      ar: 'إطار منهجي لتحييد الانحيازات والتفاؤل المفرط قبل المصادقة على المبادرات والمشاريع الوزارية.',
    },
    takeaways: {
      en: [
        'Simulate complete future project failure 12 months in advance.',
        'Gather unvarnished hazard lists across legal, technical, and human fronts.',
        'Install preventative fail-safes before final ministerial authorization.',
      ],
      fr: [
        'Simuler l’échec total du projet à 12 mois avant tout engagement.',
        'Recueillir sans censure les causes réelles de défaillance systémique.',
        'Amender la décision initiale pour intégrer des garde-fous immédiats.',
      ],
      ar: [
        'تخيل الإخفاق الكامل للمشروع بعد سنة من الآن ورسم سيناريو الأسباب.',
        'جمع المخاطر القانونية والتقنية والتنظيمية دون مجاملة.',
        'إدراج صمامات أمان وقائية في صلب القرار قبل إطلاقه رسمياً.',
      ],
    },
  },
  {
    id: 'calmer-mind',
    category: 'video',
    duration: { en: '12 min documentary', fr: 'Documentaire · 12 min', ar: 'وثائقي · 12 دقيقة' },
    title: {
      en: 'The Science of High Executive Performance',
      fr: 'La Science de la Haute Performance Cognitive',
      ar: 'علم الأداء المعرفي التنفيذي الرفيع',
    },
    description: {
      en: 'A 12-minute documentary on neuroplasticity, vagal regulation, and prefrontal resilience in public service.',
      fr: 'Un documentaire de 12 minutes sur la neuroplasticité, la régulation vagale et la résilience exécutive.',
      ar: 'وثائقي علمي مدته 12 دقيقة حول المرونة العصبية وتنظيم الجهاز العصبي لدى قيادات العمل العمومي.',
    },
    takeaways: {
      en: [
        'Calm attention is a trainable physiological capability, not a static trait.',
        'Brief 3-minute autonomic resets prevent cumulative afternoon cortisol build-up.',
        'Alpha brainwave synchronization directly boosts both analytical precision and interpersonal poise.',
      ],
      fr: [
        'L’attention sereine est une compétence physiologique entraînable et mesurable.',
        'De brèves pauses de 3 minutes préviennent l’accumulation de cortisol en fin de journée.',
        'La synchronisation des ondes alpha cérébrales décuple la clarté et l’impartialité.',
      ],
      ar: [
        'الصفاء الذهني مهارة فسيولوجية قابلة للتدريب والتطوير المستمر.',
        'الاستراحات العصبية القصيرة (3 دقائق) تحمي من تراكم التوتر والإجهاد المسائي.',
        'تزامن موجات ألفا الدماغية يرفع الدقة التحليلية والاتزان التواصلي.',
      ],
    },
  },
]

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    unread: true,
    time: { en: '5m ago', fr: 'Il y a 5 min', ar: 'منذ 5 دقائق' },
    title: {
      en: 'Psychometric Assessment Ready (12 Items)',
      fr: 'Évaluation Psychométrique Validée (12 Items)',
      ar: 'التقييم النفسي المعرفي جاهز (12 معياراً)',
    },
    body: {
      en: 'Calibrate your initial baseline across the 4 Cognitive Pillars under Law 09-08 privacy.',
      fr: 'Évaluez votre profil initial sur les 4 Piliers Cognitifs en toute confidentialité CNDP.',
      ar: 'حدد مؤشرك الأولي عبر المحاور المعرفية الأربعة بخصوصية تامة تضمنها CNDP والقانون 09-08.',
    },
    targetView: 'assessment',
  },
  {
    id: 'n2',
    unread: true,
    time: { en: '1h ago', fr: 'Il y a 1h', ar: 'منذ ساعة' },
    title: {
      en: 'Studio Audio Ready: 0.1 Hz Coherence',
      fr: 'Session Studio Prête : Cohérence 0,1 Hz',
      ar: 'جلسة الاستوديو جاهزة: الاتساق الإيقاعي 0.1 هرتز',
    },
    body: {
      en: 'Try the 5-minute guided audio pacer for pre-meeting autonomic poise.',
      fr: 'Essayez le guide audio de 5 minutes pour stabiliser votre clarté avant réunion.',
      ar: 'جرب الدليل الصوتي الموجه لمدة 5 دقائق لتعزيز صفائك الذهني قبل الاجتماع.',
    },
    targetView: 'resources',
  },
  {
    id: 'n3',
    unread: false,
    time: { en: 'Yesterday', fr: 'Hier', ar: 'أمس' },
    title: {
      en: 'Quarterly Impact Report Available',
      fr: 'Rapport Trimestriel d’Impact Disponible',
      ar: 'التقرير الفصلي لأثر البرنامج متاح الآن',
    },
    body: {
      en: 'Aggregated pilot progression (+26.3 pts) across the 66 ministry staff.',
      fr: 'Progression collective du pilote (+26,3 pts) sur les 66 collaborateurs du Ministère.',
      ar: 'التطور الإجمالي للفوج النموذجي (+26.3 نقطة) لدى 66 إطاراً بالوزارة.',
    },
    targetView: 'reports',
  },
]

export const scheduleSessions: ScheduleSession[] = [
  {
    id: 's1',
    date: { en: 'Thu, Nov 12', fr: 'Jeu 12 Nov', ar: 'الخميس 12 نونبر' },
    time: '10:00 – 11:15',
    title: {
      en: 'Workshop: Strategic Decision Pre-Mortem (Cohort 66)',
      fr: 'Atelier : Pre-Mortem Décisionnel Stratégique (Cohorte 66)',
      ar: 'ورشة تفاعلية: التشريح الاستباقي للقرارات الاستراتيجية (فوج 66)',
    },
    type: { en: 'Live Interactive Workshop', fr: 'Atelier Interactif Synchrone', ar: 'ورشة تفاعلية مباشرة' },
    facilitator: 'Dr. Y. Benkirane (NEUROMAROC)',
  },
  {
    id: 's2',
    date: { en: 'Tue, Nov 24', fr: 'Mar 24 Nov', ar: 'الثلاثاء 24 نونبر' },
    time: '14:30 – 15:30',
    title: {
      en: 'Masterclass: Autonomic Coherence & Meeting Hygiene',
      fr: 'Masterclass : Cohérence Autonome & Hygiène des Réunions',
      ar: 'جلسة متقدمة: الاتساق العصبي وإدارة الاجتماعات بكفاءة',
    },
    type: { en: 'Collective Webinar', fr: 'Webinaire Collectif', ar: 'ندوة جماعية عبر الإنترنت' },
    facilitator: 'Équipe Neurosciences NEUROMAROC',
  },
]

export const progressChartByPeriod = {
  month: {
    score: 74,
    delta: '+6',
    points: [68, 69, 71, 72, 73, 74],
    path: 'M0,130 C120,125 240,110 360,95 C480,85 600,75 700,65',
  },
  months3: {
    score: 74,
    delta: '+15',
    points: [59, 62, 65, 68, 71, 74],
    path: 'M0,150 C120,135 240,120 360,100 C480,82 600,70 700,60',
  },
  months6: {
    score: 74,
    delta: '+26',
    points: [48, 53, 58, 64, 69, 74],
    path: 'M0,170 C120,155 240,135 360,105 C480,80 600,65 700,55',
  },
  year: {
    score: 74,
    delta: '+32',
    points: [42, 47, 52, 59, 67, 74],
    path: 'M0,180 C120,165 240,145 360,115 C480,85 600,65 700,50',
  },
}

export const weeklyActivityData = {
  thisWeek: {
    bars: [45, 60, 30, 75, 50, 20, 35],
    total: { en: '4h 35m', fr: '4h 35m', ar: '4 س 35 د' },
  },
  lastWeek: {
    bars: [30, 45, 50, 40, 60, 15, 25],
    total: { en: '3h 45m', fr: '3h 45m', ar: '3 س 45 د' },
  },
  monthly: {
    bars: [55, 65, 40, 80, 70, 30, 45],
    total: { en: '18h 20m', fr: '18h 20m', ar: '18 س 20 د' },
  },
}

export const adminStatsByQuarter = {
  q4: {
    participants: 66,
    activePct: 100,
    completionPct: 98.5,
    avgProgression: '+26.3 pts',
    activeWeekPct: 92.3,
    totalSessions: 1428,
  },
  q3: {
    participants: 66,
    activePct: 100,
    completionPct: 78.4,
    avgProgression: '+14.2 pts',
    activeWeekPct: 84.1,
    totalSessions: 890,
  },
  year: {
    participants: 66,
    activePct: 100,
    completionPct: 98.5,
    avgProgression: '+26.3 pts',
    activeWeekPct: 92.3,
    totalSessions: 1428,
  },
}

export const adminActivitiesList = [
  {
    id: 'act-1',
    name: {
      fr: 'M1 · Focus Profond & Blocs Hermétiques (Deep Work)',
      ar: 'و1 · التركيز العميق والفترات المحكمة (Deep Work)',
      en: 'M1 · Deep Work & Hermetic Time-Blocking',
    },
    participants: '66 / 66',
    completion: '95%',
    statusKey: 'completed' as const,
    detail: {
      fr: 'Gain mesuré de 1h15 de focus ininterrompu par cadre et par jour.',
      ar: 'تحقيق زيادة في وقت التركيز المتواصل بمعدل ساعة و15 دقيقة يومياً لكل إطار.',
      en: 'Measured gain of 1h15 uninterrupted strategic focus per leader daily.',
    },
  },
  {
    id: 'act-2',
    name: {
      fr: 'M5 · Variabilité Cardiaque & Cohérence 0,1 Hz',
      ar: 'و5 · التباين القلبي والاتساق العصبي 0.1 هرتز',
      en: 'M5 · Heart Rate Variability & 0.1 Hz Coherence',
    },
    participants: '66 / 66',
    completion: '92%',
    statusKey: 'completed' as const,
    detail: {
      fr: '1 428 sessions de régulation réalisées. Baisse de 38 % de la fatigue décisionnelle.',
      ar: 'إنجاز 1428 جلسة تنظيم تنفسي. انخفاض بنسبة 38% في إجهاد اتخاذ القرار المسائي.',
      en: '1,428 regulation sessions logged. 38% drop in perceived decision fatigue.',
    },
  },
  {
    id: 'act-3',
    name: {
      fr: 'M7 · Pre-Mortem Décisionnel & Débiasing',
      ar: 'و7 · التشريح الاستباقي وتفكيك الانحيازات',
      en: 'M7 · Strategic Decision Pre-Mortem & Debiasing',
    },
    participants: '64 / 66',
    completion: '88%',
    statusKey: 'inProgress' as const,
    detail: {
      fr: 'Généralisation de la simulation d’échec préventive sur les projets clés.',
      ar: 'تعميم منهجية المحاكاة الوقائية للمخاطر على المشاريع الوزارية الحيوية.',
      en: 'Systematic pre-emptive hazard simulation adopted across major project briefs.',
    },
  },
  {
    id: 'act-4',
    name: {
      fr: 'M11 · Sécurité Psychologique & Débriefing Sans Blâme',
      ar: 'و11 · الأمان النفسي والمراجعة البناءة دون لوم',
      en: 'M11 · Psychological Safety & Blameless Debriefing',
    },
    participants: '62 / 66',
    completion: '84%',
    statusKey: 'inProgress' as const,
    detail: {
      fr: 'Augmentation sensible des alertes précoces transmises en amont des échéances.',
      ar: 'ارتفاع ملموس في إشعار القيادة بالعراقيل المحتملة قبل حلول المواعيد النهائية.',
      en: 'Significant rise in early risk notifications before final deadlines.',
    },
  },
]

export const adminDepartments = [
  {
    id: 'dep-1',
    name: {
      fr: 'Planification Stratégique & Politiques Publiques',
      ar: 'مديرية التخطيط الاستراتيجي والسياسات العمومية',
      en: 'Strategic Planning & Public Policies',
    },
    participants: 18,
    completion: 96,
    progression: '+28.4 pts',
  },
  {
    id: 'dep-2',
    name: {
      fr: 'Capital Humain & Modernisation Administrative',
      ar: 'مديرية الموارد البشرية والتحديث الإداري',
      en: 'Human Capital & Administrative Modernization',
    },
    participants: 16,
    completion: 94,
    progression: '+26.8 pts',
  },
  {
    id: 'dep-3',
    name: {
      fr: 'Transformation Numérique & Systèmes d’Information',
      ar: 'مديرية التحول الرقمي ونظم المعلومات',
      en: 'Digital Transformation & Information Systems',
    },
    participants: 17,
    completion: 91,
    progression: '+25.1 pts',
  },
  {
    id: 'dep-4',
    name: {
      fr: 'Affaires Juridiques & Régulation Industrielle',
      ar: 'مديرية الشؤون القانونية والتنظيم الصناعي',
      en: 'Legal Affairs & Industrial Regulation',
    },
    participants: 15,
    completion: 89,
    progression: '+24.9 pts',
  },
]

export const adminReportsList = [
  {
    id: 'rep-pilot-t1',
    code: 'NM-MIC-PILOT-T1',
    date: 'Octobre 2026',
    title: {
      fr: 'Rapport Officiel d’Impact & d’Évaluation Neuro-Cognitive (Pilote 66 Cadres)',
      ar: 'التقرير الرسمي للأثر والتقييم النفسي المعرفي (فوج 66 إطاراً)',
      en: 'Official Neuro-Cognitive Impact & Progression Report (Pilot 66 Staff)',
    },
    desc: {
      fr: 'Bilan d’évaluation T0 vs T1 certifié conforme Loi 09-08 (CNDP) : +26,3 pts de progression globale, 100 % de couverture des 66 licences et préconisations pour la Phase 2.',
      ar: 'تقرير تقييم شامل T0 مقابل T1 معتمد وفق القانون 09-08 وCNDP: تطور إجمالي بمقدار +26.3 نقطة، وتغطية كاملة لـ 66 ترخيصاً مع توصيات المرحلة الثانية.',
      en: 'Certified T0 vs T1 assessment report compliant with Law 09-08 (CNDP): +26.3 pts collective growth across 66 licenses and Phase 2 scale-up roadmap.',
    },
  },
  {
    id: 'rep-domains',
    code: 'NM-2026-DOM',
    date: 'Octobre 2026',
    title: {
      fr: 'Cartographie des 4 Piliers Cognitifs & Analyse par Direction',
      ar: 'خريطة المحاور المعرفية الأربعة والتحليل حسب المديريات',
      en: '4 Cognitive Pillars Benchmark & Departmental Breakdown',
    },
    desc: {
      fr: 'Détail de la progression : Attention (+27,7 pts), Régulation (+25,7 pts), Décision (+20,3 pts) et Co-Régulation (+31,6 pts).',
      ar: 'تفصيل التطور: الانتباه (+27.7 نقطة)، التنظيم الانفعالي (+25.7 نقطة)، اتخاذ القرار (+20.3 نقطة)، والتنظيم المشترك (+31.6 نقطة).',
      en: 'Detailed pillar delta: Focus (+27.7 pts), Regulation (+25.7 pts), Decision (+20.3 pts), and Co-Regulation (+31.6 pts).',
    },
  },
  {
    id: 'rep-ergo',
    code: 'NM-2026-CNDP',
    date: 'Septembre 2026',
    title: {
      fr: 'Attestation de Sécurité, Souveraineté & Conformité CNDP (Loi 09-08)',
      ar: 'شهادة الأمان والسيادة ومطابقة معايير حماية المعطيات CNDP',
      en: 'Certificate of Data Sovereignty & CNDP Law 09-08 Compliance',
    },
    desc: {
      fr: 'Rapport d’audit confirmant l’hébergement souverain au Maroc, le chiffrement AES-256 et l’étanchéité absolue de l’Espace Collaborateur.',
      ar: 'تقرير التدقيق المؤكد للاستضافة السيادية بالمغرب، والتشفير الكامل، وحصانة وسرية فضاء الموظف الشخصي.',
      en: 'Audit report confirming sovereign Moroccan hosting, AES-256 encryption, and absolute hermetic boundary of Collaborator Space.',
    },
  },
]

export const adminActivities = adminActivitiesList
export const initialSchedule = scheduleSessions

export interface AcademicSourceInfo {
  leadScientist: string
  institutions: string
  peerReviewJournal: string
  seminalPaper: string
  executiveSummary: Record<Lang, string>
  ministryRelevance: Record<Lang, string>
}

export interface LessonDetailedContent {
  scientificBasis: Record<Lang, string>
  ministryCase: Record<Lang, string>
  actionStep: Record<Lang, string>
}

export const moduleAcademicSources: Record<number, AcademicSourceInfo> = {
  1: {
    leadScientist: 'Dr. Sophie Leroy & Pr. Earl Miller',
    institutions: 'University of Washington Bothell & MIT (Picower Institute for Learning and Memory)',
    peerReviewJournal: 'Organizational Behavior and Human Decision Processes / MIT Neuroscience Reviews',
    seminalPaper: 'Leroy, S. (2009). "Why is it so hard to do my work? The challenge of attention residue when switching between work tasks." & Miller, E. K. (2015). "Working memory capacity and cognitive control."',
    executiveSummary: {
      fr: 'Le résidu attentionnel (Attention Residue) démontre qu’un changement brusque de tâche laisse une partie des ressources du cortex préfrontal dorsolatéral (dlPFC) bloquée sur le dossier précédent, dégradant la vigilance et la précision de 20 à 40 %.',
      ar: 'أثبتت أبحاث د. ليروي أن الانتقال المباغت بين الملفات يترك بقايا تشتت عالقة في القشرة الجبهية (dlPFC)، مما يقلل الكفاءة الذهنية في معالجة الملف التالي بنسبة 20 إلى 40%.',
      en: 'Attention Residue research proves that abrupt task switching traps dorsolateral prefrontal cortex (dlPFC) bandwidth on the previous task, degrading focus and accuracy by 20% to 40%.',
    },
    ministryRelevance: {
      fr: 'Essentiel pour les cadres du Ministère de l’Industrie et du Commerce traitant des dossiers stratégiques (stratégies industrielles, accords d’investissement, notes de cadrage) soumis aux interruptions d’urgence.',
      ar: 'ضروري لأطر وزارة الصناعة والتجارة عند معالجة الملفات الاستراتيجية والاتفاقيات الاستثمارية الخاضعة للمقاطعات المتكررة.',
      en: 'Crucial for Ministry of Industry and Trade officials drafting high-stakes strategic briefs, investment compacts, and regulatory memos under frequent interruptions.',
    },
  },
  2: {
    leadScientist: 'Pr. John Sweller & Pr. Larry Rosen',
    institutions: 'University of New South Wales & California State University',
    peerReviewJournal: 'Educational Psychology Review / The Distracted Mind (MIT Press)',
    seminalPaper: 'Sweller, J. (2011). "Cognitive Load Theory" & Rosen, L. D. (2012). "The distracted mind: Ancient brains in a high-tech world."',
    executiveSummary: {
      fr: 'La surcharge cognitive extrinsèque provoquée par les notifications continues déclenche des boucles dopaminergiques de distraction et épuise les réserves de mémoire de travail.',
      ar: 'العبء المعرفي الزائد الناجم عن التنبيهات المستمرة يسبب إدمان التشتت الرقمي ويستنزف طاقة الذاكرة العاملة.',
      en: 'Extrinsic cognitive load triggered by perpetual notifications drives dopamine-seeking distraction loops and drains working memory capacity.',
    },
    ministryRelevance: {
      fr: 'Organisation du traitement des courriels administratifs et des flux d’informations par lots asynchrones R.A.I.D. au sein des directions sectorielles.',
      ar: 'تنظيم فرز المراسلات الإدارية وتدفقات المعطيات عبر نظام الدفعات المتزامنة R.A.I.D. داخل المديريات.',
      en: 'Streamlining ministerial email processing and information flows through disciplined R.A.I.D. asynchronous batching across ministry departments.',
    },
  },
  3: {
    leadScientist: 'Pr. George A. Miller & David Allen',
    institutions: 'Princeton University & Cognitive Science Society',
    peerReviewJournal: 'Psychological Review (APA) / Harvard Business Review',
    seminalPaper: 'Miller, G. A. (1956). "The magical number seven, plus or minus two: Some limits on our capacity for processing information."',
    executiveSummary: {
      fr: 'La mémoire de travail humaine est un goulot d’étranglement biologique limité à 4 ou 7 unités d’information. L’externalisation sur support externe fiable libère l’énergie exécutive.',
      ar: 'الذاكرة العاملة محدودة بيولوجياً بـ 4 إلى 7 وحدات معلومة. التفريغ الذهني المنتظم يحرر طاقة الدماغ التنفيذية للإبداع والتحليل.',
      en: 'Human working memory is biologically capped at 4 to 7 informational chunks. External cognitive offloading unburdens executive bandwidth.',
    },
    ministryRelevance: {
      fr: 'Sécurisation du suivi des engagements ministériels et élimination de la charge mentale résiduelle liée aux tâches non consignées.',
      ar: 'تأمين تتبع الالتزامات الإدارية وتصفية الإجهاد الذهني المرتبط بالمهام غير المقيدة كتابياً.',
      en: 'Safeguarding follow-up on ministerial commitments and eliminating latent mental drag through systematic external registry capture.',
    },
  },
  4: {
    leadScientist: 'Pr. James Gross & Pr. Antonio Damasio',
    institutions: 'Stanford University & University of Southern California (Brain and Creativity Institute)',
    peerReviewJournal: 'Journal of Personality and Social Psychology / Descartes’ Error',
    seminalPaper: 'Gross, J. J. (2002). "Emotion regulation: Affective, cognitive, and social consequences." & Damasio, A. (1994). "Descartes\' Error: Emotion, Reason, and the Human Brain."',
    executiveSummary: {
      fr: 'La réévaluation cognitive précoce (vmPFC) désactive l’emballement de l’amygdale sans le coût cardiovasculaire et la fatigue de l’inhibition expressive.',
      ar: 'إعادة التقييم المعرفي المبكر تنظم استثارة اللوزة الدماغية وتحافظ على الهدوء دون استنزاف طاقة الجهاز العصبي.',
      en: 'Preemptive cognitive reappraisal (vmPFC) down-regulates amygdala hyperarousal without the toxic cardiovascular and neural costs of expressive suppression.',
    },
    ministryRelevance: {
      fr: 'Maintien du discernement sous haute pression hiérarchique, lors des arbitrages budgétaires et comités interministériels tendus.',
      ar: 'الحفاظ على صفاء الحكم والاتزان تحت الضغط الإداري في اللجان المشتركة وجلسات التحكيم المعقدة.',
      en: 'Sustaining poise and clarity under intense hierarchical scrutiny during inter-ministerial arbitrations and tight deadlines.',
    },
  },
  5: {
    leadScientist: 'Dr. Stephen Porges & Dr. David O’Hare',
    institutions: 'University of North Carolina & Polyvagal Institute',
    peerReviewJournal: 'Psychophysiology / Cleveland Clinic Journal of Medicine',
    seminalPaper: 'Porges, S. W. (2011). "The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-regulation."',
    executiveSummary: {
      fr: 'La cohérence cardiaque à 0,1 Hz (6 respirations/min) maximise la variabilité de la fréquence cardiaque (VFC) et active le tonus vagal ventral de sécurité physiologique.',
      ar: 'التنفس بتردد الرنين 0.1 هرتز (6 تنفسات/دقيقة) ينشط العصب الحائر ويرفع مرونة نبض القلب لاستعادة التوازن الفوري.',
      en: 'Resonant paced breathing at 0.1 Hz (6 breaths/min) maximizes Heart Rate Variability (HRV) and engages the ventral vagal brake for rapid parasympathetic restoration.',
    },
    ministryRelevance: {
      fr: 'Protocole physiologique de réinitialisation rapide de 3 à 5 minutes pour les directeurs et chefs de division avant ou après des réunions de négociation.',
      ar: 'بروتوكول تهدئة واستشفاء فوري لمدة 3 إلى 5 دقائق للأطر والمسؤولين قبل أو بعد اجتماعات التفاوض الشاقة.',
      en: 'Rapid 3-to-5-minute neuro-visceral recovery protocol for ministry directors before entering or exiting contentious negotiations.',
    },
  },
  6: {
    leadScientist: 'Pr. Roy Baumeister & Pr. Marcus Raichle',
    institutions: 'Florida State University & Washington University School of Medicine',
    peerReviewJournal: 'Journal of Personality and Social Psychology / PNAS (Default Mode Network)',
    seminalPaper: 'Baumeister, R. F. (1998). "Ego depletion: Is the active self a limited resource?" & Raichle, M. E. (2001). "A default mode of brain function."',
    executiveSummary: {
      fr: 'Chaque arbitrage complexe consomme des ressources métaboliques du cortex préfrontal. Les pauses actives et le repos du Réseau par Défaut (DMN) évitent l’épuisement décisionnel.',
      ar: 'كل قرار إداري يستهلك طاقة القشرة الدماغية. الفترات الاستشفائية النشطة تحمي متخذ القرار من التعب التراكمي وتراجع جودة الاختيارات.',
      en: 'Sequential decisions consume prefrontal glucose substrates. Deliberate rest cycles and Default Mode Network (DMN) activation prevent decision fatigue.',
    },
    ministryRelevance: {
      fr: 'Planification chrono-cognitive des comités décisionnels du Ministère : placer les arbitrages critiques en début de cycle pour éviter l’inertie décisionnelle.',
      ar: 'برمجة التوقيت الذهني للاجتماعات الحساسة بالوزارة: جدولة التحكيمات الكبرى صباحاً لتفادي القرارات العشوائية الناتجة عن الإرهاق.',
      en: 'Chrono-cognitive scheduling for ministry boards: positioning high-impact verdicts early in circadian peaks to preclude passive default choices.',
    },
  },
  7: {
    leadScientist: 'Pr. Daniel Kahneman & Dr. Gary Klein',
    institutions: 'Princeton University (Prix Nobel d’Économie) & MacroCognition LLC',
    peerReviewJournal: 'American Psychologist / Harvard Business Review',
    seminalPaper: 'Kahneman, D., & Tversky, A. (1979 / 2011). "Thinking, Fast and Slow" & Klein, G. (2007). "Performing a Project Premortem."',
    executiveSummary: {
      fr: 'Le Système 1 intuitif génère des biais d’ancrage et d’excès de confiance. La méthode du Pre-Mortem oblige le Système 2 analytique à explorer les causes plausibles d’un échec avant engagement.',
      ar: 'النظام الذهني السريع (1) يقع في فخ الانحيازات والتفاؤل المفرط. منهجية "التشريح الاستباقي" تجبر العقل التحليلي على كشف الثغرات قبل إطلاق المشروع.',
      en: 'Intuitive System 1 relies on confirmation and anchoring heuristics. The Pre-Mortem technique forces analytic System 2 to stress-test failure pathways prior to project launch.',
    },
    ministryRelevance: {
      fr: 'Sécurisation des lancements de programmes sectoriels industriels et conventions partenariales face aux angles morts réglementaires et techniques.',
      ar: 'تحصين البرامج والمشاريع الصناعية الكبرى من المفاجآت والعراقيل المسطرية قبل اعتمادها النهائي.',
      en: 'Safeguarding industrial sectoral roadmaps and public-private agreements by pre-empting administrative and procedural blind spots.',
    },
  },
  8: {
    leadScientist: 'Pr. Jacques Fradin & Pr. Todd Lubart',
    institutions: 'Institut de Médecine Environnementale (IME Paris) & Université Paris Cité',
    peerReviewJournal: 'Neuropsychologia / Journal of Creative Behavior',
    seminalPaper: 'Fradin, J. (2008). "L’intelligence adaptative : les modes préfrontal et mental" & Lubart, T. (2003). "Psychologie de la créativité."',
    executiveSummary: {
      fr: 'Le cortex cingulaire antérieur (ACC) pilote la détection d’erreurs et permet de basculer du mode automatique rigide au mode préfrontal adaptatif en situation inédite.',
      ar: 'تقود القشرة الحزامية الأمامية (ACC) رصد التعثرات والانتقال من التفكير الآلي النمطي إلى التفكير التكيفي المرن عند مواجهة مستجدات غير مسبوقة.',
      en: 'The Anterior Cingulate Cortex (ACC) monitors conflict and shifts cognitive control from rigid automatic schemas to flexible prefrontal problem-solving.',
    },
    ministryRelevance: {
      fr: 'Gestion de crises imprévues dans le secteur industriel et adaptation des procédures en temps réel sans blocage administratif.',
      ar: 'إدارة الأزمات الصناعية الطارئة وملاءمة المساطر الإدارية بمرونة وابتكار دون تعطيل سير العمل.',
      en: 'Agile crisis management in industrial ecosystems and real-time procedural recalibration without bureaucratic friction.',
    },
  },
  9: {
    leadScientist: 'Pr. Cass Sunstein & Pr. Philip Tetlock',
    institutions: 'Harvard Law School & University of Pennsylvania (Wharton School)',
    peerReviewJournal: 'Science / Journal of Behavioral Decision Making',
    seminalPaper: 'Sunstein, C. R., & Kahneman, D. (2021). "Noise: A Flaw in Human Judgment" & Tetlock, P. (2015). "Superforecasting: The Art and Science of Prediction."',
    executiveSummary: {
      fr: 'L’analyse probabiliste bayésienne et la matrice MAPS neutralisent le bruit mental et les distorsions d’évaluation en milieu incertain.',
      ar: 'التحليل الاحتمالي ونموذج مصفوفة السيناريوهات يحيدان التشويش العشوائي ويقيسان نسب المخاطر بموضوعية تحت ظروف عدم اليقين.',
      en: 'Bayesian probabilistic reasoning and scenario calibration matrices neutralize cognitive noise and subjective distortions in high-uncertainty climates.',
    },
    ministryRelevance: {
      fr: 'Évaluation objective des retombées économiques et des risques d’approvisionnement dans les négociations bilatérales et accords commerciaux.',
      ar: 'التقييم الموضوعي للمخاطر الاقتصادية وتوازنات الإمداد أثناء التفاوض على الاتفاقيات التجارية الدولية.',
      en: 'Objective risk assessment of supply chain contingencies and economic impact in bilateral commercial negotiations.',
    },
  },
  10: {
    leadScientist: 'Pr. Giacomo Rizzolatti & Dr. Stephen Porges',
    institutions: 'Université de Parme (Découverte des neurones miroirs) & Polyvagal Institute',
    peerReviewJournal: 'Annual Review of Neuroscience / International Journal of Psychophysiology',
    seminalPaper: 'Rizzolatti, G., & Craighero, L. (2004). "The mirror-neuron system." & Porges, S. W. (2018). "Polyvagal Theory and Co-regulation."',
    executiveSummary: {
      fr: 'Les neurones miroirs synchronisent instinctivement les états de stress et de calme. La posture et le tonus du responsable co-régulent la neurobiologie de son équipe.',
      ar: 'الخلايا العصبية المرآتية تعكس تلقائياً مستويات التوتر أو الطمأنينة بين الأفراد. نبرة المسؤول وهدوؤه يسهمان مباشرة في تنظيم استجابة فريقه.',
      en: 'The mirror neuron system automatically mirrors autonomic calm or distress. A leader’s posture and vocal prosody actively co-regulate team physiology.',
    },
    ministryRelevance: {
      fr: 'Animation de réunions interservices à fort enjeu et désamorçage de l’agressivité défensive dans les comités ministériels.',
      ar: 'إدارة اللجان المشتركة وتفكيك التشنجات الدفاعية بين مختلف المصالح الوزارية والشركاء المؤسساتيين.',
      en: 'Directing high-stakes inter-service committees and de-escalating defensive friction across ministerial divisions.',
    },
  },
  11: {
    leadScientist: 'Pr. Amy C. Edmondson',
    institutions: 'Harvard Business School (Novartis Chair of Leadership and Management)',
    peerReviewJournal: 'Administrative Science Quarterly / Harvard Business Review',
    seminalPaper: 'Edmondson, A. C. (1999). "Psychological Safety and Learning Behavior in Work Teams." & Edmondson, A. C. (2018). "The Fearless Organization."',
    executiveSummary: {
      fr: 'La sécurité psychologique désinhibe le signalement précoce des anomalies et transforme l’analyse d’erreurs en avantage compétitif sans menace pour l’ego.',
      ar: 'الأمان النفسي داخل الفريق يتيح التبليغ المبكر عن المخاطر ويحول مراجعة الأخطاء إلى خبرة تطويرية مستمرة بعيداً عن ثقافة اللوم.',
      en: 'Psychological safety unleashes early anomaly detection and converts project missteps into collective intelligence without threat to professional standing.',
    },
    ministryRelevance: {
      fr: 'Adoption du Débriefing Sans Blâme (DSB) pour optimiser les procédures de traitement des dossiers industriels sans peur du jugement hiérarchique.',
      ar: 'اعتماد منهجية تقييم الأداء دون لوم (DSB) لتجويد مساطر العمل بالوزارة وتشجيع مبادرات الأطر دون تردد.',
      en: 'Institutionalizing Blameless Debriefings (DSB) to refine ministerial workflows and encourage proactive initiative without fear of punitive judgment.',
    },
  },
  12: {
    leadScientist: 'Pr. William Ury & Pr. Roger Fisher',
    institutions: 'Harvard Law School (Harvard Negotiation Project)',
    peerReviewJournal: 'Negotiation Journal / Penguin Books',
    seminalPaper: 'Fisher, R., Ury, W., & Patton, B. (1981 / 2011). "Getting to YES: Negotiating Agreement Without Giving In."',
    executiveSummary: {
      fr: 'La négociation raisonnée dissocie les personnes du problème, focalise les échanges sur les intérêts fondamentaux et génère des solutions à bénéfices mutuels vérifiables.',
      ar: 'التفاوض المرتكز على المبادئ يفصل الأشخاص عن النزاع، ويركز على المصالح الجوهرية لابتكار حلول توافقية تحقق مكاسب متبادلة ومستدامة.',
      en: 'Principled negotiation separates people from the problem, anchors on mutual interests rather than rigid positions, and invents verified win-win criteria.',
    },
    ministryRelevance: {
      fr: 'Conduite de négociations avec les fédérations professionnelles, délégations étrangères et partenaires industriels du Royaume.',
      ar: 'قيادة المفاوضات مع الفيدراليات المهنية الصناعية، الوفود الأجنبية، وشركاء القطاع الخاص لخدمة مصالح المملكة.',
      en: 'Leading robust negotiations with industrial professional federations, foreign delegations, and private-sector partners on behalf of the Kingdom.',
    },
  },
}

export const moduleLessonsExpanded: Record<number, LessonDetailedContent[]> = {
  1: [
    {
      scientificBasis: {
        fr: 'Théorie du Résidu Attentionnel (Dr Sophie Leroy, Univ. Washington) : lorsqu’un collaborateur bascule entre deux dossiers sans clôture mentale formelle, 20 à 40 % de ses ressources préfrontales restent captées par la tâche initiale.',
        ar: 'نظرية بقايا الانتباه (د. صوفي ليروي): الانتقال المفاجئ بين ملفين دون إنهاء ذهني منظم يترك 20 إلى 40% من تركيز الدماغ عالقاً بالملف السابق.',
        en: 'Attention Residue Theory (Dr. Sophie Leroy, Univ. Washington): Switching between projects without formal mental closure keeps 20% to 40% of prefrontal bandwidth trapped on the initial brief.',
      },
      ministryCase: {
        fr: 'Rédaction d’une note de stratégie industrielle pour le Secrétariat Général interrompue par des alertes e-mails urgentes : perte du fil argumentatif et risque accru d’erreurs de cadrage.',
        ar: 'تحرير مذكرة حول الاستراتيجية الصناعية للأمانة العامة أثناء مقاطعتها برسائل بريد طارئة: تشتت التحليل وارتفاع هامش الخطأ الإداري.',
        en: 'Drafting an industrial strategy memo for the General Secretariat interrupted by urgent emails: loss of analytic continuity and elevated risk of framing errors.',
      },
      actionStep: {
        fr: 'Instaurer un sas de clôture de 2 minutes : consigner sur papier la prochaine action précise avant de quitter un dossier pour purger la mémoire de travail.',
        ar: 'تطبيق طقس إغلاق مدته دقيقتان: تدوين الخطوة الموالية بدقة قبل ترك الملف لتفريغ الذاكرة المؤقتة تماماً.',
        en: 'Implement a 2-minute cognitive offloading ritual: jot down the exact next micro-step on paper before pausing a file to clear active working memory.',
      },
    },
    {
      scientificBasis: {
        fr: 'Rythmes ultradiens de Kleitman et cycle de renouvellement neuro-énergétique : le pic de vigilance soutenu du cortex préfrontal est optimal sur une plage de 45 à 50 minutes consécutives.',
        ar: 'الإيقاعات البيولوجية الداخلية لتركيز الدماغ: تبلغ القدرة القصوى للانتباه التنفيذي ذروتها خلال فترات متصلة من 45 إلى 50 دقيقة.',
        en: 'Ultradian biological focus cycles: dorsolateral prefrontal vigilance operates at peak biochemical efficiency in 45-to-50-minute continuous intervals.',
      },
      ministryCase: {
        fr: 'Instruction d’un dossier complexe de subvention ou de convention de partenariat nécessitant un examen minutieux des critères juridiques et financiers sans coupure.',
        ar: 'دراسة ملف معقد لمنحة أو اتفاقية شراكة استثمارية تتطلب تدقيقاً شاملاً في الجوانب القانونية والمالية دون مقاطعة.',
        en: 'Scrutinizing a complex industrial subsidy or bilateral partnership compact demanding uninterrupted appraisal of legal and fiscal clauses.',
      },
      actionStep: {
        fr: 'Programmer 2 Blocs Hermétiques de 45 minutes par jour dans l’agenda ministériel (ex. 9h00–9h45 et 14h30–15h15) avec messageries désactivées.',
        ar: 'جدولة فترتي تركيز محكمتين (45 دقيقة لكل فترة) يومياً على جدول العمل الوزاري مع إغلاق الإشعارات.',
        en: 'Schedule 2 Hermetic 45-minute focus blocks per day in the ministry calendar with email clients fully muted.',
      },
    },
    {
      scientificBasis: {
        fr: 'Coût de réorientation attentionnelle (Pr Gloria Mark, UC Irvine & MIT) : une seule micro-interruption de 30 secondes impose au cerveau en moyenne 23 minutes et 15 secondes pour rétablir une immersion cognitive équivalente.',
        ar: 'تكلفة استعادة التركيز بعد المقاطعة (أبحاث جامعة كاليفورنيا وMIT): المقاطعة الواحدة لمدة 30 ثانية تتطلب من الدماغ 23 دقيقة في المتوسط لاسترجاع عمق التفكير السابق.',
        en: 'Task-Switching Reorientation Penalty (Prof. Gloria Mark, UC Irvine & MIT): A brief 30-second interruption costs an average of 23 minutes and 15 seconds to regain equivalent depth of focus.',
      },
      ministryCase: {
        fr: 'Passages fréquents de collègues au bureau pour des questions informelles en plein examen de données chiffrées de commerce extérieur.',
        ar: 'الاستفسارات الشفوية المباغتة المتكررة بين المكاتب أثناء فحص إحصائيات دقيقة للتجارة الخارجية.',
        en: 'Frequent drop-ins for informal queries while auditing sensitive external trade balance metrics.',
      },
      actionStep: {
        fr: 'Adopter le signal visuel d’équipe « En Focus Stratégique » et regrouper les échanges informels sur une plage dédiée de 11h30 à 12h00.',
        ar: 'اعتماد إشارة عمل موحدة مع الفريق تفيد بالتركيز المؤقت وتجميع الأسئلة الشفوية في موعد محدد قبل الزوال.',
        en: 'Deploy the team visual signal "In Strategic Focus" and batch informal administrative queries into a dedicated daily window (e.g., 11:30–12:00).',
      },
    },
    {
      scientificBasis: {
        fr: 'Conditionnement neurobiologique du Flow (Pr Mihaly Csikszentmihalyi & Dr Andrew Huberman) : la libération synchronisée de noradrénaline et de dopamine est facilitée par un rituel d’amorce sensoriel et respiratoire constant.',
        ar: 'التهيئة البيولوجية للاستغراق الذهني (Flow): إفراز الدوبامين والنورأدرينالين يتسارع عبر طقوس إدراكية وتنفسية منتظمة تمهد للدخول في المهمة.',
        en: 'Neurobiology of Deep Flow (Prof. Mihaly Csikszentmihalyi & Dr. Andrew Huberman): Dopamine and norepinephrine synchronization is accelerated by sensory and respiratory priming rituals.',
      },
      ministryCase: {
        fr: 'Transition entre une réunion de comité tendue et la finalisation urgente d’un tableau de bord ministériel avant transmission au Cabinet.',
        ar: 'الانتقال السريع من اجتماع لجنة مطول إلى استكمال لوحة قيادة قطاعية عاجلة موجهة لديوان الوزير.',
        en: 'Transitioning directly from a charged committee hearing to the final review of an executive ministerial dashboard for the Minister’s Cabinet.',
      },
      actionStep: {
        fr: 'Rituel d’amorce de 60 secondes : 3 respirations lentes bouche pincée, verre d’eau, et écriture sur bloc-notes de l’objectif unique de la session.',
        ar: 'طقس الدخول السريع في 60 ثانية: 3 تنفسات عميقة، شرب الماء، وتدوين الهدف الحصري لفترة العمل.',
        en: 'Execute the 60-second immersion ritual: 3 deep diaphragmatic breaths, hydrate, and write the single deliverable target on a physical sticky note.',
      },
    },
  ],
}

export function getModuleAcademicSource(moduleId: number): AcademicSourceInfo {
  return moduleAcademicSources[moduleId] || moduleAcademicSources[1]
}

export function getModuleLessonsExpanded(moduleId: number): LessonDetailedContent[] {
  return moduleLessonsExpanded[moduleId] || moduleLessonsExpanded[1]
}

