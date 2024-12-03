"use client";
import React, { useState, useEffect } from "react";
import Testimonial_Caraousel from "../../../component/Testimonial_Caraousel";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchHomedata } from "../../../untils/Fetchdata";
import HeroSection from "../../../component/HeroSection";
import Request_icon from "../../../public/img/Request_btn.svg"
import location from "../../../public/img/location.svg"
import Call from "../../../public/img/contact_call.svg"
import Mail from "../../../public/img/contact_mail.svg"
import ContactForm from './../../../component/ContactForm';

const Page = () => {
  const [about, setabout] = useState(null);
  const [Newslater, setNewslater] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      about?.about_all_specialties_2 &&
      about.about_all_specialties_2.length > 0
    ) {
      setActiveTab(
        about.about_all_specialties_2[0].about_all_specialties_2_title
      );
    }
  }, [about]);

  // Function to handle tab click
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const router = useParams();
  const slug = router.slug;

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchHomedata(slug);
        setabout(result.page_acf_fields);
        setNewslater(result.global_acf_options);
      } catch (err) {
        setError("Failed to load home page data.");
      } finally {
        setIsLoading(false); // Stop the loader
      }
    };
    loadHomeData();
  }, [slug]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    {
      isLoading && 
      <div className="load-bar">
        <div className="bar"></div>
      </div>
    }

      <HeroSection
        bg_image={about?.about_hero_background_image.url}
        main_title={about?.about_hero_main_title}
        sub_title={about?.about_hero_sub_title}
        content={about?.about_hero_content}
        placeholder_title={about?.about_hero_placeholder_title}
        about_hero_box_left_section={about?.about_hero_box_left_section}
        about_hero_box_right_section={about?.about_hero_box_right_section}
        about_hero_box_center_image={about?.about_hero_box_center_image}
      />

      <section className="about-us py">
        <div className="container">
          <div className="about-us-wrapper">
            <div className="tag">
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{about?.about_detail_sub_title}</span>
              <div className="tag-b">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
            </div>
            <h2>
              <span>{about?.about_detail_main_title}</span>
            </h2>

            <div className="sub-text">
              <p
                dangerouslySetInnerHTML={{
                  __html: about?.about_detail_content
                    ?.replace(/<p>/g, "")
                    .replace(/<\/p>/g, ""),
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="specialties-about py py-b">
        <div className="container">
          <Image
            src={about?.about_specialties_background_image.url}
            width={about?.about_specialties_background_image.width}
            height={about?.about_specialties_background_image.height}
            alt={about?.about_specialties_background_image.title}
            className="sp-about-bg"
          />
          <div className="sp-about-wrapper">
            <div className="tag">
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{about?.about_specialties_sub_title}</span>
              <div className="tag-b">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
            </div>
            {/* <p
                dangerouslySetInnerHTML={{
                  __html: about?.about_detail_content
                    ?.replace(/<p>/g, "")
                    .replace(/<\/p>/g, ""),
                }}
              /> */}
            <h2
              dangerouslySetInnerHTML={{
                __html: about?.about_specialties_main_title,
              }}
            ></h2>
            <div className="sp-about-boxs">
              {about?.about_all_specialties &&
                about?.about_all_specialties.map((val, i) => {
                  return (
                    <div className="sp-about-box" key={i}>
                      <div className="sp-about-b">
                        <div
                          className="sp-about-icon"
                          dangerouslySetInnerHTML={{
                            __html: val.about_all_specialties_icon,
                          }}
                        ></div>
                        <div className="sp-title">
                          <h3>{val.about_all_specialties_title}</h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: val.about_all_specialties_content
                                ?.replace(/<p>/g, "")
                                .replace(/<\/p>/g, ""),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="py specialties-tab">
        <div className="container">
          <div className="specialties-tab-wrapper">
            <div className="tag">
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{about?.about_specialties_2_sub_title}</span>
            </div>
            <h2
              dangerouslySetInnerHTML={{
                __html: about?.about_specialties_2_main_title,
              }}
            />
            <div className="tabs sp-tabs">
              {/* Tab Links */}
              <div className="tab-links">
                {about?.about_all_specialties_2 &&
                  about.about_all_specialties_2.map((tab, i) => (
                    <a
                      key={tab.about_all_specialties_2_title}
                      href={`#${tab.about_all_specialties_2_title}`}
                      className={`tab-link ${
                        activeTab === tab.about_all_specialties_2_title
                          ? "active"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        handleTabClick(tab.about_all_specialties_2_title);
                      }}
                    >
                      {i + 1}.{tab.about_all_specialties_2_title}
                    </a>
                  ))}
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {about?.about_all_specialties_2 &&
                  about.about_all_specialties_2.map((tab) => (
                    <div
                      key={tab.about_all_specialties_2_title}
                      id={tab.about_all_specialties_2_title}
                      className={`tab-pane ${
                        activeTab === tab.about_all_specialties_2_title
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="tab-pane-b">
                        <div className="title">
                          <h3>{tab.about_all_specialties_2_title}</h3>
                        </div>
                        <div
                          className="sub-text"
                          dangerouslySetInnerHTML={{
                            __html: tab.about_all_specialties_2_content,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pr-testimonal py">
        <div className="container">
          <div className="pr-testimonal-wrapper">
            <div className="tag">
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{about?.about_testimonial_sub_title}</span>
            </div>
            <h2
              dangerouslySetInnerHTML={{
                __html: about?.about_testimonial_main_title,
              }}
            />
          </div>
          <Testimonial_Caraousel
            AboutAllTestimonial={about?.about_all_testimonial}
          />
        </div>
      </section>

      <section
        className="about-team py"
        style={{
          background: `url(${about?.about_team_background_image}) center/cover no-repeat`,
        }}
      >
        <div className="container">
          <div className="about-team-wrapper">
            <div className="about-team-text">
              <div className="title">
                <div className="tag">
                  <div className="tag-a">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                  </div>
                  <span>{about?.about_team_sub_title}</span>
                </div>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: about?.about_team_main_title,
                  }}
                ></h2>
              </div>
              <div className="sub-text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: about?.about_team_content,
                  }}
                ></p>
              </div>
              <a href={about?.about_team_button.url} className="btn">
                {about?.about_team_button.title}
                <Image src={Request_icon} alt="Request_icon" width={22} height={22}/>
              </a>
            </div>
            <div className="about-team-img">
              <Image
                src={about?.about_team_image.url}
                width={about?.about_team_image.width}
                height={about?.about_team_image.height}
                alt={about?.about_team_image.title}
              />
            </div>
          </div>
        </div>
      </section>

      <section class="pr-form py py-b"> 
        <div class="container">
          <div class="pr-form-wrapper">
            <div class="cf-form">
              <div class="tag">
                <div class="tag-a">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                </div>
                <span>Get In Touch</span> 
              </div>{" "}
              <h2>
                Free <span>Consultation</span>
              </h2>
              <div class="wpcf7 js" id="wpcf7-f702-o1" lang="en-US" dir="ltr">
                <div class="screen-reader-response">
                  <p role="status" aria-live="polite" aria-atomic="true"></p>{" "}
                  <ul></ul>
                </div>
               <ContactForm/>
              </div>
            </div>
            <div class="pr-form-map">
              <div class="map" dangerouslySetInnerHTML={{__html: Newslater?.single_footer_iframe_link}}></div>{" "}
              <div class="pr-form-info form-info">
                <div class="call">
                  <div class="icon">
                  <Image src={location} alt="location" width={22} height={22}/>
                  </div>
                  <div class="call-info-text">
                    <p>{Newslater?.single_footer_location_label}</p>
                    <h3>{Newslater?.address.title}</h3>
                  </div>
                </div>{" "}
                <div class="call">
                  <div class="icon">
                  <Image src={Call} alt="Call" width={22} height={22}/>
                  </div>
                  <div class="call-info-text">
                    <p>{Newslater?.single_footer_emergency_help_label}</p>
                    <h3>
                      <a
                        href={Newslater?.phone_number.url}
                        title={Newslater?.phone_number.title}
                        aria-label={Newslater?.phone_number.title}
                      >
                        {Newslater?.phone_number.title}
                      </a>
                    </h3>
                  </div>
                </div>{" "}
                <div class="call">
                  <div class="icon">
                  <Image src={Mail} alt="mail" width={22} height={22}/>
                  </div>
                  <div class="call-info-text">
                    <p>{Newslater?.single_footer_emergency_help_label}</p>
                    <h3>
                      {" "}
                      <a href={Newslater?.email_address.url}>
                      {Newslater?.email_address.title}{" "}
                      </a>
                    </h3>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;



export async function generateMetadata() {
  return {
    title: "EAS Corporation – Intelligente Lösungen für Unternehmen und Industrien",
    description: "EAS Corporation bietet innovative Lösungen im Bereich Technologie und Industrie. Von Beratung bis zur Umsetzung – Ihr Partner für maßgeschneiderte, zukunftssichere Lösungen.",
    openGraph: {
      title: "EAS Corporation – Intelligente Lösungen für Unternehmen und Industrien",
      description: "EAS Corporation bietet innovative Lösungen im Bereich Technologie und Industrie. Von Beratung bis zur Umsetzung – Ihr Partner für maßgeschneiderte, zukunftssichere Lösungen.",
      images: [
        {
          url: "../public/img/logo.png", 
          alt: "EAS Corporation Logo",
          description: "Logo der EAS Corporation, einem führenden Anbieter von technologischen Lösungen für Unternehmen."
        }
      ],
    },
  };
}
