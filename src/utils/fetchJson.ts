const fetcher = async (...args: [string, { [k: string]: any }]) => {
  try {
    const response = await fetch(...args)

    const data = await response.json()

    if (response.ok) {
      return data
    }

    const error: { [k: string]: any } = new Error(response.statusText)
    error.response = response
    error.data = data
    throw error
  } catch (error: any) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}

export default fetcher
