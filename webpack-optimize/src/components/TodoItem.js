import React from 'react';

export default function TodoItem(props){
    return (
        <li className='list-group-item'>
            <input type='checkbox'  checked={props.item.isSelected}
            onChange={()=>{props.changeSelected(props.item.id)}}/>
            <span>{props.item.title}</span>
            <button className='btn btn-xs pull-right' onClick={
                ()=>{
                    props.deleteTodo(props.item.id)
                }
            }>X</button>
        </li>
    )
}