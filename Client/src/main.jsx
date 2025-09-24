import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import DragDropLayoutElementProvider from "./context/DragDropLayoutElement.jsx";
import { EmailTemplateProvider } from "./context/EmailTemplateContext.jsx";
import { SelectedElementProvider } from "./context/SelectedElement.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <DragDropLayoutElementProvider>
        <SelectedElementProvider>
          <EmailTemplateProvider>
            <App />
          </EmailTemplateProvider>
        </SelectedElementProvider>
      </DragDropLayoutElementProvider>
    </AuthProvider>
  </BrowserRouter>
);
