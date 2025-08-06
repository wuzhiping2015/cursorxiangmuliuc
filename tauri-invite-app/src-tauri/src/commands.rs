use tauri::{command, State, AppHandle, Manager};
use serde_json::json;
use std::path::PathBuf;
use chrono::Utc;
use clipboard::{ClipboardProvider, ClipboardContext};
use crate::database::Database;
use crate::models::*;
use crate::utils::*;

/// 获取系统信息
#[command]
pub async fn get_system_info() -> Result<SystemInfo, String> {
    Ok(SystemInfo {
        platform: std::env::consts::OS.to_string(),
        arch: std::env::consts::ARCH.to_string(),
        version: std::env::var("OS").unwrap_or_else(|_| "Unknown".to_string()),
        hostname: hostname::get()
            .map(|h| h.to_string_lossy().to_string())
            .unwrap_or_else(|_| "Unknown".to_string()),
    })
}

/// 发送系统通知
#[command]
pub async fn send_notification(title: String, body: String, app_handle: AppHandle) -> Result<(), String> {
    app_handle
        .notification()
        .builder()
        .title(&title)
        .body(&body)
        .show()
        .map_err(|e| e.to_string())?;
    Ok(())
}

/// 复制文本到剪贴板
#[command]
pub async fn copy_to_clipboard(text: String) -> Result<(), String> {
    let mut ctx: ClipboardContext = ClipboardProvider::new()
        .map_err(|e| format!("Failed to create clipboard context: {}", e))?;
    
    ctx.set_contents(text)
        .map_err(|e| format!("Failed to copy to clipboard: {}", e))?;
    
    Ok(())
}

/// 从剪贴板读取文本
#[command]
pub async fn read_from_clipboard() -> Result<String, String> {
    let mut ctx: ClipboardContext = ClipboardProvider::new()
        .map_err(|e| format!("Failed to create clipboard context: {}", e))?;
    
    ctx.get_contents()
        .map_err(|e| format!("Failed to read from clipboard: {}", e))
}

/// 打开外部链接
#[command]
pub async fn open_external_link(url: String) -> Result<(), String> {
    open::that(url).map_err(|e| e.to_string())
}

/// 在文件管理器中显示文件
#[command]
pub async fn show_in_folder(path: String) -> Result<(), String> {
    let path = PathBuf::from(path);
    if path.exists() {
        #[cfg(target_os = "windows")]
        {
            std::process::Command::new("explorer")
                .args(["/select,", &path.to_string_lossy()])
                .spawn()
                .map_err(|e| e.to_string())?;
        }
        
        #[cfg(target_os = "macos")]
        {
            std::process::Command::new("open")
                .args(["-R", &path.to_string_lossy()])
                .spawn()
                .map_err(|e| e.to_string())?;
        }
        
        #[cfg(target_os = "linux")]
        {
            std::process::Command::new("nautilus")
                .args([&path.to_string_lossy()])
                .spawn()
                .map_err(|e| e.to_string())?;
        }
        
        Ok(())
    } else {
        Err("File not found".to_string())
    }
}

/// 保存二维码到桌面
#[command]
pub async fn save_qrcode_to_desktop(qr_data: String, filename: String) -> Result<String, String> {
    let desktop_path = dirs::desktop_dir()
        .ok_or("Failed to get desktop directory")?;
    
    let file_path = desktop_path.join(&filename);
    
    // 生成二维码
    let qr_code = qrcode::QrCode::new(&qr_data)
        .map_err(|e| format!("Failed to generate QR code: {}", e))?;
    
    let image = qr_code.render::<image::Luma<u8>>().build();
    
    // 保存图片
    image.save(&file_path)
        .map_err(|e| format!("Failed to save image: {}", e))?;
    
    Ok(file_path.to_string_lossy().to_string())
}

/// 保存文件到桌面
#[command]
pub async fn save_file_to_desktop(content: String, filename: String) -> Result<String, String> {
    let desktop_path = dirs::desktop_dir()
        .ok_or("Failed to get desktop directory")?;
    
    let file_path = desktop_path.join(&filename);
    
    std::fs::write(&file_path, content)
        .map_err(|e| format!("Failed to save file: {}", e))?;
    
    Ok(file_path.to_string_lossy().to_string())
}

/// 创建邀请文件夹
#[command]
pub async fn create_invite_folder() -> Result<String, String> {
    let desktop_path = dirs::desktop_dir()
        .ok_or("Failed to get desktop directory")?;
    
    let folder_path = desktop_path.join("邀请资料");
    
    std::fs::create_dir_all(&folder_path)
        .map_err(|e| format!("Failed to create folder: {}", e))?;
    
    Ok(folder_path.to_string_lossy().to_string())
}

/// 生成邀请链接
#[command]
pub async fn generate_invite_link(invite_code: String, base_url: Option<String>) -> Result<String, String> {
    let base = base_url.unwrap_or_else(|| "https://app.example.com".to_string());
    let link = format!("{}?invite={}", base, invite_code);
    Ok(link)
}

/// 生成二维码
#[command]
pub async fn generate_qrcode(data: String) -> Result<String, String> {
    let qr_code = qrcode::QrCode::new(&data)
        .map_err(|e| format!("Failed to generate QR code: {}", e))?;
    
    let image = qr_code.render::<image::Luma<u8>>().build();
    
    // 转换为base64
    let mut buffer = Vec::new();
    let mut cursor = std::io::Cursor::new(&mut buffer);
    image.write_to(&mut cursor, image::ImageOutputFormat::Png)
        .map_err(|e| format!("Failed to encode image: {}", e))?;
    
    let base64_string = base64::encode(&buffer);
    Ok(format!("data:image/png;base64,{}", base64_string))
}

/// 保存邀请记录
#[command]
pub async fn save_invite_record(
    record: InviteRecord,
    db: State<'_, Database>
) -> Result<i64, String> {
    db.save_invite_record(&record)
        .map_err(|e| format!("Failed to save invite record: {}", e))
}

/// 获取邀请记录列表
#[command]
pub async fn get_invite_records(
    limit: Option<i32>,
    offset: Option<i32>,
    db: State<'_, Database>
) -> Result<Vec<InviteRecord>, String> {
    db.get_invite_records(limit, offset)
        .map_err(|e| format!("Failed to get invite records: {}", e))
}

/// 删除邀请记录
#[command]
pub async fn delete_invite_record(
    id: i64,
    db: State<'_, Database>
) -> Result<(), String> {
    db.delete_invite_record(id)
        .map_err(|e| format!("Failed to delete invite record: {}", e))
}

/// 保存奖励记录
#[command]
pub async fn save_reward_record(
    record: RewardRecord,
    db: State<'_, Database>
) -> Result<i64, String> {
    db.save_reward_record(&record)
        .map_err(|e| format!("Failed to save reward record: {}", e))
}

/// 获取奖励记录列表
#[command]
pub async fn get_reward_records(
    limit: Option<i32>,
    offset: Option<i32>,
    db: State<'_, Database>
) -> Result<Vec<RewardRecord>, String> {
    db.get_reward_records(limit, offset)
        .map_err(|e| format!("Failed to get reward records: {}", e))
}

/// 计算总收益
#[command]
pub async fn calculate_total_earnings(
    db: State<'_, Database>
) -> Result<EarningsStats, String> {
    db.calculate_total_earnings()
        .map_err(|e| format!("Failed to calculate total earnings: {}", e))
}

/// 备份数据库
#[command]
pub async fn backup_database(
    backup_path: Option<String>,
    db: State<'_, Database>
) -> Result<String, String> {
    let path = backup_path.unwrap_or_else(|| {
        let mut path = dirs::desktop_dir().unwrap_or_else(|| PathBuf::from("."));
        path.push(format!("邀请数据备份_{}.db", Utc::now().format("%Y%m%d_%H%M%S")));
        path.to_string_lossy().to_string()
    });
    
    db.backup_to_file(&path)
        .map_err(|e| format!("Failed to backup database: {}", e))?;
    
    Ok(path)
}

/// 恢复数据库
#[command]
pub async fn restore_database(backup_path: String) -> Result<(), String> {
    // 这里应该实现数据库恢复逻辑
    // 为了安全起见，暂时返回错误
    Err("Database restore not implemented yet".to_string())
}

/// 清空所有数据
#[command]
pub async fn clear_all_data(
    db: State<'_, Database>
) -> Result<(), String> {
    db.clear_all_data()
        .map_err(|e| format!("Failed to clear all data: {}", e))
}

/// 获取应用配置
#[command]
pub async fn get_app_config(
    db: State<'_, Database>
) -> Result<AppConfig, String> {
    let mut config = AppConfig::default();
    
    // 从数据库读取配置
    if let Ok(Some(value)) = db.get_config("auto_start") {
        config.auto_start = value.parse().unwrap_or(false);
    }
    if let Ok(Some(value)) = db.get_config("minimize_to_tray") {
        config.minimize_to_tray = value.parse().unwrap_or(true);
    }
    if let Ok(Some(value)) = db.get_config("notification_enabled") {
        config.notification_enabled = value.parse().unwrap_or(true);
    }
    if let Ok(Some(value)) = db.get_config("theme") {
        config.theme = value;
    }
    if let Ok(Some(value)) = db.get_config("language") {
        config.language = value;
    }
    
    Ok(config)
}

/// 保存应用配置
#[command]
pub async fn save_app_config(
    config: AppConfig,
    db: State<'_, Database>
) -> Result<(), String> {
    db.save_config("auto_start", &config.auto_start.to_string())
        .map_err(|e| format!("Failed to save config: {}", e))?;
    db.save_config("minimize_to_tray", &config.minimize_to_tray.to_string())
        .map_err(|e| format!("Failed to save config: {}", e))?;
    db.save_config("notification_enabled", &config.notification_enabled.to_string())
        .map_err(|e| format!("Failed to save config: {}", e))?;
    db.save_config("theme", &config.theme)
        .map_err(|e| format!("Failed to save config: {}", e))?;
    db.save_config("language", &config.language)
        .map_err(|e| format!("Failed to save config: {}", e))?;
    
    Ok(())
}

/// 重置应用配置
#[command]
pub async fn reset_app_config(
    db: State<'_, Database>
) -> Result<AppConfig, String> {
    let config = AppConfig::default();
    save_app_config(config.clone(), db).await?;
    Ok(config)
}