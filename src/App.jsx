import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [score, setscore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);

  // Múltiples conjuntos de preguntas
  const questionSets = [
    // Set 1: San Juan Ara (original)
    [
      {
        question: "¿En que fecha se celebra el San Juan Ara?",
        resulst: [
          { correct: false, res: "21 de junio" },
          { correct: false, res: "22 de junio" },
          { correct: false, res: "24 de julio" },
          { correct: true, res: "24 de junio" },
        ],
      },
      {
        question: "¿En honor a quien se celebra el San Juan?",
        resulst: [
          { correct: true, res: "San Juan Bautista" },
          { correct: false, res: "San Juan Nepomunseno" },
          { correct: false, res: "San Juan Ara" },
          { correct: false, res: "Don Juan" },
        ],
      },
      {
        question: "Comidas tipicas",
        resulst: [
          { correct: false, res: "mbeju, chipa,mandioca" },
          { correct: false, res: "mbeju,asado,chicharo" },
          { correct: false, res: "mbeju,guiso,sushi" },
          { correct: true, res: "mbeju, pastel mandi'o, chicharo trensado" },
        ],
      },
    ],
    // Set 2: Cultura General
    [
      {
        question: "¿Cuál es la capital de Francia?",
        resulst: [
          { correct: false, res: "Londres" },
          { correct: true, res: "París" },
          { correct: false, res: "Madrid" },
          { correct: false, res: "Roma" },
        ],
      },
      {
        question: "¿En qué año llegó el hombre a la Luna?",
        resulst: [
          { correct: false, res: "1968" },
          { correct: true, res: "1969" },
          { correct: false, res: "1970" },
          { correct: false, res: "1971" },
        ],
      },
      {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        resulst: [
          { correct: false, res: "Saturno" },
          { correct: false, res: "Tierra" },
          { correct: true, res: "Júpiter" },
          { correct: false, res: "Neptuno" },
        ],
      },
    ],
    // Set 3: Ciencias
    [
      {
        question: "¿Cuál es la fórmula química del agua?",
        resulst: [
          { correct: false, res: "CO2" },
          { correct: true, res: "H2O" },
          { correct: false, res: "O2" },
          { correct: false, res: "H2SO4" },
        ],
      },
      {
        question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
        resulst: [
          { correct: false, res: "198" },
          { correct: false, res: "215" },
          { correct: true, res: "206" },
          { correct: false, res: "234" },
        ],
      },
      {
        question: "¿Qué gas respiramos principalmente?",
        resulst: [
          { correct: false, res: "Oxígeno" },
          { correct: true, res: "Nitrógeno" },
          { correct: false, res: "Dióxido de carbono" },
          { correct: false, res: "Hidrógeno" },
        ],
      },
    ],
    // Set 4: Historia
    [
      {
        question: "¿En qué año comenzó la Segunda Guerra Mundial?",
        resulst: [
          { correct: false, res: "1938" },
          { correct: true, res: "1939" },
          { correct: false, res: "1940" },
          { correct: false, res: "1941" },
        ],
      },
      {
        question: "¿Quién pintó la Mona Lisa?",
        resulst: [
          { correct: false, res: "Pablo Picasso" },
          { correct: false, res: "Vincent van Gogh" },
          { correct: true, res: "Leonardo da Vinci" },
          { correct: false, res: "Miguel Ángel" },
        ],
      },
      {
        question: "¿Cuál fue el primer país en independizarse en América del Sur?",
        resulst: [
          { correct: false, res: "Argentina" },
          { correct: false, res: "Brasil" },
          { correct: true, res: "Paraguay" },
          { correct: false, res: "Colombia" },
        ],
      },
    ],
    // Set 5: Deportes
    [
      {
        question: "¿Cada cuántos años se celebran los Juegos Olímpicos?",
        resulst: [
          { correct: false, res: "2 años" },
          { correct: false, res: "3 años" },
          { correct: true, res: "4 años" },
          { correct: false, res: "5 años" },
        ],
      },
      {
        question: "¿Cuántos jugadores tiene un equipo de fútbol en el campo?",
        resulst: [
          { correct: false, res: "10" },
          { correct: true, res: "11" },
          { correct: false, res: "12" },
          { correct: false, res: "9" },
        ],
      },
      {
        question: "¿En qué deporte se usa una raqueta?",
        resulst: [
          { correct: false, res: "Fútbol" },
          { correct: false, res: "Básquet" },
          { correct: true, res: "Tenis" },
          { correct: false, res: "Natación" },
        ],
      },
    ],
    // Set 6: Tecnología
    [
      {
        question: "¿Qué significa HTML?",
        resulst: [
          { correct: true, res: "HyperText Markup Language" },
          { correct: false, res: "High Tech Modern Language" },
          { correct: false, res: "Home Tool Markup Language" },
          { correct: false, res: "Hyperlink and Text Markup Language" },
        ],
      },
      {
        question: "¿Quién fundó Microsoft?",
        resulst: [
          { correct: false, res: "Steve Jobs" },
          { correct: true, res: "Bill Gates" },
          { correct: false, res: "Mark Zuckerberg" },
          { correct: false, res: "Elon Musk" },
        ],
      },
      {
        question: "¿Cuál es la unidad básica de información en computación?",
        resulst: [
          { correct: false, res: "Byte" },
          { correct: true, res: "Bit" },
          { correct: false, res: "Pixel" },
          { correct: false, res: "Kilobyte" },
        ],
      },
    ],
  ];

  const questions = questionSets[currentQuestionSet];

  const checkAnswer = () => {
    if (answers.length === 0) {
      toast.info("Seleccione una opción 💢 😠");
      return;
    }

    const correctAnswer = answers?.map((ans) => {
      return questions
        .find((q) => q.question === ans.question)
        .resulst.find((r) => r.res === ans.res);
    });

    const cantidad = correctAnswer?.filter((res) => res.correct).length;
    setscore(cantidad);

    if (cantidad === questions.length) {
      setShowConfetti(true);
      toast.success("¡Felicidades ganaste! 🥳");
      
      setTimeout(() => {
        const header = document.getElementById("header");
        if (header) {
          header.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
      toast.info(`Obtuviste ${cantidad}/${questions.length} respuestas correctas 😢`);
    }

    // Cambiar al siguiente conjunto de preguntas
    setTimeout(() => {
      const nextSet = (currentQuestionSet + 1) % questionSets.length;
      setCurrentQuestionSet(nextSet);
      setAnswers([]);
      setShowConfetti(false);
      
      // Mostrar qué tema viene
      const themes = ["San Juan Ara", "Cultura General", "Ciencias", "Historia", "Deportes", "Tecnología"];
      toast.info(`Próximo tema: ${themes[nextSet]} 🎯`);
    }, 3000);
  };

  const handleClick = ({ target: { checked, value, name } }) => {
    const findIndex = answers.findIndex((r) => r.question === name);
    if (findIndex !== -1) {
      const answ = structuredClone(answers);
      answ[findIndex] = { question: name, correct: checked, res: value };
      setAnswers(answ);
      return;
    }
    setAnswers([...answers, { question: name, correct: checked, res: value }]);
  };

  const resetQuiz = () => {
    setCurrentQuestionSet(0);
    setAnswers([]);
    setscore(0);
    setShowConfetti(false);
  };

  const themes = ["San Juan Ara", "Cultura General", "Ciencias", "Historia", "Deportes", "Tecnología"];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <ToastContainer />
      
      {/* Header con información */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ color: '#fff', margin: 0 }}>
          Quiz Dinámico - Tema: {themes[currentQuestionSet]}
        </h2>
        <h5 style={{ color: '#fff', fontSize: '1.2rem', margin: '10px 0' }}>
          Respuestas Correctas: {score}/{questions.length}
        </h5>
        <p style={{ color: '#fff', margin: 0, opacity: 0.8 }}>
          Set {currentQuestionSet + 1} de {questionSets.length}
        </p>
      </div>

      <div id="header" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {questions.map((q, ind) => (
          <div key={`${currentQuestionSet}-${ind}`} style={{
            background: 'rgba(255,255,255,0.95)',
            margin: '20px 0',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '20px',
              fontSize: '1.3rem'
            }}>
              {ind + 1}. {q.question}
            </h3>
            
            {q.resulst.map((res, rind) => (
              <div key={rind} style={{ 
                margin: '12px 0',
                padding: '10px',
                background: 'rgba(103,126,234,0.1)',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}>
                  <input
                    onChange={handleClick}
                    type="radio"
                    name={q.question}
                    value={res.res}
                    style={{ 
                      marginRight: '12px',
                      transform: 'scale(1.2)'
                    }}
                  />
                  {res.res}
                </label>
              </div>
            ))}
          </div>
        ))}

        <footer style={{
          textAlign: 'center',
          margin: '40px 0 20px 0',
          padding: '20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>
            DESARROLLO WEB STARSOFT - (ARIEL 👑, RYJAR, MAURO, PABLO, JESUS)
          </p>
        </footer>

        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <button
            onClick={checkAnswer}
            style={{
              padding: '15px 30px',
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(76,175,80,0.3)',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Verificar Respuestas
          </button>
          
          <button
            onClick={resetQuiz}
            style={{
              padding: '15px 30px',
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #2196F3, #1976D2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(33,150,243,0.3)',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Reiniciar Quiz
          </button>
        </div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1000
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                left: `${Math.random() * 100}%`,
                animationName: 'fall',
                animationDuration: `${2 + Math.random() * 3}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;