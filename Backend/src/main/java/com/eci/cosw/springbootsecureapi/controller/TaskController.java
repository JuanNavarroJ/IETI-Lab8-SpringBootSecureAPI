package com.eci.cosw.springbootsecureapi.controller;

import com.eci.cosw.springbootsecureapi.model.Task;
import com.eci.cosw.springbootsecureapi.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping( "api" )
public class TaskController {

    @Autowired
    TaskService tService;

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return tService.getTasks();
    }

    @GetMapping("/tasks/{id}")
    public Task getTask(@PathVariable("id") String id) {
        return tService.getTask(id);
    }

    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task) {
        return tService.createTask(task);
    }

    @DeleteMapping("/tasks/{id}")
    public Task deleteTask(@PathVariable String id) {
        return tService.deleteTask(id);
    }

}
