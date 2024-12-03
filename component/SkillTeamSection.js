"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import skill_request_icon from "../public/img/skill_request_icon.svg"
const SkillTeamSection = ({
  main_title,
sub_title,
home_who_we_are_discover_more_button,
home_who_we_are_images,
years_experience_group,
content,
ceo_details_group,
home_who_we_are_skills_listing,
expert_team_group
}) => {
  const router = useParams();
  const slug = router.slug;

  return (
    <section className="py skill-team">
      <div className="container">
        <div className="skill-team-wrapper">
          <div className="skill-team-img">
          {
            home_who_we_are_images &&
            home_who_we_are_images?.map((val,i)=>(
            <Image src={val.url} alt="skill-team" width={500} height={400} />
            ))
          }
            <div className="com-box">
              <div className="com-box-b">
                <span>{years_experience_group?.home_who_we_are_years_experience_count}</span>
                <p>{years_experience_group?.home_who_we_are_years_experience_content}</p>
              </div>
            </div>
          </div>

          <div className="skill-team-content">
            <div className="skill-team-title">
              <div className="tag">
                <div className="tag-a">
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                </div>
                <span>{sub_title}</span>
              </div>
              <h2 dangerouslySetInnerHTML={{
                  __html: main_title
                }}></h2>
            </div>

            <div className="skill-team-text">
            <p
                dangerouslySetInnerHTML={{
                  __html: content
                    ?.replace(/<p>/g, "")
                    .replace(/<\/p>/g, ""),
                }}
              />
              <div className="skill-team-btn-box">
                <a href={home_who_we_are_discover_more_button?.url} className="btn">
                  {home_who_we_are_discover_more_button?.title}
                  <Image src={skill_request_icon} alt="skill_request_icon"/>
                </a>
                <div className="user">
                  <Image src={ceo_details_group?.home_ceo_details_group_image?.url } alt="user" width={50} height={50} />
                  <div className="user-title">
                    <p>{ceo_details_group?.home_ceo_details_group_name}</p>
                    <p><span>{ceo_details_group?.home_ceo_details_group_designation}</span></p>
                  </div>
                </div>
              </div>

              <div className="skill-lists-box">
                <ul dangerouslySetInnerHTML={{
                  __html: home_who_we_are_skills_listing
                    ?.replace(/<ul>/g, "")
                    .replace(/<\/ul>/g, ""),
                }}>
                  
                </ul>
                <div className="com-box">
                  <div className="com-box-b">
                    <span>{expert_team_group?.home_who_we_are_expert_team_count}</span>
                    <p>{expert_team_group?.home_who_we_are_expert_team_content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillTeamSection;
