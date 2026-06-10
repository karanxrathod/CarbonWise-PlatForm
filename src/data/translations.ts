export interface TranslationDict {
  appName: string;
  tagline: string;
  globalScore: string;
  scoreLabel: string;
  calculator: string;
  dashboard: string;
  actions: string;
  tracker: string;
  community: string;
  settings: string;
  
  // Calculator Tab
  transport: string;
  carTravel: string;
  publicTransit: string;
  shortFlights: string;
  longFlights: string;
  homeEnergy: string;
  electricity: string;
  gasUsage: string;
  renewableEnergy: string;
  diet: string;
  shopping: string;
  onlineOrders: string;
  newClothes: string;
  electronics: string;
  annualFootprint: string;
  nationalAvgCompare: string;
  parisTargetCompare: string;
  wellDone: string;
  keepImproving: string;
  highAlert: string;
  never: string;
  rarely: string;
  regularly: string;
  daily: string;
  heavyMeat: string;
  moderate: string;
  vegetarian: string;
  vegan: string;
  
  // Dashboard Tab
  sustainabilityRating: string;
  topPercent: string;
  carbonTwin: string;
  futureProjection: string;
  currentAnnual: string;
  withCoach: string;
  coachCommitted: string;
  diagnostics: string;
  totalKg: string;
  projectionChartTitle: string;
  projectionSubtitle: string;
  businessAsUsual: string;
  optimizedModel: string;
  yearlyTarget: string;
  
  // Insights/Actions Tab
  curatedMissionsTitle: string;
  highestEmissionsIn: string;
  potentialSavings: string;
  committedSavings: string;
  treesPlanted: string;
  carKmSaved: string;
  kwhEnergySaved: string;
  actionMissionsHeader: string;
  actionTipInstruction: string;
  savesPerYear: string;
  whyItMatters: string;
  estCost: string;
  financialSavings: string;
  feasibility: string;
  milestones: string;
  verifiedResources: string;
  openSite: string;
  askCoachBtn: string;
  modalSubheading: string;
  doneReading: string;
  retryCoach: string;
  coachEngine: string;
  
  // Tracker Tab
  carbonDefenseProgress: string;
  weeklyMission: string;
  pts: string;
  targetMilestone: string;
  streakDays: string;
  habit1: string;
  habit2: string;
  habit3: string;
  habit4: string;
  habit5: string;
  habit6: string;
  habit7: string;
  missionLow: string;
  missionMedium: string;
  missionHigh: string;
  
  // Community Tab
  globalRanking: string;
  topPercentCommunity: string;
  trophyShelf: string;
  unlocked: string;
  locked: string;
  inspireOthers: string;
  shareDesc: string;
  generateCard: string;
  shareAlertText: string;
}

export const translations: Record<'en' | 'hi', TranslationDict> = {
  en: {
    appName: "CarbonWise",
    tagline: "Track. Understand. Act.",
    globalScore: "Global Score",
    scoreLabel: "Score",
    calculator: "Calculator",
    dashboard: "Dashboard",
    actions: "Actions",
    tracker: "Tracker",
    community: "Community",
    settings: "Settings",
    
    // Calculator Tab
    transport: "Transport",
    carTravel: "Car travel (km/week)",
    publicTransit: "Public transit usage",
    shortFlights: "Short flights (per year)",
    longFlights: "Long flights (per year)",
    homeEnergy: "Home Energy",
    electricity: "Electricity (kWh/month)",
    gasUsage: "Gas usage (units/month)",
    renewableEnergy: "Renewable energy source",
    diet: "Diet",
    shopping: "Shopping & Waste",
    onlineOrders: "Online orders/month",
    newClothes: "New clothes/month",
    electronics: "Electronics/year",
    annualFootprint: "Your Annual Footprint",
    nationalAvgCompare: "of Global Average (4.7t)",
    parisTargetCompare: "of Paris Accord (2.3t)",
    wellDone: "Well done! Ideal climate output.",
    keepImproving: "Keep improving! Near global average.",
    highAlert: "Emissions are high. Take actions!",
    never: "Never",
    rarely: "Rarely",
    regularly: "Regularly",
    daily: "Daily",
    heavyMeat: "Heavy Meat",
    moderate: "Moderate",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    
    // Dashboard Tab
    sustainabilityRating: "Sustainability Rating",
    topPercent: "Top {pct}% globally",
    carbonTwin: "AI Carbon Twin",
    futureProjection: "Future Projection Model",
    currentAnnual: "Current Annual Total",
    withCoach: "With Coach Actions",
    coachCommitted: "You are committed to reducing {reduction} kg CO₂ per year.",
    diagnostics: "Emissions Diagnostics",
    totalKg: "Total kg",
    projectionChartTitle: "Advanced 5-Year Projection",
    projectionSubtitle: "Visualizing the compound effect of taking action vs passive trajectory based on your data engine.",
    businessAsUsual: "Business as usual",
    optimizedModel: "Optimized Model",
    yearlyTarget: "Target",
    
    // Insights/Actions Tab
    curatedMissionsTitle: "Curated Climate Coach Missions",
    highestEmissionsIn: "I've analyzed your profile. Your highest emissions come from {category} ({val} kg). Here are the selected mission targets to maximize your impact. Click to expand details!",
    potentialSavings: "Potential Savings",
    committedSavings: "Committed Savings",
    treesPlanted: "Trees Planted Effectively",
    carKmSaved: "Car KM Counteracted",
    kwhEnergySaved: "kWh Home Energy",
    actionMissionsHeader: "Personalized Action Missions",
    actionTipInstruction: "Select card for tips + links",
    savesPerYear: "Saves {val} kg/yr",
    whyItMatters: "Why It Matters",
    estCost: "Estimated Cost",
    financialSavings: "Financial Savings",
    feasibility: "Feasibility Progress",
    milestones: "Commencement Milestones",
    verifiedResources: "Verified Technical Resource Links",
    openSite: "Open Site →",
    askCoachBtn: "Ask AI Coach for Tailored Plan",
    modalSubheading: "Dynamic Transition Playbook",
    doneReading: "Done Reading",
    retryCoach: "Retry Coach Consultation",
    coachEngine: "Model Engine: gemini-3.5-flash",
    
    // Tracker Tab
    carbonDefenseProgress: "Carbon Defense Progress",
    weeklyMission: "Personalized Weekly Mission",
    pts: "0 pts",
    targetMilestone: "Target Milestone",
    streakDays: "days",
    habit1: "Used public transport or walked/cycled",
    habit2: "Ate a fully plant-based meal today",
    habit3: "Avoided all single-use plastics",
    habit4: "Unplugged unused devices",
    habit5: "Limited shower time to 5 mins",
    habit6: "Brought a reusable cup/bottle",
    habit7: "Sorted recycling and compost",
    missionLow: "Awaken your eco-consciousness: Achieve 5 combined habit streaks.",
    missionMedium: "Momentum building: Reach 15 active habit streaks for a major impact.",
    missionHigh: "Sustainability Masterclass: Maintain all positive habits for the week.",
    
    // Community Tab
    globalRanking: "Global Ranking",
    topPercentCommunity: "Top {pct}%",
    trophyShelf: "Trophy Shelf",
    unlocked: "Unlocked",
    locked: "Locked",
    inspireOthers: "Inspire Others",
    shareDesc: "Share your sustainability score and challenge your friends to beat it. Every action counts.",
    generateCard: "Generate Social Card",
    shareAlertText: "Generating social card: \"I'm fighting climate change! My CarbonWise Sustainability Score is {score}/100!\""
  },
  hi: {
    appName: "कार्बनवाइज़",
    tagline: "ट्रैक करें। समझें। कार्य करें।",
    globalScore: "वैश्विक स्कोर",
    scoreLabel: "स्कोर",
    calculator: "कैलकुलेटर",
    dashboard: "डैशबोर्ड",
    actions: "कार्य",
    tracker: "ट्रैकर",
    community: "कम्युनिटी",
    settings: "सेटिंग्स",
    
    // Calculator Tab
    transport: "परिवहन",
    carTravel: "कार यात्रा (किमी/सप्ताह)",
    publicTransit: "सार्वजनिक परिवहन का उपयोग",
    shortFlights: "छोटी उड़ानें (प्रति वर्ष)",
    longFlights: "लंबी उड़ानें (प्रति वर्ष)",
    homeEnergy: "घरेलू ऊर्जा",
    electricity: "बिजली (kWh/महीना)",
    gasUsage: "गैस का उपयोग (यूनिट/महीना)",
    renewableEnergy: "नवीकरणीय ऊर्जा स्रोत",
    diet: "आहार",
    shopping: "खरीदारी और कचरा",
    onlineOrders: "ऑनलाइन ऑर्डर/महीना",
    newClothes: "नए कपड़े/महीना",
    electronics: "इलेक्ट्रॉनिक्स/वर्ष",
    annualFootprint: "आपका वार्षिक फुटप्रिंट",
    nationalAvgCompare: "वैश्विक औसत का (4.7t)",
    parisTargetCompare: "पेरिस समझौते का (2.3t)",
    wellDone: "बहुत बढ़िया! आदर्श जलवायु आउटपुट।",
    keepImproving: "सुधार जारी रखें! वैश्विक औसत के करीब।",
    highAlert: "उत्सर्जन अधिक है। उपाय करें!",
    never: "कभी नहीं",
    rarely: "शायद ही कभी",
    regularly: "नियमित रूप से",
    daily: "रोजाना",
    heavyMeat: "भारी मांस",
    moderate: "सामान्य",
    vegetarian: "शाकाहारी",
    vegan: "वीगन",
    
    // Dashboard Tab
    sustainabilityRating: "सस्टेनेबिलिटी रेटिंग",
    topPercent: "वैश्विक स्तर पर शीर्ष {pct}% में",
    carbonTwin: "एआई कार्बन ट्विन",
    futureProjection: "भविष्य का अनुमान मॉडल",
    currentAnnual: "वर्तमान वार्षिक कुल",
    withCoach: "कोच के उपायों के बाद",
    coachCommitted: "आप प्रति वर्ष {reduction} किलोग्राम CO₂ कम करने के लिए प्रतिबद्ध हैं।",
    diagnostics: "उत्सर्जन विश्लेषण",
    totalKg: "कुल किलोग्राम",
    projectionChartTitle: "उन्नत 5-वर्षीय अनुमान",
    projectionSubtitle: "कार्य करने बनाम निष्क्रिय रहने के संयुक्त प्रभावों का विज़ुअलाइज़ेशन।",
    businessAsUsual: "सामान्य स्थिति",
    optimizedModel: "अनुकूलित मॉडल",
    yearlyTarget: "लक्ष्य",
    
    // Insights/Actions Tab
    curatedMissionsTitle: "Curated क्लाइमेट कोच मिशन",
    highestEmissionsIn: "मैंने आपके प्रोफाइल का विश्लेषण किया है। आपका सबसे अधिक उत्सर्जन {category} ({val} किलोग्राम) से होता है। प्रभाव बढ़ाने के लिए ये मिशन चुनें। विवरण देखने के लिए क्लिक करें!",
    potentialSavings: "संभावित बचत",
    committedSavings: "प्रतिबद्ध बचत",
    treesPlanted: "प्रभावी ढंग से लगाए गए पेड़",
    carKmSaved: "कार किमी बेअसर",
    kwhEnergySaved: "kWh घरेलू ऊर्जा बचत",
    actionMissionsHeader: "व्यक्तिगत एक्शन मिशन",
    actionTipInstruction: "टिप्स और लिंक्स के लिए क्लिक करें",
    savesPerYear: "{val} किलोग्राम/वर्ष बचाता है",
    whyItMatters: "यह क्यों महत्वपूर्ण है",
    estCost: "अनुमानित लागत",
    financialSavings: "वित्तीय बचत",
    feasibility: "संभाव्यता प्रगति",
    milestones: "शुरुआती लक्ष्य",
    verifiedResources: "सत्यापित तकनीकी संसाधन कड़ियां",
    openSite: "वेबसाइट खोलें →",
    askCoachBtn: "व्यक्तिगत योजना के लिए AI कोच से पूछें",
    modalSubheading: "डायनेमिक ट्रांज़िशन प्लेबुक",
    doneReading: "विवरण पढ़ लिया",
    retryCoach: "कोच से पुनः परामर्श करें",
    coachEngine: "मॉडल इंजन: gemini-3.5-flash",
    
    // Tracker Tab
    carbonDefenseProgress: "कार्बन डिफेंस प्रगति",
    weeklyMission: "व्यक्तिगत साप्ताहिक मिशन",
    pts: "0 अंक",
    targetMilestone: "लक्ष्य मील का पत्थर",
    streakDays: "दिन",
    habit1: "सार्वजनिक परिवहन, पैदल या साइकिल का उपयोग किया",
    habit2: "आज पूरी तरह से पौधे-आधारित (वीगन) भोजन खाया",
    habit3: "एकल-उपयोग प्लास्टिक से पूरी तरह परहेज किया",
    habit4: "अप्रयुक्त उपकरणों को अनप्लग किया",
    habit5: "शॉवर का समय 5 मिनट तक सीमित रखा",
    habit6: "पुनः प्रयोज्य कप/बोतल साथ लाए",
    habit7: "रीसाइक्लिंग और खाद को अलग किया",
    missionLow: "अपनी पर्यावरण-चेतना जगाएं: कुल 5 आदतों का सिलसिला हासिल करें।",
    missionMedium: "गति बन रही है: बड़े प्रभाव के लिए 15 सक्रिय आदतों का सिलसिला हासिल करें।",
    missionHigh: "सस्टेनेबिलिटी मास्टरक्लास: सप्ताह के लिए सभी सकारात्मक आदतें बनाए रखें।",
    
    // Community Tab
    globalRanking: "वैश्विक रैंकिंग",
    topPercentCommunity: "शीर्ष {pct}%",
    trophyShelf: "टॉफी शेल्फ",
    unlocked: "अनलॉक किया गया",
    locked: "लॉक किया गया",
    inspireOthers: "दूसरों को प्रेरित करें",
    shareDesc: "अपना सस्टेनेबिलिटी स्कोर साझा करें और अपने दोस्तों को चुनौती दें। हर कदम मायने रखता है।",
    generateCard: "सोशल कार्ड बनाएं",
    shareAlertText: "सोशल कार्ड जनरेट हो रहा है: \"मैं जलवायु परिवर्तन से लड़ रहा हूँ! मेरा कार्बनवाइज़ सस्टेनेबिलिटी स्कोर {score}/100 है!\""
  }
};
