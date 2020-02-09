/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.scss';
import { IEntry } from '../NewEntrySheet';

interface ITaskListProps {
    entries: IEntry[];
}
interface ITaskCardProps {
    entry: IEntry;
}

export const TaskList: React.FC<ITaskListProps> = (props: ITaskListProps) => {
    const { entries } = props;
    return (
        <div className="task-list">
            {entries.map((entry: IEntry) => (
                <TaskCard entry={entry} />
            ))}
        </div>
    );
};

const TaskCard: React.FC<ITaskCardProps> = (props: ITaskCardProps) => {
    const {
        entry: { task, hours, minutes, remark },
    } = props;
    return (
        <div className="task-card">
            <div className="task-title">{task}</div>
            <div className="task-time">{`${hours}h ${minutes}m`}</div>
            <div className="task-time">{`${remark}`}</div>
        </div>
    );
};
