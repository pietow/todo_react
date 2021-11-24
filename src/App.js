import { useState } from 'react'
import './App.css'

function InputField(props) {
    const [input, setInput] = useState('')

    const inputHandler = e => {
        setInput(e.target.value)
    }

    const clickHandler = () => {
        props.onAddToList(input)
        setInput('')
    }

    return (
        <div className=" ">
            <input
                className="border-2 rounded mr-4 mt-3"
                onChange={inputHandler}
                value={input}
            />
            <button
                className="text-gray-200 bg-purple-600 bg-opacity-75 rounded text-sm p-1"
                onClick={clickHandler}
            >
                Add
            </button>
        </div>
    )
}

function TodoList(props) {
    const listItems = props.list.map((x, index) => (
        <div className="flex mt-2 justify-between" key={index.toString()}>
            <li className="pr-4">{x}</li>
            <button
                className="text-gray-200 bg-purple-600 bg-opacity-75 rounded p-1"
                onClick={() => props.onDone(index)}
            >
                Done
            </button>
        </div>
    ))
    return <ul>{listItems}</ul>
}

function App(props) {
    const [list, setList] = useState(
        localStorage.list ? localStorage.list.split(',') : []
    )

    const addItem = str => {
        localStorage.list = [...list, str]
        setList([...list, str])
    }

    const deleteItem = num => {
        localStorage.list = [...list.slice(0, num), ...list.slice(num + 1)]
        setList([...list.slice(0, num), ...list.slice(num + 1)])
    }

    return (
        <div className="flex flex-col items-start mt-10 ml-32">
            <h1 className="text-xl mb-3">
                You have {list.length} {list.length > 1 ? 'tasks' : 'task'}
            </h1>
            <TodoList list={list} onDone={deleteItem}></TodoList>
            <InputField onAddToList={addItem}></InputField>
        </div>
    )
}

export default App
