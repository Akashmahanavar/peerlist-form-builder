import Image from "next/image";
import React, { useState } from "react";
import reorderSymobol from "@/public/reorder.svg";
import { questionTypes } from "@/Data/constants";

const QuestionType = ({ data }) => {
  const [questionType, setQuestionType] = useState(data?.type);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    setValue("");
    setOptions([]);
    setNewOption("");
  };

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions((prev) => [...prev, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    setOptions((prev) => prev.filter((option) => option !== optionToRemove));
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
          <div>
            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Add an option"
                className="border border-gray-300 p-2 rounded-lg flex-1"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="ml-2 px-2 py-1 text-4xl text-center rounded-lg"
              >
                +
              </button>
            </div>
            <div>
              {options.map((option) => (
                <div
                  key={option}
                  className="flex justify-center items-center mb-2"
                >
                  <input
                    type="checkbox"
                    value={option}
                    className="mr-2"
                    checked={value === option}
                    onChange={(e) => setValue(e.target.checked ? option : "")}
                  />
                  <label className="flex-1">{option}</label>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(option)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
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
    <div className="p-4 border border-gray-300 rounded shadow-sm w-full transition-all animate-fade-in">
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
          {questionTypes.map((data) => (
            <option value={data.type} key={data.type}>
              {data.text}
            </option>
          ))}
        </select>
        <Image src={reorderSymobol} alt="" width={16} />
      </div>
      <div>{renderInputField()}</div>
    </div>
  );
};

export default QuestionType;
