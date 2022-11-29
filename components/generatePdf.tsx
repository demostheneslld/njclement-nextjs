import React from "react";
import { jsPDF } from "jspdf";
import { ContentRenderer } from "../types/pdf/ContentRenderer";
import { ContentItem } from "../types/pdf/ContentItem";

type props = {

  items?: ContentItem[];

};

const GeneratePdf: React.FC<props> = ({ items }) => {
  const generatePdf = () => {
      const pdf = new jsPDF();
      let cursor = { x: 0, y: 5 }
      items.forEach((item) => {
        item.renderer(item.content, pdf, cursor);
      });
      const pdfString = pdf.output("datauristring", {filename: `Clement_Resume_FULL_${new Date().toISOString().substring(0, 10)}`});
      (document.getElementById('pdf_preview') as HTMLIFrameElement).src = pdfString;

  };

  return (
    <div className="flex gap-2">
      <button className='p-2 bg-gray-100 hover:bg-primary-200 rounded' onClick={generatePdf}>
        Get PDF as text
      </button>
      <iframe id="pdf_preview" type="application/pdf" src="" width="800" height="400"></iframe>
    </div>

  );
};

export default GeneratePdf;