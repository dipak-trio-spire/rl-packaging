"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import HeroSection from "../../../component/HeroSection";
import { useParams } from "next/navigation";
import { fetchHomedata , GetProductsPost } from "../../../untils/Fetchdata";
import Request_icon from "../../../public/img/Request_btn.svg"
import red_request_btn from "../../../public/img/red_request_btn.svg"

const Page = () => {
  const router = useParams();
  const slug = router.slug;

  const [Products, setProducts] = useState(null);
  const [ProductsPost , setProductsPost  ] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchHomedata(slug);
        setProducts(result.page_acf_fields);
      } catch (err) {
        setError("Failed to load home page data.");
      } finally {
        setIsLoading(false); // Stop the loader
      }
    };

    const GetProductPost = async () => {
      try {
        const response = await GetProductsPost();
        setProductsPost(response);
      } catch (err) {
        setError("Failed to load home page data.");
      }
    };

    loadHomeData();
    GetProductPost();
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
        bg_image={Products?.product_hero_background_image}
        main_title={Products?.product_hero_main_title}
        sub_title={Products?.product_hero_sub_title}
        content={Products?.product_hero_content}
        placeholder_title={Products?.product_hero_placeholder_title}
      />

      <section className="py expriness">
        <div className="container">
          <div className="expriness-wrpper">
            <div className="tag">
            {
              Products?.product_experience_sub_title &&
              <>
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{Products?.product_experience_sub_title}</span>
              <div className="tag-b">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              </>
            }
            </div>
            <div className="title">
            {
              Products?.product_experience_title_logo.url && 
                <Image
                  src={Products?.product_experience_title_logo.url}
                  width={100}
                  height={100}
                  alt="title logo"
                />
            }
              <h2>
                <span>{Products?.product_experience_main_title}</span>
              </h2>
            </div>
            <div className="expriness-boxs">
              {Products?.all_experience &&
                Products?.all_experience.map((val, i) => (
                  <div className="expriness-box" key={i}>
                    <Image
                      src={val.product_all_experience_image.url}
                      width={100}
                      height={100}
                      alt="experience"
                    />
                    <div className="expriness-content">
                      <div
                        className="ex-icon"
                        dangerouslySetInnerHTML={{
                          __html: val.product_all_experience_icon,
                        }}
                      ></div>
                      <div className="ex-title">
                        <h3>{val.product_all_experience_title}</h3>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: val?.product_all_experience_content
                              ?.replace(/<p>/g, "")
                              .replace(/<\/p>/g, ""),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py product">
        <div className="container">
          <div className="product-wrapper">
            <div className="tag">
            {
              Products?.product_overview_sub_title &&
              <>
              <div className="tag-a">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <span>{Products?.product_overview_sub_title}</span>
              <div className="tag-b">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              </>
            }
            </div>
            <h2
              dangerouslySetInnerHTML={{
                __html: Products?.product_overview_main_title,
              }}
            ></h2>
            <div className="product-boxs">
              {
                ProductsPost &&
                ProductsPost.map((val ,i ) =>(
                  <a href={val.link} className="product-box" key={i}>
                    <Image src={val.featured_image.url} width={val.featured_image.width} height={val.featured_image.height} alt="product" />
                    <div className="pr-title">
                      <h3>{val.title.rendered}</h3>
                      {/* <p>Packaging</p> */}
                    </div>
                  </a>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      <section class="order">
        <div class="container">
          <div class="order-wrapper">
            <div class="order-text">
              <h2
                dangerouslySetInnerHTML={{
                  __html: Products?.order_main_title,
                }}
              ></h2>
              <div class="order-btn">
                <a href={Products?.order_request_button.url} class="btn">
                  {Products?.order_request_button.title}
                  <Image src={Request_icon} alt="Request_icon" width={22} height={22}/>
                </a>
                <a href={Products?.order_apply_button.url} class="btn-b">
                  {Products?.order_apply_button.title}
                  <Image src={red_request_btn} alt="red_request_btn" width={22} height={22}/>
                </a>
              </div>
            </div>
            <div class="order-img">
              <Image
                src={Products?.order_images.url}
                width={Products?.order_images.width}
                height={Products?.order_images.height}
                className="./img/order.png"
                alt="order"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
