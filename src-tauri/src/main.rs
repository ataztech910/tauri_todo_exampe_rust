#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod todo;

#[tauri::command]
fn show_list() -> String {
    format!("{}", todo::show_list())
}

#[tauri::command]
fn add_todo(description: &str) -> String {
    unsafe { todo::add_to_list(description); }
    show_list()
}

#[tauri::command]
fn change_state(index: usize, status: bool) -> String {
    unsafe { todo::change_state(index, status); }
    show_list()
}

#[tauri::command]
fn remove_item(index: usize) -> String {
    unsafe { todo::remove_item(index); }
    show_list()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![show_list, add_todo, change_state, remove_item])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
