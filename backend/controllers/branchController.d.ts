import { type Request, type Response } from "express";
export declare const getBranches: (req: Request, res: Response) => Promise<void>;
export declare const createBranch: (req: Request, res: Response) => Promise<void>;
export declare const updateBranch: (req: Request, res: Response) => Promise<void>;
export declare const bulkTransferBranch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=branchController.d.ts.map