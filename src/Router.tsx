import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./routes/Category";
import Login from "./routes/Login";
import Song from "./routes/Song";
import Join from "./routes/Join";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:favorite" element={<Song />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
