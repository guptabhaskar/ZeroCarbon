import SavedPasswordsList from "../components/SavedPasswordsList";
import CreateMaster from "../components/CreateMaster";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Key } from "../models/key";
import { Password } from "../models/password";
import CryptoJS from "crypto-js";

export default function IndexPage({ exists = null, passwords = [] }) {
  if (exists !== null) {
    return (
      <>
        {!exists ? (
          <CreateMaster />
        ) : (
          <SavedPasswordsList passwords={passwords} />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center text-center text-xl h-screen bg-blue-50">
          <div className="font-bold text-xl pt-48">
            You are not signed in yet.
          </div>
          <div className="flex items-center justify-start">
            <div>
              <Image
                alt="logo"
                src="/logo.png"
                width={100}
                height={100}
                className="m-5"
              />
            </div>
            <div className="text-3xl font-semibold">SaveEarth</div>
          </div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    const key = await Key.findOne({
      where: {
        user_id: session?.user?.id,
      },
    });
    let passwords = await Password.findAll({
      where: {
        user_id: session?.user?.id,
      },
      raw: true,
    });
    passwords = passwords.map((password) => {
      const bytes = CryptoJS.AES.decrypt(password.password, key.key);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      return {
        ...password,
        password: decryptedPassword,
      };
    });
    return {
      props: {
        exists: key ? true : false,
        passwords: passwords ? passwords : [],
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
