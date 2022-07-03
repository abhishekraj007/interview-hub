import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { apiUpdateUser } from "../../apis";
import { Question } from "../../data-contracts/contracts";
import { Button, Col, Drawer, Form, Input, message, Row } from "antd";
import { StoreContext } from "../../stores";
import TinyEditor from "../Editor/TinyEditor";

const CreateNoteModal = observer(() => {
  const {
    notesStore,
    authStore: { user },
    questionStore,
  } = useContext(StoreContext);

  const { showNoteModal, setShowNoteModal } = notesStore;
  const { setNotes, notes } = questionStore;
  const [title, setTitle] = useState("");
  const [isMakingCall, setIsMakingCall] = useState(false);

  const editorRef = useRef(null);

  const onAddNote = async (content) => {
    const item: Question = {
      bookmarked: false,
      title,
      content,
      id: uuid(),
      type: "NOTES",
    };
    console.log(item);

    const { data = [] } = notes;

    const newNotes = [item, ...data];

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
    } catch (error) {
      console.log(error);
    } finally {
      setIsMakingCall(false);
    }
  };

  useEffect(() => {
    setTitle("");
  }, []);

  const closeModal = () => {
    setShowNoteModal(false);
  };

  const onSubmit = () => {
    const content = editorRef?.current.getValue();
    onAddNote(content);
  };

  return (
    <Drawer
      title="Create a Note"
      width={720}
      // closeIcon={null}
      closable={false}
      visible={showNoteModal}
      bodyStyle={{ paddingBottom: 80 }}
      extra={<Button onClick={closeModal}>Cancel</Button>}
    >
      <Form layout="vertical" hideRequiredMark onSubmitCapture={onSubmit}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input
                size="large"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <TinyEditor initialValue={""} ref={editorRef} />
            </Form.Item>
          </Col>
        </Row>
        <Button
          loading={isMakingCall}
          size="large"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
    </Drawer>
  );
});

export default CreateNoteModal;
