import React, { useEffect, useRef, useState } from "react";
import Redirect from "./Redirect";
import Search from "./Search";

interface Props {}

const Navbar = (props: Props) => {
  const NavbarRef = useRef<HTMLDivElement | null>(null);
  const [activeClass, setActiveClass] = useState(false);
  const handleScroll = () => {
    if (!activeClass && window.scrollY > 0) {
      setActiveClass(true);
    } else {
      setActiveClass(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={NavbarRef}
      className={`flex h-[70px] ${
        activeClass ? "glassmorphismNavbar" : ""
      }  z-50 sticky top-0 justify-between w-full p-4`}
    >
      <Redirect />
      <Search />
    </div>
  );
};

export default Navbar;
