import React from 'react'
import './App.css'

class InputField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
        }
    }

    inputHandler = e => {
        this.setState(state => ({ input: e.target.value }))
    }

    clickHandler = () => {
        this.props.onAddToList(this.state.input)
        this.setState({input: ''})
    }

    render() {
        return (
            <div className=" ">
                <input className="border-2 rounded mr-4 mt-3" onChange={this.inputHandler} value={this.state.input} />
                <button className="text-gray-200 bg-purple-600 bg-opacity-75 rounded text-sm p-1" onClick={this.clickHandler}>Add</button>
            </div>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.listItems = []
    }

    render() {
        this.listItems = this.props.list.map((x, index) => (
            <div className="flex mt-2 justify-between" key={index.toString()}>
                <li className="pr-4">{x}</li>
                <button className="text-gray-200 bg-purple-600 bg-opacity-75 rounded p-1" onClick={() => this.props.onDone(index)}>Done</button>
            </div>
        ))
        return <ul>{this.listItems}</ul>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list:  localStorage.list ? localStorage.list.split(',') : []
        }
    }

    addItem = str => {
        this.setState(state => {
            localStorage.list = [...state.list, str]
            return { list: [...state.list, str] }
        })
    }

    deleteItem = num => {
        this.setState(state => {
            localStorage.list = [...state.list.slice(0,num), ...state.list.slice(num+1)]
            return ({
            list:[...state.list.slice(0,num), ...state.list.slice(num+1)]
        })})
    }

    render() {
        return (
            <div className="flex flex-col items-start mt-10 ml-32">
                <h1 className="text-xl mb-3">You have {this.state.list.length} {this.state.list.length > 1 ? 'tasks' : 'task'}</h1>
                <TodoList list={this.state.list} onDone={this.deleteItem}></TodoList>
                <InputField onAddToList={this.addItem}></InputField>
            </div>
        )
    }
}

export default App
