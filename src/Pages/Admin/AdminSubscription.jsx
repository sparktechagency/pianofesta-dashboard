import { Button } from "antd";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import SubscriptionCard from "../../Components/Dashboard/Subscription/SubscriptionCard";
import AddSubscriptionModal from "../../Components/UI/Modal/Subscription/AddSubscriptionModal";
import DeleteSubscriptionModal from "../../Components/UI/Modal/Subscription/DeleteSubscriptionModal";
import UpdateSubscriptionModal from "../../Components/UI/Modal/Subscription/UpdateSubscriptionModal";

const subscription = [
  {
    name: "Basic",
    price: 9.99,
    duration: 30,
    features: [
      "10 Property Searches",
      "Value Estimate",
      "Rent Estimate",
      "Return Metrics",
    ],
  },
  {
    name: "Pro",
    price: 14.99,
    duration: 30,
    features: [
      "50 Property Searches",
      "Value Estimate",
      "Rent Estimate",
      "Return Metrics",
      "Comparable Properties",
      "Estimated Expenses",
      "Cash Flow & Equity Accumulation Model",
    ],
  },
  {
    name: "Premium",
    price: 29.99,
    duration: 30,
    features: [
      "Unlimited Property Searches",
      "Value Estimate",
      "Rent Estimate",
      "Return Metrics",
      "Comparable Properties",
      "Estimated Expenses",
      "Cash Flow & Equity Accumulation Model",
      "Market Insights",
      "Exclusive early beta feature access",
    ],
  },
];

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  //   const { data, isFetching } = useGetSubscriptionQuery();
  //   const subscription = data?.data;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showUpdateModal = (record) => {
    setCurrentRecord(record);
    setIsUpdateModalOpen(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleCancelUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentRecord(null);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentRecord(null);
  };

  return (
    <div
      className=" min-h-screen py-4 px-4 sm:px-6 md:px-8 rounded-lg pb-20"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="w-full sm:w-[90%] mt-10 mx-auto">
        {" "}
        <div className="flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-center mb-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gradient-color font-semibold">
            Subscription
          </h1>
          <Button
            type="primary"
            onClick={showModal}
            className="flex items-center gap-1 sm:gap-3 !bg-secondary-color !text-primary-color h-10 font-semibold border-none"
          >
            <GoPlus className="text-xl text-primary-color" />
            <p className="text-xs sm:text-lg py-3">Add subscription</p>
          </Button>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-start gap-20">
          {/* {isFetching ? (
            <div>
              <Loading />
            </div>
          ) : ( */}
          {subscription?.map((sub, index) => (
            <SubscriptionCard
              key={index}
              sub={sub}
              showUpdateModal={showUpdateModal}
              showDeleteModal={showDeleteModal}
            />
          ))}
          {/* )} */}
        </div>
      </div>

      <AddSubscriptionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <UpdateSubscriptionModal
        isUpdateModalOpen={isUpdateModalOpen}
        handleCancelUpdateModal={handleCancelUpdateModal}
        currentRecord={currentRecord}
      />

      <DeleteSubscriptionModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleCancelDeleteModal={handleCancelDeleteModal}
        currentRecord={currentRecord}
      />
    </div>
  );
}
