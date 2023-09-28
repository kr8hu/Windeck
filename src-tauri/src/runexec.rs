use std::process::Command;
use tauri::Window;

#[derive(Clone, serde::Serialize)]
struct Payload {
    status: bool,
}

#[tauri::command]
pub fn runexec(path: &str, window: Window) {
    match run_windows_shortcut(path) {
        Ok(_) => {
            println!("Execution completed successfully");
            window.emit("RUNEXEC_PROGRESS", Payload { status: true }).unwrap();
        },
        Err(e) => {
            eprintln!("Error: {}", e);
            window.emit("RUNEXEC_PROGRESS", Payload { status: true }).unwrap();
        },
    }
}

fn run_windows_shortcut(shortcut_path: &str) -> std::io::Result<()> {
    // Use the Windows `start` command to run the shortcut
    let status = Command::new("cmd").arg("/C").arg("start").arg(shortcut_path).status()?;

    if status.success() {
        println!("Successfully ran shortcut: {}", shortcut_path);
    } else {
        eprintln!("Failed to run shortcut: {}", shortcut_path);
    }

    Ok(())
}

/*
pub fn runexec(path: &str, window: Window) {
    let exe_path = path;

    let output = Command::new(exe_path)
        .status()
        .expect("Failed to execute the EXE file");

    if output.success() {
        window.emit("RUNEXEC_PROGRESS", Payload { status: true }).unwrap();
        println!("EXE file executed successfully");
    } else {
        window.emit("RUNEXEC_PROGRESS", Payload { status: false }).unwrap();
        eprintln!("Failed to execute the EXE file");
    }
}
*/
