import { buildPdf } from "@/actions/build-pdf";
import { ContentItem } from "@/types/pdf/ContentItem";
import React, { useCallback, useEffect, useState } from "react";

type props = {
  currentItems?: ContentItem[];
  exportTrigger?: number;
};

const fileName = `Clement_Resume_${new Date().toISOString().substring(0, 10)}`;
const GeneratePdf: React.FC<props> = ({ exportTrigger, currentItems }) => {

  const [pdfDataUri, setPdfDataUri] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isPendingUpdates, setIsPendingUpdates] = useState<boolean>(false);

  const generatePdf = useCallback(async () => {
    try {
      setIsPendingUpdates(true);
      setErrorMessage(undefined);
      const { dataUriString, message } = await buildPdf(currentItems ?? [], fileName);
      if (message !== 'SUCCESS') {
        throw new Error(message);
      }
      setPdfDataUri(dataUriString);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('UNKNOWN ERROR');
      }
    } finally {
      setIsPendingUpdates(false);
    }
  }, [currentItems, setErrorMessage]);

  const exportPdf = useCallback(async () => {
    try {
      if (!pdfDataUri) {
        throw new Error('No PDF data to export');
      }
      const link = document.createElement('a');
      link.id = 'exportedPdfLink';
      link.href = pdfDataUri;
      link.download = fileName;
      document.body.appendChild(link);
      document.getElementById(link.id)?.click();
      document.getElementById(link.id)?.remove();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('UNKNOWN ERROR');
      }
    }
  }, [pdfDataUri, setErrorMessage]);

  // Export PDF on export trigger increment
  useEffect(() => {
    if ((exportTrigger ?? 0) > 0) {
      exportPdf();
    }
  }, [exportTrigger, exportPdf]);

  // Generate PDF on currentItems change
  useEffect(() => {
    generatePdf();
  }, [currentItems, generatePdf]);

  return (
    <div className="flex flex-col gap-2 mb-2">
      <div className='w-full relative'>
        <object className='rounded w-full sm:w-[800px] h-[500px] sm:h-[745px]' data={pdfDataUri} type="application/pdf"></object>
        {
          (isPendingUpdates || errorMessage) &&
          <div className='transition-all bg-gray-900 absolute opacity-90 top-0 left-0 rounded w-full h-full'>
            <div className='h-full flex flex-col justify-center items-center text-gray-100'>
              <div className='text-bad-500'>{(!isPendingUpdates && errorMessage) ? 'Something went wrong generating this PDF!' : ''}</div>
              <div className='text-sm font-mono'>{(!isPendingUpdates && errorMessage) ? errorMessage : 'Pending Updates...'}</div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default GeneratePdf;