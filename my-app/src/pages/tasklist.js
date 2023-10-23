import styled from "styled-components";
import "./tasklist.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
const TaskFont = styled.span`
text-decoration: ${props => props.completed?"line-through 2px red":"none"};
font-size: 1rem;
`;
export function Tasklist({data,handleDelete,handleCheckbox,updatetaskId,isEdit,handleEdit,filter}){
    return(<>
    <div className="container">
        {data.length >0 && filter === "All"? data.map((task,i)=>{
        return <div style={{display:"flex"}} className="task" key={i}>
            <div><input type="checkbox" onClick={()=>handleCheckbox(task.id)} checked={task.completed}/></div>
            <div className="task-title"><TaskFont completed={task.completed}>{task.title}</TaskFont></div>
            <div className="edit-delete">
                <span onClick={()=> handleEdit(task.id)}><AiFillEdit /></span>
                <span onClick={()=> handleDelete(task.id)}><RiDeleteBin6Fill/></span>
            </div>
        </div>})
        :data.length >0 && filter === "pending"? data.map((task,i)=> !task.completed && <div style={{display:"flex"}} className="task" key={i}>
            <div><input type="checkbox" onClick={()=>handleCheckbox(task.id)} checked={task.completed}/></div>
            <div className="task-title"><TaskFont completed={task.completed}>{task.title}</TaskFont></div>
            <div className="edit-delete">
                <span onClick={()=> handleEdit(task.id)}><AiFillEdit /></span>
                <span onClick={()=> handleDelete(task.id)}><RiDeleteBin6Fill/></span>
            </div>
        </div>)
        :data.length>0 && filter === "Complete"? data.map((task,i)=> task.completed && <div style={{display:"flex"}} className="task" key={i}>
            <div><input type="checkbox" onClick={()=>handleCheckbox(task.id)} checked={task.completed}/></div>
            <div className="task-title"><TaskFont completed={task.completed}>{task.title}</TaskFont></div>
            <div className="edit-delete">
                <span onClick={()=> handleEdit(task.id)}><AiFillEdit /></span>
                <span onClick={()=> handleDelete(task.id)}><RiDeleteBin6Fill/></span>
            </div>
        </div>)
        :null}
    </div>
    </>);
}