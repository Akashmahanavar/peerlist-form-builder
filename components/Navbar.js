import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 bg-white flex justify-between items-center px-8 w-full shadow h-14">
      <Link href="/" className="text-[#00AA45] font-bold hover:scale-105">
        Form builder
      </Link>
      <Link
        href="/formlists"
        className="bg-[#00AA45] text-white px-4 py-2 rounded-full uppercase hover:scale-105"
      >
        Forms
      </Link>
    </div>
  );
};

export default Navbar;
