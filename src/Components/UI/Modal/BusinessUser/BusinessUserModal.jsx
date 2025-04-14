/* eslint-disable react/prop-types */
import { Modal, Rate } from "antd";
import { AllImages } from "../../../../../public/images/AllImages";
import { HiBadgeCheck } from "react-icons/hi";
import {
  FaFacebook,
  FaInstagramSquare,
  FaMapMarkedAlt,
  FaPhone,
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

const services = [
  "Service 1",
  "Service 2",
  "Service 2",
  "Service 2",
  "Service 2",
  "Service 2",
  "Service 2",
];

const testimonials = [
  {
    id: 2,
    image: AllImages.user, // Replace with your actual image path
    name: "Sarah M.",
    role: "Home Care Specialist",
    message:
      "Providing care at home has been a rewarding experience. It's great to see families feel empowered and supported. Our services ensure patients are treated with dignity and respect, improving their quality of life.",
  },
  {
    id: 3,
    image: AllImages.user, // Replace with your actual image path
    name: "John D.",
    role: "Caregiver",
    message:
      "As a caregiver, I feel supported knowing that I have all the resources I need to care for my patient. The care plan and regular follow-ups ensure we're providing the best possible support.",
  },
  {
    id: 4,
    image: AllImages.user, // Replace with your actual image path
    name: "Emily R.",
    role: "Home Care Manager",
    message:
      "Managing home care services has been incredibly fulfilling. Our team works hard to ensure the comfort and safety of patients. It's wonderful to see the positive impact our care has on both patients and their families.",
  },
];

const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=-0.510375,51.286760,0.334015,51.691874&layer=mapnik";

const faqs = [
  {
    question: "What is the return policy?",
    answer:
      "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.",
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes, we offer gift cards for purchase in-store and online.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order has shipped, you will receive an email with a tracking number.",
  },
];

const BusinessUserModal = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="mt-7">
        {/* Images  */}
        <div>
          <img
            src={AllImages.coverPhoto}
            alt="cover"
            className="w-full h-52 object-cover "
          />
          <div className=" border border-secondary-color w-fit -mt-[32px] ml-2 z-40 isolate bg-white rounded-full p-1">
            <img
              src={AllImages.company}
              alt="cover"
              className="w-12 h-12 object-cover  "
            />
          </div>
        </div>
        <div>
          {/* Name  */}
          <div className="flex items-center gap-2 mt-6">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-base-color">
              {currentRecord?.name}
            </p>
            <HiBadgeCheck className="text-[#2196F3] text-2xl" />
            <span className="text-sm  text-secondary-color border border-secondary-color px-2 py-1 rounded-xl">
              Florist
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
                  450
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-base lg:text-lg font-semibold text-[#706C6C]">
                Likes
              </span>
              <div className="flex items-center space-x-2">
                <span className="sm:text-xl lg:text-2xl font-bold text-base-color">
                  287
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-base lg:text-lg font-semibold text-[#706C6C]">
                Comments
              </span>
              <div className="flex items-center space-x-2">
                <span className="sm:text-xl lg:text-2xl font-bold text-base-color">
                  30
                </span>
              </div>
            </div>
          </div>

          {/* Description  */}
          <p className="text-sm sm:text-base lg:text-lg text-[#262621] mt-4">
            Handcrafted floral arrangements for every occasion! 💐 Stunning
            bouquets and lasting artificial blooms, delivered with love! ✨🌸
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
                  Via Giuseppe Verdi, 123
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-[#F4E5FF] p-2 rounded-full">
                <FaPhone className="text-[#6A0DAD] text-2xl" />
              </div>
              <div>
                <p className="text-[#706C6C]">Phone</p>
                <p className=" font-semibold  text-sm">+39 06 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-[#F4E5FF] p-2 rounded-full">
                <IoIosMail className="text-[#6A0DAD] text-2xl" />
              </div>
              <div>
                <p className=" text-[#706C6C]">Email</p>
                <p className=" font-semibold  text-sm">info@fioridamore.it</p>
              </div>
            </div>
          </div>

          {/* Hours  */}
          <div className="flex items-center space-x-2 mt-4">
            <p className="text-sm sm:text-base lg:text-lg font-bold">Hours:</p>
            <p className="text-sm sm:text-base text-gray-600">
              Mon-Fri: 9 AM - 6 PM
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center space-x-3 mt-2">
            <p className=" text-sm sm:text-base lg:text-lg  font-bold">
              Social:
            </p>
            <div className="flex space-x-3">
              <FaFacebook className="text-xl text-[#1877f2] " />
              <FaInstagramSquare className="text-xl text-[#9A3AB2]" />
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg font-semibold border-2 border-[#E1E1E1] grid grid-cols-3">
            <div className="flex flex-col items-center justify-self-start">
              <p className="text-sm sm:text-base lg:text-lg">4.5</p>
              <Rate
                disabled
                defaultValue={4.5}
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
              <p className="text-sm sm:text-base lg:text-lg">Loved by guests</p>
              <img
                src={AllImages.rightLeaf}
                alt="cover"
                className="w-5 object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-self-end">
              <p className="text-sm sm:text-base lg:text-lg">26</p>
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
                {services.map((service, index) => (
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
                {services.map((service, index) => (
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
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <TestimonialCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Location */}
          <div className="mt-4">
            <p className="text-lg lg:text-xl font-bold mb-3">Location</p>
            <div className="map-container">
              <iframe
                src={mapUrl}
                width="100%"
                height="200px"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-4">
            <p className="text-lg lg:text-xl font-bold mb-3">FAQ</p>
            {faqs.map((faq, index) => (
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
    </Modal>
  );
};

export default BusinessUserModal;
