import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Stack } from "@mantine/core";
import Password from "./Password";
import { getStrength } from "../utils/functions";
import axios from "axios";
import { useRouter } from "next/navigation";

function CreateMaster() {
  const [visible, { toggle }] = useDisclosure(false);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (value1 !== value2) {
      setWarning("Passwords do not match");
    } else {
      const strength = getStrength(value1);
      if (strength < 100) {
        setWarning("Password is not strong enough");
      } else {
        await axios.post("/api/key", { password: value1 });
        router.refresh();
      }
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center`}
      >
        <form
          className="bg-white p-8 rounded-lg shadow-md"
          style={{
            maxWidth: "500px",
            maxHeight: "360px",
            width: "90%",
            height: "52%",
          }}
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center">
            Create Master Password
          </h2>
          <div className="mb-8">
            <Stack maw={380} mx="auto">
              <Password
                value={value1}
                setValue={setValue1}
                label="Master password"
                visible={visible}
                toggle={toggle}
              />
              <Password
                value={value2}
                setValue={setValue2}
                label="Confirm master password"
                visible={visible}
                toggle={toggle}
              />
            </Stack>
          </div>
          <div className="flex justify-center">{warning}</div>
          <div className="flex justify-center">
            <button
              onClick={onSubmit}
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

export default CreateMaster;
