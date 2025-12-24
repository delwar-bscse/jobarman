import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import CustomImage from "../../../../shared/CustomImage";
import dayjs from "dayjs";

export default function RecentAdsModal({ trigger, ad }) {
  console.log("ad", ad);
  const data = [
    // { label: "Title", value: ad.title },
    { label: "Organization Name", value: ad?.organization_name },
    { label: "Service Type", value: ad?.service_type },
    { label: "Focus Area / Industry", value: ad?.focus_area },
    { label: "Mode", value: ad?.mode },
    { label: "Location", value: ad?.location },
    { label: "Pricing / Fee Options", value: ad?.pricing },
    { label: "Start Date", value: dayjs(ad?.start_date).format("YYYY-MM-DD") },
    { label: "End Date", value: dayjs(ad?.end).format("YYYY-MM-DD") },
    { label: "Contact", value: ad?.contact_info?.details },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <h1 className="font-medium text-xl">View Add</h1>
        <CustomImage
          src={ad?.cover_image}
          alt={ad?.title}
          width={100}
          height={40}
          className="w-full h-40 object-cover"
        />
        <table className="w-full mt-10">
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border grid grid-cols-2">
                <td className=" text-sm text-gray-900 p-3 border-r">
                  {item?.label}
                </td>
                <td className="p-3 text-sm text-gray-900">{item?.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}
