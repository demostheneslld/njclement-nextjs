import dynamic from "next/dynamic";
import Head from 'next/head'
import React, { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useRef, useState } from "react";
import { defaultResumeItems } from "../config/constants";
import { ContentItem } from "../types/pdf/ContentItem";
import { ArrowDownTrayIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Button, { ButtonVariants } from "../components/Button";

const GeneratePDF = dynamic(()=>import("../components/generatePdf"),{ssr:false});
const Resume =()=>{

  const debounceMillis = 2000;
  const debounceLatest = useRef<number>(0);

  type EditModes = 'on' | 'off';
  const [editMode, setEditMode] = useState<EditModes>('off');
  const [editableItems, setEditableItems] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [currentItems, setCurrentItems] = useState<ContentItem[]>(defaultResumeItems);
  const [exportTrigger, setExportTrigger] = useState<number>(0);
  const [isPendingUpdates, setIsPendingUpdates] = useState<boolean>(false);

  const triggerExport = () => {
    setExportTrigger(1);
    setTimeout(() => {
      setExportTrigger(0);
    }, 5000);
  }

  const toggleEditMode: MouseEventHandler<HTMLAnchorElement> = (event: MouseEvent) => {
    const modeToUse = editMode === 'on' ? 'off' : 'on';
    setEditMode(modeToUse);
  }

  const updateContentItems = (value: ContentItem[]) => {
    setIsPendingUpdates(true);
    setErrorMessage(null);
    debounceLatest.current += 1;
    setTimeout((args) => {
      console.log(`Debounce Timer Complete (Current ${args[0]}) (Latest ${debounceLatest.current})`);
      if (args[0] === debounceLatest.current) {
        setCurrentItems(value);
        setIsPendingUpdates(false);
      }
    },
    debounceMillis,
    [debounceLatest.current]);
  };

  const toggleContentItemVisibility = (event: MouseEvent, onClickData: Record<string, any>) => {
    const updatedContentItems = [...currentItems];
    const contentItemIndex = Number(onClickData.contentItemIndex);
    if (!isNaN(contentItemIndex) && updatedContentItems[contentItemIndex]) {
      updatedContentItems[contentItemIndex].isVisible = !updatedContentItems[contentItemIndex].isVisible;
      updateContentItems(updatedContentItems);
    }
  }

  const toggleContentItemCollapsed = (event: MouseEvent, onClickData: Record<string, any>) => {
    console.log('Toggle Content Item Collapsed');
    let updatedEditableItems = [...editableItems];
    const contentItemIndex = Number(onClickData.contentItemIndex);
    console.log(`Content Item Index: ${contentItemIndex}`)
    if (!isNaN(contentItemIndex)) {
      if (updatedEditableItems.includes(contentItemIndex)) updatedEditableItems = updatedEditableItems.filter((n: number) => n !== contentItemIndex);
      else updatedEditableItems.push(contentItemIndex);
      setEditableItems(updatedEditableItems);
    }
  }

  const toggleContentSubItemVisibility = (event: MouseEvent, onClickData: Record<string, any>) => {
    const updatedContentItems = [...currentItems];
    const contentItemIndex = Number(onClickData.contentItemIndex);
    const contentItemSubIndex = Number(onClickData.contentItemSubIndex);
    const contentItemKey = onClickData.contentItemKey;
    if (isNaN(contentItemIndex) || isNaN(contentItemSubIndex)) return;
    const currentValue = updatedContentItems[contentItemIndex].content[contentItemKey][contentItemSubIndex].visible;
    if (currentValue !== undefined) {
      updatedContentItems[contentItemIndex].content[contentItemKey][contentItemSubIndex].visible = !currentValue;
    }
    updateContentItems(updatedContentItems);
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

  return(
  <div className="main flex flex-col gap-2">
    <Head>
      <title>Resume | Nathaniel J. Clement</title>
    </Head>
    <div className='flex flex-col sm:flex-row gap-2'>
      <Button variants={[ButtonVariants.PRIMARY]} onClick={toggleEditMode}>
        <div className="flex gap-2">
          <PencilSquareIcon className='w-6 h-6'></PencilSquareIcon>
          <div>Toggle Edit Mode (currently: {editMode.toLocaleUpperCase()})</div>
        </div>
      </Button>
      <Button variants={[ButtonVariants.PRIMARY]} onClick={e => triggerExport()}>
        <div className='flex gap-2'>
          <ArrowDownTrayIcon className='w-6 h-6'></ArrowDownTrayIcon>
          <div>Export as PDF</div>
        </div>
      </Button>
    </div>
    <div className='flex flex-col sm:flex-row gap-2'>
      { /* EDIT MODE */ }
      { editMode === 'on' && 
      <div className='bg-gray-100 max-h-[745px] rounded flex flex-col gap-2 overflow-auto p-2 w-full'>
        { currentItems.map((item, i) => {
          return(
            <div className='rounded bg-gray-200' key={i}>
              {/* HEADER */}
              <div className='flex items-center justify-between bg-gray-300 p-2 rounded-t'>
                <div>{item.rendererKey} - {typeof item.content === 'string' ? item.content : item.content.title || item.content.name || ''}</div>
                <div className='flex items-center gap-2'>
                  {/* COLLAPSE ICON */}
                  <Button
                    variants={[ButtonVariants.GHOST, ButtonVariants.SMALL]}
                    onClickData={{contentItemIndex: i}}
                    onClick={toggleContentItemCollapsed}
                  >
                    <PencilSquareIcon
                      className={`w-6 h-6 ${(editableItems.includes(i) ? '' : 'text-gray-400')}`}
                    />
                  </Button>
                  {/* VISIBLE ICON */}
                  <Button
                    variants={[ButtonVariants.GHOST, ButtonVariants.SMALL]}
                    onClickData={{contentItemIndex: i}}
                    onClick={toggleContentItemVisibility}
                  >
                    { item.isVisible && 
                      <EyeIcon
                        className={`w-6 h-6 ${item.isVisible? '' : 'text-gray-400'}`}
                      />
                    }
                    { !item.isVisible && 
                      <EyeSlashIcon
                        className={`w-6 h-6 ${item.isVisible? '' : 'text-gray-400'}`}
                      />
                    }
                  </Button>
                </div>
              </div>
              {/* EDITABLE SECTION */}
              <div style={{ display: (editableItems.includes(i) ? 'block' : 'none') }} className='flex flex-col gap-1 m-2'>
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
                                          <Button
                                            variants={[ButtonVariants.GHOST, ButtonVariants.SMALL]}
                                            onClickData={{contentItemIndex: i, contentItemSubIndex: si, contentItemKey: key}}
                                            onClick={toggleContentSubItemVisibility}
                                          >
                                            { subItem.visible && 
                                              <EyeIcon
                                                className={`w-6 h-6 ${subItem.visible? '' : 'text-gray-400'}`}
                                              />
                                            }
                                            { !subItem.visible && 
                                              <EyeSlashIcon
                                                className={`w-6 h-6 ${subItem.visible? '' : 'text-gray-400'}`}
                                              />
                                            }
                                          </Button>
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
      }
      <GeneratePDF currentItems={currentItems} exportTrigger={exportTrigger} isPendingUpdates={isPendingUpdates} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
    </div>
  </div>);
}

export default Resume;