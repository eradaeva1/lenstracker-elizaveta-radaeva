import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import StatusCard from "../components/StatusCard/StatusCard";
import QuickActions from "../components/QuickActions/QuickActions";
import "./HomePage.scss"

const HomePage = () => {
  return (
    <div className="home__header">
      <Header />
      <main className="home__content">
        <HeroSection />
        <section className="home__status-cards">
          <StatusCard />
        </section>
      </main>
      <QuickActions className="home__actions"/>
    </div>
  );
};

export default HomePage;
