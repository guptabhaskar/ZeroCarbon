import React, { useState } from "react";
import { Table, Button } from "@mantine/core";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import PasswordView from "./PasswordView";
import PasswordEdit from "./PasswordEdit";

function SavedPasswordList({ passwords }) {
  const router = useRouter();

  const deletePassword = async (id) => {
    await axios.delete(`/api/password?id=${id}`);
    router.refresh();
  };

  const rows = passwords.map((password) => (
    <tr key={password.id} className="bg-white">
      <td>
        <div className="text-2xl font-semibold">{password.name}</div>
      </td>
      <td>
        <PasswordView password={password} />
      </td>
      <td>
        <PasswordEdit password={password} />
      </td>
      <td>
        <Button
          color="red"
          className="text-black bg-red-400 z-10"
          radius="md"
          size="md"
          onClick={() => {
            deletePassword(password.id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  if (passwords.length) {
    return (
      <>
        <div className="bg-blue-50 min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-8">Saved Password</h1>
          <div className="rounded-md">
            <Table
              verticalSpacing="md"
              horizontalSpacing="lg"
              withBorder
              withColumnBorders
              className="table-auto"
            >
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center text-center text-xl h-screen bg-blue-50">
          <div className="font-bold text-xl pt-48">
            You do not have any saved passwords.
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
            <div className="text-3xl font-semibold">SafeKeep</div>
          </div>
        </div>
      </>
    );
  }
}

export default SavedPasswordList;
