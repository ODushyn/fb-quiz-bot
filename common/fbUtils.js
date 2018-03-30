exports.retrievePageMessages = function(data) {
    let messages = [];
    data.entry.forEach(function (entry) {
        entry.messaging.forEach(function (event) {
            if (event.message) {
                // TODO: add check if there is no text (for example attachment only)
                messages.push({playerId: event.sender.id, text: event.message.text});
            }
        });
    });
    return messages;
};