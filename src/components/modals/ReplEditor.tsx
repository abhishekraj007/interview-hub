import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Drawer, Select, Typography } from "antd";
import { StoreContext } from "../../stores";
import { useDevices } from "../../hooks/useDevices";
import { CloseOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Title } = Typography;

const ReplEditor = observer(() => {
  const { notesStore } = useContext(StoreContext);
  const isItMobile = useDevices();
  const { showReplEditor, setShowReplEditor } = notesStore;
  const [selectedEditorType, setSelectedEditorType] = useState("js");

  const replSrc = {
    js: "typescript",
    nodejs: "nodejs",
    html: "html",
    react: "react",
    react_typescript: "react-typescript",
  };

  const sandboxMap = new Map([
    ["sandbox_js", "agitated-bas-sdig4l"],
    ["sandbox_react", "dazzling-villani-9ukhg7"],
    ["sandbox_react_typescript", "funny-burnell-11t7b6"],
  ]);

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
          defaultValue={selectedEditorType}
          style={{ width: isItMobile ? 160 : 260 }}
          onChange={(value) => setSelectedEditorType(value)}
        >
          <Option value="js">JS</Option>
          <Option value="sandbox_js">JS(Sandbox)</Option>
          <Option value="react">React</Option>
          <Option value="sandbox_react">React(Sandbox)</Option>
          <Option value="nodejs">NodeJs</Option>
          <Option value="html">HTML</Option>
          <Option value="react_typescript">React(TypeScript)</Option>
          <Option value="sandbox_react_typescript">
            React(TypeScript-Sandbox)
          </Option>
        </Select>
      </div>
    );
  };

  const equalPadding = isItMobile ? 8 : 24;

  let src = `https://replit.com/@RobertJr/${replSrc[selectedEditorType]}?lite=true`;

  if (sandboxMap.has(selectedEditorType)) {
    src = `https://codesandbox.io/embed/${sandboxMap.get(
      selectedEditorType
    )}?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark`;
  }

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
      extra={
        <Button type="text" onClick={() => setShowReplEditor(false)}>
          <CloseOutlined />
        </Button>
      }
    >
      <iframe
        frameBorder="0"
        width="100%"
        height="100%"
        src={src}
        style={{
          border: 0,
          borderRadius: 4,
          overflow: "hidden",
        }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </Drawer>
  );
});

export default ReplEditor;
