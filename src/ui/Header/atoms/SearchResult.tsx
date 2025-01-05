import { generatePath, useNavigate } from "react-router";
import "./SearchResult.css";
import routes from "../../../helpers/router/router";
import { ITrackParams } from "../../Track/Track";
import { IAlbumData } from "../../../pages/AddMusicPage/logic/setAlbum";
import { IAuthor } from "../../../helpers/types/Author";
import { convertLocalPathToUrl } from "../../../helpers/functions/convertLocalPathToUrl";

export interface ISearchResult {
  tracks: ITrackParams[];
  albums: IAlbumData[];
  authors: IAuthor[];
  onHide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchResult = (params: ISearchResult) => {
  const navigate = useNavigate();

  const handleAuthorClick = (author_id: number) => {
    const authorPath = generatePath(routes.author.path, {
      author_id: author_id,
    });
    navigate(authorPath);
    params.onHide(false);
  };

  const handleAlbumTrackClick = (album_id: number) => {
    const albumPath = generatePath(routes.album.path, {
      album_id: album_id,
    });
    navigate(albumPath);
    params.onHide(false);
  };

  return (
    <div>
      <div className="SearchResult">
        {params.authors.length ? (
          <div className="SearchResult-children">
            <h4>Авторы</h4>
            <ul>
              {params.authors.map((a: any) => (
                <li onClick={() => handleAuthorClick(a.id)}>
                  <div className="Search-item">
                    <img
                      src={convertLocalPathToUrl(a.photo_url)}
                      className="Search-item-img"
                    />
                    {a.nickname}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {params.albums.length ? (
          <div className="SearchResult-children">
            <h4>Плейлисты</h4>
            <ul>
              {params.albums.map((a: any) => (
                <li onClick={() => handleAlbumTrackClick(a.id)}>
                  <div className="Search-item">
                    <img
                      src={convertLocalPathToUrl(a.preview_url)}
                      className="Search-item-img"
                    />
                    {a.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {params.tracks.length ? (
          <div className="SearchResult-children">
            <h4>Трэки</h4>
            <ul>
              {params.tracks.map((t: any) => (
                <li onClick={() => handleAlbumTrackClick(t.album_id)}>
                  <div className="Search-item">
                    <img
                      src={convertLocalPathToUrl(t.preview_url)}
                      className="Search-item-img"
                    />
                    {t.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className="SearchResult-background"
        onClick={() => params.onHide(false)}
      />
    </div>
  );
};
