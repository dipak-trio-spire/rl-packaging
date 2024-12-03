"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import newslater_bell from "../public/img/newslater_bell.svg";
import infoDesk from "../public/img/infidesk.svg";
import Request_btn from "../public/img/Request_btn.svg";
const NewsletterSection = ({
  className,
  container,
  industries_newsletter_background_image,
  global_acf_options,
}) => {
  const router = useParams();
  const slug = router.slug;

  const [formData, setFormData] = useState({
    email: "",
    subject: "Newsletter Subscription",
  });

  const [error, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    try{
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value, 
      });
      setErrors(false)
    }catch{
      setSuccess(false)
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;

    if (!email) {
      setErrors("Please provide a valid email address.");
      return;
    }
    if (!validateEmail(email)) {
      setErrors("Please enter a valid email address.");
      return;
    }

    // Formspree endpoint
    const endpoint =
      process.env.NEXT_PUBLIC_SENDER_MAIL || "https://formspree.io/f/myzygrvq";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          subject: formData.subject || "Newsletter Subscription",
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ email: "", subject: "" }); // Clear form after submission
      } else {
        setErrors("There was an error subscribing to the newsletter.");
      }
    } catch (error) {
      setErrors("Failed to submit the form. Please try again.");
    }
  };

  return (
    <section
      className={
        className === "about-nl"
          ? "news-letter about-nl"
          : className === "indeurtries-nl"
          ? "news-letter indeurtries-nl"
          : "news-letter"
      }
    >
      <div className={container !== undefined ? "container" : ""}>
        <div
          className="news-wrapper"
          style={{
            background: `url(${
              industries_newsletter_background_image
                ? industries_newsletter_background_image
                : global_acf_options?.newsletter_background_image.url
            }) center / cover no-repeat`,
          }}
        >
          <div className="notifiction">
            <h2>
              <span>{global_acf_options?.newsletter_main_title}</span>
            </h2>
            <div className="noti-ball">
              <div className="noti-icon">
                <div className="noti-icon-b">
                  <Image src={newslater_bell} alt="newslater_bell" />
                </div>
              </div>
              <p>{global_acf_options?.newsletter_sub_title}</p>
            </div>
          </div>

          {
            slug === 'services' || slug ==='industries' || slug === 'faq' ?
            <a
              href={global_acf_options?.newsletter_request_quote_button.url}
              className="btn service_newslater_hovered"
            >
              {global_acf_options?.newsletter_request_quote_button.title}
              <Image className="service_newslater" src={Request_btn} alt="Request_btn" />
            </a>:
            <div className="notification-email">
              <form onSubmit={handleSubmit}>
                <div className="f-fild">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}  
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn">
                    Subscribe now
                    <Image
                      className="Newslater_image"
                      src={infoDesk}
                      alt="infoDesk icon"
                    />
                  </button>
                </div>
              </form>
              {error && <div className="error-message">{error}</div>}
              {success && (
                <div className="success-message">
                  Successfully subscribed to the newsletter!
                </div>
              )}
            </div>
          }
        </div>
      </div>
      <style jsx>{`
        .error-message {
          color: red;
          font-size: 1rem;
          margin-top: 8px;
        }
        .success-message {
          color: #74d174;
          font-size: 0.9rem;
          margin-top: 8px;
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;
