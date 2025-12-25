import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { myFetch } from "../../../../utils/myFetch";

export default async function FAQpage() {
  const res = await myFetch("/faq");
  return (
    <div className="max-w-7xl mx-auto my-10 px-2">
      <h1 className="text-2xl mb-3 font-medium">Faq</h1>
      {res?.data?.map((item) => (
        <Accordion
          type="single"
          collapsible
          className="w-full my-4"
          defaultValue="item-1"
          key={item?._id}
        >
          <AccordionItem value="item-1" className="border p-2 rounded">
            <AccordionTrigger className="text-lg sm:text-xl">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col text-balance">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
