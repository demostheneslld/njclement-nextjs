import { ContentRenderers, PDF_SETUP } from "@/config/pdf-setup";
import { ContentItem } from "@/types/pdf/ContentItem";
import jsPDF from "jspdf";

export const buildPdf = async (currentItems: ContentItem[], fileName: string): Promise<{dataUriString: string, message: string}> => {
  try {
    const pdf = new jsPDF({
      unit: PDF_SETUP.unit,
    });
    pdf.setProperties({ title: fileName})
    console.log(pdf.getFontList());
    const cursor = { x: PDF_SETUP.margin, y: PDF_SETUP.margin };
    currentItems.forEach((item: ContentItem) => {
      if (item.isVisible) ContentRenderers[item.rendererKey](item.content, pdf, cursor);
    });
    const dataUriString = pdf.output('datauristring');
    return { dataUriString, message: 'SUCCESS' };
  } catch (err) {
    if (err instanceof Error) {
      return { dataUriString: '', message: `ERROR: ${err.message}` };
    }
    return { dataUriString: '', message: 'UNKNOWN ERROR' };
  }
  
}