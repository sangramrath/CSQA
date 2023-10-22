import { React, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Index = () => {
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionLength, setQuestionLength] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  const read_token = process.env.REACT_APP_READ_TOKEN;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.buttercms.com/v2/content/cyber_security_quiz?auth_token=c003e8f971306631d23f7f216d2fcef18d1364b1`
      );
      console.log(result.data.data.cyber_security_quiz);
      setQuizQuestions(result.data.data.cyber_security_quiz);
      setQuestionLength(result.data.data.cyber_security_quiz.length);
    };
    fetchData();
  }, []);
  const handleChoice = (choice) => {
    console.log(choice);
    if (choice === quizQuestions[questionNumber]?.correct_option && !isQuestionAnswered) {
      setIsQuestionAnswered(true);
      setTotalScore(totalScore + 1);
      alert("You got it correctly");
    } else if (choice !== quizQuestions[questionNumber]?.correct_option && !isQuestionAnswered) {
      setIsQuestionAnswered(true);
      alert("Oops, you got it wrong");
    }
    else{
      alert("You have already answered this question");
    }
  };
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center ">
        {!quizEnded ? (
          <div className="w-4/5 min-h-[75%] shadow-2xl flex flex-col justify-center items-center font-medium gap-16 ">
            <h1 className="text-2xl">
              {quizQuestions[questionNumber]?.question}?
            </h1>
            <div className=" grid grid-cols-2 gap-8 gap-x-12 ">
              {/* options */}
              <div
                className=" w-[400px] rounded-md flex justify-center items-center py-4 text-white bg-blue-400 hover:cursor-pointer hover:bg-blue-600"
                onClick={() =>
                  handleChoice(quizQuestions[questionNumber]?.option_1)
                }
              >
                {quizQuestions[questionNumber]?.option_1}
              </div>
              <div
                className=" w-[400px] rounded-md flex justify-center items-center py-4 text-white bg-blue-400 hover:cursor-pointer hover:bg-blue-600"
                onClick={() =>
                  handleChoice(quizQuestions[questionNumber]?.option_2)
                }
              >
                {quizQuestions[questionNumber]?.option_2}
              </div>
              <div
                className=" w-[400px] rounded-md flex justify-center items-center py-4 text-white bg-blue-400 hover:cursor-pointer hover:bg-blue-600"
                onClick={() =>
                  handleChoice(quizQuestions[questionNumber]?.option_3)
                }
              >
                {quizQuestions[questionNumber]?.option_3}
              </div>
              <div
                className=" w-[400px] rounded-md flex justify-center items-center py-4 text-white bg-blue-400 hover:cursor-pointer hover:bg-blue-600"
                onClick={() =>
                  handleChoice(quizQuestions[questionNumber]?.option_4)
                }
              >
                {quizQuestions[questionNumber]?.option_4}
              </div>
              {isQuestionAnswered ? (
                <button
                  className=" bg-gray-900 px-3 py-2 w-max text-white "
                  onClick={() => {
                    if (questionNumber + 1 === questionLength) {
                      setQuizEnded(true);
                    }
                    else{
                    setQuestionNumber(questionNumber + 1);
                    }
                    setIsQuestionAnswered(false);
                  }}
                >
                  NextQuestion
                </button>
              ) : null}
            </div>
            {isQuestionAnswered ? (
              <div className=" w-full px-2 ">
                <p className=" max-h-[100px] overflow-y-scroll ">
                  {/* correct answer explanation here */}
                  {quizQuestions[questionNumber]?.explanation}
                </p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="w-4/5 min-h-[75%] shadow-2xl flex flex-col justify-center items-center font-medium gap-16 ">
            <h1>Hurray you have completed the quiz</h1>
            <h1 className="text-2xl">Your Score is {totalScore} out of {questionLength}</h1>
            <button
              className=" bg-gray-900 px-3 py-2 w-max text-white "
              onClick={() => {
                setQuestionNumber(0);
                setQuizEnded(false);
                setTotalScore(0);
              }}
            >
              Restart Quiz
            </button>
           <Link href="/" >Return to Home</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
