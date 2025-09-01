import { FaFileAlt, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
    const navigate = useNavigate();
    
    const handleForm = () => navigate('/form-cv');

    return (
        <div className="h-screen w-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center text-white px-4">
            <div className="bg-black/50 p-10 rounded-xl text-center max-w-2xl w-full">
                <FaFileAlt className="text-5xl text-cyan-400 animate-bounce mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                    Construa seu futuro profissional
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                    Cadastre seu currículo de forma rápida e atraente
                </p>
                <button className="bg-cyan-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-300 transition flex items-center justify-center gap-2 mx-auto" onClick={handleForm}>
                    Começar agora <FaArrowRight />
                </button>
            </div>
        </div>
    )
}