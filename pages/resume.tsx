import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { defaultResumeItems } from "../config/constants";

const GeneratePDF = dynamic(()=>import("../components/generatePdf"),{ssr:false});
const Resume =()=>{

  const debounceMillis = 2000;

  const debounceLatest = useRef<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [currentItems, setCurrentItems] = useState<string>(JSON.stringify(defaultResumeItems, undefined, 1));
  const [isPendingUpdates, setIsPendingUpdates] = useState<boolean>(false);

  const updateContentItems = (value: string) => {
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

  return(
  <div className="main">
    {/* <div className='text-lg font-medium'>Dynamic Resume - Modify JSON to Update PDF</div> */}
    <div className='flex gap-2'>
      <div className='bg-gray-100 rounded mb-2'>
        <div className='w-full bg-gray-200 rounded-t p-2 font-mono text-sm text-gray-800'>Resume Schema - Modify JSON to update PDF</div>
        <textarea
          className='font-mono text-[.65rem] w-[600px] h-[704px] p-2 bg-gray-100 text-gray-600'
          defaultValue={currentItems}
          onChange={e => updateContentItems(e.target.value)} 
        />
      </div>
      <GeneratePDF currentItems={currentItems} isPendingUpdates={isPendingUpdates} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
    </div>
  </div>);
}

export default Resume;