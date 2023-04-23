import React from "react";
import Image from "next/image";
import PageHead from "@/components/PageHead";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <PageHead
        title="Page not found | AppShare"
        description="Page not found"
      />
      <Image
        alt="No comments"
        src={"/not-found.svg"}
        width="200"
        height="200"
      />
      <h3 className="text-gray-500 my-5">Page Not Found</h3>
    </div>
  );
}
