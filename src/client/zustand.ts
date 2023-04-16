import { create } from "zustand";
import postRequest from "./http/postRequest";
import alertMessage from "./toastMessage";

export interface LoggedInUser {
  name: string;
  photoUrl: string;
  points: number;
  tagline: string;
}

export const useCurrentStore = create((set) => ({
  user: null,
  isUserLoaded: false,
  token: "",
  checkUser: async (token: string, body: any) => {
    const responseData = await postRequest(
      "/api/users/check-user",
      body,
      token
    );

    if (!responseData || !responseData.data) {
      alertMessage(responseData?.error);
      set(() => ({ user: null, isUserLoaded: true, token }));
    } else {
      set(() => ({ user: responseData.data, isUserLoaded: true, token }));
    }
  },
}));
