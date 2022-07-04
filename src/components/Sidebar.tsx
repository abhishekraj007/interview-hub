import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
const { Sider } = Layout;
import { SidebarItem } from "../data-contracts/contracts";
import { StoreContext } from "../stores";
import { IoLogoJavascript, IoLogoReact, IoStar, IoBook } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Javascript",
    key: SidebarItem.JAVASCRIPT_ALL,
    icon: <IoLogoJavascript />,
    children: [
      { label: "All", key: SidebarItem.JAVASCRIPT },
      {
        label: "Favorites",
        key: SidebarItem.JAVASCRIPT_FAVORITE,
      },
    ],
  },
  {
    label: "React",
    key: SidebarItem.REACT_ALL,
    icon: <IoLogoReact />,
    children: [
      { label: "All", key: SidebarItem.REACT },
      { label: "Favorites", key: SidebarItem.REACT_FAVORITE },
    ],
  },
  {
    label: "My Notes",
    key: SidebarItem.NOTES_ALL,
    icon: <TbNotes />,
    children: [
      { label: "All", key: SidebarItem.NOTES },
      { label: "Favorites", key: SidebarItem.NOTES_FAVORITE },
    ],
  },
];

const Sidebar = observer(() => {
  const {
    menuStore: { setSelectedMenu },
  } = useContext(StoreContext);

  const [collapsed, setCollapsed] = useState(false);

  const onMenuSelect = (value) => {
    setSelectedMenu(value.key);
    console.log(value);
  };

  return (
    <Sider
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={[SidebarItem.JAVASCRIPT]}
        defaultOpenKeys={[SidebarItem.JAVASCRIPT_ALL]}
        style={{ height: "100%", borderRight: 0 }}
        mode="inline"
        items={items}
        onSelect={onMenuSelect}
      />
    </Sider>
  );
});

export default Sidebar;
