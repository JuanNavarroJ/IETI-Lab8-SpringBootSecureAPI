package com.eci.cosw.springbootsecureapi.model;

import java.util.Date;

public class Task {

    private String id;
    private String description;
    private String status;
    private User responsible;
    private Date dueDate;

    public Task() {
    }

    public Task(String id, String description, String status, Date dueDate) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getResponsible() {
        return responsible;
    }

    public void setResponsible(User responsible) {
        this.responsible = responsible;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
}
