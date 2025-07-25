"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  BLUR_ENTRY_CHILD_VARIANTS,
  BLUR_ENTRY_CONTAINER_VARIANTS,
} from "@/lib/blur-animation-variants";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { HandshakeIcon, Loader2Icon } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Auth() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const continueAction = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/verify-access-code", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data.success) {
      setLoading(false);
      setError(data.error);
      setCode("");
      return;
    }

    setLoading(false);
    setCode("");
    setError("");
    router.push("/home");
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-between p-4 h-full"
      variants={BLUR_ENTRY_CONTAINER_VARIANTS}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col items-center gap-16">
        <div className="w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 1 : 0 }}
          >
            <Loader2Icon className="animate-spin" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.h1
            className="text-center text-2xl font-semibold tracking-tight"
            variants={BLUR_ENTRY_CHILD_VARIANTS}
          >
            Welcome to the EBC Intranet
          </motion.h1>

          <motion.p
            className="text-center text-muted-foreground text-sm"
            variants={BLUR_ENTRY_CHILD_VARIANTS}
          >
            Enter your 4-digit access code to continue.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col items-center gap-4"
          variants={BLUR_ENTRY_CHILD_VARIANTS}
        >
          <InputOTP
            maxLength={4}
            value={code}
            onChange={setCode}
            pattern={REGEXP_ONLY_DIGITS}
            onComplete={continueAction}
            disabled={loading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          <p className="text-destructive text-sm">{error}</p>
        </motion.div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <motion.div
          className="flex flex-col items-center gap-2"
          variants={BLUR_ENTRY_CHILD_VARIANTS}
        >
          <HandshakeIcon className="text-muted-foreground w-5 h-5" />
          <p className="text-muted-foreground text-xs text-center text-balance">
            By continuing, you consent to the use of cookies for authentication
            purposes only.
          </p>
        </motion.div>
        <motion.div variants={BLUR_ENTRY_CHILD_VARIANTS}>
          <Button
            className="w-full"
            onClick={continueAction}
            disabled={loading || code.length !== 4}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
