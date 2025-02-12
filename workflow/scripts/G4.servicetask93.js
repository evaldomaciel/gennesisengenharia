function servicetask93(attempt, message) {
    var usuarioNotific = hAPI.getCardValue("cTask039")


    if (usuarioNotific.indexOf("Pool:Group:") != -1) {
        var codGroup = usuarioNotific.split("Pool:Group:")[1];

        //var cst = [DatasetFactory.createConstraint("colleagueGroupPK.groupId", codGroup, codGroup, ConstraintType.MUST)]
        //var dtsGroup = DatasetFactory.getDataset("colleagueGroup", null, cst, null)

        var c1 = DatasetFactory.createConstraint("GRUPO", codGroup, codGroup, ConstraintType.MUST);


        var constraints = [c1];
        var dtsGroup =  DatasetFactory.getDataset("ds_buscaUsrXgrp", null, constraints, null)

        if (dtsGroup.rowsCount > 0) {

            for (var i = 0; i < dtsGroup.rowsCount; i++) {
                var childData = new java.util.HashMap();
                childData.put("usuarioNotificacao", dtsGroup.getValue(i, "USER_CODE"));
                hAPI.addCardChild("tabela_usrNotif", childData);
            }

            hAPI.setCardValue("txt_posicaoNotificacao", "1")
        }


    } else {
        if (usuarioNotific != "") {
            var childData = new java.util.HashMap();
            childData.put("usuarioNotificacao", usuarioNotific);
            hAPI.addCardChild("tabela_usrNotif", childData);
            hAPI.setCardValue("txt_posicaoNotificacao", "1")
        }

    }

}