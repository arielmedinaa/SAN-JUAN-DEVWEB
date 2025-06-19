import { HashRouter, Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
// import About from '../pages/About';
import NotFound from '../pages/NotFound/NotFound';
import AppQuestions from '../pages/Questions/AppQuestions';

const AppRouter = () => (
    <HashRouter>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/questions" element={<AppQuestions />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </HashRouter>
);

export default AppRouter;