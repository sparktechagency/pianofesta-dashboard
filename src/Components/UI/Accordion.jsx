"use client";

import { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { cn } from "../../lib/utils";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Accordion = ({
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
      className={cn(
        "mb-5 bg-secondary-color/20 duration-500 rounded shadow ",
        className
      )}
    >
      <div className="flex justify-between items-center p-4 cursor-pointer  duration-500">
        <h3 className="text-base-color text-base md:text-lg lg:text-xl  font-semibold">
          {item?.question}
        </h3>
        <div className="flex gap-2">
          <div onClick={() => showFaqUpdateModal(item)} className="p-[2px] ">
            <FaEdit className="text-base-color text-base md:text-lg lg:text-xl duration-500" />
          </div>
          <div onClick={() => showFaqDeleteModal(item)} className="p-[2px] ">
            <MdDelete className="text-base-color text-base md:text-lg lg:text-xl duration-500" />
          </div>
          {isOpen ? (
            <div
              onClick={toggleAccordion}
              className="p-[2px] rounded-full border border-secondary-color"
            >
              <HiMinus className="text-base-color text-base md:text-lg lg:text-xl duration-500" />
            </div>
          ) : (
            <div
              onClick={toggleAccordion}
              className="p-[2px] rounded-full border border-secondary-color"
            >
              <GoPlus className="text-base-color text-base md:text-lg lg:text-xl duration-500" />
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
        <div className="p-4 bg-secondary-color/10 text-base-color duration-500 text-sm md:text-base lg:text-lg rounded-bl rounded-br">
          {item?.answer}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
