import { useEffect, useState } from "react";

export default function useTheme() {
  const [state, setState] = useState(localStorage.getItem("state") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", state);
    localStorage.setItem("state", state);
  }, [state]);

  const toggleTheme = () => {
    const nextState = state === "light" ? "dark" : "light";
    localStorage.setItem("state", nextState);
    setState(nextState);
  };

  return [state, toggleTheme];
}
