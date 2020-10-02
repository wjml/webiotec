/*!
 * SlickNav Responsive Mobile Menu v1.0.4
 * (c) 2015 Josh Cope
 * licensed under MIT
 */
!function($,document,window){var defaults={label:"MENU",duplicate:!0,duration:200,easingOpen:"swing",easingClose:"swing",closedSymbol:"&#9658;",openedSymbol:"&#9660;",prependTo:"body",parentTag:"a",closeOnClick:!1,allowParentLinks:!1,nestedParentLinks:!0,showChildren:!1,removeIds:!1,removeClasses:!1,brand:"",init:function(){},beforeOpen:function(){},beforeClose:function(){},afterOpen:function(){},afterClose:function(){}},mobileMenu="slicknav",prefix="slicknav";function Plugin(element,options){this.element=element,this.settings=$.extend({},defaults,options),this._defaults=defaults,this._name="slicknav",this.init()}Plugin.prototype.init=function(){var $this=this,menu=$(this.element),settings=this.settings,iconClass,menuBar;if(settings.duplicate?($this.mobileNav=menu.clone(),$this.mobileNav.removeAttr("id"),$this.mobileNav.find("*").each((function(i,e){$(e).removeAttr("id")}))):($this.mobileNav=menu,$this.mobileNav.removeAttr("id"),$this.mobileNav.find("*").each((function(i,e){$(e).removeAttr("id")}))),settings.removeClasses&&($this.mobileNav.removeAttr("class"),$this.mobileNav.find("*").each((function(i,e){$(e).removeAttr("class")}))),iconClass=prefix+"_icon",""===settings.label&&(iconClass+=" slicknav_no-text"),"a"==settings.parentTag&&(settings.parentTag='a href="#"'),$this.mobileNav.attr("class",prefix+"_nav"),menuBar=$('<div class="slicknav_menu"></div>'),""!==settings.brand){var brand=$('<div class="slicknav_brand">'+settings.brand+"</div>");$(menuBar).append(brand)}$this.btn=$(["<"+settings.parentTag+' aria-haspopup="true" tabindex="0" class="'+prefix+"_btn "+prefix+'_collapsed">','<span class="slicknav_menutxt">'+settings.label+"</span>",'<span class="'+iconClass+'">','<span class="slicknav_icon-bar"></span>','<span class="slicknav_icon-bar"></span>','<span class="slicknav_icon-bar"></span>',"</span>","</"+settings.parentTag+">"].join("")),$(menuBar).append($this.btn),$(settings.prependTo).prepend(menuBar),menuBar.append($this.mobileNav);var items=$this.mobileNav.find("li");$(items).each((function(){var item=$(this),data={};if(data.children=item.children("ul").attr("role","menu"),item.data("menu",data),data.children.length>0){var a=item.contents(),containsAnchor=!1,nodes=[];$(a).each((function(){if($(this).is("ul"))return!1;nodes.push(this),$(this).is("a")&&(containsAnchor=!0)}));var wrapElement=$("<"+settings.parentTag+' role="menuitem" aria-haspopup="true" tabindex="-1" class="'+prefix+'_item"/>'),$wrap;if(settings.allowParentLinks&&!settings.nestedParentLinks&&containsAnchor)$(nodes).wrapAll('<span class="slicknav_parent-link slicknav_row"/>').parent();else $(nodes).wrapAll(wrapElement).parent().addClass(prefix+"_row");settings.showChildren?item.addClass(prefix+"_open"):item.addClass(prefix+"_collapsed"),item.addClass(prefix+"_parent");var arrowElement=$('<span class="slicknav_arrow">'+(settings.showChildren?settings.openedSymbol:settings.closedSymbol)+"</span>");settings.allowParentLinks&&!settings.nestedParentLinks&&containsAnchor&&(arrowElement=arrowElement.wrap(wrapElement).parent()),$(nodes).last().after(arrowElement)}else 0===item.children().length&&item.addClass(prefix+"_txtnode");item.children("a").attr("role","menuitem").click((function(event){settings.closeOnClick&&!$(event.target).parent().closest("li").hasClass(prefix+"_parent")&&$($this.btn).click()})),settings.closeOnClick&&settings.allowParentLinks&&(item.children("a").children("a").click((function(event){$($this.btn).click()})),item.find(".slicknav_parent-link a:not(.slicknav_item)").click((function(event){$($this.btn).click()})))})),$(items).each((function(){var data=$(this).data("menu");settings.showChildren||$this._visibilityToggle(data.children,null,!1,null,!0)})),$this._visibilityToggle($this.mobileNav,null,!1,"init",!0),$this.mobileNav.attr("role","menu"),$(document).mousedown((function(){$this._outlines(!1)})),$(document).keyup((function(){$this._outlines(!0)})),$($this.btn).click((function(e){e.preventDefault(),$this._menuToggle()})),$this.mobileNav.on("click",".slicknav_item",(function(e){e.preventDefault(),$this._itemClick($(this))})),$($this.btn).keydown((function(e){var ev;13==(e||event).keyCode&&(e.preventDefault(),$this._menuToggle())})),$this.mobileNav.on("keydown",".slicknav_item",(function(e){var ev;13==(e||event).keyCode&&(e.preventDefault(),$this._itemClick($(e.target)))})),settings.allowParentLinks&&settings.nestedParentLinks&&$(".slicknav_item a").click((function(e){e.stopImmediatePropagation()}))},Plugin.prototype._menuToggle=function(el){var $this=this,btn=this.btn,mobileNav=this.mobileNav;btn.hasClass(prefix+"_collapsed")?(btn.removeClass(prefix+"_collapsed"),btn.addClass(prefix+"_open")):(btn.removeClass(prefix+"_open"),btn.addClass(prefix+"_collapsed")),btn.addClass(prefix+"_animating"),this._visibilityToggle(mobileNav,btn.parent(),!0,btn)},Plugin.prototype._itemClick=function(el){var $this=this,settings=this.settings,data=el.data("menu");data||((data={}).arrow=el.children(".slicknav_arrow"),data.ul=el.next("ul"),data.parent=el.parent(),data.parent.hasClass(prefix+"_parent-link")&&(data.parent=el.parent().parent(),data.ul=el.parent().next("ul")),el.data("menu",data)),data.parent.hasClass(prefix+"_collapsed")?(data.arrow.html(settings.openedSymbol),data.parent.removeClass(prefix+"_collapsed"),data.parent.addClass(prefix+"_open"),data.parent.addClass(prefix+"_animating"),this._visibilityToggle(data.ul,data.parent,!0,el)):(data.arrow.html(settings.closedSymbol),data.parent.addClass(prefix+"_collapsed"),data.parent.removeClass(prefix+"_open"),data.parent.addClass(prefix+"_animating"),this._visibilityToggle(data.ul,data.parent,!0,el))},Plugin.prototype._visibilityToggle=function(el,parent,animate,trigger,init){var $this=this,settings=$this.settings,items=$this._getActionItems(el),duration=0;animate&&(duration=settings.duration),el.hasClass(prefix+"_hidden")?(el.removeClass(prefix+"_hidden"),init||settings.beforeOpen(trigger),el.slideDown(duration,settings.easingOpen,(function(){$(trigger).removeClass(prefix+"_animating"),$(parent).removeClass(prefix+"_animating"),init||settings.afterOpen(trigger)})),el.attr("aria-hidden","false"),items.attr("tabindex","0"),$this._setVisAttr(el,!1)):(el.addClass(prefix+"_hidden"),init||settings.beforeClose(trigger),el.slideUp(duration,this.settings.easingClose,(function(){el.attr("aria-hidden","true"),items.attr("tabindex","-1"),$this._setVisAttr(el,!0),el.hide(),$(trigger).removeClass(prefix+"_animating"),$(parent).removeClass(prefix+"_animating"),init?"init"==trigger&&settings.init():settings.afterClose(trigger)})))},Plugin.prototype._setVisAttr=function(el,hidden){var $this=this,nonHidden=el.children("li").children("ul").not(".slicknav_hidden");hidden?nonHidden.each((function(){var ul=$(this),items;ul.attr("aria-hidden","true"),$this._getActionItems(ul).attr("tabindex","-1"),$this._setVisAttr(ul,hidden)})):nonHidden.each((function(){var ul=$(this),items;ul.attr("aria-hidden","false"),$this._getActionItems(ul).attr("tabindex","0"),$this._setVisAttr(ul,hidden)}))},Plugin.prototype._getActionItems=function(el){var data=el.data("menu");if(!data){data={};var items=el.children("li"),anchors=items.find("a");data.links=anchors.add(items.find(".slicknav_item")),el.data("menu",data)}return data.links},Plugin.prototype._outlines=function(state){state?$(".slicknav_item, .slicknav_btn").css("outline",""):$(".slicknav_item, .slicknav_btn").css("outline","none")},Plugin.prototype.toggle=function(){var $this=this;this._menuToggle()},Plugin.prototype.open=function(){var $this=this;this.btn.hasClass(prefix+"_collapsed")&&this._menuToggle()},Plugin.prototype.close=function(){var $this=this;this.btn.hasClass(prefix+"_open")&&this._menuToggle()},$.fn.slicknav=function(options){var args=arguments,returns;return void 0===options||"object"==typeof options?this.each((function(){$.data(this,"plugin_slicknav")||$.data(this,"plugin_slicknav",new Plugin(this,options))})):"string"==typeof options&&"_"!==options[0]&&"init"!==options?(this.each((function(){var instance=$.data(this,"plugin_slicknav");instance instanceof Plugin&&"function"==typeof instance[options]&&(returns=instance[options].apply(instance,Array.prototype.slice.call(args,1)))})),void 0!==returns?returns:this):void 0}}(jQuery,document,window);