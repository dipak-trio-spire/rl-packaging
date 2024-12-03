"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import revisit from "../public/img/revisit.svg"

const accordionData = [
  {
    id: "ckyDetailCategorynecessary",
    title: "Necessary",
    alwaysActive: true,
    description:
      "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
    cookies: "No cookies to display.",
  },
  {
    id: "ckyDetailCategoryfunctional",
    title: "Functional",
    alwaysActive: false,
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
    cookies: "No cookies to display.",
  },
  {
    id: "ckyDetailCategoryanalytics",
    title: "Analytics",
    alwaysActive: false,
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
    cookies: "No cookies to display.",
  },
  {
    id: "ckyDetailCategoryperformance",
    title: "Performance",
    alwaysActive: false,
    description:
      "Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
    cookies: "No cookies to display.",
  },
  {
    id: "ckyDetailCategoryadvertisement",
    title: "Advertisement",
    alwaysActive: false,
    description:
      "Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.",
    cookies: "No cookies to display.",
  },
];

const CookiesComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesVisible, setIsPreferencesVisible] = useState(false);
  const [show_content, setshow_content] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null); // Track expanded accordion

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieyes-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    Cookies.set("cookieyes-consent", "Accept all", { expires: 1 });
    setIsVisible(false); // Close the popup
  };

  const handleRejectAll = () => {
    Cookies.set("cookieyes-consent", "Reject all", { expires: 1 });
    setIsVisible(false); // Close the popup
  };

  const togglePreferences = () => {
    setIsPreferencesVisible((prev) => !prev);
  };

  const toggleAccordion = (category) => {
    setExpandedAccordion(expandedAccordion === category ? null : category);
  };

  return (
    <>
      <div
        className="cky-btn-revisit-wrapper cky-revisit-bottom-left"
        aria-label="revisit-consent"
      >
        <button
          className="cky-btn-revisit"
          aria-label="Consent Preferences"
          onClick={() => {setIsVisible(true) ; setIsPreferencesVisible(true)}}
        >
          <Image
            src={revisit}
            alt="Revisit consent button"
          />  
        </button>
      </div>
      {
   
        isVisible && (
        <section className="cookie">
          <div className="cookie-main">
            <div className="cookie-consent-bar consent-flex">
              <div className="consent-left">
                <p>
                  By clicking “Accept All Cookies,” you agree to the storing of
                  cookies on your device to enhance site navigation, analyze
                  site usage, and assist in our marketing efforts.
                </p>
              </div>
              <div className="consent-right">
                <div className="consent-button">
                  <button
                    className={`cky-button cky-btn-cookies ${
                                isPreferencesVisible ? "rotate-chevron" : ""
                              }`}
                    onClick={togglePreferences}
                  >
                    COOKIES SETTINGS
                  </button>
                  <button
                    className="cky-button cky-btn-reject"
                    onClick={handleRejectAll}
                  >
                    REJECT ALL
                  </button>
                  <button
                    className="cky-button cky-btn-accept"
                    onClick={handleAcceptAll}
                  >
                    ACCEPT ALL COOKIES
                  </button>
                </div>
              </div>
            </div>

            {isPreferencesVisible && (
              <>
                <div
                  style={{
                    display: isPreferencesVisible ? "block" : "none",
                    maxHeight: "1000px",
                    transition: "max-height 0.3s ease",
                  }}
                  className="cky-preference-wrapper"
                  data-cky-tag="detail"
                >
                  <div className="cky-preference-center">
                    <div className="cky-preference">
                      <div className="cky-preference-header">
                        <span
                          className="cky-preference-title"
                          role="heading"
                          aria-level="1"
                          data-cky-tag="detail-title"
                        >
                          Customize Consent Preferences
                        </span>
                        <button
                          className="cky-btn-close"
                          aria-label="[cky_preference_close_label]"
                          data-cky-tag="detail-close"
                        >
                          <img
                            src="https://rlpackaging.ca/wp-content/plugins/cookie-law-info/lite/frontend/images/close.svg"
                            alt="Close"
                          />
                        </button>
                      </div>
                      <div className="cky-preference-body-wrapper">
                        <div
                          className="cky-preference-content-wrapper"
                          data-cky-tag="detail-description"
                        >
                          <p>
                            We use cookies to help you navigate efficiently and
                            perform certain functions. You will find detailed
                            information about all cookies under each consent
                            category below.
                          </p>
                          <p>
                            The cookies that are categorized as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site. 
                            {!show_content && (
                            <button
                                className="cky-show-desc-btn"
                                data-cky-tag="show-desc-button"
                                aria-label="Show more"
                                onClick={() => setshow_content(true)}
                            >
                                Show more
                            </button>
                            )}
                        </p>
                        {show_content && (
                            <>
                            <p>
                                We also use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent.
                            </p>
                            <p>
                                You can choose to enable or disable some or all of these cookies but disabling some of them may affect your browsing experience.
                            </p>
                            <button
                                className="cky-show-desc-btn"
                                onClick={() => setshow_content(false)}
                                data-cky-tag="hide-desc-button"
                                aria-label="Show less"
                            >
                                Show less
                            </button>
                            </>
                        )}
                        </div>
                        <div
                          className="cky-accordion-wrapper"
                          data-cky-tag="detail-categories"
                        >
                        {
                            accordionData?.map((item)=>(
                            <div
                                className="cky-accordion"
                                id={item.id}
                                onClick={() => toggleAccordion(item.id)}
                                aria-expanded={expandedAccordion === item.id ? "true" : "false"}
                            >
                            <div className="cky-accordion-item">
                              <div className="cky-accordion-chevron">
                              <i className={expandedAccordion !== item.id? "cky-chevron-right" 
                                        :  "cky-chevron-right rotate-chevron"
                                    }
                                  ></i>
                              </div>
                              <div className="cky-accordion-header-wrapper">
                                <div className="cky-accordion-header">
                                  <button
                                    className="cky-accordion-btn"
                                    data-cky-tag="detail-category-title"
                                    aria-label={item.title}
                                  >
                                    {item.title}
                                  </button>
                                  {
                                    item.alwaysActive &&
                                    <span className="cky-always-active">
                                        Always Active
                                    </span>
                                  }
                                </div>
                                <div
                                  className="cky-accordion-header-des"
                                  data-cky-tag="detail-category-description"
                                >
                                  <p>
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="cky-accordion-body"
                            style={{
                            display: expandedAccordion == item.id ? "block" : "none", 
                            opacity : 1
                            }}
                            aria-expanded={expandedAccordion === item.id ? "true" : "false"}
                            >
                              <div
                                className="cky-audit-table"
                                data-cky-tag="audit-table"
                              >
                                <p className="cky-empty-cookies-text">
                                  {item.cookies}
                                </p>
                              </div>
                            </div>

                          </div>
                                )
                            )
                        }
                        </div>
                      </div>
                    </div>
                    <div className="cky-footer-wrapper">
                      <span
                        className="cky-footer-shadow"
                        style={{
                          background:
                            "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
                        }}
                      ></span>
                      <div
                        className="cky-prefrence-btn-wrapper"
                        data-cky-tag="detail-buttons"
                      >
                        <button
                          className="cky-button cky-btn-accept"
                          aria-label="ACCEPT ALL COOKIES"
                          data-cky-tag="detail-accept-button"
                          style={{
                            color: "#000000",
                            backgroundColor: "#FFFFFF",
                            borderColor: "transparent",
                          }}
                        >
                          ACCEPT ALL COOKIES
                        </button>
                        <button
                          className="cky-button cky-btn-preferences"
                          aria-label="Save My Preferences"
                          data-cky-tag="detail-save-button"
                          onClick={handleAcceptAll}
                          style={{
                            color: "#fff",
                            backgroundColor: "#EE0000",
                            borderColor: "#FFFFFF",
                          }}
                        >
                          Save My Preferences
                        </button>
                        <button
                          className="cky-button cky-btn-reject"
                          aria-label="REJECT ALL"
                          data-cky-tag="detail-reject-button"
                          style={{
                            color: "#FFFFFF",
                            backgroundColor: "#343434",
                            borderColor: "transparent",
                          }}
                        >
                          REJECT ALL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default CookiesComponent;
