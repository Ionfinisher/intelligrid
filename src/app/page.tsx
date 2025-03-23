import { PricingGenerator } from "@/components/pricing-generator";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@progress/kendo-react-buttons";
import { codeIcon } from "@progress/kendo-svg-icons";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                IntelliGrid
              </h1>
            </div>
            <Link
              href="https://github.com/Ionfinisher/kendo-ai-pricing-grid-gen"
              target="_blank"
            >
              <Button themeColor={"primary"} svgIcon={codeIcon}></Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className="container mx-auto py-12 px-4">
          <PricingGenerator />
        </div>
      </main>
      <footer className="border-t border-gray-200 py-6 mt-8">
        <div className="container mx-auto text-center text-sm">
          <span className="flex gap-2 justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            IntelliGrid built with{" "}
            <Image
              src="/kendoreact.svg"
              alt="KendoReact"
              width={40}
              height={40}
            />{" "}
            by Teddy.
          </span>
        </div>
      </footer>
    </div>
  );
}
