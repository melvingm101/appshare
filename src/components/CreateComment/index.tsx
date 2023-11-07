import React from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/zustand";
import { User } from "firebase/auth";
import postRequest from "@/client/http/postRequest";
import alertMessage from "@/client/toastMessage";

const CreateComment = ({ id }: { id: number }) => {
  const formParameters = useForm();
  const firebaseUser: User = useStore((state: any) => state.firebaseUser);

  const onSubmit = async (data: any) => {
    const token = await firebaseUser.getIdToken();
    const response = await postRequest(
      `/api/posts/${id}/comments`,
      data,
      token
    );
    if (response?.data) {
      console.log(response);
      formParameters.reset();
    } else {
      alertMessage("Something went wrong!");
    }
  };

  return (
    <form onSubmit={formParameters.handleSubmit(onSubmit)}>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-8 mt-4 mb-4 rounded-lg bg-secondary-color">
        <input
          id="body"
          className="block mr-4 p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-700 bg-primary-color placeholder-gray-400 text-white resize-none"
          placeholder="Your comment..."
          {...formParameters.register("body", {
            required: true,
          })}
        />
        <button
          type="submit"
          className="inline-flex justify-center text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
