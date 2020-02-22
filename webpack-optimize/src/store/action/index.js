import * as Types from '../action-types';

//actionCreator对象

let actions = {
    addTodo(todo) { //todo {title: XXX, id:XXX, isSelected: XXX}
        return {
            type: Types.ADD_TODO,
            todo
        }
    },
    changeSelected(id){
        return {
            type: Types.CHANGE_SELECTED,
            id
        }
    },
    deleteTodo(id){
        return {
            type: Types.DELETE_TODO,
            id
        }
    },
    changeType(showType){
        return {
            type: Types.CHANGE_CURRENT_TYPE,
            showType: showType
        }
    }

};


export default actions;