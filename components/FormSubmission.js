'use client'

import { useState } from 'react'

export default function FormSubmission({ questions, formTitle, formDescription, onSuccess }) {
  const [answers, setAnswers] = useState({})

  const updateAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const calculateCompleteness = () => {
    const filledQuestions = Object.keys(answers).filter(key => answers[key] !== '')
    return (filledQuestions.length / questions.length) * 100
  }

  const handleSubmit = () => {
    // Here you would typically send the form data to an API
    console.log('Form submitted:', { formTitle, answers })
    onSuccess()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow mb-4 p-6 border-t-8 border-purple-600">
        <h2 className="text-3xl font-bold mb-2">{formTitle}</h2>
        <p className="text-gray-600 mb-4">{formDescription}</p>
      </div>
      <div className="mb-4 bg-white rounded-lg shadow p-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full"
            style={{ width: `${calculateCompleteness()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{calculateCompleteness().toFixed(0)}% Complete</p>
      </div>
      {questions.map((question) => (
        <div key={question.id} className="bg-white rounded-lg shadow mb-4 p-6">
          <p className="font-medium mb-2">{question.question} <span className="text-red-500">*</span></p>
          {question.type === 'short' && (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:border-purple-500 focus:outline-none"
              onChange={(e) => updateAnswer(question.id, e.target.value)}
            />
          )}
          {question.type === 'long' && (
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:border-purple-500 focus:outline-none"
              rows={4}
              onChange={(e) => updateAnswer(question.id, e.target.value)}
            ></textarea>
          )}
          {question.type === 'single' && (
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${index}`}
                    name={question.id}
                    value={option}
                    onChange={(e) => updateAnswer(question.id, e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`${question.id}-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          )}
          {question.type === 'number' && (
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded focus:border-purple-500 focus:outline-none"
              onChange={(e) => updateAnswer(question.id, e.target.value)}
            />
          )}
          {question.type === 'url' && (
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded focus:border-purple-500 focus:outline-none"
              onChange={(e) => updateAnswer(question.id, e.target.value)}
            />
          )}
        </div>
      ))}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
}

