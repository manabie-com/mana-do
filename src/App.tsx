import React, { Suspense } from "react";

import { Routes } from "./Routes";
function App() {
  return (
    <main className="page-container">
      <Suspense fallback={() => <h1>Loading...</h1>}>
        <Routes />
      </Suspense>
    </main>
  );
}

export default App;
