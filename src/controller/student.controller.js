const Student = require("../model/student.schema");
const pagination = require("../utils/student.pagination");

const addStudent = async (req, res) => {
    const { firstName, lastName, age, email } = req.body;

    if(!firstName || !lastName || !age || !email)
    {
        return res.status(400).json({message: 'All fields are required'});
    }

    try {
        const isexistingStudent = await Student.findOne({ email });
        if (isexistingStudent)
        {
            return res.status(409).json({message: 'Student details already exists.'});
        }

        const student = new Student({ firstName, lastName, age, email });
        await student.save();
        return res.status(201).json({message: 'Student added successfully', student});

    } catch (error) {
        console.error("error adding new student", error);
        return res.status(500).json({
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occured. Please try again later."
            }
        })
    }
}

const getAllStudent = async (req, res) => {
    const { page, limit, skip } = pagination(req.query);
    try {
        const students = await Student.find().select('_id firstName lastName').skip(skip).limit(limit);
        return res.status(200).json({
            page, 
            students, 
            data: students.length
        });

    } catch (error) {
        console.error("error getting all students", error);
        return res.status(500).json({
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occured. Please try again later."
            }
        })
    }
}

const updateStudent = async (req, res) => {
    const { firstName, lastName, age, email } = req.body;
    const { studentId } = req.params;

    try {
        const student = await Student.findById(studentId);
        if (!student)
        {
            return res.status(404).json({message: 'Student does not exist'});
        }

        student.firstName = firstName || student.firstName;
        student.lastName = lastName || student.lastNmae;
        student.age = age || student.age;
        student.email = email || student.email;

        await student.save();
        return res.status(200).json({message: 'student data updated successfully', student});

    } catch (error) {
        console.log("error getting student by id", error);
        return res.status(500).json({
            "error": {
                "code": "INETRNAL_SERVER_ERROR",
                "message": "An unexpected error occured. Please try again later."
            }
        })
    }
}

const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findByIdAndDelete(studentId);
        if (!student)
        {
            return res.status(404).json({message: 'student does not exists.'});
        }

        return res.status(200).json({message: 'Student deleted successfully.'});

    } catch (error) {
        console.error("error deleting student", error);
        return res.status(500).json({
            "error": {
                "code": "INETRNAL_SERVER_ERROR",
                "message": "An unexpected error occured. Please try again later."
            }
        })
    }
}

const studentCount = async (req, res) => {
    try {
        const count  = await Student.find();
        return res.status(200).json(count.length);
    } catch (error) {
        console.error("error counting all students available", error);
        return res.status(500).json({
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occured. Please try again later."
            }
        })
    }
}

const searchStudent = async (req, res) => {
    const { lastName } = req.query;
    
    try {
        const student = await Student.find({ lastName });
        if (!student)
        {
            return res.status(404).json({message: 'Student does not exists'});
        }

        return res.status(200).json({message: 'Student fetched successfully', student});

    } catch (error) {
        console.error("error searching for student", error);
        return res.status(500).json({
            "error": {
                "code": "INETRNAL_SERVER_ERROR",
                "message": "An unexpected error occured. Please try again later."
            }
        })
    }
}

module.exports = {
    addStudent, getAllStudent, updateStudent, deleteStudent, studentCount, searchStudent
}

