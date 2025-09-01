import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { MainPage } from "../pages/mainpage";
import { Header } from "../components/header"
import Footer from "../components/footer";
import { FormPage } from "../pages/formpage";

export const Router = () => {
  return (
    <BrowserRouter>
    <Header />
      <main className="bg-blue-400 min-h-screen min-w-screen">
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/form-cv" element={<FormPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
