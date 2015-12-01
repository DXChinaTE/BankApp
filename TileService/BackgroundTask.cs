using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Data.Xml.Dom;
using Windows.Storage;
using Windows.UI.Notifications;

namespace TileService
{
    /// <summary>
    /// tile backgroundtask
    /// </summary>
    public sealed class BackgroundTask : IBackgroundTask
    {
        public async void Run(IBackgroundTaskInstance taskInstance)
        {
            var defferal = taskInstance.GetDeferral();
            //read random xml to make the tile backgroundtask
            int biaoji = new Random().Next(1, 4);
            Uri u = new Uri("ms-appx:///tile/TileTemplate"+biaoji.ToString()+".xml");
            StorageFile xmlFile = await StorageFile.GetFileFromApplicationUriAsync(u);
            XmlDocument doc = await XmlDocument.LoadFromFileAsync(xmlFile); 

            for (int i = 1; i < 5; i++)
            {
                TileNotification notifi = new TileNotification(doc);

                var updater = TileUpdateManager.CreateTileUpdaterForApplication();
                updater.EnableNotificationQueue(true);

                updater.Clear();

                updater.Update(notifi);
            }

            defferal.Complete();
        }

    }
}
