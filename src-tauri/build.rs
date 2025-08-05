#[cfg(target_os = "windows")]
fn main() {
    tauri_build::build();

    windows::build!(Windows::Win32::UI::Shell::ShellExecuteW);
}

#[cfg(not(target_os = "windows"))]
fn main() {
    tauri_build::build();
}