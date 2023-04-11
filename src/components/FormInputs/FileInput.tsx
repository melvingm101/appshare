import { InputFieldType } from "@/client/models";
import { useCallback } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EmptyFileContainer = () => (
  <div className="h-[200px] flex items-center">
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
          clipRule="evenodd"
        />
      </svg>
      <div className="mt-4 flex text-sm leading-6">
        <p className="pl-1">Upload a file or drag and drop</p>
      </div>
      <p className="text-xs leading-5">PNG, JPG, GIF up to 10MB</p>
    </div>
  </div>
);

const ImageContainer = ({
  imageUrl,
  formParameters,
  name,
}: {
  imageUrl: string;
  formParameters: UseFormReturn<FieldValues, any>;
  name: string;
}) => (
  <div
    className="bg-cover bg-center h-[200px] w-full rounded-lg relative"
    style={{ backgroundImage: `url("${imageUrl}")` }}
  >
    <div className="absolute top-0.5 right-0.5">
      <XMarkIcon
        className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"
        onClick={() => formParameters.resetField(name)}
      />
    </div>
  </div>
);

function FileInput({
  inputField,
  formParameters,
}: {
  inputField: InputFieldType;
  formParameters: UseFormReturn<FieldValues, any>;
}) {
  const watchFileInput = formParameters.watch(inputField.name);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(file.name)) {
        formParameters.setError(inputField.name, {
          type: "custom",
          message: "Invalid file format (JPG, PNG or GIF allowed)",
        });
        return;
      }
      const base64 = await convertBase64(file);
      formParameters.clearErrors(inputField.name);
      formParameters.setValue(inputField.name, base64);
    } else {
      formParameters.setError(inputField.name, {
        type: "custom",
        message: "Please try again!",
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const convertBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  return (
    <div className="col-span-full mt-5">
      <label
        htmlFor={inputField.name}
        className="block text-sm font-medium leading-6"
      >
        {inputField.labelText}
      </label>
      <div
        className={`cursor-pointer mt-2 flex justify-center rounded-lg border border-dashed ${
          formParameters.formState.errors &&
          formParameters.formState.errors[inputField.name]
            ? "border-red-500"
            : "border-gray-600"
        }`}
        {...getRootProps()}
      >
        {typeof watchFileInput === "string" ? (
          <ImageContainer
            imageUrl={watchFileInput}
            formParameters={formParameters}
            name={inputField.name}
          />
        ) : (
          <EmptyFileContainer />
        )}

        <input
          id={inputField.name}
          type="file"
          className="sr-only invisible"
          accept="image/*"
          {...getInputProps()}
          {...formParameters.register(inputField.name)}
        />
      </div>
      {formParameters.formState.errors &&
        formParameters.formState.errors[inputField.name] && (
          <p className="text-red-500 text-sm mt-2">
            {formParameters.formState.errors[inputField.name]?.message}
          </p>
        )}
    </div>
  );
}

export default FileInput;
