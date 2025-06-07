import { injectable } from 'tsyringe';
import { ExaminationResultRepository } from '../repositories/examination_resultRepository';
import {
    ExaminationResulsCreateDTO,
    ExaminationResultsUpdateDTO,
} from '../models/examination_results';

@injectable()
export class ExaminationResultService {
    constructor(
        private examinationResultRepository: ExaminationResultRepository,
    ) {}

    async createExaminationResult(
        result: ExaminationResulsCreateDTO[],
    ): Promise<any> {
        try {
            const res =
                await this.examinationResultRepository.createExaminationResult(
                    result,
                );
            return res;
        } catch (err: any) {
            throw err;
        }
    }

    async updateExaminationResult(
        result: ExaminationResultsUpdateDTO,
    ): Promise<any> {
        try {
            const res =
                await this.examinationResultRepository.updateExaminationResult(
                    result,
                );
            return res;
        } catch (err: any) {
            throw err;
        }
    }
}
