/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";

const InspirationModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[700px]"
    >
      <div className="mt-7">
        <div className="">
          <div className="flex justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.coverPhoto}
              alt="cover"
              className="w-full h-40 object-cover rounded"
            />
          </div>

          <div className="mt-2">
            <div className="text-lg  ">
              <div className=" my-2">
                <span className="font-bold">{currentRecord?.postTitle}</span>
              </div>

              <div className="text-base">
                <span>{currentRecord?.description}</span>
                <p>
                  Planning a wedding is an exciting yet financially daunting
                  task. With so many elements to consider, from the venue to the
                  catering, photography, and attire, it’s essential to have a
                  well-structured budget in place. A wedding budget calculator
                  helps you manage costs effectively and ensures that your dream
                  wedding doesn’t turn into a financial nightmare. Step 1:
                  Determine Your Total Budget The first step in planning your
                  wedding finances is to determine how much you are willing to
                  spend. Consider your savings, contributions from family, and
                  any other sources of funds. Be realistic about what you can
                  afford and avoid taking on excessive debt. Step 2: Prioritize
                  Your Expenses Make a list of all possible wedding expenses and
                  categorize them into priorities. Common categories include:
                  Venue & Catering – The largest expense, typically around
                  40-50% of your budget. Photography & Videography – Capturing
                  memories is important, so allocate around 10-15%. Attire &
                  Accessories – Wedding dresses, suits, shoes, and jewelry may
                  take up 5-10%. Decor & Flowers – Can range from 5-15%
                  depending on your style. Entertainment & Music – Budget 5-10%
                  for a DJ, band, or live entertainment. Invitations &
                  Stationery – Digital or printed invitations might cost 2-5%.
                  Miscellaneous Expenses – Gifts, favors, marriage license fees,
                  and unforeseen costs (5-10%).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InspirationModal;
