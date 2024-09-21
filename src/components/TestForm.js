import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the AI model
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Questions and Answers
const questions = [
  {
    question: "How do you prefer spending your free time?",
    options: ["a) Reading books", "b) Playing sports", "c) Experimenting with technology", "d) Socializing with friends"],
  },
  {
    question: "What type of environment do you feel most productive in?",
    options: ["a) A quiet, organized space", "b) Outdoors and active settings", "c) A fast-paced and dynamic environment", "d) A collaborative and creative workspace"],
  },
  {
    question: "Which type of tasks do you enjoy most?",
    options: ["a) Analyzing data or solving puzzles", "b) Building things or working with hands", "c) Creating visual or written content", "d) Leading and organizing events"],
  },
  {
    question: "How do you approach challenges?",
    options: ["a) Methodically and carefully", "b) With physical action and endurance", "c) With creativity and innovation", "d) By rallying others to find a solution"],
  },
  {
    question: "What kind of learning do you enjoy most?",
    options: ["a) Logical thinking and problem-solving", "b) Hands-on learning with tools or equipment", "c) Artistic expression through mediums", "d) Interpersonal or leadership skills"],
  },
  {
    question: "How do you prefer to work?",
    options: ["a) Alone, with focus and detail", "b) As part of a physical team", "c) As a creator or in a flexible environment", "d) As a leader or communicator"],
  },
  {
    question: "What is your ideal weekend like?",
    options: ["a) Relaxing with a good book or movie", "b) Engaging in a sporting event or workout", "c) Working on personal creative projects", "d) Networking or attending social events"],
  },
  {
    question: "Which of the following motivates you most?",
    options: ["a) Solving complex problems", "b) Physical accomplishment or craftsmanship", "c) Expressing creativity or designing", "d) Helping others achieve their goals"],
  },
  {
    question: "How do you handle failure?",
    options: ["a) Reflect and find a solution through analysis", "b) Keep pushing physically and never give up", "c) Find an innovative way to improve", "d) Seek advice and rally support to overcome it"],
  },
  {
    question: "What would you do if you had a week to do anything?",
    options: ["a) Research and learn something new", "b) Build or fix something", "c) Create or perform something", "d) Organize a social or business event"],
  },
];

// Career categories
const careerCategories = {
  A: "Logical and Analytical Careers (e.g., Engineering, Data Science, Research)",
  B: "Physical and Hands-On Careers (e.g., Sports, Construction, Fitness Training)",
  C: "Creative and Artistic Careers (e.g., Graphic Design, Writing, Marketing)",
  D: "Social and Leadership Careers (e.g., Management, Public Relations, Teaching)"
};

// TestForm Component
const TestForm = () => {

    const [response, setResponse] = useState("");

  const [question, setQuestion] = useState("");


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleGenerateContent = async (promptText) => {
    const result = await model.generateContent(`Give me clear and direct advice without specifying you are an ai etc, just tell me in 300 words why i should pursue this career -> ${promptText} and what does this career holds for me? Just tell me in a direct and simple language with bullet points along with roadmap for me.`);
    setResponse(result.response.text());
  };


  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const determineCareer = (responses) => {
    let score = { A: 0, B: 0, C: 0, D: 0 };

    Object.values(responses).forEach(response => {
      switch(response) {
        case 'a': score.A++; break;
        case 'b': score.B++; break;
        case 'c': score.C++; break;
        case 'd': score.D++; break;
        default: console.log("Invalid response"); break;
      }
    });

    const highestScore = Object.keys(score).reduce((a, b,) => score[a] > score[b] ? a : b);

    // generate suggestion as well
    if(response === ""){
        handleGenerateContent(careerCategories[highestScore]);
    }

    return careerCategories[highestScore];
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen rounded-lg flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="w-full p-5 max-w-lg bg-white rounded-lg shadow-2xl p-8 transform transition-all hover:scale-105">
        {currentQuestionIndex < questions.length-1 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg text-gray-600 mb-6 text-center">
              {currentQuestion.question}
            </p>
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center justify-between space-x-3 p-3 rounded-lg cursor-pointer border-2 ${
                    answers[currentQuestionIndex] === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  } hover:bg-blue-50 transition`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleOptionChange(currentQuestionIndex, option)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium ml-2">{"  "}{option}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="px-4 py-2 bg-black  text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Your Career Suggestion</h2>
            <p className="text-lg text-gray-600 mb-6">
              {determineCareer(answers)}
            </p>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers({});
              }}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
      {response && (
        <div className="response">
          <h2>Information for you:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default TestForm;
