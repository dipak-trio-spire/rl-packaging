"use client";
import { useEffect, useRef } from "react";

const Testimonial_Caraousel = ({ AboutAllTestimonial }) => {
  const carouselRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadOwlCarousel = async () => {
        const jQueryScript = document.createElement("script");
        jQueryScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
        jQueryScript.onload = () => {
          const owlCarouselCSS = document.createElement("link");
          owlCarouselCSS.rel = "stylesheet";
          owlCarouselCSS.href =
            "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css";
          document.head.appendChild(owlCarouselCSS);

          const owlCarouselJS = document.createElement("script");
          owlCarouselJS.src =
            "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js";
          owlCarouselJS.onload = () => {
            window.$ = window.jQuery;
            initializeCarousel();
          };
          document.body.appendChild(owlCarouselJS);
        };
        document.body.appendChild(jQueryScript);
      };

      const initializeCarousel = () => {
        if (carouselRef.current) {
          jQuery(carouselRef.current).owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
            },
          });
        }
      };

      loadOwlCarousel();

      // Cleanup function to destroy the carousel on unmount
      return () => {
        if (carouselRef.current) {
          jQuery(carouselRef.current).trigger("destroy.owl.carousel");
        }
      };
    }
  }, [AboutAllTestimonial]);

  const renderRating = (rating) => {
    const filledStars = Math.floor(rating); // Get the number of filled stars
    const emptyStars = 5 - filledStars; // Calculate empty stars
    const stars = [];

    // Add filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <svg
        key={`filled-${i}`}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.28671 1.19529C7.51122 0.504304 8.48878 0.504305 8.71329 1.19529L10.0768 5.39159C10.1772 5.70061 10.4651 5.90983 10.79 5.90983H15.2023C15.9288 5.90983 16.2309 6.83954 15.6431 7.26659L12.0736 9.86005C11.8107 10.051 11.7007 10.3896 11.8011 10.6986L13.1646 14.8949C13.3891 15.5859 12.5982 16.1605 12.0104 15.7334L8.44084 13.1399C8.17797 12.949 7.82203 12.949 7.55916 13.1399L3.98957 15.7334C3.40179 16.1605 2.61093 15.5859 2.83544 14.8949L4.1989 10.6986C4.29931 10.3896 4.18931 10.051 3.92645 9.86005L0.356858 7.26659C-0.230927 6.83954 0.0711548 5.90983 0.797698 5.90983H5.20995C5.53487 5.90983 5.82284 5.70061 5.92325 5.39159L7.28671 1.19529Z"
          fill="#EE0000"
        />
      </svg>
      );
    }

   // Add empty stars
   for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
      key={`empty-${i}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M7.28671 1.19529C7.51122 0.504304 8.48878 0.504305 8.71329 1.19529L10.0768 5.39159C10.1772 5.70061 10.4651 5.90983 10.79 5.90983H15.2023C15.9288 5.90983 16.2309 6.83954 15.6431 7.26659L12.0736 9.86005C11.8107 10.051 11.7007 10.3896 11.8011 10.6986L13.1646 14.8949C13.3891 15.5859 12.5982 16.1605 12.0104 15.7334L8.44084 13.1399C8.17797 12.949 7.82203 12.949 7.55916 13.1399L3.98957 15.7334C3.40179 16.1605 2.61093 15.5859 2.83544 14.8949L4.1989 10.6986C4.29931 10.3896 4.18931 10.051 3.92645 9.86005L0.356858 7.26659C-0.230927 6.83954 0.0711548 5.90983 0.797698 5.90983H5.20995C5.53487 5.90983 5.82284 5.70061 5.92325 5.39159L7.28671 1.19529Z"
        fill="#EE0000"
      />
    </svg>
    );
  }

  return <div className="rating">{stars}</div>;
};
  return (
    <div className="pr-testimonal-boxs owl-carousel" ref={carouselRef}>
    {AboutAllTestimonial &&
      AboutAllTestimonial.map((val, i) => (
        <div className="pr-testimonal-box item" key={i}>
          <div className="pr-tes-img">
            <div className="title">
              <h3>{val.about_testimonial_name}</h3>
              <p>{val.about_testimonial_designation}</p>
            </div>
          </div>
          <div className="pr-tes-content">
            <p
              dangerouslySetInnerHTML={{
                __html: val.about_testimonial_content
              }}
            ></p>
            <div className="rating">
              {renderRating(val.about_testimonial_rating)}
            </div>
          </div>
        </div>
      ))}
  </div>
  );
};

export default Testimonial_Caraousel;
