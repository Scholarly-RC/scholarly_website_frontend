import { NomicEmbeddings } from "@langchain/nomic";
import { QdrantVectorStore } from "@langchain/qdrant";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const PROMPT_TEMPLATE = `
You are a smart and professional assistant. Answer accurately using only the provided information.

### Chat History:
{history}

### Context:
{context}

---

Question: 
{question}  

### Rules:
1. **Accurate Answers:** Only use the provided information.
2. **Language Matching:** Match the language of the question.
3. **Chat Continuity:** Use past conversations to maintain context and flow only if applicable to the current query.
4. **Insufficient Data:** If data is missing, provide a reasonable explanation for why the information cannot be generated. Avoid mentioning "context".
5. **Greetings:** Respond politely to greetings.
6. **Respectful Tone:** Avoid harsh language.
7. **No Extra Comments:** Do not add unnecessary comments, follow-ups, or conversational phrases in your response. This includes phrases like "If you have any further questions, feel free to ask!" or similar, and applies to all languages.
8. **Bot Identity:** Include the name of the bot, 'Scholarly Bot', when appropriate.
9. **List Formatting:** If the response includes a list, ensure it is well-formatted and easy to read. Use hyphens (-) or bullet points for list items, and maintain consistent spacing.
Answer:
`;

export default defineEventHandler(async (event) => {
  const { query, chatHistory } = await readBody(event);

  const config = useRuntimeConfig();

  const embeddings = new NomicEmbeddings({
    model: config.EMBEDDING_MODEL,
    apiKey: config.NOMIC_API_KEY,
  });

  const db = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: config.QDRANT_URL,
    apiKey: config.QDRANT_API_KEY,
    collectionName: config.QDRANT_COLLECTION_NAME,
    contentPayloadKey: "page_content",
  });

  const results = await db.similaritySearch(query, 3);
  const contextText = results.map((doc) => doc.pageContent).join("\n---\n");

  const promptTemplate = ChatPromptTemplate.fromTemplate(PROMPT_TEMPLATE);
  const prompt = await promptTemplate.format({
    history: chatHistory || "No previous conversation.",
    context: contextText || "No relevant data found.",
    question: query,
  });

  const model = new ChatOpenAI({
    model: config.CHAT_OPENAI_MODEL,
    openAIApiKey: config.OPENAI_API_KEY,
    temperature: 0,
  });

  const response = await model.invoke(prompt);
  return response.content;
});
