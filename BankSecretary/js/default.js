var wap = Windows.ApplicationModel.Package;
var voiceCommandManager = Windows.ApplicationModel.VoiceCommands.VoiceCommandDefinitionManager;

(function () {
    "use strict";

    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var activationKinds = Windows.ApplicationModel.Activation.ActivationKind;
  
    function activated(eventObject) {      
        var activationKind = eventObject.detail.kind;
        var activatedEventArgs = eventObject.detail.detail;

        WinJS.Utilities.startLog();

        var p = WinJS.UI.processAll().
            then(function () {
                    var file = wap.current.installedLocation.getFileAsync("voicecommands.xml")
                .then(function (file) {
                    return voiceCommandManager.installCommandDefinitionsFromStorageFileAsync(file);
                }).done(function () {                 
                    if (activationKind == Windows.ApplicationModel.Activation.ActivationKind.protocol) {
                        
                    } else if (activationKind == Windows.ApplicationModel.Activation.ActivationKind.voiceCommand) {                       
                        var speechRecognitionResult = activatedEventArgs[0].result;
                        var voiceCommandName = speechRecognitionResult.rulePath[0];
                        var destination = "";
                        switch (voiceCommandName) {
                            case "showproducts":
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        var webview = document.getElementById('webview');
                        webview.style.height = '100%';
                        webview.style.width = '100%';
                        var communicationWinRT = new RegisterComponent.Register();
                        communicationWinRT.registerBackgroundTask();
                        webview.navigate("ms-appx-web:///home.html");
                    }                    
                }, function (e) {
                    WinJS.log && WinJS.log("Failed to load VCD", e.message, "error");
                });

            });
    
        p.done();      
        eventObject.setPromise(p);
    }




    function navigating(eventObject) {
        var url = eventObject.detail.location;
        var host = document.getElementById("contentHost");      
        if (host.winControl) {
            host.winControl.unload && host.winControl.unload();
            host.winControl.dispose && host.winControl.dispose();
        }
        WinJS.Utilities.disposeSubTree(host);
        WinJS.Utilities.empty(host);
        WinJS.log && WinJS.log("", "", "status");

        var p = WinJS.UI.Pages.render(url, host, eventObject.detail.state).
            then(function () {
                var navHistory = nav.history;
                app.sessionState.navigationHistory = {
                    backStack: navHistory.backStack.slice(0),
                    forwardStack: navHistory.forwardStack.slice(0),
                    current: navHistory.current
                };
                app.sessionState.lastUrl = url;
            });
        p.done();
        eventObject.detail.setPromise(p);
    }

    nav.addEventListener("navigating", navigating);
    app.addEventListener("activated", activated, false);
    app.start();
})();
