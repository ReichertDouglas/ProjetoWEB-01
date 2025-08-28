import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import { MainPage } from "../pages/mainpage";
import { Register } from "../pages/register";
import { Visualize } from "../pages/visualize";
import { List } from "../pages/list";

export const Router = () => {
  return (
    <BrowserRouter>
      <main className="bg-blue-400 min-h-screen min-w-screen">
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/visualize" element={<Visualize />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};
