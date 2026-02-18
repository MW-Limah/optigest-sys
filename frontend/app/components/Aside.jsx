import Link from "next/link";
import { FaHome, FaTruckLoading, FaBoxes } from "react-icons/fa";
import { FaPeopleCarryBox } from "react-icons/fa6";

export default function Aside() {
  return (
    <div className="flex px-4 py-2 flex-col h-screen w-[20rem] bg-white text-[#2d2d2d] border-r-1 border-[#999]">
      <h1 className="mt-4 pb-2 text-2xl border-b-1 border-[#999] ">
        Invsys Controller
      </h1>
      <ul className="flex flex-col mt-4 text-xl gap-2">
        <Link href={"/"}>
          <li className="flex gap-4 items-center">
            <FaHome />
            Visão geral
          </li>
        </Link>
        <Link href={"/suppliers"}>
          <li className="flex gap-4 items-center">
            <FaTruckLoading />
            Fornecedores
          </li>
        </Link>
        <Link href={"/products"}>
          <li className="flex gap-4 items-center">
            <FaBoxes />
            Produtos
          </li>
        </Link>
        <Link href={"/associations"}>
          <li className="flex gap-4 items-center">
            <FaPeopleCarryBox />
            Associações
          </li>
        </Link>
      </ul>
    </div>
  );
}
