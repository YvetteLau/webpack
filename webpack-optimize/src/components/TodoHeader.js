import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../store/action';
class TodoHeader extends Component {
    static propTypes = {
        
    };
    componentDidMount() {
        // let unfinished = this.props.todos.filter(item=>!item.isSelected);
    }
    getUnFinishCount = () => {
        return this.props.todos.filter(item=>!item.isSelected).length;
    };
    render(){
        return (
            <div>
                <h3>您有{this.getUnFinishCount()}件事没有完成</h3>
                <input type="text" ref={(v)=>this.input=v}  onKeyUp={(e)=>{
                    if(e.keyCode === 13){
                        this.props.addTodo({
                            title: e.target.value,
                            isSelected: false,
                            id: (this.props.todos && this.props.todos.length > 1) ? this.props.todos[this.props.todos.length - 1].id + 1 : 0
                        });
                        this.input.value = ''; //重置input的值
                    }
                }}/>
            </div>
            
        )
    }
    
}

export default connect(state => ({...state}),actions)(TodoHeader);