
export const modifyUsers = users => {
  return Object.values(users).map( user => {
    return ({
      label: user.first_name + " " + user.last_name,
      value: user.id
    })
  }) 
}