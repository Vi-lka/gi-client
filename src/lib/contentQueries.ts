//.........................ITEMS.........................//
export const educationalPrograms = `
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
`

export const employees = `
  employees {
    data {
      id
      attributes {
        slug
        title
        meta {
          post
          degree
          degreeShort
          rank
          rankShort
        }
        description
        image {
          data {
            attributes {
              url
            }
          }
        }
        email
        phone
        location
        hashtags {
          data {
            attributes {
              slug
              title
            }
          }
        }
        showContacts
        showHashtags
      }
    }
  }
`

export const graduates = `
  graduates {
    data {
      id
      attributes {
        title
        description
        additionalInfo
        image {
          data {
            attributes {
              url
            }
          }
        }
        ${educationalPrograms}
        oldPrograms {
          title
          code
          mainName
          mainCode
          type
        }
      }
    }
  }
`

export const dpo_courses = `
  dpo_courses {
    data {
      id
      attributes {
        title
        slug
        description
        dateStart
        dateEnd
        location
        hours
        price
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
`