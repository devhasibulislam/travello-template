/**
 * Title: Write a program using JavaScript on FAQ
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

import React, { useState } from "react";
import Container from "../shared/container/Container";
import HighlightText from "../shared/highlightText/HighlightText";
import LoadImage from "../shared/image/LoadImage";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const faqs = [
    {
      question: "What are some essential items to pack for a trip?",
      answer:
        "Consider packing essentials such as travel documents, toiletries, clothing suitable for the destination's weather, chargers, and any necessary medications. Don't forget adaptors for electrical outlets if you're traveling internationally.",
    },
    {
      question:
        "How far in advance should I book my flights and accommodation?",
      answer:
        "It's advisable to book flights at least a few weeks in advance to secure better prices. Accommodation should also be booked in advance, especially during peak seasons, to ensure availability and potentially get lower rates.",
    },
    {
      question: "How can I stay organized during travel?",
      answer:
        "Use travel apps for itinerary management, pack strategically with packing cubes, and keep important documents together. It's also helpful to have a checklist to ensure nothing is forgotten.",
    },
    {
      question: "What's the best way to manage finances while traveling?",
      answer:
        "Inform your bank about your travel dates to avoid any issues with your credit/debit cards. Consider carrying a mix of cash and cards. Use secure ATMs, and keep a record of your transactions. Travel insurance can also provide financial protection.",
    },
    {
      question: "How do I stay healthy during a trip?",
      answer:
        "Stay hydrated, get enough rest, and be mindful of what you eat. Carry a basic first aid kit, including any necessary medications. If traveling to a new time zone, adjust your sleep schedule gradually to minimize jet lag.",
    },
    {
      question: "What safety precautions should I take when traveling solo?",
      answer:
        "Inform someone about your itinerary and check in regularly. Stay in well-reviewed accommodations, be cautious with alcohol consumption, and trust your instincts. Keep emergency contacts handy and know the local emergency numbers.",
    },
    {
      question:
        "How can I immerse myself in the local culture while traveling?",
      answer:
        "Explore local markets, try traditional foods, and engage with locals. Learn a few basic phrases in the local language, participate in cultural activities, and be respectful of local customs and traditions.",
    },
    {
      question: "How can I minimize my environmental impact while traveling?",
      answer:
        "Use reusable water bottles and bags, opt for eco-friendly accommodations, and choose sustainable transportation options when possible. Respect local wildlife and natural environments, and dispose of waste responsibly.",
    },
    {
      question: "What should I do in case of an emergency during my travels?",
      answer:
        "Keep a list of emergency contacts, know the location of the nearest embassy or consulate, and have a copy of important documents (passport, ID). Familiarize yourself with local emergency services and have travel insurance for medical emergencies.",
    },
  ];

  const handleToggleCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="h-full py-12">
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText>F.A.Q.</HighlightText> from Travellers
              <LoadImage
                src="/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5"
              />
            </h1>
            <p className="text-base">
              Frequently Asked Questions from travelers about this tour
            </p>
          </article>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {faqs.map((faq, index) => (
              <Card
                faq={faq}
                key={index}
                index={index}
                isExpanded={expandedIndex === index}
                onToggleCollapse={() => handleToggleCollapse(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

function Card({ index, faq, isExpanded, onToggleCollapse }) {
  return (
    <article
      className="group flex flex-col gap-y-1.5 relative border border-secondary rounded p-4 hover:border-primary transition-colors"
      onClick={onToggleCollapse}
    >
      <h1 className="text-5xl text-secondary/80 font-bold">{index + 1}</h1>
      <h2
        className={
          "text-lg flex flex-row justify-between items-start cursor-pointer relative w-full" +
          " " +
          (isExpanded
            ? "rounded-r rounded-t !line-clamp-1"
            : "rounded !line-clamp-1")
        }
      >
        {faq.question}
      </h2>
      <span className="p-0.5 border rounded-primary absolute top-1.5 right-1.5 bg-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        {isExpanded ? (
          <BiChevronUp className="h-5 w-5" />
        ) : (
          <BiChevronDown className="h-5 w-5" />
        )}
      </span>
      {isExpanded && (
        <div className="absolute top-8 left-0 w-full z-50 border p-4 rounded bg-white mt-2">
          <h2 className="mb-2 text-base">{faq.question}</h2>
          <p className="text-sm">
            {faq.answer}
          </p>
          <span className="triangle absolute -top-3 right-2" />

          <style js>
            {`
              .triangle {
                  width: 0px;
                  height: 0px;
                  border-style: solid;
                  border-width: 0 10px 10px 10px;
                  border-color: transparent transparent #000 transparent;
                  transform: rotate(0deg);
              }
            `}
          </style>
        </div>
      )}
    </article>
  );
}

export default FAQ;
