import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/firebase/AuthProvider";
import axios from "axios";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "", name: "Any" },
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    amount: 5,
    category: "",
    difficulty: "",
    type: "",
    timePerQuestion: 10,
  });

  const [unfinishedQuiz, setUnfinishedQuiz] = useState(null);

  useEffect(() => {
    const savedQuiz = localStorage.getItem("unfinishedQuiz");
    if (savedQuiz) {
      setUnfinishedQuiz(JSON.parse(savedQuiz));
    }
  }, []);

  const handleAmountChange = (operation: "add" | "subtract") => {
    setQuizSettings((prev) => ({
      ...prev,
      amount:
        operation === "add"
          ? Math.min(50, prev.amount + 1)
          : Math.max(1, prev.amount - 1),
    }));
  };

  const handleStartQuiz = async () => {
    const { amount, category, difficulty, type, timePerQuestion } =
      quizSettings;

    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (type) url += `&type=${type}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      setLoading(true);

      if (data.response_code === 0) {
        const quizData = {
          questions: data.results,
          currentQuestion: 0,
          answers: [],
          timePerQuestion,
          startTime: Date.now(),
          settings: quizSettings,
        };

        localStorage.setItem("unfinishedQuiz", JSON.stringify(quizData));
        navigate("/quiz");
      } else {
        toast("Error fetching questions. Please try different settings.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching questions:", error);
      toast("Error fetching questions. Please try again.");
    }
  };

  const continueQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-medium flex flex-row">
          <span className="ml-auto">Welcome,</span>
          <div className="flex flex-col mr-auto ml-2">
            <span className="font-semibold text-maincol">
              {user?.email?.split("@")[0]}
            </span>
          </div>
        </h1>
        {!user && (
          <Link to={"/auth"} className="self-center">
            <Button variant={"link"} className="text-maincol">
              Sign In or signup
            </Button>
          </Link>
        )}
        {user && (
          <Button
            variant={"destructive"}
            className="mt-2 w-20 self-end rounded-full"
            onClick={signOut}
          >
            Logout
          </Button>
        )}
      </div>
      {unfinishedQuiz && (
        <div className="font-semibold">
          You Have Unfinished Quiz!{" "}
          <Button
            variant="link"
            className="text-maincol mt-2"
            onClick={continueQuiz}
          >
            Continue
          </Button>
        </div>
      )}
      <h2 className="my-2 mb-5">Generate your quizzes below:</h2>
      <div className="grid grid-cols-2 gap-6 sm:w-full lg:w-1/2 mx-auto">
        <div className="h-[150px] lg:h-[250px] bg-background shadow-sm justify-center flex flex-col items-center font-semibold border-[#70A1D7] border-4 rounded-[62px]">
          <Button
            variant="outline"
            className="w-1/2 rounded-full mb-2"
            onClick={() => handleAmountChange("add")}
          >
            +
          </Button>
          <Input
            value={quizSettings.amount}
            onChange={(e) =>
              setQuizSettings((prev) => ({
                ...prev,
                amount: parseInt(e.target.value) || 0,
              }))
            }
            className="text-center w-1/2 h-1/2 rounded-full !text-2xl"
          />
          <Button
            variant="outline"
            className="w-1/2 rounded-full mt-2"
            onClick={() => handleAmountChange("subtract")}
          >
            -
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-[150px] lg:h-[250px] text-3xl border-[#A1DE93] border-4 rounded-[62px] font-semibold text-wrap"
            >
              {quizSettings.category
                ? CATEGORIES.find(
                    (cat) => cat.id === parseInt(quizSettings.category)
                  )?.name
                : "Category"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 h-60 overflow-auto">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={quizSettings.category}
              onValueChange={(value) =>
                setQuizSettings((prev) => ({ ...prev, category: value }))
              }
            >
              {CATEGORIES.map((category) => (
                <DropdownMenuRadioItem
                  key={category.id}
                  value={category.id.toString()}
                >
                  {category.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-[150px] lg:h-[250px] text-3xl border-[#F7F48B] border-4 rounded-[62px] font-semibold capitalize"
            >
              {quizSettings.difficulty || "Difficulty"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Difficulty</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={quizSettings.difficulty}
              onValueChange={(value) =>
                setQuizSettings((prev) => ({ ...prev, difficulty: value }))
              }
            >
              <DropdownMenuRadioItem value="">Random</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="easy">Easy</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medium">
                Medium
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-[150px] lg:h-[250px] text-3xl border-[#F47C7C] border-4 rounded-[62px] font-semibold capitalize"
            >
              {quizSettings.type || "Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={quizSettings.type}
              onValueChange={(value) =>
                setQuizSettings((prev) => ({ ...prev, type: value }))
              }
            >
              <DropdownMenuRadioItem value="">
                Any
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="multiple">
                Multiple Choice
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="boolean">
                True/False
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4 mt-4">
        <span>Time Limit Per Question:</span>
        <Input
          value={quizSettings.timePerQuestion}
          onChange={(e) =>
            setQuizSettings((prev) => ({
              ...prev,
              timePerQuestion: parseInt(e.target.value) || 0,
            }))
          }
          className="w-40 rounded-full mx-auto text-center"
          placeholder="Seconds"
        />
        <Button
          className="border-maincol border-2 rounded-full"
          variant="outline"
          onClick={handleStartQuiz}
        >
          {loading ? "Loading..." : "Go!"}
        </Button>
      </div>
    </div>
  );
}
