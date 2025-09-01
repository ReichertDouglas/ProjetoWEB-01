import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { MainPage } from "../pages/mainpage";
import { Header } from "../components/header"
import Footer from "../components/footer";

export const Router = () => {
  return (
    <BrowserRouter>
    <Header />
      <main className="bg-blue-400 min-h-screen min-w-screen">
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
