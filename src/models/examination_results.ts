export interface ExaminationResulsCreateDTO {
    invoiceDetailId: number;
    appointmentId: number;
    patientId: string;
    doctorId: number;
    serviceId: number;
    resultText: string;
    resultValue: number;
    resultUnit: string;
    conclusion: string;
}

export interface ExaminationResultsUpdateDTO {
    id: number;
    resultText: string;
    resultValue: number;
    resultUnit: string;
    conclusion: string;
}
