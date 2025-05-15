export interface WorkExperience {
    experienceId: number;
    doctorId: number;
    workplace: string;
    position: string;
    fromYear: Date;
    toYear: Date;
}

export interface WorkExperienceCreateDto {
    workplace: string;
    position: string;
    fromYear: number;
    toYear: number;
}

export interface WorkExperienceUpdateDto {
    id: number;
    workplace: string;
    position: string;
    fromYear: number;
    toYear: number;
}
