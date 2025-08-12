import { useState, useRef } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import Loading from "../../ui/Loading";
import { useSendMassNotificationMutation } from "../../../redux/features/sendNotification/sendNotificationApi";
import tryCatchWrapper from "../../../utils/TryCatchWraper";
import { googleMapsApiKey } from "../../../helpers/config/envConfig";

const { Option } = Select;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 41.9028, // Latitude for Rome, Italy
  lng: 12.4964, // Longitude for Rome, Italy
};

const libraries = ["places"];

const MassNotification = ({ activeTab }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey(), // Replace this
    libraries,
  });

  const [sendMassNotification] = useSendMassNotificationMutation();
  const { data, isFetching } = useGetProfileQuery(undefined, {
    skip: activeTab !== "massMessage",
  });

  const profileData = data?.data;
  const profileImage = profileData?.profileImage;

  const [form] = Form.useForm();
  const autocompleteRef = useRef(null);

  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    lat: null,
    lng: null,
  });

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const fullAddress = place.name || place.formatted_address || "";
      setSelectedLocation({
        name: fullAddress,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      form.setFieldsValue({ location: fullAddress });
    }
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat, lng };
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          // Try to find best detailed address result:
          const detailedResult =
            results.find(
              (r) =>
                r.types.includes("street_address") ||
                r.types.includes("route") ||
                r.types.includes("locality")
            ) || results[0]; // fallback to first result

          const fullAddress = detailedResult.formatted_address || "";

          setSelectedLocation({
            name: fullAddress,
            lat,
            lng,
          });
          form.setFieldsValue({ location: fullAddress });
        }
      });
    }
  };

  const handleSave = async (values) => {
    const payload = {
      location: {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      },
      rangeKm: Number(values.Range),
      category: values.category,
      message: {
        image: profileImage || "",
        text: values.message,
      },
    };

    console.log("Payload to send backend:", payload);

    const res = await tryCatchWrapper(
      sendMassNotification,
      { body: payload },
      "Sending Notification..."
    );

    console.log("response from backend:", res);
    if (res?.statusCode === 200) {
      setSelectedLocation({
        name: "",
        lat: null,
        lng: null,
      });
      form.resetFields();
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded || isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="space-y-5"
      >
        {/* Location with Google Autocomplete */}
        <Typography.Title level={5}>Location</Typography.Title>
        <Form.Item
          name="location"
          rules={[{ required: true, message: "Please select a location!" }]}
          style={{ fontWeight: "500" }}
        >
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              placeholder="Search Location"
              value={selectedLocation.name}
              onChange={(e) => {
                setSelectedLocation({
                  ...selectedLocation,
                  name: e.target.value,
                });
                form.setFieldsValue({ location: e.target.value });
              }}
              className="font-medium h-12 border !border-secondary-color rounded-md text-xl"
            />
          </Autocomplete>
        </Form.Item>

        {/* Google Map for selecting location */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            selectedLocation.lat && selectedLocation.lng
              ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
              : defaultCenter
          }
          zoom={selectedLocation.lat && selectedLocation.lng ? 15 : 10}
          onClick={handleMapClick}
        >
          {selectedLocation.lat && selectedLocation.lng && (
            <Marker
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
            />
          )}
        </GoogleMap>

        {/* Range */}
        <Typography.Title level={5}>Range</Typography.Title>
        <Form.Item
          name="Range"
          rules={[{ required: true, message: "Please select a Range!" }]}
          style={{ fontWeight: "500" }}
        >
          <Select
            placeholder="Select Range"
            className="font-medium h-12 border !border-secondary-color rounded-md"
          >
            {[1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((km) => (
              <Option key={km} value={km.toString()}>
                {km} KM
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Categories */}
        <Typography.Title level={5}>Categories</Typography.Title>
        <Form.Item
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
          style={{ fontWeight: "500" }}
        >
          <Select
            placeholder="All Categories"
            className="font-medium h-12 border !border-secondary-color rounded-md"
          >
            <Option value="all">All Categories</Option>
            <Option value="event">Events</Option>
            <Option value="business">Business</Option>
          </Select>
        </Form.Item>

        {/* Message */}
        <Typography.Title level={5}>Message</Typography.Title>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
          style={{ fontWeight: "500" }}
        >
          <Input.TextArea
            rows={5}
            placeholder="Type Your Message Here"
            className="font-medium h-12 border !border-secondary-color rounded-md text-xl"
          />
        </Form.Item>

        {/* Send Button */}
        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full h-12 !bg-gradient-to-b from-[#8F59F9] to-[#6A0DAD] border !border-secondary-color !text-white text-base sm:text-lg font-bold rounded-md"
          >
            Send Notification
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MassNotification;
