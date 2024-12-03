import Footer from "../../component/FooterSection";
import Header from "../../component/HeaderSection";
import "./globals.css";
import "./fonts/font.css"
import TopButton from "../../component/TopButton";
import Cookies from "../../component/Cookies";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <Header/>
        <main>
        {children}
        <SpeedInsights/>
        </main>
        <TopButton/>
        <Cookies/>
        <Footer />
      </body>
    </html>
  );
}
