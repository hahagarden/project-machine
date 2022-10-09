import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import NewHome from "./routes/NewHome";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/*" element={<NewHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
