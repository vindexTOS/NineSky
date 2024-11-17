import React from "react";
import BackGroundImage from "../../assets/skytwo.jpg";

import Calculator from "./Calculator";
import Header from "./Header";
import Particals from "../../components/particals/Particals";

export default function EnteryPage() {
  return (
    <main className="min-h-screen pt-[5rem] bg-no-repeat bg-cover bg-center relative overflow-hidden">
      {/* Background Image with Particles */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-center mt-20"
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Particals />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-start p-6  max_smm1:gap-20">
        {/* Header positioned in top-left */}
        <div className="max-w-md md:max-w-lg lg:max-w-xl">
          <Header />
        </div>

        {/* Calculator positioned in bottom-right */}
        <div className="self-end mt-auto max-w-md md:max-w-lg lg:max-w-xl">
          <Calculator />
        </div>
      </div>
    </main>
  );
}
