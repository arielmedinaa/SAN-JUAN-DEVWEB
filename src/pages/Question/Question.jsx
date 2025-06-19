import { useState } from "react";
import { questions } from "../Welcome/const/Preguntas";
const Question = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  const pregunta = questions[randomIndex];
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
        <h2 className="question-text">{pregunta.question}</h2>
      </div>

      <div className="answers-container">
        {pregunta?.results?.map((r, indice) => (
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
