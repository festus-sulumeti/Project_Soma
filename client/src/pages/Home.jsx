import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mb-12 mt-28 flex flex-col items-center justify-center text-center px-4 md:px-6 lg:px-8">
      <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
        Analyze your students <span className="text-blue-600">performance</span> in seconds.
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 text-base sm:text-lg md:text-xl lg:text-2xl">
        Soma allows you to analyze students easily and give feedback. Simply create an account and upload student details to view performance.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          to={"/parents/login"}
        >
          Login as parent <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
            variant: "secondary",
          })}
          to={"/login"}
        >
          Login <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
