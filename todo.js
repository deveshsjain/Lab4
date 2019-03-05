const mongoCollections= require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
const uuidv1 = require('uuid/v1');

module.exports= {
    async getItemById(id) {
        if (!id) throw "You must provide an id to search for";
    
        const todoCollection = await todoItems();
        const foundItem = await todoCollection.findOne({ _id: id });
        if (foundItem === null) throw "No item with that id";
    
        return foundItem;
      },
    
    async createTask(title, description){
        if(!title) throw "You must provide a title";

        if(!description) throw "you must provide a description";

        const todoCollection = await todoItems();

        let newtodoItem= {
            _id: uuidv1(),
            title: title,
            description: description,
            completed: false,
            completedAt: null
        };

        const insertInfo = await todoCollection.insertOne(newtodoItem);
        if (insertInfo.insertedCount === 0) throw "Could not add task";
    
        const newId = insertInfo.insertedId;
    
        const todoItem= await this.getItemById(newId)
        return todoItem;
    },

    async getAllTasks(){
        const todoCollection = await todoItems();

        const allTasks = await todoCollection.find({}).toArray();
        if (allTasks.length === 0) throw "No items";

        return allTasks;
    },

    async getTask(id){
        if(!id) throw "Provide ID";

        const todoCollection = await todoItems();

        const taskId = await todoCollection.findOne({ _id: id});
        if(taskId === null) throw "No task with that ID";
        
        return taskId;
    },

    async completeTask(taskId){       

        const todoCollection = await todoItems();       

        const updateid=
            { $set: 
                {
                    completed: true,
                    completedAt: new Date()
                }
            };
        
        const updatedId= await todoCollection.updateOne({ _id: taskId }, updateid);
        if(!updatedId) throw "Task not updated";

        return await this.getItemById(taskId);
    },

    async removeTask(id){
        if(!id) throw "Provide ID";

        const todoCollection = await todoItems();

        const deleteTask = await todoCollection.findOne({ _id: id});
        if(deleteTask === null) throw "No task with that ID";

        const deleteTask1 = await todoCollection.removeOne({ _id: id});

        if(deleteTask1.deletedCount === 0) throw `Could not delete task with id ${id}`;
    }
};