import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { apiUpdateUser } from "../../apis";
import { Question } from "../../data-contracts/contracts";
import { Button, Col, Drawer, Form, Input, Layout, Row } from "antd";
import { StoreContext } from "../../stores";
import Editor from "../Editor/Editor";
import { Content } from "antd/lib/layout/layout";
import RichTextEditor from "../Editor/Editor";

const CreateNoteModal = observer(() => {
  const {
    notesStore,
    authStore: { user },
    questionStore,
  } = useContext(StoreContext);

  const { showNoteModal, setShowNoteModal } = notesStore;
  const { setNotes, notes } = questionStore;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isMakingCall, setIsMakingCall] = useState(false);

  const onAddNote = async () => {
    const item: Question = {
      bookmarked: false,
      title,
      content: [description],
      id: uuid(),
      type: "NOTES",
    };

    const { data = [] } = notes;

    const newNotes = [item, ...data];

    try {
      setIsMakingCall(true);
      await apiUpdateUser(user.id, { notes: newNotes });
      setNotes({
        ...notes,
        data: newNotes,
      });
      setShowNoteModal(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsMakingCall(false);
    }
  };

  const closeModal = () => {
    setShowNoteModal(false);
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
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input size="large" placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} style={{ border: "1px solid" }}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <RichTextEditor />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary">Submit</Button>
      </Form>
    </Drawer>
  );
});

export default CreateNoteModal;
