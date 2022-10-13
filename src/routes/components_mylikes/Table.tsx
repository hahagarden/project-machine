import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { updateModalOnAtom, songsFireSelector } from "./atoms_mylikes";
import styled from "styled-components";
import UpdateModal from "./UpdateModal";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { keyframes } from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

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
  const [songs, setSongs] = useRecoilState(songsFireSelector);
  const [changingRanking, setChangingRanking] = useState(false);
  const [updateOn, setUpdateOn] = useRecoilState(updateModalOnAtom);
  useEffect(() => {
    setUpdateOn(() => Array.from({ length: songs.length }, () => false));
  }, [songs]);

  useEffect(() => {
    songs.map(async (song) => {
      const updatingSong = doc(dbService, "songs", song.id);
      await updateDoc(updatingSong, { rank: song.rank });
    });
  }, [changingRanking]);

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

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    else {
      setChangingRanking((current) => !current);
      setSongs((current) => {
        const copySongs = [...current];
        const targetObj = copySongs[source.index];
        copySongs.splice(source.index, 1);
        copySongs.splice(destination.index, 0, targetObj);
        const newSongs = copySongs.map((song, index) => ({
          ...song,
          ["rank"]: index + 1,
        }));
        return newSongs;
      });
    }
  };

  const onDelete = (rank: number) => {
    setSongs((current) => {
      const copySongs = [...current];
      copySongs.splice(rank - 1, 1);
      const newSongs = copySongs.map((song, index) => ({
        ...song,
        ["rank"]: index + 1,
      }));
      return newSongs;
    });
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
                        <Td>{song.rank}</Td>
                        <Td>{song.title}</Td>
                        <Td>{song.singer}</Td>
                        <Td>{song.genre}</Td>
                        {updateOn[song.rank - 1] ? (
                          <td>
                            <UpdateModal song={song} />
                          </td>
                        ) : null}
                        <DeleteTd onClick={(e) => onDelete(song.rank)}>
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
