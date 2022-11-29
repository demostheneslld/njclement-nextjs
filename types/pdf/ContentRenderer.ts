import jsPDF from "jspdf";
import { Cursor } from "./Cursor";

export type ContentRenderer = (content: any, doc: jsPDF, cursor: Cursor) => void;