if (process.argv.length < 7) {
    throw new Error("Need at least 7 command line arguments. In order, must be:\n" +
                    "consumer_key\n" + 
                    "consumer_secret\n" + 
                    "access_token\n" + 
                    "access_token_secret\n" + 
                    "target_screen_name\n" +
                    "message_text\n",
                    "send_frequency_in_ms");
}

var twitter = require("twitter");

var client = new twitter({
    consumer_key: process.argv[2],
    consumer_secret: process.argv[3],
    access_token_key: process.argv[4],
    access_token_secret: process.argv[5]
});

var params = {
    screen_name: process.argv[6],
    text: process.argv[7]
};

setInterval(function() {
    client.post("direct_messages/new.json", params, handle_result);
}, process.argv[8]);

function handle_result(error, data, response) {
    if (error) {
        console.log(error);
    } else {
        console.log("Sent at " + Date.now());
    }
}
