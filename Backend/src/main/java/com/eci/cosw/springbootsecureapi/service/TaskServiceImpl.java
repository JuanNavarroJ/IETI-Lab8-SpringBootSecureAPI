package com.eci.cosw.springbootsecureapi.service;

import com.eci.cosw.springbootsecureapi.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.bson.types.ObjectId;

@Service
public class TaskServiceImpl implements TaskService {

    private static List<Task> tasks = new ArrayList<>();

    @Autowired
    UserService userService;

    @PostConstruct
    private void populateSampleData()
    {
        tasks.add( new Task( "1","Implement Login View", "In Progress", new Date()));
        tasks.add( new Task( "2","Implement Login Controller", "Ready", new Date()));
        tasks.add( new Task( "3","Facebook Integration", "Completed", new Date()));
        for(Task tk : tasks){
            tk.setResponsible(userService.getUser("juan@mail.com","juan"));
        }
    }

    @Override
    public List<Task> getTasks() {
        return tasks;
    }

    @Override
    public Task getTask(String id) {
        return null;
    }

    @Override
    public Task getTaskByDescription(String description) {
        return null;
    }

    @Override
    public Task createTask(Task task) {
        ObjectId newObjectIdTask = new ObjectId(new Date());
        task.setId(newObjectIdTask.toHexString());
        task.setResponsible(userService.getUser("juan@mail.com","juan"));
        tasks.add(task);
        return task;
    }

    @Override
    public Task deleteTask(String id) {
        return null;
    }
}
