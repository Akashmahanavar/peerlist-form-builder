"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import previewArrow from "@/public/preview-arrow.svg";
import Image from "next/image";
import QuestionType from "./QuestionType";
import { formData, questionTypes } from "@/Data/constants";

const Form = () => {
  const [data, setData] = useState(formData);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setData((prevData) => ({
      ...prevData,
      title: newTitle,
    }));
  };
  const handleAddQuestion = (type) => {
    const newQuestion = {
      id: data.questions.length + 1,
      questionText: "",
      type: type || "shortAnswer",
      options: [],
      required: false,
      answer: "",
    };
    setData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, newQuestion], // Append the new question
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div
        style={{
          height: "calc(100vh - 56px)",
        }}
        className="flex flex-col border border-solid w-full max-w-3xl mx-auto mt-14"
      >
        <div className="flex justify-between items-center px-10 h-14 border-b-[1px]">
          <input
            type="text"
            placeholder="Untitled Form"
            onChange={handleTitleChange}
            value={data.title}
            required
            className="text-gray-500 font-bold outline-none w-full"
          />
          <Link
            href="/formlists"
            className="text-gray-500 border border-solid border-gray-500 px-4 py-1 rounded-xl hover:scale-105"
          >
            <div className="flex items-center">
              <span>Preview</span>
              <Image alt="" src={previewArrow} />
            </div>
          </Link>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          <div className="flex justify-center">
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                className="border-2 border-gray-300 px-3 py-1 rounded-xl"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                + Add Question
              </button>
              {showDropdown && (
                <ul className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md z-10">
                  {questionTypes.map((data) => (
                    <li
                      key={data.type}
                      className="px-[10px] py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleAddQuestion(data.type)}
                    >
                      {data.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="my-2 flex flex-col gap-2">
            {data?.questions?.map((data) => (
              <React.Fragment key={data.id}>
                <QuestionType data={data} />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-between px-10 h-14 items-center border-t-[1px]">
          <Link
            href="/formlists"
            className="text-gray-500 border border-solid border-gray-500 px-4 py-1 rounded-xl hover:scale-105"
          >
            Save as Draft
          </Link>
          <Link
            href="/formlists"
            className="bg-[#00AA45] text-white px-4 py-1 rounded-xl hover:scale-105"
          >
            Publish Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
