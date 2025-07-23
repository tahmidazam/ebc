"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useIntranetStore } from "@/lib/store";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { HandshakeIcon, Loader2Icon } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setRole = useIntranetStore((state) => state.setRole);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const continueAction = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/access-code", {
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
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 1);
      return;
    }

    setRole(data.data);
    setLoading(false);
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 h-full">
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
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            Welcome to the EBC Intranet
          </h1>

          <p className="text-center text-muted-foreground text-sm">
            Enter your 4-digit access code to continue.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <InputOTP
            ref={inputRef}
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
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <HandshakeIcon className="text-muted-foreground w-5 h-5" />
          <p className="text-muted-foreground text-xs text-center text-balance">
            By continuing, you consent to the use of cookies for authentication
            purposes only.
          </p>
        </div>
        <Button
          className="w-full"
          onClick={continueAction}
          disabled={loading || code.length !== 4}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
