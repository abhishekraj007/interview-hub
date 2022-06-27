// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IndexPath } from "@ui-kitten/components";
import { makeAutoObservable } from "mobx";
import { AppTheme } from "../data-contracts/contracts";

export interface IMenuStore {
  // selectedMenu: IndexPath;
  // setSelectedMenu: (selectedMenu: IndexPath) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  // theme: AppTheme;
  // setTheme: (theme: AppTheme) => void;
  // loadTheme: () => void;
}

export class MenuStore implements IMenuStore {
  // selectedMenu: IndexPath = new IndexPath(0);
  showSidebar: boolean = false;
  // theme: AppTheme = AppTheme.LIGHT;

  constructor() {
    makeAutoObservable(this);
  }

  // loadTheme = async () => {
  //   try {
  //     const userTheme = await AsyncStorage?.getItem("theme");
  //     if (userTheme) {
  //       this.setTheme(userTheme as AppTheme);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setSelectedMenu = (selectedMenu) => {
  //   this.selectedMenu = selectedMenu;
  // };

  setShowSidebar = (value: boolean) => {
    this.showSidebar = value;
  };

  // setTheme = async (value: AppTheme) => {
  //   this.theme = value;
  //   try {
  //     await AsyncStorage.setItem("theme", value);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
