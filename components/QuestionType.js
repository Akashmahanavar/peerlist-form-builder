import Image from "next/image";
import React, { useState } from "react";
import reorderSymobol from "@/public/reorder.svg";

const QuestionType = () => {
  const [questionType, setQuestionType] = useState("shortAnswer");
  const [value, setValue] = useState("");

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    setValue("");
  };

  const renderInputField = () => {
    switch (questionType) {
      case "shortAnswer":
        return (
          <input
            type="text"
            placeholder="Short answer"
            className="border border-gray-300 p-2 rounded-lg w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      case "longAnswer":
        return (
          <textarea
            placeholder="Long answer"
            className="border border-gray-300 p-2 rounded-lg w-full"
            rows="4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      case "singleSelect":
        return (
          <select
            className="border border-gray-300 p-2 rounded-lg w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            placeholder="Enter a number"
            className="border border-gray-300 p-2 rounded-lg w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      case "url":
        return (
          <input
            type="url"
            placeholder="Enter a URL"
            className="border border-gray-300 p-2 rounded-lg w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-sm w-full">
      <div className="mb-1 flex items-center">
        <input
          type="text"
          placeholder="write a question"
          className="p-1 rounded w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select
          className="p-1 w-11 bg-transparent rounded-md"
          value={questionType}
          onChange={handleQuestionTypeChange}
        >
          <option value="shortAnswer">{"📃"}Short Answer</option>
          <option value="longAnswer">{"📜"}Long Answer</option>
          <option value="singleSelect">{"⏺️"}Single Select</option>
          <option value="number">{"🔢"}Number</option>
          <option value="url">{"🔗"}URL</option>
        </select>
        <Image src={reorderSymobol} alt="" width={16} />
      </div>
      <div>{renderInputField()}</div>
    </div>
  );
};

export default QuestionType;
