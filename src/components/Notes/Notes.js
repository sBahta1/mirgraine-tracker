import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Paper from '@material-ui/core/Paper';
import NotePad from './NotePad/NotePad'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import NoteList from './NoteList/NoteList'
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import axios from 'axios';


const mapStateToProps = state=>({

})

class Notes extends Component {



   componentDidMount(){
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getNotes();
   }

//    componentDidUpdate(){
//        this.getNotes();
//    }

   getNotes() {
    console.log('client getting');
    axios({
      method: 'GET',
      url: '/api/note'//logged user notes only
    }).then((response) => {
      const action = {type:'SET_NOTES', payload: response.data}
      this.props.dispatch(action)
    }).catch((error)=>{
        console.log('error',error);
        alert('Unable to Get Notes!')
    })
  }
  
  //saveNote = () => {
   // let note = this.state;

    // axios({
    //     method:'POST',
    //     url:'/api/note',
    //     data: notes
    // }).then((response)=>{
    //     console.log(response);
    //     this.getNotes();
    // }).catch((error)=>{
    //     console.log('Error POSTing Note',error);
    //     alert('Unable to Post Note')
    // })
 //}
  
    render() {
        return (
            <Paper>
                <Nav />
               <NotePad  />
               <NoteList  />
                {/* <Button variant="fab" mini color="primary" aria-label="Add" >
                 <AddIcon />
                </Button> */}
            </Paper>
        )
    }
}//end class
export default connect(mapStateToProps)(Notes);