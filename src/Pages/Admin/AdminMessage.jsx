"use client";
import { useEffect, useRef, useState } from "react";
import { Layout, Menu, Card, Input, ConfigProvider, Typography } from "antd";
import { BarsOutlined, SearchOutlined } from "@ant-design/icons";
import { FaTelegramPlane } from "react-icons/fa";
import { AllImages } from "../../../public/images/AllImages";

const { Header, Content, Sider } = Layout;

const AdminMessage = () => {
  const [conversations] = useState([
    {
      id: 1,
      user: "Alice",
      lastMessageTime: "10:30 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "How are you?",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "I'm fine, thanks!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "What about you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Doing great!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 6,
          text: "Hello!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 7,
          text: "How are you?",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 8,
          text: "I'm fine, thanks!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 9,
          text: "What about you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 10,
          text: "Doing great!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 11,
          text: "Hello!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 12,
          text: "How are you?",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 13,
          text: "I'm fine, thanks!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 14,
          text: "What about you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 15,
          text: "Doing great!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 16,
          text: "Hello!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 17,
          text: "How are you?",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
        {
          id: 18,
          text: "I'm fine, thanks!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 19,
          text: "What about you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 20,
          text: "Doing great!",
          sender: "Alice",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 2,
      user: "Bob",
      lastMessageTime: "11:15 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hi!",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "How's it going?",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 3,
          text: "Pretty good, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "Great!",
          sender: "Bob",
          senderRole: "user",
          unread: false,
        },
        {
          id: 5,
          text: "Good to hear!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 3,
      user: "Charlie",
      lastMessageTime: "09:45 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hey!",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "Long time no see.",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
        {
          id: 3,
          text: "Indeed!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "How have you been?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Busy but good.",
          sender: "Charlie",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 4,
      user: "David",
      lastMessageTime: "08:50 AM",
      senderRole: "admin",
      messages: [
        {
          id: 1,
          text: "Good morning!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 2,
          text: "Good morning to you too!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Have a nice day!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 4,
          text: "You too!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Take care!",
          sender: "David",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 5,
      user: "Eve",
      lastMessageTime: "10:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "How are you?",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "I'm good. You?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Doing well, thanks!",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
        {
          id: 4,
          text: "Great to hear!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Let's catch up soon.",
          sender: "Eve",
          senderRole: "user",
          unread: true,
        },
      ],
    },
    {
      id: 6,
      user: "Frank",
      lastMessageTime: "11:30 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "See you later!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Sure, bye!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Take care!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 4,
          text: "You too!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 5,
          text: "Catch you later!",
          sender: "Frank",
          senderRole: "user",
          unread: false,
        },
      ],
    },
    {
      id: 7,
      user: "Grace",
      lastMessageTime: "09:20 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Bye!",
          sender: "Grace",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "See you!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Catch you later!",
          sender: "Grace",
          senderRole: "user",
          unread: true,
        },
        {
          id: 4,
          text: "Sure!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 8,
      user: "Hank",
      lastMessageTime: "08:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "What's up?",
          sender: "Hank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Not much, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Same here.",
          sender: "Hank",
          senderRole: "user",
          unread: false,
        },
        {
          id: 4,
          text: "Alright.",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 9,
      user: "Ivy",
      lastMessageTime: "09:10 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Hello again!",
          sender: "Ivy",
          senderRole: "user",
          unread: true,
        },
        {
          id: 2,
          text: "Hi Ivy!",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "How have you been?",
          sender: "Ivy",
          senderRole: "user",
          unread: true,
        },
        {
          id: 4,
          text: "Pretty good, you?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
    {
      id: 10,
      user: "Jack",
      lastMessageTime: "11:00 AM",
      senderRole: "user",
      messages: [
        {
          id: 1,
          text: "Long time no see!",
          sender: "Jack",
          senderRole: "user",
          unread: false,
        },
        {
          id: 2,
          text: "Indeed, how have you been?",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
        {
          id: 3,
          text: "Busy, but good.",
          sender: "Jack",
          senderRole: "user",
          unread: false,
        },
        {
          id: 4,
          text: "That's good to hear.",
          sender: "You",
          senderRole: "admin",
          unread: false,
        },
      ],
    },
  ]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <Layout
        className="!bg-[#FFFFFF] !overflow-hidden"
        style={{ height: "88vh", boxShadow: "0px 0px 2px 1px #00000040" }}
      >
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                siderBg: "rgb(255, 255, 255)",
              },
              Menu: {
                iconSize: 24,
                itemActiveBg: "#ffffff",
                itemActiveColor: "#ECDEEC",
                itemHoverColor: "#000000",
                itemColor: "#000000",
                itemSelectedBg: "#ECDEEC",
                itemSelectedColor: "#000000",
                iconColor: "#000000",
                subMenuItemBg: "#F9FAFB11",
              },
            },
          }}
        >
          <Layout className="!bg-[#FFFFFF]">
            <Sider
              width={350}
              trigger={null}
              breakpoint="lg"
              collapsedWidth="0"
              collapsible
              collapsed={collapsed}
              className={`!bg-[#FFFFFF] m-2  duration-200 `}
            >
              <div className="sticky top-0 z-20 !bg-[#FFFFFF]  py-5 mb-3 ">
                <div className=" flex justify-between items-center pe-4  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold mt-3">
                  Messages
                </div>
                <Input
                  placeholder="Search Conversations"
                  prefix={<SearchOutlined />}
                  className=" text-base-color mt-2 py-3 px-2 w-full"
                  onChange={handleSearch}
                />
              </div>
              <div className="md:h-full h-fit !overflow-y-auto">
                <Menu mode="vertical" className=" !pb-40">
                  {filteredConversations.map((conversation) => (
                    <Menu.Item
                      key={conversation.id}
                      onClick={() => handleConversationSelect(conversation)}
                      className={` py-10  border-b border-gray-200 bg-[#FFFFFF] text-black `}
                    >
                      <div className="-mt-6 flex justify-between ">
                        <div className="flex items-center gap-2">
                          <img
                            className="rounded aspect-square h-12 w-fit object-cover relative"
                            src={AllImages.profile}
                            alt="Profile"
                          />
                          <div>
                            <div className="text-xl">{conversation.user}</div>
                            <div className="text-sm">Okay, I got you</div>
                          </div>
                        </div>
                        <div className="text-sm">
                          {conversation.lastMessageTime}
                        </div>
                      </div>
                    </Menu.Item>
                  ))}
                </Menu>
              </div>
            </Sider>
            <div className="!bg-[#FFFFFF]  "></div>

            <Layout className="p-6 pl-0 !bg-[#FFFFFF] ]">
              <Header className="!bg-[#FFFFFF] p-4  flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <Typography.Title level={3} type="secondary">
                    <BarsOutlined
                      onClick={() => setCollapsed(!collapsed)}
                      className="text-3xl mt-5"
                    />
                  </Typography.Title>
                  <div className="flex items-center gap-2">
                    <img
                      className="h-10 w-10 relative"
                      src={AllImages.profile}
                      alt="Profile"
                    />
                    <p className="font-bold text-base sm:text-lg lg:text-xl">
                      {selectedConversation?.user}
                    </p>
                  </div>
                </div>
              </Header>

              <Content className="bg-white flex flex-col gap-5 rounded-none relative ">
                {selectedConversation ? (
                  <div className="h-full flex flex-col justify-end">
                    <Card className="!border-0  !pb-14 overflow-y-auto border-none ">
                      {selectedConversation.messages.map((msg) => (
                        <div key={msg.id}>
                          <p
                            className={`py-1 px-3 my-2 rounded-md ${
                              msg.sender === "You"
                                ? "w-fit ml-auto text-right  text-white bg-[#6A0DAD]"
                                : "w-fit text-left text-base-color bg-[#F1F1F1]"
                            }`}
                          >
                            {msg.text}
                          </p>
                          <div
                            className={`flex items-center gap-2 w-full ${
                              msg.sender === "You"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <p
                              className={`font-bold text-xs ${
                                msg.sender === "You"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              {msg.sender}
                            </p>
                            <p
                              className={`font-bold text-xs text-secondary-color ${
                                msg.sender === "You"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              10:40 AM
                            </p>
                          </div>
                        </div>
                      ))}
                    </Card>
                  </div>
                ) : (
                  <div className="text-center h-full mt-16 text-secondary-color">
                    Select a conversation to view messages
                  </div>
                )}

                {selectedConversation && (
                  <div className="w-full !bg-white ">
                    <div className=" absolute -bottom-5 flex justify-center items-center w-full p-4">
                      <div className="w-full rounded-full bg-white border  px-4 py-2 flex items-center space-x-4">
                        {/* Emoji Icon */}

                        {/* Input Field */}
                        <Input
                          placeholder="Send your message..."
                          className="border-none focus:ring-0 outline-none !bg-transparent text-black"
                        />
                      </div>
                      <div>
                        <FaTelegramPlane className="cursor-pointer text-white bg-[#6A0DAD] rounded-full p-2 text-4xl ms-3" />
                      </div>
                    </div>
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>
        </ConfigProvider>
      </Layout>
    </div>
  );
};

export default AdminMessage;
