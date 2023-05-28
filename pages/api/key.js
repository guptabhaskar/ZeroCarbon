import { Key } from "../../models/key";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const key = await Key.findOne({
        where: {
          user_id: session?.user?.id,
        },
      });
      const match = await bcrypt.compare(req.query.password, key?.key);
      res.json({ success: true, match });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const hash = await bcrypt.hash(req.body.password, 10);
      await Key.create({
        user_id: session?.user?.id,
        key: hash,
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
