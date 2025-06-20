/** @format */
"use client";
import React, { useEffect, useRef, useState } from "react";
import logo1 from "../../../assets/digitalMarketing/tools/analytics.png";
import logo2 from "../../../assets/digitalMarketing/tools/blinkit.png";
import logo3 from "../../../assets/digitalMarketing/tools/buffer.png";
import logo4 from "../../../assets/digitalMarketing/tools/canva.png";
import logo5 from "../../../assets/digitalMarketing/tools/commerce.png";
import logo6 from "../../../assets/digitalMarketing/tools/fbAds.png";
import logo7 from "../../../assets/digitalMarketing/tools/fbbusiness.png";
import logo8 from "../../../assets/digitalMarketing/tools/gtmatrix.png";
import logo9 from "../../../assets/digitalMarketing/tools/hotsuit.png";
import logo10 from "../../../assets/digitalMarketing/tools/hubspot.png";
import logo11 from "../../../assets/digitalMarketing/tools/mailchimp.png";
import logo12 from "../../../assets/digitalMarketing/tools/meta.png";
import logo13 from "../../../assets/digitalMarketing/tools/metabusiness.png";
import logo14 from "../../../assets/digitalMarketing/tools/quora.png";
import logo15 from "../../../assets/digitalMarketing/tools/searchgoogle.png";
import logo16 from "../../../assets/digitalMarketing/tools/semrush.png";
import logo17 from "../../../assets/digitalMarketing/tools/snapchat.png";
import logo18 from "../../../assets/digitalMarketing/tools/youtube.png";
import logo19 from "../../../assets/digitalMarketing/tools/ubersuggest.png";
import logo20 from "../../../assets/digitalMarketing/tools/wordpress.png";
// import Image from "next/image";

const logoColumnsData = [
  [logo1, logo2, logo3, logo4, logo5, logo16],
  [logo6, logo7, logo8, logo9, logo10, logo17],
  [logo11, logo12, logo13, logo14, logo15, logo18, logo19, logo20],
];

const ScrollColumn = ({ logos, duration }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const totalHeight =
        Array.from(container.children).reduce(
          (sum, item) => sum + item.offsetHeight,
          0
        ) / 2;
      container.style.paddingBottom = `${totalHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const styleSheet = document.styleSheets[0];
      const keyframes = `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }`;
      try {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      } catch (e) {
        console.warn("Animation already added or cannot insert rule:", e);
      }
    }
  }, []);

  return (
    <div style={styles.logoColumn}>
      <div
        ref={scrollRef}
        style={{ ...styles.scrollContainer, animationDuration: `${duration}s` }}
      >
        {[...logos, ...logos].map((alt, idx) => (
          <div style={styles.logoItem} key={idx}>
            <img src={alt} alt={alt} style={styles.logoImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ScrollingLogos = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>
          Master 100+ Powerful
          <br />
          Digital Marketing Tools
        </h1>
        <p style={styles.paragraph}>
          Learn Digital Marketing Program by working on cutting edge tools used
          by experts in real-time. Gain hands on experience by working on tools
          that transform strategies and measurable results.
        </p>
      </div>

      <div style={styles.logoColumns}>
        {logoColumnsData.map((logos, index) => (
          <ScrollColumn key={index} logos={logos} duration={30 - index * 5} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap:'wrap',
    padding: "20px 40px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    width:'100%',
    padding: "20px",
  },
  heading: {
    fontSize: "42px",
    marginBottom: "20px",
    color: "#333",
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#666",
    marginBottom: "30px",
  },
  logoColumns: {
    flex:1,
    display: "flex",
    gap: "20px",
    width: "100%",
  },
  logoColumn: {
    height: "600px",
    overflow: "hidden",
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  scrollContainer: {
    position: "absolute",
    width: "100%",
    animationName: "scrollUp",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  logoItem: {
    height: "120px",
    margin: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  logoImage: {
    maxWidth: "80%",
    maxHeight: "60%",
    objectFit: "contain",
  },
};

export default ScrollingLogos;
