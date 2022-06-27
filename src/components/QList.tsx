import { List } from "antd";
import React, { useEffect, useState } from "react";
import { apiGetQuestions } from "../apis";

function QList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await apiGetQuestions();
      setData(data);
    })();
  }, []);

  return (
    <List
      //   size="small"
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item.title}</List.Item>}
    />
  );
}

export default QList;
