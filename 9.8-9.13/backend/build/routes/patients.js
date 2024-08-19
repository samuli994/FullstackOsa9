"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const validation_1 = require("../utils/validation");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patientsWithoutSsn = patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
    res.json(patientsWithoutSsn);
});
router.post('/', (req, res) => {
    var _a, _b;
    const result = validation_1.patientSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
    }
    const newPatientData = result.data;
    const newPatient = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, newPatientData), { dateOfBirth: (_a = newPatientData.dateOfBirth) !== null && _a !== void 0 ? _a : "", ssn: (_b = newPatientData.ssn) !== null && _b !== void 0 ? _b : "" });
    patients_1.default.push(newPatient);
    return res.status(201).json(newPatient);
});
exports.default = router;
