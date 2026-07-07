import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FadeUp } from "./motion-primitives";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const dominatedCountries = [
  "United States of America",
  "Canada",
  "United Kingdom",
  "Portugal",
  "France",
  "Spain",
  "Belgium",
  "Netherlands",
  "Germany",
  "Switzerland",
  "Czech Republic",
  "Poland",
  "Serbia",
  "South Africa",
  "South Korea",
  "Australia",
  "Bangladesh",
];

// Coordinates for Dhaka, Bangladesh [Longitude, Latitude]
const homeBaseCoordinates: [number, number] = [90.4125, 23.8103];

const WorldMap = () => {
  // Calculates percentage based on 195 global countries
  const dominationPercentage = Math.round((dominatedCountries.length / 195) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center mt-24 w-full"
    >
      {/* Section Header */}
      <FadeUp className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan">Global Reach</p>
        <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Freelancing across{" "}
          <span className="text-gradient"> {dominationPercentage}% of the globe</span>.
        </h2>
      </FadeUp>

      {/* Map Container */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-8 relative">
        <div className="w-full flex justify-center overflow-hidden py-4 relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 120, center: [0, 20] }}
            className="w-full h-auto max-w-full drop-shadow-sm select-none"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isDominated = dominatedCountries.includes(geo.properties.name);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="country-tooltip"
                      data-tooltip-content={geo.properties.name}
                      className={
                        isDominated
                          ? "fill-primary opacity-90 hover:opacity-100 outline-none cursor-pointer transition-all duration-300"
                          : "fill-muted hover:fill-muted-foreground/20 outline-none transition-all duration-300"
                      }
                    />
                  );
                })
              }
            </Geographies>

            {/* Home Base Marker */}
            <Marker coordinates={homeBaseCoordinates}>
              <g
                className="cursor-pointer"
                transform="translate(-16, -31)"
                data-tooltip-id="country-tooltip"
                data-tooltip-content="Dhaka, Bangladesh (Home Base)"
              >
                <path
                  className="fill-destructive drop-shadow-md animate-pulse"
                  d="M16,1C9.38,1,4,6.38,4,13c0,6.42,10.83,17.25,11.3,17.71C15.49,30.9,15.75,31,16,31s0.51-0.1,0.7-0.29 C17.17,30.25,28,19.42,28,13C28,6.38,22.62,1,16,1z"
                />
                <circle cx="16" cy="13" fill="var(--background)" r="4" />
              </g>
            </Marker>
          </ComposableMap>

          {/* Frosted Glass Tooltip */}
          <Tooltip
            id="country-tooltip"
            className="!backdrop-blur-md !bg-card/80 !text-card-foreground font-medium text-xs rounded-xl !shadow-2xl !border !border-border/50 !px-3 !py-1.5 z-50"
            classNameArrow="hidden"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WorldMap;
