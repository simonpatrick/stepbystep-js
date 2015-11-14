Meteor.startup(->
  if Task.find().count is 0
    Task.insert
      name: "night task"
      important: true
      urgent: true
    Task.insert
      name: "night task1"
      important: true
      urgent: false
    Task.insert
      name: "night task2"
      important: false
      urgent: true
    Task.insert
          name: "night task3"
          important: false
          urgent: false
)