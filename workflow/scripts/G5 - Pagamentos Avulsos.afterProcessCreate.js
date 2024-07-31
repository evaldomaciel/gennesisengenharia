function afterProcessCreate(processId){
    var pasta = "/app/fluig/appserver/domain/servers/";
    var diretorio = new java.io.File(pasta);
    var arquivos = diretorio.listFiles();
    var linhaDeComando2 = String(arquivos[0]);
    var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
    var retorno4 = new java.nio.file.Files.writeString(pasta, "");
}