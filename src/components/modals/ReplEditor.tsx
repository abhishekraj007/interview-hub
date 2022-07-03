import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Drawer, Select, Typography } from "antd";
import { StoreContext } from "../../stores";
const { Option } = Select;
const { Title } = Typography;

const ReplEditor = observer(() => {
  const { notesStore } = useContext(StoreContext);

  const { showReplEditor, setShowReplEditor } = notesStore;
  const [playground, setPlayground] = useState("js");

  const codesSrc = {
    js: "https://replit.com/@RobertJr/typescript",
    nodejs: "https://replit.com/@RobertJr/nodejs",
    html: "https://replit.com/@RobertJr/html",
    react: "https://replit.com/@RobertJr/react",
    reactTypescript: "https://replit.com/@RobertJr/react-typescript",
  };

  const renderCodeType = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title
          style={{
            marginRight: 16,
          }}
          level={5}
        >
          Playground
        </Title>
        <Select
          defaultValue={playground}
          style={{ width: 200 }}
          onChange={(value) => setPlayground(value)}
        >
          <Option value="js">Javascript</Option>
          <Option value="nodejs">NodeJs</Option>
          <Option value="html">HTML</Option>
          <Option value="react">React</Option>
          <Option value="reactTypescript">React(TypeScript)</Option>
        </Select>
      </div>
    );
  };

  return (
    <Drawer
      title={renderCodeType()}
      width={"100%"}
      closable={false}
      visible={showReplEditor}
      bodyStyle={{ paddingBottom: 80 }}
      extra={<Button onClick={() => setShowReplEditor(false)}>Cancel</Button>}
    >
      <iframe
        frameBorder="0"
        width="100%"
        height="100%"
        // src="https://replit.com/@ritza/demo-embed?lite=true"
        src={`${codesSrc[playground]}?lite=true`}
      ></iframe>
    </Drawer>
  );
});

export default ReplEditor;
