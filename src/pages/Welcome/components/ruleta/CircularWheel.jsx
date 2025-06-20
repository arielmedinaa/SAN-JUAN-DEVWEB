import { useState, useRef } from "react";
import {
  FaBell,
  FaComment,
  FaSmile,
  FaHeart,
  FaStar,
  FaLightbulb,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContadorPreguntasContext } from "../../../../context/ContadorContext";

const CircularWheel = () => {
  const { contador } = useContadorPreguntasContext();
  const navigate = useNavigate();
  const [degree, setDegree] = useState(1800);
  const [clicks, setClicks] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const wheelRef = useRef(null);
  const spinRef = useRef(null);

  const sections = [
    { icon: FaBell, color: "#16a085", name: "San Juan", questionSet: 0 },
    { icon: FaComment, color: "#2980b9", name: "Starsoft", questionSet: 1 },
    {
      icon: FaSmile,
      color: "#34495e",
      name: "Historia del Paraguay",
      questionSet: 2,
    },
    {
      icon: FaHeart,
      color: "#f39c12",
      name: "Historia General",
      questionSet: 3,
    },
    { icon: FaStar, color: "#d35400", name: "Starsoft", questionSet: 4 },
    { icon: FaLightbulb, color: "#c0392b", name: "San Juan", questionSet: 5 },
  ];

  const spinWheel = () => {
    if (contador > 4) {
      return;
    }
    setIsSpinning(true);
    const newClicks = clicks + 1;
    setClicks(newClicks);
    const newDegree = degree * newClicks;
    const extraDegree = Math.floor(Math.random() * 360) + 1;
    const totalDegree = newDegree + extraDegree;
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${totalDegree}deg)`;
    }

    let tiltCount = 0;
    const maxTilts = 30;
    const tiltInterval = setInterval(() => {
      if (spinRef.current && tiltCount < maxTilts) {
        spinRef.current.classList.add("spin-tilt");
        setTimeout(() => {
          if (spinRef.current) {
            spinRef.current.classList.remove("spin-tilt");
          }
        }, 100);
        tiltCount++;
      } else {
        clearInterval(tiltInterval);
      }
    }, 200);

    setTimeout(() => {
      clearInterval(tiltInterval);
      setIsSpinning(false);
      const normalizedDegree = totalDegree % 360;
      const sectionAngle = 60;
      const selectedIndex =
        Math.floor((360 - normalizedDegree + 30) / sectionAngle) % 6;
      const selected = sections[selectedIndex];

      setSelectedCategory(selected);
      localStorage.setItem(
        "selectedQuestionSet",
        selected.questionSet.toString()
      );
      localStorage.setItem("selectedCategory", selected.name);
      navigate("/questions", {
        state: {
          selectedQuestionSet: selected.questionSet,
          selectedCategory: selected.name,
        },
      });
    }, 6000);
  };

  return (
    <div className="fortune-wheel-container">
      <div className="wheel-wrapper">
        <div className="fortune-wheel">
          <div className="wheel-border"></div>

          <div className="fortune-inner-wheel" ref={wheelRef}>
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={index}
                  className={`fortune-section section-${index + 1}`}
                  style={{ borderColor: `${section.color} transparent` }}
                >
                  <div className="fortune-section-icon">
                    <IconComponent size={36} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="spin-arrow"></div>
          <div
            className={`fortune-spin-button ${isSpinning ? "spinning" : ""}`}
            ref={spinRef}
            onClick={spinWheel}
          >
            <div className="inner-spin"></div>
            <span className="spin-text"></span>
          </div>
          <div className="wheel-shine"></div>
        </div>
      </div>
    </div>
  );
};

export default CircularWheel;
