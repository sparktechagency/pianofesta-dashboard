import Area_Chart from "../../Chart/AreaChart";
import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import { ConfigProvider, Select } from "antd";
import { useGetUserRatioQuery } from "../../../redux/features/dashboard/dashboardApi";
import SpinnerLoader from "../../ui/SpinLoading";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [role, setRole] = useState("user");

  const { data, isFetching } = useGetUserRatioQuery({ year, role });

  const chartData = data?.data?.userOverview;
  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl text-gradient-color lg:text-3xl font-bold mb-5">
          User Overview
        </p>
        <div className="flex items-center gap-2">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorTextQuaternary: "#F9FAFB",
                  fontSize: 16,
                  borderRadius: 10,
                  colorBorder: "#6A0DAD",
                  colorText: "#FFFFFF",
                  colorIcon: "#F9FAFB",
                  colorBgContainer: "rgba(0,0,0,0)",
                  optionSelectedColor: "#6A0DAD",
                  optionSelectedBg: "#F9FAFB",
                  optionActiveColor: "#F9FAFB",

                  colorBgElevated: "#6A0DAD",
                  selectorBg: "#6A0DAD",
                  colorTextPlaceholder: "#F9FAFB",
                },
              },
            }}
          >
            <Select
              value={role}
              onChange={(value) => setRole(value)}
              placeholder="Select User"
              style={{ width: 150 }}
            >
              <Select.Option value="user">Regular User</Select.Option>
              <Select.Option value="organizer">Business User</Select.Option>
            </Select>
          </ConfigProvider>
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        {isFetching ? <SpinnerLoader /> : <Area_Chart chartData={chartData} />}
      </div>
    </div>
  );
};

export default UserOverview;
