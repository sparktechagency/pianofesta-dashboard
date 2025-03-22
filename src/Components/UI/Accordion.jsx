"use client";

import { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { cn } from "../../lib/utils";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Accordion = ({
  isEditing,
  num,
  item,
  className,
  showFaqUpdateModal,
  showFaqDeleteModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Calculate the height of the content when it opens or closes
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight); // Set to the content's height when open
    } else {
      setHeight(0); // Set to 0 when closed
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => {
        if (!isEditing) toggleAccordion();
      }}
      className={cn(
        "mb-5 bg-[#F2EBFD] duration-500 rounded shadow ",
        className
      )}
    >
      <h1 className="px-4 pt-4 pb-2 text-base-color/50 text-xl md:text-2xl lg:text-3xl font-semibold">
        {num}
      </h1>
      <div className="flex justify-between items-center px-4 pb-4 cursor-pointer  duration-500">
        <h3 className="text-base-color text-base md:text-lg lg:text-xl  font-semibold">
          {item?.question}
        </h3>
        <div className="flex gap-2">
          {isEditing && (
            <>
              <div
                onClick={() => showFaqUpdateModal(item)}
                className="p-[2px] "
              >
                <FaEdit className="text-base-color text-base md:text-lg lg:text-xl duration-500" />
              </div>
              <div
                onClick={() => showFaqDeleteModal(item)}
                className="p-[2px] "
              >
                <MdDelete className="text-base-color text-base md:text-lg lg:text-xl duration-500" />
              </div>
            </>
          )}
          {isOpen ? (
            <div
              onClick={() => {
                if (isEditing) toggleAccordion();
              }}
              className="p-[2px] rounded-full border border-[#000000] bg-[#000000]"
            >
              <HiMinus className="text-[#F2EBFD] text-base md:text-lg lg:text-xl duration-500" />
            </div>
          ) : (
            <div
              onClick={() => {
                if (isEditing) toggleAccordion();
              }}
              className="p-[2px] rounded-full border border-[#000000] bg-[#000000]"
            >
              <GoPlus className="text-[#F2EBFD] text-base md:text-lg lg:text-xl duration-500" />
            </div>
          )}
        </div>
      </div>
      <div
        ref={contentRef}
        style={{
          height: `${height}px`, // Dynamic height
          overflow: "hidden",
          transition: "height 0.5s ease", // Smooth transition effect for height
        }}
      >
        <div className="p-4 bg-[#F2EBFD] text-base-color duration-500 text-sm md:text-base lg:text-lg rounded-bl rounded-br">
          {item?.answer}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
