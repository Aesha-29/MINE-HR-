import { type Request, type Response } from "express";
export declare const getDepartments: (req: Request, res: Response) => Promise<void>;
export declare const createDepartment: (req: Request, res: Response) => Promise<void>;
export declare const updateDepartment: (req: Request, res: Response) => Promise<void>;
export declare const bulkTransferDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=departmentController.d.ts.map