"use client";

import React from "react";
import { SearchX, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDictionary } from "../providers/DictionaryProvider";

export default function NotFound({
  goBack,
  additionalInfo,
  children,
}: {
  goBack: boolean;
  additionalInfo?: string
  children?: React.ReactNode;
}) {
  const dict = useDictionary()

  const router = useRouter();

  return (
    <>
      {children}

      <div className="mx-auto my-10 flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <SearchX size={36} />

          <h2 className="font-Cera text-3xl font-bold uppercase">
            {dict.NotFound.title}
          </h2>

          <p className="text-sm font-normal">
            {additionalInfo}
          </p>
        </div>

        {goBack ? (
          <Button
            className="w-full max-w-[240px] p-6 uppercase rounded-3xl"
            onClick={() => router.back()}
          >
            {dict.Error.goBack}
            <Undo2 className="ml-1" size={18} />
          </Button>
        ) : null}
      </div>
    </>
  );
}
