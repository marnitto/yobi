/**
 * @(#)yobi.board.View.js 2013.03.11
 *
 * Copyright NHN Corporation.
 * Released under the MIT license
 * 
 * http://yobi.dev.naver.com/license
 */

(function(ns){
	
	var oNS = $yobi.createNamespace(ns);
	oNS.container[oNS.name] = function(htOptions){
		
		var htVar = {};
		var htElement = {};

		/**
		 * initialize
		 * @param {Hash Table} htOptions
		 */
		function _init(htOptions){
			_initVar(htOptions || {});
			_initElement(htOptions || {});
            _attachEvent();

			_initFileUploader();
			_initFileDownloader();
		}

		/**
		 * initialize variables except HTML Element
		 */
		function _initVar(htOptions){
			htVar.sTplFileItem = $('#tplAttachedFile').text();
			htVar.sAction = htOptions.sAction;
            htVar.sWatchUrl = htOptions.sWatchUrl;
            htVar.sUnwatchUrl = htOptions.sUnwatchUrl;
		}
		
		/**
		 * initialize HTML Element variables
		 */
		function _initElement(htOptions){
			htElement.welUploader = $("#upload");
			htElement.welTextarea = $("#comment-editor");
			
			htElement.welAttachments = $(".attachments");			
            htElement.welBtnWatch = $('#watch-button');
		}

        /**
         * attach event handler
         */
        function _attachEvent(){
            htElement.welBtnWatch.click(function(weEvt) {
                var welTarget = $(weEvt.target);
                var bWatched = welTarget.hasClass("active");

                $yobi.sendForm({
                    "sURL": bWatched ? htVar.sUnwatchUrl : htVar.sWatchUrl,
                    "fOnLoad": function(){
                        welTarget.toggleClass("active");
                    }
                });
            });
        }

		/**
		 * initialize fileUploader
		 */
		function _initFileUploader(){
		    yobi.FileUploader.init({
				"elContainer" : htElement.welUploader,
				"elTextarea"  : htElement.welTextarea,
				"sTplFileItem": htVar.sTplFileItem,
				"sAction": htVar.sAction
			});
		}
		
		/**
		 * initialize fileDownloader
		 */
		function _initFileDownloader(){
			htElement.welAttachments.each(function(n, el){
				fileDownloader($(el), htVar.sAction);
			});
		}
        
        _init(htOptions);
	};
	
})("yobi.board.View");
