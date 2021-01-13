import React from "react";
import { TodoList } from "./TodoList";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	return (
		<div className="to-do-list">
			<header>
				<h1 className="d-flex justify-content-center">
					Your to do List {""}
				</h1>
			</header>
			<TodoList />
		</div>
	);
}
