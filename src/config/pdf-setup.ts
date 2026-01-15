import type { ExperienceContent, SectionContent, TitleContent } from "@/types/pdf/ContentItem";
import type { ContentRenderer } from "@/types/pdf/ContentRenderer";
import type { Cursor } from "@/types/pdf/Cursor";
import type { ExperienceItem } from "@/types/pdf/ExperienceItem";
import type { SpacerContent, SpacerSize } from "@/types/pdf/Spacer";
import type { jsPDF, jsPDFOptions } from "jspdf";

const pageWidth = 8.4;
const lineHeight = 1.1;
const margin = 0.5;
const fontSize = 12;
const ptsPerInch = 72;
const unit: jsPDFOptions["unit"] = "in";

export const PDF_SETUP = {
  unit,
  pageWidth,
  lineHeight,
  margin,
  maxLineWidth: pageWidth - (margin * 2),
  fontSize,
  ptsPerInch,
  oneLineHeight: (fontSize * lineHeight) / ptsPerInch,
};

const addSpacer = (size: SpacerSize | number, cursor: Cursor) => {
  const multiplierMap: Record<SpacerSize, number> = {
    line: 1,
    small: 0.2,
    medium: 0.5,
    large: 2,
  };
  cursor.x = PDF_SETUP.margin;
  if (typeof size === "number") {
    cursor.y += PDF_SETUP.oneLineHeight * size;
  } else {
    cursor.y += PDF_SETUP.oneLineHeight * multiplierMap[size];
  }
  // console.log(`Adding Spacer: ${size}`)
};

const addText = (
  text: string,
  pdf: jsPDF,
  cursor: Cursor,
  options?: {
    align?: "left" | "center" | "right";
    fontFace?: string;
    fontStyle?: string;
    fontSize?: number;
    minIndentText?: string;
    underline?: boolean;
  }
) => {
  // Destructure options with default values
  const {
    align = "left",
    fontFace = "helvetica",
    fontStyle = "normal",
    fontSize = 10,
    underline = false,
    minIndentText = " ",
  } = options || {};

  // Set font settings
  pdf.setFont(fontFace, fontStyle).setFontSize(fontSize);

  // Calculate the maximum line width
  const maxWidth = PDF_SETUP.maxLineWidth - (align === "left" ? cursor.x : 0);
  const minX = PDF_SETUP.margin;
  const maxX = PDF_SETUP.pageWidth - (PDF_SETUP.margin * 2);

  // Split the text into lines that fit within the maximum width
  const textLines: string[] = pdf.splitTextToSize(text, maxWidth);

  // Iterate over each line and add it to the PDF
  textLines.forEach((line, index) => {
    // Remove period at the end of the line if present
    if (line.endsWith(".")) {
      line = line.slice(0, -1);
    }

    // Calculate the text width
    const textWidth = pdf.getTextWidth(line);

    // Adjust cursor.x based on alignment
    if (align === "center") {
      cursor.x = (PDF_SETUP.pageWidth - textWidth) / 2;
    } else if (align === "right") {
      const distanceBeyondMaxX = cursor.x - maxX;
      console.log("RIGHT ALIGNMENT", `cursor.x: ${cursor.x}`, `maxX: ${maxX}`, `textWidth: ${textWidth}`, `Distance beyond maxX: ${distanceBeyondMaxX}`);
      if (cursor.x <= minX) {
        cursor.x = maxX - textWidth;
      } else {
        cursor.x -= (textWidth + pdf.getTextWidth(" "));
      }
    }

    // Add the text line to the PDF
    pdf.text(line, cursor.x, cursor.y);

    // Underline the text if the option is enabled
    if (underline) {
      pdf.setLineWidth(0.01);
      pdf.line(
        cursor.x,
        cursor.y + 0.02,
        cursor.x + textWidth,
        cursor.y + 0.02
      );
    }

    console.log(
      `📖 Added Text "${line}" @ (${cursor.x}, ${cursor.y}) with alignment ${align}`
    );

    // Update cursor positions
    if (index < textLines.length - 1) {
      // Move to next line
      addSpacer("line", cursor);

      // Apply minimum indent if specified
      if (minIndentText) {
        const indentWidth = pdf.getTextWidth(minIndentText);
        cursor.x = minX + indentWidth;
      } else {
        cursor.x = minX;
      }
    } else {
      // Adjust cursor.x based on width of text that has been added
      if (align === "right") {
        // No need to adjust cursor.x for right alignment
      } else {
        cursor.x += textWidth;
      }
    }
  });
};

export enum ContentRendererTypes {
  SPACER = "SPACER",
  // TEXT = "TEXT",
  SECTION = "SECTION",
  EXPERIENCE = "EXPERIENCE",
  TITLE = "TITLE",
}

export const ContentRenderers: Record<ContentRendererTypes, ContentRenderer> = {
  [ContentRendererTypes.SPACER]: (
    content: SpacerContent,
    pdf: jsPDF,
    cursor: Cursor
  ) => {
    addSpacer(content.size, cursor);
  },
  // [ContentRendererTypes.TEXT]: (
  //   content: string,
  //   pdf: jsPDF,
  //   cursor: Cursor
  // ) => {
  //   addText(content, pdf, cursor);
  // },
  [ContentRendererTypes.SECTION]: (
    content: SectionContent,
    pdf: jsPDF,
    cursor: Cursor
  ) => {
    addSpacer(1.1, cursor);
    addText(content?.title?.toLocaleUpperCase(), pdf, cursor, {
      fontStyle: "bold",
      underline: true,
    });
    pdf.setLineWidth(0.02);
    addSpacer(1.5, cursor);
  },
  [ContentRendererTypes.EXPERIENCE]: (
    content: ExperienceContent,
    pdf: jsPDF,
    cursor: Cursor
  ) => {
    if (content.title) {
      addText(content.title, pdf, cursor, {
        fontStyle: "bold",
      });
    }

    if (content.subtitle) {
      let prepend = "";
      if (content.title) {
        prepend = " — ";
        
      }
      addText(`${prepend}${content.subtitle}`, pdf, cursor, {
        fontStyle: "italic",
        });
    }
    
    if (content.dateRange && content.location) {
      cursor.x = 0;
      addText(content.dateRange, pdf, cursor, {
        align: "right",
      });
      addText(`${content.location}:`, pdf, cursor, {
        fontStyle: "italic",
        align: "right",
      });
      addSpacer("line", cursor);
    }

    if (content.description) {
      addText(content.description, pdf, cursor, { fontStyle: "italic" });
      addSpacer("line", cursor);
      (content.items || []).forEach((item: ExperienceItem) => {
        if (item.visible) {
          addText(`» ${item.content}`, pdf, cursor, { minIndentText: "» " });
          addSpacer("line", cursor);
        }
      });
    }
    addSpacer("line", cursor);
  },
  [ContentRendererTypes.TITLE]: (
    content: TitleContent,
    pdf: jsPDF,
    cursor: Cursor
  ) => {
    addSpacer("large", cursor);
    addText(content.name, pdf, cursor, { fontSize: 24, align: "center" });
    addSpacer("large", cursor);
    addText(content.summary, pdf, cursor, { fontStyle: "italic", align: "center" });
    addSpacer("line", cursor);
    if (content.address) {
      addText(content.address, pdf, cursor, { align: "center" });
      addSpacer("line", cursor);
    }
    addText(
      `${content.email} | ${content.website} | ${content.phone}`,
      pdf,
      cursor,
      { align: "center" }
    );
    addSpacer("large", cursor);
  },
};
