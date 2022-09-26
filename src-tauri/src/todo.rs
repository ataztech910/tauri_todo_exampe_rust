use serde::{Serialize};
#[derive(Serialize)]
pub struct Todo {
    title: String,
    description: String,
    status: bool,
}

static mut TODO_LIST: Vec<Todo> = Vec::new();

pub fn show_list() -> String {
    let error_message = "error while fetching data";
    let todo_copy = unsafe{ &*TODO_LIST };
    match serde_json::to_string(&todo_copy) {
        Ok(result) => result,
        Err(_) => error_message.to_string(),
    }
}

pub unsafe fn add_to_list() {
    TODO_LIST.push(
        Todo {
            title: "My first task to achieve".to_string(),
            description: "This is a description of he task.".to_string(),
            status: false
        }
    );
}
