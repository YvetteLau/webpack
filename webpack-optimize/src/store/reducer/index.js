import * as Types from '../action-types';
let initState = {
    todos: [
        {
            isSelected: false,
            title: '今天吃药了吗？',
            id: 1,
        },
        {
            isSelected: false,
            title: '今天吃药了吗？',
            id: 2,
        },
        {
            isSelected: true,
            title: '今天吃药了吗？',
            id: 3,
        },
    ],
    type: 'all' //默认显示全部
}


function reducer(state=initState, action){

    switch(action.type){
        case Types.ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.todo
                ]
            }
        case Types.CHANGE_SELECTED: 
            let todos = state.todos.map(item=>{
                if(item.id === action.id){
                    item.isSelected = !item.isSelected
                }
                return item;
            });
            return { ...state, todos }
        case Types.DELETE_TODO:
            let remainTodos = state.todos.filter(item=>item.id!==action.id);
            return {...state, todos: remainTodos}
        case Types.CHANGE_CURRENT_TYPE: 
            return {
                ...state,
                type: action.showType
            }
            
        default: 
            return state;
    }
}

export default reducer;