import { AlignLeft, CircleDot, Hash, Link2, Minus } from "lucide-react";

export const formDataStructure = {
  id: "",
  title: "",
  description: "",
  questions: [],
  status: {
    isComplete: false,
    completionPercentage: 0,
    isSubmitted: false,
  },
};

export const questionTypes = [
  {
    type: "shortAnswer",
    text: "Short Answer",
    icon: <Minus height={20} width={20} />,
  },
  {
    type: "longAnswer",
    text: "Long Answer",
    icon: <AlignLeft height={20} width={20} />,
  },
  {
    type: "singleSelect",
    text: "Single Select",
    icon: <CircleDot height={20} width={20} />,
  },
  { type: "number", text: "Number", icon: <Hash height={20} width={20} /> },
  {
    type: "url",
    text: "URL",
    icon: <Link2 height={20} width={20} className="-rotate-45" />,
  },
];
