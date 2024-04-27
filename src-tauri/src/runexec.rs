use std::process::{ Command };
use tauri::Window;

#[derive(Clone, serde::Serialize)]
struct Payload {
    status: bool,
}

/**
 * runexec
 * 
 * Program futtatását kezelő funkció
 */
#[tauri::command]
pub fn runexec(path: &str, file: &str, window: Window) {
    Command::new(format!("{}/{}", path, file)).current_dir(file);
}

