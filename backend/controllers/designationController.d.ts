import { type Request, type Response } from "express";
export declare const getDesignations: (req: Request, res: Response) => Promise<void>;
export declare const createDesignation: (req: Request, res: Response) => Promise<void>;
export declare const updateDesignation: (req: Request, res: Response) => Promise<void>;
export declare const bulkTransferDesignation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=designationController.d.ts.map