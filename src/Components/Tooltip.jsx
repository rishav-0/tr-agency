import { InformationCircleIcon } from "@heroicons/react/16/solid";
import React from "react";

const Tooltipx = ({  content }) => {
  return (
    <div className="relative group inline-block">
      <InformationCircleIcon className="w-4 h-4 text-blue-500" />
      <div
        className="absolute left-full top-1/2 -translate-y-1/2 ml-2 
                      w-max max-w-xs rounded-lg bg-gray-800 text-white text-sm px-3 py-2 
                      opacity-0 group-hover:opacity-100 pointer-events-none 
                      transition-opacity duration-200 z-50 shadow-lg"
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltipx;
