"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "../components/Modal";

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isButtonDisabled = value.length < 19 || value.length > 22;
    setDisabled(isButtonDisabled);
  }, [value]);

  return (
    <div>
      <div className="flex justify-center items-center bg-[#26262b] p-4">
        <FaSearch className="text-white size-7 mr-2" />
        <h1 className="text-3xl font-bold text-white">
          Discord ID to IP Converter
        </h1>
      </div>
      <div className="bg-[#2c2f33] h-full w-full fixed flex justify-center items-center">
        <div className="flex flex-col items-start">
          <label
            htmlFor="id"
            className="block text-sm font-medium leading-6 text-gray-300"
          >
            User ID / Any ID
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="id"
              autoComplete="off"
              placeholder="Enter ID"
              maxLength={22}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="block w-60 rounded-md border-0 outline-none py-1.5 px-2 text-white font-medium  shadow-sm placeholder:text-gray-400 bg-[#424b59] focus:ring-4 focus:ring-[#5c8dff] transition-all duration-200 ease-in-out"
            />
          </div>
          <button
            disabled={disabled}
            className={clsx(
              `p-2 bg-[#7289da] rounded-md text-white font-[350] mt-4`,
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => {
              setValue("");
              setOpen(true);
            }}
          >
            Convert
          </button>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Home;
