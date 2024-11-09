import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type QuizData = {
  questions: Question[];
  currentQuestion: number;
  answers: {
    question: Question;
    userAnswer: string | null;
    timeTaken: number;
  }[];
  timePerQuestion: number;
  startTime: number;
  settings: {
    amount: number;
    category: string;
    difficulty: string;
    type: string;
  };
};

export default function Quiz() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [randomizedAnswers, setRandomizedAnswers] = useState<string[]>([]);

  useEffect(() => {
    const savedQuiz = localStorage.getItem("unfinishedQuiz");
    if (!savedQuiz) {
      navigate("/");
      return;
    }

    const parsedQuiz = JSON.parse(savedQuiz);
    setQuizData(parsedQuiz);
    setTimeLeft(parsedQuiz.timePerQuestion);
  }, [navigate]);

  useEffect(() => {
    if (!quizData || !quizData.questions[quizData.currentQuestion]) return;

    const currentQuestion = quizData.questions[quizData.currentQuestion];
    const answers =
      currentQuestion.type === "boolean"
        ? ["True", "False"]
        : [
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer,
          ].sort(() => Math.random() - 0.5);

    setRandomizedAnswers(answers);
  }, [quizData?.currentQuestion, quizData?.questions]);

  useEffect(() => {
    if (!quizData) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData]);

  const handleAnswer = (answer: string | null) => {
    if (!quizData) return;

    const newAnswers = [
      ...quizData.answers,
      {
        question: quizData.questions[quizData.currentQuestion],
        userAnswer: answer,
        timeTaken: quizData.timePerQuestion - timeLeft,
      },
    ];

    const newQuizData = {
      ...quizData,
      answers: newAnswers,
      currentQuestion: quizData.currentQuestion + 1,
    };

    if (newQuizData.currentQuestion >= quizData.questions.length) {
      localStorage.removeItem("unfinishedQuiz");
      localStorage.setItem("quizResults", JSON.stringify(newQuizData));
      navigate("/result");
    } else {
      setQuizData(newQuizData);
      setTimeLeft(quizData.timePerQuestion);
      localStorage.setItem("unfinishedQuiz", JSON.stringify(newQuizData));
    }
  };

  if (!quizData || !quizData.questions[quizData.currentQuestion]) return null;

  const currentQuestion = quizData.questions[quizData.currentQuestion];

  return (
    <div>
      <h1 className="text-3xl font-medium flex flex-row mb-2">
        <span className="ml-auto">
          Question {quizData.currentQuestion + 1} of
        </span>
        <div className="flex flex-col mr-auto ml-2">
          <span className="font-semibold text-maincol">
            {quizData.questions.length}
          </span>
        </div>
      </h1>
      <p>
        Category: <b>{currentQuestion.category}</b>
      </p>
      <p>
        Type:{" "}
        <b>
          {currentQuestion.type === "boolean"
            ? "True/False"
            : "Multiple Choice"}
        </b>
      </p>
      <h1
        className="text-4xl mt-4 font-semibold"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />

      <div className="flex flex-col gap-4 w-2/3 m-auto mt-4">
        {randomizedAnswers.map((answer, index) => {
          let borderColor = "";
          if (currentQuestion.type === "boolean") {
            borderColor = answer === "True" ? "border-second" : "border-fourth";
          } else {
            const colors = [
              "border-first",
              "border-second",
              "border-third",
              "border-fourth",
            ];
            borderColor = colors[index % colors.length];
          }

          return (
            <Button
              key={index}
              className={`min-h-20 rounded-full text-xl border-4 ${borderColor}`}
              variant="outline"
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>

      <div className="w-2/3 mx-auto mt-8 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`bg-maincol h-2.5 rounded-full`}
          style={{
            width: `${(timeLeft / quizData.timePerQuestion) * 100}%`,
            transition: "width 1s linear",
          }}
        />
        <span className="text-2xl">{timeLeft}</span>
      </div>
    </div>
  );
}
