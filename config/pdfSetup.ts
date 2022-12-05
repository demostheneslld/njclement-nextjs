import jsPDF, { jsPDFOptions } from "jspdf";
import { ContentRenderer } from "../types/pdf/ContentRenderer";
import { Cursor } from "../types/pdf/Cursor";
import { ExperienceItem } from "../types/pdf/ExperienceItem";

const pageWidth = 8.5;
const lineHeight = 1.2;
const margin = 0.5;
const fontSize = 12;
const ptsPerInch = 72;
const unit: jsPDFOptions["unit"] = 'in';

export const PDF_SETUP = {
  unit,
  pageWidth,
  lineHeight,
  margin,
  maxLineWidth: pageWidth - margin * 2,
  fontSize,
  ptsPerInch,
  oneLineHeight: (fontSize * lineHeight) / ptsPerInch,
}

type SpacerSize = 'line' | 'small' | 'medium' | 'large';

const addSpacer = (size: SpacerSize, cursor: Cursor) => {
  const multiplierMap: Record<SpacerSize, number> = {
    'line': 1,
    'small': .2,
    'medium': .5,
    'large': 2,
  };
  cursor.x = PDF_SETUP.margin;
  cursor.y += PDF_SETUP.oneLineHeight * multiplierMap[size];
  // console.log(`Adding Spacer: ${size}`)
}

const addText = (text: string, pdf: jsPDF, cursor: Cursor, options?: {
    align?: 'left' | 'center' | 'right',
    fontFace?: string,
    fontStyle?: string,
    fontSize?: number,
    goToNextLine?: boolean,
    minIndentText?: string,
    underline?: boolean,
  }) => {
  // Set up option defaults
  const align = options?.align || 'left';
  const fontFace = options?.fontFace || 'helvetica';
  const fontStyle = options?.fontStyle || 'normal';
  const fontSize = options?.fontSize || 10;
  const goToNextLine = options?.goToNextLine !== undefined ? options?.goToNextLine : true;
  const underline = options?.underline !== undefined ? options?.underline : false;
  const minIndentText = options?.minIndentText || '';
  // Calculations
  let offset = 0;
  if (align === 'center') offset = (PDF_SETUP.pageWidth / 2) - PDF_SETUP.margin;
  if (align === 'right') offset = PDF_SETUP.maxLineWidth;
  const startX = cursor.x;
  // docs for getStringUnitWidth:
  // Multiply by font size to get actual width in points Then divide by 72 to get inches or divide by (72/25.6) to get 'mm' etc.
  const textWidth = pdf.getStringUnitWidth(text + ' ') * fontSize / 72;
  let indent = 0;
  let textArray = [text];
  if (textWidth > PDF_SETUP.maxLineWidth) {
    // console.info(`★·.·\´¯\`·.·★ Splitting long text into lines ${text}`);
    textArray = pdf.splitTextToSize(text, PDF_SETUP.maxLineWidth);
  }
  textArray.forEach((textArrayItem: string, index: number) => {
    const textArrayItemWidth = pdf.getStringUnitWidth(textArrayItem + ' ') * fontSize / 72;
    // Remove Period at end of Text
    if (textArrayItem.endsWith('.')) textArrayItem = textArrayItem.slice(0, -1);
    // Add the Text
    pdf.setFont(fontFace, fontStyle).setFontSize(fontSize).text(textArrayItem, startX + offset + indent, cursor.y, null, align);
    if (underline) {
      pdf.setLineWidth(0.02);
      pdf.line(cursor.x, cursor.y + 0.02, cursor.x + textWidth, cursor.y + 0.02)
    }
    // console.log(`📖 Added Text "${textArrayItem}" @ (${cursor.x}, ${cursor.y}) with offset ${offset}`);
    // last item in array
    if (index + 1 === textArray.length) {
      let endX = startX + textArrayItemWidth;
      if (align === 'right') endX = startX - textWidth;
      cursor.x = endX;
      if (goToNextLine === true) addSpacer('line', cursor);
      indent = 0;
    } else {
      // not last item
      // console.log('🔜 Continuing with more lines...');
      addSpacer('line', cursor);
      const minIndentTextWidth = pdf.getStringUnitWidth(minIndentText) * fontSize / 72;
      indent = minIndentTextWidth;
    }
  });
}

export enum ContentRendererTypes {
  SPACER = 'SPACER',
  TEXT = 'TEXT',
  SECTION = 'SECTION',
  EXPERIENCE = 'EXPERIENCE',
  TITLE = 'TITLE',
};

export const ContentRenderers: Record<ContentRendererTypes, ContentRenderer> = {
  [ContentRendererTypes.SPACER]: (content: SpacerSize, pdf: jsPDF, cursor: Cursor) => {
    addSpacer(content, cursor);
  },
  [ContentRendererTypes.TEXT]: (content: string, pdf: jsPDF, cursor: Cursor) => {
    addText(content, pdf, cursor);
  },
  [ContentRendererTypes.SECTION]: (content: string, pdf: jsPDF, cursor: Cursor) => {
    addSpacer('small', cursor);
    addText(content.toLocaleUpperCase(), pdf, cursor, { fontStyle: 'bold', underline: true })
    pdf.setLineWidth(0.02); 
    addSpacer('small', cursor);
  },
  [ContentRendererTypes.EXPERIENCE]: (content: {title: string, subtitle?: string, description?: string, location?: string, dateRange?: string, items?: ExperienceItem[]}, pdf: jsPDF, cursor: Cursor) => {
    addText(content.title, pdf, cursor, { fontStyle: 'bold', goToNextLine: false });
    if (content.subtitle) addText(` — ${content.subtitle}`, pdf, cursor, { fontStyle: 'italic', goToNextLine: false});
    cursor.x = PDF_SETUP.margin;
    if (content.dateRange && content.location) {
      addText(content.dateRange, pdf, cursor, { goToNextLine: false,  align: 'right' });
      addText(`${content.location}:`, pdf, cursor, { fontStyle: 'italic', align: 'right' });
    } else {
      addSpacer('medium', cursor);
    }
    if (content.description) addText(content.description, pdf, cursor, { fontStyle: 'italic' });
    (content.items || []).forEach((item: ExperienceItem) => {
      if (item.visible) addText(`» ${item.content}`, pdf, cursor, { minIndentText: '» '});
    });
    addSpacer('medium', cursor);
  },
  [ContentRendererTypes.TITLE]: (
    content: { name: string, address: string, email: string, phone: string, summary?: string, website: string },
    pdf: jsPDF,
    cursor: Cursor,
  ) => {
    addText(content.name, pdf, cursor, { fontSize: 24, align: 'center' });
    addSpacer('medium', cursor);
    if (content.summary) addText(content.summary, pdf, cursor, { align: 'center', fontStyle: 'italic' });
    addText(content.address, pdf, cursor, { align: 'center' });
    addText(`${content.email} | ${content.website} | ${content.phone}`, pdf, cursor, { align: 'center' });
    addSpacer('medium', cursor);
  }
}