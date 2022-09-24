import { useParams } from "react-router-dom";
import Song from "./Song";
import Movie from "./Movie";

function List() {
  const { list } = useParams();
  console.log(list);
  return (
    <>
      {list == "song" ? <Song /> : null}
      {list == "moive" ? <Movie /> : null}
    </>
  );
}

export default List;
