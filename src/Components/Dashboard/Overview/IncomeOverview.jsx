import { useState } from "react";
import YearOption from "../../../utils/YearOption";
import Bar_Chart from "../../Chart/BarChart";
import { useGetEarningRatioQuery } from "../../../redux/features/dashboard/dashboardApi";
import SpinnerLoader from "../../ui/SpinLoading";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isFetching } = useGetEarningRatioQuery({ year });

  const chartData = data?.data?.monthlyEarnings;

  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg flex flex-col"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl lg:text-3xl text-gradient-color font-bold mb-5">
          Income
        </p>
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <hr />
      <div>
        {isFetching ? <SpinnerLoader /> : <Bar_Chart chartData={chartData} />}
      </div>
    </div>
  );
};

export default IncomeOverview;
