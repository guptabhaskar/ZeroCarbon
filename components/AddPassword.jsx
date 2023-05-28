import { useState, useRef } from "react";
import Password from "./Password";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import axios from "axios";

function AddPassword() {
  const [visible, { toggle }] = useDisclosure(false);
  const name = useRef(null);
  const website = useRef(null);
  const username = useRef(null);
  const [value, setValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const addPassword = async (e) => {
    e.preventDefault();
    const body = {
      name: name.current.value,
      website: website.current.value,
      username: username.current.value,
      password: value,
    };
    await axios.post("/api/password", body);
    router.refresh();
  };

  return (
    <>
      <button
        className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
        onClick={handleOpenForm}
      >
        Add Password
      </button>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center ${
          isFormOpen ? "" : "hidden"
        }`}
        onClick={handleCloseForm}
      >
        <form
          className="bg-white p-4 rounded-lg shadow-md"
          style={{
            maxWidth: "600px",
            maxHeight: "700px",
            width: "90%",
            height: "55%",
          }}
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
          onSubmit={addPassword}
        >
          <h2 className="text-lg font-semibold mb-4 text-center">
            Add Password
          </h2>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Name</label>
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              id="name"
              ref={name}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Website</label>
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              id="website"
              ref={website}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              id="username"
              ref={username}
            />
          </div>
          <div className="mb-4">
            <Password
              value={value}
              setValue={setValue}
              label="Enter password"
              visible={visible}
              toggle={toggle}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPassword;
