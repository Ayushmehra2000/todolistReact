import { useSelector } from "react-redux";
import { todoSelector } from "../features/counter/todoSlice";

export function Tasklist(){
    const data = useSelector(todoSelector)
    return(<>
    <div className="container">
        {data}
    </div>
    </>);
}