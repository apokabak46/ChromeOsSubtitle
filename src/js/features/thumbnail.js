(function() {
    var thumbnailVideo = $('<video>'),
        canvas = $('<canvas>'),
        ctx = canvas.get(0).getContext('2d');
    
    MediaElementPlayer.prototype.thumbnail = function() {
        var timefloat = this.rail.find('.mejs-time-float');
        
        canvas.attr({ 'width': 121 });
        canvas.attr({ 'height': 96 });
        
        canvas.appendTo(timefloat);
        canvas.insertBefore(timefloat.find('.mejs-time-float-current'));
        
        thumbnailVideo.on('seeked', function() {
            ctx.drawImage(thumbnailVideo.get(0), 0, 0, canvas.attr('width'), canvas.attr('height'));
        });
    };
    
    MediaElementPlayer.prototype.setThumbnailSrc = function(src) {
        ctx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
        thumbnailVideo.attr({ 'src': src });
    };
    
    MediaElementPlayer.prototype.paintThumbnail = mejs.Utility.deBounce(function(time) {
        thumbnailVideo.attr({ 'currentTime': time });
    }, 100);
})();