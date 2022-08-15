export interface Question {
  id?: string;
  title: string;
  content: string[];
  bookmarked?: boolean;
  type?: string;
  tags?: string[];
}
export interface User {
  id: string;
  displayName?: string;
  email?: string;
}

export interface Favorites {
  id: string;
  type: string;
}

export interface QuestionMap {
  id: string;
  question: Question;
}

export const questionCategoriesList = ["javascript", "react", "notes"];

export enum SidebarItem {
  JAVASCRIPT = "JAVASCRIPT",
  JAVASCRIPT_ALL = "JAVASCRIPT_ALL",
  JAVASCRIPT_FAVORITE = "JAVASCRIPT_FAVORITE",
  REACT = "REACT",
  REACT_ALL = "REACT_ALL",
  REACT_FAVORITE = "REACT_FAVORITE",
  NOTES = "NOTES",
  NOTES_ALL = "NOTES_ALL",
  NOTES_FAVORITE = "NOTES_FAVORITE",
  ALL_FAVORITES = "ALL_FAVORITES",
}

export const getCategoryKey = (category: SidebarItem) => {
  // If item is present in fav list remove it
  let getMenuKey = "javascript";
  let setMenuKey = "setJavascript";

  if (
    category === SidebarItem.REACT ||
    category === SidebarItem.REACT_FAVORITE
  ) {
    getMenuKey = "react";
    setMenuKey = "setReact";
  }
  if (
    category === SidebarItem.NOTES ||
    category === SidebarItem.NOTES_FAVORITE
  ) {
    getMenuKey = "notes";
    setMenuKey = "setNotes";
  }

  return { getMenuKey, setMenuKey };
};

export enum AppTheme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export const tags = [
  "javascript",
  "react",
  "array",
  "map",
  "string",
  "problem",
  "math",
  "linked_list",
  "tree",
  "matrix",
  "sliding_window",
  "memoization",
];

export const tagsLabel = {
  javascript: "Javascript",
  react: "React",
  array: "Array",
  map: "Map",
  string: "String",
  problem: "Problem",
  math: "Math",
  linked_list: "Linked List",
  tree: "Tree",
  matrix: "Matrix",
  sliding_window: "Sliding Window",
  memoization: "Memoization",
};

export const AllowedUserToEditPublicQuestions = [
  "JQEwzSCzRSMhLuUzGo5Gmp17Alg1",
  "53xfgejPPshreNIswEbkubOdOrI3",
];

export const GoogleAds = {
  adClient: "ca-pub-6695906984875280",
};
