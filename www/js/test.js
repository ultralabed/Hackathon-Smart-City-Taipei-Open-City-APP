// This is a JavaScript file


function showCaseDetail(id){
     $("#userCaseLists").hide();
     $("#userCaseDetail").show();

}
function backCaseList(){
    $("#userCaseLists").show();
     $("#userCaseDetail").hide();
}

function setDescription(description){
     $("#getDescription").hide();
     $("#getCollections").show();
}
      
function setCaseTitle(){
   
    $("#getTitle").hide();
    $("#getDescription").show();
}      
      

