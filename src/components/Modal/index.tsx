import { Dispatch, Fragment, MutableRefObject, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  open,
  setOpen,
  onCancel,
  cancelButtonRef,
  handleSubmit,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCancel: (open: boolean) => void;
  cancelButtonRef: MutableRefObject<null>;
  handleSubmit: (data: any) => void;
  children: JSX.Element;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="transform overflow-hidden bg-[#17171c] text-left shadow-xl transition-all w-full">
                <form
                  onSubmit={handleSubmit}
                  className="overflow-scroll max-h-screen"
                >
                  <div className="bg-primary-color px-4 pb-4 pt-5 sm:p-6 sm:pb-4 absolute top-0 w-full">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-white"
                        >
                          Create project
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div className="mx-3">{children}</div>
                  <div className="bg-primary-color px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 fixed bottom-0 w-full">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto items-center"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border-2 border-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm sm:mt-0 sm:w-auto focus-visible:outline-none"
                      onClick={() => onCancel(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
