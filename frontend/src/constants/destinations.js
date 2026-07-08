// Approximate lat/long converted to equirectangular x/y percentages,
// used by FlightPaths.jsx to draw routes from India to each destination.
export const DESTINATIONS = [
  { code: "YYZ", country: "Canada", city: "Toronto", x: 24, y: 32 },
  { code: "JFK", country: "USA", city: "New York", x: 20, y: 36 },
  { code: "LHR", country: "UK", city: "London", x: 48, y: 26 },
  { code: "FRA", country: "Germany", city: "Frankfurt", x: 51, y: 27 },
  { code: "SYD", country: "Australia", city: "Sydney", x: 85, y: 78 },
];

export const ORIGIN = { code: "BLR", country: "India", city: "Bengaluru", x: 66, y: 48 };
