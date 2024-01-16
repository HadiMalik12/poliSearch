function getResultsByState() {
  var what = $("#legislator_select").val()
  var state = $("#state_select").val()
  if ((what == "XX") || (state == "XX")) {
    alert("Please choose option");
    return;
  }
  if (what == 'senator') {
    var url = "http://localhost:4000/congress/senator/" + state;
    console.log(url);
    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        var htmlCode = "<table style=\"width:100%\" border=\"2\">";
        htmlCode += "<tr>";
        htmlCode += "<th>First Name</th>";
        htmlCode += "<th>Last Name</th>";
        htmlCode += "<th>Party</th>";
        htmlCode += "<th>Birthday</th>";
        htmlCode += "<th>URL</th>";
        htmlCode += "<th>Twitter</th>";
        htmlCode += "</tr>";
        for (i = 0; i<response.senators.length; i++) {
          htmlCode += "<tr>";
          htmlCode += "<td>"+response.senators[i].fname+"</td>";
          htmlCode += "<td>"+response.senators[i].lname+"</td>";
          htmlCode += "<td>"+response.senators[i].party+"</td>";
          htmlCode += "<td>"+response.senators[i].birthday+"</td>";
          htmlCode += "<td><a href=\""+response.senators[i].url+"\" target=\"_blank\">"+
                       response.senators[i].url+"</a></td>";
          htmlCode += "<td><a href=\"http://twitter.com/"+response.senators[i].twitter+
                      "\" target=\"_blank\">"+response.senators[i].twitter+"</a></td>";
          htmlCode += "</tr>";
        }
        htmlCode += "</table>";
        $("#result").html(htmlCode);
      },
      error: function(error) {
        alert("ERROR");
        console.log(error);
      }
    });
  } else if (what == 'hrep') {
    var url = "http://localhost:4000/congress/hrep/" + state;
    console.log(url);
    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        var htmlCode = "<table style=\"width:100%\" border=\"2\">";
        htmlCode += "<tr>";
        htmlCode += "<th>District</th>";
        htmlCode += "<th>First Name</th>";
        htmlCode += "<th>Last Name</th>";
        htmlCode += "<th>Party</th>";
        htmlCode += "<th>Birthday</th>";
        htmlCode += "<th>URL</th>";
        htmlCode += "<th>Twitter</th>";
        htmlCode += "</tr>";
        for (i = 0; i<response.hreps.length; i++) {
          htmlCode += "<tr>";
          htmlCode += "<td>"+response.hreps[i].district+"</td>";
          htmlCode += "<td>"+response.hreps[i].fname+"</td>";
          htmlCode += "<td>"+response.hreps[i].lname+"</td>";
          htmlCode += "<td>"+response.hreps[i].party+"</td>";
          htmlCode += "<td>"+response.hreps[i].birthday+"</td>";
          htmlCode += "<td><a href=\""+response.hreps[i].url+"\" target=\"_blank\">"+
                       response.hreps[i].url+"</a></td>";
          htmlCode += "<td><a href=\"http://twitter.com/"+response.hreps[i].twitter+
                      "\" target=\"_blank\">"+response.hreps[i].twitter+"</a></td>";
          htmlCode += "</tr>";
        }
        htmlCode += "</table>";
        $("#result").html(htmlCode);
      },
      error: function(error) {
        alert("ERROR");
        console.log(error);
      }
    });
  } else { // "both"
    var url = "http://localhost:4000/congress/legislator/" + state;
    console.log(url);
    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        // Produce Senators table
        var htmlCode = "<h3>Senators</h3>";
        htmlCode += "<table style=\"width:100%\" border=\"2\">";
        htmlCode += "<tr>";
        htmlCode += "<th>First Name</th>";
        htmlCode += "<th>Last Name</th>";
        htmlCode += "<th>Party</th>";
        htmlCode += "<th>Birthday</th>";
        htmlCode += "<th>URL</th>";
        htmlCode += "<th>Twitter</th>";
        htmlCode += "</tr>";
        for (i = 0; i<response.senators.length; i++) {
          htmlCode += "<tr>";
          htmlCode += "<td>"+response.senators[i].fname+"</td>";
          htmlCode += "<td>"+response.senators[i].lname+"</td>";
          htmlCode += "<td>"+response.senators[i].party+"</td>";
          htmlCode += "<td>"+response.senators[i].birthday+"</td>";
          htmlCode += "<td><a href=\""+response.senators[i].url+"\" target=\"_blank\">"+
                       response.senators[i].url+"</a></td>";
          htmlCode += "<td><a href=\"http://twitter.com/"+response.senators[i].twitter+
                      "\" target=\"_blank\">"+response.senators[i].twitter+"</a></td>";
          htmlCode += "</tr>";
        }
        htmlCode += "</table>";
        // Produce Hreps table
        htmlCode += "<h3>House of Representatives</h3>";
        htmlCode += "<table style=\"width:100%\" border=\"2\">";
        htmlCode += "<tr>";
        htmlCode += "<th>District</th>";
        htmlCode += "<th>First Name</th>";
        htmlCode += "<th>Last Name</th>";
        htmlCode += "<th>Party</th>";
        htmlCode += "<th>Birthday</th>";
        htmlCode += "<th>URL</th>";
        htmlCode += "<th>Twitter</th>";
        htmlCode += "</tr>";
        for (i = 0; i<response.hreps.length; i++) {
          htmlCode += "<tr>";
          htmlCode += "<td>"+response.hreps[i].district+"</td>";
          htmlCode += "<td>"+response.hreps[i].fname+"</td>";
          htmlCode += "<td>"+response.hreps[i].lname+"</td>";
          htmlCode += "<td>"+response.hreps[i].party+"</td>";
          htmlCode += "<td>"+response.hreps[i].birthday+"</td>";
          htmlCode += "<td><a href=\""+response.hreps[i].url+"\" target=\"_blank\">"+
                       response.hreps[i].url+"</a></td>";
          htmlCode += "<td><a href=\"http://twitter.com/"+response.hreps[i].twitter+
                      "\" target=\"_blank\">"+response.hreps[i].twitter+"</a></td>";
          htmlCode += "</tr>";
        }
        htmlCode += "</table>";
        $("#result").html(htmlCode);
      },
      error: function(error) {
        alert("ERROR");
        console.log(error);
      }
    });
  }

}

function getResultsByParty() {
  var what = $("#sen_hrep_select").val()
  var party = $("#party_select").val()
  if (what == 'sen') {
    var url = "http://localhost:4000/congress/senator/party/" + party;
    console.log(url);
    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        var htmlCode = "<table style=\"width:100%\" border=\"2\">";
        htmlCode += "<tr>";
        htmlCode += "<th>State</th>";
        htmlCode += "<th>First Name</th>";
        htmlCode += "<th>Last Name</th>";
        htmlCode += "<th>Birthday</th>";
        htmlCode += "<th>URL</th>";
        htmlCode += "<th>Twitter</th>";
        htmlCode += "</tr>";
        for (i = 0; i<response.senators.length; i++) {
          htmlCode += "<tr>";
          htmlCode += "<td>"+response.senators[i].state+"</td>";
          htmlCode += "<td>"+response.senators[i].fname+"</td>";
          htmlCode += "<td>"+response.senators[i].lname+"</td>";
          htmlCode += "<td>"+response.senators[i].birthday+"</td>";
          htmlCode += "<td><a href=\""+response.senators[i].url+"\" target=\"_blank\">"+
                       response.senators[i].url+"</a></td>";
          htmlCode += "<td><a href=\"http://twitter.com/"+response.senators[i].twitter+
                      "\" target=\"_blank\">"+response.senators[i].twitter+"</a></td>";
          htmlCode += "</tr>";
        }
        htmlCode += "</table>";
        $("#result").html(htmlCode);
      },
      error: function(error) {
        alert("ERROR");
        console.log(error);
      }
    });
  } else {
    var url = "http://localhost:4000/congress/hrep/party/" + party;
    console.log(url);
    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        var htmlCode = "<table style=\"width:100%\" border=\"2\">";
        htmlCode += "<tr>";
        htmlCode += "<th>State</th>";
        htmlCode += "<th>District</th>";
        htmlCode += "<th>First Name</th>";
        htmlCode += "<th>Last Name</th>";
        htmlCode += "<th>Birthday</th>";
        htmlCode += "<th>URL</th>";
        htmlCode += "<th>Twitter</th>";
        htmlCode += "</tr>";
        for (i = 0; i<response.hreps.length; i++) {
          htmlCode += "<tr>";
          htmlCode += "<td>"+response.hreps[i].state+"</td>";
          htmlCode += "<td>"+response.hreps[i].district+"</td>";
          htmlCode += "<td>"+response.hreps[i].fname+"</td>";
          htmlCode += "<td>"+response.hreps[i].lname+"</td>";
          htmlCode += "<td>"+response.hreps[i].birthday+"</td>";
          htmlCode += "<td><a href=\""+response.hreps[i].url+"\" target=\"_blank\">"+
                       response.hreps[i].url+"</a></td>";
          htmlCode += "<td><a href=\"http://twitter.com/"+response.hreps[i].twitter+
                      "\" target=\"_blank\">"+response.hreps[i].twitter+"</a></td>";
          htmlCode += "</tr>";
        }
        htmlCode += "</table>";
        $("#result").html(htmlCode);
      },
      error: function(error) {
        alert("ERROR");
        console.log(error);
      }
    });
  }

}
