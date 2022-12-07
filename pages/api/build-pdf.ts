import jsPDF from "jspdf";
import { NextApiRequest, NextApiResponse } from "next";
import { ContentRenderers, PDF_SETUP } from "../../config/pdfSetup";
import { ContentItem } from "../../types/pdf/ContentItem";

export default async function handler (req: NextApiRequest, res: NextApiResponse<{dataUriString: string, message: string}>) {
  const responseData = { dataUriString: '', message: ''}
  try {
    const { currentItems, fileName } = JSON.parse(req.body);
    const pdf = new jsPDF({
      unit: PDF_SETUP.unit,
    });
    pdf.setProperties({ title: fileName})
    console.log(pdf.getFontList());
    let cursor = { x: PDF_SETUP.margin, y: PDF_SETUP.margin };
    currentItems.forEach((item: ContentItem) => {
      if (item.isVisible) ContentRenderers[item.rendererKey](item.content, pdf, cursor);
    });
    responseData.dataUriString = pdf.output('datauristring');
    res.status(200).json(responseData);
  } catch (err) {
    responseData.message = err.message;
    res.status(500).send(responseData);
  }
  
}