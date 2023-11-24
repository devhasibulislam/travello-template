/**
 * Title: Write a program using JavaScript on BlogPosts
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
 * Date: 04, October 2023
 */

import LoadImage from "@/components/shared/image/LoadImage";
import Image from "next/image";
import React from "react";
import { BiRightArrowAlt, BiRightArrowCircle } from "react-icons/bi";

const BlogPosts = () => {
  const posts = [
    {
      thumbnail: "/assets/static/Blogs & Guides/1.png",
      title: "Life's beauty lies in the journey, not the end",
      summary:
        "Life's symphony of wonders unfolds as we traverse its path, yet we tend to fixate.",
      createdAt: "20 July 2023",
      featured: true,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/2.png",
      title: "Top 3 Must Do Tours In Bali 2023",
      summary:
        "Explore the mystical beauty of Buds' ancient temples and lush rice terraces on a captivating cultural tour.",
      createdAt: "22 July 2023",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/3.png",
      title: "Best Restaurant in Maldives",
      summary:
        "Test the mystical beauty of foods and lush rice terraces on a captivating cultural tour.",
      createdAt: "24 July 2023",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/4.png",
      title: "Life is a Darling Adventure Here",
      summary:
        "The picturesque village nestled among lush green hills offered a serene escape from the bustling city life.",
      createdAt: "26 July 2023",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/5.png",
      title: "Life's beauty lies in the journey, not the end",
      summary:
        "Life's symphony of wonders unfolds as we traverse its path, yet we tend to fixate.",
      createdAt: "20 July 2023",
      featured: true,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/6.png",
      title: "Top 3 Must Do Tours In Bali 2023",
      summary:
        "Explore the mystical beauty of Buds' ancient temples and lush rice terraces on a captivating cultural tour.",
      createdAt: "22 July 2023",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/7.png",
      title: "Best Restaurant in Maldives",
      summary:
        "Test the mystical beauty of foods and lush rice terraces on a captivating cultural tour.",
      createdAt: "24 July 2023",
      featured: false,
    },
    {
      thumbnail: "/assets/static/Blogs & Guides/8.png",
      title: "Life is a Darling Adventure Here",
      summary:
        "The picturesque village nestled among lush green hills offered a serene escape from the bustling city life.",
      createdAt: "26 July 2023",
      featured: false,
    },
  ];

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      {posts.map((post, index) => (
        <div
          key={index}
          className="group flex flex-col gap-y-4 border rounded h-fit break-inside-avoid bg-white transition-color ease-linear delay-100 hover:border-primary relative"
        >
          <LoadImage
            src={post.thumbnail}
            alt={post.title}
            width={427}
            height={350}
            className="rounded-t w-full object-cover"
          />
          <article className="flex flex-col gap-y-2.5 px-4 pb-4">
            <h2 className="text-lg line-clamp-1">{post.title}</h2>
            <div className="mt-auto flex flex-col gap-y-2.5">
              <p className="text-sm line-clamp-2">{post.summary}</p>
              <p className="text-xs border border-secondary transition-colors ease-linear delay-100 group-hover:border-primary px-2 py-0.5 rounded-primary text-slate-500 flex items-center justify-between relative">
                {post.createdAt} •{" "}
                <span className="text-red-500/50 group-hover:text-red-500">
                  Not Available
                </span>
                <span className="absolute -right-1 bg-secondary rounded-secondary p-0.5 flex justify-center items-center transition-opacity ease-linear opacity-0 group-hover:opacity-100 border border-primary cursor-pointer sr-only">
                  <BiRightArrowAlt className="h-6 w-6 text-primary" />
                </span>
              </p>
            </div>
          </article>

          {post.featured && (
            <span className="absolute px-2 py-0.5 text-xs top-2 left-2 border border-primary rounded-primary bg-secondary">
              Featured
            </span>
          )}
        </div>
      ))}
    </section>
  );
};

export default BlogPosts;
