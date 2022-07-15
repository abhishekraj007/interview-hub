import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { apiUpdateQuestions, apiUpdateUser } from "../../apis";
import {
  getCategoryKey,
  Question,
  SidebarItem,
  tags,
  tagsLabel,
} from "../../data-contracts/contracts";
import { Button, Col, Drawer, Form, Input, message, Row } from "antd";
import { StoreContext } from "../../stores";
import TinyEditor from "../Editor/TinyEditor";
import { useDevices } from "../../hooks/useDevices";
import CheckableTag from "antd/lib/tag/CheckableTag";

interface Props {}

const CreateNoteModal = observer(({}: Props) => {
  // const [form] = Form.useForm();

  const {
    notesStore,
    authStore: { user },
    questionStore,
    menuStore: { setSelectedMenu, selectedMenu },
  } = useContext(StoreContext);

  const { showNoteModal, setShowNoteModal } = notesStore;
  const {
    setNotes,
    notes,
    selectedQuestion,
    setSelectedQuestion,
    isEdit,
    setIsEdit,
    allFavorites,
  } = questionStore;

  const [title, setTitle] = useState("");
  const [isMakingCall, setIsMakingCall] = useState(false);
  const isItMobile = useDevices();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setSelectedTags(nextSelectedTags);
  };

  const editorRef = useRef(null);

  const onAddNote = async (content) => {
    // Create a new Note
    let item: Question = {
      bookmarked: false,
      title,
      content,
      id: uuid(),
      type: "NOTES",
      tags: selectedTags,
    };

    let data = notes.data || [];
    let newData = [item, ...data];
    let newFavs = allFavorites;
    let updateFavs = false;

    // Edit anything
    if (isEdit) {
      item = {
        ...selectedQuestion,
        title,
        content,
        tags: selectedTags,
      };

      // Get data for selected category
      const { getMenuKey } = getCategoryKey(selectedMenu);
      const { data } = questionStore[getMenuKey];
      const indexOfQuestion = data.findIndex(
        (item) => item.id === selectedQuestion.id
      );
      const indexOfQuestionInFav = allFavorites.findIndex(
        (item) => item.id === selectedQuestion.id
      );
      if (indexOfQuestionInFav) {
        newFavs[indexOfQuestionInFav] = item;
        updateFavs = true;
      }
      data[indexOfQuestion] = item;
      newData = data;
    }

    try {
      setIsMakingCall(true);

      // Which cat to update
      // Update favs for user as well if the edit one is favs
      if (isEdit) {
        const { getMenuKey, setMenuKey } = getCategoryKey(selectedMenu);
        const getter = questionStore[getMenuKey];
        const setter = questionStore[setMenuKey];

        setter({
          ...getter,
          data: newData,
        });

        if (selectedMenu === SidebarItem.NOTES) {
          // if it's a note
          let payload: any = { notes: newData };
          if (updateFavs) {
            payload = { ...payload, favs: newFavs };
          }

          await apiUpdateUser(user.id, payload);
        } else {
          // Edited question is in fav as well
          // so update it

          // While updating a question make bookmark false for all question
          const questionsWithoutBookmarked = newData.map((question) => ({
            ...question,
            bookmarked: false,
            tags: selectedTags,
          }));
          await apiUpdateQuestions(getMenuKey, {
            data: questionsWithoutBookmarked,
          });
          if (updateFavs) {
            await apiUpdateUser(user.id, { favs: newFavs });
          }
        }
      } else {
        // It's a note
        // create or add new note
        await apiUpdateUser(user.id, { notes: newData });
        setSelectedMenu(SidebarItem.NOTES);

        setNotes({
          ...notes,
          data: newData,
        });
      }

      setSelectedQuestion(item);

      message.success(
        isEdit ? "Successfully Edited!" : "Note created successfully!"
      );
      setShowNoteModal(false);

      setIsEdit(false);
      setTitle("");
      setSelectedTags([]);
    } catch (error) {
      message.error("Something went wrong! Try again later.");
      console.log(error);
    } finally {
      setIsMakingCall(false);
    }
  };

  useEffect(() => {
    console.log("hello lol");
    setTitle(isEdit ? selectedQuestion?.title : "");
    setSelectedTags(isEdit ? selectedQuestion?.tags ?? [] : []);

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

  // console.log("title, content", isEdit, selectedQuestion);

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
      title={isEdit ? "Edit" : "Create"}
      width={isItMobile ? "100%" : "70%"}
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
        <Row style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Input
              size="large"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 16, flexFlow: "unset" }}>
          <span style={{ marginRight: 8 }}>Categories:</span>
          <Col span={21}>
            {tags.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags?.indexOf(tag) > -1}
                onChange={(checked) => handleTagChange(tag, checked)}
              >
                {tagsLabel[tag]}
              </CheckableTag>
            ))}
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
