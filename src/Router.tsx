import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { User } from "firebase/auth";

interface RouterProps {
  isLoggedIn: boolean;
  loggedInUser: User | null;
}

function Router({ isLoggedIn, loggedInUser }: RouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/*"
          element={<Home isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
