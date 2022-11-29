import { jsPDFOptions } from "jspdf";

const pageWidth = 8.5;
const lineHeight = 1.2;
const margin = 0.5;
const fontSize = 12;
const ptsPerInch = 72;
const unit: jsPDFOptions["unit"] = 'in';

export const PDF_SETUP = {
  unit,
  pageWidth,
  lineHeight,
  margin,
  maxLineWidth: pageWidth - margin * 2,
  fontSize,
  ptsPerInch,
  oneLineHeight: (fontSize * lineHeight) / ptsPerInch,
}