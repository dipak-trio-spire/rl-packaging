"use client"
import React, { useState, useEffect } from "react";
import NewsletterSection from '../../../component/NewsletterSection';
import HeroSection from "../../../component/HeroSection";
import { useParams } from "next/navigation";
import { fetchHomedata } from "../../../untils/Fetchdata";

const Page = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [faqData1, setfaqData1] = useState(null);
  const [FAQ, setFAQ] = useState(null);
  const [error, setError] = useState(null);
  const [Newslater, setNewslater] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  const handleFAQClick = (idx) => {
    setActiveFAQ(activeFAQ === idx ? null : idx);
  };

  const router = useParams();
  const slug = router.slug;



  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchHomedata(slug);
        setFAQ(result.page_acf_fields);
        setfaqData1(result.page_acf_fields.faq_all_questions_answers)
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
      bg_image={FAQ?.faq_hero_image.url}
      main_title={FAQ?.faq_hero_main_title}
      sub_title={FAQ?.faq_hero_sub_title}
      content={FAQ?.product_hero_content}
      placeholder_title={FAQ?.faq_hero_placeholder_title}
    />

<section className="faq-tabs-section py">
      <div className="container">
        <div className="faq-tab-wrapper">
          <div className="tabs faq-tabs">
            <div className="tab-links">
              {faqData1?.map((tab, index) => (
                <button
                  className={`tab-link ${activeTabIndex === index ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}
                  key={index}
                >
                  {tab.faq_main_title}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {faqData1?.map((tab, index) => (
                <div
                  className={`tab-pane ${activeTabIndex === index ? "active" : ""}`}
                  key={index}
                >
                  <div className="faq-tab">
                    <h2>
                      <span>{tab.faq_main_title}</span>
                    </h2>
                    <div className="faq-section">
                      {tab.all_faqs_details.map((item, idx) => (
                        <div className="faq-item" key={idx}>
                          <div className="faq-item-b">
                            <div
                              className="faq-question"
                              onClick={() => handleFAQClick(idx)}
                            >
                              {item.faq_question}
                              <div className="icon">
                              {
                                activeFAQ === idx ? (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5836 16.6011C20.3166 16.8565 19.9546 17 19.5773 17C19.1999 17 18.838 16.8565 18.571 16.6011L11.9829 10.2905L5.3947 16.6011C5.12476 16.842 4.76774 16.9732 4.39884 16.967C4.02993 16.9607 3.67796 16.8176 3.41707 16.5677C3.15617 16.3178 3.00673 15.9806 3.00022 15.6273C2.99371 15.2739 3.13065 14.9319 3.38217 14.6734L10.9766 7.3989C11.2436 7.14347 11.6055 7 11.9829 7C12.3602 7 12.7221 7.14347 12.9891 7.3989L20.5836 14.6734C20.8502 14.9291 21 15.2758 21 15.6372C21 15.9987 20.8502 16.3454 20.5836 16.6011Z" fill="black"></path>
                            </svg>
                                )
                               :
                               (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5836 7.3989C20.3166 7.14347 19.9546 7 19.5773 7C19.1999 7 18.838 7.14347 18.571 7.3989L11.9829 13.7095L5.3947 7.3989C5.12476 7.15797 4.76774 7.0268 4.39884 7.03304C4.02993 7.03927 3.67796 7.18242 3.41707 7.43232C3.15617 7.68222 3.00673 8.01937 3.00022 8.37273C2.99371 8.72609 3.13065 9.06807 3.38217 9.32663L10.9766 16.6011C11.2436 16.8565 11.6055 17 11.9829 17C12.3602 17 12.7221 16.8565 12.9891 16.6011L20.5836 9.32663C20.8502 9.07089 21 8.72422 21 8.36276C21 8.00131 20.8502 7.65464 20.5836 7.3989Z" fill="black"></path>
                            </svg>
                               )
                              }

                              </div>
                            </div>
                            {activeFAQ === idx && (
                              <div className="faq-answer">
                                <p dangerouslySetInnerHTML={{ __html: item.faq_answer }} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
      <NewsletterSection industries_newsletter_background_image={FAQ?.faq_newsletter_background_image.url} global_acf_options={Newslater}/>
    </>
  );
};

export default Page;
