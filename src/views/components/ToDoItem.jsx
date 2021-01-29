import React, {Component} from 'react';
import {isTodoCompleted} from '../../utils';


class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            contentValue: null
        }
        this.onDoubleClick = this.onDoubleClick.bind(this)
        this.onUpdateTodoContent = this.onUpdateTodoContent.bind(this)
        this.onUpdateContentChange = this.onUpdateContentChange.bind(this)
        this.updateValueInputRef = React.createRef()
        this.handleClickOutside= this.handleClickOutside.bind(this)
        this.wrapperRef = React.createRef()
    }

    UNSAFE_componentWillReceiveProps(props){
        if(props.content !== undefined){
          this.setState({contentValue: props.content})
        }
    }

    onDoubleClick(){
        if(this.state.isEditing === false){
            this.setState({isEditing: true})
        }
    }

    onUpdateTodoContent(e){
        if(e.key ==='Enter'){
            this.props.updateTodoContentEvent(this.updateValueInputRef.current.value)
            this.setState({isEditing: false})
        }
    }

    onUpdateContentChange(e){
        this.setState({contentValue: e.target.value})
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({isEditing: false})

        }
    }
    render() {
        const {isEditing} = this.state
        const {content, todo} = this.props
        return (
            <div ref={this.wrapperRef} className="ToDo__item" onDoubleClick={this.onDoubleClick} style={{transition:'0.3s', borderBottom:'0.5px solid black'}}>
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => this.props.onUpdateTodoStatusEvent(e)}
                                />
                                {isEditing ?    <input  ref={this.updateValueInputRef} 
                                                        onChange={this.onUpdateContentChange}
                                                        value={this.state.contentValue === null ?  content : this.state.contentValue}
                                                        onKeyDown={this.onUpdateTodoContent}
                                                        style={{width: '90%', borderRadius:'none', backgroundColor:'inherit', boxShadow:'none'}}/> : 
                                                <span>{content}</span> }
                                <button
                                    className="Todo__delete"
                                    onClick={() => this.props.deleteTodoEvent()}
                                >
                                    X
                                </button>
                            </div>
        )
    }
}



export default ToDoItem;