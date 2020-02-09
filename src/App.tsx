/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * App Component
 */
import React from 'react';
import './App.scss';
import addIcon from './assets/plus-icon.svg';
import { NewEntrySheet, IEntry } from './components/NewEntrySheet';
import { TaskList } from './components/TaskList';
import { storageKey } from './constants/constants';

const App: React.FC = () => {
    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    // eslint-disable-next-line
    const [data, setData] = React.useState();
    const openEntrySheet = () => {
        setIsEntrySheetOpen(true);
    };

    const closeEntrySheet = () => {
        setIsEntrySheetOpen(false);
    };

    const onAddEntry = (entry: IEntry) => {
        const existingTasksString = window.localStorage.getItem(storageKey);
        if (existingTasksString) {
            const existingTasks = JSON.parse(existingTasksString);
            const newTasks = [...existingTasks, entry];
            window.localStorage.setItem(storageKey, JSON.stringify(newTasks));
        } else {
            window.localStorage.setItem(storageKey, JSON.stringify([entry]));
        }
        closeEntrySheet();
    };

    //Adding ProgressBar
    function progressBar() {
        const existingTasksString = window.localStorage.getItem(storageKey);
        let totalMinute: number = 0;
        let i: number;
        if (existingTasksString) {
            const allTasks = JSON.parse(existingTasksString);
            for (i = 0; i < allTasks.length; i++) {
                totalMinute += parseInt(allTasks[i].hours) * 60 + parseInt(allTasks[i].minutes);
            }
        }
        // console.log(totalMinute);
        return Math.min(100, ((totalMinute * 100) / 480));
    }
    //Get Colour for progress Bar
    function getColour() {
        const val = progressBar();
        // console.log(val);
        if (val < 50)
            return "red";
        else if (val < 100)
            return "orange";
        else
            return "green";
    }

    const onRemoveEntry = (entry: IEntry) => {
        const existingTasksString = window.localStorage.getItem(storageKey);
        if (existingTasksString) {
            const existingTasks = JSON.parse(existingTasksString);
            const myTask = existingTasks.filter((item: IEntry) => item.id !== entry.id);
            window.localStorage.setItem(storageKey, JSON.stringify(myTask));
            setData(myTask);
        }
        getTaskEntries();
    };

    const getTaskEntries = () => {
        const entriesString = window.localStorage.getItem(storageKey);
        const entries = entriesString ? JSON.parse(entriesString) : [];
        return entries;
    };

    const entries = getTaskEntries();

    return (
        <div className="app-container">
            <h1>Timesheet</h1>
            <section className="progress-bar-section">
                <div className="progress-bar-div" style={{ width: `${progressBar()}%`, background: `${getColour()}` }}>
                </div>
            </section>
            {entries.length > 0 ? (
                <TaskList entries={entries} onRemove={onRemoveEntry} />
            ) : (
                    <p className="empty-text">No entries yet. Add a new entry by clicking the + button.</p>
                )
            }
            <button className="floating-add-entry-btn" onClick={openEntrySheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {/* On Close event added */}
            {isEntrySheetOpen && <NewEntrySheet onClose={closeEntrySheet} onAdd={onAddEntry} />}
        </div >
    );
};

export default App;
