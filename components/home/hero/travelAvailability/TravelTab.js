/**
 * Title: Write a program using JavaScript on TravelTab
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
 * Date: 17, August 2023
 */

import { addTravelAvailability } from "@/features/travelAvailability/travelAvailabilitySlice";
import React, { useEffect, useState } from "react";
import {
  MdFlight,
  MdLocalHotel,
  MdTour,
  MdDirectionsCar,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const TravelTab = () => {
  const travelAvailability = useSelector((state) => state?.travelAvailability);
  const [selectedTab, setSelectedTab] = useState(
    travelAvailability?.travelType || "tour"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTravelAvailability({ travelType: selectedTab }));
  }, [dispatch, selectedTab]);

  const tabs = [
    {
      id: "tour",
      name: "Tour",
      icon: <MdTour />,
    },
    {
      id: "hotel",
      name: "Hotel",
      icon: <MdLocalHotel />,
    },
    {
      id: "flight",
      name: "Flight",
      icon: <MdFlight />,
    },
    {
      id: "car",
      name: "Car",
      icon: <MdDirectionsCar />,
    },
  ];

  return (
    <section>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {tabs.map(({ id, name, icon }) => (
          <button
            key={id}
            className={`px-3 py-1 flex flex-row flex-nowrap items-center gap-x-1.5 text-sm border border-primary rounded-primary shadow whitespace-nowrap ${
              selectedTab === id
                ? "bg-secondary text-primary"
                : "bg-primary text-secondary"
            }`}
            onClick={() => setSelectedTab(id)}
          >
            {icon}
            {name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TravelTab;
