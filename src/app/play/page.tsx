import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGame from "@/components/PortfolioGame";

export default function PlayPage() {
  return <><Navbar /><main id="main-content" tabIndex={-1}><PortfolioGame /></main><Footer /></>;
}
