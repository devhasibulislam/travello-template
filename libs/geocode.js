/**
 * Title: Write a program using JavaScript on Geocode
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 21, October 2023
 */

import countries from "world-countries";

const findCountry = (name) => {
  return countries.find(
    (country) => country.name.common.toLowerCase() === name.toLowerCase()
  );
};

const geocode = (location) => {
  const country = findCountry(location);

  if (!country) {
    throw new Error("Country not found!");
  }

  const { latlng } = country;
  const [lat, lon] = latlng;

  return { lat, lon };
};

export default geocode;
