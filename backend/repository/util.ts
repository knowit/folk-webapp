import crypto from 'crypto'
import AWS from 'aws-sdk'
AWS.config.update({ region: 'eu-central-1' })

const ssm = new AWS.SSM()

export const getSecret = (name:string, { encrypted = false } = {}) => {
  return new Promise((resolve, reject) => {
    ssm.getParameter(
      {
        Name: name,
        WithDecryption: encrypted,
      },
      (err, data) => {
        if (err) reject(err)
        else resolve(data && data.Parameter ? data.Parameter.Value : null)
      }
    )
  })
}

export const makeEmailUuid = (email, salt) => {
  const hmac = crypto.createHmac('sha256', salt)
  hmac.update(email)
  const sig = hmac.digest('hex')

  return [
    sig.substring(0, 8),
    sig.substring(8, 12),
    sig.substring(12, 16),
    sig.substring(16, 20),
    sig.substring(20, 32),
  ].join('-')
}

export const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

export const range = (x, y) =>
  Array.from(
    (function* () {
      while (x <= y) yield x++
    })()
  )
export type EmployeeInformation = { 
  user_id:string, 
  guid:string, 
  navn:string, 
  manager:string, 
  title:string, 
  link:string, 
  degree:string, 
  image_key:string,
  email:string, 
  customer:string, 
  weight:number, 
  work_order_description:string}

type MergeEmployeesReturn = EmployeeInformation & {
  customerArray:  {
    customer: string, 
    wordOrderDescription: string,
    weight:number
  }[]
}

export const mergeEmployees = (allEmployees:EmployeeInformation[]):MergeEmployeesReturn[] => {
  const mergedEmployees = {}

  allEmployees.forEach((employee) => {
    const thisCustomer = {
      customer: employee.customer,
      workOrderDescription: employee.work_order_description,
      weight: employee.weight,
    }

    const employeeToMerge = mergedEmployees[employee.guid] ?? employee
    const customersForEmployee = employeeToMerge.customerArray ?? []

    mergedEmployees[employee.guid] = {
      ...employeeToMerge,
      customerArray: [thisCustomer, ...customersForEmployee],
    }
  })
  return Object.values(mergedEmployees)
}


export const reStructCategories = (categories, compScores = [], motScores = []) => {
  //find the main categoreis
  const mainCategories = new Set(
    categories.flatMap((item) => Object.keys(item))
  )
  let catSet = []
  const mainCats = []

  // Merges the two arrays on the same category
  const mergedArrs = compScores.map((i) => {
    const found = motScores.find((j) => j.kategori === i.kategori)
    const mergedObj = { ...found, ...i }
    return mergedObj
  })

  mainCategories.forEach((name:string) => {
    mainCats.push(mergedArrs.find((obj) => {
      return obj['kategori'].toUpperCase() == name.toUpperCase()
    }))

    const categoryObject = {
      [name]: [],
    }
    categories.forEach((item) => {
      const childName = item[name]
      if (childName) {
        // Create child category
        const foundSubCat = mergedArrs.find((obj) => {
          return obj['kategori'].toUpperCase() === childName.toUpperCase()
        })
        categoryObject[name].push(foundSubCat)
      }
    })
    catSet.push(categoryObject)
  })
  catSet.unshift({ Hovedkategorier: mainCats })
  catSet = catSet.reduce(function (cat, x) {
    for (const key in x) cat[key] = x[key]
    return cat
  }, {})

  const setNames = Object.keys(catSet)

  return [catSet, setNames]
}
