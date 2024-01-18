import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";

function App() {
  const clearLocalStorageOnUnload = () => {
    let session = sessionStorage.getItem("register");
    if (session === null) {
      localStorage.removeItem("key");
    }
    sessionStorage.setItem("register", 1);
  };
  // window// Add event listener when the component mounts
  window.addEventListener("beforeunload", clearLocalStorageOnUnload);

  // Remove event listener when the component unmounts
  // return () => {
  //   window.removeEventListener("beforeunload", clearLocalStorageOnUnload);
  // };

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
