const express = require("express");
const { addStudent, getAllStudent, updateStudent, deleteStudent, studentCount, searchStudent } = require("../controller/student.controller");
const router = express.Router();

router.post('/add', addStudent);
router.get('/get-students', getAllStudent);
router.get('/count', studentCount);
router.get('/search', searchStudent);
router.put('/update/:studentId', updateStudent);
router.delete('/delete/:studentId', deleteStudent);

module.exports = router