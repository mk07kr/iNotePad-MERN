import noteContext from "./noteContext";

const noteState =(props)=>{
   <noteContext.Provider value={{}}>
    {props.children}
    </noteContext.Provider>
}

export default noteState;
