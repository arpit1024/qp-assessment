import { Router } from "express";
import { connection } from "mongoose";
import adminRoutes from "./admin";
import userRoutes from "./user";

const router = Router();

router.get("/health-status", async (req, res) => {
  if (!connection || connection.readyState == 0 || connection.readyState == 3)
    return res.sendStatus(500);
  return res.sendStatus(200);
});

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);

export default router;
