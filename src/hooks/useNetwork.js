import { useState, useEffect } from "react"

const useNetwork = () => {
  const initialValue =
    typeof window !== "undefined" ? window.navigator.onLine : true
  const [isOnline, setNetwork] = useState(initialValue)
  const updateNetwork = () => setNetwork(window.navigator.onLine)

  useEffect(() => {
    window.addEventListener("offline", updateNetwork)
    window.addEventListener("online", updateNetwork)
    return () => {
      window.removeEventListener("offline", updateNetwork)
      window.removeEventListener("online", updateNetwork)
    }
  })

  return isOnline
}

export default useNetwork
