import React from "react";
import { Route, Routes } from "react-router";

import HomePage from "@pages/Home";
import Chat from "@pages/Chat";
import AuthPage from "@pages/Auth";

export enum RoutingURL {
  home = "/",
  auth = "/auth",
  chat = "/chat",
  profile = "/profile"
}

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<Chat />} path={`${RoutingURL.chat}/:dialogInfo`} />
      <Route element={<AuthPage />} path={RoutingURL.auth} />
      {/* <Route element={<Profile />} path="/profile" />
          <Route element={<NotFound />} path="*" /> * / */}
    </Routes>
  )
}

export default Routing;