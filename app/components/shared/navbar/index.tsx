"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "/public/assets/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { Menu } from "lucide-react";

const menuItems = [
  { label: "Promo", url: "/promo" },
  { label: "About Us", url: "/aboutUs" },
  { label: "Packages", url: "/packages" },
  { label: "Tayyran Business", url: "/tayyran-Business" },
  { label: "Corporate ", url: "/Corporate" },
];

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = usePathname();
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isActive = (path: string) => {
    return router === path ? "!text-secondary lg:!text-primary" : "";
  };

  return (
    <div className="w-full bg-white text-primary">
      <nav
        className={`lg:px-24 md:px-16 px-5 flex md:rounded-full justify-center mx-auto  py-2 items-start relative top-0 w-full z-20 text-black bg-white`}
      >
        <div className="flex justify-between items-center flex-shrink-0 w-full">
          <Link href="/">
            <Image
              src={logo}
              alt=""
              className=" hover:scale-105  duration-300 transition-all"
            />
          </Link>
          <div className="lg:flex items-center hidden gap-3 xl:gap-10 ">


            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                className={`hover:scale-105 hover:text-primary duration-300 transition-all text-base font-medium  ${isActive(
                  item.url
                )}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="lg:hidden block py-2 "
          >
            {isModalOpen ? <IoClose size={25} /> : <Menu />}
          </button>
        </div>
      </nav>
      {isModalOpen && (
        <div className="bg-primary absolute left-0 w-full  px-10 z-20 py-10 transition-all duration-300">
          <div className="flex flex-col justify-center gap-2 ">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                onClick={() => setIsModalOpen(false)}
                className={`hover:scale-105 my-1 text-white duration-300 transition-all text-base font-medium  ${isActive(
                  item.url
                )}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
