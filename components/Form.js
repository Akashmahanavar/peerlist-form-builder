"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import previewArrow from "@/public/preview-arrow.svg";
import Image from "next/image";
import QuestionType from "./QuestionType";

const Form = () => {
  const [title, setTitle] = useState("Untitled Form");
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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
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
            <Link
              href="/formlists"
              className="text-black border border-solid border-black px-4 py-1 rounded-xl hover:scale-105"
            >
              Add Question
            </Link>
          </div>
          <QuestionType />
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
