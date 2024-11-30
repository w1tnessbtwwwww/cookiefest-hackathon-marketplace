import jwt
import datetime
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

class JWTManager:
    SECRET_KEY = "kezkezkezkezkezkezkezkezkezkezkezkezkezkezkez"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS = 12

    @staticmethod
    def create_access_token(data: dict):
        to_encode = data.copy()
        expire = datetime.datetime.now() + datetime.timedelta(minutes=JWTManager.ACCESS_TOKEN_EXPIRE_HOURS * 60)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, JWTManager.SECRET_KEY, algorithm=JWTManager.ALGORITHM)
        return encoded_jwt

    @staticmethod
    def verify_access_token(token: str):
        try:
            payload = jwt.decode(token, JWTManager.SECRET_KEY, algorithms=[JWTManager.ALGORITHM])
            return payload
        except jwt.PyJWTError:
            raise HTTPException(status_code=401, detail="Invalid token")
