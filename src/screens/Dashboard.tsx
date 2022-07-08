import React, { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../stores";
import LoginModal from "../components/modals/LoginModal";
import CreateNoteModal from "../components/modals/CreateNoteModal";
import ReplEditor from "../components/modals/ReplEditor";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { useDevices } from "../hooks/useDevices";
import { QuestionContainer } from "../components/QuestionContainer";
import SidebarModal from "../components/modals/SidebarModal";

function Dashboard() {
  const store = useContext(StoreContext);
  const {
    authStore: { checkUserLoggedInStatus },
  } = store;

  console.log("store=>", store);

  const isItMobile = useDevices();

  useEffect(() => {
    checkUserLoggedInStatus();
  }, []);

  return (
    <>
      <Layout
        style={{
          height: isItMobile ? "100vh" : "100%",
        }}
      >
        <Header />
        <Layout
          style={{
            flexDirection: "row",
          }}
          className="content-area"
        >
          {!isItMobile && <Sidebar />}
          <QuestionContainer />
        </Layout>

        <LoginModal />
        <CreateNoteModal />
        <ReplEditor />
      </Layout>
      <SidebarModal />
    </>
  );
}

export default observer(Dashboard);
