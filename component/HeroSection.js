import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import infoDesk from "../public/img/infidesk.svg"
const HeroSection = ({
  bg_image,
  logo,
  main_title,
  sub_title,
  button1_title,
  button1_url,
  button2_title,
  button2_url,
  content,
  images,
  placeholder_title,
  about_hero_box_left_section,
  about_hero_box_right_section,
  about_hero_box_center_image,
}) => {
  const router = useParams();
  const slug = router.slug;

  return (
    <>
    {slug === undefined && (
        <section className="hero">
          <div className="container">
            <div className="hero-wrapper">
              <div className="hero-text">
                <span>{sub_title}</span>
                <div className="hero-title">
                {
                  logo && 
                  <img src={logo} alt="title logo"  />
                }
                  <h1>{main_title}</h1>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: content?.replace(/<p>/g, "").replace(/<\/p>/g, ""),
                  }}
                />
                <div className="hero-btn">
                {
                  (button1_url && button2_url) && 
                  <>

                  <a href={button1_url} className="btn" target="_blank">
                    {button1_title}
                    <Image src={infoDesk} alt="infoDesk icon"/>
                  </a>
                  <a href={button2_url} className="btn-b" target="_blank">
                    {button2_title}
                  </a>
                  </>
                }
                </div>
              </div>
              <div className="hero-img">
                {images &&
                  images.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt="hero Picture"
                      width={300}
                      height={300}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "product" && (
        <section
          className="sun-banner"
          style={{
            background: `url(${bg_image}) center / cover no-repeat`,
          }}
        >
          <div className="container">
            <div className="sub-banner-wrapper">
              <div className="sub-title">
                <p>{placeholder_title}</p>
              </div>
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
              <h1>{main_title}</h1>
              <div className="sub-text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: content?.replace(/<p>/g, "").replace(/<\/p>/g, ""),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "services" && (
        <section
          className="ser-banner"
          style={{
            background: `url(${bg_image}) center / cover no-repeat`,
          }}
        >
          <div className="container">
            <div className="ser-banner-wrapper">
              <div className="ser-banner-text">
                <div className="sub-title">
                  <p>{placeholder_title}</p>
                </div>
                {
                  sub_title && 
                <div className="tag">
                  <div className="tag-a">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                  </div>
                  <span>{sub_title}</span>
                </div>
                }
                <h1>{main_title}</h1>
                <div className="text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: content
                        ?.replace(/<p>/g, "")
                        .replace(/<\/p>/g, ""),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "about" && (
        <section
          className="about-banner"
          style={{
            background: `url(${bg_image}) center / cover no-repeat`,
          }}
        >
          <div className="container">
            <div className="sub-banner-wrapper about-banner-wrapper">
              <div className="sub-title">
                <p>{placeholder_title}</p>
              </div>
              <div className="tag">
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
              </div>
              <h1
                dangerouslySetInnerHTML={{
                  __html: main_title,
                }}
              ></h1>
              <div className="sub-text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: content?.replace(/<p>/g, "").replace(/<\/p>/g, ""),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="about-bg">
            <div className="about-bg-boxs">
              {about_hero_box_left_section?.map((item, index) => (
                <div className="about-bg-box" key={index}>
                  {item.about_hero_box_left_section_content_box_group
                    .about_hero_box_left_section_content_box_group_count &&
                    item.about_hero_box_left_section_content_box_group
                      .about_hero_box_left_section_content_box_group_description && (
                      <div
                        className={`com-box ${item.about_hero_box_left_section_content_box_group.about_hero_box_left_section_content_box_group_background_color}`}
                      >
                        <div className="com-box-b">
                          {item.about_hero_box_left_section_content_box_group
                            .about_hero_box_left_section_content_box_group_count && (
                            <span>
                              {
                                item
                                  .about_hero_box_left_section_content_box_group
                                  .about_hero_box_left_section_content_box_group_count
                              }
                            </span>
                          )}
                          {item.about_hero_box_left_section_content_box_group
                            .about_hero_box_left_section_content_box_group_description && (
                            <p>
                              {
                                item
                                  .about_hero_box_left_section_content_box_group
                                  .about_hero_box_left_section_content_box_group_description
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  {item.about_hero_box_left_section_image && (
                    <Image
                      src={item.about_hero_box_left_section_image.url}
                      alt={
                        item.about_hero_box_left_section_image.alt ||
                        "about image"
                      }
                      width={500}
                      height={500}
                    />
                  )}
                </div>
              ))}
            </div>
            <div class="about-bg-box">
              {about_hero_box_center_image && (
                <Image
                  src={about_hero_box_center_image.url}
                  alt={about_hero_box_center_image.alt || "about image"}
                  width={500}
                  height={500}
                />
              )}
            </div>
            <div className="about-bg-boxs">
              {about_hero_box_right_section?.map((item, index) => (
                <div className="about-bg-box" key={index}>
                  {item.about_hero_box_right_section_content_box_group
                    .about_hero_box_right_section_content_box_group_count &&
                    item.about_hero_box_right_section_content_box_group
                      .about_hero_box_right_section_content_box_group_description && (
                      <div
                        className={`com-box ${item.about_hero_box_right_section_content_box_group.about_hero_box_right_section_content_box_group_background_color}`}
                      >
                        <div className="com-box-b">
                          <span>
                            {
                              item
                                .about_hero_box_right_section_content_box_group
                                .about_hero_box_right_section_content_box_group_count
                            }
                          </span>
                          <p>
                            {
                              item
                                .about_hero_box_right_section_content_box_group
                                .about_hero_box_right_section_content_box_group_description
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  {item.about_hero_box_right_section_image && (
                    <Image
                      src={item.about_hero_box_right_section_image.url}
                      alt={
                        item.about_hero_box_right_section_image.alt ||
                        "about image"
                      }
                      width={500}
                      height={500}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {slug === "industries" && (
        <section
          className="ser-banner"
          style={{
            background: `url(${bg_image}) center / cover no-repeat`,
          }}
        >
          <div className="container">
            <div className="ser-banner-wrapper">
              <div className="ser-banner-text">
                <div className="sub-title">
                  <p>{placeholder_title}</p>
                </div>
                <div className="tag">
                  <div className="tag-a">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                  </div>
                  <span>{sub_title}</span>
                </div>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: main_title,
                  }}
                ></h1>
                <div className="text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: content
                        ?.replace(/<p>/g, "")
                        .replace(/<\/p>/g, ""),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {slug === "faq" && (
        <section
          className="ser-banner"
          style={{
            background: `url(${bg_image}) center / cover no-repeat`,
          }}
        >
          <div className="container">
            <div className="ser-banner-wrapper">
              <div className="ser-banner-text">
                <div className="sub-title">
                  <p>{placeholder_title}</p>
                </div>
                <div className="tag">
                  <div className="tag-a">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                  </div>
                  <span>{sub_title}</span>
                </div>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: main_title,
                  }}
                ></h1>
              </div>
            </div>
          </div>
        </section>
      )}

    </>
  );
};

export default HeroSection;
