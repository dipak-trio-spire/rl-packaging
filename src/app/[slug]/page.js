'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Product from "@/app/[slug]/Product"
import Services from "@/app/[slug]/Services"
import About from "@/app/[slug]/About"
import Industries from "@/app/[slug]/Industries"
import Faq from "@/app/[slug]/Faq"   
import Contact from "@/app/[slug]/Contact"   
import Privacy_policy from "@/app/[slug]/Privacy_policy"   
import  Home  from '@/app/home/home';
const Page = () => {
    const router = useParams();
  const slug = router.slug;
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (slug === 'product') {
      setCurrentPage(<Product />);
    } else if(slug === 'services') {
      setCurrentPage(<Services />);
    }else if(slug === 'about') {
      setCurrentPage(<About />);
    }else if(slug === 'industries') {
        setCurrentPage(<Industries />);
    }else if(slug === 'faq') {
        setCurrentPage(<Faq />);
    }else if(slug === 'contact') {
        setCurrentPage(<Contact />);
    }else if(slug === 'privacy-policy') {
      setCurrentPage(<Privacy_policy />);
    }else {
      setCurrentPage(<Home />);
    }
  }, [slug]);

  return (
    <>
      {currentPage}
    </>
  )
}

export default Page