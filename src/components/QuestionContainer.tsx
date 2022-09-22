import React, { useContext, useEffect, useState } from "react";
import { Question, SidebarItem } from "../data-contracts/contracts";
import { observer } from "mobx-react-lite";
import QuestionList from "./QuestionList";
import { StoreContext } from "../stores";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import QuestionDetail from "./QuestionDetail";
import { useDevices } from "../hooks/useDevices";

export const QuestionContainer = observer(() => {
  const store = useContext(StoreContext);
  const isItMobile = useDevices();

  const {
    menuStore: { selectedMenu },
    authStore: { user, setShowLoginModal },
    questionStore: {
      isLoading,
      getQuestions,
      toggleFavorite,
      searchQuestion,
      filteredList,
      setFilteredList,
      react,
      javascript,
      notes,
      selectedQuestion,
      setSelectedQuestion,
      filterNotes,
      clearFilter,
    },
  } = store;

  // const [selectedQuestion, setSelectedQuestion] = useState<Question>(undefined);

  // On Load
  useEffect(() => {
    (async () => {
      getQuestions(user?.id, selectedMenu);
    })();
  }, [user?.id]);

  const onFavToggle = (item: Question, category: SidebarItem) => {
    // Allow fav only if user is loggedIn
    if (user) {
      toggleFavorite(item, category, user?.id);
      // Otherwise show login modal
    } else {
      setShowLoginModal(true);
    }
  };

  // On Menu change
  useEffect(() => {
    // set list data based on menu selection

    switch (selectedMenu) {
      case SidebarItem.JAVASCRIPT_FAVORITE:
        setFilteredList(javascript.favs);
        break;
      case SidebarItem.REACT:
        setFilteredList(react.data);
        break;
      case SidebarItem.REACT_FAVORITE:
        setFilteredList(react.favs);
        break;
      case SidebarItem.NOTES:
        setFilteredList(notes.data);
        break;
      case SidebarItem.NOTES_FAVORITE:
        setFilteredList(notes.favs);
        break;

      default:
        setFilteredList(javascript.data);
    }
  }, [selectedMenu, javascript, react, notes]);

  const onSearch = (value: string) => {
    setSelectedQuestion(undefined);
    searchQuestion(value, selectedMenu);
  };

  const gap = isItMobile ? 12 : 24;

  const renderList = () => {
    return (
      <>
        {/* {isLoading && <Loader />} */}
        <Layout
          style={{
            paddingLeft: gap,
            paddingRight: gap,
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              paddingTop: gap,
              paddingBottom: gap,
              position: "relative",
            }}
          >
            <Row>
              <Col span={isItMobile ? 24 : 10}>
                <QuestionList
                  isLoading={isLoading}
                  data={filteredList}
                  selectedMenu={selectedMenu}
                  selectedQuestion={selectedQuestion}
                  setSelectedQuestion={setSelectedQuestion}
                  toggleFavorite={onFavToggle}
                  onSearch={onSearch}
                  filterNotes={filterNotes}
                  clearFilter={clearFilter}
                />
              </Col>

              {!isItMobile && (
                <Col
                  style={{
                    height: `calc(100vh - 100px)`,
                    overflow: "auto",
                    paddingLeft: 24,
                    paddingBottom: 24,
                  }}
                  span={14}
                >
                  <QuestionDetail
                    item={selectedQuestion}
                    toggleFavorite={onFavToggle}
                    selectedMenu={selectedMenu}
                    setSelectedQuestion={setSelectedQuestion}
                  />
                </Col>
              )}
            </Row>
          </Content>
        </Layout>
      </>
    );
  };

  return renderList();
});
