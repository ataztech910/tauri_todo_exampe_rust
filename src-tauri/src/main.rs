#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod todo;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn show_list() -> String {
    format!("{}", todo::show_list())
}

#[tauri::command]
fn add_todo() -> String {
    unsafe { todo::add_to_list(); }
    show_list()
}

fn main() {
    unsafe { todo::add_to_list(); }
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, show_list, add_todo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
