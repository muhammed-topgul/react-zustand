import React, {useState} from 'react';
import Task from "./Task";
import {useStore} from "../data/Store";
import {shallow} from "zustand/shallow";
import classNames from "classnames";

const Column = ({state}) => {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    const tasks = useStore(store =>
        store.tasks.filter(task => task.state === state), shallow);
    const addTask = useStore((store) => store.addTask);
    const setDraggedTask = useStore(store => store.setDraggedTask);
    const moveTask = useStore(store => store.moveTask);
    const draggedTask = useStore(store => store.draggedTask);

    return (
        <div className={classNames("column", {drop: drop})}
             onDragOver={e => {
                 setDrop(true);
                 e.preventDefault();
             }}
             onDragLeave={e => {
                 setDrop(false);
                 e.preventDefault();
             }}
             onDrop={() => {
                 moveTask(draggedTask, state);
                 setDraggedTask(null);
                 setDrop(false);
             }}>
            <div className="title-wrapper">
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks.map(task => <Task key={task.title} title={task.title}/>)}
            {open && <div className="modal">
                <div className="modal-content">
                    <input onChange={e => setText(e.target.value)} value={text}/>
                    <button onClick={() => {
                        addTask(text, state);
                        setText('');
                        setOpen(false);
                    }}>Submit
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default Column;