import type { jsPDF } from "jspdf";
import type { Cursor } from "./Cursor";

export type ContentRenderer = (content: any, doc: jsPDF, cursor: Cursor) => void;
