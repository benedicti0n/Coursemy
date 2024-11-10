const checkToken = (): string | boolean => {
    const token = localStorage.getItem("token")

    if (!token) {
        return false
    }

    return token
}

export default checkToken