"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const SpecializationSection = ({
main_title,
sub_title,
home_all_specializations
}) => {
  const router = useParams();
  const slug = router.slug;
  return (
    <section className="specialization py">
      <div className="container">
        <div className="special-wrapper">
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
          <h2 dangerouslySetInnerHTML={{
                  __html: main_title
                }}>
              
            </h2>
          <div className="special-boxs">
          {home_all_specializations &&
           home_all_specializations?.map((val,i)=> (
              <div className="special-box">
              <Image
                src={val.home_all_specializations_image.url}
                alt="specialization"
                width={300}
                height={200}
              />
              <div className="special-content">
                <div className="special-icon">
                  <div className="special-icon-b" dangerouslySetInnerHTML={{
                  __html: val?.home_all_specializations_icon
                }}>
                  </div>
                </div>
                <div className="special-text">
                  <h3>{val.home_all_specializations_title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: val?.home_all_specializations_content
                        ?.replace(/<p>/g, "")
                        .replace(/<\/p>/g, ""),
                    }}
                  />
                </div>
              </div>
            </div>
            ))
          }
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializationSection;
