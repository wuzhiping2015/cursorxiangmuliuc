use rusqlite::{Connection, Result, params};
use chrono::{DateTime, Utc};
use std::path::PathBuf;
use crate::models::*;

/// 数据库管理结构
pub struct Database {
    conn: Connection,
}

impl Database {
    /// 创建新的数据库连接
    pub fn new() -> Result<Self> {
        let db_path = Self::get_db_path();
        let conn = Connection::open(db_path)?;
        
        let db = Database { conn };
        db.create_tables()?;
        Ok(db)
    }

    /// 获取数据库文件路径
    fn get_db_path() -> PathBuf {
        let mut path = dirs::data_dir().unwrap_or_else(|| PathBuf::from("."));
        path.push("InviteApp");
        std::fs::create_dir_all(&path).unwrap();
        path.push("invite_data.db");
        path
    }

    /// 创建数据库表
    fn create_tables(&self) -> Result<()> {
        // 邀请记录表
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS invite_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invite_code TEXT NOT NULL,
                invite_link TEXT NOT NULL,
                invitee_mobile TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                reward_amount REAL NOT NULL DEFAULT 0.0,
                share_platform TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )",
            [],
        )?;

        // 奖励记录表
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS reward_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invite_id INTEGER NOT NULL,
                reward_type TEXT NOT NULL,
                amount REAL NOT NULL,
                status TEXT NOT NULL DEFAULT 'pending',
                description TEXT NOT NULL,
                created_at TEXT NOT NULL,
                confirmed_at TEXT,
                FOREIGN KEY(invite_id) REFERENCES invite_records(id)
            )",
            [],
        )?;

        // 应用配置表
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS app_config (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )",
            [],
        )?;

        // 分享统计表
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS share_stats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                platform TEXT NOT NULL,
                share_date TEXT NOT NULL,
                count INTEGER NOT NULL DEFAULT 1,
                created_at TEXT NOT NULL
            )",
            [],
        )?;

        Ok(())
    }

    /// 保存邀请记录
    pub fn save_invite_record(&self, record: &InviteRecord) -> Result<i64> {
        let now = Utc::now().to_rfc3339();
        
        self.conn.execute(
            "INSERT INTO invite_records (
                invite_code, invite_link, invitee_mobile, status, 
                reward_amount, share_platform, created_at, updated_at
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
            params![
                record.invite_code,
                record.invite_link,
                record.invitee_mobile,
                record.status.to_string(),
                record.reward_amount,
                record.share_platform,
                now,
                now
            ],
        )?;

        Ok(self.conn.last_insert_rowid())
    }

    /// 获取邀请记录列表
    pub fn get_invite_records(&self, limit: Option<i32>, offset: Option<i32>) -> Result<Vec<InviteRecord>> {
        let mut sql = "SELECT * FROM invite_records ORDER BY created_at DESC".to_string();
        
        if let Some(limit) = limit {
            sql.push_str(&format!(" LIMIT {}", limit));
            if let Some(offset) = offset {
                sql.push_str(&format!(" OFFSET {}", offset));
            }
        }

        let mut stmt = self.conn.prepare(&sql)?;
        let record_iter = stmt.query_map([], |row| {
            Ok(InviteRecord {
                id: Some(row.get(0)?),
                invite_code: row.get(1)?,
                invite_link: row.get(2)?,
                invitee_mobile: row.get(3)?,
                status: InviteStatus::from_string(&row.get::<_, String>(4)?),
                reward_amount: row.get(5)?,
                share_platform: row.get(6)?,
                created_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(7)?)
                    .unwrap().with_timezone(&Utc),
                updated_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(8)?)
                    .unwrap().with_timezone(&Utc),
            })
        })?;

        let mut records = Vec::new();
        for record in record_iter {
            records.push(record?);
        }
        Ok(records)
    }

    /// 更新邀请记录状态
    pub fn update_invite_status(&self, id: i64, status: InviteStatus) -> Result<()> {
        let now = Utc::now().to_rfc3339();
        
        self.conn.execute(
            "UPDATE invite_records SET status = ?1, updated_at = ?2 WHERE id = ?3",
            params![status.to_string(), now, id],
        )?;

        Ok(())
    }

    /// 删除邀请记录
    pub fn delete_invite_record(&self, id: i64) -> Result<()> {
        self.conn.execute(
            "DELETE FROM invite_records WHERE id = ?1",
            params![id],
        )?;

        // 同时删除相关的奖励记录
        self.conn.execute(
            "DELETE FROM reward_records WHERE invite_id = ?1",
            params![id],
        )?;

        Ok(())
    }

    /// 保存奖励记录
    pub fn save_reward_record(&self, record: &RewardRecord) -> Result<i64> {
        let now = Utc::now().to_rfc3339();
        
        self.conn.execute(
            "INSERT INTO reward_records (
                invite_id, reward_type, amount, status, description, created_at
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            params![
                record.invite_id,
                record.reward_type.to_string(),
                record.amount,
                record.status.to_string(),
                record.description,
                now
            ],
        )?;

        Ok(self.conn.last_insert_rowid())
    }

    /// 获取奖励记录列表
    pub fn get_reward_records(&self, limit: Option<i32>, offset: Option<i32>) -> Result<Vec<RewardRecord>> {
        let mut sql = "SELECT * FROM reward_records ORDER BY created_at DESC".to_string();
        
        if let Some(limit) = limit {
            sql.push_str(&format!(" LIMIT {}", limit));
            if let Some(offset) = offset {
                sql.push_str(&format!(" OFFSET {}", offset));
            }
        }

        let mut stmt = self.conn.prepare(&sql)?;
        let record_iter = stmt.query_map([], |row| {
            Ok(RewardRecord {
                id: Some(row.get(0)?),
                invite_id: row.get(1)?,
                reward_type: RewardType::from_string(&row.get::<_, String>(2)?),
                amount: row.get(3)?,
                status: RewardStatus::from_string(&row.get::<_, String>(4)?),
                description: row.get(5)?,
                created_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(6)?)
                    .unwrap().with_timezone(&Utc),
                confirmed_at: row.get::<_, Option<String>>(7)?
                    .map(|s| DateTime::parse_from_rfc3339(&s).unwrap().with_timezone(&Utc)),
            })
        })?;

        let mut records = Vec::new();
        for record in record_iter {
            records.push(record?);
        }
        Ok(records)
    }

    /// 计算总收益
    pub fn calculate_total_earnings(&self) -> Result<EarningsStats> {
        let mut stmt = self.conn.prepare(
            "SELECT 
                COALESCE(SUM(amount), 0) as total,
                COALESCE(SUM(CASE WHEN status = 'confirmed' THEN amount ELSE 0 END), 0) as confirmed,
                COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending,
                COALESCE(SUM(CASE WHEN status = 'withdrawn' THEN amount ELSE 0 END), 0) as withdrawn
            FROM reward_records"
        )?;

        let stats = stmt.query_row([], |row| {
            Ok(EarningsStats {
                total_earnings: row.get(0)?,
                confirmed_earnings: row.get(1)?,
                pending_earnings: row.get(2)?,
                withdrawn_earnings: row.get(3)?,
                today_earnings: 0.0, // 需要另外计算
            })
        })?;

        Ok(stats)
    }

    /// 保存应用配置
    pub fn save_config(&self, key: &str, value: &str) -> Result<()> {
        let now = Utc::now().to_rfc3339();
        
        self.conn.execute(
            "INSERT OR REPLACE INTO app_config (key, value, updated_at) VALUES (?1, ?2, ?3)",
            params![key, value, now],
        )?;

        Ok(())
    }

    /// 获取应用配置
    pub fn get_config(&self, key: &str) -> Result<Option<String>> {
        let mut stmt = self.conn.prepare(
            "SELECT value FROM app_config WHERE key = ?1"
        )?;

        let result = stmt.query_row(params![key], |row| {
            Ok(row.get::<_, String>(0)?)
        });

        match result {
            Ok(value) => Ok(Some(value)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e),
        }
    }

    /// 记录分享统计
    pub fn record_share(&self, platform: &str) -> Result<()> {
        let today = Utc::now().format("%Y-%m-%d").to_string();
        let now = Utc::now().to_rfc3339();

        // 先尝试更新现有记录
        let updated = self.conn.execute(
            "UPDATE share_stats SET count = count + 1 WHERE platform = ?1 AND share_date = ?2",
            params![platform, today],
        )?;

        // 如果没有更新任何记录，插入新记录
        if updated == 0 {
            self.conn.execute(
                "INSERT INTO share_stats (platform, share_date, count, created_at) VALUES (?1, ?2, 1, ?3)",
                params![platform, today, now],
            )?;
        }

        Ok(())
    }

    /// 获取分享统计
    pub fn get_share_stats(&self) -> Result<ShareStats> {
        let today = Utc::now().format("%Y-%m-%d").to_string();

        // 获取总分享数
        let total_shares: i64 = self.conn.query_row(
            "SELECT COALESCE(SUM(count), 0) FROM share_stats",
            [],
            |row| row.get(0)
        )?;

        // 获取今日分享数
        let today_shares: i64 = self.conn.query_row(
            "SELECT COALESCE(SUM(count), 0) FROM share_stats WHERE share_date = ?1",
            params![today],
            |row| row.get(0)
        )?;

        // 获取各平台统计
        let mut stmt = self.conn.prepare(
            "SELECT platform, SUM(count) FROM share_stats GROUP BY platform"
        )?;

        let platform_iter = stmt.query_map([], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
        })?;

        let mut platform_stats = std::collections::HashMap::new();
        for item in platform_iter {
            let (platform, count) = item?;
            platform_stats.insert(platform, count);
        }

        Ok(ShareStats {
            total_shares,
            today_shares,
            platform_stats,
        })
    }

    /// 清空所有数据
    pub fn clear_all_data(&self) -> Result<()> {
        self.conn.execute("DELETE FROM invite_records", [])?;
        self.conn.execute("DELETE FROM reward_records", [])?;
        self.conn.execute("DELETE FROM share_stats", [])?;
        Ok(())
    }

    /// 备份数据库
    pub fn backup_to_file(&self, backup_path: &str) -> Result<()> {
        let backup = Connection::open(backup_path)?;
        self.conn.backup(rusqlite::DatabaseName::Main, &backup, None)?;
        Ok(())
    }
}