import type { Request, Response } from "express";
export declare const getOffboardings: (req: Request, res: Response) => Promise<void>;
export declare const initiateOffboarding: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateChecklist: (req: Request, res: Response) => Promise<void>;
export declare const cancelOffboarding: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=offboardingController.d.ts.map