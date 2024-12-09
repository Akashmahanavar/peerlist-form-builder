import { useState, useEffect } from "react";

export default function FormPreview({ formData, onSubmit }) {
  const [submissionData, setSubmissionData] = useState(() =>
    formData.questions.map((question) => ({ ...question, answer: "" }))
  );
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const totalQuestions = submissionData.length;
    const answeredQuestions = submissionData.filter((q) => q.answer).length;
    setCompletionPercentage(
      Math.round((answeredQuestions / totalQuestions) * 100)
    );
  }, [submissionData]);

  const handleAnswerChange = (id, answer) => {
    setSubmissionData((prevData) =>
      prevData.map((q) => (q.id === id ? { ...q, answer } : q))
    );
  };

  const handleNumberInputChange = (id, value) => {
    if (!isNaN(value) || value === "") {
      handleAnswerChange(id, value);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="w-full flex items-center mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2 relative">
          <div
            className="bg-[#00AA45] h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="ml-4 text-sm font-medium">
          {completionPercentage}%
        </span>
      </div>

      <div className="bg-white rounded-lg shadow mb-4 p-6 border-t-8 border-[#00AA45]">
        <h2 className="text-3xl font-bold mb-2">{formData?.title}</h2>
      </div>

      {submissionData.map((question) => (
        <div key={question.id} className="bg-white rounded-lg shadow mb-4 p-6">
          <p className="font-medium mb-2">
            {question.question}{" "}
            {question.isRequired && <span className="text-red-500">*</span>}
          </p>

          {question.type === "shortAnswer" && (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your answer"
              value={question.answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          )}
          {question.type === "longAnswer" && (
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              placeholder="Enter your detailed answer"
              value={question.answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            ></textarea>
          )}

          {question.type === "singleSelect" && (
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${index}`}
                    name={question.id}
                    value={option}
                    className="mr-2"
                    checked={question.answer === option}
                    onChange={() => handleAnswerChange(question.id, option)}
                  />
                  <label htmlFor={`${question.id}-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          )}

          {question.type === "number" && (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a number"
              value={question.answer}
              onChange={(e) =>
                handleNumberInputChange(question.id, e.target.value)
              }
            />
          )}

          {question.type === "url" && (
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a URL"
              value={question.answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        className="bg-[#00AA45] text-white px-4 py-2 rounded hover:bg-[#00AA4577] transition duration-200"
        onClick={() => onSubmit(submissionData)}
      >
        Submit
      </button>
    </div>
  );
}
