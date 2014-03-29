//

define([
	"dojo/_base/declare",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
//	"dojo/text!./templates/SummarizeUnit.html", 
	"dojo/dom-style", 
	"dojo/dom-class", 
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/query",
	"dojo/on",
	"dojo/Evented",
	"dojo/NodeList-traverse"
	],
   function(
    declare, 
    WidgetBase, 
    TemplatedMixin, 
//    template, 
    domStyle, 
    domClass,
    domConstruct,
    domAttr,
    domStyle,
    lang,
    array,
    q,
    on,
    Evented
    ){
	

        return declare([WidgetBase, TemplatedMixin, Evented], {
 
            // Our template - important!
            templateString: "<span>Hello</span>", //template,
 
            // A class to be applied to the root node in our template
            baseClass: "grdropdown",
            
            processedResults: 0,
            
            clearoption: true,
            
            alloption: true,
            
            radio: false,
            
            dropright: false,
			
            constructor: function(a,b,c) {
 
				this.inherited(arguments);
				
				this.attachid = a;
				this.data = b;
				lang.mixin(this, c);
				
				this.templateString = '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' + this.title + ' <span class="caret"></span></button></div>'
		
			},
			
			
            destroy: function(){
  	   	
	         this.inherited(arguments);
            	
            },
            
            
            postCreate: function(a){
            
			    // Get a DOM node reference for the root of our widget
			    var domNode = this.domNode;
				
				domConstruct.place(this.domNode, this.attachid);
				
				this.ulnode = domConstruct.create("ul", { "class": "dropdown-menu", "role": "menu"});
				
				domConstruct.place(this.ulnode, this.domNode);
				
				//
				
				dosep = false;
				
				if (this.radio == false) {
				
				if (this.clearoption == true) {
				
					linode = domConstruct.create("li", { "innerHTML": "<a href='#' data-value='" + "Clear All" + "' data-name='" + "clearall" + "'>" + "Clear All" + "</a>"});
					domConstruct.place(linode, this.ulnode);
						
					on(linode, "click", lang.hitch(this,this.clearall));
					
					dosep = true;
				
				}
				
				if (this.alloption == true) {
				
					linode = domConstruct.create("li", { "innerHTML": "<a href='#' data-value='" + "Select All" + "' data-name='" + "selectall" + "'>" + "Select All" + "</a>"});
					domConstruct.place(linode, this.ulnode);
						
					on(linode, "click", lang.hitch(this,this.selectall));
					
					dosep = true
				
				}
				
				if (dosep == true) {
					linode = domConstruct.create("li", { "class": "divider", "role": "presentation"})
					domConstruct.place(linode, this.ulnode);
				}
				
				}
				
				
				array.forEach(this.data, function(item, i){
			
					if (lang.isObject(item)) {
						tname = item.name;
						tvalue = item.value; 	
					} else {
						tname = item;
						tvalue = item; 				
					}
					
					if (item.checked) {
						checkerd = true;
						showchecked = "";
						shownone = "none";
							
					} else {
						checkerd = false;	
						showchecked = "none";
						shownone = "";
					}
					
					linode = domConstruct.create("li", { "class": "grddcheckers" , "innerHTML": "<a href='#' data-value='" + tvalue + "' data-name='" + tname + "' data-checked='" + checkerd + "'><span style='display:" + showchecked + ";padding-right:10px' class='glyphicon glyphicon-ok grdroppdownse'></span><span style='padding:12px;display:" + shownone + "' class='grdroppdownue'></span>" + tname + "</a>"});
					domConstruct.place(linode, this.ulnode);
					
					on(linode, "click", lang.hitch(this,this.checkchange));
					
				}, this);
				
				
				computedStyle = domStyle.getComputedStyle(this.ulnode);
				
				console.log(computedStyle.paddingLeft);
				
				domStyle.set(this.ulnode, "padding-left", "0px");
				
				if (this.dropright) {
					domStyle.set(this.ulnode, "left", "inherit");
					domStyle.set(this.ulnode, "right", "-7px");
				}
				
			    if (this.data.length > 22) {
					domStyle.set(this.ulnode, "overflow", "auto");
					domStyle.set(this.ulnode, "height", "600px");
					}
			    
		   },
		   
		   startup: function() {
		   
			
			//alert(this);
			 
			 
		   },

		   
		   _close: function() {
		   

  
		   },
		   
		   checkchange: function(a) {
			   
			   checked = a.srcElement.getAttribute("data-checked");
		
			   doit = false;
			   if (this.radio == false) { doit = true };
			   if (this.radio == true && checked == "false") {doit = true; this.clearall(null,true)};
			   
			   if (doit) {
			   if (checked == "false") {
				   
				   a.srcElement.setAttribute("data-checked", 'true');
				   q(a.srcElement).children(".grdroppdownue").style("display","none");
				   //$( a.srcElement ).children(".grdroppdownue").css("display","none");
				   q( a.srcElement ).children(".grdroppdownse").style("display","");
	
			   }  else {
				   
				   a.srcElement.setAttribute("data-checked", 'false');
				   q( a.srcElement ).children(".grdroppdownue").style("display","");
				   q( a.srcElement ).children(".grdroppdownse").style("display","none");
				   
			   }
			     
			     sels = lang.hitch(this,this.getselected)
			     s = sels()
			     
			     this.emit("change", s)
			     
			   }
			   
			   
			   
		   },
		   
		   clearall: function(e,ee) {
			   
			  $( this.ulnode ).children(".grddcheckers").each(function(index,i) { 
			  
			  		ael = q(i).children("a")[0];
			  		ael.setAttribute("data-checked", 'false');
			  		$(ael).children(".grdroppdownue").css("display","") 
			  		$(ael).children(".grdroppdownse").css("display","none")
			  		
			  		})
			  		
			     sels = lang.hitch(this,this.getselected)
			     s = sels()
			     
			     if (!ee) {this.emit("change", s)}
			     
		   },
		   
		   
		   selectall: function(e,ee) {
			   
			  $( this.ulnode ).children(".grddcheckers").each(function(index,i) { 
			  
			  		ael = $(i).children("a")[0]; 
			  		ael.setAttribute("data-checked", 'true');
			  		$(ael).children(".grdroppdownue").css("display","none") 
			  		$(ael).children(".grdroppdownse").css("display","")
			  		
			  		})			   

			     sels = lang.hitch(this,this.getselected)
			     s = sels()
			     
			     if (!ee) {this.emit("change", s)}		   
		   
		   },
		   
		   getselected: function() {
			   
			  outsels = []
			  
			  $( this.ulnode ).children(".grddcheckers").each(function(index,i) { 
			  
			  		ael = $(i).children("a")[0]; 
			  		checked = ael.getAttribute("data-checked");
				  		if (checked == "true") {
					  		
					  		if (ael.getAttribute("data-value") == 'undefined') {ov = ael.getAttribute("data-name")} else {ov = ael.getAttribute("data-value")}
					  		if (ael.getAttribute("data-name") == 'undefined') {oname = ael.getAttribute("data-value")} else {oname = ael.getAttribute("data-name")}
					  		
					  		outsels.push({name:oname,value:ov});
					  		
				  		}
			  		
			  		})			   
			   
			   return outsels
			   
		   }	   


        });
});


