import { RootState } from "./store";

export const userSelector = (state: RootState) => state.user;
export const toastSelector = (state: RootState) => state.toast;
export const roomSelector = (state: RootState) => state.room;