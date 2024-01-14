import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

/**
 * @swagger
 * /create-product:
 *   post:
 *     summary: Create a new product
 *     description: Endpoint to add a new product to the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product information for creation.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *               category:
 *                 type: string
 *                 description: The category of the product.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product.
 *               shipping:
 *                 type: boolean
 *                 description: Indicates if the product requires shipping.
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the product.
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - quantity
 *               - shipping
 *               - productImage
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have permission (admin).
 *       500:
 *         description: Internal Server Error - Error while creating the product.
 */

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

/**
 * @swagger
 * /update-product/{pid}:
 *   put:
 *     summary: Update product
 *     description: Endpoint to update specific fields of a product.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: The ID of the product to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: name
 *         in: formData
 *         type: string
 *         description: The updated name of the product.
 *       - name: description
 *         in: formData
 *         type: string
 *         description: The updated description of the product.
 *       - name: price
 *         in: formData
 *         type: number
 *         format: float
 *         description: The updated price of the product.
 *       - name: quantity
 *         in: formData
 *         type: integer
 *         description: The updated quantity of the product.
 *       - name: shipping
 *         in: formData
 *         type: boolean
 *         description: The updated shipping status of the product.
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have permission (admin).
 *       500:
 *         description: Internal Server Error - Error while updating the product.
 */

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

/**
 * @swagger
 * /get-product:
 *   get:
 *     description: Returns the list of products of a category 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting products
 */

router.get("/get-product", getProductController);

/**
 * @swagger
 * /get-product/{id}:
 *   get:
 *     description: Returns the individual specified product 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting product
 */

router.get("/get-product/:slug", getSingleProductController);

/**
 * @swagger
 * /product-photo/{pid}:
 *   get:
 *     description: Returns the image of the product 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while loading image
 */

router.get("/product-photo/:pid", productPhotoController);

/**
 * @swagger
 * /delete-product/{pid}:
 *   delete:
 *     summary: Delete product
 *     description: Endpoint to delete a specific product.
 *     parameters:
 *       - name: pid
 *         in: path
 *         description: The ID of the product to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       500:
 *         description: Internal Server Error - Error while deleting the product.
 */

router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

/**
 * @swagger
 * /product-count:
 *   get:
 *     description: Returns the count of products in the cart
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting count
 */

router.get("/product-count", productCountController);

/**
 * @swagger
 * /product-list/{page}:
 *   get:
 *     description: For the paginated product list
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting pages
 */

router.get("/product-list/:page", productListController);

/**
 * @swagger
 * /search/{keyword}:
 *   get:
 *     description: Returns the search result 
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while getting searched result
 */

router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

/**
 * @swagger
 * /braintree/token:
 *   get:
 *     description: Routes the payment token
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error while routing token
 */

router.get("/braintree/token", braintreeTokenController);

/**
 * @swagger
 * /braintree/payment:
 *   post:
 *     summary: Process payment using Braintree
 *     description: Endpoint to initiate a payment transaction using Braintree.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment information for processing.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The user making the payment.
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: The ID of the product in the cart.
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product in the cart.
 *             required:
 *               - user
 *               - cart
 *     responses:
 *       200:
 *         description: Payment processed successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       500:
 *         description: Internal Server Error - Error while processing the payment.
 */

router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
