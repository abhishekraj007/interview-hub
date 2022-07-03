import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
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
}

function QuestionList({
  isLoading,
  data,
  setSelectedQuestion,
  toggleFavorite,
  selectedMenu,
}: Props) {
  const renderQuestion = (item: Question) => {
    return (
      <List.Item
        style={{
          cursor: "pointer",
        }}
        onClick={() => setSelectedQuestion(item)}
        actions={[
          <Button
            onClick={() => toggleFavorite(item, selectedMenu)}
            size="small"
            key="bookmarked"
            type="link"
            danger
          >
            {item.bookmarked ? <StarFilled /> : <StarOutlined />}
          </Button>,
        ]}
      >
        {item.title}
      </List.Item>
    );
  };

  return (
    <List
      // size="large"
      loading={isLoading}
      dataSource={data}
      renderItem={(item) => renderQuestion(item)}
    />
  );
}

export default QuestionList;
