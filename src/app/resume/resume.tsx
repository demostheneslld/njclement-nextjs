'use client';

import GeneratePdf from "@/components/generatePdf";
import Button from "@/components/ui/Button";
import Section from '@/components/ui/Section';
import { defaultResumeItems } from "@/config/constants";
import { ContentItem } from "@/types/pdf/ContentItem";
import { ChangeEvent, useState } from "react";
import { HiDownload, HiPencil } from 'react-icons/hi';

export default function ResumeView() {
  type EditModes = 'on' | 'off';
  const [editMode, setEditMode] = useState<EditModes>('off');
  const [currentItems, setCurrentItems] = useState<ContentItem[]>(defaultResumeItems);
  const [editTextAreaValue, setEditTextAreaValue] = useState<string>(JSON.stringify(defaultResumeItems, null, 2));
  const [exportTrigger, setExportTrigger] = useState<number>(0);

  const triggerExport = () => {
    setExportTrigger(Date.now()); // Use timestamp to trigger
  }

  const toggleEditMode = () => {
    setEditMode(prevMode => prevMode === 'on' ? 'off' : 'on');
  }

  const updateEditTextAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const valueToUse = event.target.value;
    setEditTextAreaValue(valueToUse);
    try {
      const parsedItems = JSON.parse(valueToUse);
      setCurrentItems(parsedItems);
    } catch (err) {
      // Handle JSON parse error more gracefully, maybe show a warning?
      console.warn("Invalid JSON format:", err instanceof Error ? err.message : err);
    }
  }

  return (
    <Section
      title="Resume"
      subtitle={`Download as PDF or edit the source JSON (${editMode.toUpperCase()})`}
      background="white"
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        <Button 
          variant="secondary" 
          onClick={toggleEditMode}
          icon={<HiPencil className='w-5 h-5' />}
          iconPosition="left"
        >
          {editMode === 'on' ? 'View Resume' : 'Edit Source'}
        </Button>
        <Button 
          variant="primary" 
          onClick={triggerExport}
          icon={<HiDownload className='w-5 h-5' />}
          iconPosition="left"
        >
          Export as PDF
        </Button>
      </div>
      
      <div className='flex flex-col md:flex-row gap-8 items-start'>
        { editMode === 'on' && 
          <div className='w-full md:w-1/2 bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm'>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Resume Source JSON</h3>
            <textarea 
              className="w-full h-[700px] p-2 border border-gray-300 rounded-md font-mono text-xs bg-white focus:ring-primary-500 focus:border-primary-500 transition"
              value={editTextAreaValue} 
              onChange={updateEditTextAreaValue}
              aria-label="Edit Resume JSON"
            ></textarea>
          </div>
        }
        
        <div className={`w-full ${editMode === 'on' ? 'md:w-1/2' : 'max-w-4xl mx-auto'}`}>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <GeneratePdf currentItems={currentItems} exportTrigger={exportTrigger}/>
          </div>
        </div>
      </div>
    </Section>
  );
}