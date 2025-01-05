import { useDispatch, useSelector } from "react-redux";
import { IUser, setData } from "../../helpers/redux/slices/userSlice";
import { useEffect, useState } from "react";
import "./Header.css";
import { convertLocalPathToUrl } from "../../helpers/functions/convertLocalPathToUrl";
import useDebounce from "../../helpers/hooks/useDebounce";
import { ISearchResult, SearchResult } from "./atoms/SearchResult";
import { search } from "../../helpers/api/search";

const Header = () => {
  const userData: IUser = useSelector((store: any) => store.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
  const [showSearchResult, setShowSearchResult] = useState(false);

  useEffect(() => {
    const handleSearch = async (searchString: string) => {
      const result = await search(searchString);
      if (result) setSearchResult(result);
    };
    if (debouncedSearchQuery.length != 0 && debouncedSearchQuery != " ") {
      handleSearch(debouncedSearchQuery);
      setShowSearchResult(true);
    } else {
      setSearchResult(null);
      setShowSearchResult(false);
    }
  }, [debouncedSearchQuery]);

  const handleLogOut = () => {
    dispatch(setData(null));
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="left-block">
        <h1>MelodyMix</h1>
        <div className="header-search">
          <input
            type="text"
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setShowSearchResult(true)}
          />
          {showSearchResult && searchResult ? (
            <SearchResult
              tracks={searchResult.tracks}
              albums={searchResult.albums}
              authors={searchResult.authors}
              onHide={setShowSearchResult}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="user-fio">
        {userData?.photo_url ? (
          <img
            src={
              userData?.photo_url && convertLocalPathToUrl(userData?.photo_url)
            }
            className="user-fio-img"
          />
        ) : (
          <div className="user-fio-none-img">
            {userData?.name && userData?.name[0].toUpperCase()}
          </div>
        )}
        {userData?.name}
        {userData?.userId && <button onClick={handleLogOut}>Выход</button>}
      </div>
    </header>
  );
};

export default Header;
