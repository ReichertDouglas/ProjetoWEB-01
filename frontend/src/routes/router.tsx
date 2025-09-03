import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { Header } from "../components/header"
import Footer from "../components/footer";
import React from "react";

const InicialPage = React.lazy(() => import("../pages/inicialpage"));
const ListarCurriculosPage = React.lazy(() => import("../pages/listarcurriculospage"));
const Curriculo = React.lazy(() => import("../pages/curriculo/[id]/curriculo"));
const FormularioCurriculoPage = React.lazy(() => import("../pages/formularioCurriculoPage"));

export const Router = () => {
  return (
    <BrowserRouter>
    <Header />
      <main className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
        <Suspense fallback={<div>Carregando...</div>}>
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
