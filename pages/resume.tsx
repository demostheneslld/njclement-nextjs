import jsPDF from "jspdf";
import dynamic from "next/dynamic";
import React from "react";
import { ContentItem } from "../types/pdf/ContentItem";
import { ContentRenderer } from "../types/pdf/ContentRenderer";
import { Cursor } from "../types/pdf/Cursor";

const ContentRenderers: Record<string, ContentRenderer> = {
  text: (content: string, doc: jsPDF, cursor: Cursor) => {
    doc.text(content, cursor.x, cursor.y);
    cursor.y += 10;
  }
}

const GeneratePDF = dynamic(()=>import("../components/generatePdf"),{ssr:false});
const app =()=>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = React.useRef();
        const items: ContentItem[] = [
          { content: 'hi', renderer: ContentRenderers.text },
          { content: 'This is some text!', renderer: ContentRenderers.text },
        ];

        return(<div className="main">
        <div>Click to Generate PDF
        </div>
        <GeneratePDF items={items}/>
        </div>);
}

export default app;