Template.home.helpers
  taskListTL:->
    Task.find({important:true,urgent:true})
  taskListTR:->
    Task.find({important:true,urgent:false})
  taskListBL:->
    Task.find({important:false,urgent:true})
  taskListBR:->
    Task.find({important:false,urgent:false})

Template.home.events
  'submit .form-create-task':(e)->
    e.preventDefault()
    $form=$(e.currentTarget)
    task=
      name:$form.find('input[name=name]').val()
      create_time:new Data()
      important: false
      urgent:false
      user_id:Meteor.userId()
    type=$form.find('input[name=input]').val()

    switch type
      when 'tl'
        task.important=true
        task.urgent=true
      when 'tr' then task.important=true
      when 'bl' then task.urgent =true

    console.log task
    Task.insert(task)
    $form.find('input[name=name]').val()

  'keypress .task-name':(e)->
      $el=$(e.currentTarget)
      taskId=$el.parent().attr('data-task-id')
      if e.keyCode is 13
        taskName=$el.text()
      Task.update({_id:taksId},{$set:{name:task}})
      $el.blur()
      e.preventDefault()

  'click .delete-task':(e)->
    $el=$(e.currentTarget)
    taskId=$el.parent().attr('data-task-id')
    Task.remove({_id:taskId})