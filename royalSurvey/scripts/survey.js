survey = {
  questions: undefined,
  firstQuestionDisplayed: -1,
  lastQuestionDisplayed: -1
};
var questionLength = undefined;
var questionCounter = 1;

((survey, $) => {
  survey.setup_survey = function(questions, questionCounter) {
    var self = this;
    this.questions = questions;
    var currentQuestion = questionCounter;

    var elem = document.getElementById("myBar");
    var surveyBody_counter = document.getElementById("surveyBody_counter");
    var width = 8.3;
    var fullWidth = 100;
    var currentQuestionNumber = 1;

    var move = (question) => {
      if (currentQuestionNumber >= question.length) {
        return false;
      } else {
        width += fullWidth / (question.length - 1);
        elem.style.width = width + "%";
        if (width > 100) {
          elem.style.width = 100 + "%";
        }
        elem.innerHTML = ++currentQuestionNumber;

        surveyBody_counter.innerHTML = elem.innerHTML;
      }
    }
    this.questions.forEach((question)  => {
      self.generateQuestionElement(question);
    });

    $("#nextBtn").click(() => {
      var ok = true;
      for (
        i = self.firstQuestionDisplayed;
        i <= self.lastQuestionDisplayed;
        i++
      ) {
        if (
          self.questions[i]["required"] === true &&
          !self.getQuestionAnswer(questions[i])
        ) {
          $(
            ".question-container > div.question:nth-child(" +
              (i + 1) +
              ") > .required-message"
          ).show();
          ok = false;
        }
      }
      if (!ok) return;
      if (!(currentQuestionNumber >= questionLength)) {
        self.showNextQuestionSet();
        move(questions);
      }

      currentQuestion += 1;
    });
    $("#formId").submit((event) => {
      var str = $("#formId").serialize();
      event.preventDefault();
      event.stopPropagation();
      if (currentQuestion > questionLength) {
        $(".wrapperWallpaper_surveyBox").css("display", "none");

        $(".finishWindow").css("display", "block");
        $.ajax({
          type: "post",
          url: "http://localhost:7000/answers",
          contentType: "application/json",
          data: { str: str },
          processData: false,
          success: () => {
            self.hideAllQuestions();
            $("#nextBtn").hide();
          },
          error: () => {
            self.hideAllQuestions();
            $("#nextBtn").hide();
          }
        });
      }
    });
    this.showNextQuestionSet();
  };

  survey.getQuestionAnswer = (question) => {
    var result;
    if (question.type === "single-select") {
      result = $(
        'input[type="radio"][name="' + question.id + '"]:checked'
      ).val();
    } else if (question.type === "single-select-oneline") {
      result = $(
        'input[type="radio"][name="' + question.id + '"]:checked'
      ).val();
    } else if (question.type === "text-field-small") {
      result = $("input[name=" + question.id + "]").val();
    } else if (question.type === "text-field-large") {
      result = $("textarea[name=" + question.id + "]").val();
    }
    return result ? result : undefined;
  };

  survey.generateQuestionElement = (question) => {
    var content = "content: '1'";
    var questionElement = $(
      '<div id="' + question.id + '" class="question"></div>'
    );
    var questionTextElement = $('<div class="question-text" ></div>');
    var questionAnswerElement = $('<div class="answer"></div>');
    var questionCommentElement = $('<div class="comment" ></div>');
    questionElement.appendTo($(".question-container"));
    questionElement.append(questionTextElement);
    questionElement.append(questionAnswerElement);
    questionElement.append(questionCommentElement);
    questionTextElement.html(
      '<p style="display:inline-block" class="question-title">Вопрос:</p>' +
        question.text
    );
    questionCommentElement.html(question.comment);
    if (question.type === "single-select") {
      questionElement.addClass("single-select");
      question.options.forEach((option, key) => {
        questionAnswerElement.append(
          '<div class="row surveyAnswerLine"> <div class=" col-xs-1 col-xs-offset-4 radio"><div class="circleBase">' +
            `${key + 1}` +
            '</div></div><label class="radio col-xs-2">' +
            option +
            "</label>" +
            '<div class="col-xs-2 surveyAnswerLine"><input type="radio" class="answerLine_radioBtn" value="' +
            option +
            '" name="' +
            question.id +
            '"/></div></div>'
        );
      });
    } else if (question.type === "single-select-oneline") {
      questionElement.addClass("single-select-oneline");
      var html =
        '<table border="0" cellpadding="5" cellspacing="0"><tr><td></td>';
      question.options.forEach((label) => {
        html += "<td><label>" + label + "</label></td>";
      });
      html +=
        "<td></td></tr><tr><td><div>" + question.labels[0] + "</div></td>";
      question.options.forEach((label) => {
        html +=
          '<td><div><input type="radio" value="' +
          label +
          '" name="' +
          question.id +
          '"></div></td>';
      });
      html += "<td><div>" + question.labels[1] + "</div></td></tr></table>";
      questionAnswerElement.append(html);
    } else if (question.type === "text-field-small") {
      questionElement.addClass("text-field-small");
      questionAnswerElement.append(
        '<input type="text" value="" class="text" name="' + question.id + '">'
      );
    } else if (question.type === "text-field-large") {
      questionElement.addClass("text-field-large");
      questionAnswerElement.append(
        '<textarea rows="8" cols="0" class="text" name="' + question.id + '">'
      );
    }
    questionAnswerElement.after(
      '<div class="required-message">Выберите вариант ответа</div>'
    );
    questionElement.hide();
  };

  survey.hideAllQuestions = () => {
    $(".question:visible").each((index, element) => {
      $(element).hide();
    });
    $(".required-message").each((index, element) => {
      $(element).hide();
    });
  };

  survey.showNextQuestionSet = function() {
    this.hideAllQuestions();
    this.firstQuestionDisplayed = this.lastQuestionDisplayed + 1;

    do {
      this.lastQuestionDisplayed++;
      $(
        ".question-container > div.question:nth-child(" +
          (this.lastQuestionDisplayed + 1) +
          ")"
      ).show();

      if (this.questions[this.lastQuestionDisplayed]["break_after"] === true)
        break;
    } while (this.lastQuestionDisplayed < this.questions.length - 1);
  };
})(survey, jQuery);

$(document).ready( () => {
  $.getJSON("questions.json", (json) => {
    survey.setup_survey(json, questionCounter);
    questionLength = json.length;
  });
});

window.onbeforeunload = () => {
  return "This will reset all answers that you've already filled in!";
};
