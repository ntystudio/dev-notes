'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SideNav from '@/components/SideNav'
import SunIcon from '@/public/images/sun.svg'
import MoonIcon from '@/public/images/moon.svg'
import { useTheme } from "next-themes";

const MainHeader = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  console.log(theme)

  useEffect(() => {
    setMounted(true);
    setTheme(theme === 'system' ? 'light' : theme)
  }, []);

  if (!mounted) {
    return null
  }

  const handleOnMenu = () => {
    setMenuOpen(false)
  }

  return (
    // DO NOT USE LIGHT:CLASS-NAME  just in dark only
    <header className="px-8 py-4 flex justify-between relative z-50 bg-light-color-base-00 dark:bg-dark-color-base-05 border-b-4 border-solid border-light-color-base-3> dark:border-dark-color-base-30">
      {/* Left */}
        <button className="mr-3 lg:hidden" onClick={() => setMenuOpen(true)}>
            <i className={`icon-svg icon_menu dark:bg-light-color-base-00 bg-dark-color-base-00 hover:bg-dark-color-base-40 hover:dark:bg-light-color-base-40`}></i>
        </button>
        <div className="flex items-center">
            <Link href="/">
                <h1 className="py-1 text-xl">NTY.studio dev notes</h1>
        </Link>
      </div>
      {/* Mobile Side Nav */}
      {isMenuOpen && <div className="fixed h-full w-screen lg:hidden top-0 right-0 bg-light-color-base-00 dark:bg-dark-color-base-00">
        <section className="absolute left-0 top-0 right-0 h-screen z-50">
          <div className="flex flex-row justify-between px-8 py-4 border-b-4 border-solid border-light-color-base-3> dark:border-dark-color-base-30">
              <button className="mr-3 lg:hidden">
                  <i className={`icon-svg icon_close dark:bg-light-color-base-00 bg-dark-color-base-00`} onClick={() => setMenuOpen(false)}></i>
              </button>
              <div className="flex items-center">
                  <Link href="/">
                      <h1 className="py-1 text-xl">NTY.studio dev notes</h1>
              </Link>
            </div>
            <div className="flex items-center">
              {theme === 'dark' &&
                  <i className={`icon-svg icon_light_mode dark:bg-light-color-base-00 bg-dark-color-base-00 hover:bg-dark-color-base-40 hover:dark:bg-light-color-base-40 cursor-pointer`} onClick={() => setTheme('light')}></i>}
              {theme === 'light' &&
                  <i className={`icon-svg icon_dark_mode dark:bg-light-color-base-100 bg-dark-color-base-100 hover:bg-dark-color-base-40 hover:dark:bg-light-color-base-40 cursor-pointer`} onClick={() => setTheme('dark')}></i>}
              {theme}
            </div>
          </div>
          <SideNav postMetaData={props.postMetaData} closeOnClick={handleOnMenu} />
        </section>
      </div>}
      {/* Right */}
      <div className="flex items-center">
          {theme === 'dark' &&
              <i className={`icon-svg icon_light_mode dark:bg-light-color-base-00 cursor-pointer`} onClick={() => setTheme('light')}></i>}
          {theme === 'light' &&
              <i className={`icon-svg icon_dark_mode bg-dark-color-base-00 cursor-pointer`} onClick={() => setTheme('dark')}></i>}
      </div>
    </header>
  );
};

export default MainHeader;



