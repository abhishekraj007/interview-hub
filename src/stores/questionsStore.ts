import { makeAutoObservable } from "mobx";
import { apiGetQuestions, URLS, apiUpdateUser, apiGetUserData } from "../apis";
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
  getQuestions: (type: SidebarItem, userId?: string) => void;
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

  // This is when user loads the page
  updateFavs = (
    favList: Question[],
    category?: SidebarItem,
    showBookmarkedOnTop?: boolean
  ) => {
    // Add user bookmarked list
    this.userFavs = favList;
    const { getMenuKey, setMenuKey } = getCategoryKey(category);

    // Filter bookmarked items by category
    const favs = (favList ?? [])
      .map((item) => {
        if (item.type === category) {
          return { ...item, bookmarked: true };
        }
      })
      .filter((item) => item);

    const dataWithFavsOnTop = this.includeFavorites(
      this[getMenuKey].data,
      favs
    );

    const data = showBookmarkedOnTop
      ? dataWithFavsOnTop
      : this[getMenuKey].data;

    this[setMenuKey]({
      favs,
      data,
    });
    this.setFilteredList(data);
    this.setFavsForAllCategories(favList, category);

    // Set Favs for all categories
  };

  setFavsForAllCategories = (favList, excludeCurrentCategory) => {
    const categories = [
      SidebarItem.JAVASCRIPT,
      SidebarItem.REACT,
      SidebarItem.NOTES,
    ].filter((item) => item !== excludeCurrentCategory);

    categories.forEach((category) => {
      const { getMenuKey, setMenuKey } = getCategoryKey(category);

      this[setMenuKey]({
        data: this[getMenuKey].data,
        favs: favList
          ?.map((item) => {
            if (item.type === category) {
              return item;
            }
          })
          .filter((item) => item),
      });
    });
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

  getQuestions = async (category: SidebarItem, userId?: string) => {
    try {
      console.log("made fresh api call");
      this.setIsLoading(true);
      let data = [];

      switch (category) {
        case SidebarItem.JAVASCRIPT:
          // Get js questions and set to store
          data = await apiGetQuestions(URLS.js);
          this.setJavascript({
            ...this.javascript,
            data,
          });

          // Add data to questionMap
          data.forEach((item) => {
            this.questionsMap[item?.id] = item;
          });

          // If user is loged in get bookmarked Item
          // Otherwise there is no bookmared

          if (userId) {
            const userSnap = await apiGetUserData(userId);
            console.log(userSnap.data());
            // Notes is only for logged in users
            this.setNotes({ ...this.notes, data: userSnap.data().notes });
            this.updateFavs(userSnap.data().favs, category, true);
          } else {
            this.setFilteredList(data);
          }

          break;
        case SidebarItem.REACT:
          data = await apiGetQuestions(URLS.react);

          this.setReact({
            ...this.react,
            data,
          });

          data.forEach((item) => {
            this.questionsMap[item?.id] = item;
          });

          if (this.userFavs?.length) {
            this.updateFavs(this.userFavs, category, true);
          } else {
            this.setFilteredList(data);
          }

          break;
        default:
          console.log("Made no call");
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

    const allFavs = [...this.javascript.favs, ...this.react.favs];
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
