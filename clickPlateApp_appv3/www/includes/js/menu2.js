function display_profile(){
    var logged_user = sessionStorage.logged_name;
    var content = '';
    if(typeof logged_user !== 'undefined'){
        content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList">';
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="myTray.html" class="ui-btn ui-icon-shop ui-btn-icon-left" data-theme="a" id="sidenav_mytray" data-ajax="false" style="font-weight:normal;">My Tray<span id="tray_content" style="display:inline;"></span></a></li>';
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-user ui-btn-icon-left" data-theme="a" id="sidenav_user_profile" data-ajax="false" style="font-weight:normal;">User Profile</a></li>';
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left" data-theme="a" id="sidenav_about" data-ajax="false" style="font-weight:normal;">About clickPLATE</a></li>';
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout_" data-ajax="false" style="font-weight:normal;">Logout</a></li>';
        content += '</ul>';
        $('#myPanel').html(content);
    }else{
        content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList" style="">';
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="myTray.html" class="ui-btn ui-icon-shop ui-btn-icon-left" data-theme="a" id="sidenav_mytray" data-ajax="false" style="font-weight:normal;">My Tray<span id="tray_content" style="display:inline;"></span></a></li>';
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout">Login</a></li>';
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left" data-theme="a" id="sidenav_about" data-ajax="false" style="font-weight:normal;">About clickPLATE</a></li>';
        content += '</ul>';
        $('#myPanel').html(content);
    }

    $('#sidenav_user_profile').click(function(e){
        window.location.href = "user_profile.html";
    });
    $('#sidenav_logout_').click(function(e){
        window.location.href = 'logout.html';
    });
    $('#sidenav_logout').click(function(e){
        window.location.href = 'login_form.html';
    });
    $('#sidenav_about').click(function(e){
        window.location.href = 'about_us.html';
    });
}
display_profile();
function showCart() {
    var item_cart = sessionStorage.orderCart;
    item_cart = JSON.parse(item_cart);

    content = '';
    subtotal = 0;
    ctr = 0;
    gtotal = 0;
    for(var i in item_cart){
        var line = JSON.parse(item_cart[i]);
        content += '<li data-role="list-divider" style="list-style-type: none;padding-left:30px;"><h4 style="white-space: normal;">'+unescape(line.name)+' </h4>@ ₱'+displayInCurr(line.price)+' - '+unescape(line.qty)+'pcs. <strong>₱'+unescape(line.qty*line.price)+'</strong></li><br><hr>';
        ctr++;
        subtotal += Number(line.qty*line.price);
        gtotal += Number(line.qty);
    }
    content += '<li style="text-align:right;">TOTAL : <strong>'+subtotal+'</strong></li>';
    $('#tray_content').html(content);
    var icount = Object.keys(item_cart).length;
    $('#tray_content').html(' ('+gtotal+')');
    $('#tray_content').trigger('updatelayout');
}

$( '#panelTrgr').click(function(e){
    showCart();
});

var res_name = sessionStorage.res_name;
$('.pagetitle').html(res_name);
show_brands();
function show_brands(){
    var res_id = sessionStorage.res_id;
    var block = ['a','b','c','d'];
    var ctr = 0;
    // console.log(remoteHost+"clickPlatev2/app_menus/getCategories/"+res_id);
    $.ajax({
      url : remoteHost+"clickPlatev2/app_menus/getCategories/"+res_id,
      type: 'POST',
      dataType : "json",
      data: {"name":"JSON_Request"},
      success:function(data) {
        items = JSON.stringify(data.categories);
        items = JSON.parse(items);
        var ul = $('<ul/>').attr({
            'data-role':"listview",
            'data-inset':"true",
            'id':"cat-list",
            'class':'gray-listview'
        });
        $.each(items,function(k,v){
          console.log(k+' -- '+v.cat_name);
            if(ctr == 4)
              ctr = 0;
            var li = $('<li/>').css({
                'border-raduis': '2px'
            });
            var img = $('<img>').attr({
                                'src': remoteHost+'clickPlatev2/uploads/'+res_id+'/categories/'+k+'.png',
                                'height':'80px'
                            });
            var h2 = $('<h2/>').text(v.cat_name);
            var a = $('<a/>').attr({
                        'href': "menu_details.html?res_id="+res_id+"&id="+v.cat_id+"&reloaded=no",
                        'rel':'external'
                    }).css({
                        'background-color':'#ebebeb',
                        'color':'#000',
                        'border-color':'#cbcbcb',
                        'border-radius': '5px',
                        'margin-top':'5px',
                        'margin-bottom':'5px'
                    }).click(function(){
                        // var cat_id = $(this).parent().attr('cat_id');
                        // alert(cat_id);
                        sessionStorage.menu_cat_id = v.cat_id;
                        sessionStorage.menu_cat_name = v.cat_name;
                        window.location = "menu_items.html";
                      return false;  
                    }).append(img).append(h2);
            li.append(a);
            ul.append(li);
            // var main = $('<div/>').addClass('ui-block-'+block[ctr]);
            // var body = $('<div/>').addClass('ui-body ui-body-a ui-corner-all').attr('cat_id',v.cat_id);
            // var tile = $('<div/>').addClass('tile-bg');
            // var title = $('<div/>').addClass('tile-title').append('<p>'+v.cat_name+'</p>');

            // title.appendTo(tile);
            // console.log(remoteHost+'clickPlatev2/uploads/'+res_id+'/categories/'+k+'.png');
            // tile.css({
            //   'background':'url("'+remoteHost+'clickPlatev2/uploads/'+res_id+'/categories/'+k+'.png") 100% 100% no-repeat ',
            //   'href':'menu.html',
            //   'background-position':'center',
            //   'background-size':'cover'
            // }).appendTo(body);

            // tile.click(function(){
            //   var cat_id = $(this).parent().attr('cat_id');
            //   // alert(cat_id);
            //   sessionStorage.menu_cat_id = cat_id;
            //   window.location = "menu_items.html";
            // });
            // body.appendTo(main);
            // $('#category_list').append(main);
            ctr++;
        });
        $('#category_list').append(ul);
        $("#cat-list").listview().listview("refresh");
      }
    });
}