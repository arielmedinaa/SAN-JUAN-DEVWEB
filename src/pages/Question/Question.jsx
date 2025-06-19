import { useState, useEffect } from "react";
import { questions } from "../Welcome/const/Preguntas";
import { useNavigate } from "react-router-dom";
import { useContadorPreguntasContext } from "../../context/ContadorContext";

const Question = () => {
  const { siguientePregunta, registrarRespuestaCorrecta, registrarRespuestaIncorrecta } = useContadorPreguntasContext();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [pregunta, setPregunta] = useState(null);
  const [categoria, setcategoria] = useState("");
  const [progreso, setProgreso] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setcategoria(localStorage.getItem("selectedCategory"));
    const categoriaSeleccionada = questions.filter((q) => q.tipo === categoria);
    const randomIndex = Math.floor(
      Math.random() * categoriaSeleccionada[0]?.questions?.length
    );
    const preguntaAleatoria = categoriaSeleccionada[0]?.questions[randomIndex];
    setPregunta(preguntaAleatoria);

    const interval = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [categoria]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleQuestions = (ch, index) => {
    if (ch === pregunta.answer) {
      registrarRespuestaCorrecta();
    } else {
      registrarRespuestaIncorrecta();
      setProgreso(0);
    }
    setClickedIndex(index);
    siguientePregunta();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  useEffect(() => {
    if (progreso >= 100 && pregunta) {
      siguientePregunta();
      navigate("/");
    }
  }, [progreso]);

  return (
    <div className="body">
      <div className="divProgreso">
        <div className="progreso" style={{ width: `${progreso}%` }}></div>
      </div>
      <div className="quiz-container">
        <div className="decorative-elements">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>

        <div className="quiz-header">
          <h1 className="quiz-title">
            Pon a Prueba tu Conocimiento en ( {categoria} )
          </h1>
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
              onClick={() => handleQuestions(choice, indice)}
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
