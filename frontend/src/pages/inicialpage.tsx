import React from 'react';
import { FaFileAlt, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UltimosAdicionados = React.lazy(() => import("../components/ultimosadicionados"));
const Dashboard = React.lazy(() => import("../components/dashboard"));

export default function InicialPage() {
    const navigate = useNavigate();
    const handleForm = () => navigate('/criar-curriculo');

    return (
        <div className='flex flex-col items-center min-h-screen break-words text-white p-8 gap-8 md:px-30 md:py-15'>
            <div className='shadow-md w-full min-h-fit'>
                <div className="bg-black/50 p-10 rounded-xl text-center">
                    <FaFileAlt className="text-5xl text-cyan-400 animate-bounce mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                        Construa seu futuro profissional
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">
                        Cadastre seu currículo de forma rápida e atraente
                    </p>
                    <button className="cursor-pointer bg-cyan-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-300 transition flex items-center justify-center gap-2 mx-auto" onClick={handleForm}>
                        Criar Meu Currículo <FaArrowRight />
                    </button>
                </div>
            </div>
            <div className='w-full'>
                <UltimosAdicionados/>
            </div>
            <div className='w-full'>
                <Dashboard/>
            </div>
        </div>
    )
}