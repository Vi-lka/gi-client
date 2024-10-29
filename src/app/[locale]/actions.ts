"use server"
import nodemailer from "nodemailer";
import EmailTemplate from "@/components/EmailTemplate"
import { render } from "@react-email/render"
import { v4 as uuid } from 'uuid';
import type { ContactFormT, DocRequestFormT } from "@/lib/types/components";
import { smtpOptions } from "@/lib/email";
import { headers } from "next/headers";
import { getAnyBySlug } from "@/lib/queries/getAnyBySlug";

interface State {
  error: string | null
  success: boolean
}

export const sendEmail = async (prevState: State, formData: ContactFormT) => {

  const headersList = headers();
  const locale = headersList.get('x-locale') || "";
  const headersPathName = headersList.get('x-pathname') || "";

  const [ dataResult ] = await Promise.allSettled([ 
      getAnyBySlug({ 
        locale,
        pathName: headersPathName
      }) 
  ]);
  
  const pathNameTitle = dataResult.status === "fulfilled" 
      ? dataResult.value
      : undefined

  const to = formData.to as string
  const path = formData.path
  const pathName = pathNameTitle
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
      subject: 'Запрос на Сайте Гуманитарного Института',
      html: render(EmailTemplate({ path, pathName, username, email, phone, text })),
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


export const sendRequest = async (prevState: State, formData: DocRequestFormT) => {
  const headersList = headers();
  const locale = headersList.get('x-locale') || "";
  const headersPathName = headersList.get('x-pathname') || "";

  const [ dataResult ] = await Promise.allSettled([ 
      getAnyBySlug({ 
        locale,
        pathName: headersPathName
      }) 
  ]);
  
  const pathNameTitle = dataResult.status === "fulfilled" 
      ? dataResult.value
      : undefined

  const to = formData.to as string
  const path = formData.path
  const pathName = pathNameTitle
  const username = `${formData.lastname} ${formData.name} ${formData.noPatronymic ? "" : formData.patronymic} (${formData.group})`
  const email = formData.email + formData.emailStud
  const phone = formData.phone
  const text = "Запрос документов: " + formData.request

  try {
    const transporter = nodemailer.createTransport({
      ...smtpOptions,
    })
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to,
      subject: 'Запрос документов на Сайте Гуманитарного Института',
      html: render(EmailTemplate({ path, pathName, username, email, phone, text })),
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