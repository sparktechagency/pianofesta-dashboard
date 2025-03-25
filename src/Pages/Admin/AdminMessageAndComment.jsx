import { useState } from "react";
import DirectMessages from "../../Components/Dashboard/AdminMessageAndComment/DirectMessagesForm";
import MassMessageForm from "../../Components/Dashboard/AdminMessageAndComment/MassMessage";
import messageData from "../../../public/data/messageData";
import MessageTable from "../../Components/UI/Tables/MessageTable";

const AdminMessageAndComment = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

  const limit = 12;
  const [activeTab, setActiveTab] = useState("directMessages");

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
            Direct Messages
          </p>
          <p
            onClick={() => setActiveTab("massMessage")}
            className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
              activeTab === "massMessage"
                ? "border-b-2 border-secondary-color text-secondary-color"
                : "text-[#717375] border-b-2 border-transparent"
            }`}
          >
            Mass Message
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
            <DirectMessages />
          </div>
        ) : activeTab === "massMessage" ? (
          <div className="bg-primary-color w-1/2 py-4  ">
            <MassMessageForm />
          </div>
        ) : (
          <div className="bg-primary-color  py-4  ">
            <MessageTable
              data={messageData}
              loading={false}
              setPage={setPage}
              page={page}
              total={messageData.length}
              limit={limit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessageAndComment;
