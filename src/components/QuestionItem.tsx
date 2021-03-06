import React from "react";
import { Button, Collapse, List } from "antd";
import { Question, SidebarItem } from "../data-contracts/contracts";
import { colors } from "../styles/theme";
import StarFilled from "@ant-design/icons/lib/icons/StarFilled";
import StarOutlined from "@ant-design/icons/lib/icons/StarOutlined";
import { useDevices } from "../hooks/useDevices";
import QuestionDetail from "./QuestionDetail";

const { Panel } = Collapse;

interface QuestionItemProps {
  item: Question;
  index: number;
  toggleFavorite: (
    item: Question,
    category?: SidebarItem,
    userId?: string
  ) => void;
  setSelectedQuestion: (item: Question) => void;
  selectedQuestion: Question;
  selectedMenu: SidebarItem;
}

function QuestionItem({
  item,
  index,
  selectedQuestion,
  setSelectedQuestion,
  toggleFavorite,
  selectedMenu,
}: QuestionItemProps) {
  const isItMobile = useDevices();

  if (isItMobile) {
    let html = "";
    if (Array.isArray(item?.content)) {
      html = item.content.reduce((acc, item) => {
        return acc + item;
      }, "");
    } else {
      html = item?.content;
    }

    return (
      <Collapse
        onChange={() => setSelectedQuestion(item)}
        bordered={false}
        ghost
        expandIconPosition="end"
      >
        <Panel
          style={{
            paddingLeft: 0,
          }}
          header={`${index + 1}. ${item.title}`}
          key={index}
          className="panel"
        >
          <QuestionDetail
            item={item}
            selectedMenu={selectedMenu}
            toggleFavorite={toggleFavorite}
            setSelectedQuestion={setSelectedQuestion}
          />
        </Panel>
      </Collapse>
    );
  }

  return (
    <List.Item
      style={{
        cursor: "pointer",
        // backgroundColor:
        //   item?.id === selectedQuestion?.id
        //     ? "rgba(51, 102, 255, 0.08)"
        //     : null,
        color: item?.id === selectedQuestion?.id ? colors.primary : null,
      }}
      onClick={() => setSelectedQuestion(item)}
    >
      <span
        style={{
          flex: 1,
        }}
      >
        {`${index + 1}. ${item.title}`}
      </span>

      <Button
        onClick={() => toggleFavorite(item, selectedMenu)}
        size="small"
        key="bookmarked"
        type="link"
        // danger
      >
        {item.bookmarked ? <StarFilled /> : <StarOutlined />}
      </Button>
    </List.Item>
  );
}

export default QuestionItem;
