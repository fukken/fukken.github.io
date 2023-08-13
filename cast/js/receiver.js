const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// const vmapUrl = "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&cmsid=496&vid=short_onecue&correlator=" + Math.floor(Math.random() * Math.pow(10, 10));
const breakManager = playerManager.getBreakManager();

/** LOAD interceptor **/
playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    request => {
        castDebugLogger.info('MyAPP.LOG', 'Intercepting LOAD request');

        // Adjusting request to make requested content playable
        request.media.contentId = "https://storage.googleapis.com/tse-summit.appspot.com/hls/bbb/bbb.m3u8";
        request.media.contentType = 'application/x-mpegurl';
        castDebugLogger.warn('MyAPP.LOG', 'Playable URL: ' + request.media.contentId);

        // request.media.vmapAdsRequest = {
        //     adTagUrl: vmapUrl,
        // };

        addVASTBreaksToMedia(request.media);

        request.currentTime = 10;

        return request;
    });

breakManager.setBreakClipLoadInterceptor((breakClip, breakCtx) => {
    breakClip.whenSkippable = 5;
    return breakClip;
});

breakManager.setBreakSeekInterceptor(function(breakSeekData) {
    /**
     *
     * Below code will play an unwatched break between seekFrom and seekTo position
     * Note: If the position of a break is less than 30 then it will be skipped due to the setBreakClipLoadInterceptor code
     */
    
    let breakToPlay;
    for (let i = 0; i < breakSeekData.breaks.length; i++) {
        if (!breakSeekData.breaks[i].isWatched) {
            breakToPlay = breakSeekData.breaks[i];
        }
    }
    if (breakToPlay){
        breakSeekData.breaks = [breakToPlay];
        return breakSeekData;
    }
});


const addVASTBreaksToMedia = (mediaInformation) => {
    mediaInformation.breakClips = [
        {
            id: "bc1",
            title: "bc1 (Pre-roll)",
            vastAdsRequest: {
                adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&url=&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&pod=1&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&correlator=' + Math.floor(Math.random() * Math.pow(10, 10)) + '&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0'
            }
        },
        {
            id: "bc2",
            title: "bc2 (Mid-roll)",
            vastAdsRequest: {
                adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&url=&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&cue=15000&vad_type=linear&vpos=midroll&pod=2&mridx=1&rmridx=1&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&correlator=' + Math.floor(Math.random() * Math.pow(10, 10)) + '&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0'
            }
        },
        {
            id: "bc3",
            title: "bc3 (Mid-roll)",
            vastAdsRequest: {
                adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&url=&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&cue=15000&vad_type=linear&vpos=midroll&pod=2&mridx=1&rmridx=1&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&correlator=' + Math.floor(Math.random() * Math.pow(10, 10)) + '&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0'
            }
        },
        {
            id: "bc4",
            title: "bc4 (Mid-roll)",
            vastAdsRequest: {
                adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&url=&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&cue=15000&vad_type=linear&vpos=midroll&pod=2&mridx=1&rmridx=1&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&correlator=' + Math.floor(Math.random() * Math.pow(10, 10)) + '&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0'
            }
        },
        {
            id: "bc5",
            title: "bc5 (Mid-roll)",
            vastAdsRequest: {
                adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&url=&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&cue=15000&vad_type=linear&vpos=midroll&pod=2&mridx=1&rmridx=1&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&correlator=' + Math.floor(Math.random() * Math.pow(10, 10)) + '&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0'
            }
        },
        {
            id: "bc6",
            title: "bc6 (Post-roll)",
            vastAdsRequest: {
                adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpost&url=&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=postroll&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&correlator=' + Math.floor(Math.random() * Math.pow(10, 10)) + '&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0'
            }
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
        },
        {
            id: "b3",
            breakClipIds: ["bc3","bc4"],
            position: 60
        },
        {
            id: "b4",
            breakClipIds: ["bc5"],
            position: 100
        },
        {
            id: "b5",
            breakClipIds: ["bc6"],
            position: -1
        }
    ];
};


/** Debug Logger **/
const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

// Enable debug logger and show a warning on receiver
// NOTE: make sure it is disabled on production
castDebugLogger.setEnabled(true);

playerManager.addEventListener(
    cast.framework.events.category.CORE,
    event => {
        castDebugLogger.info('EVENT.CORE', event);
    });

// Set verbosity level for custom tags
castDebugLogger.loggerLevelByTags = {
    'EVENT.CORE': cast.framework.LoggerLevel.DEBUG,
    'MyAPP.LOG': cast.framework.LoggerLevel.WARNING
};



if (context.start() != null) {
    let loadRequestData = new cast.framework.messages.LoadRequestData();
    loadRequestData.autoplay = true;
    playerManager.load(loadRequestData);
}