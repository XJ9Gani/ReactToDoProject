import { BrowserRouter } from "react-router-dom";
import { Header, AppRouter } from "./components";
import "./style/style.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <AppRouter />
      </BrowserRouter>
    </>
  );
}
