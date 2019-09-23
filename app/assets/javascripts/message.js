$(function() {
  function buildHTML(message){

    let imageHTML = message.image ? `<img class="lower-message__image" src="${message.image}"/>` : ``

    let html = `<div class="chat-main__messages__message" data-message-id="${message.id}">
                  <div class="chat-main__messages__message__upper-info">
                    <p class="chat-main__messages__message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="chat-main__messages__message__upper-info__date">
                      ${message.time}
                    </p>
                  </div>
                  <div class="chat-main__messages__message__lower-message">
                    <p class="chat-main__messages__message__lower-message__body">
                      ${message.body}
                    </p>
                    ${imageHTML}
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__messages').append(html)
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.chat-main__form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  });

  $(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 5000)
    };
  });

  let reloadMessages = function() {
    last_message_id = $('.chat-main__messages__message:last').data('message-id');
    
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id }
    })
    .done(function(messages) {
      if (messages != null ) {
        $.each(messages, function(index, message) {
          let insertHTML = buildHTML(message);
          $('.chat-main__messages').append(insertHTML);
          $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
        });
      };
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
}); 