use std::process::{ Command, Output };
use tauri::Window;

#[derive(Clone, serde::Serialize)]
struct Payload {
    status: bool,
}

#[tauri::command]
pub fn runexec(path: &str, file: &str, window: Window) {
    match run_exe_from_command_line(path, file) {
        Ok(output) => {
            if output.status.success() {
                //Frontend event trigger
                window.emit("PROGRESS_RUNEXEC", Payload { status: true }).unwrap();

                let stdout_str = String::from_utf8_lossy(&output.stdout);
                let stderr_str = String::from_utf8_lossy(&output.stderr);
                
                println!("Executable executed successfully.");
                println!("Standard Output: {} \n", stdout_str);
                println!("Standard Error: {} \n", stderr_str);
            } else {
                //Frontend event trigger
                window.emit("PROGRESS_RUNEXEC", Payload { status: false }).unwrap();

                eprintln!("Executable failed to execute.");
            }
        }
        Err(e) => {
                //Frontend event trigger
                window.emit("PROGRESS_RUNEXEC", Payload { status: false }).unwrap();

                eprintln!("Error: {}", e)
        },
    }
}

fn run_exe_from_command_line(exe_path: &str, exe_file: &str) -> std::io::Result<Output> {
    //Parancs futtatása és response átadása a main függvénybe
    let output = Command::new(format!("{}/{}", exe_path, exe_file)).current_dir(exe_path).output()?;

    Ok(output)
}

