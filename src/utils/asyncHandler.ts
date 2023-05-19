import { Request, NextFunction, Response } from 'express';

export default function asyncHandler(controller: (req: Request, res: Response) => Promise<void>) {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        Promise.resolve(controller(req, res)).catch(next);
    };
}