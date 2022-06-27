import { createContext } from "react";
import { AuthStore, IAuthStore } from "./authStore";
import { IMenuStore, MenuStore } from "./menuStore";
import { INotesStore, NotesStore } from "./notesStore";
import { IQuestionStore, QuestionStore } from "./questionsStore";
import { enableStaticRendering } from "mobx-react-lite";

export interface IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;
  authStore: IAuthStore;
  notesStore: INotesStore;
}

export class Store implements IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;
  authStore: IAuthStore;
  notesStore: INotesStore;

  constructor() {
    this.menuStore = new MenuStore();
    this.questionStore = new QuestionStore();
    this.authStore = new AuthStore();
    this.notesStore = new NotesStore();
  }
}

// enable static rendering ONLY on server
enableStaticRendering(typeof window === "undefined");

// init a client store that we will send to client (one store for client)
let clientStore;

export const useStore = (initData) => {
  // check if we already declare store (client Store), otherwise create one
  const store = clientStore ?? new Store();
  // hydrate to store if receive initial data
  if (initData) store.hydrate(initData);

  // Create a store on every server request
  if (typeof window === "undefined") return store;
  // Otherwise it's client, remember this store and return
  if (!clientStore) clientStore = store;
  return store;
};

export const StoreContext = createContext<IStore>(undefined);
