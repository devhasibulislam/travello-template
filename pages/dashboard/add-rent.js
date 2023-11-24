/**
 * Title: Write a program using JavaScript on Add Rent
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
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { HiOutlineMinus } from "react-icons/hi";
import { GrCloudUpload } from "react-icons/gr";
import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import { useSelector } from "react-redux";
import { useAddRentMutation } from "@/services/rent/rentApi";

const AddRent = () => {
  const countries = useGetCountries();
  const [galleryPreview, setGalleryPreview] = useState([]);
  const user = useSelector((state) => state?.user);
  const [addRent, { isLoading, data, error }] = useAddRentMutation();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      informationArray: [{ information: "" }],
      timeArray: [{ time: "" }],
    },
  });

  useEffect(() => {
    if (data) {
      alert(data?.message);
    }
    if (error?.data) {
      alert(error?.data?.message);
    }
    if (isLoading) {
      setGalleryPreview([]);
      reset();
    }
  }, [data, error, isLoading, reset]);

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

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("members", data.members);
    formData.append("location", data.location);
    formData.append("type", data.type);
    formData.append("user", user?._id);

    data.informationArray.forEach((field) => {
      formData.append(
        "informationArray",
        JSON.stringify({ information: field.information })
      );
    });

    data.timeArray.forEach((field) => {
      formData.append("timeArray", JSON.stringify({ time: field.time }));
    });

    for (let i = 0; i < data.gallery.length; i++) {
      formData.append("gallery", data.gallery[i]);
    }

    formData.append(
      "duration",
      JSON.stringify({
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      })
    );

    addRent(formData);
  };

  return (
    <Panel>
      <section className="h-full">
        <form
          className="grid grid-cols-12 lg:gap-x-6 gap-4 relative"
          onSubmit={handleSubmit(handleAddRent)}
        >
          {/* rent gallery */}
          <div className="lg:col-span-5 col-span-12">
            {galleryPreview?.length === 0 ? (
              <>
                <div className="w-full min-h-[300px] border-2 border-dashed rounded p-2 relative flex justify-center items-center">
                  <input
                    type="file"
                    name="gallery"
                    id="gallery"
                    multiple
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("gallery", {
                      required: true,
                      onChange: (event) => handleSetGalleryPreview(event),
                    })}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  />
                  <span className="flex flex-col gap-y-2 items-center">
                    <span className="p-4 rounded-secondary border">
                      <GrCloudUpload className="h-10 w-10" />
                    </span>
                    <span className="text-sm text-center">
                      Upload Gallery <br /> upto <b>5</b> Images
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-2">
                  {galleryPreview?.map((image, index) => (
                    <LoadImage
                      src={image}
                      key={index}
                      alt="gallery"
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
                </div>
              </>
            )}
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
                {...register("title", { required: true })}
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
                {...register("description", { required: true })}
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
                {...register("price", { required: true })}
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
                {...register("members", { required: true })}
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
                  {...register("startDate", { required: true })}
                  className="!rounded"
                />
              </label>

              {/* end date */}
              <label htmlFor="endDate" className="flex flex-col gap-y-2 flex-1">
                <span className="text-sm !text-white">Rent End Date*</span>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  {...register("endDate", { required: true })}
                  className="!rounded"
                />
              </label>
            </p>

            {/* rent location */}
            <label htmlFor="location" className="flex flex-col gap-y-2 flex-1">
              <span className="text-sm">Choose Location*</span>
              {countries?.length === 0 ? (
                <>Loading...</>
              ) : (
                <select
                  name="location"
                  id="location"
                  {...register("location", { required: true })}
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
                  {...register("type", { required: true })}
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
              disabled={isLoading}
              className="lg:col-span-7 col-span-12 py-2"
            >
              {isLoading ? "Loading..." : "Add New Rent"}
            </Button>
          </div>
        </form>
      </section>
    </Panel>
  );
};

export default AddRent;
