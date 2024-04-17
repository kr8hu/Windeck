use tauri::Window;

extern crate image;
extern crate base64;

use image::{ DynamicImage, GenericImageView };
use std::fs::File;
use std::io::{ Read };
use base64::encode;

#[derive(Clone, serde::Serialize)]
struct Payload {
    result: String,
}

/**
 * base64convert
 * 
 * Kép átalakítását kezelő funkció
 */
#[tauri::command]
pub fn base64convert(path: &str, window: Window) {
    let max_width = 500;
    let max_height = 500;

    //Tömörítés
    let img = load_and_compress_image(path, max_width, max_height);

    //Átalakítás
    let result = image_to_base64_jpeg(img);

    //Válasz a tauri frontendnek
    window.emit("base64result", Payload { result }).unwrap();
}

/**
 * load_and_compress_image
 * 
 * Kép tömörítése
 */
fn load_and_compress_image(file_path: &str, max_width: u32, max_height: u32) -> DynamicImage {
    let mut file = File::open(file_path).unwrap();
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer).unwrap();

    let img = image::load_from_memory(&buffer).unwrap();

    if img.width() > max_width || img.height() > max_height {
        img.thumbnail(max_width, max_height);
    }

    img
}

/**
 * load_and_compress_image
 * 
 * Kép átalakítása base64 formátumra
 */
fn image_to_base64_jpeg(img: image::DynamicImage) -> String {
    let mut encoded_image = Vec::new();

    img.write_to(&mut encoded_image, image::ImageOutputFormat::Jpeg(50)).unwrap();
    encode(encoded_image)
}
