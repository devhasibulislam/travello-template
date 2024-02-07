/**
 * Title: Write a program using JavaScript on useGetCountryLatLng
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
 * Date: 26, January 2024
 */

import { useEffect, useState } from "react";

export default function useGetCountryLatLng(name) {
  const [latlng, setLatLng] = useState("");

  useEffect(() => {
    const getCountry = async () => {
      const request = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const country = await request.json();
      setLatLng(country[0]?.latlng?.join(", "));
    };

    getCountry();
  });

  return latlng;
}
