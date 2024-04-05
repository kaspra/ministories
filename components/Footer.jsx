import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-8 pt-4 pb-4 text-center text-gray-600 font-semibold border border-x-0 border-b-0 border-t-gray-300">
      <Link
        href="https://instagram.com/praveen.iq"
        target="_blank"
        className="text-green-500 underline"
      >
        By Praveen
      </Link>
    </div>
  );
};

export default Footer;
