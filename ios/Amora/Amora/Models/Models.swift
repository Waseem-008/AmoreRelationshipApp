import Foundation

struct User: Codable, Identifiable {
    let id: UUID
    let email: String?
    let coupleId: UUID?
    let intakeData: [String: AnyCodable]?
    let intakeCompleted: Bool
    let dailyCompletedAt: Date?
    let streakCount: Int
    let lastSessionAt: Date?
    let timezone: String
    let notificationsEnabled: Bool
    let pairingCode: String?
    let createdAt: Date
    
    enum CodingKeys: String, CodingKey {
        case id
        case email
        case coupleId = "couple_id"
        case intakeData = "intake_data"
        case intakeCompleted = "intake_completed"
        case dailyCompletedAt = "daily_completed_at"
        case streakCount = "streak_count"
        case lastSessionAt = "last_session_at"
        case timezone
        case notificationsEnabled = "notifications_enabled"
        case pairingCode = "pairing_code"
        case createdAt = "created_at"
    }
}

struct Couple: Codable, Identifiable {
    let id: UUID
    let partnerAId: UUID
    let partnerBId: UUID
    let pairedAt: Date
    let weeklyExercise: WeeklyExercise?
    let sharedStreakWeeks: Int
    
    enum CodingKeys: String, CodingKey {
        case id
        case partnerAId = "partner_a_id"
        case partnerBId = "partner_b_id"
        case pairedAt = "paired_at"
        case weeklyExercise = "weekly_exercise"
        case sharedStreakWeeks = "shared_streak_weeks"
    }
}

struct WeeklyExercise: Codable {
    let id: String
    let title: String
    let description: String
    let instructions: String
}

struct SessionModel: Codable, Identifiable {
    let id: UUID
    let userId: UUID
    let coupleId: UUID?
    let startedAt: Date
    let endedAt: Date?
    let durationSeconds: Int?
    let mode: String
    let summary: String?
    let transcript: String?
    
    enum CodingKeys: String, CodingKey {
        case id
        case userId = "user_id"
        case coupleId = "couple_id"
        case startedAt = "started_at"
        case endedAt = "ended_at"
        case durationSeconds = "duration_seconds"
        case mode, summary, transcript
    }
}

// Helper for dynamic JSON
struct AnyCodable: Codable {
    let value: Any
    
    init(_ value: Any) {
        self.value = value
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let intValue = try? container.decode(Int.self) {
            value = intValue
        } else if let doubleValue = try? container.decode(Double.self) {
            value = doubleValue
        } else if let stringValue = try? container.decode(String.self) {
            value = stringValue
        } else if let boolValue = try? container.decode(Bool.self) {
            value = boolValue
        } else {
            value = [:]
        }
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        switch value {
        case let intValue as Int:
            try container.encode(intValue)
        case let doubleValue as Double:
            try container.encode(doubleValue)
        case let stringValue as String:
            try container.encode(stringValue)
        case let boolValue as Bool:
            try container.encode(boolValue)
        default:
            try container.encodeNil()
        }
    }
}
