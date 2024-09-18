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
          posts {
            post
            department {
              data {
                attributes {
                  shortTitle slug
                }
              }
            }
          }
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
            id
            attributes {
              slug
              title
            }
          }
        }
        head_in_department {
          data {
            id
            attributes {
              shortTitle
              slug
            }
          }
        }
        departments {
          data {
            id
            attributes {
              shortTitle
              slug
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

export const departments = `
  departments {
    data {
      id
      attributes {
        slug
        title
        image {
          data {
            attributes { url }
          }
        }
        contacts {
          url
          email
          phone
          location
        }
        head {
          data {
            id
            attributes { 
              slug
              title 
            }
          }
        }
      }
    }
  }
`

export const news = `
  news(sort: "publishedAt:asc") {
    data {
      id
      attributes {
        slug
        title
        image {
          data {
            attributes { url }
          }
        }
        publishedAt
      }
    }
  }
`

export const projects = `
  projects {
    data {
      id
      attributes {
        title
        slug
        description
        year
        head {
          title
          link
        }
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