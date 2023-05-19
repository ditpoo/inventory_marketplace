import "reflect-metadata";
import { Request, Response } from "express"
import { IProductService } from "../services/productService";
import { injectable, inject } from "inversify";
import { sendMessageToQueue } from "../utils/sqsUtil";
import { sendNotification } from "../utils/snsUtil";

@injectable()
export default class ProductController {
    constructor(@inject('ProductService') private productService: IProductService) {}

    async addProduct(req: Request, res: Response) {
        if (
            !req?.body?.name ||
            !req?.body?.description ||
            !req?.body?.price ||
            !req?.body?.quantity
        ) {
            res.json({
                status: 400,
                msg: "Failed to add product",
                error: "Missing field"
            })
        }

        try {
            await this.productService.add(req.body);

            // Send Message To Queue
            sendMessageToQueue(req.body);

            res.json({
                status: 200,
                msg: "success"
            })
        } catch (err) {
            console.log(err);

            res.json({
                status: 500,
                msg: "Failed to add product"
            })
        }
    }

    async getProduct(req: Request, res: Response) {
        if (!req?.params?.id) {
            res.json({
                status: 400,
                msg: "Failed to fetch product",
                error: "Missing id field in body"
            })
        }

        try {
            const product = await this.productService.get(parseInt(req.params.id));

            if (product) {
                res.json({
                    status: 200,
                    msg: "success",
                    data: product  
                })
            } else {
                res.json({
                    status: 400,
                    msg: "Failed to fetch product"
                })
            }
        } catch (err) {
            console.log(err);

            res.json({
                status: 500,
                msg: "Failed to fetch product"
            })
        }
    }

    async getAllProduct(req: Request, res: Response) {
        try {
            const products = await this.productService.getAll();

            if (products?.length > 0) {
                res.json({
                    status: 200,
                    msg: "success",
                    data: products
                })
            } else {
                res.json({
                    status: 400,
                    msg: "Failed to fetch products",
                })
            }
        } catch (err) {
            console.log(err);

            res.json({
                status: 500,
                msg: "Failed to fetch product"
            })
        }
    }

    async updateProduct(req: Request, res: Response) {
        if (!req?.params?.id || !req?.body?.data) {
            res.json({
                status: 400,
                msg: "Failed to update product",
                error: "Missing fields in body"
            })
        }

        try {
            await this.productService.update(parseInt(req.params.id), req.body.data);

            if (req.body.data?.quantity) {
                const product = await this.productService.get(parseInt(req.params.id));
                if (product?.quantity && product?.quantity < 10) {
                    const message = 'The Quantity of Product has fallen below 10.';
                    const subscribers = ['subscriber1@example.com', 'subscriber2@example.com'];
                    sendNotification(message, subscribers);
                }
            }

            res.json({
                status: 200,
                msg: "success"
            })
        } catch (err) {
            console.log(err);

            res.json({
                status: 500,
                msg: "Failed to update product"
            })
        }
    }

    async deleteProduct(req: Request, res: Response) {
        if (!req?.params?.id) {
            res.json({
                status: 400,
                msg: "Failed to delete product",
                error: "Missing id field in body"
            })
        }

        try {
            await this.productService.delete(parseInt(req.params.id));

            res.json({
                status: 200,
                msg: "success"
            })
        } catch (err) {
            console.log(err);

            res.json({
                status: 500,
                msg: "Failed to delete product"
            })
        }
    }

}