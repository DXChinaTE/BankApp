var appData = Windows.Storage.ApplicationData;
var voiceCommands = Windows.ApplicationModel.VoiceCommands;
var appService = Windows.ApplicationModel.AppService;

(function () {
    "use strict";
    
    // Get the background task details
    var backgroundTaskInstance = Windows.UI.WebUI.WebUIBackgroundTaskInstance.current;
    var voiceServiceConnection = null;
    //var image = null;

    function doWork() {
        /// <summary>Main entrypoint for background task launched by Cortana. Encapsulated
        /// into a function doWork to break up the work into functional components. Executed with a
        /// call to doWork() below</summary>

        var details = backgroundTaskInstance.triggerDetails;

        var deferral = backgroundTaskInstance.getDeferral();

        function onCanceled(cancelEventArg) {
            var cancelReason = cancelEventArg;
        }
        backgroundTaskInstance.addEventListener("canceled", onCanceled);

        function onVoiceCommandCompleted(completedEventArg) {
            var completionReason = completedEventArg.completionReason;
        }

        if (details instanceof appService.AppServiceTriggerDetails) {
            voiceServiceConnection = voiceCommands.VoiceCommandServiceConnection.fromAppServiceTriggerDetails(details);
            voiceServiceConnection.addEventListener("voiceCommandCompleted", onVoiceCommandCompleted);

            voiceServiceConnection.getVoiceCommandAsync().then(function completed(voiceCommand) {

                switch (voiceCommand.commandName) {
                    case "showproducts":
                        showProducts();
                        break;
                    default:
                        // launch app.
                }


            });
        }
    }
    function showProgressScreen(progressMessage) {
        /// <summary>Send a message to Cortana to show as a progress screen. This gives a background
        /// task 5 seconds before Cortana will time it out. Progress screens can be re-sent periodically
        /// to handle long-running operations (such as lengthy network queries with multiple query/responses)
        /// </summary>
        /// <param type="string" name="progressMessage">The message to display.</param>

        var userProgressMessage = new voiceCommands.VoiceCommandUserMessage();
        
        userProgressMessage.DisplayMessage = progressMessage;
        userProgressMessage.SpokenMessage = progressMessage;

        var response = voiceCommands.VoiceCommandResponse.createResponse(userProgressMessage);
        return voiceServiceConnection.reportProgressAsync(response);
    }

    function GetImageUrl(uri)
    {
        return new Windows.Foundation.Uri(uri);
    }
    function showProducts() {               
        var installFolder = Windows.ApplicationModel.Package.current.installedLocation;
        var image = null;
        var image1 = null;
             
        //GetImageUrl("ms-appx:///images/licai2801401.png");
        showProgressScreen("正在查询......").then(function () {
            var imageUri = new Windows.Foundation.Uri("ms-appx:///images/licai2801401.png");
            return Windows.Storage.StorageFile.getFileFromApplicationUriAsync(imageUri)
        })
        .then(function (imageUrl) {
            image = imageUrl;
        }).then(function () {
            var imageUri1 = new Windows.Foundation.Uri("ms-appx:///images/licai2801402.png");
            return Windows.Storage.StorageFile.getFileFromApplicationUriAsync(imageUri1);
        }).then(function (imageUri) {
            image1 = imageUri
        }).then(function () {
            var userMessage = new voiceCommands.VoiceCommandUserMessage();
            userMessage.displayMessage = "以下是为你推荐的理财产品";
            userMessage.spokenMessage = "以下是为你推荐的理财产品";
            var userMessageRepeat = new voiceCommands.VoiceCommandUserMessage();
            userMessageRepeat.displayMessage = "请选择理财产品";
            userMessageRepeat.spokenMessage = "请选择理财产品";

            var titles = [];

            var title2 = new voiceCommands.VoiceCommandContentTile();

            title2.contentTileType = voiceCommands.VoiceCommandContentTileType.titleWith280x140IconAndText;
            title2.image = image;
            title2.appLaunchArgument = "baijin";
            title2.title = "再升套卡系列";
            title2.textLine1 = "赚出大生意";
            title2.textLine2 = "刷出新幸福";
            titles.push(title2);

            var title1 = new voiceCommands.VoiceCommandContentTile();

            title1.contentTileType = voiceCommands.VoiceCommandContentTileType.titleWith280x140IconAndText;
            title1.image = image1;
            title1.appLaunchArgument = "zuanshi";
            title1.title = "小微贷";
            title1.textLine1 = "手续简化，手机办理";
            title1.textLine2 = "实时审批，当天放款";
            titles.push(title1);
            var response = voiceCommands.VoiceCommandResponse.createResponseForPrompt(
                    userMessage,
                    userMessageRepeat,
                    titles);
                return voiceServiceConnection.requestDisambiguationAsync(response)
            .then(function (voiceCommandDisambiguationResult) {
                if (voiceCommandDisambiguationResult != null) {
                    var selectedTile = voiceCommandDisambiguationResult.selectedItem;
                    var userComfirmMessage = new voiceCommands.VoiceCommandUserMessage();
                    userComfirmMessage.displayMessage = "你选择了" + selectedTile.title + "。";
                    userComfirmMessage.spokenMessage = "你选择了" + selectedTile.title + "。";
                    var productsresponse = voiceCommands.VoiceCommandResponse.createResponse(userComfirmMessage);
                    return voiceServiceConnection.reportSuccessAsync(productsresponse);
                }
            })
        }).done();
    }  
    // Start processing the background task.
    doWork();

})();