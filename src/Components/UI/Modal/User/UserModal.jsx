/* eslint-disable react/prop-types */
import { Button, Modal, Rate } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";

const UserModal = ({ isUserViewModalVisible, handleCancel, currentRecord }) => {
  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={AllImages.user}
              alt={currentRecord?.Name}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {currentRecord?.Name}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Rate
              allowHalf
              defaultValue={currentRecord?.Rating}
              style={{ color: "#FF8510", fontSize: 16 }}
              disabled
            />
            <span>{currentRecord?.Rating} Rating</span>
          </div>
          <div className="mt-2">
            <div className="text-lg text-center font-medium ">
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className="">Role: </div>
                <div className="text-secondary-color">
                  {currentRecord?.Role}
                </div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Plan:</div>
                <div>{currentRecord?.Plan}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Location:</div>
                <div>{currentRecord?.Location}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Joined:</div>
                <div className="text-justify pt-0 ">
                  {currentRecord?.Joined}
                </div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Status:</div>
                <div className="text-justify pt-0 ">
                  {currentRecord?.Status === "Unverified" ? (
                    <span className="text-[#ff766a]">
                      {currentRecord?.Status}
                    </span>
                  ) : (
                    <span className="text-secondary-color">
                      {currentRecord?.Status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              {currentRecord?.Status === "Unverified" && (
                <Button className="!bg-secondary-color !text-primary-color text-lg font-medium py-5">
                  Verify Profile
                </Button>
              )}
              <Button className="!bg-[#ff8510] !text-primary-color text-lg font-medium py-5">
                View Documents
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
