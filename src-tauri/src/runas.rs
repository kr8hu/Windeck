use tauri::Window;

mod bindings {
    windows::include_bindings!();
}

use bindings::Windows::Win32::System::SystemServices::PWSTR;
use bindings::Windows::Win32::UI::Shell::ShellExecuteW;
use bindings::Windows::Win32::UI::WindowsAndMessaging::HWND;

#[derive(Clone, serde::Serialize)]
struct Payload {
    status: bool,
}

/**
 * runas
 *
 * Program futtatását kezelő funkció
 */
#[tauri::command]
pub fn runas(path: &str, file: &str, window: Window) {
    windows::initialize_sta().unwrap();

    let r = unsafe {
        ShellExecuteW(HWND::NULL, "runas", path.to_string() + file, PWSTR::NULL, PWSTR::NULL, 1)
    };

    if r.0 < 32 {
        println!("Hiba a futtatás közben: {:?}", r);
    }
}
