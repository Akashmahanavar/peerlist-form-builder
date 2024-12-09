export default function FormPreview({ questions, formTitle, formDescription, onSubmit }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow mb-4 p-6 border-t-8 border-purple-600">
        <h2 className="text-3xl font-bold mb-2">{formTitle}</h2>
        <p className="text-gray-600 mb-4">{formDescription}</p>
      </div>
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white rounded-lg shadow mb-4 p-6">
          <p className="font-medium mb-2">{question.question} <span className="text-red-500">*</span></p>
          {question.type === 'short' && <input type="text" className="w-full p-2 border border-gray-300 rounded" />}
          {question.type === 'long' && <textarea className="w-full p-2 border border-gray-300 rounded" rows={4}></textarea>}
          {question.type === 'single' && (
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input type="radio" id={`${question.id}-${index}`} name={question.id} value={option} className="mr-2" />
                  <label htmlFor={`${question.id}-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          )}
          {question.type === 'number' && <input type="number" className="w-full p-2 border border-gray-300 rounded" />}
          {question.type === 'url' && <input type="url" className="w-full p-2 border border-gray-300 rounded" />}
        </div>
      ))}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  )
}

