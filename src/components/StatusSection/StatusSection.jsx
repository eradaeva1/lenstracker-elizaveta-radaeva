import React from "react";
import "../StatusCard/StatusCard";
import StatusCard from "../StatusCard/StatusCard";

const StatusSection = () => {
  return (
    <section className="status-section">
      <StatusCard
        icon="fa-regular fa-clock"
        title="Current Status"
        description="Lenses due for removal in 3 hours"
        isHighlighted={true}
      />
      <StatusCard
        icon="fa-regular fa-calendar"
        title="Next Replacement"
        description="Due in 2 days"
      />
      <StatusCard
        icon="fa-regular fa-eye"
        title="Today's Usage"
        description="You wore your lenses for 8 hours"
      />
    </section>
  );
};

export default StatusSection;
