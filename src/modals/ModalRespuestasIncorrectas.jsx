import React from 'react'

const ModalRespuestasIncorrectas = ({ reset }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center" style={{ zIndex: 9999 }}>
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center animate-shake">
                <h2 className="text-4xl font-extrabold text-red-600 mb-4">
                    ¡Perdiste! 😂🫵🏻
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                    Te has quedado sin respuestas correctas. ¡Intentá de nuevo y superate. Fakin perra débil!
                </p>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                    onClick={() => {
                        reset()
                    }}
                >
                    Volver a intentar
                </button>
            </div>
        </div>
    )
}

export default ModalRespuestasIncorrectas
