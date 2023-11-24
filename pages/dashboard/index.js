/**
 * Title: Write a program using JavaScript on Index
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
 * Date: 15, November 2023
 */

import CartCard from "@/components/shared/loading/cartCard";
import Panel from "@/components/sidebar/Panel";
import { useGetCartQuery } from "@/services/cart/cartApi";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";

const Dashboard = () => {
  const { data, isLoading, error } = useGetCartQuery();
  const cart = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (error) {
      alert(error?.data?.message);
    }
  }, [error]);

  return (
    <Panel>
      <section className="h-full w-full">
        <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="p-4 border rounded">
                  <CartCard />
                </div>
              ))}
            </>
          ) : (
            <>
              {cart?.map((crt) =>
                crt?.rents?.map((rent) => (
                  <div
                    key={rent?._id}
                    className="flex flex-col gap-y-2.5 border p-4 rounded"
                  >
                    <Image
                      src={rent?.gallery[0].url}
                      alt={rent?.gallery[0]?.public_id}
                      width={100}
                      height={50}
                      className="object-cover rounded"
                    />

                    <article className="flex flex-col gap-y-2">
                      <div className="">
                        <h2 className="line-clamp-1">{rent?.title}</h2>
                        <p className="line-clamp-2 text-xs">
                          {rent?.description}
                        </p>
                      </div>
                      <div className="flex flex-row gap-x-2 items-start">
                        <Image
                          src={crt?.user?.avatar?.url}
                          alt={crt?.user?.avatar?.public_id}
                          height={25}
                          width={25}
                          className="h-[25px] w-[25px] rounded-secondary object-cover"
                        />
                        <div className="flex flex-col gap-y-0.5 flex-1 w-full">
                          <h2 className="text-sm">{crt?.user?.name}</h2>
                          <p className="text-xs !line-clamp-1">
                            {crt?.user?.email}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))
              )}
            </>
          )}
        </section>
      </section>
    </Panel>
  );
};

export default Dashboard;
