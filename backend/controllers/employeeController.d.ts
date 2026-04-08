import type { Request, Response } from "express";
export declare const getEmployees: (req: Request, res: Response) => Promise<void>;
export declare const getEmployeeById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createEmployee: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateEmployee: (req: Request, res: Response) => Promise<void>;
export declare const disableEmployee: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const reactivateEmployee: (req: Request, res: Response) => Promise<void>;
export declare const getUpcomingRetirements: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=employeeController.d.ts.map