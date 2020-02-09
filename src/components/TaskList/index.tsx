/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.scss';
import { IEntry } from '../NewEntrySheet';
import logo from './../../assets/cross-icon.svg'

interface ITaskListProps {
    entries: IEntry[];
    //Added
    onRemove: (entry: IEntry) => void;
}
interface ITaskCardProps {
    entry: IEntry;
    //Added
    onRemove: (entry: IEntry) => void;
}

export const TaskList: React.FC<ITaskListProps> = (props: ITaskListProps) => {
    const { entries } = props;
    //Adding Remove functionality
    const onRemoveEntry = (entry: IEntry) => {
        props.onRemove(entry);
    }
    //Removign a Task
    return (
        <div className="task-list">
            {entries.map((entry: IEntry) => (
                <TaskCard entry={entry} key={entry.id} onRemove={onRemoveEntry} />
            ))}
        </div>
    );
};

const TaskCard: React.FC<ITaskCardProps> = (props: ITaskCardProps) => {
    const {
        entry: { task, hours, minutes, remark, id },
    } = props;
    const onRemove = () => {
        const entry: IEntry = { task, hours, minutes, remark, id };
        props.onRemove(entry);
    }
    return (
        <div key={id} className="task-card">
            <button className="button" onClick={onRemove}>
                <img className="image" src={logo} alt="X" />
            </button>
            <div className="row1">
                <div className="task-title">{task}</div>
                <div className="task-time">{`${hours}h ${minutes}m`}</div>
            </div>
            {/* Add remark feature added */}
            <div className="row2">
                <p className="remark">{`${remark}`}</p>
            </div>
        </div>
    );
};
