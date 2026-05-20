/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { getCookie, deleteCookie } from 'cookies-next'
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { revalidate } from 'utils/revalidateTags';
import { setAuthCookies } from 'utils/authCookies';

const LoginSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const role = searchParams.get("role");

  useEffect(() => {
    (async () => {
      if (accessToken && role) {
        // Save auth cookies on the server
        await setAuthCookies(accessToken, refreshToken || accessToken, role);
        
        // Retrieve and clear callback redirect URL
        const callbackUrl = getCookie("callbackUrl")?.toString() || "/";
        deleteCookie("callbackUrl");

        await revalidate("profile");
        
        setTimeout(() => {
          router.push(callbackUrl);
        }, 1000);
      } else {
        router.push("/login")
      }
    })()
  }, [accessToken, role, refreshToken, router])

  return (
    <div className="w-full h-[calc(100vh-10px)] flex items-center justify-center">
      <Loader className="animate-spin size-10" />
    </div>
  )
}

export default LoginSuccess