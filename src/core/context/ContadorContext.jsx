import React, { createContext, useContext, useState } from "react";

const ContadorPreguntasContext = createContext();

export const useContadorPreguntas = () => useContext(ContadorPreguntasContext);

export const ContadorPreguntasProvider = ({ children }) => {
  const TOTAL_PREGUNTAS = 5;
  const [contador, setContador] = useState(0);
  const [preguntasCorrectas, setPreguntasCorrectas] = useState(0);
  const [preguntasIncorrectas, setPreguntasIncorrectas] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const siguientePregunta = () => {
    setContador((prev) => (prev + 1 ));
  };

  const registrarRespuestaCorrecta = () => {
    setPreguntasCorrectas((prev) => prev + 1);
  };

  const registrarRespuestaIncorrecta = () => {
    setPreguntasIncorrectas((prev) => prev + 1);
  };

  const reiniciarContador = () => {
    setContador(0);
    setPreguntasCorrectas(0);
    setPreguntasIncorrectas(0);
    setHasWon(false);
    setHasLost(false);
  };

  return (
    <ContadorPreguntasContext.Provider
      value={{
        contador,
        siguientePregunta,
        reiniciarContador,
        totalPreguntas: TOTAL_PREGUNTAS,
        preguntasCorrectas,
        preguntasIncorrectas,
        registrarRespuestaCorrecta,
        registrarRespuestaIncorrecta,
        hasWon,
        setHasWon,
        hasLost,
        setHasLost,
      }}
    >
      {children}
    </ContadorPreguntasContext.Provider>
  );
};

export const useContadorPreguntasContext = () => {
  const context = useContext(ContadorPreguntasContext);
  if (!context) {
    throw new Error(
      "useContadorPreguntasContext must be used within a ContadorPreguntasProvider"
    );
  }
  return context;
};
