import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPages from "./pages/auth/login/LoginPages";
import HomePages from "./pages/home/HomePages";
import SignUpPages from "./pages/auth/signUp/SignUpPages";
import SideBarCommon from "./components/common/SideBarCommon";
import RightPanelCommon from "./components/common/RightPanelCommon";
import NotificationPages from "./pages/notification/NotificationPages";
import ProfilePages from "./pages/profile/ProfilePages";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinnerCommon from "./components/common/LoadingSpinnerCommon";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinnerCommon size="lg" />
      </div>
    );
  }

  console.log(authUser);
  return (
    <div className="flex max-w-6xl mx-auto">
    {authUser && <SideBarCommon />}

      <Routes>
     
        <Route
          path="/"
          element={authUser ? <HomePages /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPages /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPages /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPages /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userName"
          element={authUser ? <ProfilePages /> : <Navigate to="/login" />}
        />
      </Routes>
     { authUser&& <RightPanelCommon />}
      <Toaster />
    </div>
  );
};

export default App;
