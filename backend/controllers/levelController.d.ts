import type { Request, Response } from "express";
export declare const getLevels: (req: Request, res: Response) => Promise<void>;
export declare const createLevel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateLevel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteLevel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const assignLevel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getEmployeeLevelHistory: (req: Request, res: Response) => Promise<void>;
export declare const getLevelHierarchy: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=levelController.d.ts.map