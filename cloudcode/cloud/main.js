Parse.Cloud.define("answerQuestion", function(request, response) {
  var query = new Parse.Query("Question");
  query.get(request.params.questionId, {
    success: function(question) {
      if (!question.get('tutor')) {
        question.set('tutor', request.user);
        question.save(null, {
          success: function(q) {
            response.success(q);
          },
          error: function(q, error) {
            response.error(error.message);
          }
        })
      } else {
        response.error('This question is already answered');
      }
    }, error: function(question, error) {
      response.error(error.message)
    }
  })
})
