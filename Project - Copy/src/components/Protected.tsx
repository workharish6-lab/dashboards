
function Protected({children}: {children: React.ReactNode}) {
    if(!localStorage.getItem("login")){
        window.location.href="/login"
        return null
    }
  return children
}

export default Protected