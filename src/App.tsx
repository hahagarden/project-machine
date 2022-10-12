import { useState, useEffect } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./Router";
import { authService } from "./fbase";
import { useRecoilState } from "recoil";
import { loggedInUserAtom } from "./atom";
import { User } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  useEffect(
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setLoggedInUser(user);
      } else setIsLoggedIn(false);
      setInit(true);
    }),
    []
  );
  return (
    <>
      <GlobalStyle />
      {init ? (
        <Router isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
