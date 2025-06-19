import { HashRouter, Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
// import About from '../pages/About';
import PreguntadosGame from '../pages/Welcome/PreguntadosGame';
import NotFound from '../pages/NotFound/NotFound';
import AppQuestions from '../pages/Questions/AppQuestions';

const AppRouter = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<PreguntadosGame />} />
            <Route path="/questions" element={<AppQuestions />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </HashRouter>
);

export default AppRouter;