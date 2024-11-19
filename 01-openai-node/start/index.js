import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function hello(author, text) {
  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a world-renowned author.",
        // content: "You are a longtime, well-respected movie critic.",
        // content: "You are a JavaScript developer. When I send a codeblock of JavaScript, you will return a more readable and better written version of the code.",
      },
      {
        role: "user",
        content: `Write this in the style of ${author}: ${text}`,
        // content: "How would you describe the movie Everything Everywhere All at Once.",
        // content: `var lordify = (regularPerson) => {return regularPerson.firstname + "of Canterbury";};lordify({ firstname: "Allison" });`,
      },
    ],
    model: "gpt-4o",
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
}

//console.log(openai);

// hello();
hello("Ernest Hemingway", "Good afternoon.  I am excited for the weekend.");
