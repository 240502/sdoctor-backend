export interface Education {
    educationId: number;
    doctorId: number;
    degree: string;
    institution: string;
    fromYear: number;
    toYear: number;
}

export interface EducationCreateDto {
    degree: string;
    institution: string;
    fromYear: number;
    toYear: number;
}
