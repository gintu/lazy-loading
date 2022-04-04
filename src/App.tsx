import React from "react";

import Header from "./components/header/Header";
import ImageGrid from "./features/imageGrid/ImageGrid";

function App() {
  return (
    <>
      <Header search="Romantic comedy" />
      <ImageGrid />
    </>
  );
}

export default App;
