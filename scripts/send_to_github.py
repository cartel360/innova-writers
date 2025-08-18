import os
import requests
import hmac
import hashlib
from datetime import datetime

# Configuration
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
REPO_OWNER = "cartel360"
REPO_NAME = "innova-writers"
WEBHOOK_SECRET = os.getenv('TEAMS_WEBHOOK_SECRET')

def handle_teams_message(message):
    """Process Teams message and trigger GitHub Action"""
    if not message.get('attachments'):
        return False

    files = []
    for attachment in message['attachments']:
        if attachment['contentType'] in ['text/markdown', 'image/jpeg', 'image/png']:
            files.append({
                'name': attachment['name'],
                'contentUrl': attachment['contentUrl'],
                'contentType': attachment['contentType']
            })

    if files:
        trigger_github_action(files)
        return True
    return False

def trigger_github_action(files):
    """Trigger repository_dispatch event"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/dispatches"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.everest-preview+json",
        "User-Agent": "Teams-GitHub-Integration"
    }
    payload = {
        "event_type": "teams_article_upload",
        "client_payload": {
            "date": datetime.now().strftime('%Y-%m-%d'),
            "files": files
        }
    }
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()