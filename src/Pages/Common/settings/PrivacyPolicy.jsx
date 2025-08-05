import { useState } from "react";
import PrivacyPolicyForUser from "./PrivacyPolicyForUser";
import PrivacyPolicyForBusiness from "./PrivacyPolicyForBusiness";

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState("regularUser");

  return (
    <div
      className=" min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          Privacy policy
        </p>
      </div>
      <div className="flex items-center gap-2 bg-gradient rounded-lg p-3 mb-10">
        <p
          onClick={() => setActiveTab("regularUser")}
          className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
            activeTab === "regularUser"
              ? "border-b-2 border-secondary-color text-secondary-color"
              : "text-[#717375] border-b-2 border-transparent"
          }`}
        >
          Regular User
        </p>
        <p
          onClick={() => setActiveTab("businessUser")}
          className={`text-base sm:text-lg lg:text-xl font-semibold cursor-pointer p-1  ${
            activeTab === "businessUser"
              ? "border-b-2 border-secondary-color text-secondary-color"
              : "text-[#717375] border-b-2 border-transparent"
          }`}
        >
          Business User
        </p>
      </div>
      {activeTab === "regularUser" ? (
        <PrivacyPolicyForUser />
      ) : (
        <PrivacyPolicyForBusiness />
      )}
    </div>
  );
};
export default PrivacyPolicy;
