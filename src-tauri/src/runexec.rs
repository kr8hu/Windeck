use std::process::{ Command, Output };
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
    match run_exe_from_command_line(path, file) {
        Ok(output) => {
            if output.status.success() {
                //Válasz a tauri frontendnek
                window.emit("PROGRESS_RUNEXEC", Payload { status: true }).unwrap();

                //Log
                let stdout_str = String::from_utf8_lossy(&output.stdout);
                println!("{} \n", stdout_str);

                //Error log
                if !output.stderr.is_empty() {
                    let stderr_str = String::from_utf8_lossy(&output.stderr);
                    eprintln!("{} \n", stderr_str);
                }
            } else {
                //Válasz a tauri frontendnek
                window.emit("PROGRESS_RUNEXEC", Payload { status: false }).unwrap();

                //Error log
                eprintln!("Hiba lépettt fel a program megnyitásakor.");
            }
        }
        Err(e) => {
            //Válasz a tauri frontendnek
            window.emit("PROGRESS_RUNEXEC", Payload { status: false }).unwrap();

            //Error log
            eprintln!("Hibaüzenet: {}", e)
        }
    }
}

/**
 * run_exe_from_command_line
 * 
 * Program futtatása 
 */
fn run_exe_from_command_line(exe_path: &str, exe_file: &str) -> std::io::Result<Output> {
    let output = Command::new(format!("{}/{}", exe_path, exe_file)).current_dir(exe_path).output()?;
    Ok(output)
}
