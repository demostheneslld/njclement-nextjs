import { buildPdf } from "@/actions/build-pdf";
import { ContentItem } from "@/types/pdf/ContentItem";
import React, { useCallback, useEffect, useRef, useState } from "react";

type props = {
  currentItems?: ContentItem[];
  exportTrigger?: number;
  autoGenerate?: boolean;
  onExportComplete?: () => void;
};

const fileName = `Clement_Resume_${new Date().toISOString().substring(0, 10)}`;
const GeneratePdf: React.FC<props> = ({
  exportTrigger,
  currentItems,
  autoGenerate = true,
  onExportComplete,
}) => {

  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isPendingUpdates, setIsPendingUpdates] = useState<boolean>(false);
  const lastExportTriggerRef = useRef<number | undefined>(undefined);

  const generatePdf = useCallback(async (): Promise<string | undefined> => {
    try {
      setIsPendingUpdates(true);
      setErrorMessage(undefined);
      
      const { dataUriString, message } = await buildPdf(currentItems ?? [], fileName);
      if (message !== 'SUCCESS') {
        throw new Error(message);
      }
      
      // Convert data URI to blob for better browser compatibility
      const response = await fetch(dataUriString);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      // Clean up previous blob URL before setting new one
      setPdfBlobUrl(prevBlobUrl => {
        if (prevBlobUrl) {
          URL.revokeObjectURL(prevBlobUrl);
        }
        return blobUrl;
      });
      return blobUrl;
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('UNKNOWN ERROR');
      }
      return undefined;
    } finally {
      setIsPendingUpdates(false);
    }
  }, [currentItems, setErrorMessage]);

  const exportPdf = useCallback(async (url?: string) => {
    try {
      const pdfUrl = url ?? pdfBlobUrl;
      if (!pdfUrl) {
        throw new Error('No PDF data to export');
      }
      
      // Use blob URL for better Safari compatibility
      const link = document.createElement('a');
      link.id = 'exportedPdfLink';
      link.href = pdfUrl;
      link.download = `${fileName}.pdf`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      
      // For Safari, we need to trigger the click in a user gesture context
      if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        // Safari-specific handling
        link.target = '_blank';
        link.click();
      } else {
        link.click();
      }
      
      document.body.removeChild(link);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('UNKNOWN ERROR');
      }
    }
  }, [pdfBlobUrl, setErrorMessage]);

  // Export PDF on export trigger increment
  useEffect(() => {
    if (!exportTrigger || exportTrigger === lastExportTriggerRef.current) {
      return;
    }
    lastExportTriggerRef.current = exportTrigger;
    if (exportTrigger > 0) {
      const exportWithFreshPdf = async () => {
        const url = await generatePdf();
        if (url) {
          await exportPdf(url);
        }
        onExportComplete?.();
      };
      exportWithFreshPdf();
    }
  }, [exportTrigger, exportPdf, generatePdf, onExportComplete]);

  // Generate PDF on currentItems change
  useEffect(() => {
    if (autoGenerate) {
      generatePdf();
    }
  }, [autoGenerate, currentItems, generatePdf]);
  
  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [pdfBlobUrl]);

  return (
    <div className="flex flex-col gap-2 mb-2">
      <div className='w-full relative'>
        {pdfBlobUrl ? (
          <iframe 
            className='rounded w-full sm:w-[800px] h-[500px] sm:h-[745px] border-0' 
            src={pdfBlobUrl}
            title="PDF Preview"
          />
        ) : (
          <div className='rounded w-full sm:w-[800px] h-[500px] sm:h-[745px] bg-neutral-sub border border-gray-700 flex items-center justify-center'>
            <div className='text-med'>Loading PDF...</div>
          </div>
        )}
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
