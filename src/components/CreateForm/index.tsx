import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import Avatar from "../Avatar";
import { InputFieldType } from "@/client/models";
import { returnInput } from "../FormInputs";
import { useStore } from "@/zustand";
import postRequest from "@/client/http/postRequest";
import { useRouter } from "next/router";
import alertMessage from "@/client/toastMessage";
import { User } from "firebase/auth";

const createFormInputs: InputFieldType[] = [
  {
    name: "title",
    type: "text",
    placeholder: "Title",
    labelText: "Title of project",
    required: true,
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Description of the project",
    labelText: "Description of the project",
    required: true,
  },
  {
    name: "banner",
    type: "file",
    placeholder: "",
    labelText: "Banner (optional)",
    required: false,
  },
  {
    name: "tags",
    type: "multiselectChip",
    placeholder: "",
    labelText: "Tags",
    required: true,
  },
  {
    name: "projectUrl",
    type: "multiselect",
    placeholder: "Add project url",
    labelText: "Project URL (optional)",
    required: false,
  },
  {
    name: "videoUrl",
    type: "text",
    placeholder: "Video URL",
    labelText: "Video URL (optional)",
    required: false,
  },
];

const CreateForm = () => {
  const router = useRouter();
  const firebaseUser: User = useStore((state: any) => state.firebaseUser);
  const user: any = useStore((state: any) => state.user);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const onSubmit = async (data: any) => {
    const token = await firebaseUser.getIdToken();
    const response = await postRequest("/api/projects", data, token);
    if (response?.data) {
      router.push(`/projects/${response.data.id}`);
    } else {
      alertMessage("Something went wrong!");
    }
  };

  const formParameters = useForm();

  const toggleModal = (open: boolean) => {
    if (Object.keys(formParameters.formState.errors).length === 0) {
      setOpen(open);
    }
  };

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center rounded-md bg-primary-color p-5 cursor-pointer mb-4 text-gray-500 mx-3 text-sm"
      >
        <Avatar src={user.photoUrl} name={user.name} />
        <div className="ml-3">Add your project here...</div>
      </div>
      <Modal
        open={open}
        setOpen={(open: boolean) => toggleModal(open)}
        onCancel={(open: boolean) => setOpen(open)}
        cancelButtonRef={cancelButtonRef}
        handleSubmit={formParameters.handleSubmit(onSubmit)}
      >
        <div className="m-5 max-w-screen-sm mx-auto mt-24 mb-32 sm:mb-28">
          {createFormInputs.map((item) => (
            <div key={item.name}>{returnInput(item, formParameters)}</div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default CreateForm;
