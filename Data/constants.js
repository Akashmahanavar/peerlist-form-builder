export const formData = {
  id: "uniqueFormId", // Unique identifier for the form
  title: "", // Title of the form
  description: "", // Optional description
  questions: [],
  status: {
    isComplete: false,
    completionPercentage: 0,
    isSubmitted: false,
  },
};

export const questionData = {
  id: 0,
  questionText: "",
  type: "",
  options: [],
  required: true,
  answer: "",
};
export const formList = [];

export const questionTypes = [
  { type: "shortAnswer", text: "📃Short Answer" },
  { type: "longAnswer", text: "📜Long Answer" },
  { type: "singleSelect", text: "⏺️Single Select" },
  { type: "number", text: "🔢Number" },
  { type: "url", text: "🔗URL" },
];
