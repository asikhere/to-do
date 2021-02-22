import React, { Component } from "react";
import "./index.css";

export default class Board extends Component {
    constructor() {
        super();
        this.state = {
            item: "",
            tasks: [],
        };
        this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addTask = (e) => {
        const { item, tasks } = this.state;
        if (item !== '') {
            tasks.push({
                id: tasks.length,
                name: item,
                stage: 0
            });
        }
        this.setState({ tasks })
        console.log(item);
    }

    forword = (task) => {
        const { tasks } = this.state;
        tasks.map((e, index) => {
            if (e.id === task.id) {
                e.stage = e.stage + 1
            }
        });
        this.setState({ tasks });
    }

    backward = (task) => {
        const { tasks } = this.state;
        tasks.map((e, index) => {
            if (e.id === task.id) {
                e.stage = e.stage - 1
            }
        });
        this.setState({ tasks });
    }

    delete = (task) => {
        const { tasks } = this.state;
        this.setState({
            tasks: tasks.filter(el => el !== task)
        });
    }

    render() {
        const { tasks } = this.state;
        let stagesTasks = [];
        for (let i = 0; i < this.stagesNames.length; ++i) {
            stagesTasks.push([]);
        }
        for (let task of tasks) {
            const stageId = task.stage;
            stagesTasks[stageId].push(task);
        }

        return (
            <div className="mt-20 layout-column justify-content-center align-items-center">
                <section className="mt-50 layout-row align-items-center justify-content-center">
                    <input id="create-task-input" type="text" name="item" onChange={this.onChange} className="large" placeholder="New task name" />
                    <button type="submit" onClick={this.addTask} className="ml-30" >Create task</button>
                </section>

                <div className="mt-50 layout-row">
                    {stagesTasks.map((tasks, i) => {
                        return (
                            <div className="card outlined ml-20 mt-0" key={`${i}`}>
                                <div className="card-text">
                                    <h4>{this.stagesNames[i]}</h4>
                                    <ul className="styled mt-50" >
                                        {tasks.map((task, index) => {
                                            return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                                <div className="li-content layout-row justify-content-between align-items-center">
                                                    <span>{task.name}</span>
                                                    <div className="icons">
                                                        <button className="icon-only x-small mx-2" disabled={task.stage === 0} >
                                                            <i className="material-icons" onClick={() => this.backward(task)} >arrow_back</i>
                                                        </button>
                                                        <button className="icon-only x-small mx-2" disabled={task.stage === 3} >
                                                            <i className="material-icons" onClick={() => this.forword(task)}>arrow_forward</i>
                                                        </button>
                                                        <button className="icon-only danger x-small mx-2" >
                                                            <i className="material-icons" onClick={() => this.delete(task)}>delete</i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}