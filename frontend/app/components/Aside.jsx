"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaTruckLoading, FaBoxes } from "react-icons/fa";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { motion } from "framer-motion";

const pages = [
  { page: "/", icon: FaHome, label: "Visão geral" },
  { page: "/products", icon: FaBoxes, label: "Produtos" },
  { page: "/suppliers", icon: FaTruckLoading, label: "Fornecedores" },
  { page: "/associations", icon: FaPeopleCarryBox, label: "Associações" },
];

export default function Aside() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed bottom-0 left-0 right-0
        md:static md:h-screen

        flex flex-row md:flex-col
        items-center md:items-start

        w-full md:w-[20rem]
        h-[70px] md:h-screen

        px-4 py-2
        bg-white text-[#2d2d2d]

        border-t md:border-t-0
        md:border-r border-[#999]

        z-50
      "
    >
      {/* Logo (somente desktop/tablet) */}
      <h2 className="hidden md:block text-4xl border-b-2 border-[#ddd] mb-5 pb-3 w-full">
        <Image className="py-4" src="/logo.png" width={180} height={80} alt="logo" />
      </h2>

      {/* Menu */}
      <ul
        className="
          flex flex-row md:flex-col
          gap-2
          w-full
          justify-around md:justify-start
          items-center md:items-start
          text-xs md:text-lg
        "
      >
        {pages.map((page) => {
          const isActive = pathname === page.page;

          return (
            <Link key={page.page} href={page.page} className="relative group">
              <li
                className={`
                  relative z-10
                  flex flex-col md:flex-row
                  items-center
                  gap-1 md:gap-3

                  px-2 md:px-4
                  py-1 md:py-2
                  rounded-md

                  transition-colors duration-300

                  ${isActive ? "text-emerald-600" : "text-[#2d2d2d] hover:text-gray-500"}
                `}
              >
                <page.icon size={20} />

                <span className="font-medium hidden md:inline">{page.label}</span>

                {/* Indicador ativo */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="
                      absolute bottom-0 left-0 right-0
                      h-[3px]

                      md:top-0 md:left-0 md:right-auto
                      md:h-full md:w-[5px]

                      bg-emerald-500
                      rounded-full
                      -z-10
                    "
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.35,
                    }}
                  />
                )}
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
}
