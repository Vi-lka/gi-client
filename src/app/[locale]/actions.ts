"use server"
import nodemailer from "nodemailer";
import EmailTemplate from "@/components/EmailTemplate"
import { render } from "@react-email/render"
import { v4 as uuid } from 'uuid';
import type { ContactFormT } from "@/lib/types/components";
import { smtpOptions } from "@/lib/email";

interface State {
  error: string | null
  success: boolean
}

export const sendEmail = async (prevState: State, formData: ContactFormT) => {
  const to = formData.to as string
  const path = formData.path
  const username = formData.username
  const email = formData.email
  const phone = formData.phone
  const text = formData.text

  try {
    const transporter = nodemailer.createTransport({
      ...smtpOptions,
    })
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to,
      subject: 'Запрос на Сайте Гуманитарного Института"',
      html: render(EmailTemplate({ path, username, email, phone, text })),
      headers: {
        'X-Entity-Ref-ID': uuid(),
      },
    })
    return {
      error: null,
      success: true
    }
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return {
        error: (error as Error).message,
        success: false
    }
  }
}