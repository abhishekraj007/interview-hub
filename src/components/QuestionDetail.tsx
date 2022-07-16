import { EditOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Row, Space } from "antd";
import React, { useContext } from "react";
import {
  AllowedUserToEditPublicQuestions,
  Question,
  SidebarItem,
} from "../data-contracts/contracts";
import { useDevices } from "../hooks/useDevices";
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
    authStore: { isLoggedIn, user },
    notesStore: { setShowNoteModal },
    questionStore: { setIsEdit },
  } = useContext(StoreContext);

  const isItMobile = useDevices();

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

  const renderFavButton = () => {
    if (isItMobile) {
      return (
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
      );
    }
    return null;
  };

  const renderEditButton = () => {
    const button = (
      <Button
        size="small"
        key="edit"
        type="link"
        onClick={() => {
          setShowNoteModal(true);
          setIsEdit(true);
        }}
      >
        <EditOutlined />
      </Button>
    );

    if (AllowedUserToEditPublicQuestions.includes(user?.id)) {
      return button;
    } else if (
      selectedMenu === SidebarItem.NOTES ||
      selectedMenu === SidebarItem.NOTES_FAVORITE
    ) {
      return button;
    }

    return null;
  };

  const renderControlPanel = () => {
    return (
      <Row
        style={{
          marginBottom: 16,
          paddingRight: 16,
        }}
        justify="end"
      >
        <Space split={<Divider type="vertical" />}>
          {renderFavButton()}
          {renderEditButton()}
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
