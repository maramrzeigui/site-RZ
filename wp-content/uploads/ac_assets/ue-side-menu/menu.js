
function UCSideMenu(menuWrapperID, urlAjax){
  
  var g_menuWrapper, g_menuID, g_objButtonToggle, g_objInputBox, g_isCloseOnOpen, g_isClickable, g_isOpenOnLoad;
  var g_pushOnOpen, g_pushOnOpenMobile, g_lastBodyPadding;
  var g_startExpanded;
  var g_dataLinkNum;
  var g_dataSpeed;
  var g_menuOpenedClass;
  
  //add support to swiper container
  function pushSwipers(num){
    
    var objSwipers = jQuery(".swiper-container");
    
    objSwipers.each(function(){
      
      var objSwiper = jQuery(this);
      
      objSwiper.css("transform", "translate("+num+"px, 0)");
      
    });
    
  }
  
  function releaseSwipers(){
    
    var objSwipers = jQuery(".swiper-container");
    
    objSwipers.each(function(){
      
      var objSwiper = jQuery(this);
      
      objSwiper.css("transform", "");
    });
    
  }
  
  function openNav() {
    
    var objBody = jQuery("body");
    var menuWidth = g_menuWrapper.width();
    
    objBody.addClass(g_menuOpenedClass);   
    
    if ( g_menuWrapper.hasClass("menu-right-close")) {
      
      function pushContentToLeft(){
        objBody.addClass("uc-menu-push");
        objBody.css("padding-right",menuWidth+"px");
        
        pushSwipers(-menuWidth);
        
      }
      
      g_menuWrapper.removeClass("menu-right-close");
      g_menuWrapper.addClass("menu-right-open");
      
      if(window.matchMedia("(min-width: 420px)").matches && g_pushOnOpen == true){
        pushContentToLeft();
      }
      
      if(window.matchMedia("(max-width: 420px)").matches && g_pushOnOpenMobile == true){
        pushContentToLeft();
      }
      
      g_lastBodyPadding = objBody.css("padding-right");
      
    } else if (g_menuWrapper.hasClass("menu-left-close")) {
      
      function pushContentToRight(){
        objBody.addClass("uc-menu-push");
        objBody.css("padding-left",menuWidth+"px");
        
        pushSwipers(menuWidth);
        
      }
      
      g_menuWrapper.removeClass("menu-left-close");
      g_menuWrapper.addClass("menu-left-open");			
      
      if(window.matchMedia("(min-width: 420px)").matches && g_pushOnOpen == true){
        pushContentToRight();
      }
      
      if(window.matchMedia("(max-width: 420px)").matches && g_pushOnOpenMobile == true){
        pushContentToRight();
      }
      
      g_lastBodyPadding = objBody.css("padding-left");
      
    }
    
    g_objButtonToggle.addClass("uc-close-action");
    
  }
  
  /**
  * close the menu
  */
  function closeNav() {
    
    g_objButtonToggle.removeClass("uc-close-action");
    
    checkUrlAndSelectActive();
    
    var objBody = jQuery("body");
    objBody.removeClass(g_menuOpenedClass);
    
    if (g_menuWrapper.hasClass("menu-left-open")) {
      
      function lastBodyPaddingLeft() {
        
        setTimeout(function(){
          objBody.removeClass("uc-menu-push");
        },g_dataSpeed*1000);
        
        objBody.css("padding-left", '');
        
        releaseSwipers();
        
      }
      
      g_menuWrapper.toggleClass("menu-left-close");
      
      if(window.matchMedia("(min-width: 420px)").matches && g_pushOnOpen == true) {
        lastBodyPaddingLeft();
      }
      
      if(window.matchMedia("(max-width: 420px)").matches && g_pushOnOpenMobile == true) {
        lastBodyPaddingLeft();
      }
      
    } else if (g_menuWrapper.hasClass("menu-right-open")) {
      
      function lastBodyPaddingRight() {
        
        setTimeout(function(){
          objBody.removeClass("uc-menu-push");
        },g_dataSpeed*1000)
        
        objBody.css("padding-right", '');
        
        releaseSwipers();
        
      }
      
      g_menuWrapper.toggleClass("menu-right-close");
      
      if(window.matchMedia("(min-width: 420px)").matches && g_pushOnOpen == true){
        lastBodyPaddingRight();
      }
      
      if(window.matchMedia("(max-width: 420px)").matches && g_pushOnOpenMobile == true) {
        lastBodyPaddingRight();
      }
      
    }
    
    
  }
  
  
  function isMenuClosed(){
    
    var isClose = g_objButtonToggle.hasClass("uc-close-action");
    
    return(!isClose);
  }
  
  function onButtonToggleClick(){
    
    var isClose = g_objButtonToggle.hasClass("uc-close-action");
    
    if(isClose == true)
    closeNav();
    else
    openNav();
    
  }
  
  /**
  * collapse inner section
  */
  function collapseInnerSection(element){
    
    var sectionHeight = element.scrollHeight;
    
    var elementTransition = element.style.transition;
    element.style.transition = '';
    
    requestAnimationFrame(function() {
      
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      
      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
      
    });
    
    element.setAttribute('data-collapsed', 'true');
  }
  
  /**
  * expand the inner of the section
  */
  function expandSectionInner(element){
    
    var sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';
    
    element.addEventListener('transitionend', function(e) {
      element.removeEventListener('transitionend', arguments.callee);
      element.style.height = null;
    });
    element.setAttribute('data-collapsed', 'false');
  }
  
  /**
  * expand section
  */
  function expandSection(section, objLink){
    
    expandSectionInner(section);
    
    section.setAttribute('data-collapsed', 'false')
    objLink.removeClass("collapsed");
    objLink.addClass("expanded");
    
  }
  
  /**
  * collapse the section
  */
  function collapseSection(section, objLink){
    
    collapseInnerSection(section);
    
    objLink.addClass("collapsed");
    objLink.removeClass("expanded");
  }
  
  /**
  * collapse all expanded sections
  */
  function collapseAllExpanded(clickedItem){
    
    var clickedParentExpanded = jQuery(clickedItem).parents('.sub-menu').prev();    
    var clickedChildrenExpanded = jQuery(clickedItem).next().find('.expanded');   
    
    var objAllExpanded = g_menuWrapper.find(".expanded").not(clickedChildrenExpanded).not(clickedParentExpanded);
    
    if(objAllExpanded.length == false)
    return(false);
    
    jQuery.each(objAllExpanded, function(index, link){
      var objLink = jQuery(link);
      var section = link.nextElementSibling;
      
      collapseSection(section, objLink);
      
    });
  }
  
  /**
  * close or open link
  */
  function toggleSection(objLink){
    
    var link = objLink[0];
    var section = link.nextElementSibling;
    
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
    
    if (isCollapsed) {		//expend current
      
      if(g_isCloseOnOpen == true)
      collapseAllExpanded(link);
      
      expandSection(section, objLink);
      
    } else {		//collapse current
      
      collapseSection(section,objLink);
    }
    
  }
  
  /**
  * toggle menu item icon
  */
  function menuItemIconToggle(link){
    
    var objWrapper = jQuery("#"+menuWrapperID);
    
    //add icons to pointer elements
    var pointerSelector = ".uc-menu-item-pointer";
    
    var objPointer = jQuery(link).find(pointerSelector);
    var objPsrentsMenuItems = jQuery(link).parents(".menu-item-has-children");
    var objParentsPointers = objPsrentsMenuItems.find(pointerSelector);
    var objAllPointers = g_menuWrapper.find(pointerSelector).not(objParentsPointers);
    
    var objExpandedIcon = objWrapper.find(".uc-side-menu-expand-icon");
    var objCollapsedIcon = objWrapper.find(".uc-side-menu-collapse-icon");
    
    if(!objExpandedIcon.length || !objCollapsedIcon)
    return(false);
    
    var expandedIconHtml = objExpandedIcon.html();
    var collapsedIconHtml = objCollapsedIcon.html();  
    
    if(jQuery(link).hasClass("collapsed") == true){
      
      objAllPointers.html(expandedIconHtml);
      objPointer.html(expandedIconHtml);
      
    }
    
    if(jQuery(link).hasClass("expanded") == true){
      
      objAllPointers.html(expandedIconHtml);
      objPointer.html(collapsedIconHtml);
      
    }
    
    
  }
  
  /**
  * open or close some item
  */
  function openCloseItem(link, event, isPointer, isOnlyOpen){
    
    var section = link.nextElementSibling;
    
    if(isPointer == true){
      section = jQuery(link).parents("a")[0].nextElementSibling;
    }
    
    if(!section)
    return(true);
    
    var objSection = jQuery(section);
    
    if(objSection.hasClass("sub-menu") == false)
    return(true);
    
    if(event)
    event.preventDefault();
    
    var objLink = jQuery(link);
    
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
    
    
    if(isCollapsed == true && isOnlyOpen == true){
      
      expandSection(section, objLink);
      
      return(true);
      
    }
    
    
    
    if (isCollapsed == true && !isOnlyOpen) {		//expend current
      
      if(g_isCloseOnOpen == true)
      collapseAllExpanded(link);
      
      expandSection(section, objLink);
      
    } else if(isCollapsed == false && !isOnlyOpen) {		//collapse current
      
      collapseSection(section,objLink);
    }
    
    menuItemIconToggle(link);
    
  }
  
  /**
  * if clicked link is an anchor then close nav
  */
  function closeNavOnAnchorLinkClick(objLink, event){
    
    var url = objLink.attr("href");
    url = jQuery.trim(url);
    
    if(!url)
    return(true);
    
    var objLinkIcon = objLink.find('.uc-menu-item-pointer');
    
    if(!objLinkIcon)
    return(true);
    
    var target = event.target;
    
    if(target == objLinkIcon[0])
    return(true);
    
    var objLinkParent = objLink.parent();
    
    if(g_isClickable == false){
      
      if(objLinkParent.hasClass('menu-item-has-children'))
      return(true)
      
      //check if clicked link is an anchor link 
      if (url.indexOf("#") > -1)
      closeNav();
      
    }else{
      
      //check if clicked link is an anchor link
      if (url.indexOf("#") > -1)
      closeNav();
      
    }
    
  }
  
  
  /**
  * on menu item click, if sub menu, open or close
  */
  function onMenuItemClick(event){    
    
    openCloseItem(this,event);
    
    var objLink = jQuery(this);
    
    closeNavOnAnchorLinkClick(objLink, event)
    
  }
  
  /**
  * console log shorcut
  */
  function trace(str){
    
    console.log(str);
  }
  
  /**
  * do search
  */
  function doSearch(){
    
    if(!g_objInputBox)
    return(false);
    
    var searchString = g_objInputBox.val();
    
    searchString = jQuery.trim(searchString);
    
    if(!searchString)
    return(true);
    
    var urlBase = g_objInputBox.data("urlbase");
    var urlSearch = urlBase+"?s="+searchString;
    
    location.href = urlSearch;
    
  }
  
  
  /**
  * on input box key up - if enter clicked - go to search
  */
  function onInputBoxKeyUp(event){
    
    if(event.keyCode !== 13)
    return(true);
    
    doSearch();
  }
  
  /**
  * on menu body click - disable propogation
  */
  function onMenuBodyClick(event){
    
    event.stopPropagation();
  }
  
  /**
  * on body click - close the menu if needed
  */
  function onBodyClick(){
    
    var isClosed = isMenuClosed();
    
    if(isClosed == true)
    return(true);
    
    closeNav();
  }
  
  //on trigger link click
  
  function onLinkClick(e){
    
    var objLink = jQuery(this);
    
    var dataMenuName = g_menuWrapper.data('name');
    var dataLinkName = objLink.data('name');
    
    if(dataLinkName == undefined){
      return(false);
    }
    
    e.preventDefault();
    if(dataLinkName == dataMenuName){
      g_objButtonToggle.trigger("click");
    }else{
      return(false);
    }
  }
  
  /**
  * init open links
  */
  function initLinks(){
    
    var objLinks = jQuery('.ue-link-open-menu').not(".uc-link-inited");
    
    if(objLinks.length == 0){
      return(false);
    }
    
    var elementName = g_menuWrapper.data("name");
    
    jQuery.each(objLinks, function(index, linkElement){
      
      var objLink = jQuery(linkElement);
      
      var name = objLink.data("name");
      
      if(name != elementName)
      return(true);
      
      objLink.addClass("uc-link-inited");
      
      objLink.on("click", onLinkClick);
      
    });
    
    
  }
  
  /*
  * scrolls to elment
  */
  function scrollMenuToElement(elementOffsetTop){	
    
    var objScrollableHolder = jQuery("#"+menuWrapperID).find(".uc-side-menu-items");
    
    //wait untill all transitions are finished
    setTimeout(function(){      
      
      objScrollableHolder.animate({
        scrollTop: elementOffsetTop
      }, 100)
      
    }, 500);
    
  }
  
  /**
  * finds if element is in viewport
  */
  function isElementInViewport(element) {
    
    var elementTop = element.offset().top;
    var elementBottom = elementTop + element.outerHeight();
    
    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + jQuery(window).height();
    
    var isInViwport = elementBottom > viewportTop && elementTop < viewportBottom;
    
    return(isInViwport);
  } 
  
  /*
  * check url and select active item
  */
  function checkUrlAndSelectActive(){
    
    var currentPageClass = "current_page_item";
    
    var objlinks = jQuery("#"+menuWrapperID).find('a');
    
    objlinks.each(function(){
      
      var objLink = jQuery(this);
      var linkHref = objLink.attr("href");
      
      //if link has same link adress as menu item then open menu item
      if(linkHref != urlAjax)
      return(true);
      
      var objMenuListItem = objLink.parents('li');
      
      objlinks.removeClass(currentPageClass);
      objMenuListItem.addClass(currentPageClass);
      
      var objParentLinks = objLink.parents('.sub-menu').prev();
      
      objParentLinks.each(function(index, elem){
        
        var objParentLink = jQuery(this);
        
        if(objParentLink.hasClass("collapsed")){
          
          if(g_isClickable == false){
            
            openCloseItem(objParentLink[0]);            
            
          }
          
          if(g_isClickable == true){
            
            var objPointer = objParentLink.find(".uc-menu-item-pointer");
            
            openCloseItem(objPointer[0], false, true, true);
            
          }
          
        }        
        
      });
      
      //check if item is in viewport and scroll if needed
      objLinkOffsetTop = objLink.offset().top;
      
      if(isElementInViewport(objLink) == false){
        
        scrollMenuToElement(objLinkOffsetTop);
        
      }
      
    });
    
  }
  
  /*
  * open current page menu item
  */
  function checkUrlAndTriggerClick(){
    
    if(g_startExpanded == true)
    return(false);
    
    var currentPageClass = "current_page_item";
    
    var objlinks = jQuery("#"+menuWrapperID).find('a');
    
    objlinks.each(function(){
      
      var objLink = jQuery(this);
      var linkHref = objLink.attr("href");
      
      //if link has same link adress as menu item then open menu item
      if(linkHref != urlAjax)
      return(true);
      
      var objMenuListItem = objLink.parents('li');
      
      objlinks.removeClass(currentPageClass);
      objMenuListItem.addClass(currentPageClass);
      
      
      //check if item is in viewport and scroll if needed
      objLinkOffsetTop = objLink.offset().top;
      
      if(isElementInViewport(objLink) == false){
        
        scrollMenuToElement(objLinkOffsetTop);
        
      }
      
      var objLinkToOpens = objLink.parents('.sub-menu').prev();  
      
      if(g_isClickable == false){
        
        objLinkToOpens.each(function(){
          
          var objLinkToOpen = jQuery(this);
          openCloseItem(objLinkToOpen[0]);
          
        });                
        
      }
      
      if(g_isClickable == true){
        
        objLinkToOpens.each(function(){
          
          var objLinkToOpen = jQuery(this);
          var objPointer = objLinkToOpen.find(".uc-menu-item-pointer");
          
          openCloseItem(objPointer[0], false, true, true);
          
        });
        
      }
      
    });
    
  }
  
  /**
  * check if menu is hidden after resize
  */
  function onWindowResize(){
    
    var isMenuOpened = jQuery("body").hasClass(g_menuOpenedClass);
    
    //only if menu is opened and body has overflow hidden
    if(isMenuOpened == false)
    return(false);
    
    var objParents = g_menuWrapper.parents();
    
    objParents.each(function(){      
      
      var objParent = jQuery(this);
      var isParentVisible = objParent.is(":visible");
      
      if(isParentVisible == true)
      return(true);
      
      closeNav();
      
    });
    
  }
  
  /**
  * collapse inner section after init
  */
  function initCollapsedState(item){
    
    collapseInnerSection(item.nextElementSibling);
    
    jQuery(item).addClass("collapsed");    
    jQuery(item).removeClass("expanded");
    
  }
  
  /**
  * run the menu, init
  */
  function runMenu(){
    
    var objWrapper = jQuery("#"+menuWrapperID);  
    
    g_menuWrapper = objWrapper.find(".uc-side-menu-wrapper");
    g_isClickable = objWrapper.data("clickable");
    g_isCloseOnOpen = objWrapper.data("closeothers");
    
    var isCloseOnBody = objWrapper.data("closeonbody");
    g_isOpenOnLoad = g_menuWrapper.data("openonload");
    
    g_pushOnOpen = objWrapper.data("push");
    g_pushOnOpenMobile = objWrapper.data("push-mobile")
    g_dataSpeed = objWrapper.data("speed");
    
    g_startExpanded = objWrapper.data("expand");
    
    var objButtonClose = g_menuWrapper.find(".uc-close-side-menu");
    
    g_objButtonToggle = objWrapper.find(".open_side_menu");
    
    g_objInputBox = g_menuWrapper.find("input[type='text']");
    
    g_menuID = menuWrapperID;
    
    g_menuOpenedClass = "menu-opened";
    
    
    
    if(g_menuWrapper.length == 0){
      console.log("menu with ID: "+menuWrapperID+" not found!");
      return(false);
    }
    
    if(objButtonClose.length == 0){
      console.log("The close button not found");
      return(false);
    }
    
    if(g_objButtonToggle.length == 0){
      console.log("The trigger button not found");
      return(false);
    }
    
    //collapse or expand all			
    var dataExpandFirst = objWrapper.data("first-expand");

    g_menuWrapper.find("ul.uc-list-menu li a").each((i, item) => {
      
      if(item.nextElementSibling){
        
        var objItem = jQuery(item);
        objItem.append("<span class='uc-menu-item-pointer'></span>");
        
        if(g_startExpanded == false){
          
          //expand first 
          if(dataExpandFirst == true && i != 0)
          initCollapsedState(item);
          else if(dataExpandFirst == false)
          initCollapsedState(item);          
          
        }else{
          
          jQuery(item).removeClass("collapsed");
          jQuery(item).addClass("expanded");
          
        }
        
        //add icons to pointer elements
        menuItemIconToggle(item);
        
      }
      
    });
    
    initLinks();
    
    //init events
    
    if(g_objInputBox.length == 0)
    g_objInputBox = null;
    
    if(g_objInputBox)
    g_objInputBox.on("keyup",onInputBoxKeyUp);
    
    var objButtonSearch = g_menuWrapper.find(".side-menu-search-button-search");
    objButtonSearch.on("click", doSearch);
    
    var objLinks = g_menuWrapper.find("ul.uc-list-menu li a");
    
    if(g_isClickable == false){
      objLinks.on("click", onMenuItemClick);
    }else{
      
      var objPointers = g_menuWrapper.find("ul.uc-list-menu li .uc-menu-item-pointer");
      
      //pointer click - toggle section      
      objPointers.on("click", function(event){
        
        event.preventDefault();
        
        var objLink = jQuery(this);
        var objParentLink = objLink.parent();
        
        toggleSection(objParentLink);
        
        menuItemIconToggle(objParentLink[0]);
        
      });
      
      //close nav if anchor link clicked
      objLinks.on("click", function(event){
        
        var objLink = jQuery(this);
        
        closeNavOnAnchorLinkClick(objLink, event);
        
      });
      
    }
    
    if(dataExpandFirst == false)
    setTimeout(checkUrlAndTriggerClick,500);
    
    objButtonClose.on("click", closeNav);
    
    g_objButtonToggle.on("click", onButtonToggleClick);
    
    if(isCloseOnBody === true){
      
      var objOverlay = g_menuWrapper.find(".ue_side_menu_overlay");
      
      if(objOverlay.length)
      objOverlay.on("click", closeNav);
      else{
        g_menuWrapper.on("click", onBodyClick);
        g_objButtonToggle.on("click", onBodyClick);
        
        jQuery("body").on("click", onBodyClick);
      }			
      
    }
    
    if(g_isOpenOnLoad === true){
      g_objButtonToggle.trigger("click");
    }
    
    jQuery(window).on("resize", onWindowResize);
  }
  
  runMenu();
  
}

