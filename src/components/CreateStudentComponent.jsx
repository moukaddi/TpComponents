import React, { Component } from 'react'
import StudentService from '../services/StudentService';

class CreateStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            course: '',
            adresse: '',
            niveau: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCourseHandler = this.changeCourseHandler.bind(this);
        this.changeAdresseHandler = this.changeAdresseHandler.bind(this);
        this.changeNiveauHandler = this.changeNiveauHandler.bind(this);
        this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            StudentService.getStudentById(this.state.id).then( (res) =>{
                let student = res.data;
                this.setState({name: student.name,
                    course: student.course,
                    adresse : student.adresse,
                    niveau : student.niveau
                });
            });
        }        
    }
    saveOrUpdateStudent = (e) => {
        e.preventDefault();
        let student = {name: this.state.name, course: this.state.course, adresse: this.state.adresse, niveau: this.state.niveau};
        console.log('student => ' + JSON.stringify(student));

        // step 5
        if(this.state.id === '_add'){
            StudentService.createStudent(student).then(res =>{
                this.props.history.push('/student');
            });
        }else{
            StudentService.updateStudent(student, this.state.id).then( res => {
                this.props.history.push('/students');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeCourseHandler= (event) => {
        this.setState({course: event.target.value});
    }

    changeAdresseHandler= (event) => {
        this.setState({adresse: event.target.value});
    }

    changeNiveauHandler= (event) => {
        this.setState({niveau: event.target.value});
    }

    cancel(){
        this.props.history.push('/students');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Student</h3>
        }else{
            return <h3 className="text-center">Update Student</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="First Name" name="name" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Course: </label>
                                            <input placeholder="Last Name" name="course" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeCourseHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Adresse: </label>
                                            <input placeholder="Email Address" name="adresse" className="form-control" 
                                                value={this.state.adresse} onChange={this.changeAdresseHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Niveau: </label>
                                            <input placeholder="Niveau Address" name="niveau" className="form-control" 
                                                value={this.state.niveau} onChange={this.changeNiveauHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateStudent}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateStudentComponent
