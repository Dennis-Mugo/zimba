import OpenAI from "openai";
import { process } from "./env";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const checkIfLocationRequested = async (outline) => {
  let prompt = `Determine whether the user is asking for nearby medical facilities.
    ###
    outline : What are some of the cancer testing centers near me?
    result: TRUE|cancer testing centers
    search: cancer testing centers
    ###
    outline : What are some of the symptoms of diabetes?
    result: FALSE|diabetes
    
    ###
    outline: ${outline}
    result: 
    `;
  let response = await fetch(`https://api.openai.com/v1/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      max_tokens: 60,
    }),
  });
  // const response = await openai.completions.create({
  //   model: "text-davinci-003",
  //   prompt,
  //   max_tokens: 60,
  // });
  response = await response.json();
  return response.choices[0].text;
};
