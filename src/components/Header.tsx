import {
  GoogleOutlined,
  MoreOutlined,
  PicCenterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, PageHeader, Typography } from "antd";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../stores";
import { useDevices } from "../hooks/useDevices";

export const Header = observer(() => {
  const {
    authStore: { setShowLoginModal, isLoggedIn, user, logout },
    notesStore: { setShowNoteModal, setShowReplEditor },
  } = useContext(StoreContext);

  const isItMobile = useDevices();

  console.log(isItMobile);

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
      <Button
        onClick={() => setShowReplEditor(true)}
        type="dashed"
        key="open-rept-editor"
      >
        Editor
      </Button>,
      <Dropdown.Button
        key="user-menu"
        icon={<MoreOutlined />}
        overlay={menu}
      ></Dropdown.Button>
    );
  }

  return (
    <div>
      <PageHeader
        ghost={false}
        title={
          isItMobile
            ? [
                <Button key="1">
                  <PicCenterOutlined />
                </Button>,
              ]
            : null
        }
        subTitle={
          <Typography.Title
            style={{
              marginBottom: 0,
            }}
            level={5}
          >
            Dashboard
          </Typography.Title>
        }
        extra={rightSideMenu}
      ></PageHeader>
    </div>
  );
});
