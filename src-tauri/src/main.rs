#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod base64convert;
mod runexec;
mod runas;

fn main() {
    tauri::Builder
        ::default()
        //Plugins
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![base64convert::base64convert, runexec::runexec,runas::runas])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
