$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users",
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $("span").on("click", function() {
    $("#search-form").toggle('slow', function() {})
  })
});
