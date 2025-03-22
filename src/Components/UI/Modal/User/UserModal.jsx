/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";

const UserModal = ({ isUserViewModalVisible, handleCancel, currentRecord }) => {
  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-color text-center">
            User Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
            See all details about {currentRecord?.name}
          </p>
          <div className="flex justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.user}
              alt={currentRecord?.name}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.name}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="">{currentRecord?.name}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Gender:</span>
                <span>{currentRecord?.gender}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Joining Date :</span>
                <span className="text-justify pt-0 ">
                  {currentRecord?.Joined}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
