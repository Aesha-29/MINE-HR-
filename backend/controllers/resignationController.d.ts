import type { Request, Response } from "express";
export declare const getResignations: (req: Request, res: Response) => Promise<void>;
export declare const submitResignation: (req: Request, res: Response) => Promise<void>;
export declare const approveResignation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const rejectResignation: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=resignationController.d.ts.map