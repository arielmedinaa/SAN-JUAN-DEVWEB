import { useState } from "react";

const Question = () => {
  const questions = [
    {
      tipo: "Ciencia",
      question: "¿En que fecha se celebra el San Juan Ara?",
      results: [
        { correct: false, res: "21 de junio" },
        { correct: false, res: "22 de junio" },
        { correct: false, res: "24 de julio" },
        { correct: true, res: "24 de junio" },
      ],
    },
  ];

  const [clickedIndex, setClickedIndex] = useState(null);

  const handleQuestions = (index) => {
    setClickedIndex(index);
  };

  return (
    <div className="quiz-container">
      <div className="decorative-elements">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="quiz-header">
        <h1 className="quiz-title">Pon a Prueba tu Conocimiento</h1>
      </div>

      <div className="question-card">
        <h2 className="question-text">{questions[0].question}</h2>
      </div>

      <div className="answers-container">
        {questions[0].results?.map((r, indice) => (
          <div
            key={indice}
            className="answer-option"
            style={{
              backgroundColor:
                clickedIndex === indice
                  ? r.correct
                    ? "#26da26"
                    : "#ff4444"
                  : "",
              color: clickedIndex === indice ? "#fff" : "",
            }}
            onClick={() => handleQuestions(indice)}
          >
            {r.res}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
