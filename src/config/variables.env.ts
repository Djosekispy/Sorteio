require('dotenv').config()

export const {
    PORT,
    MAIL_PORT,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_HOST,
    JWT_SECRET,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGEIN_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} = process.env