import React from 'react'
import { useEmpData } from '../api/data/employee/employeeQueries'
import { useUserInfo } from '../context/UserInfoContext'

const ApiDebugger = () => {
  // const { data, error } = useCustomerCards()
  const { user } = useUserInfo()

  if (!user) return null

  const { data } = useEmpData('cathrine.kristiansen@knowit.no')
  // const [data, setData] = useState<any>(null)

  // useEffect(() => {
  //   const fetch = async () => {
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     // const res = await getEmpData('cathrine.kristiansen@knowit.no')
  //     const res = await getPrivacyPolicy()
  //     setData(res)
  //   }

  //   fetch()
  // }, [])

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default ApiDebugger
