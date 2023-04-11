import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useCurrentStore } from "@/client/zustand";
import { githubSignIn, googleSignIn, logout } from "@/client/firebase";
import GoogleIcon from "../Icons/Google";
import GithubIcon from "../Icons/Github";
import Avatar from "../Avatar";

const navigation = [
  {
    name: "Search",
    href: "#",
    current: false,
    icon: (
      <MagnifyingGlassIcon
        className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"
        aria-hidden="true"
      />
    ),
  },
];

const loginList = [
  {
    name: "Login with Google",
    onClick: async () => await googleSignIn(),
    icon: <GoogleIcon />,
  },
  {
    name: "Login with Github",
    onClick: async () => await githubSignIn(),
    icon: <GithubIcon />,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const user = useCurrentStore((state: any) => state.user.user);

  return (
    <Disclosure as="nav" className="bg-primary-color">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-stretch justify-start pl-5 sm:pl-0">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="hidden h-8 w-auto sm:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="sm:ml-6 flex items-center">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <div key={index}>{item.icon}</div>
                    ))}
                  </div>
                </div>
              </div>
              {!!user ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:text-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm">
                        <span className="sr-only">Open user menu</span>
                        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary-color border border-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {() => (
                            <div
                              className="block px-4 py-2 text-sm text-white"
                              onClick={async () => await logout()}
                            >
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {loginList.map((item) => (
                      <div
                        key={item.name}
                        className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium bg-gray-900 text-white flex"
                        onClick={item.onClick}
                      >
                        <div className="mt-[5px] sm:mt-[3px]">{item.icon}</div>
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {!user
                ? loginList.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="div"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer flex"
                      onClick={item.onClick}
                    >
                      <div className="mt-[5px] sm:mt-[3px]">{item.icon}</div>
                      {item.name}
                    </Disclosure.Button>
                  ))
                : null}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
