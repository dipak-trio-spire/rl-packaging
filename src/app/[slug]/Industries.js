"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NewsletterSection from '../../../component/NewsletterSection';
import HeroSection from "../../../component/HeroSection";
import { useParams } from "next/navigation";
import { fetchHomedata } from "../../../untils/Fetchdata";

const Page = () => {
  const router = useParams();
  const slug = router.slug;

  const [industries, setindustries] = useState(null);
  const [Newslater, setNewslater] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchHomedata(slug);
        setindustries(result.page_acf_fields);
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
      bg_image={industries?.industries_banner_background_image}
      main_title={industries?.industries_banner_main_title}
      sub_title={industries?.industries_banner_sub_title}
      content={industries?.product_hero_content}
      placeholder_title={industries?.industries_banner_placeholder_title}
    />

  <section className="industries py py-b" style={{ backgroundImage: 'url(/img/work-process.png)' }}>
      <div className="container">
        <div className="indurtries-boxs">
        {
          industries?.industries_services &&
          industries?.industries_services.map((val,i)=> (
            <a href="#e-commerice" className="indurtries-box" key={i}>
            <div className="indurtries-box-b">
              <Image src={val?.industries_services_icon.url} alt="e-commerce" width={100} height={100} />
              <div className="title">
                <p>{val.industries_services_title}</p>
              </div>
            </div>
          </a>
          ))
        }
        </div>
      </div>
    </section>


    <section className="service-pg indeurtries-service">
      <div className="container">
        <div className="service-title py py-b">
          <div className="tag">
            <div className="tag-a">
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
            </div>
            <span>{industries?.industries_service_sub_title}</span>
            <div className="tag-b">
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
            </div>
          </div>
          
          <h2 dangerouslySetInnerHTML={{
            __html: industries?.industries_service_main_title}}></h2>
        </div>
      </div>

      {/* E-commerce */}
      {
        industries?.industries_services &&
        industries?.industries_services.map((val,i)=> (
          <div id="e-commerice" className="service-wrapper py" key={i}>
        <div className="container">
          <div className="service-wrapper-box">
            <div className="service-img">
              <Image src={val.industries_services_images.url} alt="e-commerce image" width={500} height={300} />
            </div>
            <div className="service-content">
              <h3>{val.industries_services_title}</h3>
              <div className="sub-text" dangerouslySetInnerHTML={{
            __html: val.industries_services_content}}>
                
              </div>
            </div>
          </div>
        </div>
      </div>
        ))
      }
    </section>
    <NewsletterSection industries_newsletter_background_image={industries?.industries_newsletter_background_image.url} global_acf_options={Newslater} className={'indeurtries-nl'}/>
    </>
  )
}

export default Page