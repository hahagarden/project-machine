import { useMemo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { songsAtom } from "./atoms_mylikes";
import styled from "styled-components";

const Tr = styled.tr``;

const Th = styled.th`
  padding: 10px 20px;
  border-bottom: 2px solid;
`;

const Td = styled.td`
  text-align: center;
  padding: 10px 20px;
`;

interface ITableHeader {
  [key: string]: string;
}

function Table() {
  const songs = useRecoilValue(songsAtom);

  const tableHeader: ITableHeader = {
    rank: "Rank",
    title: "Title",
    singer: "Singer",
    genre: "Genre",
  };

  return (
    <>
      <table>
        <Tr>
          {Object.keys(tableHeader).map((header) => (
            <Th>{tableHeader[header]}</Th>
          ))}
        </Tr>
        {songs.map((song) => {
          return (
            <>
              <Tr>
                <Td>{song.rank}</Td>
                <Td>{song.title}</Td>
                <Td>{song.singer}</Td>
                <Td>{song.genre}</Td>
              </Tr>
            </>
          );
        })}
      </table>
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
