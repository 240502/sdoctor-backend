export interface MedicalPackage {
    id: number;
    name: string;
    summary: string;
    price: number;
    clinic_id: number;
    category_id: number;
    image: string;
    preparation_process: string;
    views: number;
    service_detail: string;
}

export interface MedicalPackageCreateDTO {
    name: string;
    summary: string;
    price: number;
    clinicId: number;
    categoryId: number;
    image: string;
    preparationProcess: string;
    serviceDetail: string;
}

export interface MedicalPackageUpdateDTO {
    id: number;
    name: string;
    summary: string;
    price: number;
    clinicId: number;
    categoryId: number;
    image: string;
    preparationProcess: string;
    serviceDetail: string;
}
