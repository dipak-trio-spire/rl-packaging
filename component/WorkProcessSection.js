
import React from "react";
import { useParams } from "next/navigation";

const WorkProcessSection = ({home_all_processes}) => {
  const router = useParams();
  const slug = router.slug;

    return (
      <section className="py work-process">
        <div className="container">
          <div className="work-process-wrapper">
          {home_all_processes &&
            home_all_processes.map((val,i) => (
              <div className="work-process-box">
              <div className="work-process-count">
                <div className="work-process-border">
                  <h2>{val.home_process_count}</h2>
                </div>
              </div>
              <div className="work-process-sub-content">
                <h3>{val.home_process_title}</h3>
                <p
                dangerouslySetInnerHTML={{
                  __html: val?.home_process_content
                    ?.replace(/<p>/g, "")
                    .replace(/<\/p>/g, ""),
                }}
              />
              </div>
            </div>
            ))
          }
          </div>
        </div>
      </section>
    );
  };
  
  export default WorkProcessSection;
  