import { useState } from './mini-v'

const App = () => {
    const [num, setNum] = useState(0)
    const [str, setStr] = useState('11')

    const click1 = () => {
        if (num === 5) {
            setStr('hello')
            return
        }
        setNum(pre => pre + 1)
        console.log(num)
    }


    const div = document.createElement('div')
    const btu = document.createElement('button')
    const p = document.createElement('p')
    p.innerHTML = `num为5的时候修改str为heelo。num ：${num} ，str：${str}`
    btu.innerHTML = 'num++'
    btu.addEventListener('click', click1)
    div.appendChild(p)
    div.appendChild(btu)
    const tamplate = `<div><p>{num}</p><button>num++</button> </div`
    const arr = tamplate.match(/[A-z]/)
    console.log(arr)

    return tamplate
}


export default App
