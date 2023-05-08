import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8082/students";

class StudentService {

    getStudents(){
        return axios.get(STUDENT_API_BASE_URL);
    }

    createStudent(student){
        return axios.post(STUDENT_API_BASE_URL, student);
    }

    getStudentById(studentId, code){
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId + '/' + code);
    }

    updateStudent(student, studentId){
        return axios.put(STUDENT_API_BASE_URL + '/' + studentId, student);
    }

    deleteStudent(studentId, code){
        return axios.delete(STUDENT_API_BASE_URL + '/' + studentId + '/' + code);
    }
}

export default new StudentService()