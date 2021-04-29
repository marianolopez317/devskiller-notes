import React from 'react'

export class NoteForm extends React.Component{

    constructor(props){
        super(props)
    }

    static defaultProps = {
        note: {
            title:'',
            text:''
        }
    }

    render(){
        const {note, onTitleChange, onTextChange, onSubmit, onCancel } = this.props;
        const { title, text }= note || {};
        return <form onSubmit={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();        
                    onSubmit(note);
                }}>
            <div className="form-group">
                <label>Title:</label>
                <input value={title} onChange={onTitleChange} className="form-control" name="title" />
            </div>
            <div className="form-group">
                <label>Note:</label>
                <textarea value={text} onChange={onTextChange} className="form-control" name="text" />
            </div>
            <div className="form-group">
                <input id="cancel-note" onClick={onCancel} type="button" className="btn btn-default pull-right" value="Cancel" />
                <input id="save-note" type="submit" className="btn btn-default pull-right" value="Save" />
            </div>
        </form>
    }
}
