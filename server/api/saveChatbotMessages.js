export default defineEventHandler(async (event) => {
  const { query, response } = await readBody(event);
  const config = useRuntimeConfig();

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const apiUrl = `${config.public.apiBaseUrl}/items/inquiries/`;
  const existingInquiry = await $fetch(`${apiUrl}?filter[date][_eq]=${today}`, {
    method: "GET",
  });

  const messages = existingInquiry?.data?.[0]?.messages || [];
  messages.push({ query, response });

  if (existingInquiry?.data?.length) {
    await $fetch(`${apiUrl}${existingInquiry.data[0].id}`, {
      method: "PATCH",
      body: JSON.stringify({ messages }),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    await $fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        date: today,
        messages: [{ query, response }],
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
});
