

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Fancybox from "../component/FancyBox";
import service_plus_icon from "../public/img/service_plus_icon.svg"
const ServiceSection = ({
main_title,
sub_title,
home_all_offers
}) => {
  const router = useParams();
  const slug = router.slug;

  return (
    <section className="service py">
      <div className="container">
        <div className="service-wrapper">
        <div className="tag">
        {
          sub_title && 
          <>
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{sub_title}</span>
              <div className="tag-b">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
          </>
        }
            </div>
            <h2 dangerouslySetInnerHTML={{
                  __html: main_title
                }}>
              
            </h2>
        </div>
      </div>
      <div className="service-boxs">
        <Fancybox group="gallery">
        {
         home_all_offers && 
         home_all_offers.map((val,i)=>(
            <div className="service-box">
            <Image src={val.home_all_offers_image.url} alt="service 1" width={300} height={200} />
            <a
              href={val.home_all_offers_image.url}
              data-fancybox="gallery"
              data-caption="Carton Boxes"
              className="service-content"
            >
              <div className="plus">
              <Image src={service_plus_icon} alt="service_plus_icon"/>
              </div>
              <h3>{val.home_all_offers_title}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: val?.home_all_offers_discription
                    ?.replace(/<p>/g, "")
                    .replace(/<\/p>/g, ""),
                }}
              />
            </a>
          </div>
          ))
        }
        </Fancybox>
      </div>
    </section>
  );
};

export default ServiceSection;
