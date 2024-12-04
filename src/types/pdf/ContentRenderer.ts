import jsPDF from "jspdf";
import { Cursor } from "./Cursor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentRenderer = (content: any, doc: jsPDF, cursor: Cursor) => void;
