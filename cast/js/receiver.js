const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

/** LOAD interceptor **/
playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    request => {
        request.media.contentId = "https://storage.googleapis.com/tse-summit.appspot.com/hls/bbb/bbb.m3u8";
        request.media.contentType = 'application/x-mpegurl';
        addVASTBreaksToMedia(request.media);
        return request;
    });

const breakClipUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const addVASTBreaksToMedia = (mediaInformation) => {
    mediaInformation.breakClips = [
        {
            id: "bc1",
            title: "bc1 (Pre-roll)",
            contentUrl: breakClipUrl,
            whenSkippable: 5
        },
        {
            id: "bc2",
            title: "bc2 (Mid-roll)",
            contentUrl: breakClipUrl,
            whenSkippable: 5
        }
    ];
    mediaInformation.breaks = [
        {
            id: "b1",
            breakClipIds: ["bc1"],
            position: 0
        },
        {
            id: "b2",
            breakClipIds: ["bc2"],
            position: 15
        }
    ];
};


const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
castDebugLogger.setEnabled(true);
playerManager.addEventListener(
    cast.framework.events.category.CORE,
    ev => {
        castDebugLogger.info('EVENT.CORE', ev);
    });
castDebugLogger.loggerLevelByTags = {
    'EVENT.CORE': cast.framework.LoggerLevel.DEBUG,
    'MyAPP.LOG': cast.framework.LoggerLevel.WARNING
};

if (context.start() != null) {
    let loadRequestData = new cast.framework.messages.LoadRequestData();
    loadRequestData.autoplay = true;
    playerManager.load(loadRequestData);
}
