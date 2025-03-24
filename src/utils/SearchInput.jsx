import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";

const SearchInput = ({ placeholder, setSearch, setPage, textValue }) => {
  const handleSearch = (e) => {
    setPage(1);
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
              colorTextPlaceholder: "#6A0DAD",
              colorIcon: "#6A0DAD",
            },
          },
        }}
      >
        <Input
          placeholder={placeholder}
          onChange={handleSearch}
          value={textValue}
          className="text-secondary-color font-semibold !border-secondary-color !bg-transparent py-2 !rounded-xl"
          prefix={<SearchOutlined className="text-[#667185]  text-xl mr-2" />}
        />
      </ConfigProvider>
    </div>
  );
};

export default SearchInput;
