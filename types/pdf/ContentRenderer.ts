import jsPDF from "jspdf";
import { Cursor } from "./Cursor";

export type ContentRenderer = (content: string | number, doc: jsPDF, cursor: Cursor) => void;