import React, { Fragment, useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

export const TodoList = props => {
	const [value, setValue] = useState("");
	const [tasksApiArray, setTasksApiArray] = useState([]);
	const [myListElement, setMyListElement] = useState(null);

	const isTaskDone = indexToCrossOut => {
		setTasksApiArray(
			tasksApiArray.map((task, index) => {
				if (index == indexToCrossOut) {
					task.done = !task.done;
				}
				return task;
			})
		);
	};

	fetch("https://assets.breatheco.de/apis/fake/todos/user/aurelian", {
		method: "PUT",
		body: JSON.stringify(tasksApiArray),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(answerUpload => {
			console.log("Success: ", JSON.stringify(answerUpload));
		});

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/aurelian", {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.status);
				}
				return response.json();
			})
			.then(responseAsJson => {
				setTasksApiArray(responseAsJson);
			})
			.catch(error => {
				console.log("Error status: ", error);
			});
	}, []);

	useEffect(
		() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/aurelian", {
				method: "PUT",
				body: JSON.stringify(tasksApiArray),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(answerUpload => {
					console.log("Success: ", JSON.stringify(answerUpload));
				})
				.catch(error => {
					console.log("Error status: ", error);
				});

			setMyListElement(
				tasksApiArray.map((task, index) => {
					let crossClass = "list-element";
					if (task.done) {
						crossClass += " crossedText";
					}
					return (
						<li key={index} className={crossClass}>
							{task.label}
							<button
								id="crossOutButton"
								className="visible-or-not-button"
								onClick={() => {
									isTaskDone(index);
								}}>
								<i className="fas fa-check-square" />
							</button>
						</li>
					);
				})
			);
		},
		[tasksApiArray]
	);

	return (
		<Fragment>
			<section>
				<form
					onSubmit={event => {
						event.preventDefault();
						if (value != "") {
							setTasksApiArray([
								...tasksApiArray,
								{ label: value, done: false }
							]);
							setValue("");
						}
					}}>
					<input
						type="text"
						placeholder="New task"
						value={value}
						onChange={event => setValue(event.target.value)}
					/>
				</form>
				<ul className="taskList">{myListElement}</ul>
				<footer>
					<p>{tasksApiArray.length} Task counter</p>
				</footer>
			</section>
		</Fragment>
	);
};
// const clearInput = () => (taskInput.current.value = "");
