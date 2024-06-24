function afterProcessCreate(processId) {
	hAPI.setCardValue("IdentificadorFluig", processId)
	hAPI.setCardValue("StatusFluig", "Aberta");
}