import React, { useState } from 'react';
import { Play, RotateCcw, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CircularWheel from './components/ruleta/CircularWheel';
import PreguntadosImg from "../../assets/preguntados.png"

const PreguntadosGame = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [rotation, setRotation] = useState(0);

  const categories = [
    { id: 1, name: 'San Juan Ara', color: '#FFD700', icon: '🏛️', questionSet: 0 },
    { id: 2, name: 'Cultura General', color: '#32CD32', icon: '🌍', questionSet: 1 },
    { id: 3, name: 'Ciencias', color: '#FF6347', icon: '🧪', questionSet: 2 },
    { id: 4, name: 'Historia', color: '#9370DB', icon: '📚', questionSet: 3 },
    { id: 5, name: 'Deportes', color: '#1E90FF', icon: '⚽', questionSet: 4 },
    { id: 6, name: 'Tecnología', color: '#FF1493', icon: '💻', questionSet: 5 }
  ];


  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + (spins * 360);
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = finalRotation % 360;
      const sectionAngle = 360 / categories.length;
      const categoryIndex = Math.floor(normalizedRotation / sectionAngle);
      const selectedCategory = categories[categoryIndex];
      
      setCurrentCategory(selectedCategory);
      setTimeout(() => {
        localStorage.setItem('selectedQuestionSet', selectedCategory.questionSet.toString());
        localStorage.setItem('selectedCategory', selectedCategory.name);
        navigate('/questions');
      }, 1500);
    }, 3000);
  };

  const resetGame = () => {
    setScore(0);
    setRotation(0);
    setCurrentCategory(null);
    setIsSpinning(false);
    localStorage.removeItem('selectedQuestionSet');
    localStorage.removeItem('selectedCategory');
  };

  return (
    <div className="container-fluid min-vh-100 bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="text-center">
            <h1 className="text-white fw-bold mb-3" style={{fontSize: '2.5rem'}}>
              <Trophy className="me-2" size={40} />
              <img style={{ width: '1080px', height: '200px' }} src={PreguntadosImg} alt="preguntadosImg" />
            </h1>
            <div className="bg-white rounded-pill px-4 py-2 d-inline-block">
              <h3 className="mb-0 text-primary">
                ¡Gira la ruleta para empezar!
              </h3>
            </div>
          </div>
          {currentCategory && (
            <div className="text-center">
              <div 
                className="d-inline-block px-4 py-3 rounded-3 text-white fw-bold"
                style={{ backgroundColor: currentCategory.color }}
              >
                <h2 className="mb-0">
                  {currentCategory.icon} {currentCategory.name}
                </h2>
                <p className="mb-0 mt-2">¡Preparándote para las preguntas!</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="mb-4">
              <CircularWheel
                categories={categories}
                isSpinning={isSpinning}
                rotation={rotation}
                onSpin={spinWheel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreguntadosGame;