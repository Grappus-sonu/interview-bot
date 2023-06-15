import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body)
    const {previousMessages, sender, text} = body
    const chatThread = [
      {
        reciever: 'John Doe',
        text: "Temp Message"
      },
      { sender, text },
      ...previousMessages,
    ]
    res.status(200).json([...chatThread]);
  }
  else {
    res.status(200).send("This is a post request");
  }
}