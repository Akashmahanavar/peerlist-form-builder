import { questionTypes } from "@/Data/constants";
import { ChevronDown, Circle, GripVertical, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const QuestionType = ({ question, updateQuestion }) => {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  switch (question.type) {
    case "shortAnswer":
    case "longAnswer":
    case "number":
    case "url":
      return (
        <div className="p-4 border border-gray-300 rounded-xl transition-all animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-full flex flex-col gap-1">
              <input
                type="text"
                className="w-full px-2 border-none focus:outline-none font-medium flex-grow"
                placeholder="Write a question"
                value={question.question}
                onChange={(e) =>
                  updateQuestion(question.id, { question: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full px-2 border-none focus:outline-none text-sm flex-grow"
                placeholder="Write a help text or caption (leave empty if not needed)"
                value={question.description}
                onChange={(e) =>
                  updateQuestion(question.id, { description: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <div className="relative inline-block" ref={dropdownRef}>
                <button
                  className="text-gray-500 text-sm font-medium rounded-xl flex items-center gap-1"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  {questionTypes.find((q) => q.type === question.type).icon}{" "}
                  <ChevronDown width={12} height={12} />
                </button>
                {showDropdown && (
                  <ul className="absolute right-0 mt-2 p-2 min-w-48 bg-white border border-gray-300 rounded-xl text-sm shadow-md z-10 overflow-hidden space-y-1">
                    {questionTypes.map((data) => (
                      <li
                        key={data.type}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center rounded-lg gap-2 data-[selected=true]:bg-gray-200"
                        onClick={(e) =>
                          updateQuestion(question.id, {
                            type: data.type,
                            options:
                              data.type === "singleSelect" ? [""] : undefined,
                          })
                        }
                        data-selected={question.type === data.type}
                      >
                        {data.icon}
                        <span>{data.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <GripVertical
              width={20}
              height={20}
              className="text-gray-500 cursor-grab"
            />
          </div>
          <div className="p-2">
            {question.type === "longAnswer" ? (
              <textarea
                className="w-full p-2 focus:outline-none flex-grow border rounded-xl border-gray-300"
                disabled
              />
            ) : (
              <input
                type="text"
                className="w-full p-2 focus:outline-none flex-grow border rounded-xl border-gray-300"
                disabled
              />
            )}
          </div>
        </div>
      );
    case "singleSelect":
      return (
        <div className="p-4 border border-gray-300 rounded-xl transition-all animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-full flex flex-col gap-1">
              <input
                type="text"
                className="w-full px-2 border-none focus:outline-none font-medium flex-grow"
                placeholder="Write a question"
                value={question.question}
                onChange={(e) =>
                  updateQuestion(question.id, { question: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full px-2 border-none focus:outline-none text-sm flex-grow"
                placeholder="Write a help text or caption"
                value={question.description}
                onChange={(e) =>
                  updateQuestion(question.id, { description: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <div className="relative inline-block" ref={dropdownRef}>
                <button
                  className="text-gray-500 text-sm font-medium rounded-xl flex items-center gap-1"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  {questionTypes.find((q) => q.type === question.type).icon}{" "}
                  <ChevronDown width={12} height={12} />
                </button>
                {showDropdown && (
                  <ul className="absolute right-0 mt-2 p-2 min-w-48 bg-white border border-gray-300 rounded-xl text-sm shadow-md z-10 overflow-hidden space-y-1">
                    {questionTypes.map((data) => (
                      <li
                        key={data.type}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center rounded-lg gap-2 data-[selected=true]:bg-gray-200"
                        onClick={(e) => {
                          setShowDropdown(false);
                          updateQuestion(question.id, {
                            type: data.type,
                            options:
                              data.type === "singleSelect" ? [""] : undefined,
                          });
                        }}
                        data-selected={question.type === data.type}
                      >
                        {data.icon}
                        <span>{data.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <GripVertical
              width={20}
              height={20}
              className="text-gray-500 cursor-grab"
            />
          </div>
          <div className="p-2 flex flex-col gap-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Circle width={20} height={20} className="text-gray-500" />
                <input
                  type="text"
                  className="w-full p-2 focus:outline-none flex-grow border rounded-xl border-gray-300"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(question.options || [])];
                    newOptions[index] = e.target.value;
                    updateQuestion(question.id, { options: newOptions });
                  }}
                />
                {Boolean(question.options.length !== 1) && (
                  <button
                    className=""
                    onClick={() => {
                      const newOptions = question.options?.filter(
                        (_, i) => i !== index
                      );
                      updateQuestion(question.id, { options: newOptions });
                    }}
                  >
                    <X width={20} height={20} className="text-gray-500" />
                  </button>
                )}
                {Boolean(index === question.options.length - 1) && (
                  <button
                    className=""
                    onClick={() => {
                      const newOptions = [...(question.options || []), ""];
                      updateQuestion(question.id, { options: newOptions });
                    }}
                  >
                    <Plus width={20} height={20} className="text-gray-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default QuestionType;
