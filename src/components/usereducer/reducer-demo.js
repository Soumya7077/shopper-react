import { useReducer } from "react";


let initialstate = {count:0};

function reducer(state,action){
    switch (action.type){
        case "join":
            return {count:state.count +1 };
        case "exit":
            return {count:state.count - 1};
    }
}

export function ReducerDemo()
{

    const [state, dispatch] = useReducer(reducer,initialstate);

    function JoinClick(){
        dispatch({type:'join'});
    }

    function ExitClick(){
        dispatch({type:'exit'});
    }

    return(
        <div className="container-fluid">
            <h2>Live <span className="bi bi-youtube me-2"></span>Video Streaming</h2>
            <h4> {state.count} Watching</h4>
            <button onClick={JoinClick} className="btn btn-primary me-2">Join</button>
            <button onClick={ExitClick} className="btn btn-danger">Exit</button>
        </div>
    )
}