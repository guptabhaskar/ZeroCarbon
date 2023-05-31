import { useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";

export default function MePage() {
  const { data: session } = useSession();
  return (
    <>
      <div className="text-center pt-16 text-xl h-screen bg-blue-50">
        <h2 className="font-bold text-xl lg:text-2xl mb-14 xl:mt-10">
          My Profile
        </h2>
        <ul>
          <li className="flex items-center justify-center text-2xl">
            <Image
              src={session?.user?.image || "/images/default_user.png"}
              width={70}
              height={70}
              alt="user image"
              className="rounded-full"
            />
            <div className="flex flex-col ml-3 text-lg">
              <div className="text-xl font-semibold">{session?.user?.name}</div>
              <div className="text-lg">{session?.user?.email}</div>
            </div>
          </li>
        </ul>
        <span className="flex w-full justify-center">
          <a
            href={`/api/auth/signout`}
            className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded m-10"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </a>
        </span>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
