"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchHomedata } from "../untils/Fetchdata";
import Logo from "../public/img/logo.png";
import Map from "../public/img/map.svg";
import Call from "../public/img/header_call.svg";
import Mail from "../public/img/header_mail.svg";
import DownArrow from "../public/img/down_arrow.svg";
import Request_btn from "../public/img/Request_btn.svg";
import menu_icon from "../public/img/menu_icon.svg";
import close_menu from "../public/img/close_menu.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const router = useParams();
  const slug = router.slug;
  const [Newslater, setNewslater] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const result = await fetchHomedata(slug || "home");
        setNewslater(result.global_acf_options);
      } catch (err) {
        setError("Failed to load home page data.");
      }
    };
    loadHomeData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="navigtion">
        <div className="loction">
          <a href={Newslater?.address.url} target="_blank">
            <Image src={Map} alt="map" />
            {Newslater?.address.title}
          </a>
        </div>
        <div className="tel-info">
          <div className="call">
            <a href={Newslater?.phone_number.url}>
              <Image src={Call} alt="call" />
              {Newslater?.phone_number.title}
            </a>
          </div>
          <div className="mail">
            <a href={Newslater?.email_address.url}>
              <Image src={Mail} alt="mail" />
              {Newslater?.email_address.title}
            </a>
          </div>
        </div>
      </div>
      <div className={`h-wrapper ${isSticky ? "sticky" : ""}`}>
        <div className="logo">
          <Link href="/">
          {
            Newslater?.footer_logo.url ? 
            <Image
                src={Newslater?.footer_logo.url}
                width={150}
                height={100}
                alt="logo"
              />
              :
              <Image
                src={Logo}
                width={150}
                height={100}
                alt="logo"
              />
          }
          </Link>
        </div>
        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li>
              <Link href="./product" onClick={() => setMenuOpen(false)}>Product</Link>
            </li>
            <li>
              <Link href="/services" onClick={() => setMenuOpen(false)}>services</Link>
            </li>
            <li>
              <Link 
               href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the redirect
                }}
                >
                About US
                <Image className="DownArrow" src={DownArrow} alt="DownArrow" />
              </Link>
              <ul className="sub-menu"> 
                <li>
                  <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link> 
                </li>
                <li>
                  <Link href="/industries" onClick={() => setMenuOpen(false)}>INDUSTRIES</Link> 
                </li>
                <li>
                  <Link href="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
                </li>
              </ul>
            </li>
            {/* <li>
              <a href="#">blog</a>
            </li> */}
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>contact</Link>
            </li>
          </ul>
          <div className="close-icon" onClick={() => setMenuOpen(false)}>
            <Image src={close_menu} alt="close_menu"/>
          </div>
        </nav>
        <div className="h-btn">
          <div className="search-btn">
            {/* <div className="search">
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.15625 0.96875C9.57227 0.96875 10.8825 1.32682 12.0869 2.04297C13.2751 2.72656 14.2109 3.66243 14.8945 4.85059C15.6107 6.05501 15.9688 7.36523 15.9688 8.78125C15.9688 9.70898 15.8141 10.596 15.5049 11.4424C15.1956 12.2725 14.7643 13.0293 14.2109 13.7129L20.4365 19.9385L19.3135 21.0615L13.0879 14.8359C12.4043 15.3893 11.6475 15.8206 10.8174 16.1299C9.97103 16.4391 9.08398 16.5938 8.15625 16.5938C6.74023 16.5938 5.43001 16.2357 4.22559 15.5195C3.03743 14.8359 2.10156 13.9001 1.41797 12.7119C0.701823 11.5075 0.34375 10.1973 0.34375 8.78125C0.34375 7.36523 0.701823 6.05501 1.41797 4.85059C2.10156 3.66243 3.03743 2.72656 4.22559 2.04297C5.43001 1.32682 6.74023 0.96875 8.15625 0.96875ZM8.15625 2.53125C7.01693 2.53125 5.97526 2.81608 5.03125 3.38574C4.07096 3.93913 3.31413 4.69596 2.76074 5.65625C2.19108 6.60026 1.90625 7.64193 1.90625 8.78125C1.90625 9.92057 2.19108 10.9704 2.76074 11.9307C3.31413 12.8747 4.07096 13.6315 5.03125 14.2012C5.97526 14.7546 7.01693 15.0312 8.15625 15.0312C9.29557 15.0312 10.3454 14.7546 11.3057 14.2012C12.2497 13.6315 13.0065 12.8747 13.5762 11.9307C14.1296 10.9704 14.4062 9.92057 14.4062 8.78125C14.4062 7.64193 14.1296 6.60026 13.5762 5.65625C13.0065 4.69596 12.2497 3.93913 11.3057 3.38574C10.3454 2.81608 9.29557 2.53125 8.15625 2.53125Z"
                  fill="#131313"
                />
              </svg>
            </div> */}
            <a
              href={Newslater?.newsletter_request_quote_button.url}
              className="btn"
            >
              {Newslater?.newsletter_request_quote_button.title}
              <Image src={Request_btn} alt="Request_btn" />
            </a>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            <Image src={menu_icon} alt="menu_icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
