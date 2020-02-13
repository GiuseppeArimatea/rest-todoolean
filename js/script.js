$(document).ready(function () {
  printAll();

  $('.bottone').click(function() {
    var valore = $('.input').val();
    creaDa(valore);
  });

  $(document).on('click', '.delete', function() {
    var elimina = $(this);
    var idTodo = elimina.parent().attr('data-id');
    deleteTodo(idTodo);
  });
});



// READ
function printAll() {
  $.ajax({
      url:'http://157.230.17.132:3001/todos',
      method: 'GET',
      success: function (data) {
        var todos = data;
        console.log(todos);
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        for (var i = 0; i < todos.length; i++) {
          var element = todos[i];
          var context = {
            text: element.text,
            id: element.id
          };
          var html = template(context);
          $('ol.todos').append(html);
        }
      },
      error: function () {
        alert('errore')
      }
  });
}

// CREATE
function creaDa(valore) {
  $.ajax({
      url:'http://157.230.17.132:3001/todos',
      method: 'POST',
      data: {
        text: valore
      },
      success: function (data) {
          $('ol.todos').html('');
          printAll();
      },
      error: function () {
        alert('errore')
      }
  });
};


// //DELETE
function deleteTodo(id) {
  $.ajax({
      url:'http://157.230.17.132:3001/todos/'+ id,
      method: 'DELETE',
      success: function (data) {
        console.log('eliminato');
        $("ol.todos").html('');
          printAll();
      },
      error: function () {
        alert('errore');
      }
  });
}
