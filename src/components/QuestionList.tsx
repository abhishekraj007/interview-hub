import CheckOutlined from "@ant-design/icons/lib/icons/CheckOutlined";
import ClearOutlined from "@ant-design/icons/lib/icons/ClearOutlined";
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";
import { Button, Dropdown, List, Menu, MenuProps } from "antd";
import Search from "antd/lib/input/Search";
import React, { useMemo, useState } from "react";
import {
  Question,
  SidebarItem,
  tags,
  tagsLabel,
} from "../data-contracts/contracts";
import QuestionItem from "./QuestionItem";

interface Props {
  isLoading: boolean;
  data: Question[];
  toggleFavorite: (
    item: Question,
    category?: SidebarItem,
    userId?: string
  ) => void;
  setSelectedQuestion: (item: Question) => void;
  selectedQuestion: Question;
  selectedMenu: SidebarItem;
  onSearch: (value: string) => void;
  filterNotes: (tag: string) => void;
  clearFilter: (selectedCategory: SidebarItem) => void;
}

function QuestionList({
  isLoading,
  data,
  setSelectedQuestion,
  selectedQuestion,
  toggleFavorite,
  selectedMenu,
  onSearch,
  filterNotes,
  clearFilter,
}: Props) {
  const [selectedFilterMenu, setSelectedFilterMenu] = useState("");
  const onFilterMenuClick = (e) => {
    const key = e.key;
    setSelectedFilterMenu(key);

    if (key === "clear") {
      clearFilter(selectedMenu);
    } else {
      filterNotes(key);
    }
  };

  const filterMenuItems = useMemo(() => {
    const menus: MenuProps["items"] = tags.map((tag) => {
      if (selectedFilterMenu === tag) {
        return {
          key: tag,
          label: tagsLabel[tag],
          icon: <CheckOutlined />,
        };
      }
      return {
        key: tag,
        label: tagsLabel[tag],
      };
    });

    if (selectedFilterMenu.length && selectedFilterMenu !== "clear") {
      menus.unshift({
        key: "clear",
        label: "",
        icon: <ClearOutlined />,
      });
    }

    return menus;
  }, [tags, selectedFilterMenu]);

  const filterMenu = (
    <Menu
      theme="dark"
      onClick={onFilterMenuClick}
      defaultSelectedKeys={[selectedFilterMenu]}
      items={filterMenuItems}
    />
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Search placeholder="Search" onSearch={onSearch} />
        <Dropdown overlay={filterMenu} placement="bottomLeft" arrow>
          <Button icon={<FilterOutlined />}></Button>
        </Dropdown>
      </div>
      <List
        style={{
          height: `calc(100vh - 142px)`,
          overflow: "auto",
          marginTop: 10,
        }}
        loading={isLoading}
        dataSource={data}
        renderItem={(item, index) => (
          <QuestionItem
            item={item}
            index={index}
            selectedMenu={selectedMenu}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            toggleFavorite={toggleFavorite}
          />
        )}
      />
    </>
  );
}

export default QuestionList;
