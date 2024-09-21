// Make sure to include these imports:
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the AI model
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log(process.env.REACT_APP_GEMINI_API_KEY)

const Gemini = () => {
  const [response, setResponse] = useState("");

  const [question, setQuestion] = useState("");

  const handleGenerateContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    setResponse(result.response.text());
  };

  return (
    <div className="app">
        <div>
        <div className="w-96">
  <div className="relative w-full min-w-[200px]">
    <textarea
      className="peer h-full bg-white  min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
      value={question}
      onChange={(e)=>{
        e.preventDefault();
        setQuestion(e.target.value);
      }}
      ></textarea>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      
    </label>
  </div>
</div>
        </div>
      <button  onClick={(e)=>{
        e.preventDefault();
        if(question !== ""){
            handleGenerateContent(question)
        }
      }} className="btn bg-black text-white py-3 px-2 rounded-sm">
        Fetch Details
      </button>
      {response && (
        <div className="response">
          <h2>Generated Story:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Gemini;
