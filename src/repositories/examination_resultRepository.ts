import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import {
    ExaminationResulsCreateDTO,
    ExaminationResultsUpdateDTO,
} from '../models/examination_results';

@injectable()
export class ExaminationResultRepository {
    constructor(private db: Database) {}

    async createExaminationResult(
        examinationResult: ExaminationResulsCreateDTO[],
    ) {
        try {
            const sql = ' CALL CreateExaminationResults(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                JSON.stringify(examinationResult),
            ]);

            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async updateExaminationResult(
        examinationResult: ExaminationResultsUpdateDTO,
    ) {
        try {
            const sql =
                ' CALL UpdateExaminationResults(?,?,?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                examinationResult.id,
                examinationResult.resultText,
                examinationResult.resultValue,
                examinationResult.resultUnit,
                examinationResult.conclusion,
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
