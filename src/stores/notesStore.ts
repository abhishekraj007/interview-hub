import { makeAutoObservable } from "mobx";

export interface INotesStore {
  showNoteModal: boolean;
  setShowNoteModal: (value: boolean) => void;
}

export class NotesStore implements INotesStore {
  showNoteModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setShowNoteModal = (value: boolean) => {
    this.showNoteModal = value;
  };
}
