const tours = [
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d3e",
    host: "James Lee",
    title: "Noble room into the historical Torino",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "We are in a building of from the 1800's, in a quiet street but in the heart of historic Turin. to 10 min. the biggest square in Europe 'Piazza Vittorio' where ther's the night life. Convenient to all services. In the district you can find every day a local market with fresh produce, but there are also different supermarket. The small electric bus 'Star1' near the house will lead you under the 'Mole Antonelliana' with the Cinema museum, also Egyptian Museum or even the mayestic Piazza Castello.",
    rating: {
      views: 159,
      number: 4,
    },
    pricingDetails: {
      amount: 41,
      deal: "person", // person or night or etc.
    },
    guests: {
      adults: 2,
      children: 1,
      infants: 3,
      pets: 1,
    },
    location: "Barcelona, Catalunya, Spain",
    status: "top rated",
    leastDuration: "1 day, 2 nights",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d4e",
    host: "Daniel Park",
    title: "Double room in lovely apartment",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "Located in a quiet area of Milan, it is well connected to the city center (20 minutes) and the airport (15 minutes). Bus, tram, and train stops are just a few steps from home. The apartment is shared with me who will make sure you have everything you need for a pleasant stay. Breakfast is not included but I will offer comfort and lots of tips about the city!",
    rating: {
      views: 45,
      number: 5,
    },
    pricingDetails: {
      amount: 41,
      deal: "night", // person or night or etc.
    },
    guests: {
      adults: 4,
      children: 2,
      infants: 3,
      pets: 0,
    },
    location: "Wirobrajan, Indonesia",
    status: "10% off",
    leastDuration: "2 days, 3 nights",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d5e",
    host: "Jack Kim",
    title: "GGD Art house -wifi-air conditioning",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "Large room in the artist's home-studio, located a few steps from the most important historical and architectural monuments of the city. The flat is characterized by a sequence of spaces that open onto large green balconies and panoramic windows. It is full of books and art objects and it is suitable for those who love to stay in a quiet and welcoming place. Really recommended for travelers that like exploring lifestyles and get in touch with the authentic and surprising Palermo.",
    rating: {
      views: 79,
      number: 2,
    },
    pricingDetails: {
      amount: 41,
      deal: "night", // person or night or etc.
    },
    guests: {
      adults: 1,
      children: 2,
      infants: 0,
      pets: 1,
    },
    location: "Palermo, Sicily, Italy",
    status: "flash sale",
    leastDuration: "2 days, 3 nights",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d6e",
    host: "Samuel Seo",
    title: "Twin room in Historic Georgian Home",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "We have a beautiful free bedroom in our hippie chic house in the heart of the city. It has a double bed where you will wake up with the early morning light which comes from the balcony.",
    rating: {
      views: 35,
      number: 2,
    },
    pricingDetails: {
      amount: 72,
      deal: "person", // person or night or etc.
    },
    guests: {
      adults: 1,
      children: 1,
      infants: 0,
      pets: 1,
    },
    location: "Edinburgh, United Kingdom",
    status: "50% off",
    leastDuration: "3 days, 2 nights",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7z1b5d6e",
    host: "Tom Lee",
    title: "Sunny bedroom in Gràcia",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "There's a cosy living room where you can rest or chill down while reading a book. We have a big table we use to do some work or in case you to have some fresh air you can also stay in the terrace. We have an american big kitchen perfect for cooking lovers.",
    rating: {
      views: 119,
      number: 3,
    },
    pricingDetails: {
      amount: 88,
      deal: "night", // person or night or etc.
    },
    guests: {
      adults: 2,
      children: 1,
      infants: 1,
      pets: 2,
    },
    location: "Barcelona, Catalunya, Spain",
    status: "black friday",
    leastDuration: "3 days, 3 nights",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d9e",
    host: "Tom Lee",
    title: "Teras Sabin - Private Double Bed in City Center",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "This guesthouse has 2 floors located in Wirobrajan's Residential area, 8mins to city center. All the 3 private rooms located on the 2nd floor, fit for 2 person, and include a private toilet inside (water heater & AC). At the same floor, located the shared facilities; a pantry, dining table, lounge, small gallery, & a view-ing terrace. The 1st floor is where my parents spend their time plus a kitchen, a fish pond, and some shared area that you can use.",
    rating: {
      views: 97,
      number: 4,
    },
    pricingDetails: {
      amount: 72,
      deal: "person", // person or night or etc.
    },
    guests: {
      adults: 1,
      children: 1,
      infants: 1,
      pets: 1,
    },
    location: "Sandiago, Arizona, USA",
    status: "upto 70% off",
    leastDuration: "2 days, 2 nights",
  },
  {
    _id: "5f3e1e7e3f3d5b1kke7b5d6e",
    host: "Warren Chae",
    title: "Private garden, freshness, charm, calm",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "A high quality renovation, with personal bathrooms, to welcome you in the heart of Lyon. On the mythical Croix Rousse hill, nice surprises to discover await you. Quiet, charming, in a green setting: a real luxury. And exceptional in Lyon, very easy to find parking spaces 😊A high quality renovation, with personal bathrooms, to welcome you in the heart of Lyon. On the mythical Croix Rousse hill, nice surprises to discover await you. Quiet, charming, in a green setting: a real luxury. And exceptional in Lyon, very easy to find parking spaces 😊",
    rating: {
      views: 97,
      number: 5,
    },
    pricingDetails: {
      amount: 59,
      deal: "person", // person or night or etc.
    },
    guests: {
      adults: 2,
      children: 1,
      infants: 1,
      pets: 2,
    },
    location: "Lyon, France",
    status: "tornedo sale",
    leastDuration: "1 day, 2 nights",
  },
  {
    _id: "5f3e1e7e39cd5b1b7e7b5d9e",
    host: "Sinu Han",
    title: "Comfy room in modern apartment",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "The room has everything you need for a comfortable stay, including a double bed, towels, air conditioning, wardrobe space, and a private en-suite bathroom. There's also a desk setup if you're looking to work or study during your stay.",
    rating: {
      views: 77,
      number: 3,
    },
    pricingDetails: {
      amount: 30,
      deal: "night", // person or night or etc.
    },
    guests: {
      adults: 2,
      children: 3,
      infants: 4,
      pets: 2,
    },
    location: "Seddon, Victoria, Australia",
    status: "upto 20% off",
    leastDuration: "4 days, 5 nights",
  },
];

export default tours;
