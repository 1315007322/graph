import React, { useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import data from './mockdata'

export default function Graph() {
    

    const renderDom = useCallback((data) => {
        const box = document.getElementById('box')
        box.innerHTML = ''
        const oUl = document.createElement('ul')
        const oli = document.createElement('li')
        oli.classList.add('hasChildren', data[0].open ? 'close' : 'open')
        
        oli.innerText = data[0].title
        if(data[0].open){
            //添加向后的引导线
            
            console.log("添加引导线");
            const oDiv = document.createElement('div')
            oDiv.style.height = 70 *  (data[0].children.length - 1) + 'px' 

            oDiv.classList.add('forWordBackLine')
            oli.appendChild(oDiv)
        }
        if (data[0].children) {
            oli.onclick = () => {
                updateObject(data, data[0].title, !data[0].open)
                renderDom(data)
            }
        }

        oUl.append(oli)
        box.append(oUl)


        renderList(filterArr(data), box)
    }, [])


    useEffect(() => {
        renderDom(data)
    }, [renderDom])


    const renderList = (arr, box) => {
        if (!arr?.length) {
            return
        }
        const oUl = document.createElement('ul')

        arr.map(item => {
            const oli = document.createElement('li')
            
            oli.innerText = item.title
            if (item.children && item.children.length > 0) {
                oli.classList.add('hasChildren', item.open ? 'close' : 'open')
                if(item.open){
                    //添加向后的引导线

                    const oDiv = document.createElement('div')
                    oDiv.style.height = 70 *  (item.children.length - 1) + 'px' 

                    oDiv.classList.add('forWordBackLine')
                    oli.appendChild(oDiv)

                }
                oli.onclick = () => {
                    updateObject(data, item.title, !item.open)
                    renderDom(data)
                }
            }
            if (item.children && item.children.length > 0 && !item.open) {

            }

            oUl.append(oli)
        })

        box.append(oUl)
        console.log(arr, filterArr(arr));
        renderList(filterArr(arr), box)
    }


    //点击设置为关闭
    function updateObject(objArray, targetTitle, newOpen) {
        for (let obj of objArray) {

            if (obj.title === targetTitle) {
                for (let obj1 of objArray) {
                    obj1.open = false
                }

                obj.open = newOpen;
                if (!obj.open && obj.children.length > 0) {
                    closeNode(obj.children)
                }


            } else if (obj.children) {
                updateObject(obj.children, targetTitle, newOpen);
            }
        }
    }

    //关闭该节点下所有的 节点
    function closeNode(objArray) {
        for (let obj of objArray) {
            obj.open = false
            if (obj.children && obj.children.length > 0) {
                closeNode(obj.children)
            }
        }

    }

    const filterArr = (arr) => {
        let result = []
        arr.map(item => {
            if (item.open) {
                result = result.concat(item.children);
            }
        })
        return result
    }
    return (
        <div id='box'>

        </div>
    )
}


