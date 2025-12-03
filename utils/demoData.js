export const initialUsers = [
  {
    id: 1,
    name: "Dawn Teague",
    status: "online",
  },
  {
    id: 2,
    name: "David Johnson",
    status: "",
  },
  {
    id: 3,
    name: "Andrew Gilbert",
    status: "",
  },
  {
    id: 4,
    name: "Tyrone Derby",
    status: "",
  },
  {
    id: 5,
    name: "Susan Liles",
    status: "",
  },
];

export const initialChats = {
  1: [
    {
      sender: "user",
      text: "Hey Dawn, how’s everything going?",
      time: "10:10 AM",
    },
    { sender: "bot", text: "All good here! How about you?", time: "10:12 AM" },
  ],
  2: [
    { sender: "user", text: "Hey David, saw your email.", time: "9:40 AM" },
    {
      sender: "bot",
      text: "Perfect, let’s sync after lunch.",
      time: "9:41 AM",
    },
  ],
  3: [
    {
      sender: "bot",
      text: "Hey Andrew! Did you check the project files?",
      time: "Yesterday",
    },
  ],
};
