export type Language = "uz" | "ru" | "en";

export interface Translations {
  // General
  platformName: string;
  tagline: string;
  loading: string;

  // Instagram Gatekeeper
  igTitle: string;
  igSubtitle: string;
  igButton: string;
  igVerifyButton: string;
  igVerifying: string;
  igNote: string;

  // Header
  chooseLanguage: string;
  subjects: string;
  howItWorks: string;

  // Subject Cards
  subjectsTitle: string;
  subjectsSubtitle: string;
  startTest: string;
  questionsCount: string;
  minutesCount: string;
  levelLabel: string;
  international: string;
  national: string;

  // Certificate Modal
  certModalTitle: string;
  certModalSubtitle: string;
  certYesButton: string;
  certNoButton: string;
  certFormTitle: string;
  certFullName: string;
  certBirthDate: string;
  certPhoto: string;
  certPhotoHint: string;
  certStartExam: string;
  certNamePlaceholder: string;

  // Exam Engine
  examTitle: string;
  examQuestion: string;
  examOf: string;
  examFlag: string;
  examFlagged: string;
  examPrev: string;
  examNext: string;
  examFinish: string;
  examTimeLeft: string;
  examSaved: string;
  examAutoSave: string;
  examUnanswered: string;
  examConfirmFinish: string;
  examFinishYes: string;
  examFinishNo: string;
  examAnswered: string;
  examNotAnswered: string;
  examFlaggedLabel: string;

  // Results
  resultsTitle: string;
  resultsScore: string;
  resultsLevel: string;
  resultsCorrect: string;
  resultsIncorrect: string;
  resultsTotal: string;
  resultsAnalysis: string;
  resultsYourAnswer: string;
  resultsCorrectAnswer: string;
  resultsExplanation: string;
  resultsGetCert: string;
  resultsRetry: string;
  resultsHome: string;
  resultsSatisfactory: string;
  resultsGood: string;
  resultsExcellent: string;

  // Certificate
  certDownload: string;
  certSerial: string;
  certDate: string;
  certScore: string;
  certLevel: string;
  certIssuedBy: string;
  certFakeStamp: string;
  certShareNote: string;

  // How it works
  howTitle: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step1Desc: string;
  step2Desc: string;
  step3Desc: string;
  step4Desc: string;
}

const translations: Record<Language, Translations> = {
  uz: {
    platformName: "Mock Sertifikat Trenajyori",
    tagline: "Milliy va Xalqaro Sertifikatga Tayyorlanish Platformasi",
    loading: "Yuklanmoqda...",

    igTitle: "Platformaga kirish uchun",
    igSubtitle: "Instagram sahifamizga obuna bo'lishingiz shart",
    igButton: "Instagram sahifasiga o'tish",
    igVerifyButton: "Obunani tasdiqlash",
    igVerifying: "Tekshirilmoqda...",
    igNote: "Obunadan so'ng «Obunani tasdiqlash» tugmasini bosing",

    chooseLanguage: "Tilni tanlang",
    subjects: "Fanlar",
    howItWorks: "Qanday ishlaydi",

    subjectsTitle: "Testni tanlang",
    subjectsSubtitle: "To'rtta yo'nalishdan birini tanlab, rasmiy sertifikat uchun mashq qiling",
    startTest: "Testni boshlash",
    questionsCount: "savol",
    minutesCount: "daqiqa",
    levelLabel: "Daraja",
    international: "Xalqaro",
    national: "Milliy",

    certModalTitle: "Sertifikat kerakmi?",
    certModalSubtitle: "Sinov yakunida rasmiy ko'rinishdagi sertifikat olishni xohlaysizmi?",
    certYesButton: "Ha, sertifikat olaman",
    certNoButton: "Shart emas, shunchaki test topshiraman",
    certFormTitle: "Sertifikat ma'lumotlarini kiriting",
    certFullName: "Ism va Familiya",
    certBirthDate: "Tug'ilgan sana",
    certPhoto: "Fotosurat (3x4)",
    certPhotoHint: "JPG yoki PNG formatida, aniq yuz tasviri",
    certStartExam: "Testni boshlash",
    certNamePlaceholder: "Masalan: Abdullayev Jasur",

    examTitle: "Imtihon",
    examQuestion: "Savol",
    examOf: "dan",
    examFlag: "Belgilash",
    examFlagged: "Belgilangan",
    examPrev: "Oldingi",
    examNext: "Keyingi",
    examFinish: "Testni tugatish",
    examTimeLeft: "Qolgan vaqt",
    examSaved: "Saqlandi",
    examAutoSave: "Avtomatik saqlanmoqda",
    examUnanswered: "ta savol javobsiz qoldi",
    examConfirmFinish: "Testni tugatishni tasdiqlaysizmi?",
    examFinishYes: "Ha, tugatish",
    examFinishNo: "Yo'q, davom etish",
    examAnswered: "Javob berilgan",
    examNotAnswered: "Javob berilmagan",
    examFlaggedLabel: "Ikkilangan",

    resultsTitle: "Test Natijalari",
    resultsScore: "Ball",
    resultsLevel: "Daraja",
    resultsCorrect: "To'g'ri",
    resultsIncorrect: "Noto'g'ri",
    resultsTotal: "Jami",
    resultsAnalysis: "Xatolar Tahlili",
    resultsYourAnswer: "Sizning javobingiz",
    resultsCorrectAnswer: "To'g'ri javob",
    resultsExplanation: "Tushuntirish",
    resultsGetCert: "Sertifikat olish",
    resultsRetry: "Qaytadan urinish",
    resultsHome: "Bosh sahifaga",
    resultsSatisfactory: "Qoniqarli",
    resultsGood: "Yaxshi",
    resultsExcellent: "A'lo",

    certDownload: "Sertifikatni yuklab olish (.PNG)",
    certSerial: "Seriya raqami",
    certDate: "Berilgan sana",
    certScore: "Ball",
    certLevel: "Daraja",
    certIssuedBy: "Trenajyor tomonidan berilgan",
    certFakeStamp: "NORASMIY NAMUNA • FAKE",
    certShareNote: "Bu sertifikat faqat o'quv maqsadida berilgan",

    howTitle: "Qanday ishlaydi?",
    step1: "Fan tanlang",
    step2: "Test topshiring",
    step3: "Natijalarni ko'ring",
    step4: "Sertifikat oling",
    step1Desc: "4 ta fan orasidan o'zingizga kerakligini tanlang",
    step2Desc: "Vaqtga bog'liq real imtihon rejimida savollarni yeching",
    step3Desc: "Batafsil xatolar tahlili bilan natijangizni ko'ring",
    step4Desc: "Rasmiy ko'rinishdagi mock sertifikatni yuklab oling",
  },

  ru: {
    platformName: "Тренажёр Сертификатов",
    tagline: "Платформа для подготовки к национальным и международным сертификатам",
    loading: "Загрузка...",

    igTitle: "Для доступа к платформе",
    igSubtitle: "Подпишитесь на наш Instagram",
    igButton: "Перейти в Instagram",
    igVerifyButton: "Подтвердить подписку",
    igVerifying: "Проверяем...",
    igNote: "После подписки нажмите «Подтвердить подписку»",

    chooseLanguage: "Выбрать язык",
    subjects: "Предметы",
    howItWorks: "Как работает",

    subjectsTitle: "Выберите тест",
    subjectsSubtitle: "Выберите одно из четырёх направлений и практикуйтесь для официального сертификата",
    startTest: "Начать тест",
    questionsCount: "вопросов",
    minutesCount: "минут",
    levelLabel: "Уровень",
    international: "Международный",
    national: "Национальный",

    certModalTitle: "Нужен сертификат?",
    certModalSubtitle: "Хотите получить официально оформленный сертификат по завершении теста?",
    certYesButton: "Да, получить сертификат",
    certNoButton: "Нет, просто пройти тест",
    certFormTitle: "Введите данные для сертификата",
    certFullName: "Имя и Фамилия",
    certBirthDate: "Дата рождения",
    certPhoto: "Фотография (3x4)",
    certPhotoHint: "Формат JPG или PNG, чёткое изображение лица",
    certStartExam: "Начать тест",
    certNamePlaceholder: "Например: Иванов Иван",

    examTitle: "Экзамен",
    examQuestion: "Вопрос",
    examOf: "из",
    examFlag: "Отметить",
    examFlagged: "Отмечен",
    examPrev: "Предыдущий",
    examNext: "Следующий",
    examFinish: "Завершить тест",
    examTimeLeft: "Оставшееся время",
    examSaved: "Сохранено",
    examAutoSave: "Автосохранение",
    examUnanswered: "вопросов без ответа",
    examConfirmFinish: "Подтвердить завершение теста?",
    examFinishYes: "Да, завершить",
    examFinishNo: "Нет, продолжить",
    examAnswered: "Отвечен",
    examNotAnswered: "Без ответа",
    examFlaggedLabel: "Сомнительный",

    resultsTitle: "Результаты теста",
    resultsScore: "Балл",
    resultsLevel: "Уровень",
    resultsCorrect: "Верно",
    resultsIncorrect: "Неверно",
    resultsTotal: "Всего",
    resultsAnalysis: "Анализ ошибок",
    resultsYourAnswer: "Ваш ответ",
    resultsCorrectAnswer: "Правильный ответ",
    resultsExplanation: "Объяснение",
    resultsGetCert: "Получить сертификат",
    resultsRetry: "Попробовать снова",
    resultsHome: "На главную",
    resultsSatisfactory: "Удовлетворительно",
    resultsGood: "Хорошо",
    resultsExcellent: "Отлично",

    certDownload: "Скачать сертификат (.PNG)",
    certSerial: "Серийный номер",
    certDate: "Дата выдачи",
    certScore: "Балл",
    certLevel: "Уровень",
    certIssuedBy: "Выдан тренажёром",
    certFakeStamp: "НЕОФИЦИАЛЬНЫЙ ОБРАЗЕЦ • FAKE",
    certShareNote: "Этот сертификат выдан только в учебных целях",

    howTitle: "Как это работает?",
    step1: "Выберите предмет",
    step2: "Пройдите тест",
    step3: "Смотрите результаты",
    step4: "Получите сертификат",
    step1Desc: "Выберите нужный предмет из 4 вариантов",
    step2Desc: "Решите вопросы в режиме реального экзамена с таймером",
    step3Desc: "Просмотрите результаты с детальным анализом ошибок",
    step4Desc: "Скачайте официально выглядящий mock сертификат",
  },

  en: {
    platformName: "Mock Certificate Trainer",
    tagline: "Platform for National & International Certificate Preparation",
    loading: "Loading...",

    igTitle: "To access the platform",
    igSubtitle: "You must follow our Instagram page",
    igButton: "Go to Instagram",
    igVerifyButton: "Verify Subscription",
    igVerifying: "Verifying...",
    igNote: "After following, click «Verify Subscription»",

    chooseLanguage: "Choose language",
    subjects: "Subjects",
    howItWorks: "How it works",

    subjectsTitle: "Choose a Test",
    subjectsSubtitle: "Select one of four subjects and practice for an official certificate",
    startTest: "Start Test",
    questionsCount: "questions",
    minutesCount: "minutes",
    levelLabel: "Level",
    international: "International",
    national: "National",

    certModalTitle: "Need a certificate?",
    certModalSubtitle: "Would you like to receive an officially styled certificate upon completing the test?",
    certYesButton: "Yes, I want a certificate",
    certNoButton: "No, just take the test",
    certFormTitle: "Enter your certificate details",
    certFullName: "Full Name",
    certBirthDate: "Date of Birth",
    certPhoto: "Photo (3x4)",
    certPhotoHint: "JPG or PNG format, clear face image",
    certStartExam: "Start Exam",
    certNamePlaceholder: "E.g.: John Smith",

    examTitle: "Exam",
    examQuestion: "Question",
    examOf: "of",
    examFlag: "Flag",
    examFlagged: "Flagged",
    examPrev: "Previous",
    examNext: "Next",
    examFinish: "Finish Test",
    examTimeLeft: "Time Remaining",
    examSaved: "Saved",
    examAutoSave: "Auto-saving",
    examUnanswered: "questions unanswered",
    examConfirmFinish: "Confirm finishing the test?",
    examFinishYes: "Yes, finish",
    examFinishNo: "No, continue",
    examAnswered: "Answered",
    examNotAnswered: "Not answered",
    examFlaggedLabel: "Flagged",

    resultsTitle: "Test Results",
    resultsScore: "Score",
    resultsLevel: "Level",
    resultsCorrect: "Correct",
    resultsIncorrect: "Incorrect",
    resultsTotal: "Total",
    resultsAnalysis: "Error Analysis",
    resultsYourAnswer: "Your answer",
    resultsCorrectAnswer: "Correct answer",
    resultsExplanation: "Explanation",
    resultsGetCert: "Get Certificate",
    resultsRetry: "Try Again",
    resultsHome: "Go Home",
    resultsSatisfactory: "Satisfactory",
    resultsGood: "Good",
    resultsExcellent: "Excellent",

    certDownload: "Download Certificate (.PNG)",
    certSerial: "Serial Number",
    certDate: "Issue Date",
    certScore: "Score",
    certLevel: "Level",
    certIssuedBy: "Issued by Trainer",
    certFakeStamp: "UNOFFICIAL SAMPLE • FAKE",
    certShareNote: "This certificate is issued for educational purposes only",

    howTitle: "How does it work?",
    step1: "Choose a subject",
    step2: "Take the test",
    step3: "View results",
    step4: "Get your certificate",
    step1Desc: "Choose the subject you need from 4 options",
    step2Desc: "Solve questions in a real timed exam mode",
    step3Desc: "See your results with detailed error analysis",
    step4Desc: "Download an officially styled mock certificate",
  },
};

export default translations;
