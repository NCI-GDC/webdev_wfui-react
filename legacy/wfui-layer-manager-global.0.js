(function($) {

    /**
     * Singleton layerManager instance
     * @type {LayerManager}
     */
    WFUIJS.LayerManager.global = new WFUIJS.LayerManager();

    $(document).on('keydown', function(e) {
        if (e.keyCode === WFUIJS.keyCode.ESCAPE) {
            var $popped = WFUIJS.LayerManager.global.popTop();
            if ($popped) {
                e.preventDefault();
            }
        }
    }).on('click', '.wfui-blanket', function(e) {
        var $popped = WFUIJS.LayerManager.global.popUntilTopBlanketed();
        if ($popped) {
            e.preventDefault();
        }
    });


}(WFUIJS.$));