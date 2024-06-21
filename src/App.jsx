import { useState } from "react";
import "./App.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [score, setscore] = useState(0);
  const [showCOnfetti, setShowCOnfetti] = useState(false);
  const [answers, setAnswers] = useState([]);
  const questions = [
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
        { correct: true, res: "mbeju, pastel mandi'o, chicaro trensado" },
      ],
    },
    {
      question: "Que juegos son del San Juan",
      resulst: [
        { correct: false, res: "Toro mecanico" },
        { correct: false, res: "fifa en juego de play 5" },
        { correct: false, res: "lamida de chipa" },
        {
          correct: true,
          res: "pelota de trapo en llamas,carrera de homosapiens en bolsas,palos resvaladisos",
        },
      ],
    },
    {
      question: "Quienes asisten al San juan",
      resulst: [
        { correct: false, res: "Personas Felices" },
        { correct: false, res: "Gente que quiere compartir" },
        { correct: true, res: "Kamba" },
        { correct: false, res: "Tierra Adentro" },
      ],
    },
    {
      question: "Que stand Gana Hoy?",
      resulst: [
        { correct: false, res: "Administracion" },
        { correct: false, res: "Soporte" },
        { correct: true, res: "Desarrollo Web" },
        { correct: false, res: "Actualizaciones" },
      ],
    },
  ];
  const checkAnswen = () => {
    const correctAnswer = answers?.map((ans) => {
      return questions
        .find((q) => q.question === ans.question)
        .resulst.find((r) => r.res === ans.res);
    });

    const cantidad = correctAnswer?.filter((res) => res.correct).length;
    setscore(cantidad);
    if (cantidad === questions.length) {
      setShowCOnfetti(true);
      toast.success("¡Felicidades ganaste! 🥳 :");
    } else {
      toast.warn("Lo siento no ganaste 😢 :");
    }
  };
  const handleClick = ({ target: { checked, value, name } }) => {
    const finindex = answers.findIndex((r) => r.question === name);
    if (finindex !== -1) {
      const answ = structuredClone(answers);
      answ[finindex] = { question: name, correct: checked, res: value };
      setAnswers(answ);
      return;
    }
    setAnswers([...answers, { question: name, correct: checked, res: value }]);
  };

  const width = screen.width;
  const height = screen.height;
  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col xs={12} md={3}>
          <h5>
            Respuesta Correctas: {score}/{questions.length}
          </h5>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        {questions.map((q, ind) => (
          <Col key={ind} xs={12} md={6}>
            <Card className="mt-2 mb-2">
              <Card.Body>
                <Card.Title>
                  {ind + 1}. {q.question}
                </Card.Title>
                <Card.Text>
                  {q.resulst.map((res, rind) => (
                    <div key={rind}>
                      <input
                        onChange={handleClick}
                        type="radio"
                        id={res.res}
                        name={q.question}
                        value={res.res}
                      />
                      <label htmlFor={res.res}>{res.res}</label>
                      <br />
                    </div>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row colspan={2}>
        <Col xs={12} md={6}>
          <Button
            variant="success"
            onClick={() => checkAnswen()}
            className="m-1"
          >
            Verificar
          </Button>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Reiniciar
          </Button>
        </Col>
      </Row>
      {showCOnfetti && <Confetti width={width} height={height} />}
    </Container>
  );
}

export default App;
