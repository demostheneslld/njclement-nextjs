import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { ContentItem } from "../types/pdf/ContentItem";
import { ContentRenderers, PDF_SETUP } from "../config/pdfSetup";

type props = {

  currentItems?: ContentItem[];
  isPendingUpdates?: boolean;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;

};

const GeneratePdf: React.FC<props> = ({ currentItems, isPendingUpdates, errorMessage, setErrorMessage }) => {

  const [pdfDataUri, setPdfDataUri] = useState<string>();

  const generatePdf = useCallback(() => {
    try {
      const pdf = new jsPDF({
        unit: PDF_SETUP.unit,
      });
      const filename = `Clement_Resume_${new Date().toISOString().substring(0, 10)}`;
      pdf.setProperties({ title: filename})
      // console.log(pdf.getFontList());
      let cursor = { x: PDF_SETUP.margin, y: PDF_SETUP.margin };
      if (currentItems) {
        const items = currentItems;
        items.forEach((item) => {
          if (item.isVisible) ContentRenderers[item.rendererKey](item.content, pdf, cursor);
        });
        setPdfDataUri(pdf.output("datauristring", {filename: filename}));
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  }, [currentItems, setErrorMessage]);

  useEffect(() => { generatePdf() }, [generatePdf]);

  return (
    
    <div className="flex flex-col gap-2">
      { 
        isPendingUpdates === false && !errorMessage &&
        <object className='rounded' data={pdfDataUri} type="application/pdf" width="800" height="745"></object>
      }
      { 
        (isPendingUpdates || errorMessage) &&
        <div className='transition-all bg-gray-200 rounded flex items-center' style={{
          width: 800, height: 745
        }}>
          <div className='m-auto text-center'>
            <div className='text-bad-500'>{(!isPendingUpdates && errorMessage) ? 'Something went wrong generating this PDF!' : ''}</div>
            <div className='text-sm text-gray-500 font-mono'>{(!isPendingUpdates && errorMessage) ? errorMessage : 'Pending Updates...'}</div>
          </div> 
        </div>
      }
    </div>
  );
};

export default GeneratePdf;