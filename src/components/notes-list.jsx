import React from 'react'

export class NotesList extends React.Component{

    static defaultProps = {
        notes: []
    }

    render(){
        const { notes, selected, onSelect} = this.props;
        return <div className="list-group">
            {
                notes.map((note)=> {
                    const { id, title, text } = note;
                    return(
                        <div className={`list-group-item ${selected && selected.id === id ? 'active': ''}`} key={id} onClick={()=>{onSelect(note)}}>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    )
                })
            }
            {/* <div className="list-group-item active">Active note example</div>
            <div className="list-group-item">Inactive note example</div> */}
        </div>
    }
}
