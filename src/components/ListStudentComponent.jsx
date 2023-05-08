import React, { Component } from 'react'
import StudentService from '../services/StudentService'

class ListStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deleted:false,
            students: []
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent(id, code){
        StudentService.deleteStudent(id, code).then( res => {
            this.setState({deleted: res.data});
        });
    }
    viewStudent(id, code){
        this.props.history.push(`/view-student/${id}/${code}`);
    }
    editStudent(id){
        this.props.history.push(`/add-student/${id}`);
    }

    componentDidMount(){
        StudentService.getStudents().then((res) => {
            this.setState({ students: res.data});
        });
        console.log(this.state.students+ "hello")
    }

    addStudent(){
        this.props.history.push('/add-student/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Student List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addStudent}> Add Student</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Course</th>
                                    <th> Adresses</th>
                                    <th> Niveau</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.students.map(
                                        student => 
                                        <tr key = {student.id}>
                                             <td> { student.name} </td>   
                                             <td> {student.courses && student.courses.map(crs => <div>{crs.name }&nbsp;</div>)}</td>
                                             <td> {"rue : " + student.adresse.rue +" avenue : "+ student.adresse.avenue +" numero : "+ student.adresse.number} </td>
                                             <td> {student.niveau.name}</td>
                                             <td>
                                                 <button onClick={ () => this.editStudent(student.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStudent(student.studentId.id, student.studentId.code)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewStudent(student.studentId.id, student.studentId.code)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListStudentComponent
