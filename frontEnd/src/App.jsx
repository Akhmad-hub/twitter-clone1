import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPages from "./pages/auth/login/LoginPages";
import HomePages from "./pages/home/HomePages";
import SignUpPages from "./pages/auth/signUp/SignUpPages";
import SideBarCommon from "./components/common/SideBarCommon";
import RightPanelCommon from "./components/common/RightPanelCommon";
import NotificationPages from "./pages/notification/NotificationPages";
import ProfilePages from "./pages/profile/ProfilePages";
import Coba from "./pages/home/Coba";

const App = () => {
  return (
    <div className="flex max-w-6xl mx-auto">
      <SideBarCommon />

      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/signup" element={<SignUpPages />} />
        <Route path="/coba" element={<Coba />} />
        <Route path="/notification" element={<NotificationPages />} />
        <Route path="/profile/:userName" element={<ProfilePages />} />
      </Routes>
      <RightPanelCommon />
    </div>
  );
};

export default App;
