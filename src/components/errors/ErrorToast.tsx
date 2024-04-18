"use client";

import React from "react";
import { CircleAlert, Repeat, Undo2 } from "lucide-react";
import type { ZodIssue } from "zod";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { getShortText } from "@/lib/utils";
import { Button } from "../ui/button";

import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { useDictionary } from "../providers/DictionaryProvider";

export default function ErrorToast({
  error,
  place,
}: {
  error: string | ZodIssue[];
  place: string;
}) {
  const dict = useDictionary()

  const { toast } = useToast();
  const router = useRouter();

  const messageError = React.useMemo(
    function generateMessageError() {
      if (typeof error === "string") {
        return error;
      } else {
        const messageslist = error.map((issue) => {
          const message = issue.message;
          return message;
        });
        return messageslist.join("\n");
      }
    },
    [error],
  );

  React.useEffect(() => {
    Sentry.captureException(error);

    console.log("ErrorToast: ", messageError);

    toast({
      variant: "destructive",
      title: dict.Error.toast.title,
      description: (
        <p>
          В {place}: {getShortText(messageError)}
        </p>
      ),
      className: "font-Raleway",
      action: (
        <ToastAction
          className="px-2 py-6 text-sm"
          altText={dict.Error.toast.tryAgain}
          onClick={() => router.refresh()}
        >
          <Repeat className="h-8 w-8" />
        </ToastAction>
      ),
    });
  }, [error, messageError, place, router, toast, dict.Error.toast]);

  return (
    <div className="mx-auto my-10 flex flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <CircleAlert size={36} />
    
        <h2 className="font-Cera text-3xl font-bold uppercase">
          {dict.Error.title}
        </h2>
    
        <p className="text-sm font-normal">
          {getShortText(messageError)}
        </p>
      </div>
    
      <Button
        className="w-full max-w-[240px] p-6 uppercase hover:bg-background hover:text-primary rounded-3xl"
        onClick={() => router.back()}
      >
        {dict.Error.goBack}
        <Undo2 className="ml-1" size={18} />
      </Button>
    </div>
  );
}
