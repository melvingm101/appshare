import { InputFieldType } from "@/client/models";
import { FieldValues, UseFormReturn } from "react-hook-form";

function TextArea({
  inputField,
  formParameters,
  ...rest
}: {
  inputField: InputFieldType;
  formParameters: UseFormReturn<FieldValues, any>;
}) {
  return (
    <div className="col-span-full mt-5">
      <label className="block text-sm font-medium leading-6">
        {inputField.labelText}
      </label>
      <div className="mt-2">
        <textarea
          id={inputField.name}
          rows={4}
          className={`block w-full rounded-md border ${
            formParameters.formState.errors &&
            formParameters.formState.errors[inputField.name]
              ? "border-red-500"
              : "border-gray-600"
          } shadow-sm placeholder:text-gray-400 py-1.5 sm:text-sm sm:leading-6 px-3 text-white resize-none bg-primary-color`}
          placeholder={inputField.placeholder}
          {...formParameters.register(inputField.name, {
            required: inputField.required,
          })}
          {...rest}
        ></textarea>
        {formParameters.formState.errors &&
          formParameters.formState.errors[inputField.name] && (
            <p className="text-red-500 text-sm mt-2">This field is required</p>
          )}
      </div>
    </div>
  );
}

export default TextArea;
