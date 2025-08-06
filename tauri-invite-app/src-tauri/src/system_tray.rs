use tauri::{
    SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent, AppHandle, Manager, CustomMenuItem, SystemTraySubmenu
};

/// 创建系统托盘菜单
pub fn create_system_tray() -> SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "退出应用");
    let hide = CustomMenuItem::new("hide".to_string(), "隐藏窗口");
    let show = CustomMenuItem::new("show".to_string(), "显示窗口");
    let separator = SystemTrayMenuItem::Separator;
    
    // 快捷操作子菜单
    let quick_invite = CustomMenuItem::new("quick_invite".to_string(), "快速邀请");
    let copy_link = CustomMenuItem::new("copy_link".to_string(), "复制邀请链接");
    let check_earnings = CustomMenuItem::new("check_earnings".to_string(), "查看收益");
    let quick_actions = SystemTraySubmenu::new(
        "快捷操作",
        SystemTrayMenu::new()
            .add_item(quick_invite)
            .add_item(copy_link)
            .add_item(check_earnings)
    );
    
    // 设置子菜单
    let settings = CustomMenuItem::new("settings".to_string(), "应用设置");
    let about = CustomMenuItem::new("about".to_string(), "关于应用");
    let check_update = CustomMenuItem::new("check_update".to_string(), "检查更新");
    let settings_menu = SystemTraySubmenu::new(
        "设置",
        SystemTrayMenu::new()
            .add_item(settings)
            .add_native_item(SystemTrayMenuItem::Separator)
            .add_item(about)
            .add_item(check_update)
    );

    SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_native_item(separator)
        .add_submenu(quick_actions)
        .add_native_item(separator)
        .add_submenu(settings_menu)
        .add_native_item(separator)
        .add_item(quit)
}

/// 处理系统托盘事件
pub fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            // 左键点击显示/隐藏窗口
            let window = app.get_window("main").unwrap();
            if window.is_visible().unwrap() {
                window.hide().unwrap();
            } else {
                window.show().unwrap();
                window.set_focus().unwrap();
            }
        }
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            // 右键点击显示菜单（自动处理）
        }
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            // 双击显示窗口
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => {
            handle_menu_item_click(app, &id);
        }
        _ => {}
    }
}

/// 处理菜单项点击事件
fn handle_menu_item_click(app: &AppHandle, menu_id: &str) {
    let window = app.get_window("main").unwrap();
    
    match menu_id {
        "quit" => {
            // 退出应用
            app.exit(0);
        }
        "hide" => {
            // 隐藏窗口
            window.hide().unwrap();
        }
        "show" => {
            // 显示窗口
            window.show().unwrap();
            window.set_focus().unwrap();
        }
        "quick_invite" => {
            // 快速邀请 - 显示窗口并跳转到邀请页面
            window.show().unwrap();
            window.set_focus().unwrap();
            window.emit("navigate-to", "/invite").unwrap();
        }
        "copy_link" => {
            // 复制邀请链接
            window.emit("copy-invite-link", ()).unwrap();
            
            // 发送通知
            app.notification()
                .builder()
                .title("邀请链接")
                .body("邀请链接已复制到剪贴板")
                .show()
                .unwrap();
        }
        "check_earnings" => {
            // 查看收益 - 显示窗口并跳转到奖励页面
            window.show().unwrap();
            window.set_focus().unwrap();
            window.emit("navigate-to", "/rewards").unwrap();
        }
        "settings" => {
            // 应用设置
            window.show().unwrap();
            window.set_focus().unwrap();
            window.emit("navigate-to", "/settings").unwrap();
        }
        "about" => {
            // 关于应用
            show_about_dialog(app);
        }
        "check_update" => {
            // 检查更新
            check_for_updates(app);
        }
        _ => {}
    }
}

/// 显示关于对话框
fn show_about_dialog(app: &AppHandle) {
    let message = format!(
        "邀请拉新助手 v1.0.0\n\n专业的邀请拉新管理工具\n\n功能特色：\n• 快速生成邀请链接和二维码\n• 多渠道分享支持\n• 实时收益统计\n• 本地数据存储\n• 系统深度集成\n\n© 2024 开发团队"
    );
    
    app.dialog()
        .message(message)
        .title("关于邀请拉新助手")
        .show(|_| {});
}

/// 检查更新
fn check_for_updates(app: &AppHandle) {
    // 这里可以实现更新检查逻辑
    // 暂时显示一个提示
    app.notification()
        .builder()
        .title("检查更新")
        .body("当前已是最新版本")
        .show()
        .unwrap();
}

/// 更新系统托盘图标状态
pub fn update_tray_icon_status(app: &AppHandle, has_new_invite: bool) {
    let tray = app.tray_handle();
    
    if has_new_invite {
        // 有新邀请时显示不同的图标或提示
        tray.set_tooltip("邀请拉新助手 - 有新邀请").unwrap();
    } else {
        tray.set_tooltip("邀请拉新助手").unwrap();
    }
}

/// 设置托盘通知
pub fn set_tray_notification(app: &AppHandle, title: &str, message: &str) {
    app.notification()
        .builder()
        .title(title)
        .body(message)
        .show()
        .unwrap();
}