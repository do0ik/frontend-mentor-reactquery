import { Route, Routes } from "react-router-dom";

import Advice from "./pages/Advice";

function App() {
  return (
      <Routes>
        <Route path="/">
          <Route index element={<Advice />} />
        </Route>
      </Routes>
  );
}

export default App;
