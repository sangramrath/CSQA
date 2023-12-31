import { React } from "react";
import Link from "next/link";


const Quizselection = () => {
  console.log("hello");

  return (
        <div className=" pt-6">
          <h1 className=" text-blue-700 text-center text-3xl font-medium my-6 ">
            Cyber Security Quiz
          </h1>
          <p className=" text-center mt-12 mb-8 ">
            Take this quiz to test your Cyber Security knowledge. 
          </p>
          <div className=" flex justify-center items-center">
            <div className=" w-[500px] px-8 py-4 shadow-2xl bg-blue-400 text-white flex justify-center items-center flex-col gap-6 ">
              <h1 className=" font-extrabold text-xl ">A Fun Quiz</h1>
              <p>
                A quiz covering various areas of cyber security. Answer
                questions on malware, crytography, phishing, and more.
              </p>
              <div className="w-full flex justify-end pr-3">
                <button className=" bg-white px-5 py-2 rounded-sm text-black hover:cursor-pointer ">
                  <Link href="/test" >Launch Test</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Quizselection;
