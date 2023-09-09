import json
import os
import openai
import psycopg2
import pandas as pd
from fastapi import FastAPI, Body
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.document_loaders import TextLoader
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from utils import process_data

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
con = psycopg2.connect(database="postgres", user="postgres", password = "admin", host="127.0.0.1", port="5432")
cursor = con.cursor()
openai.api_key = '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'
# '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'
os.environ["OPENAI_API_KEY"] = openai.api_key
app.embeddings = OpenAIEmbeddings()
app.loaded_text = None


@app.get("/")
async def root():
    return {"Hello": "World!"}


@app.get("/get_user_id/{user_id}")
async def get_incident(user_id):
    input_val = {"user_id": user_id}
    psql_query = "select * from transactions where user_id = '" + input_val["user_id"] + "'"
    cursor.execute(psql_query)
    categories = cursor.fetchall()
    df = pd.DataFrame.from_records(categories, columns=[x[0] for x in cursor.description])
    app.loaded_text = None
    process_data(df)
    loader = TextLoader("input.txt")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    app.loaded_text = text_splitter.split_documents(documents)
    return {"Success": 200}


@app.post("/get_response/")
async def get_incident(input_val: dict = Body(Ellipsis)):
    chain = load_qa_chain(OpenAI(max_tokens=1500, model="text-davinci-003" ), chain_type="stuff")
    document_search = FAISS.from_documents(app.loaded_text, app.embeddings)
    docs = document_search.similarity_search(input_val["question"])
    result = chain.run(input_documents=docs, question=input_val["question"])
    return {"answer": result}















