'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Call from "../public/img/contact_call.svg";
import Mail from "../public/img/contact_mail.svg";
import ContactForm from "./ContactForm";

const ContactFormSection = ({
  main_title,
  sub_title,
  home_get_in_touch_title,
  content,
  home_get_in_touch_client_detail_group,
  home_get_in_touch_call_label,
  home_get_in_touch_email_label,
}) => {
  const router = useParams();
  const slug = router.slug;
  return (
    <section className="contact-form">
      <div className="container">
        <div className="contact-form-wrapper">
          <div className="cf-form">
            <div className="tag">
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{sub_title}</span>
            </div>
            <h2
              dangerouslySetInnerHTML={{
                __html: main_title,
              }}
            ></h2>
            <ContactForm/>
          </div>

          <div className="cf-content">
            <h3>{home_get_in_touch_title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: content?.replace(/<p>/g, "").replace(/<\/p>/g, ""),
              }}
            />
            <div className="client-review">
              <div className="client-review-img">
                {home_get_in_touch_client_detail_group?.home_get_in_touch_client_detail_group_images &&
                  home_get_in_touch_client_detail_group?.home_get_in_touch_client_detail_group_images.map(
                    (val, i) => (
                      <Image
                        src={val.url}
                        alt="user review"
                        width={50}
                        height={50}
                      />
                    )
                  )}
              </div>
              <p>
                {
                  home_get_in_touch_client_detail_group?.home_get_in_touch_client_detail_group_text
                }
              </p>
            </div>

            <div className="form-info">
              <div className="call">
                <div className="icon">
                  <Image src={Call} alt="call" />
                </div>
                <div className="call-info-text">
                  <p>{home_get_in_touch_call_label}</p>
                  <h4>
                    <a href="tel:+604-758-6040">604-758-6040</a>
                  </h4>
                </div>
              </div>

              <div className="call">
                <div className="icon">
                  <Image src={Mail} alt="mail" />
                </div>
                <div className="call-info-text">
                  <p>{home_get_in_touch_email_label}</p>
                  <h4>
                    <a href="mailto:orders@rlpackaging.ca">
                      Sales@RLPackaging.ca
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
