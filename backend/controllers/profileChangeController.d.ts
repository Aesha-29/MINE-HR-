import type { Request, Response } from "express";
export declare const createProfileChangeRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProfileChangeRequests: (req: Request, res: Response) => Promise<void>;
export declare const approveProfileChangeRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const rejectProfileChangeRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=profileChangeController.d.ts.map