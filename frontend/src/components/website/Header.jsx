import React, { useState } from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu.jsx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx';
import { TbUserExclamation } from 'react-icons/tb';
import { TbUserCheck } from "react-icons/tb";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet.jsx';
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { getAutUser } from '../../lib/auth.js';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../features/account/userSlice.js';
import { clearCart } from '../../features/cart/cartSlice.js';

export default function Header() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const auth = getAutUser();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const handleUser = async (closeSheet) => {
    if (typeof closeSheet === "function") {
      closeSheet(false);
    }
    if (!auth) {
      nav("/account", { replace: true });
      return;
    };
    if (auth?.role === "admin") {
      nav("/admin/dashboard", { replace: true });
      return;
    }

    // Confirm logout
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      // Dispatch your delete action (can be async)
      dispatch(removeUser());
      dispatch(clearCart());
      // Optionally navigate somewhere after deletion
      nav("/", { replace: true });
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md ${pathname == '/' ? `bg-[#FBEBB5]` : `bg-white/70`}   border-gray-200 transition-all`}>
      <div className="flex items-center justify-between md:justify-end py-3 px-6 md:px-12">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-20">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-10">
              {links.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavigationMenuLink asChild className="hover:bg-transparent focus:bg-transparent">
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `group relative px-1 transition-colors ${isActive ? "text-primary font-medium" : "text-gray-700"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          <span
                            className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all ${isActive ? "w-full" : ""
                              }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className='flex items-center justify-center gap-3'>
            {/* Profile/Dropdown Menu */}

            <button
              onClick={handleUser}
              className="w-9 h-9 py-2 px-1 flex items-center justify-center cursor-pointer transition disabled:opacity-50 hover:bg-transparent"
            >
              {!auth ? <TbUserExclamation className="w-full h-full" /> : <TbUserCheck className="w-full h-full" />}

            </button>


            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  // onClick={handelUser}
                  className="w-9 h-9 py-2 px-1 flex items-center justify-center cursor-pointer transition disabled:opacity-50 hover:bg-transparent"
                >
                  <TbUserExclamation className="w-full h-full" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/account">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <button
              onClick={() => nav(`/search`)}
              className="w-9 h-9 py-2 px-1 flex items-center justify-center cursor-pointer transition disabled:opacity-50 hover:bg-transparent"
            >
              <RiSearchLine className="w-full h-full" />
            </button>

            <button
              // onClick={handelLike}
              className="w-9 h-9 py-2 px-1 flex items-center justify-center cursor-pointer transition disabled:opacity-50 hover:bg-transparent"
            >
              <FaRegHeart className="w-full h-full" />
            </button>

            <button
              onClick={() => nav(`/cart`)}
              className="w-9 h-9 py-2 px-1 flex items-center justify-center cursor-pointer transition disabled:opacity-50 hover:bg-transparent"
            >
              <HiOutlineShoppingCart className="w-full h-full" />
            </button>

          </div>
        </div>
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden text-2xl">☰</SheetTrigger>

          <SheetContent side="left" className="flex flex-col p-0">
            {/* Header */}
            <div className="border-b px-6 py-4">
              <SheetTitle className="text-xl font-semibold">
                Menu
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Navigate pages, account, and shopping tools
              </SheetDescription>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-6 space-y-4 text-lg">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-2 py-2 transition
             ${isActive
                      ? "text-primary font-semibold bg-accent"
                      : "text-gray-700 hover:bg-accent hover:text-primary"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="border-t px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => handleUser(setOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent transition"
              >
                {!auth ? (
                  <TbUserExclamation className="w-5 h-5" />
                ) : (
                  <TbUserCheck className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  nav("/search");
                }}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent transition"
              >
                <RiSearchLine className="w-5 h-5" />
              </button>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent transition"
              >
                <FaRegHeart className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  nav("/cart");
                }}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent transition"
              >
                <HiOutlineShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}
