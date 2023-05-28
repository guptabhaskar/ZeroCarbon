import { useState, useRef } from "react";
import Password from "./Password";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@mantine/core";

function PasswordView({ password }) {
  const [visible, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState(password.password);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <Button
        color="green"
        className="text-black bg-green-400"
        radius="md"
        size="md"
        onClick={() => {
          handleOpenForm(password);
        }}
      >
        View
      </Button>
      <div
        className={`z-20 fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center ${
          isFormOpen ? "" : "hidden"
        }`}
        onClick={handleCloseForm}
      >
        <div
          className="bg-white p-4 rounded-lg shadow-md"
          style={{
            maxWidth: "600px",
            maxHeight: "600px",
            width: "90%",
            height: "50%",
          }}
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center">
            View Password
          </h2>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Name</label>
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              id="name"
              defaultValue={password.name}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Website</label>
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              id="website"
              defaultValue={password.website}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              id="username"
              defaultValue={password.username}
              disabled
            />
          </div>
          <div className="mb-4">
            <Password
              value={value}
              setValue={setValue}
              label="Password"
              visible={visible}
              toggle={toggle}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCloseForm}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordView;
