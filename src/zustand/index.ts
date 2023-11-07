import { createStore, useStore as useZustandStore } from "zustand";
import postRequest from "../client/http/postRequest";
import alertMessage from "../client/toastMessage";
import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { AppshareProject, LoggedInUser } from "./models";
import patchRequest from "@/client/http/patchRequest";
import getRequest from "@/client/http/getRequest";

interface AppshareStoreInterface {
  user: LoggedInUser | null;
  firebaseUser: User | null;
  isUserLoaded: boolean;
  activeTab: string;
  projects: AppshareProject[];
  fetchProjects: (sort: string) => void;
  showProject: AppshareProject;
  checkUser: (user: User, body: any) => void;
  setProjects: (projects: AppshareProject[]) => void;
  setShowProject: (project: AppshareProject) => void;
  addLike: (url: string, body: any, token: string, isShowPage: boolean) => void;
}

const getDefaultInitialState = () => ({
  user: null,
  firebaseUser: null,
  isUserLoaded: false,
  activeTab: "latest",
  showProject: {
    id: 1,
    title: "",
    description: "",
    likes: [],
    projectUrl: "",
    tags: [],
    banner: "",
    views: 0,
  },
  projects: [],
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
    fetchProjects: async (sort: string) => {
      const responseData = await getRequest("/api/projects", {
        params: { sort },
      });

      if (responseData && responseData.data) {
        set(() => ({
          activeTab: sort,
          projects: responseData.data,
        }));
      } else {
        alertMessage(responseData?.error);
      }
    },
    setProjects: (projects: AppshareProject[]) => {
      set(() => ({
        projects: projects,
      }));
    },
    setShowProject: (project: AppshareProject) => {
      set(() => ({
        showProject: project,
      }));
    },
    addLike: async (
      url: string,
      body: any,
      token: string,
      isShowPage: boolean
    ) => {
      const responseData = await patchRequest(url, body, token);

      if (!responseData || !responseData.data) {
        alertMessage(responseData?.error);
      } else {
        if (isShowPage) {
          set(() => ({
            showProject: responseData.data,
          }));
        } else {
          const newProjects = get().projects.map((project) => {
            if (project.id === responseData.data["id"]) {
              return responseData.data;
            }

            return project;
          });

          set(() => ({
            projects: newProjects,
          }));
        }
      }
    },
  }));
};
