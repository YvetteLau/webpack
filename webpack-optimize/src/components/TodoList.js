import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../store/action';
import TodoItem from './TodoItem';

class TodoList extends Component {
    filterData() {
        let todos = [];
        let type = this.props.type;
        if(type === 'all'){
            todos = this.props.todos;
        }else if(type === 'finish'){
            todos = this.props.todos.filter(item=>item.isSelected);
        }else{
            todos = this.props.todos.filter(item=>!item.isSelected);
        }
        return todos;
    }
    render(){
        return (
            <div>
                <ul className='list-group'>
                    {this.filterData().map((item, index)=>{
                        return (
                            <TodoItem 
                                item={item}
                                key={index}
                                deleteTodo={this.props.deleteTodo}
                                changeSelected={this.props.changeSelected} />
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default connect(state=>({...state}),actions
)(TodoList);