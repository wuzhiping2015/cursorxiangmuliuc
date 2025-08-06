// 隐藏控制台窗口 (Windows)
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod models;
mod utils;
mod system_tray;

use tauri::{Manager, SystemTray};
use commands::*;
use database::Database;
use system_tray::create_system_tray;

/// 应用程序主函数
fn main() {
    // 初始化系统托盘
    let tray = SystemTray::new().with_menu(create_system_tray());

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(system_tray::handle_system_tray_event)
        .setup(|app| {
            // 初始化数据库
            let db = Database::new().expect("Failed to initialize database");
            app.manage(db);

            // 设置应用图标
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Regular);

            Ok(())
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                // 点击关闭按钮时隐藏到系统托盘而不是退出
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            // 系统功能
            get_system_info,
            send_notification,
            copy_to_clipboard,
            read_from_clipboard,
            open_external_link,
            show_in_folder,
            
            // 文件操作
            save_qrcode_to_desktop,
            save_file_to_desktop,
            create_invite_folder,
            
            // 邀请相关
            generate_invite_link,
            generate_qrcode,
            save_invite_record,
            get_invite_records,
            delete_invite_record,
            
            // 奖励相关
            save_reward_record,
            get_reward_records,
            calculate_total_earnings,
            
            // 数据库操作
            backup_database,
            restore_database,
            clear_all_data,
            
            // 应用设置
            get_app_config,
            save_app_config,
            reset_app_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}