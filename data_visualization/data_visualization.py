import subprocess
import psutil
import uvicorn
from fastapi import FastAPI, Response
from mapperclasses.input  import DatamodelParams
from fastapi.params import Body
import json
import psycopg2
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd



app = FastAPI()

con = psycopg2.connect(database="postgres", user="postgres", host="127.0.0.1", port="5431")
cursor = con.cursor()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")

def test():
    return {"test": "Service is up!"}

@app.post("/income_category_avg")
def category_avg(response: Response,request: DatamodelParams = Body(...)):
    user_id = request.user_id
    postgreSQL_select_Query = "select name,avg(value) as value from ( select DATE_TRUNC('month', txdate) as month,category as name, cast(avg(deposit) as int) as value  from transactions where user_id = '"+user_id+"' group by DATE_TRUNC ('month', txdate) ,user_id,category having avg(deposit) > 0)as temp group by name;"
    cursor.execute(postgreSQL_select_Query)
    categories =  cursor.fetchall()
    categories_df = pd.DataFrame.from_records(categories, columns=[x[0] for x in cursor.description])
    data = categories_df.to_dict(orient="records")
    return_json = {
  "series": [
    {
      "type": 'pie',
      "data": data,
        }
    ]
    }
    json_str = json.dumps(return_json, indent=4, default=str)
    return Response(content=json_str, media_type='application/json')

@app.post("/expense_category_avg")
def category_avg(response: Response,request: DatamodelParams = Body(...)):
    user_id = request.user_id
    postgreSQL_select_Query = "select name,avg(value) as value from ( select DATE_TRUNC ('month', txdate) as month,category as name, cast(sum(withdrawal) as int) as value  from transactions where user_id = '"+user_id+"' group by DATE_TRUNC('month', txdate) ,category having avg(withdrawal) > 0) as temp group by name;"
    cursor.execute(postgreSQL_select_Query)
    categories =  cursor.fetchall()
    categories_df = pd.DataFrame.from_records(categories, columns=[x[0] for x in cursor.description])
    data = categories_df.to_dict(orient="records")
    return_json = {
  "series": [
    {
      "type": 'pie',
      "data": data,
      "roseType": 'area'
        }
    ]
    }
    json_str = json.dumps(return_json, indent=4, default=str)
    return Response(content=json_str, media_type='application/json')

@app.post("/summary")
def category_avg(response: Response,request: DatamodelParams = Body(...)):
    user_id = request.user_id
    postgreSQL_select_Query = "select sum(deposit) as deposit,sum(withdrawal) as withdrawal from transactions where user_id = '"+user_id+"';"
    cursor.execute(postgreSQL_select_Query)
    categories =  cursor.fetchall()
    categories_df = pd.DataFrame.from_records(categories, columns=[x[0] for x in cursor.description])
    data = categories_df.to_dict(orient='records')
    return_json = {
  "series": [
    {
      "type": 'pie',
      "data": data,
      "roseType": 'area'
        }
    ]
    }
    json_str = json.dumps(return_json, indent=4, default=str)
    return Response(content=json_str, media_type='application/json')

@app.post("/monthwise_summary")
def category_avg(response: Response,request: DatamodelParams = Body(...)):
    user_id = request.user_id
    postgreSQL_select_Query = "select DATE_TRUNC ('month', txdate) as month,sum(deposit) as deposit,sum(withdrawal) as withdrawal from transactions where user_id = '"+user_id+"' group by DATE_TRUNC ('month', txdate);"
    cursor.execute(postgreSQL_select_Query)
    categories =  cursor.fetchall()
    categories_df = pd.DataFrame.from_records(categories, columns=[x[0] for x in cursor.description])
    col_month_list = categories_df['month'].tolist()
    col_deposit_list = categories_df['deposit'].tolist()
    col_withdrawal_list = categories_df['withdrawal'].tolist()
    col_savings_list = []
    for i in range(len(col_deposit_list)):
        col_savings_list.append(col_deposit_list[i]-col_withdrawal_list[i])
    return_json = {
  "xAxis": {
    "data": col_month_list
  },
  "yAxis": {},
  "series": [
    {
      "data": col_withdrawal_list,
      "type": 'bar',
      "stack": 'x'
    },
    {
      "data": col_savings_list,
      "type": 'bar',
      "stack": 'x'
    }
  ]
    }
    json_str = json.dumps(return_json, indent=4, default=str)
    return Response(content=json_str, media_type='application/json')

uvicorn.run(app, host="0.0.0.0", port=8083, log_level="debug")
