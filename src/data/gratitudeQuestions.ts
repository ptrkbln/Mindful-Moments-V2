export const TOPICS = [
  "Self",
  "Others",
  "Nature",
  "Home",
  "Skills",
  "Experiences",
] as const;

// derive the union type from TOPICS
export type Topic = (typeof TOPICS)[number];

export type DailyTask = {
  id: `${Topic}-${number}`;
  topic: Topic;
  task: string;
  followUps: string[];
};

export const gratitudeQuestions: DailyTask[] = [
  // Self
  {
    id: "Self-1",
    topic: "Self",
    task: "What's one personal strength you're grateful for today?",
    followUps: [
      "How did you use this strength recently?",
      "How can you lean on it tomorrow?",
    ],
  },
  {
    id: "Self-2",
    topic: "Self",
    task: "Recall a recent moment of calm or peace.",
    followUps: ["What created that calm?", "How can you create more of it?"],
  },
  {
    id: "Self-3",
    topic: "Self",
    task: "Think of a challenge you overcame.",
    followUps: ["What did you learn?", "How did you grow from it?"],
  },
  {
    id: "Self-4",
    topic: "Self",
    task: "Notice something small you enjoyed today.",
    followUps: [
      "Why did it stand out?",
      "How can you notice more of these moments?",
    ],
  },

  // Others
  {
    id: "Others-1",
    topic: "Others",
    task: "Think of someone who supported you recently.",
    followUps: ["What did they do?", "How could you thank them?"],
  },
  {
    id: "Others-2",
    topic: "Others",
    task: "Recall a kind act you witnessed or received.",
    followUps: ["What was the act?", "How did it make you feel?"],
  },
  {
    id: "Others-3",
    topic: "Others",
    task: "Think of a meaningful relationship in your life.",
    followUps: ["What makes it special?", "How does it enrich your life?"],
  },
  {
    id: "Others-4",
    topic: "Others",
    task: "Recall a joyful moment with a friend or family.",
    followUps: ["What made it memorable?", "How did it strengthen your bond?"],
  },

  // Nature
  {
    id: "Nature-1",
    topic: "Nature",
    task: "Think of a recent moment outdoors that made you smile.",
    followUps: ["What did you notice?", "How can you spend more time outside?"],
  },
  {
    id: "Nature-2",
    topic: "Nature",
    task: "Describe something in nature you find beautiful.",
    followUps: [
      "Why does it stand out to you?",
      "How can you enjoy it more often?",
    ],
  },
  {
    id: "Nature-3",
    topic: "Nature",
    task: "Write about an animal you feel grateful for.",
    followUps: [
      "What role does it play in your life?",
      "What memories do you cherish?",
    ],
  },
  {
    id: "Nature-4",
    topic: "Nature",
    task: "Recall a time the weather lifted your spirits.",
    followUps: ["What was the weather like?", "How did it change your mood?"],
  },

  // Home
  {
    id: "Home-1",
    topic: "Home",
    task: "List three things about your home you're thankful for.",
    followUps: ["Why do they matter to you?", "How do they add comfort?"],
  },
  {
    id: "Home-2",
    topic: "Home",
    task: "Recall a cozy moment you had at home recently.",
    followUps: ["What made it cozy?", "How did it affect your mood?"],
  },
  {
    id: "Home-3",
    topic: "Home",
    task: "Think of a daily routine at home that supports you.",
    followUps: ["How does it help your day?", "Why do you value it?"],
  },
  {
    id: "Home-4",
    topic: "Home",
    task: "Reflect on a special object in your home.",
    followUps: ["Why is it meaningful?", "What memories are tied to it?"],
  },

  // Skills
  {
    id: "Skills-1",
    topic: "Skills",
    task: "What skill are you grateful to have developed?",
    followUps: [
      "How has it helped you recently?",
      "Why does it matter to you?",
    ],
  },
  {
    id: "Skills-2",
    topic: "Skills",
    task: "Think of a recent accomplishment you're proud of.",
    followUps: ["What steps did you take?", "How did it change you?"],
  },
  {
    id: "Skills-3",
    topic: "Skills",
    task: "Recall something new you learned recently.",
    followUps: ["How did you learn it?", "How has it benefited you?"],
  },
  {
    id: "Skills-4",
    topic: "Skills",
    task: "Write about a time your creativity shined.",
    followUps: ["What did you create?", "How did the process feel?"],
  },

  // Experiences
  {
    id: "Experiences-1",
    topic: "Experiences",
    task: "Recall a recent positive experience.",
    followUps: ["What made it special?", "How did it affect you?"],
  },
  {
    id: "Experiences-2",
    topic: "Experiences",
    task: "Think of a trip or outing you feel grateful for.",
    followUps: ["What stood out about it?", "What memory stays with you most?"],
  },
  {
    id: "Experiences-3",
    topic: "Experiences",
    task: "Describe a joyful surprise you had recently.",
    followUps: ["What was surprising?", "How did it affect your day?"],
  },
  {
    id: "Experiences-4",
    topic: "Experiences",
    task: "Write about an inspiring moment you experienced.",
    followUps: ["What inspired you?", "How did it shape your thinking?"],
  },
];
