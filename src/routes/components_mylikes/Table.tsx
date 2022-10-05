import { useRecoilValue, useRecoilState } from "recoil";
import { useState } from "react";
import { updateModalOnAtom, songsAtom, songsSelector } from "./atoms_mylikes";
import styled from "styled-components";
import UpdateModal from "./UpdateModal";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

const Tr = styled.tr``;

const Th = styled.th`
  padding: 10px 20px;
  border-bottom: 2px solid;
`;

const Td = styled.td`
  text-align: center;
  padding: 10px 20px;
`;

const Area = styled.div``;

interface ITableHeader {
  [key: string]: string;
}

function Table() {
  const [songs, setSongs] = useRecoilState(songsAtom);
  /* const [updateOn, setUpdateOn] = useRecoilState(updateModalOnAtom);
  setUpdateOn(() => {
    return Array.from({ length: songs.length }, () => false);
  });
  const modalOpen = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    console.log("Doubled", event);
    const targetIndex = songs.findIndex(
      (obj) =>
        Number(obj.id) == Number(event.currentTarget.dataset.rbdDraggableId)
    );
    setUpdateOn((current) => {
      const copyCurrent = [...current];
      copyCurrent.splice(targetIndex, 1, true);
      return copyCurrent;
    });
  };
 */
  const tableHeader: ITableHeader = {
    rank: "Rank",
    title: "Title",
    singer: "Singer",
    genre: "Genre",
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    else {
      setSongs((current) => {
        const copySongs = [...current];
        const targetObj = copySongs[source.index];
        copySongs.splice(source.index, 1);
        copySongs.splice(destination.index, 0, targetObj);
        console.log(copySongs);
        const newSongs = copySongs.map((song, index) => ({
          ...song,
          ["rank"]: index + 1,
        }));
        console.log(newSongs);
        newSongs.sort((a, b) => a.rank - b.rank);
        return newSongs;
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <table>
          <thead>
            <Tr>
              {Object.keys(tableHeader).map((header, index) => (
                <Th key={index}>{tableHeader[header]}</Th>
              ))}
            </Tr>
          </thead>
          <Droppable droppableId={"table"}>
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided) => (
                      <Tr
                        /*  onDoubleClick={modalOpen} */
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Td>{song.rank}</Td>
                        <Td>{song.title}</Td>
                        <Td>{song.singer}</Td>
                        <Td>{song.genre}</Td>
                        {/* {updateOn[Number(song.rank) - 1] ? (
                            <UpdateModal song={song} />
                          ) : null} */}
                      </Tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
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
