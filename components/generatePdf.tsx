import React, { useCallback, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { ContentItem } from "../types/pdf/ContentItem";
import { ContentRenderers, PDF_SETUP } from "../config/pdfSetup";

type props = {

  currentItems?: ContentItem[];
  isPendingUpdates?: boolean;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  exportTrigger?: number;

};

const fileName = `Clement_Resume_${new Date().toISOString().substring(0, 10)}`;

const GeneratePdf: React.FC<props> = ({ exportTrigger, currentItems, isPendingUpdates, errorMessage, setErrorMessage }) => {

  const [pdfDataUri, setPdfDataUri] = useState<string>();

  const buildPdf = useCallback((): jsPDF => {
    const pdf = new jsPDF({
      unit: PDF_SETUP.unit,
    });
    pdf.setProperties({ title: fileName})
    console.log(pdf.getFontList());
    let cursor = { x: PDF_SETUP.margin, y: PDF_SETUP.margin };
    if (currentItems) {
      const items = currentItems;
      items.forEach((item) => {
        if (item.isVisible) ContentRenderers[item.rendererKey](item.content, pdf, cursor);
      });
     
    }
    return pdf;
  }, [currentItems]);

  const generatePdf = useCallback(() => {
    try {
      const pdf = buildPdf();
      setPdfDataUri(pdf.output("datauristring"));
    } catch (err) {
      setErrorMessage(err.message);
    }
  }, [buildPdf, setErrorMessage]);

  const exportPdf = useCallback(() => {
    try {
      const pdf = buildPdf();
      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }, [buildPdf, setErrorMessage]);

  useEffect(() => { generatePdf() }, [generatePdf]);
  useEffect(() => { if (exportTrigger > 0) { exportPdf() } }, [exportTrigger, exportPdf]);

  return (
    <div className="flex flex-col gap-2 mb-2">
      { 
        isPendingUpdates === false && !errorMessage &&
        <div className='w-full'>
          <object className='rounded w-full sm:w-[800px] h-[500px] sm:h-[745px]' data={pdfDataUri} type="application/pdf"></object>
        </div>
      }
      { 
        (isPendingUpdates || errorMessage) &&
        <div className='transition-all bg-gray-200 rounded flex items-center w-full sm:w-[800px] h-[745px]'>
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