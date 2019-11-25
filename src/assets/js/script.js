function setDatepicker(){
  var dateInputs = document.querySelectorAll("input.date");

  for (var i = 0; i < dateInputs.length; i++) {
    datepicker(dateInputs[i], { dateSelected: new Date(),
      formatter: function formatter(input, date, instance) {
        var value = date.toLocaleDateString()
        input.value = value;
      }
    });
  }
}
setDatepicker();
function validate() {
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

function topBtnVisible() {
  if(document.body.offsetHeight > window.innerHeight){
    var topBtn = document.querySelector('.to-top');
    topBtn.style.display = 'inline-block';
  }
  topBtn.onclick = topFunction;
}



function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var addBtn = document.querySelector('#add-btn');

addBtn.onclick = function(){

  var lastRow = document.querySelector('.table__row_last');

  lastRow.insertAdjacentHTML("beforeBegin", "<form><div class='table__row'><div class='table__col'><input class='date' type='text' /></div><div class='table__col'><input type='text' /></div><div class='table__col'><input class='validate ttm' type='text' /></div><div class='table__col'><input class='validate ctm' type='text' /></div><div class='table__col__big'><label><input type='checkbox'/>Pt. tolerated treatment well</label><label><input type='checkbox'/>Pt. c/o after use of</label><label><input type='radio' name='rad'/>Scoliosis Table</label><label><input class='input-switch' type='radio' name='rad'/>Chair<input type='text'/></label><label><input class='input-switch' type='radio' name='rad'/>Stopped treatment prematurely due to<input type='text'/></label></div></div></form>");

  var lastInput = document.querySelectorAll("input.date");

  var last = lastInput[lastInput.length- 1];

  datepicker(last, { dateSelected: new Date(),
    formatter: function formatter(input, date, instance) {
      var value = date.toLocaleDateString()
      input.value = value;
    }
  });

  validate();
  switchInput();
  topBtnVisible();
}
