export async function getAiResponse({
  message,
  chatId,
  onContent,
  onChat,
  onComplete,
}) {
  const res = await fetch("/api/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      content: message,
      chatId,
    }),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || `Request failed with status ${res.status}`);
  }

  const stream = res.body;

  const decoder = new TextDecoder();

  for await (const chunk of stream) {
    // console.log(decoder.decode(chunk));
    const response = decoder.decode(chunk);

    response.split("\n").forEach((line) => {
      if (line.startsWith("data:")) {
        onContent(JSON.parse(line.replaceAll("data:", "")).text);
      }
      if (line.startsWith("title:")) {
        const chat = JSON.parse(line.replace("title: ", ""));
        onChat({
          id: chat.chatId,
          title: chat.title,
          messages: [],
        });
      }
    });
  }
  onComplete();
}
