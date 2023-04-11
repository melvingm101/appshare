import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import Avatar from "../Avatar";
import { InputFieldType } from "@/client/models";
import { returnInput } from "../FormInputs";

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
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const onSubmit = (data: any) => {
    console.log(data);
    formParameters.reset();
    setOpen(false);
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
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
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
          {createFormInputs.map((item, index) => (
            <div key={index}>{returnInput(item, formParameters)}</div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default CreateForm;
