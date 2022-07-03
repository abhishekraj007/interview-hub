import { Card, Empty } from "antd";
import React from "react";
import { Question } from "../data-contracts/contracts";

interface Props {
  item: Question;
}

function QuestionDetail({ item }: Props) {
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

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export default QuestionDetail;
