import {Router} from 'express';
import { studentController } from './studentControllers';
import {middleware} from "./studentMiddleware"
const router:Router = Router();
const Student = new studentController();
const Middleware = new middleware();

const student_insert = [
    // Middleware.insert,
    Student.studentInsert
]
router.post('/insert' , student_insert)

// const student_update = [
//     Student.updateStudent
// ]
// router.put('/update' , student_update)

const login = [
    Middleware.login,
    Student.login
]
router.post('/login' , login)

const find_user = [
    Student.find_user
]
router.get('/get_user' , find_user)

const find_all = [
    Student.find_all
]
router.get('/get' , find_all)

const deleteStudent = [
    Middleware.deleteStudents,
    Student.deleteUser
]
router.delete('/delete',deleteStudent)

export const studentRouter : Router = router