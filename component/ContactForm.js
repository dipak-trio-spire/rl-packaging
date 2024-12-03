'use client';
import React, { useState } from "react";
import { useParams } from "next/navigation";

const ContactForm = () => {
  const router = useParams();
  const slug = router.slug;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); // For success message
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear specific error
    setSuccess(false); // Reset success state on input change
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Please fill out this field.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Please fill out this field.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Conditional phone validation
    if (slug === "about" && !formData.phone.trim()) {
      newErrors.phone = "Please fill out this field.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false); // Reset success message
    setErrorMessage("");
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const endpoint =
      process.env.NEXT_PUBLIC_SENDER_MAIL || "https://formspree.io/f/myzygrvq";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true); 
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
      } else {
        setErrorMessage(
          `Message could not be sent: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      setErrorMessage(
        "There was an issue submitting the form. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <div className="f-fild">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="f-fild">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {slug === "about" ? (
          <>
            <div className="f-fild">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            <div className="f-fild">
              <textarea
                rows={4}
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </>
        ) : (
          <div className="f-fild">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <p className="error-message">{errors.subject}</p>
            )}
          </div>
        )}

        <div className="f-fild-btn">
          <input
            className="btn"
            type="submit"
            value={loading ? "Submitting..." : "Request Now"}
            disabled={loading}
          />
          
          {/* <span
            style={{
              visibility: errors.name || errors.email ? "visible" : "hidden",
            }}
            className="wpcf7-spinner"
          ></span> */}
        </div>

        {/* Error Message Rendering */}
        {(errors.name || errors.email) && (
          <div className="wpcf7-response-output-error">
            One or more fields have an error. Please check and try again.
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="wpcf7-response-output-success">
            Submission Done.
          </div>
        )}

        {/* General Error Message */}
        {errorMessage && (
          <div className="wpcf7-response-output-error">{errorMessage}</div>
        )}
      </form>

      <style jsx>{`
        .wpcf7-response-output-error {
          color: red;
        }
        .wpcf7-response-output-success {
          color: green;
        }
      `}</style>
    </>
  );
};

export default ContactForm;
