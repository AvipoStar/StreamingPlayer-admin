import { generatePath, useNavigate } from "react-router";
import "./Genre.css";
import routes from "../../helpers/router/router";

export interface IGenre {
  id: number;
  name: string;
  color: string;
}

export const Genre = (params: IGenre) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const genrePath = generatePath(routes.genre.path, {
      genre_id: params.id,
    });
    navigate(genrePath);
  };

  return (
    <div className="Genre" key={params.id} onClick={handleClick}>
      <div
        className="Genre-background"
        style={{ backgroundColor: params.color }}
      />
      <div className="Genre-name">{params.name}</div>
    </div>
  );
};
