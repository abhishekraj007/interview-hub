import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { apiUpdateUser } from "../../apis";
import { Question, SidebarItem } from "../../data-contracts/contracts";
import { Button, Col, Drawer, Form, Input, message, Row } from "antd";
import { StoreContext } from "../../stores";
import TinyEditor from "../Editor/TinyEditor";
import { useDevices } from "../../hooks/useDevices";

interface Props {}

const CreateNoteModal = observer(({}: Props) => {
  // const [form] = Form.useForm();

  const {
    notesStore,
    authStore: { user },
    questionStore,
    menuStore: { setSelectedMenu },
  } = useContext(StoreContext);

  const { showNoteModal, setShowNoteModal } = notesStore;
  const { setNotes, notes, selectedQuestion, isEdit, setIsEdit } =
    questionStore;

  const [title, setTitle] = useState("");
  const [isMakingCall, setIsMakingCall] = useState(false);
  const isItMobile = useDevices();

  const editorRef = useRef(null);

  const onAddNote = async (content) => {
    let item: Question = {
      bookmarked: false,
      title,
      content,
      id: uuid(),
      type: "NOTES",
    };

    const { data = [] } = notes;

    let newNotes = [item, ...data];

    if (isEdit) {
      item = {
        ...selectedQuestion,
        title,
        content,
      };

      // get index of item
      // replace with new item

      const indexOfQuestion = data.findIndex(
        (item) => item.id === selectedQuestion.id
      );

      data[indexOfQuestion] = item;
      newNotes = data;
    }

    // const item: Question = {
    //   bookmarked: false,
    //   title,
    //   content,
    //   id: uuid(),
    //   type: "NOTES",
    // };
    // console.log(item);

    try {
      setIsMakingCall(true);
      await apiUpdateUser(user.id, { notes: newNotes });
      setNotes({
        ...notes,
        data: newNotes,
      });
      message.success("Note created successfully!");
      setTitle("");
      setShowNoteModal(false);
      setSelectedMenu(SidebarItem.NOTES);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsMakingCall(false);
    }
  };

  useEffect(() => {
    console.log("hello lol");
    setTitle(isEdit ? selectedQuestion?.title : "");

    // form.setFieldsValue({
    //   title: "selectedQuestion?.title",
    // });
  }, [isEdit, selectedQuestion]);

  // On Close
  const closeModal = () => {
    setShowNoteModal(false);
    setIsEdit(false);
  };

  // On Submit
  const onSubmit = () => {
    const content = editorRef?.current.getValue();

    if (title && content) {
      onAddNote(content);
    } else {
      message.error("Can't create empty note!");
    }
  };

  console.log("title, content", isEdit, selectedQuestion);

  let initialContent = "";

  if (isEdit && selectedQuestion) {
    if (Array.isArray(selectedQuestion?.content)) {
      initialContent = selectedQuestion.content.reduce((acc, item) => {
        return acc + item;
      }, "");
    } else {
      initialContent = selectedQuestion?.content;
    }
  }

  return (
    <Drawer
      title="Create a Note"
      width={isItMobile ? "100%" : 720}
      // closeIcon={null}
      closable={false}
      visible={showNoteModal}
      bodyStyle={{ paddingBottom: 80 }}
      extra={<Button onClick={closeModal}>Cancel</Button>}
    >
      <Form
        // form={form}
        layout="vertical"
        hideRequiredMark
        onSubmitCapture={onSubmit}
      >
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={24}>
            {/* <Form.Item
              name="title"
              label="Title"
              // initialValue={title}
              shouldUpdate={true}
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input
                size="large"
                placeholder="Enter title"
                // defaultValue={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item> */}

            <Input
              size="large"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <TinyEditor initialValue={initialContent} ref={editorRef} />
            </Form.Item>
          </Col>
        </Row>
        <Button
          loading={isMakingCall}
          size="large"
          type="primary"
          htmlType="submit"
          style={{
            width: "50%",
          }}
        >
          Submit
        </Button>
      </Form>
    </Drawer>
  );
});

export default CreateNoteModal;
