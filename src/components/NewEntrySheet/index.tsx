/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * NewEntrySheet Component - Renders action sheet for adding new entry.
 */
import * as React from 'react';
import './styles.scss';
import crossIcon from '../../assets/cross-icon.svg';
import { Button } from '../Button';
import { taskTypes } from '../../constants/constants';

interface INewEntrySheet {
    onClose: () => void;
    onAdd: (entry: IEntry) => void;
}

export interface IEntry {
    task: string;
    hours: string;
    minutes: string;
    remark: string;
    id: string;
}

export const NewEntrySheet: React.FC<INewEntrySheet> = (props: INewEntrySheet) => {
    const [task, setTask] = React.useState(taskTypes[0]);
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [remark, setRemark] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [id, setId] = React.useState(Date().toString());

    const onTaskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTask(event.target.value);
    };

    const onHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHours(event.target.value);
    };

    const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinutes(event.target.value);
    };
    //Changing state of remark
    const onRemarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemark(event.target.value);
    };

    const onAddEntry = () => {
        setId(Date().toString());
        const entry: IEntry = { task, hours, minutes, remark, id };
        props.onAdd(entry);
    };

    const onEntryChange = () => {
        if (hours.length > 0 && minutes.length > 0 && remark.length > 0)
            return setIsDisabled(false);
        return setIsDisabled(true);
    }

    return (
        <div className="new-entry-sheet">
            <div className="sheet-header">
                <div className="sheet-title">
                    <span className="title">Add New Entry</span>
                </div>
                <button className="close-sheet-btn" onClick={props.onClose} autoFocus>
                    <img src={crossIcon} alt="close" className="close-icon" />
                </button>
            </div>
            <div className="sheet-body">
                <div className="row">
                    <label className="task-input">
                        Task Type
                        <select className="task-select" onChange={onTaskChange} value={task}>
                            {taskTypes.map((task: string) => (
                                <option key={task} value={task}> {task}</option>
                            ))}
                        </select>
                    </label>
                    <label className="time-input">
                        Time Spent
                        <div className="time-input-fields">
                            <div>
                                <input
                                    type="number"
                                    placeholder="hours"
                                    className="hour-input"
                                    onChange={onHoursChange}
                                    onKeyUp={onEntryChange}
                                    value={hours}
                                />
                                <span className="time-indicator">h</span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="minutes"
                                    className="minute-input"
                                    onChange={onMinutesChange}
                                    onKeyUp={onEntryChange}
                                    value={minutes}
                                />
                                <span className="time-indicator">m</span>
                            </div>
                        </div>
                    </label>
                </div>
                {/* Add remark here */}
                <div className="row">
                    <label className="remarks">
                        Remarks
                        <input
                            type="text"
                            placeholder="Remarks"
                            className="remarks-input"
                            onChange={onRemarkChange}
                            onKeyUp={onEntryChange}
                        />
                    </label>
                </div>
            </div>
            <div className="sheet-footer">
                <div className="action-group">
                    {/* Status as prop added to change check it for disable*/}
                    <Button color="primary" onClick={onAddEntry} status={isDisabled}>
                        Add Entry
                    </Button>
                </div>
            </div>
        </div >
    );
};
