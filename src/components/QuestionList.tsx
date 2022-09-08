import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";
import { Button, Dropdown, List, Menu } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import { Question, SidebarItem, tags } from "../data-contracts/contracts";
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
}

function QuestionList({
  isLoading,
  data,
  setSelectedQuestion,
  selectedQuestion,
  toggleFavorite,
  selectedMenu,
  onSearch,
}: Props) {
  const filterMenu = (
    <Menu
      items={[
        {
          key: "array",
          label: "Array",
        },
      ]}
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
