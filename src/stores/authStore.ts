// import localStorage from "@react-native-async-storage/async-storage";
// import { IndexPath } from "@ui-kitten/components";
import { makeAutoObservable } from "mobx";
import { User } from "../data-contracts/contracts";

export interface IAuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
  clearUser: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
  checkUserLoggedInStatus: () => void;
}

export class AuthStore implements IAuthStore {
  isLoggedIn: boolean = false;
  user: User = undefined;
  showLoginModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  checkUserLoggedInStatus = async () => {
    try {
      const user = await localStorage.getItem("user");
      if (user) {
        this.setUser(JSON.parse(user));
        this.setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setUser = async (user: User) => {
    this.user = user;
    try {
      await localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  clearUser = async () => {
    this.user = undefined;
    try {
      await localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  setIsLoggedIn = (login: boolean) => {
    this.isLoggedIn = login;
  };

  logout = () => {
    this.setIsLoggedIn(false);
    this.clearUser();
    window.location.reload();
  };

  setShowLoginModal = (value: boolean) => {
    this.showLoginModal = value;
  };
}
