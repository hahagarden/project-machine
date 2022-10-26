import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./Router";
import { authService } from "./fbase";
import { loggedInUserAtom } from "./atom";

function App() {
  const [init, setInit] = useState(false);
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);
  useEffect(
    authService.onAuthStateChanged((user) => {
      if (user) {
        const loggedInUser = {
          email: user.email,
          metadata: user.metadata,
          uid: user.uid,
        }; //disable to set user(:User) to recoil atom.
        setLoggedInUser(loggedInUser);
      } else {
        setLoggedInUser(null);
      }
      setInit(true);
    }),
    []
  );
  return (
    <>
      <GlobalStyle />
      {init ? <Router /> : "Initializing..."}
    </>
  );
}

export default App;
