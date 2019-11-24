var dateInputs = document.querySelectorAll("input.date");

for (var i = 0; i < dateInputs.length; i++) {
  datepicker(dateInputs[i], { dateSelected: new Date(),
    formatter: function formatter(input, date, instance) {
      var value = date.toLocaleDateString()
      input.value = value;
    }});
}

var validateInputs = document.querySelectorAll('.validate');

for (var i = 0; i < validateInputs.length; i++) {
  validateInputs[i].addEventListener("blur", function(){
    if(this.value < 0 || this.value > 100 || isNaN(this.value)){
      this.value = "";
      this.classList.add("invalid");
    }

    if(this.classList.contains('ttm')){
      calculate('ttm');
    } else{
      calculate('ctm');
    }
  });
  validateInputs[i].addEventListener("focus", function(){
    if(this.classList.contains('invalid')){
      this.classList.remove("invalid");
    }
  });
}

function calculate(totalMin){
  var totalFields = document.querySelectorAll("."+totalMin),
      resultField = document.querySelector("."+totalMin+"_res"),
      notEmptyField = 0,
      sum = 0,
      result;
  for (var i = 0; i < totalFields.length; i++) {
    if(totalFields[i].value != ""){
      notEmptyField++;
      sum = sum + (+totalFields[i].value);
    }
  }
  if (notEmptyField === 0) {
    return;
  } else {
    result = sum / notEmptyField;
    resultField.value = result;
  }
}

function switchInput() {
  var inputSwitch = document.querySelectorAll('.input-switch');
  disableAllFields(inputSwitch);
  for (var i = 0; i < inputSwitch.length; i++) {
    inputSwitch[i].addEventListener('change', function() {
      if (this.checked) {
        disableAllFields(inputSwitch);
        this.nextElementSibling.removeAttribute('disabled');
      }
    })
  }
}

function disableAllFields(inputSwitch) {
  for (var i = 0; i < inputSwitch.length; i++) {
    if(inputSwitch[i].checked == false){
      inputSwitch[i].nextElementSibling.setAttribute('disabled', '');
    }
  }
}

switchInput();

if(document.body.offsetHeight > window.innerHeight){
  var topBtn = document.querySelector('.to-top');
  topBtn.style.display = 'inline-block';
}

topBtn.onclick = topFunction;

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
