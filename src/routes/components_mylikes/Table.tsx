import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
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
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { dbService } from "../../fbase";
import { User } from "firebase/auth";

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

interface ITableProps {
  loggedInUser: User | null;
}

function Table({ loggedInUser }: ITableProps) {
  const [ranking, setRanking] = useRecoilState(rankingFireAtom);
  const [songs, setSongs] = useRecoilState(songsFireSelector);
  const [updateOn, setUpdateOn] = useRecoilState(updateModalOnAtom);
  /*   useEffect(() => {
    setUpdateOn(() => Array.from({ length: songs.length }, () => false));
  }, [songs]); */

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

  const setNewRanking = async (newRanking: IRanking) => {
    const rankingDoc = doc(dbService, "songs", `ranking_${loggedInUser?.uid}`);
    await updateDoc(rankingDoc, newRanking);
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
    Object.keys(copyRanking).forEach(
      (songId) =>
        copyRanking[songId] > copyRanking[song.id] &&
        (copyRanking[songId] = copyRanking[songId] - 1)
    );
    setNewRanking(copyRanking);
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

/* const columnData = [
  { accessor: "rank", Header: "Rank" },
  { accessor: "title", Header: "Title" },
  { accessor: "singer", Header: "Singer" },
  { accessor: "genre", Header: "Genre" },
];

const Search = ({ onSubmit }: any) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="filter" />
      <button>Search</button>
    </form>
  );
};

const Table = () => {
  const songs = useRecoilValue(songsAtom);
  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => songs, [songs]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data } as any, useGlobalFilter, useSortBy);
  const onReset = () => {
    setGlobalFilter("");
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <Search onSubmit={setGlobalFilter} />
        <button onClick={onReset}>↺</button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}; */
