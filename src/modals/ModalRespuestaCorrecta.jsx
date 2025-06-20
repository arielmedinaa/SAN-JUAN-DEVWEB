import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

const ModalGanador = ({ reset, correctas, totalAnswer }) => {
  const { width, height } = useWindowSize()

  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={250}
        recycle={true}
        gravity={0.2}
        wind={0}
      />
      
      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <h2 className="text-4xl font-extrabold text-green-600 mb-4">¡Ganando Broooo! 🎉</h2>
          <p className="text-lg text-gray-700 mb-2">
            Has respondido correctamente todas las preguntas. ¡Masivo Brooo. Denle su premio 😒!
          </p>

          <div className="flex w-full h-10 mb-4 justify-center items-center gap-4">
            <p className='text-lg text-gray-600'>RESULTADO</p>
            <p className='text-green-600'>{correctas}/{totalAnswer}</p>
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            onClick={reset}
          >
            Volver a jugar
          </button>
        </div>
      </div>
    </>
  )
}


export default ModalGanador
