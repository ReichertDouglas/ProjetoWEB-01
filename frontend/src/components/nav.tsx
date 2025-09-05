import { Link } from "react-router-dom";
import { GiFrenchFries } from "react-icons/gi";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const CRIAR_CURRICULO = "/criar-curriculo";
  const VISUALIZAR_CURRICULO = "/visualizar-curriculos";

  return (
    <nav className="flex justify-center p-0 m-0">
      <ul className="cursor-pointer hidden sm:flex text-md font-semibold p-0">
        <li className="hover:bg-gradient-to-t from-blue-700 via-blue-950 to-blue-950 pb-2 px-8"><Link to="/"> Início </Link></li>
        <li className="hover:bg-gradient-to-t from-blue-700 via-blue-950 to-blue-950 pb-2 px-8"><Link to={CRIAR_CURRICULO}> Criar </Link></li>
        <li className="hover:bg-gradient-to-t from-blue-700 via-blue-950 to-blue-950 pb-2 px-8"><Link to={VISUALIZAR_CURRICULO}> Visualizar currículos </Link></li>
      </ul>
      <div className="sm:hidden fixed bottom-4 right-4 z-50">
        <button
          className="flex items-center gap-2 rounded-full hover:text-red-300 trasition bg-gray-900 p-4"
          onClick={() => setIsOpen(!isOpen)}>
          <GiFrenchFries className="w-8 h-8" />
        </button>
        {isOpen && (
          <ul className="absolute bg-gray-900 p-6 rounded-2xl right-0 bottom-18" 
          onClick={() => setIsOpen(false)}>
            <li className="p-1 hover:scale-101  hover:text-red-300 rounded"> <Link to="/"> Início </Link> </li>
            <li className="p-1 hover:scale-101  hover:text-red-300 rounded"> <Link to={CRIAR_CURRICULO}> Criar </Link> </li>
            <li className="p-1 hover:scale-101  hover:text-red-300 rounded"> <Link to={VISUALIZAR_CURRICULO}> Visualizar currículos </Link> </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
