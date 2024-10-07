from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from openai import AzureOpenAI
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route("/get_answer", methods=["POST"])
def get_answer():
    question = request.json["question"]

    # Call the answer_question function
    answer = answer_question(question)

    return jsonify({"answer": answer})


# Context based on Indian laws
context = """
This is a legal context specific to Indian laws, particularly concerning property disputes, criminal cases, and civil matters in India. 
Here are some examples:
1. The Indian Penal Code (IPC) covers various criminal offenses such as theft, assault, and fraud.
2. The Transfer of Property Act, 1882, outlines the laws regarding the transfer of property ownership.
3. The Code of Civil Procedure (CPC) governs the procedures followed in civil cases.
4. Various recent judgments from the Supreme Court and High Courts provide interpretations and precedence.

Consider these laws while answering any questions related to legal matters.
"""

def answer_question(question):

    intial_prompt = f"""Only answer the question that is asked, and please do not mention the context. Answer the following question using the context below. If it is out of context, just provide a relevant answer from the context without saying the question is out of context. Start with 'As a Legal Assistant'. Answer in the style of an expert in Indian law. 

    Context:
    {context}

    Q: {question}
    A:"""

    messages = [
        {
            "role": "system",
            "content": intial_prompt,
        },
    ]

    messages.append({"role": "user", "content": question})

    client = Groq()

    # Specify the GPT-3.5-turbo model when making the API request
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=messages,
        temperature=0.5,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        max_tokens=300,
        stop=None,
        stream=False,
    )
    return response.choices[0].message.content.replace('"', "")


def main():
    st.title("Legal Assistant Q&A")

    # Input for user question
    question = st.text_area("Ask a legal question:")

    if st.button("Get Answer"):
        if question:
            # Call the answer_question function
            answer = answer_question(question)
            # Display the answer
            st.text_area("Answer:", answer)
        else:
            st.warning("Please enter a question.")


if __name__ == "__main__":
    app.run(debug=True, port=5001)
