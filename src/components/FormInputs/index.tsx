import { InputFieldType } from "@/client/models";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import FileInput from "./FileInput";
import MultiselectChip from "./MultiselectChip";

export const returnInput = (
  inputField: InputFieldType,
  formParameters: UseFormReturn<FieldValues, any>
) => {
  let inputTypeText = (
    <TextInput inputField={inputField} formParameters={formParameters} />
  );
  switch (inputField.type) {
    case "textarea":
      inputTypeText = (
        <TextArea inputField={inputField} formParameters={formParameters} />
      );
      break;
    case "file":
      inputTypeText = (
        <FileInput inputField={inputField} formParameters={formParameters} />
      );
      break;
    case "multiselectChip":
      inputTypeText = (
        <MultiselectChip
          inputField={inputField}
          formParameters={formParameters}
        />
      );
      break;
  }

  return inputTypeText;
};
