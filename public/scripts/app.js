$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users",
  }).done((users) => {
    // for (user of users.users) {
    //   $("<div>").text(user.name).appendTo($("body"));
    // }
  });

  $("span").on("click", function () {
    $("#search-form").toggle("slow", function () {});
  });

  $(".likes").on("click", function () {
    $(".likes i").addClass("red-like");
  });

  $("td .btn-primary").on("click", function () {
    console.log('dddddddddddd');
    $("#sold-delete").append('<div class="sold">SOLD</div>');
  });
});


