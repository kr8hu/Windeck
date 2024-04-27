fn main() {
    tauri_build::build();

    windows::build!(Windows::Win32::UI::Shell::ShellExecuteW);
}
