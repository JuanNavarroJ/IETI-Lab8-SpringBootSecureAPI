package com.eci.cosw.springbootsecureapi.service;

import com.eci.cosw.springbootsecureapi.model.Task;

import java.util.List;

public interface TaskService {

    List<Task> getTasks();

    Task getTask(String id);

    Task getTaskByDescription(String description);

    Task createTask(Task task);

    Task deleteTask(String id);

}
