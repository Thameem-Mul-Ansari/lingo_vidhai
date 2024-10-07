from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import glob
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Flask app initialization
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the GROQ and Google API keys
groq_api_key = os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# Initialize the language model
llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")

# Define the prompt template
prompt = ChatPromptTemplate.from_template(
    """
    You are an expert legal assistant specializing in Indian law. Answer the following questions based on the provided legal context only.
    Please ensure that your responses are accurate, precise, and reflect the relevant legal principles.
    
    Respond in simple language, using bullet points for clarity and ease of understanding.

    <context>
    {context}
    <context>

    Questions:
    {input}

    Response:
    - 
    """
)

# Load documents and embeddings once
def initialize_embeddings():
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    loader = PyPDFDirectoryLoader("./laws")
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    final_documents = text_splitter.split_documents(docs[:20])
    
    # Create a FAISS vector store
    vectors = FAISS.from_documents(final_documents, embeddings)
    return vectors, final_documents

# Initialize the vectors on server startup
vectors, final_documents = initialize_embeddings()

@app.route("/ask", methods=["POST"])
def ask():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        user_question = data.get("question")
        if not user_question:
            return jsonify({"error": "No question provided"}), 400

        # Log the received question for debugging
        print(f"Received question: {user_question}")

        # Process the user's question
        document_chain = create_stuff_documents_chain(llm, prompt)
        retriever = vectors.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        
        start = time.process_time()
        response = retrieval_chain.invoke({'input': user_question})
        end_time = time.process_time() - start

        return jsonify({
            "answer": response['answer'],
            "response_time": end_time,
            "context": [doc.page_content for doc in response["context"]]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)