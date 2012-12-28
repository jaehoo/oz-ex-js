/**
 * @author Lic. Jose Alberto Sanchez Gonzalez (jaehoo@gmail.com)
 * web: www.orbitalzero.com , www.orbitalzero.org
 */

var OZ = OZ || {};


OZ.pageSlideEx =function(){


    Modernizr.load([
          'ielt8!js/ie/iepngfix_tilebg.js'
        , 'ielt9!ie9!css/main/style-ie.css'
        //, 'js/jquery/jquery.form.js'
        //, 'js/jquery/jquery-ui.min.js'
        //, 'js/jquery/jquery.cssmenu.js'
    ]);


    $(function(){

        Modernizr.load({
            test: Modernizr.cssgradients,
            yep: 'js/jquery/jquery.css3finalize.min.js',
            nope: '',
            callback: function (url, result, key) {
                //alert('script.js has loaded!:'+result);
            }
        });

        //Modernizr.load('ielt8!/js/ie/selectivizr-min.js');
    });
}



OZ.capacitation=function(url)
{
    params  = 'width='+screen.width;
    params += ', height='+screen.height;
    params += ', top=0, left=0'
    params += ', fullscreen=yes';
    params += ', resizable=yes';
    params += ', scrollbars=yes';

    /*params += ', top='+top+', left='+left;
     params += ', directories=no';
     params += ', location=no';
     params += ', menubar=no';
     params += ', resizable=yes';
     params += ', scrollbars=yes';
     params += ', status=no';
     params += ', toolbar=no';*/

    newwin=window.open(url,'ABM e-learning', params);
    if (window.focus) {newwin.focus()}
    return false;
}




/** END Commons Functions **/
