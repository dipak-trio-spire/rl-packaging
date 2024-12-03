"use client"
import React, { useState, useEffect } from "react";
import NewsletterSection from '../../../component/NewsletterSection'
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchHomedata } from "../../../untils/Fetchdata";
import location from "../../../public/img/location.svg"
import Call from "../../../public/img/contact_call.svg"
import Mail from "../../../public/img/contact_mail.svg"
const Page = () => {
    const router = useParams();
    const slug = router.slug;
    const [ContactData, setContactData] = useState(null);
    const [Newslater, setNewslater] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadHomeData = async () => {
          try {
            setIsLoading(true);
            const result = await fetchHomedata(slug);
            setContactData(result.page_acf_fields);
            setNewslater(result.global_acf_options);
          } catch (err) {
            setError("Failed to load home page data.");
        } finally {
            setIsLoading(false); // Stop the loader
          }
        };
        loadHomeData();
      }, [slug]);
  return (
    <>
    {
      isLoading && 
    <div className="load-bar">
      <div className="bar"></div>
    </div>
    }
        <section className="contact-tab-form py">
            <div className="container">
                <div className="tabs contact-tabs">
                    <div className="tab-content">
                        <div className="tab-pane">
                            <div className="contact-form-tab">
                                <div className="cf-map-tab" dangerouslySetInnerHTML={{
                                    __html: ContactData?.contact_iframe_link}}>  
                                </div>
                                <div className="cf-content-tab">
                                    <div className="tag">
                                        <div className="tag-a">
                                            <div className="box"></div>
                                            <div className="box"></div>
                                            <div className="box"></div>
                                        </div>
                                        <span>{ContactData?.contact_sub_title}</span>
                                    </div>
                                    <h2><span>{ContactData?.contact_main_title}</span></h2>

                                    <div className="form-info ">
                                        <div className="call">
                                            <div className="icon">
                                            <Image src={location} alt="location" width={22} height={22}/>
                                            </div>
                                            <div className="call-info-text">
                                                <p>{ContactData?.contact_location_label}</p>
                                                <h3>{Newslater?.address.title}</h3>
                                            </div>
                                        </div>
                                        <div className="call">
                                            <div className="icon">
                                            <Image src={Call} alt="Call" width={22} height={22}/>
                                            </div>
                                            <div className="call-info-text">
                                                <p>{ContactData?.contact_office_phone_label}</p>
                                                <h3><a href={Newslater?.phone_number.url}>{Newslater?.phone_number.title}</a></h3>
                                            </div>
                                        </div>
                                        <div className="call">
                                            <div className="icon">
                                            <Image src={Mail} alt="mail" width={22} height={22}/>
                                            </div>
                                            <div className="call-info-text">
                                                <p>{ContactData?.contact_request_a_quote_label}</p>
                                                <h3><a href={Newslater?.email_address.url}>{Newslater?.email_address.title}</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <NewsletterSection global_acf_options={Newslater} container="container"/>
        
    </>
  )
}

export default Page