import React, { useContext, useEffect, useState } from "react";
import {
  getCategory,
  Question,
  SidebarItem,
} from "../data-contracts/contracts";
import { observer } from "mobx-react-lite";
import QuestionList from "./QuestionList";
import { StoreContext } from "../stores";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import QuestionDetail from "./QuestionDetail";
import Search from "antd/lib/input/Search";
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
    },
  } = store;

  const [selectedQuestion, setSelectedQuestion] = useState<Question>(undefined);
  // const [searchText, setSearchText] = useState("");

  // On Load
  useEffect(() => {
    (async () => {
      getQuestions(SidebarItem.JAVASCRIPT, user?.id);
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
        if (react.data.length) {
          setFilteredList(react.data);
        } else {
          getQuestions(SidebarItem.REACT);
        }
        break;
      case SidebarItem.REACT_FAVORITE:
        if (react.data.length) {
          setFilteredList(react.favs);
        } else {
          getQuestions(SidebarItem.REACT);
        }
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
  }, [selectedMenu]);

  const onSearch = (value: string) => {
    searchQuestion(value, getCategory(selectedMenu));
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
            {/* <Row
              style={{
                width: "100%",
                position: "absolute",
                top: 24,
                zIndex: 1,
              }}
            >
            </Row> */}
            {/* <Col span={10}>
              <Search placeholder="Search" onSearch={onSearch} />
            </Col> */}
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
                  <QuestionDetail item={selectedQuestion} />
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
