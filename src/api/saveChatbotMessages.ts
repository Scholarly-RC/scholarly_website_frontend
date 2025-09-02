export interface Env {
  NUXT_PUBLIC_API_BASE_URL: string;
}

export async function handleSaveChatbotMessages(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { query, response } = await request.json();
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    const apiUrl = `${env.NUXT_PUBLIC_API_BASE_URL}/items/inquiries/`;

    // Check for existing inquiry
    const existingInquiryResponse = await fetch(`${apiUrl}?filter[date][_eq]=${today}`, {
      method: "GET",
    });

    if (!existingInquiryResponse.ok) {
      throw new Error('Failed to fetch existing inquiry');
    }

    const existingInquiry = await existingInquiryResponse.json();
    const messages = existingInquiry?.data?.[0]?.messages || [];
    messages.push({ query, response });

    if (existingInquiry?.data?.length) {
      // Update existing inquiry
      const updateResponse = await fetch(`${apiUrl}${existingInquiry.data[0].id}`, {
        method: "PATCH",
        body: JSON.stringify({ messages }),
        headers: { "Content-Type": "application/json" },
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update inquiry');
      }
    } else {
      // Create new inquiry
      const createResponse = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          date: today,
          messages: [{ query, response }],
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create inquiry');
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in saveChatbotMessages:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}