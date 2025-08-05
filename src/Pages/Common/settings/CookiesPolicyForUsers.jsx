import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetCookiesPolicyQuery,
  useUpdateDataManagementMutation,
} from "../../../redux/features/dataManagementForUser/dataManagementForUserAPi";
import Loading from "../../../Components/ui/Loading";

const CookiesPolicyForUsers = () => {
  const { data, isFetching } = useGetCookiesPolicyQuery({});
  const [updateStaticContent] = useUpdateDataManagementMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setContent(data?.data?.content);
    }
  }, [data]);

  const handleOnSave = async () => {
    const toastId = toast.loading("Updating privacy policy...");

    const data = {
      key: "cookie_policy",
      content: content,
    };
    try {
      const res = await updateStaticContent(data).unwrap();
      toast.success(res?.message, { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update privacy policy", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div className=" flex justify-center items-center">
      <div className="w-[95%]">
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CookiesPolicyForUsers;
