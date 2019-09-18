$(function() {

  let search_user_list = $('#user-search-result')
  let chat_group_user_list = $('.chat-group-users.js-add-user')

  function appendUserId(users_id) {
    $('.chat-group-user.clearfix.js-chat-member').each(function(){
      let user_id = $(this).attr('id');
      users_id.push(user_id);
    });
    return users_id;
  }

  function appendUser(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name } </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_user_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_user_list.append(html)
  }

  function appendChatGroup(hash) {
    let html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${ hash.id }'>
                    <p class='chat-group-user__name'>${ hash.name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    chat_group_user_list.append(html)
  }

  $('#user-search-field').on("keyup", function() {
    let input = $('#user-search-field').val();
    let users_id = [];
    appendUserId(users_id)

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, group_users_id: users_id },
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

    $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function() {
        let id = $(this).attr('data-user-id');
        let name = $(this).attr('data-user-name');
        let hash = { id: id, name: name }
      $(this).closest('div').remove();
      appendChatGroup(hash)
    });
  });
  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function() {
    $(this).closest('div').remove();
  });
});