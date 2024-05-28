import React from 'react';
import classNames from "classnames";
import {useStore} from "../data/Store";

const Task = ({title}) => {
    const task = useStore(store =>
        store.tasks.find(task => task.title === title));

    const deleteTask = useStore(store => store.deleteTask);
    const setDraggedTask = useStore(store => store.setDraggedTask);

    return (
        <div className="task"
             onDragStart={() => setDraggedTask(task.title)}
             draggable={true}>
            <div>{title}</div>
            <div className="bottom-wrapper">
                <button className="button-delete" onClick={() => deleteTask(task.title)}>Delete</button>
                <div className={classNames("status", task.state)}>{task.state}</div>
            </div>
        </div>
    );
};

export default Task;