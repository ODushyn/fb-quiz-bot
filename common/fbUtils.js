exports.retrievePageMessages = function(data) {
    let messages = [];
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function (entry) {
        // Iterate over each messaging event
        entry.messaging.forEach(function (event) {
            if (event.message) {
                // TODO: add check if there is no text (for example attachment only)
                messages.push({playerId: event.sender.id, text: event.message.text});
            }
        });
    });
    return messages;
};