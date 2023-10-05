import { useEffect, useState } from "react";


export default function Trivia({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  

  

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    // setTimeout(() => {
    //   setClassName(a.correct ? "answer correct" : "answer wrong");
    // }, 3000);

    // setTimeout(() => {
      delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
        // setTimeout(() => {
        //   setQuestionNumber((prev) => prev + 1);
        //   setSelectedAnswer(null);
        // }, 1000);
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
        // setTimeout(() => {
        //   setTimeOut(true);
        // }, 1000);
      }
    // }, 5000);
      })
  };
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}