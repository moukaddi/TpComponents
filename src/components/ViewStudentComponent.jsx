import React, { Component } from 'react'
import StudentService from '../services/StudentService'

class ViewStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            code: this.props.match.params.code,
            student: {}
        }
    }

    componentDidMount(){
        StudentService.getStudentById(this.state.id, this.state.code).then( res => {
            this.setState({student: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Student Details</h3>
                    {this.state.student.adresse && <div className = "card-body">
                        <div className = "row">
                            <label> Student Name: &nbsp;</label>
                            <div> { this.state.student.name }</div>
                        </div>
                        <div className = "row">
                            <label> Student  Course: &nbsp;</label>
                            {this.state.student.courses && this.state.student.courses.map(crs => <div>{crs.name }&nbsp;</div>)}
                        </div>
                        <div className = "row">
                            <label> Student  Address: &nbsp;</label>
                            <div> {"rue : " + this.state.student.adresse.rue +" avenue : "+ this.state.student.adresse.avenue +" numero : "+ this.state.student.adresse.number}</div>
                        </div>
                        <div className = "row">
                            <label> Student  Level: &nbsp;</label>
                            <div> { this.state.student.niveau.name }</div>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default ViewStudentComponent
