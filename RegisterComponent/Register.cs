using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Data.Xml.Dom;
using Windows.Storage;
using Windows.UI.Notifications;
using Windows.ApplicationModel.Background;

namespace RegisterComponent
{
    [Windows.Foundation.Metadata.AllowForWeb]
    public sealed class Register
    {
        private const string TASK_NAME = "TileService";
        private const string TASK_ENTRY = "TileService.BackgroundTask.cs";
        public Register()
        {

        }
        public async void registerBackgroundTask()
        {
            try
            {
                var result = await BackgroundExecutionManager.RequestAccessAsync();
                if (result == BackgroundAccessStatus.AllowedMayUseActiveRealTimeConnectivity ||
                    result == BackgroundAccessStatus.AllowedWithAlwaysOnRealTimeConnectivity)
                {
                    foreach (var task in BackgroundTaskRegistration.AllTasks)
                    {
                        if (task.Value.Name == TASK_NAME)
                            task.Value.Unregister(true);
                    }

                    BackgroundTaskBuilder builder = new BackgroundTaskBuilder();
                    builder.Name = TASK_NAME;
                    builder.TaskEntryPoint = TASK_ENTRY;
                    builder.SetTrigger(new TimeTrigger(15, false));
                    var registration = builder.Register();
                }
                for (int i = 0; i < 5; i++)
                {
                    Uri u = new Uri("ms-appx:///tile/TileTemplate" + new Random().Next(1, 3).ToString() + ".xml");
                    StorageFile xmlFile = await StorageFile.GetFileFromApplicationUriAsync(u);
                    XmlDocument doc = await XmlDocument.LoadFromFileAsync(xmlFile);
                    TileNotification notifi = new TileNotification(doc);
                    TileUpdater udt = TileUpdateManager.CreateTileUpdaterForApplication();
                    udt.Update(notifi);
                }
            }
            catch(Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
        }
    }
}
