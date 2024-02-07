/**
 * Title: Write a program using JavaScript on UseGetCountries
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 17, August 2023
 */

import { useEffect, useState } from "react";

export default function useGetCountries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => {
          return {
            name: country.name.common,
            flag: country.flags.svg,
            latlng: country.latlng,
          };
        });

        const sortedCountries = countries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCountries(sortedCountries);
      });
  }, []);

  return countries;
}
