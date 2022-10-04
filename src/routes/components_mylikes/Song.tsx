import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Table from "./Table";
import { useState } from "react";
import Modal from "./Modal";
import { registerModalOnAtom } from "./atoms_mylikes";
import { useRecoilState } from "recoil";

const Button = styled.button``;

function Song() {
  const [modalOn, setModalOn] = useRecoilState(registerModalOnAtom);
  const modalOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setModalOn(true);
  };
  return (
    <>
      <div>
        <Button onClick={modalOpen}>Register</Button>
        {modalOn && <Modal whichModal="register" />}
        <Button>Ranking</Button>
        <Button>Genre</Button>
        <Table />
      </div>
    </>
  );
}

export default Song;
