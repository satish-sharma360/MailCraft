const camelToKebab = (str) =>
  str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const styleToInline = (style = {}) => {
  return Object.entries(style || {})
    .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
    .join("; ");
};

const elementToHTML = (element) => {
  if (!element) return "";

  const style = styleToInline(element.style || {});

  switch (element.type) {
    case "Text":
      return `<div style="${style}">${element.textarea || ""}</div>`;
    case "Button":
      const outerStyle = styleToInline(element.outerStyle || {});
      return `<div style="${outerStyle}"><button style="${style}">${element.content || "Button"}</button></div>`;
    case "Image":
    case "Logo":
    case "LogoHeader":
      return `<img src="${element.imageUrl}" alt="${element.alt || ""}" style="${style}" />`;
    case "Divider":
      return `<hr style="${style}" />`;
    case "SocialIcons":
      return `<div style="${style}">${element.socialIcons?.map(icon => `<a href="${icon.url}" style="margin-right:5px;"><img src="${icon.icon}" style="height:24px;width:24px;" /></a>`).join("")}</div>`;
    default:
      return `<div style="${style}">${element.content || ""}</div>`;
  }
};

const columnToHTML = (layout) => {
  if (!layout) return "";

  const columnWidths = layout.columnWidths || Array(layout.numOfCol).fill(100 / layout.numOfCol);

  const columnsHTML = Array.from({ length: layout.numOfCol }).map((_, colIndex) => {
    const rowsHTML = Object.keys(layout)
      .filter(key => key.startsWith(`col_${colIndex}_row_`))
      .sort()
      .map(key => elementToHTML(layout[key]))
      .join("");

    const colStyle = styleToInline({
      display: "flex",
      flexDirection: "column",
      gap: layout.verticalGap || "10px",
      width: `${columnWidths[colIndex]}%`,
      padding: layout.padding || "0px",
      boxSizing: "border-box",
    });

    return `<div style="${colStyle}">${rowsHTML}</div>`;
  }).join("");

  const containerStyle = styleToInline({
    display: "flex",
    gap: layout.gap || "0px",
    backgroundColor: layout.backgroundColor || "transparent",
    borderRadius: layout.borderRadius || "0px",
    width: "100%",
    boxSizing: "border-box",
  });

  return `<div style="${containerStyle}">${columnsHTML}</div>`;
};

export const generateCanvasHTML = (emailTemplate) => {
  return emailTemplate.map(column => columnToHTML(column)).join("\n");
  
};