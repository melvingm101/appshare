import { InputFieldType } from "@/client/models";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

function TextInput({
  inputField,
  formParameters,
  ...rest
}: {
  inputField: InputFieldType;
  formParameters: UseFormReturn<FieldValues, any>;
}) {
  return (
    <div className="sm:col-span-4 mt-5">
      {inputField.labelText !== "" && (
        <label htmlFor="email" className="block text-sm font-medium leading-6">
          {inputField.labelText}
        </label>
      )}
      <div className="mt-2">
        <input
          id={inputField.name}
          type="text"
          className={`block w-full rounded-md border ${
            formParameters.formState.errors &&
            formParameters.formState.errors[inputField.name]
              ? "border-red-500"
              : "border-gray-600"
          } py-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 text-white bg-primary-color`}
          placeholder={inputField.placeholder}
          {...formParameters.register(inputField.name, {
            required: inputField.required,
          })}
          {...rest}
        />
        {formParameters.formState.errors &&
          formParameters.formState.errors[inputField.name] && (
            <p className="text-red-500 text-sm mt-2">This field is required</p>
          )}
      </div>
    </div>
  );
}

export default TextInput;
