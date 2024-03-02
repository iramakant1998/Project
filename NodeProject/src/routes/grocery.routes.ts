import { Router } from "express";
import { createGrocery,updateGrocery,readGrocery,manageInventory,deleteGrocery,placeGrocery } from "../controllers/groceries.controller";
import passport from "passport";

/**
 * Router
 * Using Passport
 */
const router = Router();

router.post("/create", passport.authenticate("jwt", { session: false }), createGrocery);
router.put("/update",  passport.authenticate("jwt", { session: false }),updateGrocery);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), deleteGrocery);
router.get("/get", readGrocery);
router.get("/groceryadmin/groceries/:id/inventory", manageInventory);
router.post("/placegrocery", placeGrocery);


export default router;
