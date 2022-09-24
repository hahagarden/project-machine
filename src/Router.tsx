import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./routes/Category";
import Login from "./routes/Login";
import Song from "./routes/Song";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:favorite" element={<Song />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
