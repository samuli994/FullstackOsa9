"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.patientSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    occupation: zod_1.z.string().min(1, 'Occupation is required'),
    ssn: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    gender: zod_1.z.nativeEnum(types_1.Gender, { required_error: 'Gender is required' })
});
