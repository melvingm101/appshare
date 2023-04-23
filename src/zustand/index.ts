import { createStore, useStore as useZustandStore } from "zustand";
import postRequest from "../client/http/postRequest";
import alertMessage from "../client/toastMessage";
import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { AppshareProject, LoggedInUser } from "./models";
import patchRequest from "@/client/http/patchRequest";

interface AppshareStoreInterface {
  user: LoggedInUser | null;
  firebaseUser: User | null;
  isUserLoaded: boolean;
  posts: AppshareProject[];
  showPost: AppshareProject;
  checkUser: (user: User, body: any) => void;
  setPosts: (projects: AppshareProject[]) => void;
  setShowPost: (project: AppshareProject) => void;
  addLike: (id: number, body: any, token: string, isShowPage: boolean) => void;
}

const getDefaultInitialState = () => ({
  user: null,
  firebaseUser: null,
  isUserLoaded: false,
  showPost: {
    id: 1,
    title: "",
    description: "",
    likes: [],
    projectUrl: "",
    tags: [],
    banner: "",
    views: 0,
  },
  posts: [],
});

export type AppshareStoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<AppshareStoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: AppshareStoreInterface) => T) => {
  const store = useContext(zustandContext);

  if (!store) throw new Error("Store is missing the provider");

  return useZustandStore(store, selector);
};

export const initializeStore = (
  preloadedState: Partial<AppshareStoreInterface> = {}
) => {
  return createStore<AppshareStoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    checkUser: async (user: User, body: any) => {
      const token = await user.getIdToken();
      const responseData = await postRequest(
        "/api/users/check-user",
        body,
        token
      );

      if (!responseData || !responseData.data) {
        alertMessage(responseData?.error);
        set(() => ({ user: null, isUserLoaded: true, firebaseUser: null }));
      } else {
        set(() => ({
          user: responseData.data,
          isUserLoaded: true,
          firebaseUser: user,
        }));
      }
    },
    setPosts: (projects: AppshareProject[]) => {
      set(() => ({
        posts: projects,
      }));
    },
    setShowPost: (project: AppshareProject) => {
      set(() => ({
        showPost: project,
      }));
    },
    addLike: async (
      id: number,
      body: any,
      token: string,
      isShowPage: boolean
    ) => {
      const responseData = await patchRequest(
        `/api/posts/${id}/like`,
        body,
        token
      );

      if (!responseData || !responseData.data) {
        alertMessage(responseData?.error);
      } else {
        if (isShowPage) {
          set(() => ({
            showPost: responseData.data,
          }));
        } else {
          const newPosts = get().posts.map((post) => {
            if (post.id === responseData.data["id"]) {
              return responseData.data;
            }

            return post;
          });

          set(() => ({
            posts: newPosts,
          }));
        }
      }
    },
  }));
};
