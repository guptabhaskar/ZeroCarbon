import { File } from "../../models/file";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const document_ids = await File.findAll({
        where: {
          user_id: req.query.user_id,
        },
      });
      res.json({ success: true, files: document_ids });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "POST") {
    try {
      await File.create({
        user_id: req.body.user_id,
        document_id: req.body.document_id,
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
