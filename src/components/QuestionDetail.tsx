import { EditOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Row, Space } from "antd";
import React, { useContext } from "react";
import { Question, SidebarItem } from "../data-contracts/contracts";
import { StoreContext } from "../stores";

interface Props {
  item: Question;
  toggleFavorite: (
    item: Question,
    category?: SidebarItem,
    userId?: string
  ) => void;
  selectedMenu: SidebarItem;
  setSelectedQuestion: (item: Question) => void;
}

function QuestionDetail({
  item,
  toggleFavorite,
  selectedMenu,
  setSelectedQuestion,
}: Props) {
  const {
    authStore: { isLoggedIn },
  } = useContext(StoreContext);

  if (!item) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!item && <Empty description={false} />}
      </div>
    );
  }

  let html = "";
  if (Array.isArray(item?.content)) {
    html = item.content.reduce((acc, item) => {
      return acc + item;
    }, "");
  } else {
    html = item?.content;
  }

  const renderControlPanel = () => {
    return (
      <Row
        style={{
          marginBottom: 16,
        }}
        justify="end"
      >
        <Space split={<Divider type="vertical" />}>
          <Button
            onClick={() => {
              setSelectedQuestion({
                ...item,
                bookmarked: !item.bookmarked,
              });
              toggleFavorite(item, selectedMenu);
            }}
            size="small"
            key="bookmarked"
            type="link"
            // danger
          >
            {item.bookmarked ? <StarFilled /> : <StarOutlined />}
          </Button>
          <Button size="small" key="edit" type="link">
            <EditOutlined />
          </Button>
        </Space>
      </Row>
    );
  };

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {isLoggedIn && renderControlPanel()}
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export default QuestionDetail;
