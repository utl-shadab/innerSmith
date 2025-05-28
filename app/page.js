"use client";

import React, { useEffect, useState } from "react";
import Homepage from "./Home/homepage";
import Loading from "./loading";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark the client-side rendering as completed
    setIsClient(true);
  }, []);
  return (
    <>
      {!isClient && <Loading />}

      <div style={{ display: isClient ? "block" : "none" }}>
        
        <Homepage />
      </div>
    </>
  );
}
