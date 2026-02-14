import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    id: "1",
    title: "What is Pixfolio?",
    content: "Pixfolio is an online Visual Book creator that helps photographers and studios present their albums in a modern, interactive format. You can even add your own branding."
  },
  {
    id: "2",
    title: "How does Pixfolio work?",
    content: "You upload your album photos, and Pixfolio automatically converts them into a smooth, interactive Visual Book. You can share it with clients using a simple link."
  },
  {
    id: "3",
    title: "What are Pixfolio's monthly plans?",
    content: "Pixfolio offers simple and affordable plans:\n\nFree Plan → Create up to 3 Visual Books\n\nPremium Plan ₹99/month → Create unlimited Visual Books anytime"
  },
  {
    id: "4",
    title: "Can I add branding or social media links in Pixfolio?",
    content: "Yes. Pixfolio allows you to add:\n\n• Studio / Photographer Name\n• Website link\n• All social media profiles\n• Contact Number\n• Location\n\nYour Visual Books will display your identity professionally."
  },
  {
    id: "5",
    title: "Can I add or change music in Pixfolio?",
    content: "Yes. You can add or update background music to match the mood of your album. This improves the overall viewing experience."
  },
  {
    id: "6",
    title: "Kya Pixfolio me mera data surakshit rahega?",
    content: "Bilkul. Pixfolio advanced security use karta hai:\n\n• Encrypted storage\n• Secure servers\n• Automated backups\n• No data sharing with third parties\n\nAapke Visual Books hamesha safe rehte hain."
  },
  {
    id: "7",
    title: "Can I edit Visual Books after creation?",
    content: "Yes. You can make changes anytime unless the Visual Book is deleted."
  },
  {
    id: "8",
    title: "Does Pixfolio work offline?",
    content: "No. Pixfolio is a cloud-based platform and requires an internet connection to create or view Visual Books."
  },
  {
    id: "9",
    title: "Pixfolio albums kitne time tak store rahengi?",
    content: "Pixfolio albums long-term store hoti hain.\nAgar aapka plan expire ho jaye:\n\n• Your albums will continue to open\n• Only branding features may pause\n• The moment you reactivate a plan, branding restores\n\nYour albums never disappear unexpectedly."
  },
  {
    id: "10",
    title: "Kya Printing & Design Labs ke liye Pixfolio ka koi special version hai?",
    content: "Yes. Pixfolio offers a Lab Mode designed for high-volume album creation:\n\n• Faster processing for bulk Visual Books\n• Custom pricing models\n• Labs can create Visual Books for photographers\n• If photographer's personal plan is inactive, branding will not appear\n• Photographer needs personal login to enable their branding"
  },
  {
    id: "11",
    title: "Kya Pixfolio ka free trial available hai?",
    content: "Yes. Pixfolio offers a free trial for new users:\n\n• Create up to 3 free Visual Books\n• Explore all features\n• No payment needed"
  }
];

export function Accordion05() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" defaultValue="5" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="last:border-b">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-visible text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">{item.id}</p>
                <h1
                  className={`uppercase relative text-center text-xl md:text-2xl whitespace-nowrap overflow-visible`}
                >
                  {item.title}
                </h1>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground p-6 pl-6 md:px-20">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
