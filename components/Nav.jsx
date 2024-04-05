"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full pt-6">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">MiniStories</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-story" className="blue_btn">
              Create Story
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="blue_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={"/assets/icons/menu.svg"}
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="fixed top-0 left-2 w-full h-full flex flex-col bg-white z-10">
                <div
                  onClick={() => setToggleDropdown(false)}
                  className="mt-10 flex justify-end mr-16"
                >
                  <Image
                    src={"/assets/icons/cross.png"}
                    width={36}
                    height={36}
                    alt="close_icon"
                  />
                </div>
                <div className="mt-52 flex flex-center flex-col gap-3">
                  <Link
                    className="dropdown_link text-center"
                    href="/"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Home
                  </Link>
                  <Link
                    className="dropdown_link text-center"
                    href="/profile"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="dropdown_link"
                    href="/create-story"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Story
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 blue_btn text-2xl font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="blue_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
