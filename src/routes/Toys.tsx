import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 50px;
  background-color: #f6b93b;
  box-shadow: 0 0 10px 0 black;
  border: 2px solid rgba(0, 0, 0, 0.3);
`;

const Shelf = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin-top: 50px;
  border-bottom: 5px solid rgba(0, 0, 0, 0.3);
`;

const Area = styled.div`
  height: 400px;
`;

const Toy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e84118;
  box-shadow: 0 0 10px 0 white, inset 0 0 10px 0px rgba(0, 0, 0, 0.3);
  width: 200px;
  height: 60px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 10px;
  a {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 60px;
    color: yellow;
  }
  &:hover {
    box-shadow: 0 0 15px 7px white, inset 0 0 5px 0px rgba(0, 0, 0, 0.3);
  }
`;

function Toys() {
  return (
    <Container>
      <Shelf>
        <Toy>
          <Link to="/mylikes">My Likes</Link>
        </Toy>
        <Toy></Toy>
        <Toy></Toy>
      </Shelf>
      <Shelf>
        <Toy></Toy>
        <Toy></Toy>
        <Toy></Toy>
      </Shelf>
      <Shelf>
        <Toy></Toy>
        <Toy></Toy>
        <Toy></Toy>
      </Shelf>
      <Area></Area>
    </Container>
  );
}

export default Toys;
