// <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
$(document).ready(function() {
  $("#NewPatient".click(function() {
      var id = $("#name").val();
      axios
        .get("/user?ID=12345")
        .then(function(response) {
          console.log("yes");
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    })
  );
});
