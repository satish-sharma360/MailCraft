import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import DragDropLayoutElementProvider from "./context/DragDropLayoutElement.jsx";
import EmailTemplateContextProvider from "./context/EmailTemplateContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <DragDropLayoutElementProvider>
        <EmailTemplateContextProvider>
          <App />
        </EmailTemplateContextProvider>
      </DragDropLayoutElementProvider>
    </AuthProvider>
  </BrowserRouter>
);
