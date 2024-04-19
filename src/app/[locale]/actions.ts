"use server"
import { Resend } from "resend"
import EmailTemplate from "@/components/EmailTemplate"
import { render } from "@react-email/render"
import { v4 as uuid } from 'uuid';
import type { ContactFormT } from "@/lib/types/components";

interface State {
  error: string | null
  success: boolean
}

export const sendEmail = async (prevState: State, formData: ContactFormT) => {
  const place = formData.place
  const path = formData.path
  const username = formData.username
  const email = formData.email
  const phone = formData.phone
  const formTitle = formData.formTitle
  const formDescription = formData.formDescription

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vitalya.permyakov155@gmail.com",
      subject: "Запрос на Сайте Гуманитарного Института",
      html: render(EmailTemplate({ place, path, username, email, phone, formTitle, formDescription })),
      headers: {
        'X-Entity-Ref-ID': uuid(),
      },
    })
    return {
      error: null,
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      error: (error as Error).message,
      success: false
    }
  }
}