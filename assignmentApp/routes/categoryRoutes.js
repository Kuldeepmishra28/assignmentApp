import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();



/**
 * @swagger
 * /create-category:
 *   post:
 *     summary: Create a new category
 *     description: Endpoint to add a new category to the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Category information for creation.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: The name of the category to be created.
 *             required:
 *               - categoryName
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have permission (admin).
 *       500:
 *         description: Internal Server Error - Error while creating the category.
 */

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

/**
 * @swagger
 * /update-category/{id}:
 *   put:
 *     summary: Update category
 *     description: Endpoint to update the name of a specific category.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: categoryName
 *         in: query
 *         description: The updated name of the category.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have permission (admin).
 *       500:
 *         description: Internal Server Error - Error while updating the category.
 */

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

/**
 * @swagger
 * /get-category:
 *   get:
 *     description: Returns the list of categories 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting category
 */
router.get("/get-category", categoryControlller);

/**
 * @swagger
 * /single-category/{slug}:
 *   get:
 *     description: Returns the individual category as specified 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting category
 */

router.get("/single-category/:slug", singleCategoryController);

/**
 * @swagger
 * /delete-category/{id}:
 *   delete:
 *     summary: Delete category
 *     description: Endpoint to delete a specific category.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have permission (admin).
 *       500:
 *         description: Internal Server Error - Error while deleting the category.
 */

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
