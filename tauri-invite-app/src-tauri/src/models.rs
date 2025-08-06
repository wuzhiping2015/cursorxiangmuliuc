use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

/// 系统信息结构
#[derive(Debug, Serialize, Deserialize)]
pub struct SystemInfo {
    pub platform: String,
    pub arch: String,
    pub version: String,
    pub hostname: String,
}

/// 邀请记录结构
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InviteRecord {
    pub id: Option<i64>,
    pub invite_code: String,
    pub invite_link: String,
    pub invitee_mobile: Option<String>,
    pub status: InviteStatus,
    pub reward_amount: f64,
    pub share_platform: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// 邀请状态枚举
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum InviteStatus {
    Pending,   // 待审核
    Valid,     // 有效
    Invalid,   // 无效
    Expired,   // 已过期
}

impl InviteStatus {
    pub fn to_string(&self) -> String {
        match self {
            InviteStatus::Pending => "pending".to_string(),
            InviteStatus::Valid => "valid".to_string(),
            InviteStatus::Invalid => "invalid".to_string(),
            InviteStatus::Expired => "expired".to_string(),
        }
    }

    pub fn from_string(s: &str) -> Self {
        match s {
            "pending" => InviteStatus::Pending,
            "valid" => InviteStatus::Valid,
            "invalid" => InviteStatus::Invalid,
            "expired" => InviteStatus::Expired,
            _ => InviteStatus::Pending,
        }
    }
}

/// 奖励记录结构
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RewardRecord {
    pub id: Option<i64>,
    pub invite_id: i64,
    pub reward_type: RewardType,
    pub amount: f64,
    pub status: RewardStatus,
    pub description: String,
    pub created_at: DateTime<Utc>,
    pub confirmed_at: Option<DateTime<Utc>>,
}

/// 奖励类型枚举
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum RewardType {
    Invite,    // 邀请奖励
    Activity,  // 活动奖励
    Bonus,     // 额外奖励
    Referral,  // 推荐奖励
}

impl RewardType {
    pub fn to_string(&self) -> String {
        match self {
            RewardType::Invite => "invite".to_string(),
            RewardType::Activity => "activity".to_string(),
            RewardType::Bonus => "bonus".to_string(),
            RewardType::Referral => "referral".to_string(),
        }
    }

    pub fn from_string(s: &str) -> Self {
        match s {
            "invite" => RewardType::Invite,
            "activity" => RewardType::Activity,
            "bonus" => RewardType::Bonus,
            "referral" => RewardType::Referral,
            _ => RewardType::Invite,
        }
    }
}

/// 奖励状态枚举
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum RewardStatus {
    Pending,    // 待确认
    Confirmed,  // 已确认
    Withdrawn,  // 已提现
    Failed,     // 失败
}

impl RewardStatus {
    pub fn to_string(&self) -> String {
        match self {
            RewardStatus::Pending => "pending".to_string(),
            RewardStatus::Confirmed => "confirmed".to_string(),
            RewardStatus::Withdrawn => "withdrawn".to_string(),
            RewardStatus::Failed => "failed".to_string(),
        }
    }

    pub fn from_string(s: &str) -> Self {
        match s {
            "pending" => RewardStatus::Pending,
            "confirmed" => RewardStatus::Confirmed,
            "withdrawn" => RewardStatus::Withdrawn,
            "failed" => RewardStatus::Failed,
            _ => RewardStatus::Pending,
        }
    }
}

/// 分享统计结构
#[derive(Debug, Serialize, Deserialize)]
pub struct ShareStats {
    pub total_shares: i64,
    pub today_shares: i64,
    pub platform_stats: std::collections::HashMap<String, i64>,
}

/// 收益统计结构
#[derive(Debug, Serialize, Deserialize)]
pub struct EarningsStats {
    pub total_earnings: f64,
    pub today_earnings: f64,
    pub pending_earnings: f64,
    pub confirmed_earnings: f64,
    pub withdrawn_earnings: f64,
}

/// 应用配置结构
#[derive(Debug, Serialize, Deserialize)]
pub struct AppConfig {
    pub auto_start: bool,
    pub minimize_to_tray: bool,
    pub notification_enabled: bool,
    pub auto_backup: bool,
    pub backup_interval_days: i32,
    pub theme: String,
    pub language: String,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            auto_start: false,
            minimize_to_tray: true,
            notification_enabled: true,
            auto_backup: true,
            backup_interval_days: 7,
            theme: "light".to_string(),
            language: "zh-CN".to_string(),
        }
    }
}