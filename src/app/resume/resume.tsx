'use client';

import GeneratePdf from "@/components/generatePdf";
import Button, { ButtonVariants } from "@/components/ui/button";
import { defaultResumeItems } from "@/config/constants";
import { ContentItem } from "@/types/pdf/ContentItem";
import { ChangeEvent, MouseEvent, MouseEventHandler, useState } from "react";
import { HiOutlineDocumentDownload, HiOutlinePencil } from "react-icons/hi";

const Resume =()=>{
  type EditModes = 'on' | 'off';
  const [editMode, setEditMode] = useState<EditModes>('off');
  const [currentItems, setCurrentItems] = useState<ContentItem[]>(defaultResumeItems);
  const [editTextAreaValue, setEditTextAreaValue] = useState<string>(JSON.stringify(defaultResumeItems, null, 2));
  const [exportTrigger, setExportTrigger] = useState<number>(0);

  const triggerExport = () => {
    setExportTrigger(1);
    setTimeout(() => {
      setExportTrigger(0);
    }, 5000);
  }

  const toggleEditMode: MouseEventHandler<HTMLButtonElement> = (event: MouseEvent) => {
    console.log('Toggle Edit Mode', event);
    const modeToUse = editMode === 'on' ? 'off' : 'on';
    setEditMode(modeToUse);
  }

  const updateEditTextAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const valueToUse = event.target.value;
    setEditTextAreaValue(valueToUse);
    try {
      const parsedItems = JSON.parse(valueToUse);
      setCurrentItems(parsedItems);
    } catch (err) {
      if (err instanceof Error) {
        console.warn(err.message);
      } else {
        console.warn('UNKNOWN ERROR');
      }
    }
  }

  return(
  <div className="main flex flex-col gap-2">
    <div className='flex flex-col sm:flex-row gap-2'>
      <Button variants={[ButtonVariants.PRIMARY]} onClick={toggleEditMode}>
        <div className="flex gap-2">
          <HiOutlinePencil className='w-6 h-6'></HiOutlinePencil>
          <div>Edit Source JSON ({editMode.toLocaleUpperCase()})</div>
        </div>
      </Button>
      <Button variants={[ButtonVariants.PRIMARY]} onClick={triggerExport}>
        <div className='flex gap-2'>
          <HiOutlineDocumentDownload className='w-6 h-6'></HiOutlineDocumentDownload>
          <div>Export as PDF</div>
        </div>
      </Button>
    </div>
    <div className='flex flex-col sm:flex-row gap-2'>
      { /* EDIT MODE */ }
      { editMode === 'on' && 
      <div className='bg-gray-100 max-h-[745px] rounded flex flex-col gap-2 overflow-auto p-2 w-full'>
        <pre className="text-xs max-w-[800px]">
          <textarea className="min-w-[800px] min-h-[745px]" value={editTextAreaValue} onChange={updateEditTextAreaValue}></textarea>
        </pre>
      </div>
      }
      <GeneratePdf currentItems={currentItems} exportTrigger={exportTrigger}/>
    </div>
  </div>);
}

export default Resume;