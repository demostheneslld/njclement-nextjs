import dynamic from "next/dynamic";
import React, { ChangeEvent, ChangeEventHandler, EventHandler, MouseEvent, MouseEventHandler, useRef, useState } from "react";
import { defaultResumeItems } from "../config/constants";
import { ContentRendererTypes } from "../config/pdfSetup";
import { ContentItem } from "../types/pdf/ContentItem";

const GeneratePDF = dynamic(()=>import("../components/generatePdf"),{ssr:false});
const Resume =()=>{

  const debounceMillis = 2000;

  const checkboxClassName = 'form-check-input appearance-none h-4 w-4 border border-bad-800 rounded-sm bg-bad-700 checked:bg-good-700 checked:border-good-800 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-right ml-2 cursor-pointer';

  const debounceLatest = useRef<number>(0);
  const [editableItems, setEditableItems] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [currentItems, setCurrentItems] = useState<ContentItem[]>(defaultResumeItems);
  const [isPendingUpdates, setIsPendingUpdates] = useState<boolean>(false);

  const updateContentItems = (value: ContentItem[]) => {
    setIsPendingUpdates(true);
    setErrorMessage(null);
    debounceLatest.current += 1;
    setTimeout((args) => {
      console.warn(`Debounce Timer Complete (Current ${args[0]}) (Latest ${debounceLatest.current})`);
      if (args[0] === debounceLatest.current) {
        setCurrentItems(value);
        setIsPendingUpdates(false);
      }
    },
    debounceMillis,
    [debounceLatest.current]);
  };

  const toggleContentItemVisibility: MouseEventHandler<SVGSVGElement> = (event: MouseEvent) => {
    const updatedContentItems = [...currentItems];
    if (event.target instanceof SVGSVGElement) {
      const contentItemIndex = Number(event.target.dataset.contentItemIndex);
      if (!isNaN(contentItemIndex) && updatedContentItems[contentItemIndex]) {
        updatedContentItems[contentItemIndex].isVisible = !updatedContentItems[contentItemIndex].isVisible;
      }
      updateContentItems(updatedContentItems);
    }
  }

  const toggleContentItemCollapsed: MouseEventHandler<SVGSVGElement> = (event: MouseEvent) => {
    let updatedEditableItems = [...editableItems];
    if (event.target instanceof SVGSVGElement) {
      const contentItemIndex = Number(event.target.dataset.contentItemIndex);
      if (!isNaN(contentItemIndex)) {
        if (updatedEditableItems.includes(contentItemIndex)) updatedEditableItems = updatedEditableItems.filter((n: number) => n !== contentItemIndex);
        else updatedEditableItems.push(contentItemIndex);
      }
    }
    setEditableItems(updatedEditableItems);
  }

  const updateContentItem: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedContentItems = [...currentItems];
    const newValue = event.target.value;
    const contentItemIndex = Number(event.target.dataset.contentItemIndex);
    const contentItemKey = event.target.dataset.contentItemKey;
    if (!isNaN(contentItemIndex) && updatedContentItems[contentItemIndex]) {
      updatedContentItems[contentItemIndex].content[contentItemKey] = newValue;
    }
    updateContentItems(updatedContentItems);
  }

  const updateContentSubItem: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedContentItems = [...currentItems];
    const newValue = event.target.value;
    const contentItemIndex = Number(event.target.dataset.contentItemIndex);
    const contentItemSubIndex = Number(event.target.dataset.contentItemSubIndex);
    const contentItemKey = event.target.dataset.contentItemKey;
    if (isNaN(contentItemIndex) || isNaN(contentItemSubIndex)) return;
    const currentValue = updatedContentItems[contentItemIndex].content[contentItemKey][contentItemSubIndex].content;
    if (!isNaN(contentItemIndex) && !isNaN(contentItemSubIndex) && currentValue) {
      updatedContentItems[contentItemIndex].content[contentItemKey][contentItemSubIndex].content = newValue;
    }
    updateContentItems(updatedContentItems);
  }

  const toggleContentSubItemVisibility: MouseEventHandler<SVGSVGElement> = (event: MouseEvent) => {
    const updatedContentItems = [...currentItems];
    if (event.target instanceof SVGSVGElement) {
      const contentItemIndex = Number(event.target.dataset.contentItemIndex);
      const contentItemSubIndex = Number(event.target.dataset.contentItemSubIndex);
      const contentItemKey = event.target.dataset.contentItemKey;
      if (isNaN(contentItemIndex) || isNaN(contentItemSubIndex)) return;
      const currentValue = updatedContentItems[contentItemIndex].content[contentItemKey][contentItemSubIndex].visible;
      if (currentValue !== undefined) {
        updatedContentItems[contentItemIndex].content[contentItemKey][contentItemSubIndex].visible = !currentValue;
      }
      updateContentItems(updatedContentItems);
    }
  }

  return(
  <div className="main">
    
    <div className='flex gap-2'>
      <div className='bg-gray-100 rounded mb-2 flex flex-col gap-2 overflow-auto w-[600px] h-[745px]'>
        <div className='w-full bg-gray-300 rounded-t p-2'>Resume Data - Modify to update PDF</div>
        { currentItems.map((item, i) => {
          return(
            <div className='p-2 mx-2 rounded bg-gray-200' key={i}>
              {/* HEADER */}
              <div className='flex items-center justify-between bg-gray-300 p-2 rounded'>
                <div>{item.rendererKey} - {typeof item.content === 'string' ? item.content : item.content.title || item.content.name || ''}</div>
                <div className='flex items-center gap-2'>
                  {/* COLLAPSE ICON */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor"
                    className={`w-6 h-6 hover:text-accent-800 cursor-pointer ${(editableItems.includes(i) ? '' : 'text-gray-400')}`}
                    data-content-item-index={i}
                    onClick={toggleContentItemCollapsed}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  {/* VISIBLE ICON */}
                  <svg 
                    data-content-item-index={i} 
                    onClick={toggleContentItemVisibility} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className={`w-6 h-6 hover:text-accent-800 cursor-pointer ${item.isVisible? '' : 'text-gray-400'}`}
                  >
                    { item.isVisible && 
                      <>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </>
                    }
                    { !item.isVisible && 
                      <>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </>
                    }
                  </svg>
                </div>
              </div>
              {/* EDITABLE SECTION */}
              <div style={{ display: (editableItems.includes(i) ? 'block' : 'none') }} className='flex flex-col gap-1 mt-2'>
                {/* STRING CONTENT */}
                { typeof item.content === 'string' && 
                  <input
                    data-content-item-index={i}
                    data-content-item-key={'content'}
                    className='text-[.65rem] p-2 w-full bg-gray-100 text-gray-600 rounded'
                    defaultValue={item.content}
                    onChange={updateContentItem}
                    spellCheck="false"
                  />
                }
                {/* OBJECT CONTENT */}
                { typeof item.content === 'object' &&
                  <div className='flex flex-col gap-2 text-sm'>
                    {/* SIMPLE KEY:VAL */}
                    { 
                      Object.keys(item.content).map((key) => {
                        if (typeof item.content[key] === 'string') {
                          return (
                            <div className='flex justify-between items-center gap-2' key={`content-item-${i}-${key}`}>
                              <label className='min-w-[80px] text-right'>{key}</label>
                              <input
                                data-content-item-index={i}
                                data-content-item-key={key}
                                className='w-full text-[.65rem] p-2 bg-gray-100 text-gray-600 rounded'
                                defaultValue={item.content[key]}
                                onChange={updateContentItem}
                                spellCheck="false"
                                autoComplete="false"
                              />
                            </div>
                          )
                        {/* CONTENT SUB ARRAY */}
                        } else if (Array.isArray(item.content[key])) {
                          return (
                            <div className='flex flex-col gap-2 text-sm' key={`content-item-${i}-array`}>
                              { 
                                item.content[key].map((subItem, si) => {
                                  if (typeof subItem.content === 'string') {
                                    return (
                                      <div className='flex justify-between items-center gap-2' key={`content-item-${i}-content-${key}-${si}-content`}>
                                        <div className="form-check flex gap-2 justify-end items-center min-w-[80px]">
                                          <label className="form-check-label inline-block text-gray-800">item {si + 1}</label>
                                          {/* VISIBLE ICON */}
                                          <svg 
                                            data-content-item-index={i}
                                            data-content-item-sub-index={si}
                                            data-content-item-key={key}
                                            onClick={toggleContentSubItemVisibility} 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke="currentColor" 
                                            className={`w-6 h-6 hover:text-accent-800 cursor-pointer ${subItem.visible? '' : 'text-gray-400'}`}
                                          >
                                            { subItem.visible && 
                                              <>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                              </>
                                            }
                                            { !subItem.visible && 
                                              <>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                              </>
                                            }
                                          </svg>
                                        </div>
                                        <textarea
                                          data-content-item-index={i}
                                          data-content-item-sub-index={si}
                                          data-content-item-key={key}
                                          className='w-full text-[.65rem] p-2 bg-gray-100 text-gray-600 rounded'
                                          defaultValue={subItem.content}
                                          onChange={updateContentSubItem}
                                          spellCheck="false"
                                          autoComplete="false"
                                        />
                                      </div>
                                    )
                                  }
                                })
                              }
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                }
              </div>
            </div>
          )
        })}
      </div>
      <GeneratePDF currentItems={currentItems} isPendingUpdates={isPendingUpdates} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
    </div>
  </div>);
}

export default Resume;