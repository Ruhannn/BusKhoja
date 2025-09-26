import type { NextRequest } from "next/server";

import { Resend } from "resend";
// eslint-disable-next-line node/no-process-env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Bus Khoja <",
      to: [body.to],
      subject: body.subject,
      html: `<p>${body.message}</p>`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  }
  catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
