/**
 * Title: Write a program using JavaScript on Update Rent
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
 * Date: 16, November 2023
 */

import Panel from "@/components/sidebar/Panel";
import hotelTypes from "@/data/hotelTypes";
import useGetCountries from "@/hooks/useGetCountries";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { HiOutlineMinus } from "react-icons/hi";
import { GrCloudUpload } from "react-icons/gr";
import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import { useRouter } from "next/router";
import {
  useGetRentQuery,
  useUpdateRentMutation,
} from "@/services/rent/rentApi";

const UpdateRent = () => {
  const { query } = useRouter();
  const countries = useGetCountries();
  const {
    data: rentData,
    isLoading: rentFetching,
    error: rentError,
  } = useGetRentQuery(query?.id);
  const [
    updateRent,
    { isLoading: rentUpdating, data: rentUpdateData, error: rentUpdateError },
  ] = useUpdateRentMutation();
  const rent = useMemo(() => rentData?.data || [], [rentData]);

  useEffect(() => {
    if (rentUpdateData) {
      alert(rentUpdateData?.message);
    }
    if (rentUpdateError?.data || rentError?.data) {
      alert(rentUpdateError?.data?.message || rentError?.data?.message);
    }
  }, [rentUpdateData, rentUpdateError, rentError]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const defaultValues = useMemo(() => {
    return {
      title: rent?.title || "",
      description: rent?.description || "",
      gallery: rent?.gallery || [],
      price: rent?.price || "",
      gallery: rent?.gallery || [],
      members: rent?.members || 1,
      startDate: formatDate(rent?.duration?.startDate) || "",
      endDate: formatDate(rent?.duration?.endDate) || "",
      location: rent?.location || "",
      type: rent?.type || "",
      informationArray: rent?.informationArray || [{ information: "" }],
      timeArray: rent?.timeArray || [{ time: "" }],
    };
  }, [rent]);

  const { register, handleSubmit, control, reset } = useForm({ defaultValues });
  const [galleryPreview, setGalleryPreview] = useState([]);

  useEffect(() => {
    reset(defaultValues);
    setGalleryPreview(defaultValues?.gallery || []);
  }, [defaultValues, reset, setGalleryPreview]);

  const handleSetGalleryPreview = (event) => {
    const files = event.target.files;
    const previewImages = [];

    if (files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      window.location.reload();
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        previewImages.push(e.target.result);
        if (previewImages.length === files.length) {
          setGalleryPreview(previewImages);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const {
    fields: informationFields,
    append: informationAppend,
    remove: informationRemove,
  } = useFieldArray({
    control,
    name: "informationArray",
  });
  const {
    fields: timeFields,
    append: timeAppend,
    remove: timeRemove,
  } = useFieldArray({
    control,
    name: "timeArray",
  });

  const handleAddRent = (data) => {
    const formData = new FormData();

    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("price", data?.price);
    formData.append("members", data?.members);
    formData.append("location", data?.location);
    formData.append("type", data?.type);

    data?.informationArray.forEach((field) => {
      formData.append(
        "informationArray",
        JSON.stringify({ information: field?.information })
      );
    });

    data?.timeArray.forEach((field) => {
      formData.append("timeArray", JSON.stringify({ time: field?.time }));
    });

    if (
      Array.isArray(galleryPreview) &&
      galleryPreview.every((item) => typeof item === "string")
    ) {
      for (let i = 0; i < data?.gallery.length; i++) {
        formData.append("gallery", data?.gallery[i]);
      }

      for (let i = 0; i < defaultValues?.gallery.length; i++) {
        formData.append("oldGallery", defaultValues?.gallery[i]?.public_id);
      }
    }

    formData.append(
      "duration",
      JSON.stringify({
        startDate: data?.startDate,
        endDate: data?.endDate,
      })
    );

    updateRent({
      id: query?.id,
      body: formData,
    });
  };

  return (
    <Panel>
      <section className="h-full">
        {rentFetching ? (
          <div className="grid grid-cols-12 lg:gap-x-6 gap-4">
            <div className="lg:col-span-5 col-span-12">
              <div className="w-full h-96 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="lg:col-span-7 col-span-12 flex flex-col gap-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="flex flex-col gap-y-3">
                  <div className="w-1/2 h-4 rounded bg-gray-200 animate-pulse" />
                  <div className="w-full h-6 rounded-secondary bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form
            className="grid grid-cols-12 lg:gap-x-6 gap-4 relative"
            onSubmit={handleSubmit(handleAddRent)}
          >
            {/* rent gallery */}
            <div className="lg:col-span-5 col-span-12">
              <div className="grid grid-cols-12 gap-y-2 gap-x-4 relative">
                {galleryPreview?.map((image, index) => (
                  <LoadImage
                    key={index}
                    src={image?.url || image}
                    alt={image?.public_id || index}
                    height={512}
                    width={364}
                    className={
                      "h-[200px] w-full rounded object-cover" +
                      (galleryPreview?.length === 1
                        ? " col-span-12"
                        : galleryPreview?.length === 2
                        ? " col-span-12"
                        : galleryPreview?.length === 3
                        ? index === 0
                          ? " col-span-12"
                          : " col-span-6"
                        : galleryPreview?.length === 4
                        ? index === 0 || index === 1
                          ? " col-span-12"
                          : " col-span-6"
                        : galleryPreview?.length === 5 && index === 0
                        ? " col-span-12"
                        : " col-span-6")
                    }
                  />
                ))}

                <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-50 rounded flex justify-center items-center">
                  <input
                    type="file"
                    name="gallery"
                    id="gallery"
                    multiple
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("gallery", {
                      onChange: (event) => handleSetGalleryPreview(event),
                    })}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  />
                  <span className="flex flex-col gap-y-2 items-center">
                    <span className="p-4 rounded-secondary border !border-white !text-white">
                      <GrCloudUpload className="h-10 w-10 !text-white" />
                    </span>
                    <span className="text-sm text-center text-white">
                      Upload Gallery <br /> upto <b>5</b> Images
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* rent form */}
            <div className="lg:col-span-7 col-span-12 flex flex-col gap-y-4">
              {/* rent title */}
              <label htmlFor="title" className="flex flex-col gap-y-2">
                <span className="text-sm">Rent Title*</span>
                <input
                  type="text"
                  name="title"
                  id="title"
                  {...register("title")}
                  placeholder="Type rent title here..."
                  className="!rounded"
                />
              </label>

              {/* rent description */}
              <label htmlFor="description" className="flex flex-col gap-y-2">
                <span className="text-sm">Rent Description*</span>
                <textarea
                  name="description"
                  id="description"
                  rows="5"
                  {...register("description")}
                  placeholder="Type rent description here..."
                  className="!rounded"
                ></textarea>
              </label>

              {/* rent price */}
              <label htmlFor="price" className="flex flex-col gap-y-2 flex-1">
                <span className="text-sm">Rent Price*</span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  {...register("price")}
                  placeholder="Type rent price here..."
                  className="!rounded"
                />
              </label>

              {/* number of members */}
              <label htmlFor="members" className="flex flex-col gap-y-2 flex-1">
                <span className="text-sm">Number of Members*</span>
                <input
                  type="number"
                  name="members"
                  id="members"
                  {...register("members")}
                  placeholder="Type rent members here..."
                  className="!rounded"
                />
              </label>

              {/* rent duration */}
              <p className="flex lg:flex-row flex-col gap-4">
                {/* start date */}
                <label
                  htmlFor="startDate"
                  className="flex flex-col gap-y-2 flex-1"
                >
                  <span className="text-sm !text-white">Rent Start Date*</span>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    {...register("startDate")}
                    className="!rounded text-white"
                  />
                </label>

                {/* end date */}
                <label
                  htmlFor="startDate"
                  className="flex flex-col gap-y-2 flex-1"
                >
                  <span className="text-sm !text-white">Rent End Date*</span>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    {...register("endDate")}
                    className="!rounded text-white"
                  />
                </label>
              </p>

              {/* rent location */}
              <label
                htmlFor="location"
                className="flex flex-col gap-y-2 flex-1"
              >
                <span className="text-sm">Choose Location*</span>
                {countries?.length === 0 ? (
                  <>Loading...</>
                ) : (
                  <select
                    name="location"
                    id="location"
                    {...register("location")}
                    className=""
                  >
                    {countries?.map((country, index) => (
                      <option key={index} value={country?.name?.toLowerCase()}>
                        {country?.name}
                      </option>
                    ))}
                  </select>
                )}
              </label>

              {/* rent types */}
              <label htmlFor="type" className="flex flex-col gap-y-2 flex-1">
                <span className="text-sm">Choose Rent Type*</span>
                {countries?.length === 0 ? (
                  <>Loading...</>
                ) : (
                  <select
                    name="type"
                    id="type"
                    {...register("type")}
                    className=""
                  >
                    {hotelTypes?.map((type, index) => (
                      <option key={index} value={type?.name?.toLowerCase()}>
                        {type?.name}
                      </option>
                    ))}
                  </select>
                )}
              </label>

              {/* important information */}
              <label htmlFor="information" className="flex flex-col gap-y-2">
                <span className="text-sm flex flex-row justify-between items-center">
                  Rent Feature Information*{" "}
                  <button
                    type="button"
                    onClick={() => informationAppend({ information: "" })}
                    className="p-0.5 border rounded-secondary bg-green-500 !text-black"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </span>
                {informationFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-row gap-x-2 items-center"
                  >
                    <input
                      type="text"
                      name={`informationArray[${index}].information`}
                      {...register(`informationArray[${index}].information`, {
                        required: true,
                      })}
                      placeholder="Type one-line information here..."
                      className="!rounded flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => informationRemove(index)}
                      className="p-0.5 border rounded-secondary bg-red-500 !text-black"
                    >
                      <HiOutlineMinus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </label>

              {/* open time */}
              <label htmlFor="time" className="flex flex-col gap-y-2">
                <span className="text-sm flex flex-row justify-between items-center">
                  Rent Open Time Information*{" "}
                  <button
                    type="button"
                    onClick={() => timeAppend({ time: "" })}
                    className="p-0.5 border rounded-secondary bg-green-500 !text-black"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </span>
                {timeFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-row gap-x-2 items-center"
                  >
                    <input
                      type="text"
                      name={`timeArray[${index}].time`}
                      {...register(`timeArray[${index}].time`, {
                        required: true,
                      })}
                      placeholder="Type open time information here..."
                      className="!rounded flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => timeRemove(index)}
                      className="p-0.5 border rounded-secondary bg-red-500 !text-black"
                    >
                      <HiOutlineMinus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </label>
            </div>

            <div className="col-span-12 grid grid-cols-12">
              <div className="lg:col-span-5" />
              <Button
                type="submit"
                disabled={rentUpdating}
                className="lg:col-span-7 col-span-12 py-2"
              >
                {rentUpdating ? "Loading..." : "Update Rent"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </Panel>
  );
};

export default UpdateRent;
