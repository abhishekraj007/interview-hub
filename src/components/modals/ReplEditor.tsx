import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Drawer, Select, Typography } from "antd";
import { StoreContext } from "../../stores";
import { useDevices } from "../../hooks/useDevices";
const { Option } = Select;
const { Title } = Typography;

const ReplEditor = observer(() => {
  const { notesStore } = useContext(StoreContext);
  const isItMobile = useDevices();
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
            margin: "0 24px 0 0",
          }}
          level={4}
        >
          Playground
        </Title>
        <Select
          defaultValue={playground}
          style={{ width: 160 }}
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

  const equalPadding = isItMobile ? 8 : 24;

  return (
    <Drawer
      title={renderCodeType()}
      width={"100%"}
      closable={false}
      visible={showReplEditor}
      bodyStyle={{
        paddingBottom: isItMobile ? 0 : 40,
        paddingLeft: isItMobile ? 0 : 24,
        paddingTop: isItMobile ? 0 : 24,
      }}
      headerStyle={{
        paddingLeft: equalPadding,
        paddingRight: equalPadding,
      }}
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
