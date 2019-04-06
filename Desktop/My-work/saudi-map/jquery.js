$(window).ready(function() {
  $("[id*=SA-").on("click", function() {
    let region = $(this);
    let regionId = $(this)["0"].id;
    let allRegion = $("[id*=SA-");
    let regionName = $(this)["0"].attributes["1"].value;

    // Style on click
    allRegion.css("fill", "#cccccc");
    region.css("fill", "#8f1919");

    // let add info
    $("#infoRegion").text(regionName);

    // Show data
  });

  $("svg path").on("click", function() {
    $($(this).data("value")).fadeIn("fast");
    $(".info")
      .find("span")
      .not($(this).data("value"))
      .fadeOut("fast");
  });
});
