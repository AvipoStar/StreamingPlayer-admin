import { useSelector } from "react-redux";
import "../styles/MainPage.css";
import { Genre, IGenre } from "../../../ui/Genre/Genre";
import { useEffect } from "react";

const GenresTab = () => {
  const genres = useSelector((state: any) => state.genres);

  useEffect(() => {
    console.log("genres", genres);
  }, [genres]);

  return (
    <div className="GenresTab">
      {genres?.map((genre: IGenre) => (
        <Genre
          key={genre.id}
          id={genre.id}
          name={genre.name}
          color={genre.color}
        />
      ))}
    </div>
  );
};

export default GenresTab;
