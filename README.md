# Todo App Server

Welcome to the Todo App Server repository! This repository hosts a NestJS server that provides APIs to manage tasks. You can easily deploy this server using Docker and Nodejs for a hassle-free setup.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
  - [Get Tasks](#get-tasks)
  - [Create New Task](#create-new-task)
  - [Update Task](#update-task)
  - [Get Metrics](#get-metrics)
  - [Delete Task by ID](#delete-task-by-id)
- [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos)
- [HTTP Responses](#http-responses)

## Prerequisites

- Node.js (version >= 16.X.X)
- npm (version >= 9.X.X)
- Docker (version >= 24.X.X)
- Docker Compose (version =< 1.29.1)

Before running the server, create a `.env` file in the root directory based on the provided `.env.example` file. This file contains configuration options for the server, including the port to use. Modify the values in the `.env` file to match your preferences.

## Getting Started

### Running Locally

1. Clone this repository:

```bash
git clone https://github.com/KshitijBharde/todo-nestjs.git
cd todo-nestjs
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run start-app:dev
```

The server will be accessible at `http://localhost:[SERVER_PORT]`.

## API Documentation

### Get Tasks

#### Endpoint

- `GET /api/task/getTasks`

#### Description

This endpoint retrieves a list of tasks based on the specified query parameters.

#### Query Parameters

- `limit` (optional): The maximum number of tasks to retrieve per request.
- `offset` (optional): The number of tasks to skip before starting to retrieve tasks.

#### Request Example

```http
GET /api/task/getTasks?limit=10&offset=0
```

#### Response

- Status Code: `200 OK`
- Response Body: An array of task objects.

### Create New Task

#### Endpoint

- `POST /api/task/createNewTask`

#### Description

This endpoint allows you to create a new task by providing the task details in the request body.

#### Request Body

- `title` (required): The title of the task (string).
- `description` (optional): A description of the task (string).
- `status` (optional): The status of the task (string) - must be one of the valid task statuses(OPEN, IN_PROGRESS, COMPLETED).

#### Request Example

```json
POST /api/task/createNewTask

{
  "title": "New Task",
  "description": "Description of the task",
  "status": "IN_PROGRESS"
}
```

#### Response

- Status Code: `201 Created`
- Response Body: The created task object.

### Update Task

#### Endpoint

- `PUT /api/task/updateTask`

#### Description

This endpoint allows you to update an existing task by providing the updated task details in the request body.

#### Request Body

- `id` (required): The ID of the task to update (number).
- `title` (required): The updated title of the task (string).
- `description` (optional): The updated description of the task (string).
- `currTaskStatus` (required): The updated status of the task (string) - must be one of the valid task statuses(OPEN, IN_PROGRESS, COMPLETED).

#### Request Example

```json
PUT /api/task/updateTask

{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description of the task",
  "currTaskStatus": "COMPLETED"
}
```

#### Response

- Status Code: `200 OK`
- Response Body: The updated task object.

### Get Metrics

#### Endpoint

- `GET /api/task/getMetrics`

#### Description

This endpoint retrieves monthly metrics for tasks, including the count of open, in-progress, and completed tasks for each month.

#### Request Example

```http
GET /api/task/getMetrics
```

#### Response

- Status Code: `200 OK`
- Response Body: An array of monthly metrics objects.

### Delete Task by ID

#### Endpoint

- `DELETE /api/task/deleteTaskById/:id`

#### Description

This endpoint allows you to delete a task by its ID.

#### Path Parameters

- `id` (required): The ID of the task to delete (number).

#### Request Example

```http
DELETE /api/task/deleteTaskById/1
```

#### Response

- Status Code: `204 No Content`

## Data Transfer Objects (DTOs)

### CreateNewTask DTO

```json
{
  "title": "New Task",
  "description": "Description of the task",
  "status": "IN_PROGRESS"
}
```

### UpdateTask DTO

```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description of the task",
  "currTaskStatus": "COMPLETED"
}
```

## HTTP Responses

- `200 OK`: The request was successful, and the response contains the requested data.
- `201 Created`: A new resource has been successfully created, and the response contains the created resource.
- `204 No Content`: The request was successful, and there is no response body (usually for DELETE requests).
- `400 Bad Request`: The request contains invalid data or parameters. The response body provides details about the error.
- `404 Not Found`: The requested resource does not exist.
- `500 Internal Server Error`: An unexpected server error occurred.
