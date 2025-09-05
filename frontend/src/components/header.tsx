import React, { Suspense } from "react";

const Nav = React.lazy(() => import("./nav"));

export const Header = () => {
    return (
    <header className="bg-blue-950 text-white p-0 m-0">
      <div className="flex justify-between items-center px-6 py-4 ">
        <div className="text-2xl font-extrabold border-1 rounded-full px-4">
          CV Builder
        </div>
      </div>
      <div>
        <Suspense fallback={<div> Carregando .... </div>}>
            <Nav />
        </Suspense>
      </div>
    </header>
  );
}