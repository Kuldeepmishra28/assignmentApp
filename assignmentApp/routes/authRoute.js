import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user in the system.
 *     requestBody:
 *       description: User information for registration.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *               phone:
 *                 type: string
 *                 description: The phone number of the user (must be 10 numeric digits).
 *               address:
 *                 type: object
 *                 description: The address of the user.
 *               role:
 *                 type: number
 *                 description: The role of the user (default is 0).
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - address
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad Request - Invalid input.
 */


router.post("/register", registerController);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login.
 *     requestBody:
 *       description: User credentials for login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal Server Error - Error while processing the login.
 */

router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

/**
 * @swagger
 * /user-auth:
 *   get:
 *     description: Returns status of user or not while logged in 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting user
 */
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * @swagger
 * /admin-auth:
 *   get:
 *     description: Returns status of admin or not while logged in 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting user
 */
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     description: Endpoint to update the user's profile information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated user profile information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email address of the user.
 *               password:
 *                 type: string
 *                 description: The updated password for the user.
 *               address:
 *                 type: object
 *                 description: The updated address of the user.
 *               phone:
 *                 type: string
 *                 description: The updated phone number of the user.
 *             required:
 *               - name
 *               - email
 *               - password
 *               - address
 *               - phone
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       500:
 *         description: Internal Server Error - Error while updating the profile.
 */

router.put("/profile", requireSignIn, updateProfileController);

/**
 * @swagger
 * /orders:
 *   get:
 *     description: Returns the information about placed order 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting orders
 */
//orders
router.get("/orders", requireSignIn, getOrdersController);

/**
 * @swagger
 * /all-orders:
 *   get:
 *     description: Returns the list of all orders placed 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting orders list
 */
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

/**
 * @swagger
 * /order-status/{orderId}:
 *   put:
 *     summary: Update order status
 *     description: Endpoint to update the status of a specific order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: The ID of the order to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: status
 *         in: query
 *         description: The updated status of the order.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have permission (admin).
 *       500:
 *         description: Internal Server Error - Error while updating the order status.
 */

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
