// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IndexPath } from "@ui-kitten/components";
import { makeAutoObservable } from "mobx";
import { AppTheme, SidebarItem } from "../data-contracts/contracts";

export interface IMenuStore {
  selectedMenu: SidebarItem;
  setSelectedMenu: (selectedMenu: SidebarItem) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  loadTheme: () => void;
}

export class MenuStore implements IMenuStore {
  selectedMenu: SidebarItem = SidebarItem.JAVASCRIPT;
  showSidebar: boolean = false;
  theme: AppTheme = AppTheme.DARK;

  constructor() {
    makeAutoObservable(this);
  }

  loadTheme = () => {
    try {
      const userTheme = localStorage?.getItem("theme");
      if (userTheme) {
        this.setTheme(userTheme as AppTheme);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setSelectedMenu = (selectedMenu: SidebarItem) => {
    this.selectedMenu = selectedMenu;
  };

  setShowSidebar = (value: boolean) => {
    this.showSidebar = value;
  };

  setTheme = (value: AppTheme) => {
    this.theme = value;
    try {
      localStorage.setItem("theme", value);
    } catch (error) {
      console.log(error);
    }
  };
}
