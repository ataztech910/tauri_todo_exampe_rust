use serde::{Serialize, Deserialize};
#[derive(Debug, Serialize, Deserialize)]
pub struct Todo {
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

pub unsafe fn add_to_list(description: &str) {
    TODO_LIST.push(
        Todo {
            description: description.to_string(),
            status: false
        }
    );
}

pub unsafe fn change_state(index: usize, status: bool) {
    let mut item = &mut TODO_LIST[index];
    item.status = status.to_owned();
}

pub unsafe fn remove_item(index: usize) {
    TODO_LIST.remove(index);
}