export interface Question {
  id?: string;
  title: string;
  content: string[];
  bookmarked?: boolean;
  type?: string;
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
  JAVASCRIPT_FAVORITE = "JAVASCRIPT_FAVORITE",
  REACT = "REACT",
  REACT_FAVORITE = "REACT_FAVORITE",
  NOTES = "NOTES",
  NOTES_FAVORITE = "NOTES_FAVORITE",
  ALL_FAVORITES = "ALL_FAVORITES",
}

export const getCategory = (category: string) => {
  if (category) {
    return SidebarItem.JAVASCRIPT;
  }
};

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
