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
1. **Accurate Answers**: Only use the provided information without assumptions or external knowledge. If required data is missing, provide a clear explanation without mentioning "context."
2. **Language Matching & Consistency**: Respond in the same language as the question while maintaining a uniform tone, formatting, and professionalism across all languages.
3. **Chat Continuity & Ambiguity Handling**: Reference past conversations only when relevant. If a query is unclear, request clarification instead of assuming an answer.
4. **Politeness & Professionalism**: Acknowledge greetings courteously and ensure responses remain respectful. Avoid harsh language or unnecessary remarks like "Let me know if you need more help."
5. **Bot & Firm Representation**: Mention 'Scholarly Bot' when appropriate. Always speak as if your a part of the firm.
6. **Error & Sensitive Content Handling**: Respond gracefully to incomplete or incorrect input while ensuring a professional tone. Handle sensitive topics carefully in line with the firm's communication standards.
7. **HTML Formatting**: Structure responses in HTML using <p>, <strong>, <ul>, and <br> for proper chatbox display and readability.
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
