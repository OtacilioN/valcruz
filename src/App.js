import React, { useState, useEffect } from "react";
import "./App.css";
import OnBoard from "./screens/OnBoard";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SchoolIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/AnnouncementOutlined";
import FaceIcon from "@material-ui/icons/PersonOutlined";
import Protocols from "./screens/Protocols";
import SelfCheckup from "./screens/SelfCheckup";
import Profile from "./screens/Profile";

function App() {
  const [hasOnboardFinished, setHasOnboardFinished] = useState();
  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    setHasOnboardFinished(localStorage.getItem("hasOnboardFinished"));
  }, []);

  const onOnboardFinish = () => {
    setHasOnboardFinished(true);
  };
  const navigateToProtocols = () => {
    setTab(0);
  };

  const ComponentsStack = [
    <Protocols />,
    <SelfCheckup onSubmitCheckup={navigateToProtocols} />,
    <Profile onUpdateFinish={navigateToProtocols} />
  ];
  const tabsName = ["Comunicados", "Auto-Avaliação", "Perfil"];

  return (
    <div className="App">
      {hasOnboardFinished ? (
        <div>
          <h1 className="pageName">{tabsName[tab]}</h1>

          <div>{ComponentsStack[tab]}</div>
          <BottomNavigation
            value={tab}
            onChange={(event, newTab) => {
              setTab(newTab);
            }}
            showLabels
          >
            <BottomNavigationAction
              label={tabsName[0]}
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction label={tabsName[1]} icon={<SchoolIcon />} />
            <BottomNavigationAction label={tabsName[2]} icon={<FaceIcon />} />
          </BottomNavigation>
        </div>
      ) : (
        <OnBoard onOnboardFinish={onOnboardFinish} />
      )}
    </div>
  );
}

export default App;
