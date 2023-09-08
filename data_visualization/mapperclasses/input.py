from pydantic import BaseModel
from typing import List
import uuid
import datetime

class DatamodelParams(BaseModel):
    user_id:str 
