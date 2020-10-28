import React, { Fragment, useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

export const TodoList = props => {
	const [tasks, setTasks] = useState([]);
	const [initialValue, setInitialValue] = useState(null);

	let newTask = event => {
		let myInput = document.querySelector("#taskInput");
		let newTask = event.target.value;

		if (event.keyCode == 13) {
			event.preventDefault();
			if (newTask) {
				setTasks(tasks => [...tasks, { label: newTask, done: false }]);
				myInput.value = "";
			}
		}
	};
	let deleteLine = index => {
		/* console.log(list); */
		let newTodos = [...tasks];
		newTodos.splice(index, 1);
		setTasks(newTodos);
	};
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/aurelian", {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); //devuelve un objeto
			})
			.then(responseAsJson => {
				console.log(responseAsJson, "aaaaaaa");
				responseAsJson.map(task => {
					setTasks(tasks => [...tasks, task]);
				});
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}, []);
	console.log(tasks, "cccccccc");

	useEffect(
		() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/aurelian", {
				method: "PUT",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					return response.json(); //devuelve un objeto
				})
				.catch(error => {
					//manejo de errores
					console.log(error);
				});
		},
		[tasks]
	);

	return (
		<Fragment>
			<form>
				<input
					id="taskInput"
					type="text"
					placeholder="Add Task"
					onKeyPress={() => {
						newTask(event);
					}}
				/>
			</form>
			<ul>
				{tasks.map((task, index) => {
					return (
						<li key={index}>
							{task.label}
							<IconButton
								aria-label="Delete"
								onClick={() => {
									deleteLine(index);
								}}>
								<DeleteIcon />
							</IconButton>
						</li>
					);
				})}
			</ul>
		</Fragment>
	);
};
// const clearInput = () => (taskInput.current.value = "");
