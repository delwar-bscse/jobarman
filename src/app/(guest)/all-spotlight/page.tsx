import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import CustomImage from 'shared/CustomImage';
import { formatUrl } from 'utils/formatUrl';
import { myFetch } from 'utils/myFetch';

const SpotlightPage = async ({ searchParams }: { searchParams: any }) => {
  const { id } = await searchParams;
  const res = await myFetch("/spotlight", {
    method: "GET",
  });
  const categoryDatas = res?.data;
  const singleAdds = categoryDatas?.find((item: Record<string, any>) => item?._id === id);
  const data = [
    // { label: "Title", value: singleAdds.title },
    { label: "Organization Name", value: singleAdds?.organization_name },
    { label: "Service Type", value: singleAdds?.service_type },
    { label: "Focus Area / Industry", value: singleAdds?.focus_area },
    { label: "Mode", value: singleAdds?.mode },
    { label: "Location", value: singleAdds?.location },
    { label: "Pricing / Fee Options", value: singleAdds?.pricing },
    { label: "Start Date", value: dayjs(singleAdds?.start_date).format("YYYY-MM-DD") },
    { label: "End Date", value: dayjs(singleAdds?.end).format("YYYY-MM-DD") },
    { label: "Contact", value: singleAdds?.contact_info?.details },
  ];
  console.log("Slider : ", res?.data)


  return (
    <div className='w-full max-w-[1440px] mx-auto px-2'>
      <h2 className='text-2xl sm:text-3xl md:text-4xl text-center py-5 font-bold text-[#123499] text-balance'>All Career Spotlight</h2>
      <div className='flex flex-col-reverse md:flex-row gap-4 md:gap-6'>
        <div className={`h-[calc(100vh-180px)] overflow-y-auto w-full max-w-[300px] my-2`}>
          <div className='space-y-3'>
            {categoryDatas?.length > 0 && categoryDatas?.map((item: Record<string, any>, index: number) => (
              <Link href={`/all-spotlight?id=${item?._id}`} key={index} className='block w-full h-[200px] cursor-pointer'>
                <Image
                  src={formatUrl(item?.cover_image)}
                  alt={item?.alt}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover rounded-sm"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className='flex-1'>
          {/* <h1 className="font-medium text-xl">View Add</h1> */}
          <Image
            src={formatUrl(singleAdds?.cover_image)}
            alt="Spotlight Add"
            width={1000}
            height={400}
            className="w-full h-80 object-cover"
          />
          <table className="w-full">
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
        </div>
      </div>
    </div>
  )
}

export default SpotlightPage