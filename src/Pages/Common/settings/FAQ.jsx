import { useState } from "react";
import { Button } from "antd";
import { GoPlus } from "react-icons/go";
import Accordion from "../../../Components/UI/Accordion";
import AddFAQ from "../../../Components/UI/Modal/FAQ/AddFAQ";
import UpdateFAQ from "../../../Components/UI/Modal/FAQ/UpdateFAQ";
import DeleteFAQModal from "../../../Components/UI/Modal/FAQ/DeleteFAQ";
import { useGetFaqQuery } from "../../../redux/features/faq/faqApi";
import Loading from "../../../Components/ui/Loading";

const FAQSection = () => {
  const { data, isFetching } = useGetFaqQuery();
  const faqData = data?.data?.faqs || [];

  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isFaqUpdateModalOpen, setIsFaqUpdateModalOpen] = useState(false);
  const [isFaqDeleteModalOpen, setIsFaqDeleteModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  console.log("currentRecord", currentRecord);

  const showFaqModal = () => {
    setIsFaqModalOpen(true);
  };

  const showFaqUpdateModal = (record) => {
    setCurrentRecord(record);
    setIsFaqUpdateModalOpen(true);
  };

  const showFaqDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsFaqDeleteModalOpen(true);
  };

  const handleCancelFaqUpdateModal = () => {
    setIsFaqUpdateModalOpen(false);
    setCurrentRecord(null);
  };

  const handleCancelFaqDeleteModal = () => {
    setIsFaqDeleteModalOpen(false);
    setCurrentRecord(null);
  };

  if (isFetching) {
    <Loading />;
  }
  return (
    <div className="min-h-[88vh] bg-primary-color  py-4 px-4 rounded-lg">
      <div>
        <div className="w-full sm:w-[90%] mt-10 mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-center mb-20">
            <h1 className="text-3xl lg:text-4xl text-base-color font-semibold">
              FAQ
            </h1>
            <Button
              type="primary"
              onClick={showFaqModal}
              className="flex items-center gap-1 sm:gap-3 !bg-secondary-color !text-primary-color h-10 font-semibold border-none"
            >
              <GoPlus className="text-xl text-primary-color" />
              <p className="text-xs sm:text-lg py-3">Add FAQ</p>
            </Button>
          </div>

          <div>
            {faqData?.map((item, index) => (
              <Accordion
                key={index}
                item={item}
                isEditing={true}
                num={index + 1}
                className=""
                index={index}
                showFaqUpdateModal={showFaqUpdateModal}
                showFaqDeleteModal={showFaqDeleteModal}
              />
            ))}
          </div>
        </div>
      </div>
      {isFaqModalOpen && (
        <AddFAQ
          isFaqModalOpen={isFaqModalOpen}
          setIsFaqModalOpen={setIsFaqModalOpen}
        />
      )}
      {isFaqUpdateModalOpen && (
        <UpdateFAQ
          id={data?.data?._id}
          isFaqUpdateModalOpen={isFaqUpdateModalOpen}
          handleCancelFaqUpdateModal={handleCancelFaqUpdateModal}
          currentRecord={currentRecord}
        />
      )}
      {isFaqDeleteModalOpen && (
        <DeleteFAQModal
          id={data?.data?._id}
          isFaqDeleteModalOpen={isFaqDeleteModalOpen}
          handleCancelFaqDeleteModal={handleCancelFaqDeleteModal}
          currentRecord={currentRecord}
        />
      )}
    </div>
  );
};

export default FAQSection;
