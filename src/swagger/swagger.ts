import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'API documentation for Express TypeScript project',
    },
    servers: [
        {
            url: 'http://localhost:400/api/',
            description: 'Development server',
        },
    ],
    tags: [
        {
            name: 'Appointment',
        },
        {
            name: 'CategoryServices',
        },
        {
            name: 'Doctor',
        },
        {
            name: 'Clinic',
        },
        {
            name: 'Comment',
        },
        {
            name: 'Degrees',
        },
        {
            name: 'Department',
        },
        {
            name: 'DoctorExertises',
        },
        {
            name: 'DoctorServices',
        },
        {
            name: 'Education',
        },
        {
            name: 'Invoices',
        },
        {
            name: 'Mail',
        },
        {
            name: 'Specialties',
        },
        {
            name: 'MedicalPackage',
        },
        {
            name: 'Notification',
        },
        {
            name: 'PatientProfile',
        },
        {
            name: 'Payment',
        },
        {
            name: 'PaymentMethod',
        },
        {
            name: 'PostCategory',
        },
        {
            name: 'Post',
        },
        {
            name: 'Role',
        },
        {
            name: 'Schedule',
        },
        {
            name: 'Status',
        },
        {
            name: 'Time',
        },
        {
            name: 'Upload',
        },
        {
            name: 'User',
        },
        {
            name: 'WorkExperience',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Đường dẫn tới các file định nghĩa routes có JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
