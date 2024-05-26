"use client";

import React, { useState } from "react";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import Link from "next/link";

function Home() {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    // Update theme properties
    const body = document.querySelector("body");
    if (darkTheme) {
      body.style.color = "rgb(var(--foreground-rgb))";
      body.style.background = `linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))`;
    } else {
      // Set light theme properties
      // You need to define your light theme colors here
      body.style.color = "#40513B"; // Example color for light theme text
      body.style.background = "#E1EBDC"; // Example color for light theme background
    }
  };

  return (
    <div className="main-container">
      <div className="navbar">
        <div className="telegram-icon">
          <a href="https://t.me/DealHuntersDaily">
            <i className="fab fa-telegram"></i>
          </a>
        </div>
        <a className="logo">
          <Image
            src={darkTheme ? "/favicon-light.ico" : "/favicon-dark.ico"}
            alt="PickMyRead Logo"
            width={200}
            height={200}
            className="favicon"
          />
        </a>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
            onChange={toggleTheme}
          />
          <svg
            className="swap-off fill-current w-8 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-on fill-current w-8 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div className="image-container">
        <div className="roundedImage">
          <Image src="/book.png" width={450} height={550} alt="book" />
        </div>
      </div>
      <div className="Heading">
        <h1 className="Welcome">Welcome to PickMyRead</h1>
        <h3 className="Tagline">Your Gateway to Literary Exploration!</h3>
        <Link
          href="/Categories"
          className="btn btn-wide btn-primary btn-Start"
          style={{
            background: darkTheme ? "#815CCE" : "#7480ff",
            color: darkTheme ? "#fff" : "#fff",
          }}>
          Start Exploring
        </Link>
      </div>
    </div>
  );
}

export default Home;
