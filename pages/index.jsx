import SavedPasswordsList from "../components/SavedPasswordsList";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <SavedPasswordsList passwords={[]} />
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center text-center text-xl h-screen bg-blue-50">
          <div className="font-bold text-xl pt-48">
            Sign in to view upload the bank statement and view your carbon
            emission.
          </div>
          <div className="flex items-center justify-start">
            <div>
              <Image
                alt="logo"
                src="/logo.png"
                width={300}
                height={300}
                className="m-5"
              />
            </div>
            <div className="text-4xl font-semibold">SaveEarth</div>
          </div>
        </div>
      </>
    );
  }
}
