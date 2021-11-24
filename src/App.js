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
            <div>
                <input onChange={this.inputHandler} value={this.state.input} />
                <button onClick={this.clickHandler}>Add</button>
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
            <div key={index.toString()}>
                <li>{x}</li>
                <button onClick={() => this.props.onDone(index)}>Done</button>
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
            <div>
                <h1>You have {this.state.list.length}</h1>
                <TodoList list={this.state.list} onDone={this.deleteItem}></TodoList>
                <InputField onAddToList={this.addItem}></InputField>
            </div>
        )
    }
}

export default App
