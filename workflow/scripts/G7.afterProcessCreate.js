function afterProcessCreate(processId) {
    log.info("Inicio afterProcessCreate processo G7");
    hAPI.setCardValue("status", 0);
    hAPI.setCardValue("processInstanceId", getValue('WKNumProces'));

    // Coletar dados restantes do RM
}