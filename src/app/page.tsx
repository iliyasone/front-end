import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <main className="">
      <h1 className="block text-6xl font-black font-montserrat mb-2 flex flex-col items-center justify-center text-center">
        Just Text.
      </h1>
      <h1 className="block text-3xl font-black font-light mb-2 flex flex-col items-center justify-center text-center">
        Simple. Clever. Anonymously.
      </h1>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it free?</AccordionTrigger>
          <AccordionContent>
            Yes. For anytime and from everywhere
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it anonymous?</AccordionTrigger>
          <AccordionContent>
            Yes. Our authors IPs&apos; don&apos;t saved.<br></br> However, If
            you vote for a post, your IP would be saved, so you could not vote
            again.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Why?</AccordionTrigger>
          <AccordionContent>Because it&apos;s beautiful</AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
