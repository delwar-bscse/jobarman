/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { setCookie } from 'cookies-next'
import { set } from 'lodash';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { revalidate } from 'utils/revalidateTags';

const LoginSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = searchParams.get("accessToken");
  const role = searchParams.get("role");

  useEffect(() => {
    (async () => {
      if (accessToken && role) {
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", accessToken);
        setCookie("role", role);
        await revalidate("profile");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        router.push("/login")
      }
    })()
  }, [])

  return (
    <div className="w-full h-[calc(100vh-10px)] flex items-center justify-center">
      <Loader className="animate-spin size-10" />
    </div>
  )
}

export default LoginSuccess