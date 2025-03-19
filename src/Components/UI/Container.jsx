import { cn } from "../../lib/utils";

const Container = ({ children, className }) => {
  return (
    <div className={cn("w-[90%] max-w-[1320px] mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
