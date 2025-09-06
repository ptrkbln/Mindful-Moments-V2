type Topic = "Self" | "Others" | "Nature" | "Home" | "Skills" | "Experiences";

type DailyTask = {
  id: string;
  topic: Topic;
  task: string;
  followUps: string[];
};

export const gratitudeQuestions: DailyTask[] = [
  // Self
  {
    id: "self-1",
    topic: "Self",
    task: "What's one personal strength you're grateful for today?",
    followUps: [
      "How did you use this strength recently?",
      "How does it support your well-being?",
      "How can you lean on it tomorrow?",
    ],
  },
  {
    id: "self-2",
    topic: "Self",
    task: "Recall a recent moment of calm or peace.",
    followUps: [
      "What created that calm?",
      "How did it affect your mood?",
      "How can you create more of it?",
    ],
  },
  {
    id: "self-3",
    topic: "Self",
    task: "Think of a challenge you overcame. What did you learn?",
    followUps: [
      "Which skills helped you through it?",
      "How did you grow from it?",
      "How will you face future challenges differently?",
    ],
  },
  {
    id: "self-4",
    topic: "Self",
    task: "Notice something small you enjoyed today.",
    followUps: [
      "Why did it stand out?",
      "How did it make you feel?",
      "How can you notice more of these moments?",
    ],
  },

  // Others
  {
    id: "others-1",
    topic: "Others",
    task: "Think of someone who supported you recently.",
    followUps: [
      "What did they do?",
      "How did it affect you?",
      "How could you thank them?",
    ],
  },
  {
    id: "others-2",
    topic: "Others",
    task: "Recall a kind act you witnessed or received.",
    followUps: [
      "What was the act?",
      "How did it make you feel?",
      "How can you pass kindness forward?",
    ],
  },
  {
    id: "others-3",
    topic: "Others",
    task: "Reflect on a meaningful relationship in your life.",
    followUps: [
      "What makes it special?",
      "How does it enrich your life?",
      "How can you nurture it?",
    ],
  },
  {
    id: "others-4",
    topic: "Others",
    task: "Write about a joyful moment with a friend or family member.",
    followUps: [
      "What made it memorable?",
      "How did it strengthen your bond?",
      "How can you create more moments like it?",
    ],
  },

  // Nature
  {
    id: "nature-1",
    topic: "Nature",
    task: "Think of a recent moment outdoors that made you smile.",
    followUps: [
      "What did you notice?",
      "How did it affect your mood?",
      "How can you spend more time outside?",
    ],
  },
  {
    id: "nature-2",
    topic: "Nature",
    task: "Describe something in nature you find beautiful.",
    followUps: [
      "Why does it stand out to you?",
      "What feelings does it spark?",
      "How can you enjoy it more often?",
    ],
  },
  {
    id: "nature-3",
    topic: "Nature",
    task: "Write about an animal you feel grateful for.",
    followUps: [
      "What role does it play in your life?",
      "What memories do you cherish?",
      "How can you show it care?",
    ],
  },
  {
    id: "nature-4",
    topic: "Nature",
    task: "Recall a time the weather lifted your spirits.",
    followUps: [
      "What was the weather like?",
      "How did it change your mood?",
      "How can you notice these small shifts more often?",
    ],
  },

  // Home
  {
    id: "home-1",
    topic: "Home",
    task: "List three things about your home you're thankful for.",
    followUps: [
      "Why do they matter to you?",
      "How do they add comfort?",
      "How can you appreciate them more?",
    ],
  },
  {
    id: "home-2",
    topic: "Home",
    task: "Recall a cozy moment you had at home recently.",
    followUps: [
      "What made it cozy?",
      "How did it affect your mood?",
      "How can you create more of these?",
    ],
  },
  {
    id: "home-3",
    topic: "Home",
    task: "Think of a daily routine at home that supports you.",
    followUps: [
      "How does it help your day?",
      "Why do you value it?",
      "How could you improve it?",
    ],
  },
  {
    id: "home-4",
    topic: "Home",
    task: "Reflect on a special object in your home.",
    followUps: [
      "Why is it meaningful?",
      "What memories are tied to it?",
      "How can you honor its value?",
    ],
  },

  // Skills
  {
    id: "skills-1",
    topic: "Skills",
    task: "What skill are you grateful to have developed?",
    followUps: [
      "How has it helped you recently?",
      "Why does it matter to you?",
      "How can you keep improving it?",
    ],
  },
  {
    id: "skills-2",
    topic: "Skills",
    task: "Think of a recent accomplishment you're proud of.",
    followUps: [
      "What steps did you take?",
      "How did it change you?",
      "What's the next goal?",
    ],
  },
  {
    id: "skills-3",
    topic: "Skills",
    task: "Recall something new you learned recently.",
    followUps: [
      "How did you learn it?",
      "How has it benefited you?",
      "What do you want to learn next?",
    ],
  },
  {
    id: "skills-4",
    topic: "Skills",
    task: "Write about a time your creativity shined.",
    followUps: [
      "What did you create?",
      "How did the process feel?",
      "How can you bring more creativity into daily life?",
    ],
  },

  // Experiences
  {
    id: "exp-1",
    topic: "Experiences",
    task: "Recall a recent positive experience.",
    followUps: [
      "What made it special?",
      "How did it affect you?",
      "What lasting impact did it have?",
    ],
  },
  {
    id: "exp-2",
    topic: "Experiences",
    task: "Think of a trip or outing you feel grateful for.",
    followUps: [
      "What stood out about it?",
      "How did it change your outlook?",
      "What memory stays with you most?",
    ],
  },
  {
    id: "exp-3",
    topic: "Experiences",
    task: "Describe a joyful surprise you had recently.",
    followUps: [
      "What was surprising?",
      "Why did it matter?",
      "How did it affect your day?",
    ],
  },
  {
    id: "exp-4",
    topic: "Experiences",
    task: "Write about an inspiring moment you experienced.",
    followUps: [
      "What inspired you?",
      "How did it shape your thinking?",
      "How can you keep that inspiration alive?",
    ],
  },
];
