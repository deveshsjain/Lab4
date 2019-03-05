const todoItems = require("./todo");
const connection = require("./mongoConnection");

const main = async () => {
    try{
        // const createdTask1 = await todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
        // console.log(createdTask1);
        
        // const createdTask2 = await todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
        // console.log(createdTask2);
        
        // const getTasks = await todoItems.getAllTasks();
        // console.log(getTasks);

        // const task = await todoItems.getTask("05101ec0-cf61-11e8-80fa-13f183814fe0");
        // console.log(task);

        // const task = await todoItems.getTask("05101ec0-cf61-11e8-80fa-13f183814fe0");
        // const finishedTask = await todoItems.completeTask(task._id); 
        // console.log(finishedTask);
        
        const removeTask = await todoItems.removeTask("05101ec0-cf61-11e8-80fa-13f183814fe0");
        return await todoItems.getTask("05101ec0-cf61-11e8-80fa-13f183814fe0");
    }
    catch (error) {
        console.error(error);
    }


    const db = await connection();
    await db.serverConfig.close();  
    console.log("Done!");
};

main().catch(error => {
    console.log(error);
  });