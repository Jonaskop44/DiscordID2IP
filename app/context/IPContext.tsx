"use client";

import axios from "axios";
import { FC, ReactNode, useEffect } from "react";

interface IPContextProps {
  children: ReactNode;
}

const IPContext: FC<IPContextProps> = ({ children }) => {
  useEffect(() => {
    const getIP = async () => {
      await axios.post("api/ip").catch((error) => {
        console.log(error);
      });
    };
    getIP();
  });

  return <div>{children}</div>;
};

export default IPContext;
