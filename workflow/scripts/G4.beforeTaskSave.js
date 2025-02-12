function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var activity = parseInt(getValue("WKNumState"));

    if (activity == 22) {

        var attachments = hAPI.listAttachments();
        var hasAttachment = attachments.size() > 0 ? true : false;

        if (!hasAttachment) {
            throw "Favor anexar NF da propriedade!";
        }
    }
}