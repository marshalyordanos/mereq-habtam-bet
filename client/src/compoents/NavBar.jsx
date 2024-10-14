import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { main } from "../constraints/color";
import logo from "../assets/habtam.png";
import { RiHomeSmileLine } from "react-icons/ri";
import { TbUserPlus } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";
import { LuUser2 } from "react-icons/lu";
import { BsChatDots } from "react-icons/bs";

const navigation = [
  { name: "Home", href: "https://habtam.bet/", current: true },
  { name: "Deposit", href: "https://habtam.bet/gamer-detail/deposit", current: false },
  { name: "Promotions", href: "https://habtam.bet/promotions", current: false },
  { name: "Withdraw", href: "https://habtam.bet/gamer-detail/withdraw", current: false },
  { name: "Profile", href: "https://habtam.bet/gamer-detail/profile/detail", current: false },
  { name: "Live Chat", href: "/live", current: false },
];

import { NavLink } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className={`z-50 bg-[#ADE404]`}>
      <div className="mx-auto max-w-8xl px-2 fixed bg-[#ADE404]  w-full top-0 sm:px-6 lg:px-8">
        <div className="relative flex  min-h-[45px]  md:min-h-[90px]  items-center justify-between">
          {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div> */}
          <div className="flex flex-1 items-center  sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-7 w-auto md:h-14"
              />
            </div>
            <div className="hidden  items-center sm:ml-6 sm:flex">
              <div className="flex  space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    // aria-current={item.current ? "page" : undefined}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "border-b-black border-b-[1px] text-sm pb-[2px]  block"
                        : "pb-[2px] text-sm  block"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex gap-1 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              className={classNames(
                "bg-gray-900 text-white",
                // "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-2 py-[5px]  text-xs font-medium"
              )}
            >
              Login
            </button>
            <button
              className={classNames(
                "border-black border",
                // "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-2 py-[5px]  text-xs font-medium"
              )}
            >
              Register
            </button>
            <button
              className={classNames(
                "border-black border",
                // "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-2 py-[5px]  text-xs font-medium"
              )}
            >
              EN
            </button> */}
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button> */}

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-7 w-7 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#020202] py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#ADE404]"
                  >
                    Wallet
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#ADE404]"
                  >
                    History
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#ADE404]"
                  >
                    My Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#ADE404]"
                  >
                    Refer & Earn
                  </a>
                </MenuItem>{" "}
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#ADE404]"
                  >
                    Help Center
                  </a>
                </MenuItem>{" "}
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#ADE404]"
                  >
                    Language
                  </a>
                </MenuItem>{" "}
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#ADE404]"
                  >
                    LogOut
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel> */}
      <div className="z-40 flex py-1  sm:hidden justify-around bg-[#ADE404] w-full fixed bottom-0 mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="flex gap-[3px] flex-col justify-center items-center">
          <RiHomeSmileLine size={24} />
          <p className="text-xs">Home</p>
        </div>
        <div className="flex gap-[3px] flex-col justify-center items-center">
          <TbUserPlus size={24} />
          <p className="text-xs">Earn</p>
        </div>

        <div className="flex gap-[3px] flex-col justify-center items-center">
          <TfiAnnouncement size={24} />
          <p className="text-xs">Promotions</p>
        </div>

        <div className="flex gap-[3px] flex-col justify-center items-center">
          <LuUser2 size={24} />
          <p className="text-xs">Live chat</p>
        </div>

        <div className="flex gap-[3px] flex-col justify-center items-center">
          <BsChatDots size={24} />
          <p className="text-xs">Profile</p>
        </div>
      </div>
    </Disclosure>
  );
}
