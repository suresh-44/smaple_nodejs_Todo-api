const bcrypt = require('bcryptjs')
var hashedPassword
bcrypt.genSalt(10, (err, salt) => {
  // console.log(salt)
  bcrypt.hash('123abc!', salt, (err, hash) => {
     bcrypt.compare('123abc!' , hash, (err, res) => {
      console.log(res)
    })
  })
})

// const hashedPassword = '$2a$10$YiJJEA0oaDc9uovw7dn6AuWo9YvP14BVJF.8ZFRWj4MPhiOrwsi22'

