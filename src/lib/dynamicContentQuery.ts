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
      iconCustom
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
    educational_programs {
      data {
        id
        attributes {
          slug
          title
          type
          code
          mainName
          mainCode
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    employees {
      data {
        id
        attributes {
          title
          post
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
          hashtags {
            data {
              attributes {
                slug
                title
              }
            }
          }
        }
      }
    }
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
      iconCustom
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