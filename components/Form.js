"use client";
import { ArrowUpRight, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormPreview from "./FormPreview";
import QuestionType from "./QuestionType";
import { formDataStructure, questionTypes } from "@/Data/constants";

const Form = () => {
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem("formDraft");
    return savedDraft ? JSON.parse(savedDraft) : formDataStructure;
  });
  const [currentStep, setCurrentStep] = useState("create");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const addQuestion = (type) => {
    const newQuestion = {
      id: uuidv4(),
      type,
      question: "",
      description: "",
      options: type === "singleSelect" ? [""] : undefined,
      answer: "",
    };
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, newQuestion],
    }));
    setShowDropdown(false);
  };

  const updateQuestion = (id, updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((q) =>
        q.id === id ? { ...q, ...updatedData } : q
      ),
    }));
  };

  const removeQuestion = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((q) => q.id !== id),
    }));
  };

  const saveForm = () => {
    if (!formData.title) {
      alert("Please add a form title.");
      return;
    }
    if (formData.questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }
    const hasEmptyQuestion = formData.questions.some(
      (q) => !q.question || q.question.trim() === ""
    );
    if (hasEmptyQuestion) {
      alert("All questions must have a valid question text.");
      return;
    }
    setCurrentStep("preview");
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

  if (currentStep === "preview") {
    return (
      <FormPreview
        formData={formData}
        onSubmit={() => setCurrentStep("success")}
      />
    );
  }

  if (currentStep === "success") {
    return (
      <div className="text-center bg-white p-8 rounded-lg shadow mt-16">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Form Submitted Successfully!
        </h2>
        <p className="mb-4 text-gray-600">Thank you for your response.</p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
          onClick={() => setCurrentStep("create")}
        >
          Create New Form
        </button>
      </div>
    );
  }
  const saveAsDraft = () => {
    if (formData.title && formData.questions.length > 0) {
      localStorage.setItem("formDraft", JSON.stringify(formData));
      alert("Form saved as draft!");
    } else {
      alert("Please add a form title and at least one question.");
    }
  };

  return (
    <div>
      <div
        style={{
          height: "calc(100vh - 56px)",
        }}
        className="flex flex-col border border-solid w-full max-w-3xl mx-auto mt-14"
      >
        <div className="flex justify-between items-center px-10 py-4 h-14 border-b-[1px]">
          <input
            type="text"
            placeholder="Untitled Form"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
            value={formData.title}
            required
            className="text-gray-500 font-bold outline-none w-full"
          />
          <button
            onClick={() => setCurrentStep("preview")}
            className="text-gray-500 border border-gray-300 px-4 py-1 text-sm font-medium rounded-xl flex items-end gap-1"
          >
            <span>Preview</span>
            <ArrowUpRight width={16} height={16} />
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              className="text-gray-500 border border-gray-300 px-4 py-1 text-sm font-medium rounded-xl flex items-center gap-1"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <Plus width={16} height={16} />
              <span>Add Question</span>
            </button>
            {showDropdown && (
              <ul className="absolute left-1/2 -translate-x-1/2 mt-2 p-2 min-w-48 bg-white border border-gray-300 rounded-xl text-sm shadow-md z-10 overflow-hidden space-y-1">
                <li
                  key={-1}
                  className="px-4 py-2 cursor-default text-gray-500 uppercase font-semibold bg-gray-200 rounded-lg"
                >
                  Input Types
                </li>
                {questionTypes.map((data) => (
                  <li
                    key={data.type}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center rounded-lg gap-2"
                    onClick={() => addQuestion(data.type)}
                  >
                    {data.icon}
                    <span>{data.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          <div className="flex flex-col space-y-4">
            {formData?.questions?.map((data) => (
              <React.Fragment key={data.id}>
                <QuestionType question={data} updateQuestion={updateQuestion} />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-between px-10 py-4 h-14 items-center border-t-[1px]">
          <button
            onClick={saveAsDraft}
            className="text-gray-500 border border-solid border-gray-500 px-4 py-1 rounded-xl hover:scale-105"
          >
            Save as Draft
          </button>
          <button
            className="bg-[#00AA45] text-white px-4 py-1 rounded-xl hover:scale-105"
            onClick={saveForm}
          >
            Publish Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
