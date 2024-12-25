import "./App.css";
import { Toaster } from "react-hot-toast";

import AppRoute from "./Pages/Route/AppRoute";

function App() {
  return (
    <>
      <AppRoute />
      <Toaster />
    </>
  );
}

export default App;
