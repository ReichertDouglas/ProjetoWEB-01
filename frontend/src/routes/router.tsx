import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { Header } from "../components/header"
import Footer from "../components/footer";
import { CriarCurriculoPage } from "../pages/criarcurriculopage";
import React from "react";

const InicialPage = React.lazy(() => import("../pages/inicialpage"));
const ListarCurriculosPage = React.lazy(() => import("../pages/listarcurriculospage"));
const Curriculo = React.lazy(() => import("../pages/curriculo/[id]/curriculo"));
const EditarCurriculoPage = React.lazy(() => import("../pages/editarcurriculopage"));

export const Router = () => {
  return (
    <BrowserRouter>
    <Header />
      <main className="bg-blue-400 min-h-screen min-w-screen flex-grow py-12">
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<InicialPage />} />
            <Route path="/criar-curriculo" element={<CriarCurriculoPage />} />
            <Route path="/visualizar-curriculos" element={<ListarCurriculosPage />} />
            <Route path="/curriculo/:id" element={<Curriculo />} />
            <Route path="/editar-curriculo/:id" element={<EditarCurriculoPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
