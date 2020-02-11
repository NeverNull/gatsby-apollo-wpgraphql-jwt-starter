import React, { useEffect } from "react"
import { navigate } from "gatsby"

const PageNotFound = () => {
  useEffect(() => {
    navigate(`/dashboard/`, {replace: true})
  }, [])

  return <div>Page not found</div>
}

export default PageNotFound
