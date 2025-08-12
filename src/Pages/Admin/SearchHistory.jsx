import { useState } from "react";
import SearchHistoryTable from "../../Components/ui/Tables/SearchHistoryTable";
import SendNotificationModal from "../../Components/ui/Modal/SearchHistory/SendNotificationModal";
import { useGetSearchHistoryQuery } from "../../redux/features/searchHistory/searchHistory";

const SearchHistory = () => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

  const limit = 12;
  const { data, isFetching } = useGetSearchHistoryQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const searchHistoryData = data?.data;
  const totalSearchHistory = data?.meta?.total;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div>
      <div
        className="mt-5 bg-primary-color rounded-xl px-4"
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      >
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between my-5">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gradient-color font-semibold">
              Search History
            </p>
          </div>
        </div>
        <SearchHistoryTable
          data={searchHistoryData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={totalSearchHistory}
          limit={limit}
        />
        <SendNotificationModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default SearchHistory;
