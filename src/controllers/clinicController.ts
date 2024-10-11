import { injectable } from 'tsyringe';
import { Clinic } from '../models/clinic';
import { ClinicService } from '../services/clinicService';
import e, { Request, Response } from 'express';
import { arrayBuffer } from 'node:stream/consumers';
@injectable()
export class ClinicController {
    constructor(private clinicService: ClinicService) {}
    async createClinic(req: Request, res: Response): Promise<void> {
        try {
            const clinic: Clinic = req.body as Clinic;
            await this.clinicService.createClinic(clinic);
            res.status(200).json({
                message: 'successfully created!',
                result: true,
            });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async updateClinic(req: Request, res: Response): Promise<void> {
        try {
            const clinic: Clinic = req.body as Clinic;
            await this.clinicService.updateClinic(clinic);
            res.status(200).json({
                message: 'successfully updated',
                result: true,
            });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async deleteClinic(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.clinicService.deleteClinic(id);
            res.status(200).json({
                message: 'Successfully deleted',
                result: true,
            });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getClinicView(req: Request, res: Response): Promise<void> {
        try {
            const { pageIndex, pageSize, location, name } = req.body;

            const data = await this.clinicService.getClinicView(
                pageIndex,
                pageSize,
                location ?? null,
                name ?? null,
            );
            if (Array.isArray(data) && data.length > 0) {
                res.json({
                    totalItems: Math.ceil(data[0].RecordCount),
                    page: pageIndex,
                    pageSize: pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                    location: location,
                    name: name,
                });
            } else res.json({ message: 'Không tồn tại bản ghi nào!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getClinicById(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const clinic: Clinic = await this.clinicService.getClinicById(id);
            if (clinic) {
                res.status(200).json(clinic);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getQuantityClinic(req: Request, res: Response): Promise<any> {
        try {
            const data: number = await this.clinicService.getQuantityClinic();
            if (data) {
                res.status(200).json({ totalClinic: data });
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getCommonClinic(req: Request, res: Response): Promise<void> {
        try {
            const results: Clinic[] =
                await this.clinicService.getCommonClinic();
            if (Array.isArray(results) && results.length > 0) {
                res.json(results);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
