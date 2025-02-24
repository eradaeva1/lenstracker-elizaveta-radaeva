import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import StatusCard from "../components/StatusCard/StatusCard";
import QuickActions from "../components/QuickActions/QuickActions";

const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <main className="home__content">
        <HeroSection />
        <section className="home__status-cards">
          <StatusCard />
        </section>
      </main>
      <QuickActions />
    </div>
  );
};

export default HomePage;
