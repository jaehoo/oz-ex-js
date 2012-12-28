/*
 * jQuery text-shadow and box-shadow plugin
 *
 * @version 0.2
 * @date 2010-04-13
 * @requires jQuery
 * @url http://plugins.jquery.com/project/shadows
 *
 * @author Sergey "putnik" Leschina (http://putnik.ws/)
 * @license MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 */

(function ($) {
	$.fn.textShadow = function (value) {
		return this.each(function () {
			if ('\v' !== 'v') {
				// isn't IE?
				return;
			}

			var obj = $(this);
			obj.css({
				'zoom': '1',
				'text-shadow': 'none'
			});
			if (!obj.css('position') || obj.css('position') === 'static') {
				obj.css('position', 'relative');
			}

			var z_index = obj.css('z-index');
			if (!z_index || z_index === 'auto') {
				obj.css('z-index', '1');
			}
			z_index = -1;

			var obj_html = obj.html();
			var obj_shadow = value ? value : obj.css('text-shadow');

			if (obj_shadow.indexOf(',') + 1) {
				var shadows_arr = obj_shadow.split(',');
			}
			else {
				var shadows_arr = new Array();
				shadows_arr.push(obj_shadow);
			}

			for (var cur_shadow in shadows_arr) {
				var padding = {
					left: parseInt(obj.css('padding-left'), 10),
					top: parseInt(obj.css('padding-top'), 10)
				};

				var s_arr = shadows_arr[cur_shadow].replace(/^\s*(.*)\s*$/, '$1').split(' ');
				var s_rad = parseInt(s_arr[3], 10);
				var opt = {
					'c': (s_arr[0].length === 4) ? s_arr[0].replace(/#([0-9a-f])([0-9a-f])([0-9a-f])/i, '#$1$1$2$2$3$3') : s_arr[0],
					'r': s_rad,
					'x': parseInt(s_arr[1], 10) - 1 + (padding.left - s_rad) + 'px',
					'y': parseInt(s_arr[2], 10) - 1 + (padding.top - s_rad) + 'px'
				};

				var ms_filter =
					'progid:DXImageTransform.Microsoft.Glow(Color=' + opt.c + ',Strength=' + (opt.r / 10) + ') ' +
					'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + opt.r + ', enabled="true")';

				var shadow = $(document.createElement('span'));
				shadow
					.html(obj_html)
					.appendTo(obj)
					.css({
						'position': 'absolute',
						'left': opt.x,
						'top': opt.y,
						'zoom': '1',
						'font-size': '100%',
						'z-index': z_index,
						'color': opt.c,
						'text-shadow': 'none',
						'filter': ms_filter,
						'-ms-filter': ms_filter
					})
					.live('select', function () {
						return false;
					});
			}
		});
	};

	$.fn.boxShadow = function (value) {
		return this.each(function () {
			if ('\v' !== 'v') {
				// isn't IE?
				return;
			}

			var obj = $(this);

			var obj_shadow = value ? value : obj.css('box-shadow');
			var a_arr = obj_shadow.split(' ');

			var s_disp = obj.css('display');
			if (s_disp != 'block') {
				s_disp = 'inline-block';
			}

			var opt = {
				'c': (a_arr[0].length === 4) ? a_arr[0].replace(/#([0-9a-f])([0-9a-f])([0-9a-f])/i, '#$1$1$2$2$3$3') : a_arr[0],
				'x': parseInt(a_arr[1], 10),
				'y': parseInt(a_arr[2], 10),
				'r': parseInt(a_arr[3], 10)
			};

			var ms_filter =
				'progid:DXImageTransform.Microsoft.Shadow(color=' + opt.c + ', Direction=45, ' +
					'Strength=' + (opt.r + (opt.x - opt.y) / 2) / 3 + ') ' +
				'progid:DXImageTransform.Microsoft.Shadow(color=' + opt.c + ', Direction=135, ' +
					'Strength=' + (opt.r + (opt.x + opt.y) / 2) / 3 + ') ' +
				'progid:DXImageTransform.Microsoft.Shadow(color=' + opt.c + ', Direction=225, ' +
					'Strength=' + (opt.r + (-opt.x + opt.y) / 2) / 3 + ') ' +
				'progid:DXImageTransform.Microsoft.Shadow(color=' + opt.c + ', Direction=315, ' +
					'Strength=' + (opt.r + (-opt.x - opt.y) / 2) / 3 + ')';

			obj.css({
				'box-shadow': 'none',
				'display': s_disp,
				'filter': ms_filter,
				'-ms-filter': ms_filter
			});
		});
	};
})(jQuery);