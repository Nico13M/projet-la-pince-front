'use server'
export const signup = async (values: any) => {
  const API_LINK = process.env.NEXT_PUBLIC_API_LINK

  const response = await fetch(API_LINK + '/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  })
  const data = await response.json()
  return data
}
