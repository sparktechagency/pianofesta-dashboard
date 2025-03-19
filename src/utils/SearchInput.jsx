import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";

const SearchInput = ({ placeholder, setSearch }) => {
  const handleSearch = (e) => {
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((value) => {
    setSearch(value);
  }, 500);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  return (
    <div className="flex gap-4 items-center">
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorTextPlaceholder: "#667185",
              colorIcon: "#667185",
            },
          },
        }}
      >
        <Input
          placeholder={placeholder}
          onChange={handleSearch}
          className="text-lg text-base-color border-2 !border-[#D0D5DD] !bg-transparent py-2 !rounded-lg md:!w-72 lg:!w-80 !ring-0"
          prefix={<SearchOutlined className="text-[#667185]  text-xl mr-2" />}
        />
      </ConfigProvider>
    </div>
  );
};

export default SearchInput;
