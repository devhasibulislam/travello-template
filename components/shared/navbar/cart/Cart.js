/**
 * Title: Write a program using JavaScript on Cart
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
 * Date: 25, November 2023
 */

import React, { useEffect, useMemo, useState } from "react";
import Tooltip from "../../tooltip/Tooltip";
import { IoCartOutline } from "react-icons/io5";
import Modal from "../../modal/Modal";
import HighlightText from "../../highlightText/HighlightText";
import CartCard from "../../loading/cartCard";
import Image from "next/image";
import { useGetCartQuery } from "@/services/cart/cartApi";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetCartQuery();
  const cart = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (error) {
      alert(error?.data?.message);
    }
  }, [error]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip text="Cart">
        <button
          className="p-1.5 border border-primary/20 hover:border-primary rounded"
          onClick={openModal}
        >
          <IoCartOutline className="text-lg" />
        </button>
      </Tooltip>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl drop-shadow">
            Check Your <HighlightText>Cart</HighlightText>
          </h1>
          <section className="h-full w-full">
            <section className="grid grid-cols-2 gap-4">
              {isLoading || cart?.length === 0 ? (
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
        </div>
      </Modal>
    </>
  );
};

export default Cart;
