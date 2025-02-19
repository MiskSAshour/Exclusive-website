import ExploreProducts from "../../small Components/ExploreProducts/ExploreProducts";
import Hero from "../../small Components/Hero/Hero";
import NewArrival from "../../small Components/NewArrival/NewArrival";
import Services from "../../small Components/Services/Services";
import BestSellingProducts from "../../small Components/BestSellingProducts/BestSellingProducts";
import BrowseByCategory from "../../small Components/BrowseByCategory/BrowseByCategory";
import FlashSales from "../../small Components/FlashSales/FlashSales";
import SidebarBanner from "../../small Components/SidebarBanner/SidebarBanner";
import ScrollToTopButton from "../../small Components/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <SidebarBanner />
      <FlashSales />
      <hr className="mb-8 lg:mb-[70px] bg-black h-[0.5px] mx-auto max-w-[18rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl" />
      <BrowseByCategory />
      <hr className="mb-8 lg:mb-[70px] bg-black h-[0.5px] mx-auto max-w-[18rem] sm:max-w-2xl xl:max-w-[1170px] lg:max-w-4xl" />
      <BestSellingProducts />
      <Hero />
      <ExploreProducts />
      <NewArrival />
      <Services />
      <ScrollToTopButton />
    </>
  );
}
