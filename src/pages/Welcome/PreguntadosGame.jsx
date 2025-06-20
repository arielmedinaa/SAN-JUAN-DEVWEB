import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CircularWheel from './components/ruleta/CircularWheel';
import { useContadorPreguntasContext } from '../../context/ContadorContext';

const PreguntadosGame = () => {
  const { contador, totalPreguntas, preguntasCorrectas } = useContadorPreguntasContext();
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [rotation, setRotation] = useState(0);
  console.log("contador", contador, totalPreguntas);

  const categories = [
    { id: 1, name: 'San Juan', color: '#FFD700', icon: '🏛️', questionSet: 0 },
    { id: 2, name: 'Starsoft', color: '#32CD32', icon: '🌍', questionSet: 1 },
    { id: 3, name: 'Historia del Paraguay', color: '#FF6347', icon: '🧪', questionSet: 2 },
    { id: 4, name: 'Historia General', color: '#9370DB', icon: '📚', questionSet: 3 },
    { id: 5, name: 'Starsoft', color: '#1E90FF', icon: '⚽', questionSet: 4 },
    { id: 6, name: 'Starsoft', color: '#FF1493', icon: '💻', questionSet: 5 },
    { id: 7, name: 'San Juan', color: '#FF1493', icon: '💻', questionSet: 5 }
  ];


  const spinWheel = () => {
    if (contador >= totalPreguntas) {
      alert("Has respondido todas las preguntas. ¡Reinicia el juego!");
      return;
    }
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
    <div className="backgroundImage flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <h1 className="text-white text-xl">
            Correctas: {preguntasCorrectas}/{totalPreguntas}
          </h1>

          <div className="flex flex-col items-center justify-center mb-4">
            <Trophy className="text-white mb-2" size={10} />
            <div className="relative inline-block">
              <h1 className="text-[3rem] font-black uppercase text-center preguntados-title">
                PREGUNTADOS
              </h1>
            </div>
          </div>

          <div className="bg-indigo-400 text-slate-200 rounded-full px-6 py-3 shadow">
            <h3 className="text-primary-600 text-lg font-semibold">
              ¡Gira la ruleta para empezar!
            </h3>
          </div>
        </div>

        {currentCategory && (
          <div className="text-center mb-6">
            <div
              className="inline-block px-6 py-4 rounded-xl text-white font-bold shadow"
              style={{ backgroundColor: currentCategory.color }}
            >
              <h2 className="text-xl">{currentCategory.icon} {currentCategory.name}</h2>
              <p className="mt-2 text-sm">¡Preparándote para las preguntas!</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="mb-8">
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

  );
};

export default PreguntadosGame;