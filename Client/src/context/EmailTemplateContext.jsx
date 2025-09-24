import { useEffect, useState, createContext, useContext } from "react";
import { SelectedElement } from "./SelectedElement";

export const EmailTemplateContext = createContext();

export const EmailTemplateProvider = ({ children }) => {
  const { selectedElement } = useContext(SelectedElement); // ✅ correct
  const [emailTemplate, setEmailTemplate] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("emailTemplate");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  // Update template when selected element changes
  useEffect(() => {
  if (!selectedElement || !emailTemplate?.length) return;

  const updatedEmailTemplate = emailTemplate.map((item) =>
    item.id === selectedElement.layout?.id ? selectedElement.layout : item
  );

  // Only update state if something actually changed
  const isDifferent = updatedEmailTemplate.some(
    (item, index) => item !== emailTemplate[index]
  );

  if (isDifferent) {
    setEmailTemplate(updatedEmailTemplate);
  }
}, [selectedElement, emailTemplate]);


  return (
    <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
      {children}
    </EmailTemplateContext.Provider>
  );
};
