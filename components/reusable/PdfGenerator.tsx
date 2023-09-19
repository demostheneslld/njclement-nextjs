/// <reference lib="dom" />
import React, { useCallback, useEffect, useState } from "react";
import { ContentItem } from "../../types/pdf/ContentItem";
import { FileExtension, FileName } from "../../types/FileName";

type props = {
  fileName: FileName;
  currentItems?: ContentItem[];
  isPendingUpdates?: boolean;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
  exportTrigger?: number;
};

const GeneratePdf: React.FC<props> = ({ fileName, exportTrigger, currentItems, isPendingUpdates, errorMessage, setErrorMessage }) => {

  const [pdfDataUri, setPdfDataUri] = useState<string>();

  const handleBuildPdf = useCallback(async () => {
    const data = {
      currentItems,
      fileName: fileName.toString(),
    }
    const response = await fetch("/api/build-pdf", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData: { dataUriString: string, message: string } = await response.json();
    if (response.status !== 200) {
      throw new Error(responseData.message);
    }
    return responseData;
  }, [currentItems]);

  const generatePdf = useCallback(async () => {
    try {
      const { dataUriString } = await handleBuildPdf();
      setPdfDataUri(dataUriString);
    } catch (err: any) {
      if (setErrorMessage) {
        setErrorMessage(err?.message ?? "Unknown Error");
      }
    }
  }, [handleBuildPdf, setErrorMessage]);

  const exportPdf = useCallback(async () => {
    try {
      const { dataUriString } = await handleBuildPdf()
      setPdfDataUri(dataUriString);
      const link = document.createElement('a');
      link.id = 'exportedPdfLink';
      link.href = dataUriString;
      link.download = fileName.toString();
      document.body.appendChild(link);
      document?.getElementById(link.id)?.click();
    } catch (err: any) {
      if (setErrorMessage) {
        setErrorMessage(err?.message ?? "Unknown Error");
      }
    }
  }, [handleBuildPdf, setErrorMessage]);

  useEffect(() => { generatePdf() }, [generatePdf]);
  useEffect(() => { if (exportTrigger ?? 0 > 0) { exportPdf() } }, [exportTrigger, exportPdf]);

  return (
    <div className="flex flex-col gap-2 mb-2">
      <div className='w-full relative'>
        <object className='rounded w-full sm:w-[800px] h-[500px] sm:h-[745px]' data={pdfDataUri} type="application/pdf">
          
        </object>
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