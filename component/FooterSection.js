"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchHomedata } from "../untils/Fetchdata";
import Link from "next/link";
import Image from "next/image";
import Goggle from "../public/img/goggle.svg"
import Instagram from "../public/img/instagram.svg"

const Footer = () => {
  const router = useParams();
  const slug = router.slug;
  const [FooterData, setFooterData] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const result = await fetchHomedata(slug || "home");
        setFooterData(result.global_acf_options);
      } catch (err) {
        setError("Failed to load home page data.");
      }
    };
    loadHomeData();
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="f-wrapper ns-footer py">
          {/* Logo and Description */}
          <div className="logo-text">
            <div className="f-logo">
              <Image src={FooterData?.footer_logo.url} width={FooterData?.footer_logo.width} height={FooterData?.footer_logo.height} alt="footer logo" />
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: FooterData?.footer_content }}
            ></p>
          </div>

          {/* Contact Information */}
          <div className="f-info">
            <div className="f-info-box">
              <p>{FooterData?.call_us_label}</p>
              <a href={FooterData?.phone_number.url}>
                {FooterData?.phone_number.title}
              </a>
            </div>
            <div className="f-info-box">
              <p>{FooterData?.email_us_label}</p>
              <a href={FooterData?.email_address.url}>
                {FooterData?.email_address.title}
              </a>
            </div>
            <div className="f-info-box">
              <p>{FooterData?.head_office_label}</p>
              <p>
                <span>{FooterData?.address.title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Social Media Links */}
      <div className="copy-right">
        <div className="container">
          <div className="copy-right-wrapper">
            <div class="copy-link">
              <p>
                ©2024 <span>R&L Packaging</span>
              </p>
              <div class="menu-footer-menu-1-container">
                <ul id="menu-footer-menu-1" class="menu">
                  <li
                    id="menu-item-689"
                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy current-menu-item page_item page-item-3 current_page_item menu-item-689"
                  >
                    <Link
                      rel="privacy-policy"
                      href="/privacy-policy"
                      aria-current="page"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li
                    id="menu-item-690"
                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-690"
                  >
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://www.instagram.com/rlpackaging/"
                    >
                      Portfolio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="social-media">
              <a href={FooterData?.google_link.url} aria-label="Visit Instagram">
              <Image src={Goggle} alt="goggle"/>
              </a>
              <a
                href={FooterData?.instagram_link.url}
                aria-label="Visit Instagram"
              >
              <Image src={Instagram} alt="Instagram"/>
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
