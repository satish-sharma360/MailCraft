import { useEffect, useState, createContext } from "react";

export const EmailTemplateContext = createContext();

export const EmailTemplateProvider = ({ children }) => {
  const [emailTemplate, setEmailTemplate] = useState(() => {
    // Load initial value from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("emailTemplate");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  return (
    <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
      {children}
    </EmailTemplateContext.Provider>
  );
};
