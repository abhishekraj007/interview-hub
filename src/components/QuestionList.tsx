import { List } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import { Question, SidebarItem } from "../data-contracts/contracts";
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
  return (
    <>
      <Search placeholder="Search" onSearch={onSearch} />
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
