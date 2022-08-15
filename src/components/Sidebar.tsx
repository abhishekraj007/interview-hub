import { Badge, Layout, Menu, MenuProps, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { SidebarItem } from "../data-contracts/contracts";
import { StoreContext } from "../stores";
import { IoLogoJavascript } from "@react-icons/all-files/io5/IoLogoJavascript";
import { IoLogoReact } from "@react-icons/all-files/io5/IoLogoReact";
import { CgNotes } from "@react-icons/all-files/cg/CgNotes";
import { useDevices } from "../hooks/useDevices";
import { colors } from "../styles/theme";
import Adsense from "./Adsense";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = observer(() => {
  const {
    menuStore: { setSelectedMenu, selectedMenu },
    authStore: { isLoggedIn },
    questionStore: { javascript, react, notes, setSelectedQuestion },
  } = useContext(StoreContext);

  const [collapsed, setCollapsed] = useState(false);
  const isItMobile = useDevices();

  const label = (label, count) => {
    return (
      <Space align="center" className="space-between">
        <span>{label}</span>
        <Badge
          className="badge"
          count={count}
          style={{ backgroundColor: colors.secondary }}
          size="small"
          overflowCount={2000}
        />
      </Space>
    );
  };

  const items: MenuItem[] = [
    {
      label: isLoggedIn
        ? "Javascript"
        : label("Javascript", javascript?.data?.length),
      key: isLoggedIn ? SidebarItem.JAVASCRIPT_ALL : SidebarItem.JAVASCRIPT,
      icon: <IoLogoJavascript />,
      children: isLoggedIn
        ? [
            {
              label: label("All", javascript?.data?.length),
              key: SidebarItem.JAVASCRIPT,
            },
            {
              label: label("Favorites", javascript?.favs?.length),
              key: SidebarItem.JAVASCRIPT_FAVORITE,
            },
          ]
        : undefined,
    },
    {
      label: isLoggedIn ? "React" : label("React", react?.data?.length),
      key: isLoggedIn ? SidebarItem.REACT_ALL : SidebarItem.REACT,
      icon: <IoLogoReact />,
      children: isLoggedIn
        ? [
            {
              label: label("All", react?.data?.length),
              key: SidebarItem.REACT,
            },
            {
              label: label("Favorites", react?.favs?.length),
              key: SidebarItem.REACT_FAVORITE,
            },
          ]
        : undefined,
    },
  ];

  if (isLoggedIn) {
    items.push({
      label: isLoggedIn ? "My Notes" : label("My Notes", notes?.data?.length),
      key: SidebarItem.NOTES_ALL,
      icon: <CgNotes />,
      children: [
        { label: label("All", notes?.data?.length), key: SidebarItem.NOTES },
        {
          label: label("Favorites", notes?.favs?.length),
          key: SidebarItem.NOTES_FAVORITE,
        },
      ],
    });
  }

  const onMenuSelect = (value) => {
    setSelectedMenu(value.key);
    setSelectedQuestion(undefined);
  };

  return (
    <Sider
      width={isItMobile ? "100%" : 200}
      collapsible={!isItMobile}
      collapsed={isItMobile ? false : collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        height: "100%",
      }}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={[SidebarItem.JAVASCRIPT]}
        style={{ height: "100%", borderRight: 0 }}
        mode="inline"
        items={items}
        selectedKeys={[selectedMenu]}
        onSelect={onMenuSelect}
      />
      <Adsense />
    </Sider>
  );
});

export default Sidebar;
