import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import { Question, SidebarItem } from "../data-contracts/contracts";

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
  toggleFavorite,
  selectedMenu,
  onSearch,
}: Props) {
  const renderQuestion = (item: Question) => {
    return (
      <List.Item
        style={{
          cursor: "pointer",
        }}
      >
        <span
          style={{
            flex: 1,
          }}
          onClick={() => setSelectedQuestion(item)}
        >
          {item.title}
        </span>

        <Button
          onClick={() => toggleFavorite(item, selectedMenu)}
          size="small"
          key="bookmarked"
          type="link"
          danger
        >
          {item.bookmarked ? <StarFilled /> : <StarOutlined />}
        </Button>
      </List.Item>
    );
  };

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
        renderItem={(item) => renderQuestion(item)}
      />
    </>
  );
}

export default QuestionList;
