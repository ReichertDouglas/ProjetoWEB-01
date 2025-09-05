import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

import { Header } from "../components/header"
import Footer from "../components/footer";
import React from "react";
import { ClipLoader } from "react-spinners";

const InicialPage = React.lazy(() => import("../pages/inicialpage"));
const ListarCurriculosPage = React.lazy(() => import("../pages/listarcurriculospage"));
const Curriculo = React.lazy(() => import("../pages/curriculo/[id]/curriculo"));
const FormularioCurriculoPage = React.lazy(() => import("../pages/formularioCurriculoPage"));

export const Router = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 min-h-screen max-w-full">
        <Suspense 
          fallback={
            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
              <ClipLoader
                loading={loading}
                color="#ffffff"
                size={50}
                speedMultiplier={0.8}
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<InicialPage />} />
            <Route path="/visualizar-curriculos" element={<ListarCurriculosPage />} />
            <Route path="/curriculo/:id" element={<Curriculo />} />
            <Route path="/criar-curriculo" element={<FormularioCurriculoPage />} />
            <Route path="/editar-curriculo/:id" element={<FormularioCurriculoPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
};