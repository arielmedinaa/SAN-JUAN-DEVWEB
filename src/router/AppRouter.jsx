import { HashRouter, Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound";
import Question from "../pages/Question/Question";

const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route path="/questions" element={<Question />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);

export default AppRouter;
