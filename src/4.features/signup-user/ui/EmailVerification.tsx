"use client";

import { useEffect, useState } from "react";
import { Button, Input, toast } from "@/6.shared/ui";
import { useSignupStore } from "../model/signup.store";
import { resendVerificationEmail } from "../api/verify-email";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

interface Props {
  email: string;
}

export function EmailVerification({ email }: Props) {
  const [verificationCodeInput, setVerificationCodeInput] = useState("");
  const [isTimeout, setIsTimeout] = useState(false);
  const [count, setCount] = useState(180);
  const [isFetch, setFetch] = useState(false);
  const [isVerifiedCode, setVerifiedCode] = useState(false);

  const { verificationCode, setVerificationCode } = useSignupStore();

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if (isVerifiedCode || count === 0) {
      clearInterval(id);
      if (isVerifiedCode) {
        setIsTimeout(false);
      } else {
        setIsTimeout(true);
      }
    }
    return () => clearInterval(id);
  }, [count, isVerifiedCode]);

  useEffect(() => {
    if (isFetch) {
      setCount(180);
      setVerificationCodeInput("");
    }
  }, [isFetch]);

  const onSubmit = async () => {
    if (verificationCodeInput === verificationCode) {
      setVerifiedCode(true);
    } else {
      toast({
        title: "인증 코드가 일치하지 않습니다.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const fetchSendEmail = async () => {
    try {
      const result = await resendVerificationEmail(email);
      setVerificationCode(result.result.toString());
      setFetch(true);
    } catch {
      toast({
        title: "이메일 전송에 실패했습니다.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-gray-100 p-6 space-y-4">
      <Input
        disabled={count === 0 || isVerifiedCode}
        className="py-6"
        placeholder="인증코드 6자리"
        value={verificationCodeInput}
        onChange={(e) => setVerificationCodeInput(e.target.value)}
      />
      <div className="flex items-center flex-row justify-between">
        <div
          className={`text-sm text-blue-400 ${
            count === 0 ? "text-red-400" : "text-blue-400"
          }`}
        >
          {formatTime(count)}
        </div>
        <Button
          onClick={onSubmit}
          disabled={isVerifiedCode || isTimeout}
          className="items-center justify-center bg-blue-400 hover:bg-blue-500"
          type="button"
        >
          {isVerifiedCode ? "확인완료" : "확인"}
        </Button>
      </div>
      <div className="flex flex-row mt-10 space-x-2 text-sm text-gray-400">
        {!isVerifiedCode && (
          <>
            <p>이메일을 받지 못하셨나요?</p>
            <p
              onClick={fetchSendEmail}
              className="text-gray-500 underline cursor-pointer"
            >
              이메일 재전송하기
            </p>
          </>
        )}
      </div>
    </div>
  );
}
