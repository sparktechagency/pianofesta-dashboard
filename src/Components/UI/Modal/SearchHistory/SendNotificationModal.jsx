/* eslint-disable react/prop-types */
import { Button, Form, Modal, Typography, Select } from "antd";
import {
  useGetBusinessNameQuery,
  useSendBusinessNotificationMutation,
} from "../../../../redux/features/searchHistory/searchHistory";
import { useGetProfileQuery } from "../../../../redux/features/profile/profileApi";
import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { FadeLoader } from "react-spinners";

const SendNotificationModal = ({ isViewModalVisible, handleCancel }) => {
  const [search, setSearch] = useState("");
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);

  const { data, isFetching } = useGetProfileQuery(undefined, {
    skip: !isViewModalVisible,
  });

  const { data: businessNameData, isFetching: isFetchingBusinessName } =
    useGetBusinessNameQuery(
      {
        page: 1,
        limit: 20,
        searchTerm: search,
      },
      {
        refetchOnMountOrArgChange: isViewModalVisible,
        refetchOnReconnect: true,
        skip: !isViewModalVisible || isFetching,
      }
    );

  const profileData = data?.data;
  const profileImage = profileData?.profileImage;
  const allBusinessName = businessNameData?.data?.result || [];

  const [sendBusinessNotification] = useSendBusinessNotificationMutation();
  const [form] = Form.useForm();

  // Debounce search
  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 200),
    []
  );

  const handleBusinessChange = (selectedIds) => {
    // merge new selections with existing state
    const newSelected = [
      ...selectedBusinesses,
      ...allBusinessName.filter(
        (b) =>
          selectedIds.includes(b._id) &&
          !selectedBusinesses.some((s) => s._id === b._id)
      ),
    ];

    // remove deselected items
    const filteredSelected = newSelected.filter((b) =>
      selectedIds.includes(b._id)
    );

    setSelectedBusinesses(filteredSelected);
  };

  const handleSave = async (values) => {
    // Get authors from selected businesses
    const receiverIds = [
      ...new Set(selectedBusinesses.map((b) => b.author)), // removes duplicates
    ];

    const payload = {
      message: {
        image: profileImage,
        text: values.message,
      },
      receiverIds,
    };

    console.log("payload sent to backend:", payload);

    const res = await sendBusinessNotification(payload);
    if (res?.data?.statusCode === 200) {
      handleCancel();
      setSearch("");
      form.resetFields();
    }
  };

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={() => {
        handleCancel();
        form.resetFields();
        setSearch("");
      }}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      {isFetching ? (
        <div className="w-full h-[400px] flex justify-center items-center">
          <FadeLoader color="#6A0DAD" />
        </div>
      ) : (
        <div className="mt-7">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            className="mt-7"
          >
            <Typography.Title level={5}>Search Business</Typography.Title>
            <Form.Item
              name="business"
              rules={[
                { required: true, message: "Please select business(es)!" },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Search and select business"
                onSearch={debounceSearch}
                filterOption={false}
                loading={isFetchingBusinessName}
                onChange={handleBusinessChange} // track selection changes
                value={selectedBusinesses.map((b) => b._id)}
                options={allBusinessName.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              />
            </Form.Item>

            <Typography.Title level={5}>Message</Typography.Title>
            <Form.Item
              name="message"
              rules={[{ required: true, message: "Please input the message!" }]}
            >
              <textarea
                rows={5}
                placeholder="Enter message"
                className="w-full border border-secondary-color rounded-md p-3 text-base placeholder:text-[#B5B5B5] bg-input-color"
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-12 !bg-gradient-to-b from-[#8F59F9] to-[#6A0DAD] border !border-secondary-color !text-white text-base sm:text-lg font-bold rounded-md"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default SendNotificationModal;
