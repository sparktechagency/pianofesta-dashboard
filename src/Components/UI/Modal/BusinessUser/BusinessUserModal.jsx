/* eslint-disable react/prop-types */
import { Modal, Rate } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";
import { HiBadgeCheck } from "react-icons/hi";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMapMarkedAlt,
  FaPhone,
  FaTiktok,
  FaTwitterSquare,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import TestimonialCard from "../../../../utils/TestimonialCard";
import Accordion from "../../Accordion";
import { useBusinessUserByIdQuery } from "../../../../redux/features/userManagement/userManagementApi";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import BusinessLocationMap from "../../../../Pages/Admin/AdminUserManagement/BusinessLocationMap";
import { googleMapsApiKey } from "../../../../helpers/config/envConfig";

const BusinessUserModal = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const { data, isFetching } = useBusinessUserByIdQuery(
    {
      id: currentRecord?.parentBusiness,
    },
    {
      skip: !isUserViewModalVisible || !currentRecord?.parentBusiness,
    }
  );

  const businessUser = data?.data;

  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      {isFetching ? (
        <div className="h-[50vh] flex justify-center items-center">
          <FadeLoader color="#6A0DAD" />
        </div>
      ) : (
        <div className="mt-7">
          {/* Images  */}
          <div>
            <img
              src={businessUser?.coverImage || AllImages.coverPhoto}
              alt="cover"
              className="w-full h-52 object-cover "
            />
            <div className=" border border-secondary-color w-fit -mt-[32px] ml-2 z-40 isolate bg-white rounded-full">
              <img
                src={businessUser?.logo || AllImages.company}
                alt="cover"
                className="w-16 h-16 object-cover  rounded-full "
              />
            </div>
          </div>
          <div>
            {/* Name  */}
            <div className="flex items-center gap-2 mt-6">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-base-color">
                {businessUser?.name}
              </p>
              {businessUser?.blueVerifiedBadge && (
                <HiBadgeCheck className="text-[#2196F3] text-2xl" />
              )}
              <span className="text-sm  text-secondary-color border border-secondary-color px-2 py-1 rounded-xl">
                {businessUser?.categoryName}
              </span>
            </div>

            {/* Followers, Likes, Comments  */}
            <div className="flex items-center space-x-8 mt-4">
              <div className="flex flex-col items-center">
                <span className="text-base lg:text-lg font-semibold text-[#706C6C]">
                  Followers
                </span>
                <div className="flex items-center space-x-2">
                  <span className=" sm:text-xl lg:text-2xl font-bold text-base-color">
                    {businessUser?.totalFollowers}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base lg:text-lg font-semibold text-[#706C6C]">
                  Likes
                </span>
                <div className="flex items-center space-x-2">
                  <span className="sm:text-xl lg:text-2xl font-bold text-base-color">
                    {businessUser?.totalLikes}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base lg:text-lg font-semibold text-[#706C6C]">
                  Comments
                </span>
                <div className="flex items-center space-x-2">
                  <span className="sm:text-xl lg:text-2xl font-bold text-base-color">
                    {businessUser?.totalComments}
                  </span>
                </div>
              </div>
            </div>

            {/* Description  */}
            <p className="text-sm sm:text-base lg:text-lg text-[#262621] mt-4">
              {businessUser?.detailDescription}
            </p>

            {/* Address, Phone, Email  */}
            <div className="space-y-4 mt-4">
              <div className="flex items-center space-x-3">
                <div className="bg-[#F4E5FF] p-2 rounded-full">
                  <FaMapMarkedAlt className="text-[#6A0DAD] text-2xl" />
                </div>
                <div>
                  <p className="text-[#706C6C]">Address</p>
                  <p className=" font-semibold  text-sm">
                    {businessUser?.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#F4E5FF] p-2 rounded-full">
                  <FaPhone className="text-[#6A0DAD] text-2xl" />
                </div>
                <div>
                  <p className="text-[#706C6C]">Phone</p>
                  <p className=" font-semibold  text-sm">
                    {businessUser?.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-[#F4E5FF] p-2 rounded-full">
                  <IoIosMail className="text-[#6A0DAD] text-2xl" />
                </div>
                <div>
                  <p className=" text-[#706C6C]">Email</p>
                  <p className=" font-semibold  text-sm">
                    {businessUser?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours  */}
            <div className="flex items-start space-x-2 mt-4">
              <p className="text-sm sm:text-base lg:text-lg font-bold">
                Hours:
              </p>
              <div>
                {businessUser?.availabilities?.day?.map((day) => (
                  <p key={day} className="text-sm sm:text-base text-gray-600">
                    {day}: {businessUser?.availabilities?.startTime} -
                    {businessUser?.availabilities?.endTime}
                  </p>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center space-x-3 mt-2">
              <p className=" text-sm sm:text-base lg:text-lg  font-bold">
                Social:
              </p>
              <div className="flex space-x-3">
                {businessUser?.socialLinks?.facebook && (
                  <Link
                    to={businessUser.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookSquare className="text-xl text-[#3B5998]" />
                  </Link>
                )}
                {businessUser?.socialLinks?.instagram && (
                  <Link
                    to={businessUser.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagramSquare className="text-xl text-[#E1306C]" />
                  </Link>
                )}
                {businessUser?.socialLinks?.twitter && (
                  <Link
                    to={businessUser.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitterSquare className="text-xl text-[#1DA1F2]" />
                  </Link>
                )}
                {businessUser?.socialLinks?.tiktok && (
                  <Link
                    to={businessUser.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTiktok className="text-xl text-black" />
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg font-semibold border-2 border-[#E1E1E1] grid grid-cols-3">
              <div className="flex flex-col items-center justify-self-start">
                <p className="text-sm sm:text-base lg:text-lg">
                  {businessUser?.averageRating ?? "N/A"}
                </p>
                <Rate
                  disabled
                  value={
                    businessUser?.averageRating
                      ? businessUser?.averageRating
                      : 0
                  }
                  allowHalf
                  className="text-sm text-[#000000]"
                />
              </div>

              <div className="flex items-center gap-1 text-center">
                <img
                  src={AllImages.leftLeaf}
                  alt="cover"
                  className="w-5 object-cover"
                />
                <p className="text-sm sm:text-base lg:text-lg">
                  Loved by guests
                </p>
                <img
                  src={AllImages.rightLeaf}
                  alt="cover"
                  className="w-5 object-cover"
                />
              </div>

              <div className="flex flex-col items-center justify-self-end">
                <p className="text-sm sm:text-base lg:text-lg">
                  {businessUser?.totalReviews ?? 0}
                </p>
                <p className="text-xs sm:text-sm lg:text-base">Reviews</p>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-5 mt-4">
              {/* Supported Events Section */}
              <div className="">
                <h2 className="text-lg lg:text-xl font-bold ">
                  Supported Events
                </h2>
                <ul className="list-disc list-inside mt-2.5 space-y-2">
                  {businessUser?.supportedServices?.map((service, index) => (
                    <li key={index} className="text-base lg:text-lg">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Services Section */}
              <div className="">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                  Additional Services
                </h2>
                <ul className="list-disc list-inside mt-2.5 space-y-2">
                  {businessUser?.additionalServices?.map((service, index) => (
                    <li key={index} className="text-base lg:text-lg">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-4">
              <p className="text-lg lg:text-xl font-bold mb-3">Reviews</p>
              <Swiper
                slidesPerView={1}
                spaceBetween={50}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                }}
                modules={[EffectFade, Autoplay]}
                className="mySwiper px-5 md:px-10 py-10"
              >
                {businessUser?.reviews?.map((item) => (
                  <SwiperSlide key={item?._id}>
                    <TestimonialCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Location */}
            <div className="mt-4">
              <p className="text-lg lg:text-xl font-bold mb-3">Location</p>
              <BusinessLocationMap
                apiKey={googleMapsApiKey()}
                coordinates={businessUser?.location?.coordinates}
                name={businessUser?.name}
                description={businessUser?.description}
              />
            </div>

            {/* FAQ */}
            <div className="mt-4">
              <p className="text-lg lg:text-xl font-bold mb-3">FAQ</p>
              {businessUser?.faq?.map((faq, index) => (
                <Accordion
                  isEditing={false}
                  key={index + 1}
                  num={index + 1}
                  item={faq}
                  className=""
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BusinessUserModal;
