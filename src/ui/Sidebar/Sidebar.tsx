import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../helpers/redux/slices/userSlice";
import { useSelector } from "react-redux";
import routes from "../../helpers/router/router";
import mainIcon from "../../assets/icons/home_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import menuIcon from "../../assets/icons/menu_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import personIcon from "../../assets/icons/person_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import adminIcon from "../../assets/icons/shield_person_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import musicIcon from "../../assets/icons/library_add_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";

import "./Sidebar.css";

const Sidebar = () => {
  const userData: IUser = useSelector((store: any) => store.user);
  const [isOpen, setIsOpen] = useState(true);

  const [selectedRoute, setSelectedRoute] = useState(routes.main.name);

  useEffect(() => {
    console.log("selectedRoute", selectedRoute);
  }, [selectedRoute]);

  return (
    <div className="sidebar-container">
      <img
        src={menuIcon}
        alt="Menu"
        onClick={() => setIsOpen(!isOpen)}
        className="menu-icon"
      />
      <div className="sidebar" style={{ width: isOpen ? "250px" : "50px" }}>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <Link to={routes.main.path}>
              <div
                className={
                  selectedRoute == routes.main.name ? "link selected" : "link"
                }
                onClick={() => setSelectedRoute(routes.main.name)}
              >
                <img src={mainIcon} className="link-img" />
                {isOpen && (
                  <span className="link-text">{routes.main.name}</span>
                )}
              </div>
            </Link>
            <Link to={routes.personalAccount.path}>
              <div
                className={
                  selectedRoute == routes.personalAccount.name
                    ? "link selected"
                    : "link"
                }
                onClick={() => setSelectedRoute(routes.personalAccount.name)}
              >
                <img src={personIcon} className="link-img" />
                {isOpen && (
                  <span className="link-text">
                    {routes.personalAccount.name}
                  </span>
                )}
              </div>
            </Link>
            {userData?.role_id == 2 ? (
              <Link to={routes.adminsPanel.path}>
                <div
                  className={
                    selectedRoute == routes.adminsPanel.name
                      ? "link selected"
                      : "link"
                  }
                  onClick={() => setSelectedRoute(routes.adminsPanel.name)}
                >
                  <img src={adminIcon} className="link-img" />
                  {isOpen && (
                    <span className="link-text">{routes.adminsPanel.name}</span>
                  )}
                </div>
              </Link>
            ) : (
              <></>
            )}
            {userData?.is_author ? (
              <Link to={routes.addMusicPage.path}>
                <div
                  className={
                    selectedRoute == routes.addMusicPage.name
                      ? "link selected"
                      : "link"
                  }
                  onClick={() => setSelectedRoute(routes.addMusicPage.name)}
                >
                  <img src={musicIcon} className="link-img" />
                  {isOpen && (
                    <span className="link-text">
                      {routes.addMusicPage.name}
                    </span>
                  )}
                </div>
              </Link>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
