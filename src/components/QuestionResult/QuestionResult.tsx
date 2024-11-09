export default function QuestionResult() {
  return (
    <>
      <div className="border-4 bg-background shadow-sm rounded-[48px] w-1/2 mx-auto mt-4 py-6 border-second">
        <div className=" space-y-6">
          <div>
            <h3 className="text-lg">Question 1</h3>
            <h3>Category: General Knowledge</h3>
            <h3>Difficulty: Medium</h3>
          </div>
          <h2 className="text-2xl font-semibold ">
            What was Mountain Dew&#039;s original slogan?
          </h2>
          <p className="text-md">
            <b>Correct Answer:</b> Yahoo! Mountain Dew... It&#039;ll tickle your
            innards!
          </p>
          <p>
            <b>Your Answer:</b> Yahoo! Mountain Dew... It&#039;ll tickle your
            innards!
          </p>
        </div>
      </div>
      <div className="border-4 bg-background shadow-sm rounded-[48px] w-1/2 mx-auto mt-4 py-6 border-fourth">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg">Question 2</h3>
            <h3>Category: Entertainment: Japanese Anime &amp; Manga</h3>
            <h3>Difficulty: Hard</h3>
          </div>
          <h2 className="text-2xl font-semibold ">
            Which one of these characters is from &quot;Legendz : Tale of the
            Dragon Kings&quot;?
          </h2>
          <p className="text-md">
            <b>Correct Answer:</b> Shiron
          </p>
          <p>
            <b>Your Answer:</b> Jack
          </p>
        </div>
      </div>
    </>
  );
}
