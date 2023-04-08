
     // Fetching All The Necessary HTML Tags
     const inputBox = document.getElementById('inputBox');
     const taskCounter = document.querySelector('#taskCount span');
     const TodoList_Container = document.getElementById('TodoList-Container');
     const notification = document.getElementById('notification');
     let Tasks = new Array(); // this will contain all the tasks which we will made
     
        //  fetching Data From API get data
        function fetchingDataFromAPI(){
            fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response)=>{
                return response.json();
            }).then((result)=>{
                for(let i=0;i<11;i++){
                    Tasks[i] = result[i];
                }
            })
            .catch((error)=>{
                console.log(error);
            }) 
            renderingTask();
        }

        

        // Show all the notification in the DOM
        let showNotification = (message,color) => {
            notification.textContent = message;
            notification.style.color = color;
            notification.style.width = '250px';
            
            setTimeout(()=>{
                notification.style.width = '0px';
                notification.textContent = "";
            },2500);
        }

        // Set function is only Adding the task into Task Array
        let addTask = () => {
            let message;
            let color;
            if(inputBox.value.length==0){
                message  = "Task can't be empty"; 
                color = 'red'; 
            }else{
                let task ={
                    title : inputBox.value,
                    id : Date.now().toString(),
                    completed : false
                }
                Tasks.push(task);
                renderingTask();
                countTasks();
                message = "SuccessFully Added:)";
                color = 'green'; 
                inputBox.value ="";     
            }
            showNotification(message,color);
            return;
        }

        // Rendering All the ToDo's in the DOM
        let renderingTask = () => {
            TodoList_Container.innerHTML=""; // set To TODO Container HTML code to empty so that every element will be printed only once    
            for (let i = Tasks.length-1; i >=0 ; i--) {
                Tasks[i];
                let childElement = document.createElement('li');
                childElement.innerHTML = `<input type="checkbox" name="TaskDone" style="width:10%;" class="CheckBox" id=${Tasks[i].id} data-id=${Tasks[i].completed} >
                <span class="Task-Text" style="width:80%;">${Tasks[i].title}</span>
                <label for="TaskDone"></label>
                <i class="fa-solid fa-trash" style="color: #951d1d;" style="width:10%;" delete="true" id=${Tasks[i].id}></i>`  
                TodoList_Container.appendChild(childElement);
            }
           
        }

        // Count Task it will just return length of the Tasks array
        function countTasks(){
            taskCounter.textContent = Tasks.length;
        }

         // Delete the Task
         let deleteTask = (id) => {
            let newTasks = Tasks.filter(function(temp){
             return temp.id != id;
            })
            Tasks = newTasks;
            renderingTask();
            countTasks();
            showNotification("Successfully deleted", "green");
            return;
         }


        //  Checkbox Done function
        let taskDoneCheckBox = (id)=>{
            for (let i = 0; i < Tasks.length; i++) {
               if( Tasks[i].id == id){
                if(Tasks[i].completed == false) { Tasks[i].TaskDone = true; showNotification('Task is Completed','green'); } else { Tasks[i].TaskDone = false;}
                break;
               }
            }
        }

        window.document.addEventListener('click',(event)=>{      // To Get the target HTML Element or tag
        
            // here the delete attribute which we have defined in the delete icon will let us know what to delete
            if(event.target.getAttribute('delete')){
                deleteTask(event.target.getAttribute('id'));
            }

            if(event.target.getAttribute('name')=='TaskDone'){
                taskDoneCheckBox(event.target.getAttribute('id'));
            }
        });
        
        // fetching Data From The InputBox
        inputBox.addEventListener('keyup',(inputEvent)=>{
            let keyValue = inputEvent.key;
            if(keyValue=='Enter'){
                addTask();
            }
            
        });

        fetchingDataFromAPI();
   
