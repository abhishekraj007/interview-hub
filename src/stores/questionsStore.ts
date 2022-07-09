import { makeAutoObservable } from "mobx";
import {
  apiUpdateUser,
  apiGetUserData,
  apiGetJavascriptQuestions,
} from "../apis";
import {
  getCategoryKey,
  Question,
  SidebarItem,
} from "../data-contracts/contracts";

interface IQModel {
  data: Question[];
  favs: Question[];
}

export interface IQuestionStore {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  javascript: IQModel;
  setJavascript: (questions: IQModel) => void;
  react: IQModel;
  setReact: (data: IQModel) => void;
  notes: IQModel;
  setNotes: (data: IQModel) => void;
  filteredList: Question[];
  setFilteredList: (questions: Question[]) => void;
  allFavorites: Question[];
  setAllFavorites: (questions: Question[]) => void;
  getQuestions: (userId?: string) => void;
  toggleFavorite: (
    item: Question,
    category?: SidebarItem,
    userId?: string
  ) => void;
  searchQuestion: (text: string, category?: SidebarItem) => void;
  clearFilter: (selectedCategory) => void;
  questions?: {
    js: IQModel;
    react: IQModel;
  };
  userFavs: Question[];
  setUserFavs: (data: Question[]) => void;
  questionsMap: any;
  setFavsForAllCategories: (
    favList: Question[],
    excludeCurrentCategory?: SidebarItem
  ) => void;
}

export class QuestionStore implements IQuestionStore {
  isLoading: boolean = false;
  filteredList: Question[] = [];
  allFavorites: Question[] = [];
  userFavs: Question[] = [];
  javascript: IQModel = {
    data: [],
    favs: [],
  };
  react: IQModel = {
    data: [],
    favs: [],
  };
  notes: IQModel = {
    data: [],
    favs: [],
  };

  questionsMap = {};

  setJavascript = (data: IQModel) => {
    this.javascript = data;
  };

  setReact = (data: IQModel) => {
    this.react = data;
  };

  setNotes = (data: IQModel) => {
    this.notes = data;
  };

  setFilteredList = (data: Question[]) => {
    this.filteredList = data;
  };

  setAllFavorites = (data: Question[]) => {
    this.allFavorites = data;
  };

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setUserFavs = (data: Question[]) => {
    this.userFavs = data;
  };

  setFavsForAllCategories = (favList: Question[], excludeCurrentCategory) => {
    const categories = [
      SidebarItem.JAVASCRIPT,
      SidebarItem.REACT,
      SidebarItem.NOTES,
    ].filter((item) => item !== excludeCurrentCategory);

    categories.forEach((category) => {
      const { getMenuKey, setMenuKey } = getCategoryKey(category);

      const favs = (favList ?? [])
        .map((item) => {
          if (item.type === category) {
            return { ...item, bookmarked: true };
          }
        })
        .filter((item) => item);

      const data = this.includeFavorites(this[getMenuKey].data, favs);

      this[setMenuKey]({
        data,
        favs,
      });
    });

    this.setFilteredList(this.javascript.data);
  };

  constructor() {
    makeAutoObservable(this);
  }

  includeFavorites = (data: Question[], favs: Question[]) => {
    favs.forEach((fav) => {
      const founded = data.findIndex((item) => item.id === fav.id);
      data.splice(founded, 1);
    });

    return [...favs, ...data];
  };

  getQuestions = async (userId?: string) => {
    try {
      this.setIsLoading(true);
      // let data = [];

      const res = await apiGetJavascriptQuestions();
      // console.log(res);
      const jsData = res?.javascript?.data || [];
      const reactData = res?.react?.data || [];

      // console.log(jsData);

      this.setJavascript({
        ...this.javascript,
        data: jsData,
      });

      this.setReact({
        ...this.react,
        data: reactData,
      });

      if (userId) {
        const userSnap = await apiGetUserData(userId);
        // console.log(userSnap.data());
        // Notes is only for logged in users
        this.setNotes({ ...this.notes, data: userSnap.data().notes });
        this.setFavsForAllCategories(userSnap.data().favs, undefined);
        // this.updateFavs(userSnap.data().favs, SidebarItem.REACT, true);
      } else {
        this.setFilteredList(jsData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  searchQuestion = (text: string, category?: SidebarItem) => {
    let filtered = [];
    const { getMenuKey } = getCategoryKey(category);

    switch (category) {
      case SidebarItem.JAVASCRIPT:
      case SidebarItem.REACT:
      case SidebarItem.NOTES:
        filtered = this[getMenuKey].data.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLowerCase());
        });
        break;
      case SidebarItem.ALL_FAVORITES:
        filtered = this.userFavs.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLowerCase());
        });
        break;
      default:
        filtered = this[getMenuKey].favs?.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLocaleLowerCase());
        });
    }

    this.setFilteredList(filtered);
  };

  clearFilter = (category: SidebarItem) => {
    const { getMenuKey } = getCategoryKey(category);

    switch (category) {
      case SidebarItem.JAVASCRIPT:
      case SidebarItem.REACT:
      case SidebarItem.NOTES:
        this.setFilteredList(this[getMenuKey].data);
        break;
      case SidebarItem.ALL_FAVORITES:
        this.setFilteredList(this.userFavs);
        break;
      default:
        this.setFilteredList(this[getMenuKey].favs);
    }
  };

  toggleFavorite = (
    item: Question,
    category?: SidebarItem,
    userId?: string
  ) => {
    // If item is present in fav list remove it

    const { getMenuKey, setMenuKey } = getCategoryKey(item.type as SidebarItem);

    const foundedIndex = this[getMenuKey].favs?.findIndex(
      (fav) => fav.id === item.id
    );

    let foundedEle = this[getMenuKey].favs[foundedIndex];
    let newList = [];
    let newFavList = [];

    // debugger;
    if (foundedIndex >= 0) {
      // Remove from fav

      newList = this[getMenuKey].data.map((ele) => {
        if (ele.id === foundedEle.id) {
          return {
            ...ele,
            bookmarked: false,
          };
        }
        return ele;
      });

      newFavList = this[getMenuKey].favs.filter(
        (item) => item.id !== foundedEle.id
      );

      this[setMenuKey]({ data: newList, favs: newFavList });
    } else {
      // Add to fav
      newList = this[getMenuKey].data.map((question) => {
        if (question.id === item.id) {
          return {
            ...item,
            bookmarked: true,
          };
        }
        return question;
      });

      newFavList = [{ ...item, bookmarked: true }, ...this[getMenuKey].favs];

      this[setMenuKey]({ data: newList, favs: newFavList });
    }

    const allFavs = [
      ...this.javascript.favs,
      ...this.react.favs,
      ...this.notes.favs,
    ];
    this.setUserFavs(allFavs);

    switch (category) {
      case SidebarItem.JAVASCRIPT:
      case SidebarItem.REACT:
      case SidebarItem.NOTES:
        this.setFilteredList(newList);
        break;
      case SidebarItem.ALL_FAVORITES:
        this.setFilteredList(allFavs);
        break;
      default:
        this.setFilteredList(newFavList);
    }

    apiUpdateUser(userId, {
      favs: allFavs,
    });
  };
}
