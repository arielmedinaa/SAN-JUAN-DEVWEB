import { HashRouter, Routes, Route } from "react-router-dom";
import PreguntadosGame from "../pages/Welcome/PreguntadosGame";
import NotFound from "../pages/NotFound/NotFound";
import Question from "../pages/Question/Question";
import { ContadorPreguntasProvider } from "../context/ContadorContext";
import "../index.css"; // Importing the main CSS file
import { Toaster } from "react-hot-toast";

const AppRouter = () => (
    
  <HashRouter>
    <Toaster position="top-center" />
    <ContadorPreguntasProvider>
      <Routes>
        <Route path="/" element={<PreguntadosGame />} />
        <Route path="/questions" element={<Question />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContadorPreguntasProvider>
  </HashRouter>
);

export default AppRouter;
