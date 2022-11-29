import jsPDF from "jspdf";
import dynamic from "next/dynamic";
import React from "react";
import { PDF_SETUP } from "../config/pdfSetup";
import { ContentItem } from "../types/pdf/ContentItem";
import { ContentRenderer } from "../types/pdf/ContentRenderer";
import { Cursor } from "../types/pdf/Cursor";

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
}

const addText = (text: string, pdf: jsPDF, cursor: Cursor, options?: {
    align?: 'left' | 'center' | 'right',
    fontFace?: string,
    fontStyle?: string,
    fontSize?: number,
    goToNextLine?: boolean
  }) => {
  // Set up option defaults
  const align = options?.align || 'left';
  const fontFace = options?.fontFace || 'helvetica';
  const fontStyle = options?.fontStyle || 'normal';
  const fontSize = options?.fontSize || 12;
  const goToNextLine = options?.goToNextLine !== undefined ? options?.goToNextLine : true;
  // Calculations
  let offset = 0;
  if (align === 'center') offset = (PDF_SETUP.pageWidth / 2) - PDF_SETUP.margin;
  const startX = cursor.x;
  const textWidth = pdf.getStringUnitWidth(text) * fontSize;
  const endX = startX + textWidth;
  pdf.setFont(fontFace, fontStyle).setFontSize(fontSize).text(text, startX + offset, cursor.y, null, null, align);
  console.log(`Added Text ${text}`)
  cursor.x = endX;
  if (goToNextLine === true) addSpacer('line', cursor);
  console.log(`Cursor: ${JSON.stringify(cursor)}`)
}

const ContentRenderers: Record<string, ContentRenderer> = {
  spacer: (content: SpacerSize, pdf: jsPDF, cursor: Cursor) => {
    addSpacer(content, cursor);
  },
  text: (content: string, pdf: jsPDF, cursor: Cursor) => {
    addText(content, pdf, cursor);
  },
  section: (content: string, pdf: jsPDF, cursor: Cursor) => {
    addSpacer('small', cursor);
    addText(content, pdf, cursor, { fontStyle: 'bold', fontSize: 10 })
    addSpacer('small', cursor);
  },
  experience: (content: {title: string, subtitle: string, location: string, dateRange: string}, pdf: jsPDF, cursor: Cursor) => {
    addText(content.title, pdf, cursor, { fontStyle: 'bold', goToNextLine: false });
    addText(content.subtitle, pdf, cursor, { fontStyle: 'italic', goToNextLine: false });
    addText(content.location, pdf, cursor, { fontStyle: 'bold', goToNextLine: false });
    addText(content.dateRange, pdf, cursor, { fontStyle: 'bold' });
  },
  title: (
    content: { name: string, address: string, email: string, phone: string },
    pdf: jsPDF,
    cursor: Cursor,
  ) => {
    addText(content.name, pdf, cursor, { fontSize: 24, align: 'center' })
    addSpacer('medium', cursor);
    addText(content.address, pdf, cursor, { align: 'center' })
    addText(`${content.email} | ${content.phone}`, pdf, cursor, { align: 'center' })
    addSpacer('medium', cursor);
  }
}

const GeneratePDF = dynamic(()=>import("../components/generatePdf"),{ssr:false});
const app =()=>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = React.useRef();
        const items: ContentItem[] = [
          { content: {
            name: 'Nathaniel J. Clement',
            email: 'resume@njclement.com',
            address: 'Portland, OR | Remote + Hybrid friendly',
            phone: '503.577.6651',
          }, renderer: ContentRenderers.title },
          { content: 'EDUCATION', renderer: ContentRenderers.section },
          { content: {
            title: 'Harvard University',
            subtitle: 'A.B. in Government and Psychology: 3.56/4.00 GPA.',
            location: 'Cambridge, MA',
            dateRange: '2014',
          }, renderer: ContentRenderers.experience },
          { content: 'RELEVANT EXPERIENCES', renderer: ContentRenderers.section },
        ];

        return(<div className="main">
        <div>Resume</div>
        <GeneratePDF items={items}/>
        </div>);
}

export default app;