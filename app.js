console.log("ORG ID: 59db7d9f164f25000199c57a, TOKEN: ca3b0d07be4d4a3c8306a59554ae22e0, UID: adam1");
let options = {
  format: "yyyy-mm-dd",
  autoClose: true
};

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, options);
});

$("#submit-btn").on("click", function(event){
  event.preventDefault();
  $("#jsonDiv").empty();
  $("#totalResults").empty();

  let orgID = $("#orgID").val();
  let token = $("#access_token").val();
  let uid = $("#uid").val();
  let dataResource = $('input[name=group3]:checked').val();
  let startDate = $("#startDate").val();
  let endDate = $("#endDate").val();

  //console.log(startDate + " & " + endDate);

  //console.log(dataResource);

  let summaryURL = "https://api.v2.validic.com/organizations/" + orgID + "/users/" + uid + "/" + dataResource + "?&start_date=" + startDate + "&end_date=" + endDate + "&token=" + token;

  console.log (summaryURL);

    //calls the Validic API
    $.ajax({
      url: summaryURL,
      method: "GET"
    })
  
    .then(function(response) {

      //this works
      console.log(response);
      console.log(response.data.length);

      $("#totalResults").append("There were a total of " + response.data.length + " results!");

      for (i = 0; i < response.data.length; i++) {

      let myJSON = JSON.stringify(response.data[i], undefined, 2);

      $("#jsonDiv").append(`<div></div>${myJSON}<p>`);
    }
  })
});