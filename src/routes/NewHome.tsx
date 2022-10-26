import styled, { keyframes } from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import MyLikes from "./MyLikes";
import NewLogin from "./NewLogin";
import NewJoin from "./NewJoin";
import { useRecoilState } from "recoil";
import { headerAtom } from "./components_mylikes/atoms_mylikes";

const animation_move = keyframes`
  from{
    transform:translate(-50%, -50%);
  }
  to{
    transform:translate(-50%,-90%);
  };
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #01172d;
`;

const Header = styled.div<{ menuOn: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  ${(props) =>
    props.menuOn
      ? `transform:translate(-50%,-90%);
      transition: 0.5s;`
      : `transform:translate(-50%, -50%);
      transition: 0.5s;`};
  background-color: transparent;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  padding: 30px;
  background-color: transparent;
  margin: 20px;
  text-align: center;
  color: white;
  font-size: 60px;
  font-weight: 600;
`;

const Menu = styled.div<{ menuOn: boolean }>`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  box-shadow: 0 0 10px 3px white, inset 0 0 5px 0px rgba(0, 0, 0, 0.3);
  width: 150px;
  height: 60px;
  margin: 0 40px;
  border-radius: 30px;
  border: none;
  font-size: 20px;
  color: white;
  a {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 60px;
    color: white;
    font-weight: 600;
  }
  transition: 0.3s;
  &:hover {
    box-shadow: 0 0 15px 7px white, inset 0 0 5px 0px rgba(0, 0, 0, 0.3);
    a {
      color: #ff0063;
    }
    color: #ff0063;
  }
`;

const Container = styled.div``;

const ToyBox = styled.div`
  position: absolute;
  top: 12%;
  left: 14%;
  background-color: transparent;
  width: 140px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Toy = styled.button`
  font-size: 20px;
  background-color: transparent;
  border: none;
  a {
    color: white;
    transition: 0.2s;
    &:hover {
      font-size: 30px;
    }
  }
`;

function NewHome() {
  const [menuOn, setMenuOn] = useRecoilState(headerAtom);
  const menuClickOn = () => {
    setMenuOn(true);
  };
  const menuClickOff = () => {
    setMenuOn(false);
  };
  return (
    <Wrapper>
      <svg
        id="visual"
        viewBox="0 0 960 540"
        width="100vw"
        height="100vh"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ zIndex: 0 }}
      >
        <rect width="100%" height="100%" fill="#01172d"></rect>
        <g>
          <g transform="translate(526 30)">
            <path
              d="M93.4 -27.2C106.3 9.1 91.6 57.5 59.5 80.5C27.4 103.4 -22.1 101 -56.4 76.4C-90.8 51.7 -110 4.9 -98 -30.2C-86.1 -65.3 -43.1 -88.6 -1.4 -88.2C40.3 -87.7 80.6 -63.5 93.4 -27.2Z"
              stroke="#F7760E"
              fill="none"
              stroke-width="20"
            ></path>
          </g>
          <g transform="translate(118 80)">
            <path
              d="M74.2 -26.6C82.9 2.6 67.6 37.2 41.2 56.2C14.9 75.2 -22.3 78.5 -43.7 62.4C-65.2 46.3 -70.9 10.7 -61 -20.2C-51.1 -51.1 -25.5 -77.3 3.6 -78.5C32.8 -79.7 65.5 -55.8 74.2 -26.6Z"
              stroke="#F7760E"
              fill="none"
              stroke-width="20"
            ></path>
          </g>
          <g transform="translate(209 477)">
            <path
              d="M91.1 -27.9C102.2 4.6 84.4 48.1 53 70.3C21.6 92.5 -23.5 93.4 -51.8 72.5C-80.1 51.7 -91.6 9.1 -80.2 -23.8C-68.8 -56.7 -34.4 -79.9 2.8 -80.8C40 -81.7 80 -60.4 91.1 -27.9Z"
              stroke="#F7760E"
              fill="none"
              stroke-width="20"
            ></path>
          </g>
          <g transform="translate(897 438)">
            <path
              d="M65.1 -24.2C73.8 5.8 63.2 39 39.2 57.3C15.2 75.5 -22.2 78.7 -47.5 61.3C-72.8 43.9 -86 5.8 -76.1 -25.8C-66.2 -57.3 -33.1 -82.4 -2.5 -81.6C28.2 -80.8 56.3 -54.1 65.1 -24.2Z"
              stroke="#F7760E"
              fill="none"
              stroke-width="20"
            ></path>
          </g>
          <g transform="translate(905 108)">
            <path
              d="M72.1 -21.9C81.3 4.7 68.1 40.1 43 58C17.9 75.9 -18.9 76.4 -41.7 59.4C-64.4 42.4 -73.1 7.9 -63.8 -18.9C-54.4 -45.7 -27.2 -64.8 2.1 -65.5C31.5 -66.2 63 -48.5 72.1 -21.9Z"
              stroke="#F7760E"
              fill="none"
              stroke-width="20"
            ></path>
          </g>
        </g>
      </svg>
      <Header menuOn={menuOn}>
        <Title>Project Machine</Title>
        <Menu menuOn={menuOn}>
          <Button onClick={menuClickOff}>
            <Link to="/">Home</Link>
          </Button>
          <Button onClick={menuClickOn}>
            <Link to="/login">Login</Link>
          </Button>

          <Button onClick={menuClickOn}>
            <Link to="/join">Join </Link>
          </Button>
        </Menu>
      </Header>
      <Container></Container>
      <Routes>
        <Route path="/login" element={<NewLogin />} />
        <Route path="/join" element={<NewJoin />} />
        <Route path="/mylikes/*" element={<MyLikes />} />
      </Routes>
    </Wrapper>
  );
}

export default NewHome;
