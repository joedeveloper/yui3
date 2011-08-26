YUI.add("autocomplete-list",function(b){var i=b.Lang,v=b.Node,l=b.Array,h=b.UA.ie&&b.UA.ie<7,p=9,s="_CLASS_ITEM",t="_CLASS_ITEM_ACTIVE",d="_CLASS_ITEM_HOVER",u="_SELECTOR_ITEM",f="activeItem",k="alwaysShowList",o="circular",r="hoveredItem",m="id",e="item",c="list",w="result",j="results",q="visible",g="width",n="select",a=b.Base.create("autocompleteList",b.Widget,[b.AutoCompleteBase,b.WidgetPosition,b.WidgetPositionAlign],{ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",initializer:function(){var x=this.get("inputNode");if(!x){b.error("No inputNode specified.");return;}this._inputNode=x;this._listEvents=[];this.DEF_PARENT_NODE=x.get("parentNode");this[s]=this.getClassName(e);this[t]=this.getClassName(e,"active");this[d]=this.getClassName(e,"hover");this[u]="."+this[s];this.publish(n,{defaultFn:this._defSelectFn});},destructor:function(){while(this._listEvents.length){this._listEvents.pop().detach();}},bindUI:function(){this._bindInput();this._bindList();},renderUI:function(){var z=this.get("boundingBox"),y=this.get("contentBox"),B=this._inputNode,A=this._createListNode(),x=B.get("parentNode");B.addClass(this.getClassName("input")).setAttrs({"aria-autocomplete":c,"aria-expanded":false,"aria-owns":A.get("id")});if(h){z.plug(b.Plugin.Shim);}z.setStyle("position","absolute");this._boundingBox=z;this._contentBox=y;this._listNode=A;this._parentNode=x;},syncUI:function(){this._syncResults();this._syncVisibility();},hide:function(){return this.get(k)?this:this.set(q,false);},selectItem:function(y,x){if(y){if(!y.hasClass(this[s])){return this;}}else{y=this.get(f);if(!y){return this;}}this.fire(n,{itemNode:y,originEvent:x||null,result:y.getData(w)});return this;},_activateNextItem:function(){var y=this.get(f),x;if(y){x=y.next(this[u])||(this.get(o)?null:y);}else{x=this._getFirstItemNode();}this.set(f,x);return this;},_activatePrevItem:function(){var y=this.get(f),x=y?y.previous(this[u]):this.get(o)&&this._getLastItemNode();this.set(f,x||null);return this;},_add:function(x){var y=[];l.each(i.isArray(x)?x:[x],function(z){y.push(this._createItemNode(z).setData(w,z));},this);y=b.all(y);this._listNode.append(y.toFrag());return y;},_bindInput:function(){var A=this._inputNode,y,z,x;if(this.get("align")===null){x=this.get("tokenInput");y=(x&&x.get("boundingBox"))||A;this.set("align",{node:y,points:["tl","bl"]});if(!this.get(g)&&(z=y.get("offsetWidth"))){this.set(g,z);}}this._listEvents.push(A.on("blur",this._onListInputBlur,this));},_bindList:function(){this._listEvents.concat([b.on("windowresize",this._syncPosition,this),this.after({mouseover:this._afterMouseOver,mouseout:this._afterMouseOut,activeItemChange:this._afterActiveItemChange,alwaysShowListChange:this._afterAlwaysShowListChange,hoveredItemChange:this._afterHoveredItemChange,resultsChange:this._afterResultsChange,visibleChange:this._afterVisibleChange}),this._listNode.delegate("click",this._onItemClick,this[u],this)]);},_clear:function(){this.set(f,null);this._set(r,null);this._listNode.get("children").remove(true);},_createItemNode:function(x){var y=v.create(this.ITEM_TEMPLATE);return y.addClass(this[s]).setAttrs({id:b.stamp(y),role:"option"}).setAttribute("data-text",x.text).append(x.display);},_createListNode:function(){var x=this.get("listNode")||v.create(this.LIST_TEMPLATE);x.addClass(this.getClassName(c)).setAttrs({id:b.stamp(x),role:"listbox"});this._set("listNode",x);this.get("contentBox").append(x);return x;},_getFirstItemNode:function(){return this._listNode.one(this[u]);},_getLastItemNode:function(){return this._listNode.one(this[u]+":last-child");},_syncPosition:function(){this._syncUIPosAlign();this._syncShim();},_syncResults:function(x){if(!x){x=this.get(j);}this._clear();if(x.length){this._add(x);}this._syncPosition();if(this.get("activateFirstItem")&&!this.get(f)){this.set(f,this._getFirstItemNode());}},_syncShim:h?function(){this._boundingBox.shim.sync();}:function(){},_syncVisibility:function(x){if(this.get(k)){x=true;this.set(q,x);}if(typeof x==="undefined"){x=this.get(q);}this._inputNode.set("aria-expanded",x);this._boundingBox.set("aria-hidden",!x);if(x){this._syncPosition();}else{this.set(f,null);this._set(r,null);this._boundingBox.get("offsetWidth");}},_afterActiveItemChange:function(A){var z=this._inputNode,x=A.newVal,B=A.prevVal,y;if(B&&B._node){B.removeClass(this[t]);}if(x){x.addClass(this[t]);z.set("aria-activedescendant",x.get(m));}else{z.removeAttribute("aria-activedescendant");}if(this.get("scrollIntoView")){y=x||z;if(!y.inRegion(b.DOM.viewportRegion(),true)||!y.inRegion(this._contentBox,true)){y.scrollIntoView();}}},_afterAlwaysShowListChange:function(x){this.set(q,x.newVal||this.get(j).length>0);},_afterHoveredItemChange:function(y){var x=y.newVal,z=y.prevVal;if(z){z.removeClass(this[d]);}if(x){x.addClass(this[d]);}},_afterMouseOver:function(x){var y=x.domEvent.target.ancestor(this[u],true);this._mouseOverList=true;if(y){this._set(r,y);}},_afterMouseOut:function(){this._mouseOverList=false;this._set(r,null);},_afterResultsChange:function(x){this._syncResults(x.newVal);if(!this.get(k)){this.set(q,!!x.newVal.length);}},_afterVisibleChange:function(x){this._syncVisibility(!!x.newVal);},_onListInputBlur:function(x){if(!this._mouseOverList||this._lastInputKey===p){this.hide();}},_onItemClick:function(x){var y=x.currentTarget;this.set(f,y);this.selectItem(y,x);},_defSelectFn:function(x){var y=x.result.text;this._inputNode.focus();this._updateValue(y);this.hide();}},{ATTRS:{activateFirstItem:{value:false},activeItem:{setter:b.one,value:null},alwaysShowList:{value:false},circular:{value:true},hoveredItem:{readOnly:true,value:null},listNode:{writeOnce:"initOnly",value:null},scrollIntoView:{value:false},tabSelect:{value:true},visible:{value:false}},CSS_PREFIX:b.ClassNameManager.getClassName("aclist")});b.AutoCompleteList=a;b.AutoComplete=a;},"@VERSION@",{after:["autocomplete-sources"],requires:["autocomplete-base","event-resize","node-screen","selector-css3","shim-plugin","widget","widget-position","widget-position-align"],skinnable:true});
