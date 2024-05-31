import './App.css';
import React, {useEffect, useState} from "react";
import {TodoList} from "../TodoList/TodoList";
import TodoSearch from "../TodoSearch/TodoSearch";
import TodoCounter from "../TodoCounter/TodoCounter";
import {CreateTodoButton} from "../CreateTodoButton/CreateTodoButton";
import useLocalStorageItems from "../../Hooks/UseLocalStorageItems";
import CustomSpinner from "../../Elements/CustomSpinner/CustomSpinner";
// INIT THE TASKS
// let defaultTasks = [
//     {id:1, emoji: "💀", text: "Homework", isCompleted: false, status:"pending"},
//     {id:2, emoji: "💀", text: "Clean the dishes", isCompleted: false, status:"completed"},
//     {id:3, emoji: "🔥", text: "Create a react app", isCompleted: false, status:"completed"},
//     {id:4, emoji: "🔥", text: "Create a new Laravel app", isCompleted: true, status:"pending"},
//     {id:5, emoji: "🔥", text: "Create a new React 6.3 app", isCompleted: false, status:"pending"},
//     {id:6, emoji: "🔥", text: "Create a new Laravel 4.5 app", isCompleted: true, status:"pending"},
//     {id:7, emoji: "🔥", text: "Create a new Angular 4.5 app", isCompleted: true, status:"pending"}
// ];
// localStorage.setItem("TASKS_V1", JSON.stringify(defaultTasks));
// localStorage.removeItem("TASKS_V1");

function App() {
    const {item:tasks,  saveItem:saveItem, isLoading, hasError} = useLocalStorageItems("TASKS_V1");
    const [searchQuery, setSearchQuery] = useState("");

    // Real time filtering getting the completed tasks
    const completedTasks = tasks.filter(task => {
        const taskText = task.text.toLowerCase();
        const taskEmoji = task.emoji;
        const lowerCaseSearchText = searchQuery.toLowerCase();

        return ((taskText.includes(lowerCaseSearchText) !== false || taskEmoji.includes(searchQuery) !== false) && task.isCompleted);
    });

    // Real time filtering getting the filtered tasks
    const filteredTasks = tasks.filter((task) => {
        const taskText = task.text.toLowerCase();
        const taskEmoji = task.emoji;

        return (taskText.includes(searchQuery.toLowerCase()) !== false || taskEmoji.includes(searchQuery) !== false);
    });

    React.useEffect(()=>{
        console.log("Loooog 22");
    }, [searchQuery]);

    return (
    <React.Fragment>
        <TodoCounter tasksQuantity={filteredTasks.length} completedTasks={completedTasks.length}></TodoCounter>
        <TodoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {isLoading &&
            <CustomSpinner/>
        }
        {hasError && <p>Se ha encontrado un error </p>}
        {(!isLoading && tasks.length == 0) && <p>Create tu primera tarea</p>}
        { tasks.length > 0 &&
            <TodoList tasks={tasks} filteredTasks={filteredTasks} saveTasks={saveItem}   />
        }
        <CreateTodoButton tasks={tasks}></CreateTodoButton>
    </React.Fragment>);
}


export default App;
