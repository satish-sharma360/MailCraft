const camelToKebab = (str) =>
  str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const styleToInline = (style = {}) => {
  return Object.entries(style || {})
    .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
    .join("; ");
};

// Process text content while preserving rich formatting and ensuring inline styles
const processTextContent = (element) => {
  if (!element.textarea) {
    return `<div style="${styleToInline(element.style || {})}"></div>`;
  }
  
  let content = element.textarea;
  
  // Remove placeholder text
  if (content.includes("Start typing here...")) {
    content = content.replace(/(<p>)?Start typing here...(<\/p>)?/gi, "").trim();
  }
  
  if (!content || content === "<br>" || content === "&nbsp;" || content.trim() === "") {
    return `<div style="${styleToInline(element.style || {})}"></div>`;
  }
  
  // Convert common tags into inline styles for email compatibility
  content = content
    .replace(/<strong>/g, '<span style="font-weight: bold;">')
    .replace(/<\/strong>/g, '</span>')
    .replace(/<b>/g, '<span style="font-weight: bold;">')
    .replace(/<\/b>/g, '</span>')
    .replace(/<em>/g, '<span style="font-style: italic;">')
    .replace(/<\/em>/g, '</span>')
    .replace(/<i>/g, '<span style="font-style: italic;">')
    .replace(/<\/i>/g, '</span>')
    .replace(/<u>/g, '<span style="text-decoration: underline;">')
    .replace(/<\/u>/g, '</span>')
    .replace(/<s>/g, '<span style="text-decoration: line-through;">')
    .replace(/<\/s>/g, '</span>')
    .replace(/<div><br><\/div>/g, '<br>')
    .replace(/<div>/g, '<p>')
    .replace(/<\/div>/g, '</p>')
    .replace(/<p><br><\/p>/g, '<br>')
    .replace(/^<br>/, '')
    .replace(/<br>$/, '');
  
  // Inline styles for paragraphs, lists, links
  content = content
    .replace(/<p>/g, '<p style="margin: 10px 0; line-height: 1.4;">')
    .replace(/<ul>/g, '<ul style="margin: 10px 0; padding-left: 20px; list-style-type: disc;">')
    .replace(/<ol>/g, '<ol style="margin: 10px 0; padding-left: 20px; list-style-type: decimal;">')
    .replace(/<li>/g, '<li style="margin-bottom: 5px; line-height: 1.4;">')
    .replace(/<a\s+href="([^"]*)"([^>]*)>/g, '<a href="$1" style="color: #007bff; text-decoration: underline;"$2>')
    .replace(/<a\s+href="([^"]*)"([^>]*)\s+target="_blank"([^>]*)>/g, '<a href="$1" target="_blank" style="color: #007bff; text-decoration: underline;"$2$3>');
  
  const defaultTextStyles = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    color: '#333333',
    margin: '0',
    padding: '0',
  };
  
  const mergedStyles = { ...defaultTextStyles, ...(element.style || {}) };
  const finalContainerStyle = styleToInline(mergedStyles);
  
  return `<div style="${finalContainerStyle}">${content}</div>`;
};

const elementToHTML = (element) => {
  if (!element) return "";

  const style = styleToInline(element.style || {});

  switch (element.type) {
    case "Text":
      return processTextContent(element);
    
    case "Button":
      const outerStyle = styleToInline(element.outerStyle || {});
      const buttonContent = element.content || "Button";
      
      if (element.url) {
        return `<div style="${outerStyle}">
          <a href="${element.url}" target="_blank" style="text-decoration: none;">
            <button style="${style}">${buttonContent}</button>
          </a>
        </div>`;
      } else {
        return `<div style="${outerStyle}">
          <button style="${style}">${buttonContent}</button>
        </div>`;
      }
    
    case "Image":
    case "Logo":
    case "LogoHeader":
      const imgSrc = element.imageUrl || "";
      const imgAlt = element.alt || "";
      
      if (element.url) {
        return `<a href="${element.url}" target="_blank">
          <img src="${imgSrc}" alt="${imgAlt}" style="${style}" />
        </a>`;
      } else {
        return `<img src="${imgSrc}" alt="${imgAlt}" style="${style}" />`;
      }
    
    case "Divider":
      return `<hr style="${style}" />`;
    
    case "SocialIcons":
      if (!element.socialIcons || element.socialIcons.length === 0) {
        return `<div style="${style}"></div>`;
      }
      
      const socialIconsHTML = element.socialIcons.map(icon => 
        `<a href="${icon.url || '#'}" style="margin-right: 8px; display: inline-block;" target="_blank">
          <img src="${icon.icon}" style="height: 24px; width: 24px; display: block;" alt="Social Icon" />
        </a>`
      ).join("");
      
      return `<div style="${style}">${socialIconsHTML}</div>`;
    
    default:
      return `<div style="${style}">${element.content || ""}</div>`;
  }
};

const columnToHTML = (layout) => {
  if (!layout) return "";

  const columnWidths = layout.columnWidths || Array(layout.numOfCol).fill(100 / layout.numOfCol);

  const columnsHTML = Array.from({ length: layout.numOfCol }).map((_, colIndex) => {
    const rowElements = Object.keys(layout)
      .filter(key => key.startsWith(`col_${colIndex}_row_`))
      .sort((a, b) => {
        const rowA = parseInt(a.split('_')[3]);
        const rowB = parseInt(b.split('_')[3]);
        return rowA - rowB;
      })
      .map(key => layout[key])
      .filter(element => element)
      .map(element => elementToHTML(element))
      .filter(html => html.trim())
      .join("");

    const colStyle = styleToInline({
      display: "flex",
      flexDirection: "column",
      gap: layout.verticalGap || "10px",
      width: `${columnWidths[colIndex]}%`,
      padding: layout.padding || "0px",
      boxSizing: "border-box",
    });

    return `<div style="${colStyle}">${rowElements}</div>`;
  }).join("");

  const containerStyle = styleToInline({
    display: "flex",
    gap: layout.gap || "0px",
    backgroundColor: layout.backgroundColor || "transparent",
    borderRadius: layout.borderRadius || "0px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "20px",
  });

  return `<div style="${containerStyle}">${columnsHTML}</div>`;
};

export const generateCanvasHTML = (emailTemplate) => {
  if (!emailTemplate || emailTemplate.length === 0) {
    return `<div style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; color: #333333;"><div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px;"><p style="margin: 10px 0; line-height: 1.4;">No content to display</p></div></div>`;
  }

  const emailHTML = emailTemplate
    .filter(column => column)
    .map(column => columnToHTML(column))
    .filter(html => html.trim())
    .join("");

  return `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.4; color: #333333; background-color: #f5f5f5; margin: 0; padding: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;"><div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">${emailHTML || '<p style="margin: 10px 0; line-height: 1.4;">No content available</p>'}</div></div>`;
};

export const generateCleanHTML = (emailTemplate) => {
  if (!emailTemplate || emailTemplate.length === 0) {
    return '<p style="margin: 10px 0; line-height: 1.4; font-family: Arial, Helvetica, sans-serif; color: #333333;">No content to display</p>';
  }

  return emailTemplate
    .filter(column => column)
    .map(column => columnToHTML(column))
    .filter(html => html.trim())
    .join("");
};

// ✅ New boilerplate generator (safe for Gmail, Outlook, Apple Mail, etc.)
export const generateEmailBoilerplate = (emailTemplate) => {
  const bodyContent = generateCanvasHTML(emailTemplate);

  return `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>Email</title>
      <style>
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; font-family: Arial, Helvetica, sans-serif; }
        table { border-collapse: collapse !important; }
      </style>
    </head>
    <body style="margin:0; padding:0;">
      ${bodyContent}
    </body>
  </html>
  `;
};

export const getTextContent = (htmlString) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || '';
};
