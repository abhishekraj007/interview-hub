import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Drawer, Layout, Select } from "antd";
import { StoreContext } from "../../stores";
import Sidebar from "../Sidebar";
import { CloseOutlined } from "@ant-design/icons";

const SidebarModal = observer(() => {
  const {
    menuStore: { showSidebar, setShowSidebar },
  } = useContext(StoreContext);

  return (
    <Drawer
      width={"70%"}
      // closable={false}
      visible={showSidebar}
      placement={"left"}
      closeIcon={false}
      // bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Button
          onClick={() => setShowSidebar(false)}
          icon={<CloseOutlined />}
          type="link"
        ></Button>
      }
      bodyStyle={{
        padding: 0,
      }}
      headerStyle={{
        padding: 12,
        background: "#051467",
      }}
    >
      <Sidebar />
    </Drawer>
  );
});

export default SidebarModal;
