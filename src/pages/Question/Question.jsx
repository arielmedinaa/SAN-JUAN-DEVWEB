import { useState, useEffect } from "react";
import { questions } from "../Welcome/const/Preguntas";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [pregunta, setPregunta] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const categoria = localStorage.getItem("selectedCategory");
    const categoriaSeleccionada = questions.filter((q) => q.tipo === categoria);
    const randomIndex = Math.floor(
      Math.random() * categoriaSeleccionada[0]?.questions?.length
    );
    const preguntaAleatoria = categoriaSeleccionada[0]?.questions[randomIndex];
    setPregunta(preguntaAleatoria);
  }, []);

  const handleQuestions = (index) => {
    setClickedIndex(index);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="body">
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
          <h2 className="question-text">{pregunta?.question}</h2>
        </div>

        <div className="answers-container">
          {pregunta?.choices.map((choice, indice) => (
            <div
              key={indice}
              className="answer-option"
              style={{
                backgroundColor:
                  clickedIndex === indice
                    ? choice === pregunta.answer
                      ? "#26da26"
                      : "#ff4444"
                    : "",
                color: clickedIndex === indice ? "#fff" : "",
              }}
              onClick={() => handleQuestions(indice)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
