import type { Request, Response } from "express";
export declare const getManagers: (req: Request, res: Response) => Promise<void>;
export declare const createManager: (req: Request, res: Response) => Promise<void>;
export declare const updateManager: (req: Request, res: Response) => Promise<void>;
export declare const deleteManager: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const assignEmployees: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=managerController.d.ts.map