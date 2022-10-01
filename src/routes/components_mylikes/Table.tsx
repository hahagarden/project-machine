import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useTable } from "react-table";
import { SongsAtom } from "./atoms_mylikes";

const columnData = [
  { accessor: "rank", Header: "Rank" },
  { accessor: "title", Header: "Title" },
  { accessor: "singer", Header: "Singer" },
  { accessor: "genre", Header: "Genre" },
];

const Table = () => {
  const songs = useRecoilValue(SongsAtom);
  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => songs, [songs]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as any);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getFooterGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
  );
};

export default Table;
