export interface TimelineItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  year: string;
}

export const timelineItems: TimelineItem[] = [
  {
    id: 1,
    icon: "✨",
    title: "The First Time I Saw You",
    description:
      "There are moments in life that split time into before and after. The first time I noticed you was one of those moments — quiet, unremarkable to the world, but something inside me shifted. I didn't understand it then. I understand it now.",
    year: "The Beginning",
  },
  {
    id: 2,
    icon: "🌱",
    title: "The Little Conversations",
    description:
      "The smallest exchanges carried the most weight. A few words here, a shared laugh there. You never knew that those brief conversations were the ones I replayed the most. They felt effortless — that was the rarest part.",
    year: "Growing",
  },
  {
    id: 3,
    icon: "🌊",
    title: "The Moments That Stayed With Me",
    description:
      "Not every memory is loud. Some are quiet — a glance across a room, the way you handled something difficult with grace, the way you treated people when no one was watching. Those moments stayed with me the longest.",
    year: "Remembering",
  },
  {
    id: 4,
    icon: "🔒",
    title: "The Trust I Always Had",
    description:
      "I never had to question whether you were genuine. You simply were. There's something deeply rare about a person whose presence makes you feel safe without any promises being made. You were that person for me.",
    year: "Trust",
  },
  {
    id: 5,
    icon: "🤐",
    title: "The Things I Never Said",
    description:
      "There were words I held onto for too long. Gratitude that went unspoken. Admiration I kept to myself. Not out of fear — but because some things feel too precious to be reduced to words. They lived quietly in the background of everything.",
    year: "Silence",
  },
  {
    id: 6,
    icon: "🏛️",
    title: "The Memories I'll Always Keep",
    description:
      "Even if roads diverge and time moves forward, certain memories become permanent fixtures in who we are. The ones with you are exactly that. They don't fade — they simply become part of the foundation of a better version of me.",
    year: "Forever",
  },
];
