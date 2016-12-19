$(function() {
    var map;
    var user_id='123';
    var gloablMedia = {
        user_id:1,
        title:'垃圾已滿',
        descrp:'趕快來處理',
        lat:'25.0394',
        lon:'121.537',
        type:'garbage',
        process:'未處理'
    };
    
  // $("#recordVideo").hide();
  init();
  checkUserId(user_id);

  getUSerListData();
  getUserNearData();
  
  
  function checkUserId(id){
      
      if(!id){
         $('#login').show();
         
      }
  }

 
  $("#StartButton").click(function() {
    
    $("#StartButton").hide();
    $("#StopButton").show();
  });
  
  $("#StopButton").click(function() {
    $.ajax({url: "http://192.168.16.202:8082/action/stop", success: function(result){
    }});
    $("#StartButton").show();
    $("#StopButton").hide();
  });
  
    $("#recordImage").click(function() {
        //alert('hihih');
        recordImage();
        return false;
    });
    
    
     $("#policeStation").click(function() {
         
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
     $("#health").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
     $("#transportation").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    }); 
    $("#communication").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
     $("#strays").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
     $("#environment").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
     $("#house").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
     $("#travial").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
     $("#sport").click(function() {
        $("#getCollections").hide();
        $("#progress").show();
        fackResponse();
    });
    
   
    
    $("#recordVideo").click(function() {
        
        recordVideo();
       
        return false;
    });
    function recordVideo() {
      
        var options = {};
        navigator.device.capture.captureVideo(captureSuccess, captureError, options);
        
        function captureSuccess(mediaFiles) {
             
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                var fileURL = mediaFiles[i].fullPath;
                
                $("#recordVideo").hide();
                $("#recordImage").show();
               uploadFile(fileURL); 
            };
        }
        var captureError = function(error) {
             
         console.log(error);
        };
        
    }
    
  
    function recordImage() {
        var options = {};
        navigator.device.capture.captureImage(captureSuccess, captureError, options);
        
        function captureSuccess(mediaFiles) {
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                var fileURL = mediaFiles[i].fullPath;
                
               
                $("#recordImage").hide();
                $("#getPosition").show();
                
                if(!gloablMedia.video){
                    setTimeout(function(){
                        uploadFile(fileURL); 
                    },10000);
                 }else{
                    uploadFile(fileURL);  
                 }
                        
               
            };
        }
        var captureError = function(error) {
         console.log(error);
        };
        
    }
    
    $("#GetPosition").click(function() {
        getLocation();
        return false;
    });
    
     $("#setLocation").click(function() {
        $("#getPosition").hide();
        $("#getTitle").show();
        $("input[name=locate]" ).focus();
       
        
        
        gloablMedia.loca = $("input[name=locate]" ).val();
    });
    
      $("#setDescription").click(function() {
        $("#getDescription").hide();
        $("#getCollections").show();
         $("input[name=description]" ).focus();
         gloablMedia.descrp = $("input[name=description]" ).val();
        console.log(gloablMedia);
            
        
           
    });
    
     $("#setTitle").click(function() {
        $("#getTitle").hide();
        $("#getDescription").show();
        $("input[name=title]" ).focus();
        var title = $("input[name=title]" ).val();
        if(title){
            gloablMedia.title = $("input[name=title]" ).val();
        }
        console.log($("input[name=title]" ).val());
        
        console.log(gloablMedia);
        
        
        
            
           
    });
    
    
    $("#userListOpen").click(function() {
        $("#userListOpen").hide();
         
        $("#userList").removeClass( "slideOutUp" );
        $("#userList").addClass( "slideInDown" );
        $("#userList").show();
    });
   
     $("#userListClose").click(function() {
        $("#userListOpen").show();
        $("#userList").removeClass( "slideInDown" );
        $("#userList").addClass( "slideOutUp" );
    });
   
   
   function uploadFile(fileURL) {
        
      
        var win_file = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            var fileDataJson = JSON.parse(r.response);
            
            var type = fileDataJson.name.split('.');
            console.log(type[0]);
            
            if(type[1]!=='jpg'&&type[1]!=='png'){
                 gloablMedia.video = fileDataJson.name;
            }else{
                 gloablMedia.image = fileDataJson.name;
            }
                       
            console.log(gloablMedia);
        }

        var fail_file = function (error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
    
        var options_file = new FileUploadOptions();
        options_file.fileKey = "file";
        options_file.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options_file.mimeType = "text/plain";

        var params_file = {};
        options_file.params = params_file;
        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/uploadFileToList/"), win_file, fail_file, options_file);
    }
   
    function getLocation() {
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 10000 });
        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        function onSuccess(position) {
            alert('!!!!');
            var google_latlon_to_address_api = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude+position.coords.longitude+'&sensor=true';
            $.ajax({url: google_latlon_to_address_api, success: function(result){
                alert('@@@@@');
                var result_first_layer = result[0];
                var address_components = result_first_layer.address_components;
                
                alert(result_first_layer);
            }}); 
         
        }

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    }

// Options: throw an error if no update is received every 30 seconds.
//

    }
  
  $("#RescanQRCode").click(function() {
    scanBarcode();
    return false;
  });
  
   function scanBarcode() {
      // BarcodeScannerプラグインを利用してスキャン
      window.plugins.barcodeScanner.scan(
        // 成功時に実行されるコールバック（キャンセル時も含む）
        function(result) {
          // キャンセルされたら何もしない
          if (result.cancelled) {
            return;
          }
          alert(result);
        $.ajax({url: "http://192.168.16.202:8082/scene/" + result.text, success: function(result){
        }});          
        },
        // エラー時に実行されるコールバック
        function(error) {

        }
      );
    }
    
    
    
function fackResponse(){
   
     $.ajax({type:"POST",url: "http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/storeEventToList", data:gloablMedia,success: function(result){
         
          $("#usersCaseList").empty( );
          getUSerListData();
          getUserNearData();
  
         console.log(result);
          $("#progress").hide();
        $("#recordVideo").show();
        $("#userListOpen").click();
         $("#userNearList").hide();
         $("#openUsersCastList").show();
    }});
    // setTimeout(function(){
    //     $("#progress").hide();
    //     $("#recordVideo").show();
    //     $("#userListOpen").click();
    //      $("#userNearList").hide();
    //      $("#openUsersCastList").show();
    // },2000);
}
    
  
});

function init(){
  $("#recordImage").hide();
  $("#getPosition").hide();
  $("#getDescription").hide();
  $("#getCollections").hide();
  $("#userCaseLists").show();
  $("#getTitle").hide();
  $("#userCaseDetail").hide();
  $("#progress").hide();
   $("#userNearList").hide();
  
  
       
}
function getUSerListData(){

    $.ajax({url: "http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/user/1/lists", success: function(result){
        $.each(result, function(index, item) {
            var content = '<div class="user-list__item " onclick="showCaseDetail_user('+item.id+')">'+
                    '<div class="user-list__item--img" style="background-image:url(http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/upload/'+item.image +')"></div>'+
                    '<div class="user-list__item--main">'+
                    '<h3 class="user-list__item--title">'+item.title+'</h3>'+
                    '<table class="user-list__table">'+
                    '<tr>'+
                    '<td width="50%">'+item.created_at+'</td>'+
                    '<td width="30%"><p class="user-list__item--status -wait">'+item.process+'<p></td>'+
                    ' </tr></table></div></div>' ;
                    
                   console.log(item.id);
            
            
            $("#usersCaseList").append(content );
              
            });
       // 
    }});
}

function getUserNearData(){

    $.ajax({url: "http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/lists/122/22", success: function(result){
        $.each(result, function(index, item) {
            
            var content = '<div class="user-list__item " onclick="showCaseDetail_user('+item.id+')">'+
                    '<div class="user-list__item--img" style="background-image:url(http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/upload/'+item.image +')"></div>'+
                    '<div class="user-list__item--main">'+
                    '<h3 class="user-list__item--title">'+item.title+'</h3>'+
                    '<table class="user-list__table">'+
                    '<tr>'+
                    '<td width="50%">'+item.created_at+'</td>'+
                    '<td width="30%"><p class="user-list__item--status -wait">'+item.process+'<p></td>'+
                    ' </tr></table></div></div>' ;
            
            $("#userNearList").append(content);
            
   
              
            });
       // 
    }});
}


function checkAndLogin(){
    var phone =  $( "input[name=phone]" ).val();
    var secreat_id =  $( "input[name=secreat_id]" ).val();
    
    if(phone&&secreat_id){
         $('#login').hide();
        //              
        // $.post( "http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/login.php", { phone:phone,:secreat_id }, function( res ) {
        //   alert(res);
        // }, "json");
        
    }
    
}

function showCaseDetail(item_id){
    alert('hihi');
        console.log("http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/list/"+item_id);
    $.get("http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/list/"+item_id, function( data ){
        var image_src = "http://t3.mgetUserNearData();oocu.cc/ed/TaipeiOpenCityHackthon/public/upload/"+data.image;
        console.log(image_src);
        $('#result_title').empty();
        $('#result_descrp').empty();
        $('#result_title').append(data.title);
        $('#result_descrp').append(data.descrp);
        $('#result_image').attr("src", image_src);

         
    });
     $("#userCaseLists").hide();
     $("#userCaseDetail").show();

}

function showCaseDetail_user(item_id){
    //console.log("http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/list/"+item_id);
    $.get("http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/list/"+item_id, function( data ){
        var image_src = "http://t3.moocu.cc/ed/TaipeiOpenCityHackthon/public/upload/"+data.image;
        console.log(image_src);
        $('#result_title').empty();
        $('#result_descrp').empty();
        $('#result_title').append(data.title);
        $('#result_descrp').append(data.descrp);
        $('#result_image').attr("src", image_src);
        
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(data.lat), lng: parseFloat(data.lon)},
            scrollwheel: false,
            zoom: 16
          });
          marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: parseFloat(data.lat), lng: parseFloat(data.lon)}
          });
          console.log(map);
    });
     $("#userCaseLists").hide();
     $("#userCaseDetail").show();

}

function backCaseList(){
    $("#userCaseLists").show();
    $("#userCaseDetail").hide();
}


      
// function setCaseTitle(){
//     $("#getTitle").hide();
//     $("#getDescription").show();
// }      
      
      
function openUsersList(){

    $("#openUsersCastLi").addClass("active");
     $("#openUsersNearLi").removeClass("active");
     $("#usersCaseList").show();
     $("#userNearList").hide();
    
}
function openUsersNearList(){
    $("#openUsersCastLi").removeClass("active");
     $("#openUsersNearLi").addClass("active");
      $("#usersCaseList").hide();
     $("#userNearList").show();
    
}

