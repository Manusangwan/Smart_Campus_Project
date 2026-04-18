import conf from "../conf/conf";

export const generateComplaintDescription = async (title) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${conf.openrouterapikey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // free / widely available
        messages: [
          {
            role: "user",
            content: `Write a short, polite complaint description for: "${title}" (max 80 words).`,
          },
        ],
      }),
    });

    const data = await res.json();

    console.log("🧠 OpenRouter:", data);

    return (
      data?.choices?.[0]?.message?.content ||
      fallback(title)
    );
  } catch (err) {
    console.error(err);
    return fallback(title);
  }
};

const fallback = (title) =>
  `This complaint is regarding ${title}. Kindly resolve it as soon as possible.`;