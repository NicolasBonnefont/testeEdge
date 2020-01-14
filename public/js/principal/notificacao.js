function showNotification(from, align){

  $.notify({
      icon: "add_alert",
      message: "Welcome to <b>Material Dashboard Pro</b> - a beautiful freebie for every web developer."

  },{
      type: 'success',
      timer: 4000,
      placement: {
          from: from,
          align: align
      }
  });
}