export const botReplies = [
  "TSK-10 Speed Optimization is blocking production — highest priority!",
  "TSK-6 Redesign Checkout Flow has 2 open blockers on the release branch.",
  "TSK-20 Enhance Search Functionality needs a new owner — can you take it?",
  "I can reassign any of these tasks. Which one?",
  "All three tasks are in the current sprint. Want a full breakdown?",
  "I can create a summary report for the team if you'd like.",
];

export const initialMessages = [
  { role: "bot", text: "Hi! I found 3 critical tasks needing attention. How can I help?" },
];

export const initialChats = {
  1: { title: "Critical tasks review", msgs: [
    { role: "bot", text: "Hi! I found 3 critical tasks needing attention. How can I help?" }
  ]},
};