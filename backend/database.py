import os
from typing import Optional
from dotenv import load_dotenv
from fastapi import HTTPException, status
from supabase import create_client, Client

# Load environment variables from .env file
load_dotenv()

SUPABASE_URL: Optional[str] = os.getenv("SUPABASE_URL")
SUPABASE_KEY: Optional[str] = os.getenv("SUPABASE_KEY")

_supabase_client: Optional[Client] = None

# Check if credentials are properly configured (not empty and not default placeholders)
def is_supabase_configured() -> bool:
    if not SUPABASE_URL or not SUPABASE_KEY:
        return False
    if "your_supabase" in SUPABASE_URL or "your_supabase" in SUPABASE_KEY:
        return False
    return True

if is_supabase_configured():
    try:
        _supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Supabase client: {e}")
        _supabase_client = None

def get_supabase() -> Client:
    """
    Dependency helper for API endpoints requiring Supabase database access.
    Returns the initialized Supabase client or raises 503 if credentials are missing.
    """
    if _supabase_client is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Supabase connection is not configured. Please set valid SUPABASE_URL and SUPABASE_KEY in backend/.env"
        )
    return _supabase_client
