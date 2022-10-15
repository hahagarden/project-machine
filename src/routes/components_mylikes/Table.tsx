import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import {
  updateModalOnAtom,
  songsFireSelector,
  InterfaceSong,
  rankingFireAtom,
  IRanking,
} from "./atoms_mylikes";
import styled from "styled-components";
import UpdateModal from "./UpdateModal";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { keyframes } from "styled-components";
import { doc, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import { dbService } from "../../fbase";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../../atom";

const animation = keyframes`
  from{
    opacity:0%;
  }
  to{
    opacity:100%;
  };
`;

const TableArea = styled.table`
  width: 70%;
  animation: ${animation} 0.4s ease-out;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  position: relative;
  font-size: 20px;
  display: grid;
  grid-template-columns: 0.7fr 2fr 1fr 0.7fr;
`;

const Th = styled.th`
  padding: 15px 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  font-weight: 600;
`;

const Td = styled.td`
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  font-size: 18px;
  font-weight: 400;
`;

const DeleteTd = styled.td`
  position: absolute;
  right: -40px;
  top: 10px;
`;
const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 15px;
  opacity: 0.2;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

const Area = styled.div``;

interface ITableHeader {
  [key: string]: string;
}

function Table() {
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const ranking = useRecoilValue(rankingFireAtom);
  const songs = useRecoilValue(songsFireSelector);
  const [updateOn, setUpdateOn] = useRecoilState(updateModalOnAtom);
  useEffect(() => {
    setUpdateOn(() => Array.from({ length: songs.length }, () => false));
  }, [songs]);
  const modalOpen = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    console.log(event);
    const targetIndex = songs.findIndex(
      (obj) => obj.id == event.currentTarget.dataset.rbdDraggableId
    );
    setUpdateOn((current) => {
      const copyCurrent = [...current];
      copyCurrent.splice(targetIndex, 1, true);
      return copyCurrent;
    });
  };
  const tableHeader: ITableHeader = {
    rank: "Rank",
    title: "Title",
    singer: "Singer",
    genre: "Genre",
  };
  const setNewRanking = async (
    newRanking: IRanking,
    songId?: InterfaceSong["id"]
  ) => {
    const rankingDoc = doc(dbService, "songs", `ranking_${loggedInUser?.uid}`);
    if (songId) {
      await updateDoc(rankingDoc, { ...newRanking, [songId]: deleteField() });
    } else {
      await updateDoc(rankingDoc, newRanking);
    }
    //update firestore
  };
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    const copyRanking = Object.assign({}, ranking);
    if (destination.index < source.index) {
      Object.keys(copyRanking).forEach((songId) => {
        copyRanking[songId] >= destination.index + 1 &&
          copyRanking[songId] < source.index + 1 &&
          (copyRanking[songId] = copyRanking[songId] + 1);
      });
      copyRanking[draggableId] = destination.index + 1;
    } else if (destination.index > source.index) {
      Object.keys(copyRanking).forEach((songId) => {
        copyRanking[songId] > source.index + 1 &&
          copyRanking[songId] <= destination.index + 1 &&
          (copyRanking[songId] = copyRanking[songId] - 1);
      });
      copyRanking[draggableId] = destination.index + 1;
    }
    setNewRanking(copyRanking);
  };
  const onDelete = async (song: InterfaceSong) => {
    await deleteDoc(doc(dbService, "songs", song.id));
    const copyRanking = Object.assign({}, ranking);
    delete copyRanking[song.id];
    Object.keys(copyRanking).forEach(
      (songId) =>
        copyRanking[songId] > copyRanking[song.id] &&
        (copyRanking[songId] = copyRanking[songId] - 1)
    );
    setNewRanking(copyRanking, song.id);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TableArea>
          <thead>
            <Tr>
              {Object.keys(tableHeader).map((header, index) => (
                <Th key={index}>{tableHeader[header]}</Th>
              ))}
            </Tr>
          </thead>
          <Droppable droppableId={"table"}>
            {(provided) => (
              <Tbody ref={provided.innerRef} {...provided.droppableProps}>
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided, snapshot) => (
                      <Tr
                        onDoubleClick={modalOpen}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Td>{ranking[song.id]}</Td>
                        <Td>{song.title}</Td>
                        <Td>{song.singer}</Td>
                        <Td>{song.genre}</Td>
                        {updateOn[ranking[song.id] - 1] ? (
                          <td>
                            <UpdateModal
                              song={song}
                              rank={ranking[song.id] - 1}
                            />
                          </td>
                        ) : null}
                        <DeleteTd onClick={(e) => onDelete(song)}>
                          <DeleteButton>×</DeleteButton>
                        </DeleteTd>
                      </Tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Tbody>
            )}
          </Droppable>
        </TableArea>
      </DragDropContext>
    </>
  );
}

export default Table;
