import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from core.config import settings
import os

# We check if these exist in .env (You can add them later)
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

def send_booking_confirmation(to_email: str, user_name: str, resource: str, time: str):
    """
    Sends a confirmation email for a room booking.
    """
    subject = f"Booking Confirmed: {resource}"
    
    body = f"""
    Hi {user_name},
    
    Your booking for {resource} has been confirmed!
    
    Time: {time}
    
    Thank you,
    Chloris AI Team
    """
    
    # --- MOCK MODE (For Development) ---
    # If no email password is set, we just print it to the console.
    if not SMTP_USER or not SMTP_PASSWORD:
        print("\n" + "="*30)
        print(f"📧 [MOCK EMAIL] To: {to_email}")
        print(f"Subject: {subject}")
        print(body)
        print("="*30 + "\n")
        return True

    # --- REAL MODE (Sends actual email) ---
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False