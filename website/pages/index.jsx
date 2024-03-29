import SavedFilesList from "../components/SavedFilesList";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <SavedFilesList />
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center text-center text-xl h-screen bg-blue-50">
          <div className="font-bold text-xl pt-48">
            Sign in to upload the bank statement and use our ChatGPT Plugin.
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
            <div className="text-4xl font-semibold">ZeroCarbon</div>
          </div>
          <div className="font-bold text-xl pt-24">
            Link to plugin: https://8z1nj6-5003.csb.app
          </div>
        </div>
      </>
    );
  }
}
