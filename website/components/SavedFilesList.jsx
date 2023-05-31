import React, { useState, useEffect } from "react";
import { Group, Text, Table, rem } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useSession } from "next-auth/react";

function SavedFilesList() {
  const router = useRouter();
  const { data: session } = useSession();
  const [table, setTable] = useState([]);

  useEffect(() => {
    updateTable();
  }, []);

  const updateTable = async () => {
    const {
      data: { files },
    } = await axios.get("/api/file", {
      params: {
        user_id: session.user.email,
      },
    });
    if (files.length === 0) {
      setTable([]);
      return;
    }
    let tableData = [{ doc_id: "Document ID", date: "Date" }];
    files.map(async (file) => {
      const { document_id, createdAt } = file;
      let date = new Date(createdAt);
      let dateString = date.toISOString().split("T")[0];
      tableData.push({ doc_id: document_id, date: dateString });
    });
    const rows = tableData.map((doc, index) => (
      <tr key={index} className="bg-white">
        <td>
          <div className="text-2xl font-semibold">{doc.doc_id}</div>
        </td>
        <td>
          <div className="text-2xl font-semibold">{doc.date}</div>
        </td>
      </tr>
    ));
    setTable(rows);
  };

  const uploadFiles = async (files) => {
    try {
      let document_ids = [];
      let promises = files.map(async (file) => {
        let formData = new FormData();
        formData.append("file", file);
        const {
          data: { document_id },
        } = await axios.post("https://8z1nj6-5003.csb.app/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        document_ids.push(document_id);
        return axios.post("/api/file", {
          user_id: session.user.email,
          document_id: document_id,
        });
      });
      Promise.all(promises)
        .then(() => {
          updateTable();
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-50 h-screen">
      <div className="flex flex-col items-center text-center text-xl">
        <div className="font-bold text-xl pt-12">
          Link to plugin: https://8z1nj6-5003.csb.app
        </div>
        <div className="font-bold text-xl pt-12">
          <Dropzone
            onDrop={(files) => {
              uploadFiles(files);
            }}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={[MIME_TYPES.csv]}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload size="3.2rem" stroke={1.5} color={"#1c7ed6"} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="3.2rem" stroke={1.5} color={"#d64545"} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag csv files of the statements here for uploading
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        </div>
        {table.length !== 0 ? (
          <div className="bg-blue-50 flex flex-col justify-center items-center my-10">
            <h1 className="text-3xl font-bold mb-8">Uploaded Files</h1>
            <div className="rounded-md">
              <Table
                verticalSpacing="md"
                horizontalSpacing="lg"
                withBorder
                withColumnBorders
                className="table-auto"
              >
                <tbody>{table}</tbody>
              </Table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SavedFilesList;
