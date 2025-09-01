import { Link } from "react-router-dom";
import { GiFrenchFries } from "react-icons/gi";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-center">
      {}
      <ul className="cursor-pointer hidden sm:flex gap-10 text-sm p-3">
        <li className="hover:bg-gray-500">
          {" "}
          <Link to="/"> Início </Link>{" "}
        </li>
        <li className="hover:bg-gray-500">
          {" "}
          <Link to="/criar-curriculo"> Criar </Link>
        </li>
        <li className="hover:bg-gray-500">
          {" "}
          <Link to="/listar-curriculos"> Listar </Link>
        </li>
        <li className="hover:bg-gray-500">
          <Link to="/contatos"> Visualizar </Link>
        </li>
      </ul>
      {}
      <div className="sm:hidden fixed bottom-4 right-4 z-50">
        <button
          className="flex items-center gap-2 rounded-full hover:text-red-300 trasition bg-gray-900 p-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiFrenchFries className="w-8 h-8" />
        </button>
        {isOpen && (
          <ul className="absolute bg-gray-900 p-6 rounded-2xl right-0 bottom-18" 
          onClick={() => setIsOpen(false)}>
            <li className="p-1 hover:bg-gray-500  hover:text-red-300"> <Link to="/"> Início </Link> </li>
            <li className="p-1 hover:bg-gray-500  hover:text-red-300"> <Link to="/criar-curriculo"> Criar </Link> </li>
            <li className="p-1 hover:bg-gray-500  hover:text-red-300"> <Link to="/listar-curriculos"> Listar </Link> </li>
            <li className="p-1 hover:bg-gray-500  hover:text-red-300"> <Link to="/contatos"> Visualizar </Link> </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
