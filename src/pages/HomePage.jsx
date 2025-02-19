import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import StatusCard from "../components/StatusCard/StatusCard";
import QuickActions from "../components/QuickActions/QuickActions";


// import StatusSection from "../components/StatusCard/StatusCard";
// import "../styles/home.scss";

const HomePage = () => {
 
  return (
    <div className="home">
      <Header />
      <main className="home__content">
        <HeroSection />
        <section className="home__status-cards">
        <StatusCard />
        {/* <StatusSection /> */}
          {/* {statusCards.map((card, index) => (
            <StatusCard key={index} title={card.title} description={card.description} icon={card.icon} modifier={card.modifier} />
          ))} */}
        </section>
      </main>
      <QuickActions />
    </div>
  );
};

export default HomePage;
