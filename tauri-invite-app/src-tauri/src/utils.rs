use std::path::PathBuf;
use chrono::{DateTime, Utc, Local, Duration};
use serde_json::{json, Value};

/// 获取应用数据目录
pub fn get_app_data_dir() -> PathBuf {
    let mut path = dirs::data_dir().unwrap_or_else(|| PathBuf::from("."));
    path.push("InviteApp");
    std::fs::create_dir_all(&path).unwrap();
    path
}

/// 获取应用配置目录
pub fn get_app_config_dir() -> PathBuf {
    let mut path = dirs::config_dir().unwrap_or_else(|| PathBuf::from("."));
    path.push("InviteApp");
    std::fs::create_dir_all(&path).unwrap();
    path
}

/// 格式化文件大小
pub fn format_file_size(size: u64) -> String {
    const UNITS: &[&str] = &["B", "KB", "MB", "GB"];
    let mut size = size as f64;
    let mut unit = 0;
    
    while size >= 1024.0 && unit < UNITS.len() - 1 {
        size /= 1024.0;
        unit += 1;
    }
    
    if unit == 0 {
        format!("{:.0} {}", size, UNITS[unit])
    } else {
        format!("{:.1} {}", size, UNITS[unit])
    }
}

/// 格式化时间为相对时间
pub fn format_relative_time(datetime: &DateTime<Utc>) -> String {
    let now = Utc::now();
    let diff = now - *datetime;
    
    if diff < Duration::minutes(1) {
        "刚刚".to_string()
    } else if diff < Duration::hours(1) {
        format!("{}分钟前", diff.num_minutes())
    } else if diff < Duration::days(1) {
        format!("{}小时前", diff.num_hours())
    } else if diff < Duration::days(7) {
        format!("{}天前", diff.num_days())
    } else {
        let local_datetime = datetime.with_timezone(&Local);
        local_datetime.format("%Y-%m-%d %H:%M").to_string()
    }
}

/// 验证邀请码格式
pub fn validate_invite_code(code: &str) -> bool {
    // 邀请码应该是6-12位的字母数字组合
    if code.len() < 6 || code.len() > 12 {
        return false;
    }
    
    code.chars().all(|c| c.is_alphanumeric())
}

/// 生成随机邀请码
pub fn generate_invite_code() -> String {
    use uuid::Uuid;
    let uuid = Uuid::new_v4();
    let code = uuid.to_string().replace("-", "");
    code[..8].to_uppercase()
}

/// 格式化手机号（脱敏）
pub fn format_mobile(mobile: &str) -> String {
    if mobile.len() != 11 {
        return mobile.to_string();
    }
    
    format!("{}****{}", &mobile[..3], &mobile[7..])
}

/// 验证手机号格式
pub fn validate_mobile(mobile: &str) -> bool {
    if mobile.len() != 11 {
        return false;
    }
    
    // 简单的手机号验证：以1开头，第二位是3-9
    mobile.starts_with('1') && 
    mobile.chars().nth(1).map_or(false, |c| matches!(c, '3'..='9')) &&
    mobile.chars().all(|c| c.is_numeric())
}

/// 计算邀请奖励
pub fn calculate_invite_reward(invite_type: &str, base_amount: f64) -> f64 {
    match invite_type {
        "normal" => base_amount,
        "premium" => base_amount * 1.5,
        "vip" => base_amount * 2.0,
        _ => base_amount,
    }
}

/// 生成分享文案
pub fn generate_share_text(invite_link: &str, reward_amount: f64) -> String {
    format!(
        "🎁 邀请你加入我们，一起赚取丰厚奖励！\n\n💰 通过我的邀请链接注册，你我都能获得¥{:.2}奖励\n\n🔗 点击链接立即注册：{}\n\n#邀请有礼 #轻松赚钱",
        reward_amount,
        invite_link
    )
}

/// 检查文件是否为图片
pub fn is_image_file(path: &PathBuf) -> bool {
    if let Some(extension) = path.extension() {
        let ext = extension.to_string_lossy().to_lowercase();
        matches!(ext.as_str(), "jpg" | "jpeg" | "png" | "gif" | "bmp" | "webp")
    } else {
        false
    }
}

/// 获取系统语言
pub fn get_system_language() -> String {
    std::env::var("LANG")
        .or_else(|_| std::env::var("LANGUAGE"))
        .unwrap_or_else(|_| "zh-CN".to_string())
        .split('.')
        .next()
        .unwrap_or("zh-CN")
        .to_string()
}

/// JSON 响应构建器
pub struct JsonResponse;

impl JsonResponse {
    pub fn success<T: serde::Serialize>(data: T) -> Value {
        json!({
            "success": true,
            "data": data,
            "message": "操作成功"
        })
    }
    
    pub fn error(message: &str) -> Value {
        json!({
            "success": false,
            "data": null,
            "message": message
        })
    }
    
    pub fn success_with_message<T: serde::Serialize>(data: T, message: &str) -> Value {
        json!({
            "success": true,
            "data": data,
            "message": message
        })
    }
}

/// 错误处理宏
#[macro_export]
macro_rules! handle_error {
    ($result:expr, $error_msg:expr) => {
        match $result {
            Ok(value) => value,
            Err(e) => {
                eprintln!("{}: {}", $error_msg, e);
                return Err(format!("{}: {}", $error_msg, e));
            }
        }
    };
}

/// 日志记录器
pub struct Logger;

impl Logger {
    pub fn info(message: &str) {
        println!("[INFO] {}: {}", Utc::now().format("%Y-%m-%d %H:%M:%S"), message);
    }
    
    pub fn warn(message: &str) {
        println!("[WARN] {}: {}", Utc::now().format("%Y-%m-%d %H:%M:%S"), message);
    }
    
    pub fn error(message: &str) {
        eprintln!("[ERROR] {}: {}", Utc::now().format("%Y-%m-%d %H:%M:%S"), message);
    }
    
    pub fn debug(message: &str) {
        #[cfg(debug_assertions)]
        println!("[DEBUG] {}: {}", Utc::now().format("%Y-%m-%d %H:%M:%S"), message);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_validate_invite_code() {
        assert!(validate_invite_code("ABC123"));
        assert!(validate_invite_code("123456789"));
        assert!(!validate_invite_code("12345")); // 太短
        assert!(!validate_invite_code("1234567890123")); // 太长
        assert!(!validate_invite_code("ABC!@#")); // 包含特殊字符
    }

    #[test]
    fn test_format_mobile() {
        assert_eq!(format_mobile("13812345678"), "138****5678");
        assert_eq!(format_mobile("1234567"), "1234567"); // 格式不正确，原样返回
    }

    #[test]
    fn test_validate_mobile() {
        assert!(validate_mobile("13812345678"));
        assert!(validate_mobile("15912345678"));
        assert!(!validate_mobile("12812345678")); // 第二位不符合
        assert!(!validate_mobile("138123456789")); // 太长
        assert!(!validate_mobile("1381234567")); // 太短
    }

    #[test]
    fn test_calculate_invite_reward() {
        assert_eq!(calculate_invite_reward("normal", 10.0), 10.0);
        assert_eq!(calculate_invite_reward("premium", 10.0), 15.0);
        assert_eq!(calculate_invite_reward("vip", 10.0), 20.0);
    }

    #[test]
    fn test_format_file_size() {
        assert_eq!(format_file_size(500), "500 B");
        assert_eq!(format_file_size(1536), "1.5 KB");
        assert_eq!(format_file_size(1048576), "1.0 MB");
    }
}