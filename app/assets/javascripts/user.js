$(function() {

  let search_user_list = $('#user-search-result')

  function appendUser(user) {
    let html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${ user.name } </p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
    search_user_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_user_list.append(html)
  }

  $('#user-search-field').on("keyup", function() {
    let input = $('#user-search-field').val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("該当するユーザーはいません")
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });
});