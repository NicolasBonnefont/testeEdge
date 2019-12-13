'use strict'

class TaskController {
  index({view}){
    const tasks = [{
      title:'task one',
      body:'primeira tarefa'
    },{
      title:'task two',
      body:'segunda tarefa'
    }
  ]


    return view.render('task',{
      title: 'Your Tasks',
      tasks:tasks
    })
  }
}


module.exports = TaskController
