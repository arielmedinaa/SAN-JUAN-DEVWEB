import { useState, useEffect } from "react";
import { questions } from "../Welcome/const/Preguntas";
import { useNavigate } from "react-router-dom";
import { useContadorPreguntasContext } from "../../context/ContadorContext";
import audioPericon from "../../../public/pericon.mp3";

const Question = () => {
  const {
    contador,
    totalPreguntas,
    preguntasCorrectas,
    setHasWon,
    setHasLost,
    siguientePregunta,
    registrarRespuestaCorrecta,
  } = useContadorPreguntasContext();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [pregunta, setPregunta] = useState(null);
  const [categoria, setcategoria] = useState("");
  const [progreso, setProgreso] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState([]);
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
    }, 265);
    return () => clearInterval(interval);
  }, [categoria]);

  const handleQuestions = (ch, index) => {
    if (respondido) return;

    setRespondido(true);

    if (ch === pregunta.answer) {
      registrarRespuestaCorrecta();
    }
    if (contador === 4 && preguntasCorrectas >= 3) {
      setHasWon(true);
    } else if (preguntasCorrectas < totalPreguntas && contador === 4) {
      setHasLost(true);
    }
    setClickedIndex(index);
    siguientePregunta();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    if (pregunta?.choices) {
      const shuffled = [...pregunta.choices].sort(() => Math.random() - 0.5);
      setShuffledChoices(shuffled);
    }
  }, [pregunta]);
  useEffect(() => {
    if (progreso >= 100) {
      siguientePregunta();
      if (contador === 4 && preguntasCorrectas >= 3) {
        setHasWon(true);
      } else if (preguntasCorrectas < totalPreguntas && contador === 4) {
        setHasLost(true);
      }
      navigate("/");
    }
  }, [progreso]);

  return (
    <div className="body">
      <audio src={audioPericon} autoPlay loop />
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
          {shuffledChoices.map((choice, indice) => (
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
