import  { useState } from 'react';
import { 
  FaPencilAlt, 
  FaFootballBall, 
  FaLeaf, 
  FaGlobe, 
  FaCoins, 
  FaHatCowboy, 
  FaBuilding, 
  FaEye 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CircularWheel = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const sections = [
    { icon: FaPencilAlt, color: '#4CAF50', rotation: 0, name: 'Arte', questionSet: 0 },
    { icon: FaBuilding, color: '#FFC107', rotation: 45, name: 'Arquitectura', questionSet: 1 },
    { icon: FaFootballBall, color: '#FF9800', rotation: 90, name: 'Deportes', questionSet: 2 },
    { icon: FaLeaf, color: '#F44336', rotation: 135, name: 'Naturaleza', questionSet: 3 },
    { icon: FaEye, color: '#E91E63', rotation: 180, name: 'Cultura', questionSet: 4 },
    { icon: FaHatCowboy, color: '#9C27B0', rotation: 225, name: 'Historia', questionSet: 5 },
    { icon: FaCoins, color: '#673AB7', rotation: 270, name: 'Economía', questionSet: 6 },
    { icon: FaGlobe, color: '#2196F3', rotation: 315, name: 'Geografía', questionSet: 7 }
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
      const sectionAngle = 360 / sections.length;
      const adjustedRotation = (360 - normalizedRotation + (sectionAngle / 2)) % 360;
      const categoryIndex = Math.floor(adjustedRotation / sectionAngle);
      const selected = sections[categoryIndex];
      
      setSelectedCategory(selected);
      setTimeout(() => {
        navigate('/questions', { 
          state: { 
            selectedQuestionSet: selected.questionSet,
            selectedCategory: selected.name 
          }
        });
      }, 1500);
    }, 3000);
  };

  return (
    <div className="wheelContainer">
      <div className="wheelWrapper">
        {selectedCategory && (
          <div 
            className="categoryDisplay"
            style={{ backgroundColor: selectedCategory.color }}
          >
            ¡{selectedCategory.name} seleccionado!
          </div>
        )}
        
        <div className="arrow" />
        
        <div 
          className={`wheel ${isSpinning ? 'spinning' : ''}`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div 
                key={index} 
                className="wheelSection"
                style={{ transform: `rotate(${section.rotation}deg)` }}
              >
                <div 
                  className="sectionBackground"
                  style={{ backgroundColor: section.color }}
                />
                <div 
                  className="iconContainer"
                  style={{
                    transform: `translate(-50%, -50%) rotate(-${section.rotation}deg) rotate(22.5deg)`
                  }}
                >
                  <IconComponent className="sectionIcon" />
                  <div className="sectionName">
                    {section.name}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div 
            className={`wheelCenter ${isSpinning ? 'spinning' : ''}`}
            onClick={spinWheel}
          >
            <span className="centerText">
              {isSpinning ? 'GIRANDO...' : 'GIRAR'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularWheel;