import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface EmailTemplateProps {
  path?: string;
  username?: string;
  email?: string;
  phone?: string;
  text?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}`
  : "https://hi.sfu-kras.ru";

export const EmailTemplate = ({
  path,
  username,
  email,
  phone,
  text,
}: EmailTemplateProps) => {
  const previewText = `Запрос на Сайте Гуманитарного Института`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/hi-logo-full.png`}
                width="174"
                height="70"
                alt="HI Icon"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Запрос на Сайте Гуманитарного Института
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              ФИО: {username}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Email: {" "}
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 no-underline"
              >
                {email}
              </Link>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Телефон: {" "}
              <Link
                href={`tel:${phone}`}
                className="text-blue-600 no-underline"
              >
                {phone}
              </Link>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] whitespace-pre-wrap">
              {text}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Открыть страницу с которой было отправлено данное сообщение:{" "}
              <Link
                href={`${baseUrl}${path}`}
                className="text-blue-600 underline"
              >
                Открыть
              </Link>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailTemplate.PreviewProps = {
  place: "FormBlock",
  path: `${baseUrl}/`,
  username: "alanturing",
  email: "alan.turing@example.com",
  phone: "+7 999 999-99-99",
  formTitle: "Example",
  formDescription: "Example description",
} as EmailTemplateProps;
  
export default EmailTemplate;
  