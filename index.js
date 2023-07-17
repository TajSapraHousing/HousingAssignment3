let addStatus=0
let counter=1
//State is 1 for dev and 0 for tester
let userState=1
var modal = document.getElementById("myModal");
let todo=JSON.parse(localStorage.getItem('todo'))
let approved=JSON.parse(localStorage.getItem('approved'))
let completed=JSON.parse(localStorage.getItem('completed'))
let inProgress=JSON.parse(localStorage.getItem('inprogress'))
let draggabletask=null
let startedFrom=null
const cols=document.getElementsByClassName('coltasks')
const dragdrop=(e)=>{
    let currNode=e.target
    if(e.target.classList.contains('coltasks')){
        e.preventDefault()
    }    
    else{
        while(!currNode.classList.contains('coltasks')){
            currNode=currNode.parentNode
        }
    }
    if((startedFrom.classList.contains('todoTasks')&&currNode.classList.contains('approvedTasks')&&userState==1)||
    (startedFrom.classList.contains('approvedTasks')&&currNode.classList.contains('inProgressTasks')&&userState==1)||
    (startedFrom.classList.contains('inProgressTasks')&&currNode.classList.contains('completedTasks')&&userState==0)){
        currNode.appendChild(draggabletask)
    }
    let arr1=[]
    let arr2=[]
    let arr3=[]
    let arr4=[]
    let all_cards= document.getElementsByClassName('taskCard')
    for(var i=0;i<all_cards.length;i++){
        let pn=all_cards[i].parentNode
        if(pn.classList.contains('todoTasks')){
            arr1.push({id:all_cards[i].id, title:all_cards[i].children[0].innerText, description:all_cards[i].children[1].innerText, createdOn:Number(all_cards[i].classList[1])})
        }
        else if(pn.classList.contains('approvedTasks')){
            arr2.push({id:all_cards[i].id, title:all_cards[i].children[0].innerText, description:all_cards[i].children[1].innerText, createdOn:Number(all_cards[i].classList[1])})
        }
        else if(pn.classList.contains('inProgressTasks')){
            arr3.push({id:all_cards[i].id, title:all_cards[i].children[0].innerText, description:all_cards[i].children[1].innerText, createdOn:Number(all_cards[i].classList[1])})
        }
        else{
            arr4.push({id:all_cards[i].id, title:all_cards[i].children[0].innerText, description:all_cards[i].children[1].innerText, createdOn:Number(all_cards[i].classList[1])})
        }
    }
    localStorage.setItem('todo',JSON.stringify(arr1))
    localStorage.setItem('approved',JSON.stringify(arr2))
    localStorage.setItem('completed',JSON.stringify(arr4))
    localStorage.setItem('inprogress',JSON.stringify(arr3))

    
}
const dragenter=()=>{}
const dragleave=()=>{}
const dragover=(e)=>{
    e.preventDefault()
}
const dragStart=(e)=>{
    draggabletask=e.target
    let currNode=e.target
    while(!currNode.classList.contains('coltasks')){
        currNode=currNode.parentNode
    }
    startedFrom=currNode
}
const dragEnd=()=>{
    draggabletask=null
}
document.getElementsByClassName('addIcon')[0].addEventListener('click',()=>{
    addStatus=1-addStatus
    if(addStatus){
        document.getElementsByClassName('addIcon')[0].setAttribute('class', 'fa-solid fa-plus addIcon')        
        modal.style.display="flex"
        document.getElementsByClassName('Mymodal-content')[0].innerHTML=`
        <form class="MyForm">
        <h1>Create New Task</h1>
        <div class="details">
            <input type="text" id="formTitle" placeholder="Task Title">
            <textarea name="" id="formDesc" cols="30" rows="10" placeholder="Task Description"></textarea>
            <button class="createTaskButton">Create</button>
        </div>
    </form>
        `
        document.getElementsByClassName('createTaskButton')[0].addEventListener('click', (e)=>{
            e.preventDefault()
            let newTaskId=document.getElementById('formTitle').value
            let newTaskDesc=document.getElementById('formDesc').value
            let d=new Date()
            let newTask={id: counter, title:newTaskId, description:newTaskDesc, createdOn:d.getTime()}
            counter+=1
            let todoTasks=JSON.parse(localStorage.getItem('todo'))            
            if(!todoTasks){
                todoTasks=[]
            }
            todoTasks.push(newTask)
            localStorage.setItem('todo',JSON.stringify(todoTasks))
            let curr=document.createElement('div')
            curr.setAttribute('id',counter)
            curr.setAttribute('class', 'taskCard')
            curr.setAttribute('draggable', 'true')
            curr.innerHTML=`<h1>${newTaskId}</h1><p>${newTaskDesc}</p>`
            curr.addEventListener('dragstart', dragStart)
            curr.addEventListener('dragend', dragEnd)
            document.getElementsByClassName('todoTasks')[0].appendChild(curr)
            modal.style.display = "none";
            addStatus=0
            document.getElementsByClassName('addIcon')[0].setAttribute('class', 'fa-solid fa-plus addIcon notrotated')        
        })
    }
    else{
        modal.style.display="none"
        document.getElementsByClassName('addIcon')[0].setAttribute('class', 'fa-solid fa-plus addIcon notrotated')        
    }
})

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      addStatus=0
      document.getElementsByClassName('addIcon')[0].setAttribute('class', 'fa-solid fa-plus addIcon notrotated')        
  }
  }
for(let i=0;i<cols.length;i++){ 
   cols[i].addEventListener('dragover', dragover)
    cols[i].addEventListener('dragenter', dragenter)
    cols[i].addEventListener('dragleave', dragleave)
    cols[i].addEventListener('drop', dragdrop, true)
}
if(approved){
    for(let i=0;i<approved.length;i++){
    let curr=document.createElement('div')
    curr.setAttribute('id', approved[i].id)
    curr.setAttribute('class', `taskCard ${String(approved[i].createdOn)}`)
    curr.setAttribute('draggable', 'true')
    curr.innerHTML=`<h1>${approved[i].title}</h1><p>${approved[i].description}</p>`
    curr.addEventListener('dragstart', dragStart)
    curr.addEventListener('dragend', dragEnd)
    document.getElementsByClassName('approvedTasks')[0].appendChild(curr)
    }
}
if(todo){
for(let i=0;i<todo.length;i++){
    let curr=document.createElement('div')
    curr.setAttribute('id', todo[i].id)
    curr.setAttribute('class', 'taskCard')
    curr.setAttribute('class', `taskCard ${String(todo[i].createdOn)}`)
    curr.setAttribute('draggable', 'true')
    curr.innerHTML=`<h1>${todo[i].title}</h1><p>${todo[i].description}</p>`
    curr.addEventListener('dragstart', dragStart)
    curr.addEventListener('dragend', dragEnd)
    document.getElementsByClassName('todoTasks')[0].appendChild(curr)
}
}
if(completed){
for(let i=0;i<completed.length;i++){
    let curr=document.createElement('div')
    curr.setAttribute('id', completed[i].id)
    curr.setAttribute('class', `taskCard ${String(completed[i].createdOn)}`)
    curr.innerHTML=`<h1>${completed[i].title}</h1><p>${completed[i].description}</p>`
    curr.addEventListener('dragstart', dragStart)
    curr.addEventListener('dragend', dragEnd)
    document.getElementsByClassName('completedTasks')[0].appendChild(curr)
}
}

if(inProgress){
for(let i=0;i<inProgress.length;i++){
    let curr=document.createElement('div')
    curr.setAttribute('id', inProgress[i].id)
    curr.setAttribute('class', `taskCard ${String(inProgress[i].createdOn)}`)
    curr.setAttribute('draggable', 'true')
    curr.innerHTML=`<h1>${inProgress[i].title}</h1><p>${inProgress[i].description}</p>`
    curr.addEventListener('dragstart', dragStart)
    curr.addEventListener('dragend', dragEnd)
    document.getElementsByClassName('inProgressTasks')[0].appendChild(curr)
}    
}
let temp123=document.getElementsByClassName('taskCard')
for(var i=0;i<temp123.length;i++){
    temp123[i].addEventListener('click',(e)=>{
        let currNode=e.target
        while(!currNode.classList.contains('taskCard')){
            currNode=currNode.parentNode
        }
        modal.style.display="flex"
        let date=new Date(Number(currNode.classList[1]))
        document.getElementsByClassName('Mymodal-content')[0].innerHTML=`
            <h1>Task Details</h1>
            <h2>Task Title:${currNode.children[0].innerText}</h2>
            <h2>Created On:${date.toString()}</h2>
            <div>Task Description:${currNode.children[1].innerText}</div>
        `
    })
}
document.getElementsByClassName('boundary')[0].addEventListener('click',()=>{
    userState=1-userState
    if(userState){
        document.getElementsByClassName('boundary')[0].innerText='Dev'        
    }
    else{
        document.getElementsByClassName('boundary')[0].innerText='QA'        
    }
})