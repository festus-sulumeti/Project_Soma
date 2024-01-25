import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mb-12 mt-28 flex flex-col items-center justify-center text-center">
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
        Analyze your students <span className="text-blue-600">performance</span> in
        seconds.
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        Soma allows you to analyze students easily and give feedback. Simply
        create an account and upload student details to view performance.
      </p>
      <Link
        className={buttonVariants({
          size: "lg",
          className: "mt-5",
        })}
        to={"/Login"}
      >
        Get started <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
}

export default Home