import { InputFieldType } from "@/client/models";
import React from "react";
import { UseFormReturn, FieldValues, Controller } from "react-hook-form";
import Select from "react-select";

const options = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile App" },
  { value: "design", label: "Design" },
  { value: "tools", label: "Tools" },
  { value: "promotion", label: "Promotion" },
  { value: "video", label: "Video" },
  { value: "games", label: "Video Games" },
  { value: "other", label: "Other" },
];

const MultiselectChip = ({
  inputField,
  formParameters,
}: {
  inputField: InputFieldType;
  formParameters: UseFormReturn<FieldValues, any>;
}) => {
  return (
    <div className="mt-5">
      <label className="block text-sm font-medium leading-6 mb-2">
        {inputField.labelText}
      </label>
      <Controller
        name={inputField.name}
        control={formParameters.control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={options}
            closeMenuOnSelect={false}
            isMulti
            name={inputField.name}
            value={options.find((c) => c.value === value)}
            onChange={onChange}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#1e1f23",
                borderColor:
                  formParameters.formState.errors &&
                  formParameters.formState.errors[inputField.name]
                    ? "#ef4444"
                    : "#555",
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#1e1f23",
                color: "white",
              }),
              option: (
                styles,
                { data, isDisabled, isFocused, isSelected }
              ) => ({
                ...styles,
                backgroundColor: isFocused ? "#333" : "#1e1f23",
              }),
              multiValueLabel: (styles, { data }) => ({
                ...styles,
                color: "white",
              }),
              multiValueRemove: (styles, { data }) => ({
                ...styles,
                color: "white",
                backgroundColor: "#1841ad",
                ":hover": {
                  backgroundColor: "#255aeb",
                  color: "white",
                },
              }),
              multiValue: (styles, { data }) => {
                return {
                  ...styles,
                  backgroundColor: "#255aeb",
                  borderRadius: "0.3rem",
                };
              },
            }}
          />
        )}
        rules={{ required: true }}
      />
      {formParameters.formState.errors &&
        formParameters.formState.errors[inputField.name] && (
          <p className="text-red-500 text-sm mt-2">This field is required</p>
        )}
    </div>
  );
};

export default MultiselectChip;
