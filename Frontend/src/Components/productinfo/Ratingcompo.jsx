import React from 'react';
import GaugeChart from "react-gauge-chart";

const RatingGauge = ({ rating }) => {
  // Normalize the rating to a scale between 0 to 1 for the GaugeChart
  const normalizedRating = rating / 5;

  return (
    <div style={{ textAlign: "center", width: "100%", height: "auto" }}>
      {/* Gauge */}
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={5} // Divides the gauge into 5 color segments
        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]} // Equal segments
        colors={["#E53935", "#FB8C00", "#FFCA28", "#66BB6A", "#43A047"]} // Color segments
        percent={normalizedRating} // Use normalized value (0 to 1)
        arcPadding={0.02}
        hideText={true} // Hide default percentage text
      />
      {/* Target the SVG with a custom class if necessary */}
      <style jsx>{`
        #gauge-chart svg {
          width: 100% !important;  /* Override global width */
          height: 100% !important; /* Override global height */
        }
      `}</style>

      {/* Star Rating */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "22px", fontWeight: "bold" }}>
          {rating} {/* Display rating as 1 decimal place */}
        </span>
        <span style={{ marginLeft: "5px", color: "gold", fontSize: "24px" }}>⭐</span>
      </div>
    </div>
  );
};

export default RatingGauge;
