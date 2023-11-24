/**
 * Title: Write a program using JavaScript on [tour]
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
 * Date: 19, October 2023
 */

import Left from "@/components/detail/Left";
import Right from "@/components/detail/Right";
import Reviews from "@/components/shared/review/Reviews";
import Container from "@/components/shared/container/Container";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import FAQ from "@/components/detail/FAQ";
import { useGetRentQuery } from "@/services/rent/rentApi";

const DetailPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetRentQuery(router?.query?.id);
  const tour = useMemo(() => {
    return data?.data || {};
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>{tour?.title}</title>
      </Head>
      <Navbar />
      <div className="my-8">
        <Container>
          {isLoading ? (
            <div className="grid grid-cols-12 gap-8">
              <div className="lg:col-span-6 md:col-span-6 col-span-12">
                <div className="h-[500px] w-full rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="lg:col-span-6 md:col-span-6 col-span-12">
                <div className="w-full flex flex-col gap-y-4">
                  <div className="h-[200px] w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-[50px] w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-[100px] w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-[400px] w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-[50px] w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-[50px] w-full rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="h-full w-full flex flex-col gap-y-8">
                <div className="grid grid-cols-12 gap-8">
                  <Left tour={tour} />
                  <Right tour={tour} />
                </div>
                <FAQ />
                <Reviews />
              </div>
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;
