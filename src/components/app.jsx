import React from 'react'

import { NotesList } from './notes-list'
import { NoteForm } from './note-form'

export class App extends React.PureComponent {

    constructor(props) {
        super(props)

        // Notes Service Object
        this.service = this.props.service;

        this.state = {
            notes: [],
            selected: null,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.newNote = this.newNote.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onTextChange= this.onTextChange.bind(this);
        this.onTitleChange= this.onTitleChange.bind(this);
    }

    // (!) Get notes from service

    componentDidMount(){
        this.getNotes();
    }

    getNotes(){
        this.service.getNotes().then(notes => {
            this.setState({notes});
        })
    }

    // Select new empty note
    newNote(){
        this.service.saveNote({title:'', text:''}).then(note=>{
            this.getNotes();
            this.onSelect(note);
        });
    }

    // Set note as selected
    onSelect(note){
        this.setState({ selected : note})
    }

    // Save note to service
    onSubmit(note){
        if(note){
            this.service.saveNote(note);
            this.getNotes();
        }
    }

    // Unselect note
    onCancel(){
        this.setState({selected: null})
    }

    onTitleChange(e){
        const value = e.target.value;
        if(this.state.selected){
            this.setState(
                prevState => ({selected:{...prevState.selected,title:value}})
            );
        }
    }

    onTextChange(e){
        const value = e.target.value;
        if(this.state.selected){
            this.setState(
                prevState => ({selected:{...prevState.selected,text:value}})
            );
        }
    }

    render() {
        const { notes, selected} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>React notes</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <NotesList selected={selected} notes={notes} onSelect={this.onSelect}/>
                    </div>
                    <div className="col-md-8">
                        <NoteForm newNote={this.newNote} note={selected} onTitleChange={this.onTitleChange} onTextChange={this.onTextChange} onSubmit={this.onSubmit} onCancel={this.onCancel}/>
                        {!selected && <div id="new-note" onClick={this.newNote}><button>New Note</button></div>}
                    </div>
                </div>
            </div>
        )
    }
}
