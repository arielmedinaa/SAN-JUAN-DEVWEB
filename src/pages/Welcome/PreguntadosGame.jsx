import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PreguntadosGame = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Categorías del juego que corresponden a tus conjuntos de preguntas
  const categories = [
    { id: 1, name: 'San Juan Ara', color: '#FFD700', icon: '🏛️', questionSet: 0 },
    { id: 2, name: 'Cultura General', color: '#32CD32', icon: '🌍', questionSet: 1 },
    { id: 3, name: 'Ciencias', color: '#FF6347', icon: '🧪', questionSet: 2 },
    { id: 4, name: 'Historia', color: '#9370DB', icon: '📚', questionSet: 3 },
    { id: 5, name: 'Deportes', color: '#1E90FF', icon: '⚽', questionSet: 4 },
    { id: 6, name: 'Tecnología', color: '#FF1493', icon: '💻', questionSet: 5 }
  ];

  // Preguntas eliminadas - ahora las maneja AppQuestions

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Generar rotación aleatoria (múltiples vueltas + posición final)
    const spins = 5 + Math.random() * 5; // Entre 5 y 10 vueltas
    const finalRotation = rotation + (spins * 360);
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      
      // Calcular categoría basada en la rotación final
      const normalizedRotation = finalRotation % 360;
      const sectionAngle = 360 / categories.length;
      const categoryIndex = Math.floor(normalizedRotation / sectionAngle);
      const selectedCategory = categories[categoryIndex];
      
      setCurrentCategory(selectedCategory);
      
      // Mostrar categoría seleccionada por un momento antes de navegar
      setTimeout(() => {
        // Guardar la categoría seleccionada en localStorage para que AppQuestions pueda accederla
        localStorage.setItem('selectedQuestionSet', selectedCategory.questionSet.toString());
        localStorage.setItem('selectedCategory', selectedCategory.name);
        
        // Navegar a la ruta de preguntas
        navigate('/questions');
      }, 1500);
    }, 3000);
  };

  const resetGame = () => {
    setScore(0);
    setRotation(0);
    setCurrentCategory(null);
    setIsSpinning(false);
    // Limpiar localStorage
    localStorage.removeItem('selectedQuestionSet');
    localStorage.removeItem('selectedCategory');
  };

  return (
    <div className="container-fluid min-vh-100 bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-white fw-bold mb-3" style={{fontSize: '2.5rem'}}>
              <Trophy className="me-2" size={40} />
              PREGUNTADOS
            </h1>
            <div className="bg-white rounded-pill px-4 py-2 d-inline-block">
              <h3 className="mb-0 text-primary">
                ¡Gira la ruleta para empezar!
              </h3>
            </div>
          </div>

          {/* Mostrar categoría seleccionada */}
          {currentCategory && (
            <div className="text-center mb-4">
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
            {/* Ruleta */}
            <div className="position-relative mb-4 d-flex justify-content-center">
              <div 
                className="rounded-circle border border-white border-5 position-relative"
                style={{
                  width: '300px',
                  height: '300px',
                  background: `conic-gradient(${categories.map((cat, i) => 
                    `${cat.color} ${i * (360/categories.length)}deg ${(i + 1) * (360/categories.length)}deg`
                  ).join(', ')})`,
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
                }}
              >
                {/* Categorías en la ruleta */}
                {categories.map((category, index) => {
                  const angle = (index * 360) / categories.length + 180 / categories.length;
                  const radian = (angle * Math.PI) / 180;
                  const x = Math.cos(radian) * 100;
                  const y = Math.sin(radian) * 100;
                  
                  return (
                    <div
                      key={category.id}
                      className="position-absolute text-white fw-bold text-center"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: '12px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                      }}
                    >
                      <div>{category.icon}</div>
                      <div>{category.name}</div>
                    </div>
                  );
                })}
                
                {/* Centro de la ruleta */}
                <div 
                  className="position-absolute bg-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Play size={24} className="text-primary" />
                </div>
              </div>
              
              {/* Flecha indicadora */}
              <div 
                className="position-absolute bg-white"
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '15px solid transparent',
                  borderRight: '15px solid transparent',
                  borderBottom: '30px solid white',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}
              />
            </div>

            {/* Botones */}
            <div className="d-flex gap-3 justify-content-center">
              <button 
                className="btn btn-success btn-lg px-4 py-3 rounded-pill fw-bold"
                onClick={spinWheel}
                disabled={isSpinning}
              >
                {isSpinning ? 'Girando...' : currentCategory ? 'Yendo a preguntas...' : 'GIRAR RULETA'}
              </button>
              <button 
                className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill"
                onClick={resetGame}
                disabled={isSpinning}
              >
                <RotateCcw size={20} className="me-2" />
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreguntadosGame;