import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 bg-white flex justify-between items-center px-8 w-full shadow h-14">
      <Link href="/" className="text-[#00AA45] hover:text-[#009934] font-bold">
        Form builder
      </Link>
    </header>
  );
};

export default Navbar;
