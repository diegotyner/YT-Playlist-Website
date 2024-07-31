"use client";

// import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [responseData, setResponseData] = useState("Hello");
  return (
    <>
      {!responseData ? (
        <p>
          Loading data... (First loadup of backend server tends to be a bit
          slow, 5 seconds expected)
        </p> // Add loadup screen
      ) : (
        <div>{responseData}</div>
      )}
    </>
  );
}
