import { useState } from "react";
import NotificationTable from "../../Components/ui/Tables/NotificationTable";
import DirectNotification from "../../Components/Dashboard/AdminMessageAndComment/DirectNotificationForm";
import MassNotification from "../../Components/Dashboard/AdminMessageAndComment/MassNotification";
import { useGetAllCommunicationNotificationQuery } from "../../redux/features/sendNotification/sendNotificationApi";

const AdminNotification = () => {
  const [page, setPage] = useState(1);

  const limit = 12;
  const [activeTab, setActiveTab] = useState("directMessages");
  const { data, isFetching } = useGetAllCommunicationNotificationQuery(
    {
      page,
      limit,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== "communicationHistory",
    }
  );

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 bg-gradient rounded-lg p-3">
          <p
            onClick={() => setActiveTab("directMessages")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "directMessages"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Direct Notification
          </p>
          <p
            onClick={() => setActiveTab("massMessage")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "massMessage"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Mass Notification
          </p>
          <p
            onClick={() => setActiveTab("communicationHistory")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "communicationHistory"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Communication History
          </p>
        </div>
      </div>

      <div className=" bg-primary-color min-h-[70vh] rounded-xl px-4">
        {activeTab === "directMessages" ? (
          <div className="bg-primary-color w-1/2 py-4  ">
            <DirectNotification />
          </div>
        ) : activeTab === "massMessage" ? (
          <div className="bg-primary-color w-1/2 py-4  ">
            {/* <LoadScript
              googleMapsApiKey={googleMapsApiKey()}
              libraries={["places"]}
            > */}
            <MassNotification activeTab={activeTab} />
            {/* </LoadScript> */}
          </div>
        ) : (
          <div className="bg-primary-color  py-4  ">
            <NotificationTable
              data={data?.data}
              loading={isFetching}
              setPage={setPage}
              page={page}
              total={data?.data?.length}
              limit={limit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotification;
