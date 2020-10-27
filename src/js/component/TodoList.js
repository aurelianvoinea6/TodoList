import React, { Fragment, useState } from "react";

export const TodoList = props => {
	const [tasks, setTasks] = useState([]);
	const [initialValue, setInitialValue] = useState(null);

	let newTask = event => {
		let myInput = document.querySelector("#taskInput");
		let newTask = event.target.value;

		if (event.keyCode == 13) {
			event.preventDefault();
			if (newTask) {
				setTasks(tasks => [...tasks, newTask]);
				myInput.value = "";
			}
		}
	};
	return (
		<Fragment>
			<form>
				<input
					id="taskInput"
					type="text"
					placeholder="Add Task"
					value={initialValue}
					onKeyPress={() => {
						newTask(event);
					}}
				/>
			</form>
			<ul>
				{tasks.map((task, index) => {
					return <li key={index}>{task}</li>;
				})}
			</ul>
		</Fragment>
	);
};
// const clearInput = () => (taskInput.current.value = "");
