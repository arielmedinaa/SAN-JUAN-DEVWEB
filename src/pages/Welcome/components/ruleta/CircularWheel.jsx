import React from 'react';
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
import './CircularWheel.scss';

const CircularWheel = () => {
  const sections = [
    { icon: FaPencilAlt, color: '#4CAF50', rotation: 0 },
    { icon: FaBuilding, color: '#FFC107', rotation: 45 },
    { icon: FaFootballBall, color: '#FF9800', rotation: 90 },
    { icon: FaLeaf, color: '#F44336', rotation: 135 },
    { icon: FaEye, color: '#E91E63', rotation: 180 },
    { icon: FaHatCowboy, color: '#9C27B0', rotation: 225 },
    { icon: FaCoins, color: '#673AB7', rotation: 270 },
    { icon: FaGlobe, color: '#2196F3', rotation: 315 }
  ];

  return (
    <div className="wheel-container">
      <div className="wheel">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div 
              key={index} 
              className="wheel-section" 
              style={{
                '--bg-color': section.color,
                '--rotation': `${section.rotation}deg`
              }}
            >
              <div className="icon-container">
                <IconComponent className="section-icon" />
              </div>
            </div>
          );
        })}
        <div className="wheel-center">
          <span className="center-text">GIRAR</span>
        </div>
      </div>
    </div>
  );
};

export default CircularWheel;