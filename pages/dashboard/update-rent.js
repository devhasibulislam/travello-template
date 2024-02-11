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

import hotelTypes from "@/data/hotelTypes";
import useGetCountries from "@/hooks/useGetCountries";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import { useRouter } from "next/router";
import {
  useGetRentQuery,
  useUpdateRentMutation,
} from "@/services/rent/rentApi";
import Panel from "@/layouts/Panel";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { CgTrash } from "react-icons/cg";
import { IoCloudUploadOutline } from "react-icons/io5";

const UpdateRent = () => {
  const [country, setCountry] = useState("Bangladesh");
  const { query } = useRouter();
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
    if (rentUpdating) {
      toast.loading("Updating rent...", { id: "update-rent" });
    }

    if (rentUpdateData) {
      toast.success(rentUpdateData?.message, { id: "update-rent" });
    }

    if (rentUpdateError?.data) {
      toast.error(rentUpdateError?.data?.message, { id: "update-rent" });
    }

    if (rentData) {
      toast.success(rentData?.message, { id: "fetch-rent" });
    }

    if (rentError) {
      toast.error(rentError?.data?.message, { id: "fetch-rent" });
    }
  }, [rentUpdating, rentUpdateData, rentUpdateError, rentError, rentData]);

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
      summary: rent?.summary || "",
      price: rent?.price || "",
      gallery: rent?.gallery || [],
      members: rent?.members || 1,
      duration: {
        startDate: formatDate(rent?.duration?.startDate) || "",
        endDate: formatDate(rent?.duration?.endDate) || "",
      },
      location: rent?.location || "",
      type: rent?.type || "",
      information: rent?.information?.map((item) => ({
        information: item,
      })) || [{ information: "" }],
      times: rent?.times?.map((item) => ({ times: item })) || [{ times: "" }],
    };
  }, [rent]);

  const { register, handleSubmit, control, reset } = useForm({ defaultValues });
  const [galleryPreview, setGalleryPreview] = useState([]);

  useEffect(() => {
    reset(defaultValues);
    setCountry(defaultValues?.location || "Bangladesh");
    setGalleryPreview(defaultValues?.gallery || []);
  }, [defaultValues, reset]);

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
    name: "information",
  });
  const {
    fields: timesFields,
    append: timesAppend,
    remove: timesRemove,
  } = useFieldArray({
    control,
    name: "times",
  });

  const countries = useGetCountries();
  const GeoLocation = useMemo(
    () =>
      dynamic(() => import("@/components/detail/GeoLocation"), {
        loading: () => <p className="font-sans">Map is loading...</p>,
        ssr: false,
      }),
    []
  );

  const handleAddRent = (data) => {
    const times = data.times.map((t) => t.times);
    const information = data.information.map((i) => i.information);

    const formData = new FormData();

    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("price", data?.price);
    formData.append("members", data?.members);
    formData.append("location", data?.location);
    formData.append("type", data?.type);

    for (let i = 0; i < information.length; i++) {
      formData.append("information", information[i]);
    }

    for (let i = 0; i < times.length; i++) {
      formData.append("times", times[i]);
    }

    if (Array.isArray(data.gallery) === false) {
      for (let i = 0; i < data.gallery.length; i++) {
        formData.append("gallery", data.gallery[i]);
      }
    } 

    formData.append("duration", JSON.stringify(data.duration));

    updateRent({
      id: rent?._id,
      body: formData,
    });
  };

  return (
    <Panel>
      {rentFetching ? (
        <div className="lg:w-1/2 md:w-3/4 w-full h-full flex flex-col gap-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="flex flex-col gap-y-3">
              <div className="w-1/2 h-4 rounded bg-gray-200 animate-pulse" />
              <div className="w-full h-6 rounded-secondary bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <form
          action=""
          className="text-sm lg:w-1/2 md:w-3/4 w-full h-full flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleAddRent)}
        >
          {/* gallery */}
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row overflow-x-auto gap-x-2">
              {galleryPreview?.map((image, index) => (
                <LoadImage
                  key={index}
                  src={image?.url ? image?.url : image}
                  alt={image?.public_id || "gallery"}
                  height={100}
                  width={100}
                  className="h-[100px] w-[100px] rounded object-cover"
                />
              ))}
            </div>
            <label htmlFor="gallery" className="relative">
              <button
                type="button"
                className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit"
              >
                <IoCloudUploadOutline className="h-5 w-5" />
                Choose upto 5 photos*
              </button>
              <input
                type="file"
                name="gallery"
                id="gallery"
                accept="image/png, image/jpg, image/jpeg"
                className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                multiple
                {...register("gallery", {
                  onChange: (event) => handleSetGalleryPreview(event),
                })}
              />
            </label>
          </div>

          {/* title */}
          <label htmlFor="title" className="flex flex-col gap-y-2">
            Rent Title*
            <input
              type="text"
              name="title"
              id="title"
              maxLength={100}
              placeholder="Type rent title here..."
              className="rounded"
              {...register("title")}
              maxlength="100"
            />
          </label>

          {/* summary */}
          <label htmlFor="summary" className="flex flex-col gap-y-2">
            Rent Summary*
            <textarea
              name="summary"
              id="summary"
              rows="5"
              maxLength={500}
              placeholder="Type rent summary here..."
              className="rounded"
              {...register("summary")}
              maxlength="500"
            ></textarea>
          </label>

          {/* price */}
          <label htmlFor="price" className="flex flex-col gap-y-2">
            Rent Price*
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Type rent price here..."
              className="rounded"
              {...register("price")}
            />
          </label>

          {/* members */}
          <label htmlFor="members" className="flex flex-col gap-y-2">
            Number of Members*
            <input
              type="number"
              name="members"
              id="members"
              placeholder="Type rent members here..."
              className="rounded"
              {...register("members")}
            />
          </label>

          {/* duration */}
          <div className="flex md:flex-row flex-col gap-4 w-full">
            {/* start date */}
            <label htmlFor="startDate" className="flex flex-col gap-y-2 w-full">
              Rent Start Date*
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="rounded"
                {...register("duration.startDate")}
              />
            </label>

            {/* end date */}
            <label htmlFor="endDate" className="flex flex-col gap-y-2 w-full">
              Rent End Date*
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="rounded"
                {...register("duration.endDate")}
              />
            </label>
          </div>

          {/* type */}
          <label htmlFor="type" className="flex flex-col gap-y-2">
            Choose Rent Type*
            <select
              name="type"
              id="type"
              className="rounded"
              {...register("type")}
            >
              {hotelTypes?.map(({ name }, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {/* location */}
          <div className="flex flex-col gap-y-4">
            <label htmlFor="location" className="flex flex-col gap-y-2">
              Choose Location*
              <select
                name="location"
                id="location"
                className="rounded"
                {...register("location", {
                  onChange: (e) => setCountry(e.target.value),
                })}
              >
                <option selected disabled>
                  {country}
                </option>
                {countries?.map((country, index) => (
                  <option key={index} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </label>
            <GeoLocation location={country} zoom={10} height="200px" />
          </div>

          {/* information */}
          <label htmlFor="information" className="flex flex-col gap-y-2">
            Additional Information*
            <p className="flex flex-col gap-y-2">
              {informationFields.map((field, index) => (
                <span
                  key={field.id}
                  className="flex flex-row gap-x-2 items-center"
                >
                  <input
                    type="text"
                    name={`information[${index}].information`}
                    id="information"
                    className="w-full rounded"
                    placeholder="Type information here..."
                    {...register(`information.${index}.information`)}
                    maxlength="100"
                  />
                  <button
                    type="button"
                    className="bg-red-100 border border-red-900 text-red-900 p-0.5 rounded-secondary"
                    onClick={() => informationRemove(index)}
                  >
                    <CgTrash className="w-4 h-4" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="bg-green-100 border border-green-900 text-green-900 py-1 rounded-secondary flex flex-row gap-x-1 items-center px-2 w-fit text-xs"
                onClick={() => informationAppend({ information: "" })}
              >
                <FiPlus className="w-4 h-4" /> Add information*
              </button>
            </p>
          </label>

          {/* times */}
          <label htmlFor="times" className="flex flex-col gap-y-2">
            Additional Times
            <p className="flex flex-col gap-y-2">
              {timesFields.map((field, index) => (
                <span
                  key={field.id}
                  className="flex flex-row gap-x-2 items-center"
                >
                  <input
                    type="text"
                    name={`times[${index}].times`}
                    id="times"
                    className="w-full rounded"
                    placeholder="Type times here..."
                    {...register(`times.${index}.times`)}
                    maxlength="100"
                  />
                  <button
                    type="button"
                    className="bg-red-100 border border-red-900 text-red-900 p-0.5 rounded-secondary"
                    onClick={() => timesRemove(index)}
                  >
                    <CgTrash className="w-4 h-4" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="bg-green-100 border border-green-900 text-green-900 py-1 rounded-secondary flex flex-row gap-x-1 items-center px-2 w-fit text-xs"
                onClick={() => timesAppend({ times: "" })}
              >
                <FiPlus className="w-4 h-4" /> Add Time*
              </button>
            </p>
          </label>

          <Button type="submit" className="py-2 mt-4">
            Create Rent
          </Button>
        </form>
      )}
    </Panel>
  );
};

export default UpdateRent;
