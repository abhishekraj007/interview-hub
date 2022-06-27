import React, { useContext, useEffect, useState } from "react";
import { apiGetQuestions, apiUpdateQuestions, apiUpdateUser } from "../apis";
import { Header } from "../components/Header";
import QList from "../components/QList";
import { getSide } from "../utils";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../stores";
import LoginModal from "../components/modals/LoginModal";
import { Button } from "antd";
import CreateNoteModal from "../components/modals/CreateNoteModal";

function Dashboard() {
  const store = useContext(StoreContext);
  const {
    authStore: { checkUserLoggedInStatus, user },
  } = store;

  useEffect(() => {
    checkUserLoggedInStatus();
  }, []);

  return (
    <div>
      <Header />
      {/* <QList /> */}
      <LoginModal />
      <CreateNoteModal />
    </div>
  );
}

export default observer(Dashboard);
