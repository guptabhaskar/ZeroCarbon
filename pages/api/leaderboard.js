import { Leaderboard } from "../../models/leaderboard";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const leaderboard = await Leaderboard.findAll({
                order: [["carbon_emissions", "ASC"]],
            });
            res.json(leaderboard);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    } else if (req.method === "POST") {
        try {
            await Leaderboard.upsert({
                user_id: req.body.user_id,
                carbon_emissions: req.body.carbon_emissions,
            });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}
