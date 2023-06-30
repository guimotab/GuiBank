function encontraUsuario(usuariosApi, url){
    const pegaUrl = new URL(url)
    const idUrl = pegaUrl.searchParams.get('id')
    return usuariosApi.find((elemento) => elemento._id == idUrl)
}
export {
    encontraUsuario
}