const cliResultToList = (cliResultToStringArray) => {
  const cliResultList = $("ul#cli-result-list");
  cliResultList.empty();
  console.log({ cliResultToStringArray });
  $.each(cliResultToStringArray, function (i) {
    const li = $("<li/>")
      .addClass("list-group")
      .attr("role", "menuitem")
      .appendTo(cliResultList);
    $("<span/>")
      .addClass("list-group-item")
      .text(cliResultToStringArray[i])
      .appendTo(li);
  });
};

const setCliResult = (response) => {
  const cliResult = response.result;

  const cliResultArray = cliResult.trim().split("\n");

  if (Array.isArray(cliResult)) {
    cliResultToList(cliResult);
  } else if (cliResultArray.length > 1) {
    cliResultToList(cliResultArray);
  } else if (typeof cliResult === "string") {
    $("span#cli-result").text(cliResult);
  }
};

const fetchCLICommand = (data) =>
  $.ajax({
    url: "/api/v1/cli",
    type: "POST",
    accept: "application/json",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data),
    success: function (response) {
      setCliResult(response);
      // success handle
    },
  });

const onClickOrOnEnter = function () {
  const command = $("input#command").val();
  const data = { command };
  $("input#command").val("");
  fetchCLICommand(data);
};

$("input#command").on("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    onClickOrOnEnter();
  }
});
$("#fetchButton").click(onClickOrOnEnter);
