export interface SupportStaffCreateDTO {
    email: string;
    gender: number;
    phone: string;
    image: string;
    fullName: string;
    birthday: string;
    city: string;
    district: string;
    commune: string;
    supporterId: number;
}

export interface SupportStaffUpdateDTO {
    employeeId: number;
    email: string;
    gender: number;
    phone: string;
    image: string;
    fullName: string;
    birthday: string;
    city: string;
    district: string;
    commune: string;
    supporterId: number;
}

export interface SupportStaff {
    totalRow: number;
    userId: number;
    email: string;
    gender: number;
    phone: string;
    image: string;
    fullName: string;
    birthday: string;
    city: string;
    district: string;
    commune: string;
    supporterId: number;
    createdAt: Date;
    updatedAt: Date;
    employeeId: string;
}
