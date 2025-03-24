import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";

const YearOption = ({ currentYear, setThisYear }) => {
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const startYear = 2020;
    const yearRange = [];

    // Add the next 3 years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);
  return (
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
        defaultValue={currentYear >= 2025 ? "2025" : currentYear.toString()}
        style={{ width: 100 }}
        options={yearOptions}
        onChange={(value) => setThisYear(value)}
      />
    </ConfigProvider>
  );
};

export default YearOption;
