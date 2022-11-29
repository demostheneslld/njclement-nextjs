import React, { useCallback, useEffect } from "react";
import { jsPDF } from "jspdf";
import { ContentRenderer } from "../types/pdf/ContentRenderer";
import { ContentItem } from "../types/pdf/ContentItem";
import { PDF_SETUP } from "../config/pdfSetup";

type props = {

  items?: ContentItem[];

};

const GeneratePdf: React.FC<props> = ({ items }) => {
  const generatePdf = useCallback(() => {
    const pdf = new jsPDF({
      unit: PDF_SETUP.unit,
    });
    console.log(pdf.getFontList());
    let cursor = { x: PDF_SETUP.margin, y: PDF_SETUP.margin }
    items.forEach((item) => {
      item.renderer(item.content, pdf, cursor);
    });
    const pdfString = pdf.output("datauristring", {filename: `Clement_Resume_FULL_${new Date().toISOString().substring(0, 10)}`});
    (document.getElementById('pdf_preview') as HTMLIFrameElement).src = pdfString;
  }, [items]);

  useEffect(() => { generatePdf() }, [generatePdf]);

  return (
    <div className="flex flex-col gap-2">
      <button className='p-2 bg-gray-100 hover:bg-primary-200 rounded' onClick={generatePdf}>
        Update PDF
      </button>
      <iframe id="pdf_preview" itemType="application/pdf" src="" width="800" height="745"></iframe>
    </div>
  );
};

export default GeneratePdf;