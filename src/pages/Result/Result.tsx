import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type QuizAnswer = {
  question: Question;
  userAnswer: string | null;
  timeTaken: number;
};

type QuizResults = {
  questions: Question[];
  answers: QuizAnswer[];
  timePerQuestion: number;
  startTime: number;
  settings: {
    amount: number;
    category: string;
    difficulty: string;
    type: string;
  };
};

function QuestionResult({
  answer,
  index,
}: {
  answer: QuizAnswer;
  index: number;
}) {
  const isCorrect = answer.userAnswer === answer.question.correct_answer;

  return (
    <div
      className={`border-4 bg-background shadow-sm rounded-[48px] w-full mx-auto mt-4 py-6 px-4 ${
        isCorrect ? "border-second" : "border-fourth"
      }`}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg">Question {index + 1}</h3>
          <h3>Category: {answer.question.category}</h3>
          <h3>Difficulty: {answer.question.difficulty}</h3>
        </div>
        <h2
          className="text-2xl font-semibold"
          dangerouslySetInnerHTML={{ __html: answer.question.question }}
        />
        <p className="text-md">
          <b>Correct Answer:</b>{" "}
          <span
            dangerouslySetInnerHTML={{ __html: answer.question.correct_answer }}
          />
        </p>
        <p>
          <b>Your Answer:</b>{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: answer.userAnswer || "Time's up! (No answer)",
            }}
          />
        </p>
        <p>
          <b>Time Taken:</b> {answer.timeTaken} seconds
        </p>
      </div>
    </div>
  );
}

export default function Result() {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResults | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults");
    if (!savedResults) {
      navigate("/");
      return;
    }

    setResults(JSON.parse(savedResults));
  }, [navigate]);

  if (!results) return null;

  const correctAnswers = results.answers.filter(
    (answer) => answer.userAnswer === answer.question.correct_answer
  ).length;

  const totalQuestions = results.answers.length;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Your Result</h1>
      <Link to="/">
        <Button variant="link" className="text-maincol">
          Back To Home
        </Button>
      </Link>
      <h1 className="text-2xl">
        <span className="text-[#006A67] font-bold">{correctAnswers}</span> out
        of <span className="text-maincol font-bold">{totalQuestions}</span>{" "}
        Correct
      </h1> 
      <div className="mt-8 grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {results.answers.map((answer, index) => (
          <QuestionResult key={index} answer={answer} index={index} />
        ))}
      </div>
    </div>
  );
}
