import { Link } from "react-router-dom";
import Container from "../Container";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center flex-col text-center min-h-screen m-auto text-base-color bg-gradient-to-r from-gray-200 via-white to-gray-100">
      <Container>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[150px] font-extrabold text-[#1A2238] tracking-widest">
            404
          </h1>
          <div className="bg-[#0861C5] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl mb-5 font-bold">
          <span className="text-[#0861C5]">OOPS!</span> NOTHING WAS FOUND
        </h3>
        <p className="text-base lg:text-xl ">
          <span>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.{" "}
          </span>
        </p>
        <button className="mt-5">
          <Link
            to="/"
            class="relative inline-block text-lg font-medium text-[#0861C5] group focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#0861C5] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current text-primary-color">
              Go Home
            </span>
          </Link>
        </button>
      </Container>
    </div>
  );
};

export default NotFoundPage;
