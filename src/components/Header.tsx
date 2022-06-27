import {
  GoogleOutlined,
  PicCenterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, PageHeader } from "antd";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../stores";

export const Header = observer(() => {
  const {
    authStore: { setShowLoginModal, isLoggedIn, user, logout },
    notesStore: { showNoteModal, setShowNoteModal },
  } = useContext(StoreContext);

  const handleMenuClick = (item) => {
    console.log(item);
    if (item.key === "logout") {
      logout();
    }
  };

  const rightSideMenu = [];
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: user?.displayName,
          key: "userName",
        },
        {
          label: "Logout",
          key: "logout",
        },
      ]}
    />
  );

  if (!isLoggedIn) {
    rightSideMenu.push(
      <Button
        onClick={() => setShowLoginModal(true)}
        type="dashed"
        key="login"
        icon={<GoogleOutlined />}
      >
        Login
      </Button>
    );
  }

  const createNoteButton = () => {};

  if (isLoggedIn) {
    rightSideMenu.push(
      <Button
        onClick={() => setShowNoteModal(true)}
        type="dashed"
        key="create-new-note"
        icon={<PlusOutlined />}
      >
        New Note
      </Button>,
      <Dropdown.Button key="user-menu" overlay={menu}></Dropdown.Button>
    );
  }

  return (
    <div>
      <PageHeader
        ghost={false}
        title={[
          <Button key="1">
            <PicCenterOutlined />
          </Button>,
        ]}
        subTitle="Intreview Hub"
        extra={rightSideMenu}
      ></PageHeader>
    </div>
  );
});
