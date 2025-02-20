import React from "react";

const LensHistory = ({ lenses, token }) => (
  <section className="lens-history">
    <h2>Track Wear History</h2>
    {token ? (
      lenses.length > 0 ? (
        lenses.map((lens, index) => (
          <div className="lens-history__item" key={index}>
            <div className="lens-history__details">
              <div>
                <h3>{lens.brand}</h3>
                <p>{lens.type} • {lens.power}</p>
              </div>
              <span className={lens.status === "Active" ? "active" : "replaced"}>
                {lens.status === "Active" ? `Replace in ${lens.daysLeft} days` : "Replaced"}
              </span>
            </div>
            <p>Worn since: {lens.startDate}</p>
          </div>
        ))
      ) : (
        <p>No history yet.</p>
      )
    ) : (
      <p>No history yet.</p>
    )}
  </section>
);

export default LensHistory;