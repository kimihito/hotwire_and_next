// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import {render} from "@/helpers/template-renderer"

import {allUsers, User} from "@/repositories/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const users: User[] = await allUsers()

  const resultText = render("users.ejs",
    {users}
  )

  res.appendHeader("Content-Type", "text/html")
    .status(200)
    .send(resultText)
}
