import React, { useEffect, useRef, useState } from "react";
import { Circle } from "@rc-component/progress";
import "./Progressbar.css";

const Progressbar = ({ width }) => {
  const targetRef = useRef(null);                // Create a reference to the element
  const [percent, setPercent] = useState(0);     // Start progress at 0%

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {            // Check if element is in view
            const finalValue = parseInt(width);  // Get actual width like "90%" → 90
            let current = 0;

            const interval = setInterval(() => {
              if (current < finalValue) {
                current += 1;                    // Gradually increase value
                setPercent(current);            // Update state (causes re-render)
              } else {
                clearInterval(interval);        // Stop animation when done
              }
            }, 15);                              // Animation speed
          }
        });
      },
      { threshold: 0.5 }                         // Trigger when 50% of element is visible
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);       // Start observing
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);   // Clean up when unmounted
      }
    };
  }, [width]);                                   // Re-run only if width changes

  return (

  <div className="progress-bar" ref={targetRef}>
    <div className="circle-wrapper">
      <Circle
        percent={percent}
        strokeWidth={7}
        strokeColor="rgba(3, 248, 248, 0.5)"
        railWidth={2}
        railColor=" rgb(146, 144, 144)"
      />
    </div>
    <div className="progress-text">{percent}%</div>
  </div>

  );
};

export default Progressbar;
