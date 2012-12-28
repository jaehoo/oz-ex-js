var webLoader = webLoader || {};

webLoader.test= function(e){
    alert(e);
};

/**
 * Permite la edición o escritura en los campos indicados,
 * , ademas indica si debe o no desactivarlos:
 *
 * @param o
 */
webLoader.formEditable= function(o){

    var arrop= new Array();

    if(o.readOnly){     arrop.push('readonly');     }
    if(o.disable){      arrop.push('disabled');    }

    o['attrs']=arrop;

    for (var prop in o.elNames){
        var item=$(o.form+' [name="'+o.elNames[prop]+'"]');

        if(item.length>0){
            for(var id in o.attrs){
            //alert(item+': '+o.attrs[id]);
            item.attr(o.attrs[id],'');
            }
        }
    }

}

webLoader.configurableForm= function(o){

    //console.info('configurableForm...');

    var attrs=o['attrs']!=null?o['attrs']:new Array();
    var remattrs=o['remattrs']!=null?o['remattrs']:new Array();

    if(o.readOnly){     attrs.push('readonly');     }
    if(o.disable){      attrs.push('disabled');    }

    for (var prop in o.items){

        var item=$(o.form+' [name="'+o.items[prop]+'"]');

        if(item.length>0){

            if(o.attrs!=null){
                //o.addAttr;
                for(var id in attrs){
                    //console.info(item+': '+attrs[id]);
                    item.attr(attrs[id],'');
                }
            }

            if(o.remattrs!=null){
                //o.remAttr;

                for(var id in remattrs){
                    //console.info(item+': '+remattrs[id]);
                    //console.info("REMOVE..."+o.items[prop]+': '+remattrs[id]);
                    item.removeAttr(remattrs[id]);
                }
            }


        }
    }

    //set exclusive attrs

}

webLoader.formEnable= function(o){

}

var count_captcha = 0;
webLoader.refresCaptcha = function(o){
    $(o).attr("src","utils/getCaptcha.html?i="+count_captcha);
    count_captcha++;
}

webLoader.validateMail = function(campo,target){
    if(campo.value!="" && campo.value!=null){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'utils/validateMailUser.html',
            data: {email : campo.value},
            success: function (data){
                if (data.result == 'success'){
                    $(target).html("");
                    return true;
                }
                else if (data.result == 'fail'){
                    $(target).css("height","1px");
                    $(target).css("position","relative");
                    $(target).html("* El Correo electr&oacute;nico ya est&aacute; en uso.");
                    $(target).fadeIn(1000);
                    return false;
                }
            }
        });
    }
}

webLoader.hideFiguresInit = function(){

    webLoader.createStyledButtons();

    var listado = document.getElementById('main_figure');
    if(listado!=null){
        var contenedores = listado.getElementsByTagName('section');
        var numContenedores = contenedores.length;
        for(m=0; m < numContenedores; m++){
            if(contenedores[m].id.indexOf('item_') == 0)
                contenedores[m].style.display = 'none';
        }
    }
}
webLoader.hideOrShowFigure = function(o){
    var obj = document.getElementById('item_' + o);
    if(obj.style.display == 'block') obj.style.display = 'none';
    else obj.style.display = 'block';
}

webLoader.loadPageFu= function(o){
    var form=$(o.form);
    //alert("asdasd");
    if(form!=null){
        //console.info('Set Ajax Form =)...');
        form.submit(function(event){
            //alert("asdasd");
            event.preventDefault(); // <-- important
            if(html5forms.submit){
                $(this).ajaxSubmit(o);
                return false;
            }
        });
    }
}

webLoader.setOptions= function (o){

    var json=o.json;
    var target=o.target

    if(o.cleanTarget!= null && o.cleanTarget){
        target.innerHTML='';
    }

    if(o.defOpt!= null && o.defOpt){
        target.options[0] = new Option('Seleccionar','');
    }

    if(json.length==0){

        target.disabled = true;
        target.options[0] = new Option('No hay datos.','');

    }else{

        var addOpt;

        if(o.addOpt!= null){
            addOpt=o.addOpt;
        }
        else{
            addOpt= function(json,el){
                return  new Option(json[el].value, json[el].key);
            }
        }

        for(var i in json){
            target.options[target.length] = addOpt(json,i);
            //new Option(json[i].desc, json[i].valor);
        }
        target.disabled = false;
    }
}

/* funcion para crear los botones con estilo*/
webLoader.createStyledButtons= function(o){


    if(true){
        var btns;

        if(o!=null && o.target!= null){
            btns=$(o.target).find('.abm_bt');
        }
        else{
            btns=$('.abm_bt');
        }
        var el=$(document.createElement('span'));

        btns.each(function(){

            var lbt=el.clone();
            var mbt=el.clone();
            var rbt=el.clone();

            var cont=$(this).html();

            $(this).html('');

            rbt.addClass('r_bt');
            mbt.addClass('m_bt').html(cont);
            lbt.addClass('l_bt');

            $(this).prepend(rbt);
            $(this).prepend(mbt);
            $(this).prepend(lbt);

            $(this).mousedown(function(){
                lbt.removeClass('l_bt').addClass('l_btp');
                mbt.removeClass('m_bt').addClass('m_btp');
                rbt.removeClass('r_bt').addClass('r_btp');
            });

            $(this).mouseup(function(){
                lbt.removeClass('l_btp').addClass('l_bt');
                mbt.removeClass('m_btp').addClass('m_bt');
                rbt.removeClass('r_btp').addClass('r_bt');
            });

            $(this).mouseout(function(){
                lbt.removeClass('l_btp').addClass('l_bt');
                mbt.removeClass('m_btp').addClass('m_bt');
                rbt.removeClass('r_btp').addClass('r_bt');
            });

        });
    }


}

/* funcion para crear los botones con estilo*/
webLoader.addStyleButtonsReloaded = function(o){

    var btns;

    if(o!=null && o.target!= null){
        btns=$(o.target).find('.abm_bt_R');
    }
    else{
        btns=$('.abm_bt_R');
    }
    var el=$(document.createElement('span'));

    btns.each(function(){

        var lbt=el.clone();
        var mbt=el.clone();
        var rbt=el.clone();

        var cont=$(this).html();

        $(this).html('');

        rbt.addClass('r_bt');
        mbt.addClass('m_bt').html(cont);
        lbt.addClass('l_bt');

        $(this).prepend(rbt);
        $(this).prepend(mbt);
        $(this).prepend(lbt);

        $(this).mousedown(function(){
            lbt.removeClass('l_bt').addClass('l_btp');
            mbt.removeClass('m_bt').addClass('m_btp');
            rbt.removeClass('r_bt').addClass('r_btp');
        });

        $(this).mouseup(function(){
            lbt.removeClass('l_btp').addClass('l_bt');
            mbt.removeClass('m_btp').addClass('m_bt');
            rbt.removeClass('r_btp').addClass('r_bt');
        });

        $(this).mouseout(function(){
            lbt.removeClass('l_btp').addClass('l_bt');
            mbt.removeClass('m_btp').addClass('m_bt');
            rbt.removeClass('r_btp').addClass('r_bt');
        });

    });
};

webLoader.createUploader= function(o){

    var fileTypes={jpg:1, pdf:2};

    if(fileTypes[o.params.fileType]!=null){
        o.params.fileType=fileTypes[o.params.fileType];
    }

    o['element']=document.getElementById(o.id);

//    var args= {
//        element: document.getElementById(o.id),
//        action: o.target,
//        debug: false
//    };
//
//    for (var prop in o){
//        args[prop] = o[prop];
//    }

    new qq.FileUploader(o);

}

webLoader.createDateInput= function(properties){

    $.tools.dateinput.localize("es", {
        months: 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre',
        shortMonths:  'Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic',
        days:         'Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sabado',
        shortDays:    'Dom,Lun,Mar,Mie,Jue,Vie,Sab'
    });

    $("input:date").dateinput(properties);

};

