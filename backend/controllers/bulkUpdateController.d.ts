import type { Request, Response } from 'express';
export declare const generateTemplate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const validateBulkUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const applyBulkUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=bulkUpdateController.d.ts.map