import { dpo_courses, educationalPrograms, employees, graduates } from "./contentQueries"

//.........................dynamicContentQuery.........................//
export const dynamicContentQuery = `
  __typename
  ... on ComponentContentContacts {
    title
    link
    linkTitle
    phone
    email
    location
    image {
      data {
        attributes {
          url
        }
      }
    }
  }
  ... on ComponentContentIconsBlock {
    title
    link
    linkTitle
    backgroundOn
    isList
    image {
      data {
        attributes {
          url
        }
      }
    }
    alignImage
    items {
      title
      iconReact
      description
    }
    moreTitle
    moreLink
  }
  ... on ComponentContentSliderPhotos {
    title
    link
    linkTitle
    photos {
      data {
        attributes {
          url
        }
      }
    }
  }
  ... on ComponentContentSliderEntity {
    title
    link
    linkTitle
    ${educationalPrograms}
    ${employees}
    ${graduates}
    ${dpo_courses}
  }
  ... on ComponentContentCollectionAll {
    title
    link
    linkTitle
    entity
  }
  ... on ComponentContentTextBlock {
    title
    link
    linkTitle
    text
  }
  ... on ComponentContentTextImages {
    title
    link
    linkTitle
    text
    alignImages
    images {
      data {
        attributes {
          url
        }
      }
    }
  }
  ... on ComponentContentTextGrid {
    title
    link
    linkTitle
    items {
      title
      text
    }
    buttonTitle
    buttonLink
  }
  ... on ComponentContentTimeline {
    title
    link
    linkTitle
    subTitle
    line {
      title
      text
    }
  }
  ... on ComponentContentNumbers {
    title
    link
    linkTitle
    subTitle
    items {
      number
      description
      icon
    }
  }
  ... on ComponentContentFiles {
    title
    link
    linkTitle
    items {
      title
      file {
        data {
          attributes {
            url
          }
        }
      }
    }
  }
  ... on ComponentContentAccordion {
    title
    link
    linkTitle
    items {
      title
      text
    }
  }
  ... on ComponentContentFormBlock {
    title
    link
    linkTitle
    image {
      data {
        attributes {
          url
        }
      }
    }
    imageDark {
      data {
        attributes {
          url
        }
      }
    }
    color
    colorDark
    list {
      title
      description
      iconReact
      image {
        data {
          attributes {
            url
          }
        }
      }
      imageDark {
        data {
          attributes {
            url
          }
        }
      }
    }
    largeTitles
    buttonTitle
    buttonLink
    inNewTab
    formTitle
    formDescription
  }
`

//.........................LINKS.........................//
const sameFields = `
  title
  link
  linkTitle
  linkDescription
`
export const dynamicContentLinksQuery = `
  ... on ComponentContentContacts {
    ${sameFields}
  }
  ... on ComponentContentIconsBlock {
    ${sameFields}
  }
  ... on ComponentContentSliderPhotos {
    ${sameFields}
  }
  ... on ComponentContentSliderEntity {
    ${sameFields}
  }
  ... on ComponentContentCollectionAll {
    ${sameFields}
  }
  ... on ComponentContentTextBlock {
    ${sameFields}
  }
  ... on ComponentContentTextImages {
    ${sameFields}
  }
  ... on ComponentContentTextGrid {
    ${sameFields}
  }
  ... on ComponentContentTimeline {
    ${sameFields}
  }
  ... on ComponentContentNumbers {
    ${sameFields}
  }
  ... on ComponentContentFiles {
    ${sameFields}
  }
  ... on ComponentContentAccordion {
    ${sameFields}
  }
  ... on ComponentContentFormBlock {
    ${sameFields}
  }
`