/**
 * Copyright (c) 2008 Kelvin Luck (http://www.kelvinluck.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * .
 * $Id: jquery.datePicker.js 102 2010-09-13 14:00:54Z kelvin.luck $
 **/

(function($){
    
	$.fn.extend({
/**
 * Render a calendar table into any matched elements.
 * 
 * @param Object s (optional) Customize your calendars.
 * @option Number month The month to render (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render. Default is today's year.
 * @option Function renderCallback A reference to a function that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Default is no callback.
 * @option Number showHeader Whether or not to show the header row, possible values are: $.dpConst.SHOW_HEADER_NONE (no header), $.dpConst.SHOW_HEADER_SHORT (first letter of each day) and $.dpConst.SHOW_HEADER_LONG (full name of each day). Default is $.dpConst.SHOW_HEADER_SHORT.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @type jQuery
 * @name renderCalendar
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#calendar-me').renderCalendar({month:0, year:2007});
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me.
 *
 * @example
 * var testCallback = function($td, thisDate, month, year)
 * {
 * if ($td.is('.current-month') && thisDate.getDay() == 4) {
 *		var d = thisDate.getDate();
 *		$td.bind(
 *			'click',
 *			function()
 *			{
 *				alert('You clicked on ' + d + '/' + (Number(month)+1) + '/' + year);
 *			}
 *		).addClass('thursday');
 *	} else if (thisDate.getDay() == 5) {
 *		$td.html('Friday the ' + $td.html() + 'th');
 *	}
 * }
 * $('#calendar-me').renderCalendar({month:0, year:2007, renderCallback:testCallback});
 * 
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me. Every Thursday in the current month has a class of "thursday" applied to it, is clickable and shows an alert when clicked. Every Friday on the calendar has the number inside replaced with text.
 **/
		renderCalendar  :   function(s)
		{
			var dc = function(a)
			{
				return document.createElement(a);
			};

			s = $.extend({}, $.fn.datePicker.defaults, s);
			
			if (s.showHeader != $.dpConst.SHOW_HEADER_NONE) {
				var headRow = $(dc('tr'));
				for (var i=Date.firstDayOfWeek; i<Date.firstDayOfWeek+7; i++) {
					var weekday = i%7;
					var day = Date.dayNames[weekday];
					headRow.append(
						jQuery(dc('th')).attr({'scope':'col', 'abbr':day, 'title':day, 'class':(weekday == 0 || weekday == 6 ? 'weekend' : 'weekday')}).html(s.showHeader == $.dpConst.SHOW_HEADER_SHORT ? day.substr(0, 1) : day)
					);
				}
			};
			
			var calendarTable = $(dc('table'))
									.attr(
										{
											'cellspacing':2
										}
									)
									.addClass('jCalendar')
									.append(
										(s.showHeader != $.dpConst.SHOW_HEADER_NONE ? 
											$(dc('thead'))
												.append(headRow)
											:
											dc('thead')
										)
									);
			var tbody = $(dc('tbody'));
			
			var today = (new Date()).zeroTime();
			today.setHours(12);
			
			var month = s.month == undefined ? today.getMonth() : s.month;
			var year = s.year || today.getFullYear();
			
			var currentDate = (new Date(year, month, 1, 12, 0, 0));
			
			
			var firstDayOffset = Date.firstDayOfWeek - currentDate.getDay() + 1;
			if (firstDayOffset > 1) firstDayOffset -= 7;
			var weeksToDraw = Math.ceil(( (-1*firstDayOffset+1) + currentDate.getDaysInMonth() ) /7);
			currentDate.addDays(firstDayOffset-1);
			
			var doHover = function(firstDayInBounds)
			{
				return function()
				{
					if (s.hoverClass) {
						var $this = $(this);
						if (!s.selectWeek) {
							$this.addClass(s.hoverClass);
						} else if (firstDayInBounds && !$this.is('.disabled')) {
							$this.parent().addClass('activeWeekHover');
						}
					}
				}
			};
			var unHover = function()
			{
				if (s.hoverClass) {
					var $this = $(this);
					$this.removeClass(s.hoverClass);
					$this.parent().removeClass('activeWeekHover');
				}
			};

			var w = 0;
			while (w++<weeksToDraw) {
				var r = jQuery(dc('tr'));
				var firstDayInBounds = s.dpController ? currentDate > s.dpController.startDate : false;
				for (var i=0; i<7; i++) {
					var thisMonth = currentDate.getMonth() == month;
					var d = $(dc('td'))
								.text(currentDate.getDate() + '')
								.addClass((thisMonth ? 'current-month ' : 'other-month ') +
													(currentDate.isWeekend() ? 'weekend ' : 'weekday ') +
													(thisMonth && currentDate.getTime() == today.getTime() ? 'today ' : '')
								)
								.data('datePickerDate', currentDate.asString())
								.hover(doHover(firstDayInBounds), unHover)
							;
					r.append(d);
					if (s.renderCallback) {
						s.renderCallback(d, currentDate, month, year);
					}
					// addDays(1) fails in some locales due to daylight savings. See issue 39.
					//currentDate.addDays(1);
					// set the time to midday to avoid any weird timezone issues??
					currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 12, 0, 0);
				}
				tbody.append(r);
			}
			calendarTable.append(tbody);
			
			return this.each(
				function()
				{
					$(this).empty().append(calendarTable);
				}
			);
		},
/**
 * Create a datePicker associated with each of the matched elements.
 *
 * The matched element will receive a few custom events with the following signatures:
 *
 * dateSelected(event, date, $td, status)
 * Triggered when a date is selected. event is a reference to the event, date is the Date selected, $td is a jquery object wrapped around the TD that was clicked on and status is whether the date was selected (true) or deselected (false)
 * 
 * dpClosed(event, selected)
 * Triggered when the date picker is closed. event is a reference to the event and selected is an Array containing Date objects.
 *
 * dpMonthChanged(event, displayedMonth, displayedYear)
 * Triggered when the month of the popped up calendar is changed. event is a reference to the event, displayedMonth is the number of the month now displayed (zero based) and displayedYear is the year of the month.
 *
 * dpDisplayed(event, $datePickerDiv)
 * Triggered when the date picker is created. $datePickerDiv is the div containing the date picker. Use this event to add custom content/ listeners to the popped up date picker.
 *
 * @param Object s (optional) Customize your date pickers.
 * @option Number month The month to render when the date picker is opened (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render when the date picker is opened. Default is today's year.
 * @option String startDate The first date date can be selected.
 * @option String endDate The last date that can be selected.
 * @option Boolean inline Whether to create the datePicker as inline (e.g. always on the page) or as a model popup. Default is false (== modal popup)
 * @option Boolean createButton Whether to create a .dp-choose-date anchor directly after the matched element which when clicked will trigger the showing of the date picker. Default is true.
 * @option Boolean showYearNavigation Whether to display buttons which allow the user to navigate through the months a year at a time. Default is true.
 * @option Boolean closeOnSelect Whether to close the date picker when a date is selected. Default is true.
 * @option Boolean displayClose Whether to create a "Close" button within the date picker popup. Default is false.
 * @option Boolean selectMultiple Whether a user should be able to select multiple dates with this date picker. Default is false.
 * @option Number numSelectable The maximum number of dates that can be selected where selectMultiple is true. Default is a very high number.
 * @option Boolean clickInput If the matched element is an input type="text" and this option is true then clicking on the input will cause the date picker to appear.
 * @option Boolean rememberViewedMonth Whether the datePicker should remember the last viewed month and open on it. If false then the date picker will always open with the month for the first selected date visible.
 * @option Boolean selectWeek Whether to select a complete week at a time...
 * @option Number verticalPosition The vertical alignment of the popped up date picker to the matched element. One of $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM. Default is $.dpConst.POS_TOP.
 * @option Number horizontalPosition The horizontal alignment of the popped up date picker to the matched element. One of $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT.
 * @option Number verticalOffset The number of pixels offset from the defined verticalPosition of this date picker that it should pop up in. Default in 0.
 * @option Number horizontalOffset The number of pixels offset from the defined horizontalPosition of this date picker that it should pop up in. Default in 0.
 * @option (Function|Array) renderCallback A reference to a function (or an array of separate functions) that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Each callback function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year. Default is no callback.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @option String autoFocusNextInput Whether focus should be passed onto the next input in the form (true) or remain on this input (false) when a date is selected and the calendar closes
 * @type jQuery
 * @name datePicker
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('input.date-picker').datePicker();
 * @desc Creates a date picker button next to all matched input elements. When the button is clicked on the value of the selected date will be placed in the corresponding input (formatted according to Date.format).
 *
 * @example demo/index.html
 * @desc See the projects homepage for many more complex examples...
 **/
		datePicker : function(s)
		{			
			if (!$.event._dpCache) $.event._dpCache = [];
			
			// initialise the date picker controller with the relevant settings...
			s = $.extend({}, $.fn.datePicker.defaults, s);
			
			return this.each(
				function()
				{
					var $this = $(this);
					var alreadyExists = true;
					
					if (!this._dpId) {
						this._dpId = $.event.guid++;
						$.event._dpCache[this._dpId] = new DatePicker(this);
						alreadyExists = false;
					}
					
					if (s.inline) {
						s.createButton = false;
						s.displayClose = false;
						s.closeOnSelect = false;
						$this.empty();
					}
					
					var controller = $.event._dpCache[this._dpId];
					
					controller.init(s);
					
					if (!alreadyExists && s.createButton) {
						// create it!
						controller.button = $('<a href="#" class="dp-choose-date" title="' + $.dpText.TEXT_CHOOSE_DATE + '">' + $.dpText.TEXT_CHOOSE_DATE + '</a>')
								.bind(
									'click',
									function()
									{
										$this.dpDisplay(this);
										this.blur();
										return false;
									}
								);
						$this.after(controller.button);
					}
					
					if (!alreadyExists && $this.is(':text')) {
						$this
							.bind(
								'dateSelected',
								function(e, selectedDate, $td)
								{
									this.value = selectedDate.asString();
								}
							).bind(
								'change',
								function()
								{
									if (this.value == '') {
										controller.clearSelected();
									} else {
										var d = Date.fromString(this.value);
										if (d) {
											controller.setSelected(d, true, true);
										}
									}
								}
							);
						if (s.clickInput) {
							$this.bind(
								'click',
								function()
								{
									// The change event doesn't happen until the input loses focus so we need to manually trigger it...
									$this.trigger('change');
									$this.dpDisplay();
								}
							);
						}
						var d = Date.fromString(this.value);
						if (this.value != '' && d) {
							controller.setSelected(d, true, true);
						}
					}
					
					$this.addClass('dp-applied');
					
				}
			)
		},
/**
 * Disables or enables this date picker
 *
 * @param Boolean s Whether to disable (true) or enable (false) this datePicker
 * @type jQuery
 * @name dpSetDisabled
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetDisabled(true);
 * @desc Prevents this date picker from displaying and adds a class of dp-disabled to it (and it's associated button if it has one) for styling purposes. If the matched element is an input field then it will also set the disabled attribute to stop people directly editing the field.
 **/
		dpSetDisabled : function(s)
		{
			return _w.call(this, 'setDisabled', s);
		},
/**
 * Updates the first selectable date for any date pickers on any matched elements.
 *
 * @param String d A string representing the first selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetStartDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetStartDate('01/01/2000');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the first selectable date for each of these to the first day of the millenium.
 **/
		dpSetStartDate : function(d)
		{
			return _w.call(this, 'setStartDate', d);
		},
/**
 * Updates the last selectable date for any date pickers on any matched elements.
 *
 * @param String d A string representing the last selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetEndDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetEndDate('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the last selectable date for each of these to the first Janurary 2010.
 **/
		dpSetEndDate : function(d)
		{
			return _w.call(this, 'setEndDate', d);
		},
/**
 * Gets a list of Dates currently selected by this datePicker. This will be an empty array if no dates are currently selected or NULL if there is no datePicker associated with the matched element.
 *
 * @type Array
 * @name dpGetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * alert($('.date-picker').dpGetSelected());
 * @desc Will alert an empty array (as nothing is selected yet)
 **/
		dpGetSelected : function()
		{
			var c = _getController(this[0]);
			if (c) {
				return c.getSelected();
			}
			return null;
		},
/**
 * Selects or deselects a date on any matched element's date pickers. Deselcting is only useful on date pickers where selectMultiple==true. Selecting will only work if the passed date is within the startDate and endDate boundries for a given date picker.
 *
 * @param String d A string representing the date you want to select (formatted according to Date.format).
 * @param Boolean v Whether you want to select (true) or deselect (false) this date. Optional - default = true.
 * @param Boolean m Whether you want the date picker to open up on the month of this date when it is next opened. Optional - default = true.
 * @param Boolean e Whether you want the date picker to dispatch events related to this change of selection. Optional - default = true.
 * @type jQuery
 * @name dpSetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetSelected('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
 **/
		dpSetSelected : function(d, v, m, e)
		{
			if (v == undefined) v=true;
			if (m == undefined) m=true;
			if (e == undefined) e=true;
			return _w.call(this, 'setSelected', Date.fromString(d), v, m, e);
		},
/**
 * Sets the month that will be displayed when the date picker is next opened. If the passed month is before startDate then the month containing startDate will be displayed instead. If the passed month is after endDate then the month containing the endDate will be displayed instead.
 *
 * @param Number m The month you want the date picker to display. Optional - defaults to the currently displayed month.
 * @param Number y The year you want the date picker to display. Optional - defaults to the currently displayed year.
 * @type jQuery
 * @name dpSetDisplayedMonth
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetDisplayedMonth(10, 2008);
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
 **/
		dpSetDisplayedMonth : function(m, y)
		{
			return _w.call(this, 'setDisplayedMonth', Number(m), Number(y), true);
		},
/**
 * Displays the date picker associated with the matched elements. Since only one date picker can be displayed at once then the date picker associated with the last matched element will be the one that is displayed.
 *
 * @param HTMLElement e An element that you want the date picker to pop up relative in position to. Optional - default behaviour is to pop up next to the element associated with this date picker.
 * @type jQuery
 * @name dpDisplay
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpDisplay();
 * @desc Creates a date picker associated with the element with an id of date-picker and then causes it to pop up.
 **/
		dpDisplay : function(e)
		{
			return _w.call(this, 'display', e);
		},
/**
 * Sets a function or array of functions that is called when each TD of the date picker popup is rendered to the page
 *
 * @param (Function|Array) a A function or an array of functions that are called when each td is rendered. Each function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year.
 * @type jQuery
 * @name dpSetRenderCallback
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetRenderCallback(function($td, thisDate, month, year)
 * {
 * 	// do stuff as each td is rendered dependant on the date in the td and the displayed month and year
 * });
 * @desc Creates a date picker associated with the element with an id of date-picker and then creates a function which is called as each td is rendered when this date picker is displayed.
 **/
		dpSetRenderCallback : function(a)
		{
			return _w.call(this, 'setRenderCallback', a);
		},
/**
 * Sets the position that the datePicker will pop up (relative to it's associated element)
 *
 * @param Number v The vertical alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM
 * @param Number h The horizontal alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT
 * @type jQuery
 * @name dpSetPosition
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetPosition($.dpConst.POS_BOTTOM, $.dpConst.POS_RIGHT);
 * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be bottom and right aligned to the #date-picker element.
 **/
		dpSetPosition : function(v, h)
		{
			return _w.call(this, 'setPosition', v, h);
		},
/**
 * Sets the offset that the popped up date picker will have from it's default position relative to it's associated element (as set by dpSetPosition)
 *
 * @param Number v The vertical offset of the created date picker.
 * @param Number h The horizontal offset of the created date picker.
 * @type jQuery
 * @name dpSetOffset
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetOffset(-20, 200);
 * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be 20 pixels above and 200 pixels to the right of it's default position.
 **/
		dpSetOffset : function(v, h)
		{
			return _w.call(this, 'setOffset', v, h);
		},
/**
 * Closes the open date picker associated with this element.
 *
 * @type jQuery
 * @name dpClose
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-pick')
 *		.datePicker()
 *		.bind(
 *			'focus',
 *			function()
 *			{
 *				$(this).dpDisplay();
 *			}
 *		).bind(
 *			'blur',
 *			function()
 *			{
 *				$(this).dpClose();
 *			}
 *		);
 **/
		dpClose : function()
		{
			return _w.call(this, '_closeCalendar', false, this[0]);
		},
/**
 * Rerenders the date picker's current month (for use with inline calendars and renderCallbacks).
 *
 * @type jQuery
 * @name dpRerenderCalendar
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 **/
		dpRerenderCalendar : function()
		{
			return _w.call(this, '_rerenderCalendar');
		},
		// private function called on unload to clean up any expandos etc and prevent memory links...
		_dpDestroy : function()
		{
			// TODO - implement this?
		}
	});
	
	// private internal function to cut down on the amount of code needed where we forward
	// dp* methods on the jQuery object on to the relevant DatePicker controllers...
	var _w = function(f, a1, a2, a3, a4)
	{
		return this.each(
			function()
			{
				var c = _getController(this);
				if (c) {
					c[f](a1, a2, a3, a4);
				}
			}
		);
	};
	
	function DatePicker(ele)
	{
		this.ele = ele;
		
		// initial values...
		this.displayedMonth		=	null;
		this.displayedYear		=	null;
		this.startDate			=	null;
		this.endDate			=	null;
		this.showYearNavigation	=	null;
		this.closeOnSelect		=	null;
		this.displayClose		=	null;
		this.rememberViewedMonth=	null;
		this.selectMultiple		=	null;
		this.numSelectable		=	null;
		this.numSelected		=	null;
		this.verticalPosition	=	null;
		this.horizontalPosition	=	null;
		this.verticalOffset		=	null;
		this.horizontalOffset	=	null;
		this.button				=	null;
		this.renderCallback		=	[];
		this.selectedDates		=	{};
		this.inline				=	null;
		this.context			=	'#dp-popup';
		this.settings			=	{};
	};
	$.extend(
		DatePicker.prototype,
		{	
			init : function(s)
			{
				this.setStartDate(s.startDate);
				this.setEndDate(s.endDate);
				this.setDisplayedMonth(Number(s.month), Number(s.year));
				this.setRenderCallback(s.renderCallback);
				this.showYearNavigation = s.showYearNavigation;
				this.closeOnSelect = s.closeOnSelect;
				this.displayClose = s.displayClose;
				this.rememberViewedMonth =	s.rememberViewedMonth;
				this.selectMultiple = s.selectMultiple;
				this.numSelectable = s.selectMultiple ? s.numSelectable : 1;
				this.numSelected = 0;
				this.verticalPosition = s.verticalPosition;
				this.horizontalPosition = s.horizontalPosition;
				this.hoverClass = s.hoverClass;
				this.setOffset(s.verticalOffset, s.horizontalOffset);
				this.inline = s.inline;
				this.settings = s;
				if (this.inline) {
					this.context = this.ele;
					this.display();
				}
			},
			setStartDate : function(d)
			{
				if (d) {
					this.startDate = Date.fromString(d);
				}
				if (!this.startDate) {
					this.startDate = (new Date()).zeroTime();
				}
				this.setDisplayedMonth(this.displayedMonth, thÈs.displayedYear);
	©	},
			setEndDate : function(d)
			{
			if  d)${
					this.endDate = Tqte.fromSdring(d);J				y-
				if (!tXis.endDate)({
					4his.endDate = (new Date('12/30/299)'©); // using the JS Date.paÚse function which expects mm+dd/yyyy
				}
				if :uhis.endDate.getTime() < this.startDate.getTime()) {
					this.endDate = this.startDate;
				}
				this.sed@isplayedMonth(this.diwplayedMojth, tlis.disqlAyedYear);
			},
			Ûetosition : functionhv, h)
			{
				this/terticclPsitign = v;
				this.horizontalPosition = `;
			},
			setOf&set : fungtion(v,†h©
			{ä				this.vebticalOffset = pas3eInt®v) || 0;
				thks.horizontalOffset - pcRcmInt(h) || 0;ç
			},
			setDisabled : funbtign(s)
			{
			$e = $(t(iq.ele);
			$e[s ? 'addClass z 'removeClaqs']('dp-diqabled');
I		if *this.button+ {
					$‚ıt = $(this.button);
				$butZs ? 'adlClasq' : 'removeClass']('dp≠disabled');J					dbut.cttv('ti4le', s`? '& : $.dpTeXt.TEXT_CHOOSE_DATEi;
				}
				if ($e.is(':text')) {
					$e.attr('disabled', s ? gdisabled' : '#);	
				}
			},
			setDisplayedMonth : function(m, y, Rerenderi			{J				yf (this.startDate == uldefined || this.endDaue == undefyned© {
				âreturn;B				}
				var s = new Date(this>StartEate.gevThme());
				s.3etDate(1);
				tar e = new Date(this.endDa|e/getTime());
				e.setDate(1);
				
				rar t;
	â		if ((!m "& !y) || (isNaŒ(m) && isN!N(y))) {
					// no month nr yeir pawsed - default"to currenV montË
					t = new Date().zeroTime();
â				t.qetDaÙe(q);
			} Âlse if (isNaN(m)) s
					// just year passed in - presume we want the displayedIonth
					t = ~ew Date(y, this.displayedMonth 1);
			)} else if hisNaN(y)) {
			I	// just }onth passed in - presume we waNt tje†displayed[ear
					| = new Date(this.displayedYear, m, 1);
				} el3e {
					// year and month passed in - that's the d·te we want!
â				t = ne DatÂ y, m, 1)
				}
			// check if The desired*date is w)thin the raÓge of o5b defined startDate aNd undDate
				in (t.getTime() < s.getPime())${
					t = s;
				} else$iv (t.getTimu() > e.getTime()) {
				t = e;ç
				Ω				var oldMonth } tHis.disp,ayudMonth
				var oldYeaÚ = this.diÛplayedŸear;
				thisÆdisplayedMo&th 5 t.getMonth(!;
			thisÆdisplayedYear = t.getFullYear();
	
				if (rerender && (this.d){playedOonth != oldMonth || this.dÈsqlAyedYÂar != oldYear))
	)â	{
					ÙhÈs._r%rendercalendar();
			I	$(thÈs.elm).trieger('dpMonthChanged'$ [this.dis0laYeeMonth, this.dislayedYear]);
				}
			},
			setSelected : functioN(dd v, moveToMonthl0lispatchEvents)
	)	{
				if (d < this.stavtDate || d.juroTime() > this.endF·te.zeroTime()) {
				// Don't allow people to"select dates outsidm range...
				retur~;
)	â	}-
				var s = this.settings;
				if (c/selectWÂek)
				{					d = d.a`dDays(- (d.getD!y(( - Date.firstD!yOfWeek + 7)"% 7);
				if (d < this.startDate) ?- The first day of(this eek ir beFore phe start†date so is ufselectable*.&
					{
						return3
					}
				}				if (v == phis.isSeLected(d)) // this dat% is already u~/selected
				{
					return;				}
				iv (t(is.selectMultiple == falsg) y
		)	4his.clearSelected();
				} else yf (v && tlis.numSelected == this.numSelectable) ˚
					// can't sglect an˘ mOre dates...
				return;
				}
				if (moveToMonth && (this.fisplayedOonth != d.gatMonth(+ ||`this.`isplayadYear =$d.getFullYear())) {
					this.seuDisplayedMontx(d.getMonth(), d.gutFullYear(), true)9
				}
				thisselectedDatesd.asString()] Ω v;
				this&numSelected +- v ? 1 : -1;
				var$celectorStving = 'td.' + (d.getMonth() == this.displayedMonth ? 'current-month' : 'other-}olth'-{
			ˆar $td;
				$(ÛelgctorWtring$ this.context).each(
				function()
					{
					if ($(4his+.data('datePickerDate'-†== d.asSuring()- {)						$td = $(this);
						if (s.selectWeek)
					{
								$td.parent()[v ? 'addClass' : 'removeclass']('s$lectu‰Week');
						â}
							$td[v0? 'addClass' : removeClass']('selected'); 
â					}
				}
				);
				$('td', this.context).not('.selected')[tlis.selectMultiple &&  this.num[elected =- tlis.numSelectaBle ? 'addCmaÛs : 'Úemovelass']('unselectaBle'(?
				
				if (dispatchEvents)
	I	){
â				var s = this.isSelec4ed(d);
	I			$u = $(this.ele);
					var dClone = Date.fromString(d.asStrinG());	
				$e,triggÂr,'dateSelected', [dClone, $td, s]);
					$e.prigger('changE');
	I		}
			},
			hsSelected 2 functiÔn(d)
			{
				return this.selectedDa|ds[‰.asString()];
			},
			getSelected : f5nction()	
			{
				var†r = [];
		IIfor(vaÚ s IÓ this.selectedDatew) {
					if (thas.sglectedDates[s] = true) {
						2.pusH(DaÙe.fromString(s));
				}
				}
			return r;
		},
			clearSelected : function()-
			z
				this.selectedDates = {};
			tlis.numSelected = 0;
				$('td.selected'. this.cgntext).rEmOveClass('selected'(.parent().removeClaqs('selectedeek');
			}
	â	display ∫ function(eleAlignTo)			{
				if ($(tËiw.ele).hs('ndp≠disabled')) return+
	I		)			eleA|k'nTo = eleAlkgnTo || this.ele:				var c = tlis;
			vqr $ele = $heleAlignTo);
				vcr eleOffset = $ele.offset();
				
				var $createAn;
				vaR attrs;
			var attpsCaÓendarHolder;
				var!cssRules;
						I	ig (c.inline)†{	
					$creA4eIn"= $(this.ule);J					adtrs =!{
					&id'		:	'caÏenlar-' + this.ele._$pId,
					…'class'	:)'dp-popup dp-popup-inlanÂ'
					};

				$('.dp-xopup&, $#reateIn).remove();
				cssRuÏes  {
					=;
				} e|se {
					$createIn = $('bkdy')9	
				attrs = {	)				'id'		:â'dp-popup',
						'Class'	:	'dp-po`}p'
				};
					cssRules = {
				'top'	:	eleOffset.toq + c.verticalOffseu,ä						'left'	:	el%Offset.left + c.horizontalOffset					};
				
					vaÚ _checkMouse = function(e)
					{
						va2 el = e.target;
						var cal`} $(ß#dp-popup')_0];
						
				wh)le†(true)z)						if (el == cal) {
								return 4rue;
					} else if (el == do„ument) {
								c._closECalendar();
								return filse+ä							= elre {
						el = $(el).parent()[0];
							}
						}
I			};
					this._cheCkMouse`= _checkMouse;M
				)
					c._clmse`lEndar(true);
	)			$(document).bind(						#keydowf.datepiccar', 
						function(dvent)â					{
							if (event.keyCode == 2) {
								a._closeCalendar();
		)				_
						}
					);
				}
				
			if†(!c.rememberViewedMonth)
				{
					ˆar selectedDate Ω tËis.getSelected()[0];
				if (selectedDate- {
					selectedDate = new Date(selectEdD!te);
						this&setDisqlayedMonph(selectedDate.getMonth(), relectedDate.getFullYear(), false);	
					}
				}
				
			,createIn
					.append(
						$('<div></div>')
							.attr(attRs)
							.css(cwsRules)
							.appand(
//							$('4a href="3 class5"seÏecteee >aaa</c>'),
								$('<h2></h2>'),-								$('<dir class="dp)lav/prev"></fiv>')
							.apE.d(
										$('8a alass="dp-nav-prev=yuar" hvef="#" ti4le="' + $.dText.TUXT_PREV_YEAR + '">&lt;&lt;</a>')
											.bind(
												'click',
							I		function()
												{
									return0c._displayNewMonth.call(c, thi3, 0, %1){
				â						}
-				¡			-(
	I								$('a cLass="d`-nav-p2ev-}ontx" hr%Ê=b#" title="' + $.dpText.TEXT_PREV_MONT@`+ b>&lt;</a<')
										.bind(
			I			â				'click',
											function()
												{
													return c._dispÏayNewMontl.call(c, this, %1, 0);
											}
											)
									),
		I				 ('<div(class="dp-nav-nuxt"></div>')
								.appent(
										$('<a class="dp-nav-nept-yea2" hzmf="#" title="' + 4.dpTexÙ.TEXT_NET_YEAR + ">&gt;&gu;</a>')
										.bind(
												%sl)ck',
											function()
								â			{
												return c.displayNewMonth.call(c, this, 0, 1(;
												
										)<										4('<a class="dP-nav-next-monti" href="#" title="'0+ $ndpText.TEXT_NEXT_MONTH + '">&gt;</a>')							Iâ	.bind(
							)				'click',
							I			function(9
											{
										)	return b._diwplayNewMonth.call(c, this, 1, 0)+
												}
											)
									),
								$('<div cliss"dp-c·mundar"></div>')						)
							/bgIframe(©
					);
					
			far $pop = thisiNline ? $('.`p%popup',†thi{.context) : $('#dppopup');
				
				in (this.ShowYearNavigation 9= false) {
)				$'.dp-nav-prev-year, .dp=naV-next-year', c.sontext).csÛ('displaq&, 'noje');
			}
				if (thiS.displaYClose) {
					$pop.ap0end*
						$('<a href="#" id="dx-close#' + $.dpText.TAXT_CLOSE + '</a>')
							.bind(
							'clIck',
			)				functiOn()
							{
									c._closeCaleNdab();
									return fa|se;
						}
							)
					);
		}
			c._renderCalendar();

				$(4his.ele).trigfer('dpDisplayed', $0m);
				
				if (c.i~line) {
					if (this.vertkcalPosition == $.dpConst.POS_BOTTOM) {
						$`gp.css('tp', eleOffs%u.top + ,elexeight() - $pop.heighd()"+ c.verticalœffset);
					}
					if (this.horizontalPo{itin == $.dpGonst.POS_RIGHT- k
						dpop.cs{('left/, elaOffset.left + $ele.width() = $pop.width ) + c.hkrizontalOffcet);
					}
//					$('.selecÙee', this.context).focus*);
					$(document).bind('mousedown.datepicker', this.ﬂcheakMouse);
		I	}
	I		
			},
			setRenderCalmback : function(a)
			zç
				if ®a == null) rettrn;
I			if (a && tYpeof(a) == 'function') {
					a = [a;
				}
				tiis.renderCallback = this.2enderCall‚acK.concat(a);
			},
	â	cellRender2:0funCtion ($td, thisDaTe, monÙh, year) {
				var c = this.dController;
				var d = new Date(thisDate.getTile());
				
				// add our clicK handlers to deal wiuh it whÂn the days are cliCked...
			
			$td.bind(
					'click'.
				functinn()
					{
					var$this = $hthis);
					if (!$this.is('.disqbled')) {
							c.setSelected(d, !$this.is('.selected') ||(!c.Sele„tMulTiple, falÛe, vrue)+
							if (c.closeOjSelekt) {					I		// Focus tËe next input in the form√¢‚Ç¨¬¶
								if (c.qettings.autoFocusNextInpu|) {
									var ele = c.em%;ä					var foUnd = nalse;
									$(':input', ele.form	.each)
									functiÔo()
									[
										if$(found) y
										$(this).focus®);
								â	â	return false;
				I						}
							I			if (this == ele) z
								)			found = true;
											}
										}								);
							} else {
									a.ela*foc5s()+
								}						)	c._closeCalendar();
							}
					}
					]
				);
				if (c.i3Se|ected(d)) {
					$td.addClass('selected');
				if (c.cettangS.ÛelectWeek)
					{
						$td.parent().addClAss('selectadWeEk');
)				}
â			= else  )f (c.welectMultit,e && c.numSelected }= c>lumSelectabme! {
				)4td.addClass('unwelectable');
			}	
				
			}-
			_applyVendezCallbacks : Function()
			{
				vas c = this;
				$('tt', this.cootext).eakh(
				funcuion()			)	y
						fov (var i=p; a<c.renderCallback.length; i++) {
						$td = $(this);
							a.renderC!llback[i].apply(uhis, [$td, Datg.fromString($4d.dAta('ditePickepDate')), c.displ·yedMon$h,$c.displaygdYear]);
						}
					}
				);
		return;
			},
			// elu is the clicked button"- only proceed if i| Doesn't have txe class disacled*.
			// m and Y are -1, 0 or 1 depending which direction!we want to`go in...
	)	_displayNewMonth : function(ele, m,"y) 
			[
				if (#(Â|E).is('.eisabled'() {
			|Ëis.setDisplayedMnTh(vhis.displiyedMon4h + m, thisndisplayedYear + y, tru%);
				}
			e|e.bdur();
				return famse;
			},			_rurender√alendar : function()
			{
				this._clearC·lendar(+;
				this._renderCalendar();
			},
			_renderCalendar : function()
I		{
				// s!t the title...
				$('h2'†this.contex|).html((new Date(this.displayedYeaÚ. thas.displayeeMontH, 1)).isString($.dpText.HEADER_FORMAT));
			
		)	// render The calendirÆ..
				$('Ædp-calendar', this.context).2enderCilendar®
					$.mxtend(
					{},
						thas.settings, 
						{
						month		: this.displayedMonth,
							yeir		8 thas.displayedYear,
							renderCallback	: this.celdRender,
						dpController	: uhis,
						)hoverCh·ss		; this.(verClass
					})
	I		);
â			
				// update the spatus of the controL buttons and disabLe dates bevmre startDate or after"endDate...
				/Ø TODO: When sh_u,d the`yeaB buttons be disableD? When you can't go$forward a whole year from Where you are ob is that!annoying?
				if (this.displayedYear == vhi3.startDate.getGullYear() && this.dis2layedMonth == this.startDate.getMonth()) {
					$('.dp-nav-prev-year'¨ tjis.context)&a‰dClass('disabled');J					$('.dpnav-prev-month', this.context).addClass('Diwable$');
					$('.dp-calentar td.kther-month'l this.context).each(
					function()
						{
							var $this = $(this){
	 					if (Number($this.tExt()) > 20) {								$this.ad$Class('diÛabled');
					}
					}
					);
					6ar ` = this.startDate*getDate();
					$('.dp-calendar td.current-mon`h', this.context).eech(
						functhon()
						{
						war $this = $(this);ä							if (Number)$|his.text -) < d) {
								$this.addC|ass('disabled');
							}
						}
					);
		I	} else {
					$®'.dp-nav-prev-yeer', thi{.context).removmClass('disabled');
I				&('.dp-nav-prev-month', this.context).remkveALass('dmsabled');-
				âvar D = this.starÙDate.gedDabe();
					if (d > 20) {
					// chÂck if the starpdate is last month!as we Might oeed to a$d some disabned classes...
-	â		var†st = this.startDate.getTime();
						var sd =!new$Date(st);
						sd.addMonths(1i;							if (Ù`is.displayedIeab == sd.getFul,Year() && this.displayed]nth == sd.ge4Month()) {
						)$('.dp-calendar td.ot(er-month'( this.contezv).each(
								gunct)on()
						)	{
									var`$this = $(this);
									Èv (Dave.fromStrIng($this.data('datePickerDate')).gatTime() = st) {
									$this.aldClass('disabled');
								}
								}
							?;
						}*				}
I			}
			i& (thir.displayedYeap -= this.endDatm,getFullYear,) ¶& this.displayudMonth == this.endDate.get]onth()) {
					$('.dp-nav-next-year', this.context).aelClass('disabled');
				$('.dp-nav-next-month', this.context).addClass('disabled');
					$('.dp-calendar td.other,mont`', this.contex4).each(
						function()
						{
							var  thhs = $(this);
	â				if (Number($this.text()) < 14)¢{
								$this.AddClass('disabled');
							}						}
					);
					vir f = thiw.endDate.eetDate();
			)$('.dp-calendar td&current-mon|h', this.context).e·ch(
						¶unction()
					{
							var $this = $(tHis);ç
							if (umber($this.taxt()) >(d) {
						)	$thms.addClmss(#disablee');
							}
					â}
					);
				} else {
					$('.dp-nav-next-year', this.context).removeClass('dirabled');
					$8'.dp-navnext-month', this.contexd).remoVeCmasS('tisabled');
		I		var d = t`is.endDate.gmtDate();
					if (d < 17) {
)	I			// check if the endDate is ~ext month as we`might need to add some dasab,ed classes...
						var†ed 5 new"Date(thh{.endDate.GetTim%(-);
						ed.addMonth{(-1);
				©	if (this.displayedYear == ed.getFullYear() && this.displayeDMonth == ed.getMo.th))) {
						I$('.dp-calendar td.other-mnth', |xi1.context).eeCh(
							function()
						{
								Ivar $this = $(this(;
									var cellDay = Numbur($this.text());
								if (cellDay < 13 && cellDay > d) {
								$Ùhis.addCl`ss('disabled');
									}								}
							);
						}
					}
				}
				this._applyRenderCallbacks();
			},
			_closeCalendar : function(programatic, ele)
			{
				if (!ele || ele == this.ele)
				{
					$(document).unbind('mousedown.datepicker');
					$(document).unbind('keydown.datepicker');
					this._clearCalendar();
					$('#dp-popup a').unbind();
					$('#dp-popup').empty().remove();
					if (!programatic) {
						$(this.ele).trigger('dpClosed', [this.getSelected()]);
					}
				}
			},
			// empties the current dp-calendar div and makes sure that all events are unbound
			// and expandos removed to avoid memory leaks...
			_clearCalendar : function()
			{
				// TODO.
				$('.dp-calendar td', this.context).unbind();
				$('.dp-calendar', this.context).empty();
			}
		}
	);
	
	// static constants
	$.dpConst = {
		SHOW_HEADER_NONE	:	0,
		SHOW_HEADER_SHORT	:	1,
		SHOW_HEADER_LONG	:	2,
		POS_TOP				:	0,
		POS_BOTTOM			:	1,
		POS_LEFT			:	0,
		POS_RIGHT			:	1,
		DP_INTERNAL_FOCUS	:	'dpInternalFocusTrigger'
	};
	// localisable text
	$.dpText = {
		TEXT_PREV_YEAR		:	'Previous year',
		TEXT_PREV_MONTH		:	'Previous month',
		TEXT_NEXT_YEAR		:	'Next year',
		TEXT_NEXT_MONTH		:	'Next month',
		TEXT_CLOSE			:	'Close',
		TEXT_CHOOSE_DATE	:	'Choose date',
		HEADER_FORMAT		:	'mmmm yyyy'
	};
	// version
	$.dpVersion = '$Id: jquery.datePicker.js 102 2010-09-13 14:00:54Z kelvin.luck $';

	$.fn.datePicker.defaults = {
		month				: undefined,
		year				: undefined,
		showHeader			: $.dpConst.SHOW_HEADER_SHORT,
		startDate			: undefined,
		endDate				: undefined,
		inline				: false,
		renderCallback		: null,
		createButton		: true,
		showYearNavigation	: true,
		closeOnSelect		: true,
		displayClose		: false,
		selectMultiple		: false,
		numSelectable		: Number.MAX_VALUE,
		clickInput			: false,
		rememberViewedMonth	: true,
		selectWeek			: false,
		verticalPosition	: $.dpConst.POS_TOP,
		horizontalPosition	: $.dpConst.POS_LEFT,
		verticalOffset		: 0,
		horizontalOffset	: 0,
		hoverClass			: 'dp-hover',
		autoFocusNextInput  : false
	};

	function _getController(ele)
	{
		if (ele._dpId) return $.event._dpCache[ele._dpId];
		return false;
	};
	
	// make it so that no error is thrown if bgIframe plugin isn't included (allows you to use conditional
	// comments to only include bgIframe where it is needed in IE without breaking this plugin).
	if ($.fn.bgIframe == undefined) {
		$.fn.bgIframe = function() {return this; };
	};


	// clean-up
	$(window)
		.bind('unload', function() {
			var els = $.event._dpCache || [];
			for (var i in els) {
				$(els[i].ele)._dpDestroy();
			}
		});
		
	
})(jQuery);